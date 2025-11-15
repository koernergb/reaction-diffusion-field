/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const nr = "160";
const At = "", ot = "srgb", zt = "srgb-linear", ir = "display-p3", _i = "display-p3-linear", fi = "linear", Ke = "srgb", di = "rec709", pi = "p3";
const Fn = "300 es";
class bn {
  addEventListener(e, t) {
    this._listeners === void 0 && (this._listeners = {});
    const n = this._listeners;
    n[e] === void 0 && (n[e] = []), n[e].indexOf(t) === -1 && n[e].push(t);
  }
  hasEventListener(e, t) {
    if (this._listeners === void 0) return !1;
    const n = this._listeners;
    return n[e] !== void 0 && n[e].indexOf(t) !== -1;
  }
  removeEventListener(e, t) {
    if (this._listeners === void 0) return;
    const r = this._listeners[e];
    if (r !== void 0) {
      const a = r.indexOf(t);
      a !== -1 && r.splice(a, 1);
    }
  }
  dispatchEvent(e) {
    if (this._listeners === void 0) return;
    const n = this._listeners[e.type];
    if (n !== void 0) {
      e.target = this;
      const r = n.slice(0);
      for (let a = 0, l = r.length; a < l; a++)
        r[a].call(this, e);
      e.target = null;
    }
  }
}
const ht = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"], Ai = Math.PI / 180, Qi = 180 / Math.PI;
function Nn() {
  const i = Math.random() * 4294967295 | 0, e = Math.random() * 4294967295 | 0, t = Math.random() * 4294967295 | 0, n = Math.random() * 4294967295 | 0;
  return (ht[i & 255] + ht[i >> 8 & 255] + ht[i >> 16 & 255] + ht[i >> 24 & 255] + "-" + ht[e & 255] + ht[e >> 8 & 255] + "-" + ht[e >> 16 & 15 | 64] + ht[e >> 24 & 255] + "-" + ht[t & 63 | 128] + ht[t >> 8 & 255] + "-" + ht[t >> 16 & 255] + ht[t >> 24 & 255] + ht[n & 255] + ht[n >> 8 & 255] + ht[n >> 16 & 255] + ht[n >> 24 & 255]).toLowerCase();
}
function gt(i, e, t) {
  return Math.max(e, Math.min(t, i));
}
function ya(i, e) {
  return (i % e + e) % e;
}
function bi(i, e, t) {
  return (1 - t) * i + t * e;
}
function fr(i) {
  return (i & i - 1) === 0 && i !== 0;
}
function er(i) {
  return Math.pow(2, Math.floor(Math.log(i) / Math.LN2));
}
function Cn(i, e) {
  switch (e.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return i / 4294967295;
    case Uint16Array:
      return i / 65535;
    case Uint8Array:
      return i / 255;
    case Int32Array:
      return Math.max(i / 2147483647, -1);
    case Int16Array:
      return Math.max(i / 32767, -1);
    case Int8Array:
      return Math.max(i / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function _t(i, e) {
  switch (e.constructor) {
    case Float32Array:
      return i;
    case Uint32Array:
      return Math.round(i * 4294967295);
    case Uint16Array:
      return Math.round(i * 65535);
    case Uint8Array:
      return Math.round(i * 255);
    case Int32Array:
      return Math.round(i * 2147483647);
    case Int16Array:
      return Math.round(i * 32767);
    case Int8Array:
      return Math.round(i * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
class He {
  constructor(e = 0, t = 0) {
    He.prototype.isVector2 = !0, this.x = e, this.y = t;
  }
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  set(e, t) {
    return this.x = e, this.y = t, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this;
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  applyMatrix3(e) {
    const t = this.x, n = this.y, r = e.elements;
    return this.x = r[0] * t + r[3] * n + r[6], this.y = r[1] * t + r[4] * n + r[7], this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(gt(n, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y;
    return t * t + n * n;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this;
  }
  rotateAround(e, t) {
    const n = Math.cos(t), r = Math.sin(t), a = this.x - e.x, l = this.y - e.y;
    return this.x = a * n - l * r + e.x, this.y = a * r + l * n + e.y, this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y;
  }
}
class Oe {
  constructor(e, t, n, r, a, l, s, o, c) {
    Oe.prototype.isMatrix3 = !0, this.elements = [
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, r, a, l, s, o, c);
  }
  set(e, t, n, r, a, l, s, o, c) {
    const h = this.elements;
    return h[0] = e, h[1] = r, h[2] = s, h[3] = t, h[4] = a, h[5] = o, h[6] = n, h[7] = l, h[8] = c, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      1
    ), this;
  }
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], this;
  }
  extractBasis(e, t, n) {
    return e.setFromMatrix3Column(this, 0), t.setFromMatrix3Column(this, 1), n.setFromMatrix3Column(this, 2), this;
  }
  setFromMatrix4(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[4],
      t[8],
      t[1],
      t[5],
      t[9],
      t[2],
      t[6],
      t[10]
    ), this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const n = e.elements, r = t.elements, a = this.elements, l = n[0], s = n[3], o = n[6], c = n[1], h = n[4], d = n[7], p = n[2], m = n[5], g = n[8], v = r[0], f = r[3], u = r[6], y = r[1], S = r[4], w = r[7], D = r[2], C = r[5], R = r[8];
    return a[0] = l * v + s * y + o * D, a[3] = l * f + s * S + o * C, a[6] = l * u + s * w + o * R, a[1] = c * v + h * y + d * D, a[4] = c * f + h * S + d * C, a[7] = c * u + h * w + d * R, a[2] = p * v + m * y + g * D, a[5] = p * f + m * S + g * C, a[8] = p * u + m * w + g * R, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[3] *= e, t[6] *= e, t[1] *= e, t[4] *= e, t[7] *= e, t[2] *= e, t[5] *= e, t[8] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], a = e[3], l = e[4], s = e[5], o = e[6], c = e[7], h = e[8];
    return t * l * h - t * s * c - n * a * h + n * s * o + r * a * c - r * l * o;
  }
  invert() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], a = e[3], l = e[4], s = e[5], o = e[6], c = e[7], h = e[8], d = h * l - s * c, p = s * o - h * a, m = c * a - l * o, g = t * d + n * p + r * m;
    if (g === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const v = 1 / g;
    return e[0] = d * v, e[1] = (r * c - h * n) * v, e[2] = (s * n - r * l) * v, e[3] = p * v, e[4] = (h * t - r * o) * v, e[5] = (r * a - s * t) * v, e[6] = m * v, e[7] = (n * o - c * t) * v, e[8] = (l * t - n * a) * v, this;
  }
  transpose() {
    let e;
    const t = this.elements;
    return e = t[1], t[1] = t[3], t[3] = e, e = t[2], t[2] = t[6], t[6] = e, e = t[5], t[5] = t[7], t[7] = e, this;
  }
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  transposeIntoArray(e) {
    const t = this.elements;
    return e[0] = t[0], e[1] = t[3], e[2] = t[6], e[3] = t[1], e[4] = t[4], e[5] = t[7], e[6] = t[2], e[7] = t[5], e[8] = t[8], this;
  }
  setUvTransform(e, t, n, r, a, l, s) {
    const o = Math.cos(a), c = Math.sin(a);
    return this.set(
      n * o,
      n * c,
      -n * (o * l + c * s) + l + e,
      -r * c,
      r * o,
      -r * (-c * l + o * s) + s + t,
      0,
      0,
      1
    ), this;
  }
  //
  scale(e, t) {
    return this.premultiply(Ri.makeScale(e, t)), this;
  }
  rotate(e) {
    return this.premultiply(Ri.makeRotation(-e)), this;
  }
  translate(e, t) {
    return this.premultiply(Ri.makeTranslation(e, t)), this;
  }
  // for 2D Transforms
  makeTranslation(e, t) {
    return e.isVector2 ? this.set(
      1,
      0,
      e.x,
      0,
      1,
      e.y,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      e,
      0,
      1,
      t,
      0,
      0,
      1
    ), this;
  }
  makeRotation(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      n,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(e, t) {
    return this.set(
      e,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      1
    ), this;
  }
  //
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let r = 0; r < 9; r++)
      if (t[r] !== n[r]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 9; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const Ri = /* @__PURE__ */ new Oe();
function $r(i) {
  for (let e = i.length - 1; e >= 0; --e)
    if (i[e] >= 65535) return !0;
  return !1;
}
function mi(i) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", i);
}
function Aa() {
  const i = mi("canvas");
  return i.style.display = "block", i;
}
const dr = {};
function In(i) {
  i in dr || (dr[i] = !0, console.warn(i));
}
const pr = /* @__PURE__ */ new Oe().set(
  0.8224621,
  0.177538,
  0,
  0.0331941,
  0.9668058,
  0,
  0.0170827,
  0.0723974,
  0.9105199
), mr = /* @__PURE__ */ new Oe().set(
  1.2249401,
  -0.2249404,
  0,
  -0.0420569,
  1.0420571,
  0,
  -0.0196376,
  -0.0786361,
  1.0982735
), Vn = {
  [zt]: {
    transfer: fi,
    primaries: di,
    toReference: (i) => i,
    fromReference: (i) => i
  },
  [ot]: {
    transfer: Ke,
    primaries: di,
    toReference: (i) => i.convertSRGBToLinear(),
    fromReference: (i) => i.convertLinearToSRGB()
  },
  [_i]: {
    transfer: fi,
    primaries: pi,
    toReference: (i) => i.applyMatrix3(mr),
    fromReference: (i) => i.applyMatrix3(pr)
  },
  [ir]: {
    transfer: Ke,
    primaries: pi,
    toReference: (i) => i.convertSRGBToLinear().applyMatrix3(mr),
    fromReference: (i) => i.applyMatrix3(pr).convertLinearToSRGB()
  }
}, ba = /* @__PURE__ */ new Set([zt, _i]), ke = {
  enabled: !0,
  _workingColorSpace: zt,
  get workingColorSpace() {
    return this._workingColorSpace;
  },
  set workingColorSpace(i) {
    if (!ba.has(i))
      throw new Error(`Unsupported working color space, "${i}".`);
    this._workingColorSpace = i;
  },
  convert: function(i, e, t) {
    if (this.enabled === !1 || e === t || !e || !t)
      return i;
    const n = Vn[e].toReference, r = Vn[t].fromReference;
    return r(n(i));
  },
  fromWorkingColorSpace: function(i, e) {
    return this.convert(i, this._workingColorSpace, e);
  },
  toWorkingColorSpace: function(i, e) {
    return this.convert(i, e, this._workingColorSpace);
  },
  getPrimaries: function(i) {
    return Vn[i].primaries;
  },
  getTransfer: function(i) {
    return i === At ? fi : Vn[i].transfer;
  }
};
function yn(i) {
  return i < 0.04045 ? i * 0.0773993808 : Math.pow(i * 0.9478672986 + 0.0521327014, 2.4);
}
function wi(i) {
  return i < 31308e-7 ? i * 12.92 : 1.055 * Math.pow(i, 0.41666) - 0.055;
}
let on;
class Jr {
  static getDataURL(e) {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement > "u")
      return e.src;
    let t;
    if (e instanceof HTMLCanvasElement)
      t = e;
    else {
      on === void 0 && (on = mi("canvas")), on.width = e.width, on.height = e.height;
      const n = on.getContext("2d");
      e instanceof ImageData ? n.putImageData(e, 0, 0) : n.drawImage(e, 0, 0, e.width, e.height), t = on;
    }
    return t.width > 2048 || t.height > 2048 ? (console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", e), t.toDataURL("image/jpeg", 0.6)) : t.toDataURL("image/png");
  }
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement < "u" && e instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && e instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && e instanceof ImageBitmap) {
      const t = mi("canvas");
      t.width = e.width, t.height = e.height;
      const n = t.getContext("2d");
      n.drawImage(e, 0, 0, e.width, e.height);
      const r = n.getImageData(0, 0, e.width, e.height), a = r.data;
      for (let l = 0; l < a.length; l++)
        a[l] = yn(a[l] / 255) * 255;
      return n.putImageData(r, 0, 0), t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let n = 0; n < t.length; n++)
        t instanceof Uint8Array || t instanceof Uint8ClampedArray ? t[n] = Math.floor(yn(t[n] / 255) * 255) : t[n] = yn(t[n]);
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else
      return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."), e;
  }
}
let Ra = 0;
class Qr {
  constructor(e = null) {
    this.isSource = !0, Object.defineProperty(this, "id", { value: Ra++ }), this.uuid = Nn(), this.data = e, this.version = 0;
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.images[this.uuid] !== void 0)
      return e.images[this.uuid];
    const n = {
      uuid: this.uuid,
      url: ""
    }, r = this.data;
    if (r !== null) {
      let a;
      if (Array.isArray(r)) {
        a = [];
        for (let l = 0, s = r.length; l < s; l++)
          r[l].isDataTexture ? a.push(Ci(r[l].image)) : a.push(Ci(r[l]));
      } else
        a = Ci(r);
      n.url = a;
    }
    return t || (e.images[this.uuid] = n), n;
  }
}
function Ci(i) {
  return typeof HTMLImageElement < "u" && i instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && i instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && i instanceof ImageBitmap ? Jr.getDataURL(i) : i.data ? {
    data: Array.from(i.data),
    width: i.width,
    height: i.height,
    type: i.data.constructor.name
  } : (console.warn("THREE.Texture: Unable to serialize Texture."), {});
}
let wa = 0;
class vt extends bn {
  constructor(e = vt.DEFAULT_IMAGE, t = vt.DEFAULT_MAPPING, n = 1001, r = 1001, a = 1006, l = 1008, s = 1023, o = 1009, c = vt.DEFAULT_ANISOTROPY, h = At) {
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: wa++ }), this.uuid = Nn(), this.name = "", this.source = new Qr(e), this.mipmaps = [], this.mapping = t, this.channel = 0, this.wrapS = n, this.wrapT = r, this.magFilter = a, this.minFilter = l, this.anisotropy = c, this.format = s, this.internalFormat = null, this.type = o, this.offset = new He(0, 0), this.repeat = new He(1, 1), this.center = new He(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Oe(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, typeof h == "string" ? this.colorSpace = h : (In("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace = h === 3001 ? ot : At), this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.needsPMREMUpdate = !1;
  }
  get image() {
    return this.source.data;
  }
  set image(e = null) {
    this.source.data = e;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.name = e.name, this.source = e.source, this.mipmaps = e.mipmaps.slice(0), this.mapping = e.mapping, this.channel = e.channel, this.wrapS = e.wrapS, this.wrapT = e.wrapT, this.magFilter = e.magFilter, this.minFilter = e.minFilter, this.anisotropy = e.anisotropy, this.format = e.format, this.internalFormat = e.internalFormat, this.type = e.type, this.offset.copy(e.offset), this.repeat.copy(e.repeat), this.center.copy(e.center), this.rotation = e.rotation, this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrix.copy(e.matrix), this.generateMipmaps = e.generateMipmaps, this.premultiplyAlpha = e.premultiplyAlpha, this.flipY = e.flipY, this.unpackAlignment = e.unpackAlignment, this.colorSpace = e.colorSpace, this.userData = JSON.parse(JSON.stringify(e.userData)), this.needsUpdate = !0, this;
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    if (!t && e.textures[this.uuid] !== void 0)
      return e.textures[this.uuid];
    const n = {
      metadata: {
        version: 4.6,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    return Object.keys(this.userData).length > 0 && (n.userData = this.userData), t || (e.textures[this.uuid] = n), n;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  transformUv(e) {
    if (this.mapping !== 300) return e;
    if (e.applyMatrix3(this.matrix), e.x < 0 || e.x > 1)
      switch (this.wrapS) {
        case 1e3:
          e.x = e.x - Math.floor(e.x);
          break;
        case 1001:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case 1002:
          Math.abs(Math.floor(e.x) % 2) === 1 ? e.x = Math.ceil(e.x) - e.x : e.x = e.x - Math.floor(e.x);
          break;
      }
    if (e.y < 0 || e.y > 1)
      switch (this.wrapT) {
        case 1e3:
          e.y = e.y - Math.floor(e.y);
          break;
        case 1001:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case 1002:
          Math.abs(Math.floor(e.y) % 2) === 1 ? e.y = Math.ceil(e.y) - e.y : e.y = e.y - Math.floor(e.y);
          break;
      }
    return this.flipY && (e.y = 1 - e.y), e;
  }
  set needsUpdate(e) {
    e === !0 && (this.version++, this.source.needsUpdate = !0);
  }
  get encoding() {
    return In("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace === ot ? 3001 : 3e3;
  }
  set encoding(e) {
    In("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace = e === 3001 ? ot : At;
  }
}
vt.DEFAULT_IMAGE = null;
vt.DEFAULT_MAPPING = 300;
vt.DEFAULT_ANISOTROPY = 1;
class lt {
  constructor(e = 0, t = 0, n = 0, r = 1) {
    lt.prototype.isVector4 = !0, this.x = e, this.y = t, this.z = n, this.w = r;
  }
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  set(e, t, n, r) {
    return this.x = e, this.y = t, this.z = n, this.w = r, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this.w = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setW(e) {
    return this.w = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this.w = e.w !== void 0 ? e.w : 1, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this.w += e.w, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this.w += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this.w = e.w + t.w, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this.w += e.w * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this.w -= e.w, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this.w -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this.w = e.w - t.w, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this.w *= e.w, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this.w *= e, this;
  }
  applyMatrix4(e) {
    const t = this.x, n = this.y, r = this.z, a = this.w, l = e.elements;
    return this.x = l[0] * t + l[4] * n + l[8] * r + l[12] * a, this.y = l[1] * t + l[5] * n + l[9] * r + l[13] * a, this.z = l[2] * t + l[6] * n + l[10] * r + l[14] * a, this.w = l[3] * t + l[7] * n + l[11] * r + l[15] * a, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  setAxisAngleFromQuaternion(e) {
    this.w = 2 * Math.acos(e.w);
    const t = Math.sqrt(1 - e.w * e.w);
    return t < 1e-4 ? (this.x = 1, this.y = 0, this.z = 0) : (this.x = e.x / t, this.y = e.y / t, this.z = e.z / t), this;
  }
  setAxisAngleFromRotationMatrix(e) {
    let t, n, r, a;
    const o = e.elements, c = o[0], h = o[4], d = o[8], p = o[1], m = o[5], g = o[9], v = o[2], f = o[6], u = o[10];
    if (Math.abs(h - p) < 0.01 && Math.abs(d - v) < 0.01 && Math.abs(g - f) < 0.01) {
      if (Math.abs(h + p) < 0.1 && Math.abs(d + v) < 0.1 && Math.abs(g + f) < 0.1 && Math.abs(c + m + u - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const S = (c + 1) / 2, w = (m + 1) / 2, D = (u + 1) / 2, C = (h + p) / 4, R = (d + v) / 4, K = (g + f) / 4;
      return S > w && S > D ? S < 0.01 ? (n = 0, r = 0.707106781, a = 0.707106781) : (n = Math.sqrt(S), r = C / n, a = R / n) : w > D ? w < 0.01 ? (n = 0.707106781, r = 0, a = 0.707106781) : (r = Math.sqrt(w), n = C / r, a = K / r) : D < 0.01 ? (n = 0.707106781, r = 0.707106781, a = 0) : (a = Math.sqrt(D), n = R / a, r = K / a), this.set(n, r, a, t), this;
    }
    let y = Math.sqrt((f - g) * (f - g) + (d - v) * (d - v) + (p - h) * (p - h));
    return Math.abs(y) < 1e-3 && (y = 1), this.x = (f - g) / y, this.y = (d - v) / y, this.z = (p - h) / y, this.w = Math.acos((c + m + u - 1) / 2), this;
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this.w = Math.min(this.w, e.w), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this.w = Math.max(this.w, e.w), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this.w = Math.max(e.w, Math.min(t.w, this.w)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this.w = Math.max(e, Math.min(t, this.w)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this.w = Math.floor(this.w), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this.w = Math.ceil(this.w), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this.w = Math.round(this.w), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this.w = Math.trunc(this.w), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this.w = -this.w, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this.w += (e.w - this.w) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this.w = e.w + (t.w - e.w) * n, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this.w = e[t + 3], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e[t + 3] = this.w, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this.w = e.getW(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this.w = Math.random(), this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z, yield this.w;
  }
}
class Ca extends bn {
  constructor(e = 1, t = 1, n = {}) {
    super(), this.isRenderTarget = !0, this.width = e, this.height = t, this.depth = 1, this.scissor = new lt(0, 0, e, t), this.scissorTest = !1, this.viewport = new lt(0, 0, e, t);
    const r = { width: e, height: t, depth: 1 };
    n.encoding !== void 0 && (In("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."), n.colorSpace = n.encoding === 3001 ? ot : At), n = Object.assign({
      generateMipmaps: !1,
      internalFormat: null,
      minFilter: 1006,
      depthBuffer: !0,
      stencilBuffer: !1,
      depthTexture: null,
      samples: 0
    }, n), this.texture = new vt(r, n.mapping, n.wrapS, n.wrapT, n.magFilter, n.minFilter, n.format, n.type, n.anisotropy, n.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.flipY = !1, this.texture.generateMipmaps = n.generateMipmaps, this.texture.internalFormat = n.internalFormat, this.depthBuffer = n.depthBuffer, this.stencilBuffer = n.stencilBuffer, this.depthTexture = n.depthTexture, this.samples = n.samples;
  }
  setSize(e, t, n = 1) {
    (this.width !== e || this.height !== t || this.depth !== n) && (this.width = e, this.height = t, this.depth = n, this.texture.image.width = e, this.texture.image.height = t, this.texture.image.depth = n, this.dispose()), this.viewport.set(0, 0, e, t), this.scissor.set(0, 0, e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.width = e.width, this.height = e.height, this.depth = e.depth, this.scissor.copy(e.scissor), this.scissorTest = e.scissorTest, this.viewport.copy(e.viewport), this.texture = e.texture.clone(), this.texture.isRenderTargetTexture = !0;
    const t = Object.assign({}, e.texture.image);
    return this.texture.source = new Qr(t), this.depthBuffer = e.depthBuffer, this.stencilBuffer = e.stencilBuffer, e.depthTexture !== null && (this.depthTexture = e.depthTexture.clone()), this.samples = e.samples, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
class Vt extends Ca {
  constructor(e = 1, t = 1, n = {}) {
    super(e, t, n), this.isWebGLRenderTarget = !0;
  }
}
class ea extends vt {
  constructor(e = null, t = 1, n = 1, r = 1) {
    super(null), this.isDataArrayTexture = !0, this.image = { data: e, width: t, height: n, depth: r }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class La extends vt {
  constructor(e = null, t = 1, n = 1, r = 1) {
    super(null), this.isData3DTexture = !0, this.image = { data: e, width: t, height: n, depth: r }, this.magFilter = 1003, this.minFilter = 1003, this.wrapR = 1001, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class On {
  constructor(e = 0, t = 0, n = 0, r = 1) {
    this.isQuaternion = !0, this._x = e, this._y = t, this._z = n, this._w = r;
  }
  static slerpFlat(e, t, n, r, a, l, s) {
    let o = n[r + 0], c = n[r + 1], h = n[r + 2], d = n[r + 3];
    const p = a[l + 0], m = a[l + 1], g = a[l + 2], v = a[l + 3];
    if (s === 0) {
      e[t + 0] = o, e[t + 1] = c, e[t + 2] = h, e[t + 3] = d;
      return;
    }
    if (s === 1) {
      e[t + 0] = p, e[t + 1] = m, e[t + 2] = g, e[t + 3] = v;
      return;
    }
    if (d !== v || o !== p || c !== m || h !== g) {
      let f = 1 - s;
      const u = o * p + c * m + h * g + d * v, y = u >= 0 ? 1 : -1, S = 1 - u * u;
      if (S > Number.EPSILON) {
        const D = Math.sqrt(S), C = Math.atan2(D, u * y);
        f = Math.sin(f * C) / D, s = Math.sin(s * C) / D;
      }
      const w = s * y;
      if (o = o * f + p * w, c = c * f + m * w, h = h * f + g * w, d = d * f + v * w, f === 1 - s) {
        const D = 1 / Math.sqrt(o * o + c * c + h * h + d * d);
        o *= D, c *= D, h *= D, d *= D;
      }
    }
    e[t] = o, e[t + 1] = c, e[t + 2] = h, e[t + 3] = d;
  }
  static multiplyQuaternionsFlat(e, t, n, r, a, l) {
    const s = n[r], o = n[r + 1], c = n[r + 2], h = n[r + 3], d = a[l], p = a[l + 1], m = a[l + 2], g = a[l + 3];
    return e[t] = s * g + h * d + o * m - c * p, e[t + 1] = o * g + h * p + c * d - s * m, e[t + 2] = c * g + h * m + s * p - o * d, e[t + 3] = h * g - s * d - o * p - c * m, e;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e, this._onChangeCallback();
  }
  set(e, t, n, r) {
    return this._x = e, this._y = t, this._z = n, this._w = r, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    return this._x = e.x, this._y = e.y, this._z = e.z, this._w = e.w, this._onChangeCallback(), this;
  }
  setFromEuler(e, t = !0) {
    const n = e._x, r = e._y, a = e._z, l = e._order, s = Math.cos, o = Math.sin, c = s(n / 2), h = s(r / 2), d = s(a / 2), p = o(n / 2), m = o(r / 2), g = o(a / 2);
    switch (l) {
      case "XYZ":
        this._x = p * h * d + c * m * g, this._y = c * m * d - p * h * g, this._z = c * h * g + p * m * d, this._w = c * h * d - p * m * g;
        break;
      case "YXZ":
        this._x = p * h * d + c * m * g, this._y = c * m * d - p * h * g, this._z = c * h * g - p * m * d, this._w = c * h * d + p * m * g;
        break;
      case "ZXY":
        this._x = p * h * d - c * m * g, this._y = c * m * d + p * h * g, this._z = c * h * g + p * m * d, this._w = c * h * d - p * m * g;
        break;
      case "ZYX":
        this._x = p * h * d - c * m * g, this._y = c * m * d + p * h * g, this._z = c * h * g - p * m * d, this._w = c * h * d + p * m * g;
        break;
      case "YZX":
        this._x = p * h * d + c * m * g, this._y = c * m * d + p * h * g, this._z = c * h * g - p * m * d, this._w = c * h * d - p * m * g;
        break;
      case "XZY":
        this._x = p * h * d - c * m * g, this._y = c * m * d - p * h * g, this._z = c * h * g + p * m * d, this._w = c * h * d + p * m * g;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + l);
    }
    return t === !0 && this._onChangeCallback(), this;
  }
  setFromAxisAngle(e, t) {
    const n = t / 2, r = Math.sin(n);
    return this._x = e.x * r, this._y = e.y * r, this._z = e.z * r, this._w = Math.cos(n), this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e) {
    const t = e.elements, n = t[0], r = t[4], a = t[8], l = t[1], s = t[5], o = t[9], c = t[2], h = t[6], d = t[10], p = n + s + d;
    if (p > 0) {
      const m = 0.5 / Math.sqrt(p + 1);
      this._w = 0.25 / m, this._x = (h - o) * m, this._y = (a - c) * m, this._z = (l - r) * m;
    } else if (n > s && n > d) {
      const m = 2 * Math.sqrt(1 + n - s - d);
      this._w = (h - o) / m, this._x = 0.25 * m, this._y = (r + l) / m, this._z = (a + c) / m;
    } else if (s > d) {
      const m = 2 * Math.sqrt(1 + s - n - d);
      this._w = (a - c) / m, this._x = (r + l) / m, this._y = 0.25 * m, this._z = (o + h) / m;
    } else {
      const m = 2 * Math.sqrt(1 + d - n - s);
      this._w = (l - r) / m, this._x = (a + c) / m, this._y = (o + h) / m, this._z = 0.25 * m;
    }
    return this._onChangeCallback(), this;
  }
  setFromUnitVectors(e, t) {
    let n = e.dot(t) + 1;
    return n < Number.EPSILON ? (n = 0, Math.abs(e.x) > Math.abs(e.z) ? (this._x = -e.y, this._y = e.x, this._z = 0, this._w = n) : (this._x = 0, this._y = -e.z, this._z = e.y, this._w = n)) : (this._x = e.y * t.z - e.z * t.y, this._y = e.z * t.x - e.x * t.z, this._z = e.x * t.y - e.y * t.x, this._w = n), this.normalize();
  }
  angleTo(e) {
    return 2 * Math.acos(Math.abs(gt(this.dot(e), -1, 1)));
  }
  rotateTowards(e, t) {
    const n = this.angleTo(e);
    if (n === 0) return this;
    const r = Math.min(1, t / n);
    return this.slerp(e, r), this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    return this._x *= -1, this._y *= -1, this._z *= -1, this._onChangeCallback(), this;
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let e = this.length();
    return e === 0 ? (this._x = 0, this._y = 0, this._z = 0, this._w = 1) : (e = 1 / e, this._x = this._x * e, this._y = this._y * e, this._z = this._z * e, this._w = this._w * e), this._onChangeCallback(), this;
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, t) {
    const n = e._x, r = e._y, a = e._z, l = e._w, s = t._x, o = t._y, c = t._z, h = t._w;
    return this._x = n * h + l * s + r * c - a * o, this._y = r * h + l * o + a * s - n * c, this._z = a * h + l * c + n * o - r * s, this._w = l * h - n * s - r * o - a * c, this._onChangeCallback(), this;
  }
  slerp(e, t) {
    if (t === 0) return this;
    if (t === 1) return this.copy(e);
    const n = this._x, r = this._y, a = this._z, l = this._w;
    let s = l * e._w + n * e._x + r * e._y + a * e._z;
    if (s < 0 ? (this._w = -e._w, this._x = -e._x, this._y = -e._y, this._z = -e._z, s = -s) : this.copy(e), s >= 1)
      return this._w = l, this._x = n, this._y = r, this._z = a, this;
    const o = 1 - s * s;
    if (o <= Number.EPSILON) {
      const m = 1 - t;
      return this._w = m * l + t * this._w, this._x = m * n + t * this._x, this._y = m * r + t * this._y, this._z = m * a + t * this._z, this.normalize(), this;
    }
    const c = Math.sqrt(o), h = Math.atan2(c, s), d = Math.sin((1 - t) * h) / c, p = Math.sin(t * h) / c;
    return this._w = l * d + this._w * p, this._x = n * d + this._x * p, this._y = r * d + this._y * p, this._z = a * d + this._z * p, this._onChangeCallback(), this;
  }
  slerpQuaternions(e, t, n) {
    return this.copy(e).slerp(t, n);
  }
  random() {
    const e = Math.random(), t = Math.sqrt(1 - e), n = Math.sqrt(e), r = 2 * Math.PI * Math.random(), a = 2 * Math.PI * Math.random();
    return this.set(
      t * Math.cos(r),
      n * Math.sin(a),
      n * Math.cos(a),
      t * Math.sin(r)
    );
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  fromArray(e, t = 0) {
    return this._x = e[t], this._y = e[t + 1], this._z = e[t + 2], this._w = e[t + 3], this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._w, e;
  }
  fromBufferAttribute(e, t) {
    return this._x = e.getX(t), this._y = e.getY(t), this._z = e.getZ(t), this._w = e.getW(t), this._onChangeCallback(), this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._w;
  }
}
class G {
  constructor(e = 0, t = 0, n = 0) {
    G.prototype.isVector3 = !0, this.x = e, this.y = t, this.z = n;
  }
  set(e, t, n) {
    return n === void 0 && (n = this.z), this.x = e, this.y = t, this.z = n, this;
  }
  setScalar(e) {
    return this.x = e, this.y = e, this.z = e, this;
  }
  setX(e) {
    return this.x = e, this;
  }
  setY(e) {
    return this.y = e, this;
  }
  setZ(e) {
    return this.z = e, this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(e) {
    return this.x = e.x, this.y = e.y, this.z = e.z, this;
  }
  add(e) {
    return this.x += e.x, this.y += e.y, this.z += e.z, this;
  }
  addScalar(e) {
    return this.x += e, this.y += e, this.z += e, this;
  }
  addVectors(e, t) {
    return this.x = e.x + t.x, this.y = e.y + t.y, this.z = e.z + t.z, this;
  }
  addScaledVector(e, t) {
    return this.x += e.x * t, this.y += e.y * t, this.z += e.z * t, this;
  }
  sub(e) {
    return this.x -= e.x, this.y -= e.y, this.z -= e.z, this;
  }
  subScalar(e) {
    return this.x -= e, this.y -= e, this.z -= e, this;
  }
  subVectors(e, t) {
    return this.x = e.x - t.x, this.y = e.y - t.y, this.z = e.z - t.z, this;
  }
  multiply(e) {
    return this.x *= e.x, this.y *= e.y, this.z *= e.z, this;
  }
  multiplyScalar(e) {
    return this.x *= e, this.y *= e, this.z *= e, this;
  }
  multiplyVectors(e, t) {
    return this.x = e.x * t.x, this.y = e.y * t.y, this.z = e.z * t.z, this;
  }
  applyEuler(e) {
    return this.applyQuaternion(_r.setFromEuler(e));
  }
  applyAxisAngle(e, t) {
    return this.applyQuaternion(_r.setFromAxisAngle(e, t));
  }
  applyMatrix3(e) {
    const t = this.x, n = this.y, r = this.z, a = e.elements;
    return this.x = a[0] * t + a[3] * n + a[6] * r, this.y = a[1] * t + a[4] * n + a[7] * r, this.z = a[2] * t + a[5] * n + a[8] * r, this;
  }
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  applyMatrix4(e) {
    const t = this.x, n = this.y, r = this.z, a = e.elements, l = 1 / (a[3] * t + a[7] * n + a[11] * r + a[15]);
    return this.x = (a[0] * t + a[4] * n + a[8] * r + a[12]) * l, this.y = (a[1] * t + a[5] * n + a[9] * r + a[13]) * l, this.z = (a[2] * t + a[6] * n + a[10] * r + a[14]) * l, this;
  }
  applyQuaternion(e) {
    const t = this.x, n = this.y, r = this.z, a = e.x, l = e.y, s = e.z, o = e.w, c = 2 * (l * r - s * n), h = 2 * (s * t - a * r), d = 2 * (a * n - l * t);
    return this.x = t + o * c + l * d - s * h, this.y = n + o * h + s * c - a * d, this.z = r + o * d + a * h - l * c, this;
  }
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  transformDirection(e) {
    const t = this.x, n = this.y, r = this.z, a = e.elements;
    return this.x = a[0] * t + a[4] * n + a[8] * r, this.y = a[1] * t + a[5] * n + a[9] * r, this.z = a[2] * t + a[6] * n + a[10] * r, this.normalize();
  }
  divide(e) {
    return this.x /= e.x, this.y /= e.y, this.z /= e.z, this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  min(e) {
    return this.x = Math.min(this.x, e.x), this.y = Math.min(this.y, e.y), this.z = Math.min(this.z, e.z), this;
  }
  max(e) {
    return this.x = Math.max(this.x, e.x), this.y = Math.max(this.y, e.y), this.z = Math.max(this.z, e.z), this;
  }
  clamp(e, t) {
    return this.x = Math.max(e.x, Math.min(t.x, this.x)), this.y = Math.max(e.y, Math.min(t.y, this.y)), this.z = Math.max(e.z, Math.min(t.z, this.z)), this;
  }
  clampScalar(e, t) {
    return this.x = Math.max(e, Math.min(t, this.x)), this.y = Math.max(e, Math.min(t, this.y)), this.z = Math.max(e, Math.min(t, this.z)), this;
  }
  clampLength(e, t) {
    const n = this.length();
    return this.divideScalar(n || 1).multiplyScalar(Math.max(e, Math.min(t, n)));
  }
  floor() {
    return this.x = Math.floor(this.x), this.y = Math.floor(this.y), this.z = Math.floor(this.z), this;
  }
  ceil() {
    return this.x = Math.ceil(this.x), this.y = Math.ceil(this.y), this.z = Math.ceil(this.z), this;
  }
  round() {
    return this.x = Math.round(this.x), this.y = Math.round(this.y), this.z = Math.round(this.z), this;
  }
  roundToZero() {
    return this.x = Math.trunc(this.x), this.y = Math.trunc(this.y), this.z = Math.trunc(this.z), this;
  }
  negate() {
    return this.x = -this.x, this.y = -this.y, this.z = -this.z, this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  // TODO lengthSquared?
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    return this.x += (e.x - this.x) * t, this.y += (e.y - this.y) * t, this.z += (e.z - this.z) * t, this;
  }
  lerpVectors(e, t, n) {
    return this.x = e.x + (t.x - e.x) * n, this.y = e.y + (t.y - e.y) * n, this.z = e.z + (t.z - e.z) * n, this;
  }
  cross(e) {
    return this.crossVectors(this, e);
  }
  crossVectors(e, t) {
    const n = e.x, r = e.y, a = e.z, l = t.x, s = t.y, o = t.z;
    return this.x = r * o - a * s, this.y = a * l - n * o, this.z = n * s - r * l, this;
  }
  projectOnVector(e) {
    const t = e.lengthSq();
    if (t === 0) return this.set(0, 0, 0);
    const n = e.dot(this) / t;
    return this.copy(e).multiplyScalar(n);
  }
  projectOnPlane(e) {
    return Li.copy(this).projectOnVector(e), this.sub(Li);
  }
  reflect(e) {
    return this.sub(Li.copy(e).multiplyScalar(2 * this.dot(e)));
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) return Math.PI / 2;
    const n = this.dot(e) / t;
    return Math.acos(gt(n, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x, n = this.y - e.y, r = this.z - e.z;
    return t * t + n * n + r * r;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  setFromSphericalCoords(e, t, n) {
    const r = Math.sin(t) * e;
    return this.x = r * Math.sin(n), this.y = Math.cos(t) * e, this.z = r * Math.cos(n), this;
  }
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  setFromCylindricalCoords(e, t, n) {
    return this.x = e * Math.sin(t), this.y = n, this.z = e * Math.cos(t), this;
  }
  setFromMatrixPosition(e) {
    const t = e.elements;
    return this.x = t[12], this.y = t[13], this.z = t[14], this;
  }
  setFromMatrixScale(e) {
    const t = this.setFromMatrixColumn(e, 0).length(), n = this.setFromMatrixColumn(e, 1).length(), r = this.setFromMatrixColumn(e, 2).length();
    return this.x = t, this.y = n, this.z = r, this;
  }
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, t * 4);
  }
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, t * 3);
  }
  setFromEuler(e) {
    return this.x = e._x, this.y = e._y, this.z = e._z, this;
  }
  setFromColor(e) {
    return this.x = e.r, this.y = e.g, this.z = e.b, this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  fromArray(e, t = 0) {
    return this.x = e[t], this.y = e[t + 1], this.z = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.x, e[t + 1] = this.y, e[t + 2] = this.z, e;
  }
  fromBufferAttribute(e, t) {
    return this.x = e.getX(t), this.y = e.getY(t), this.z = e.getZ(t), this;
  }
  random() {
    return this.x = Math.random(), this.y = Math.random(), this.z = Math.random(), this;
  }
  randomDirection() {
    const e = (Math.random() - 0.5) * 2, t = Math.random() * Math.PI * 2, n = Math.sqrt(1 - e ** 2);
    return this.x = n * Math.cos(t), this.y = n * Math.sin(t), this.z = e, this;
  }
  *[Symbol.iterator]() {
    yield this.x, yield this.y, yield this.z;
  }
}
const Li = /* @__PURE__ */ new G(), _r = /* @__PURE__ */ new On();
class Bn {
  constructor(e = new G(1 / 0, 1 / 0, 1 / 0), t = new G(-1 / 0, -1 / 0, -1 / 0)) {
    this.isBox3 = !0, this.min = e, this.max = t;
  }
  set(e, t) {
    return this.min.copy(e), this.max.copy(t), this;
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t += 3)
      this.expandByPoint(bt.fromArray(e, t));
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, n = e.count; t < n; t++)
      this.expandByPoint(bt.fromBufferAttribute(e, t));
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, n = e.length; t < n; t++)
      this.expandByPoint(e[t]);
    return this;
  }
  setFromCenterAndSize(e, t) {
    const n = bt.copy(t).multiplyScalar(0.5);
    return this.min.copy(e).sub(n), this.max.copy(e).add(n), this;
  }
  setFromObject(e, t = !1) {
    return this.makeEmpty(), this.expandByObject(e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.min.copy(e.min), this.max.copy(e.max), this;
  }
  makeEmpty() {
    return this.min.x = this.min.y = this.min.z = 1 / 0, this.max.x = this.max.y = this.max.z = -1 / 0, this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.addVectors(this.min, this.max).multiplyScalar(0.5);
  }
  getSize(e) {
    return this.isEmpty() ? e.set(0, 0, 0) : e.subVectors(this.max, this.min);
  }
  expandByPoint(e) {
    return this.min.min(e), this.max.max(e), this;
  }
  expandByVector(e) {
    return this.min.sub(e), this.max.add(e), this;
  }
  expandByScalar(e) {
    return this.min.addScalar(-e), this.max.addScalar(e), this;
  }
  expandByObject(e, t = !1) {
    e.updateWorldMatrix(!1, !1);
    const n = e.geometry;
    if (n !== void 0) {
      const a = n.getAttribute("position");
      if (t === !0 && a !== void 0 && e.isInstancedMesh !== !0)
        for (let l = 0, s = a.count; l < s; l++)
          e.isMesh === !0 ? e.getVertexPosition(l, bt) : bt.fromBufferAttribute(a, l), bt.applyMatrix4(e.matrixWorld), this.expandByPoint(bt);
      else
        e.boundingBox !== void 0 ? (e.boundingBox === null && e.computeBoundingBox(), kn.copy(e.boundingBox)) : (n.boundingBox === null && n.computeBoundingBox(), kn.copy(n.boundingBox)), kn.applyMatrix4(e.matrixWorld), this.union(kn);
    }
    const r = e.children;
    for (let a = 0, l = r.length; a < l; a++)
      this.expandByObject(r[a], t);
    return this;
  }
  containsPoint(e) {
    return !(e.x < this.min.x || e.x > this.max.x || e.y < this.min.y || e.y > this.max.y || e.z < this.min.z || e.z > this.max.z);
  }
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  getParameter(e, t) {
    return t.set(
      (e.x - this.min.x) / (this.max.x - this.min.x),
      (e.y - this.min.y) / (this.max.y - this.min.y),
      (e.z - this.min.z) / (this.max.z - this.min.z)
    );
  }
  intersectsBox(e) {
    return !(e.max.x < this.min.x || e.min.x > this.max.x || e.max.y < this.min.y || e.min.y > this.max.y || e.max.z < this.min.z || e.min.z > this.max.z);
  }
  intersectsSphere(e) {
    return this.clampPoint(e.center, bt), bt.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let t, n;
    return e.normal.x > 0 ? (t = e.normal.x * this.min.x, n = e.normal.x * this.max.x) : (t = e.normal.x * this.max.x, n = e.normal.x * this.min.x), e.normal.y > 0 ? (t += e.normal.y * this.min.y, n += e.normal.y * this.max.y) : (t += e.normal.y * this.max.y, n += e.normal.y * this.min.y), e.normal.z > 0 ? (t += e.normal.z * this.min.z, n += e.normal.z * this.max.z) : (t += e.normal.z * this.max.z, n += e.normal.z * this.min.z), t <= -e.constant && n >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty())
      return !1;
    this.getCenter(Ln), Wn.subVectors(this.max, Ln), ln.subVectors(e.a, Ln), cn.subVectors(e.b, Ln), un.subVectors(e.c, Ln), kt.subVectors(cn, ln), Wt.subVectors(un, cn), Jt.subVectors(ln, un);
    let t = [
      0,
      -kt.z,
      kt.y,
      0,
      -Wt.z,
      Wt.y,
      0,
      -Jt.z,
      Jt.y,
      kt.z,
      0,
      -kt.x,
      Wt.z,
      0,
      -Wt.x,
      Jt.z,
      0,
      -Jt.x,
      -kt.y,
      kt.x,
      0,
      -Wt.y,
      Wt.x,
      0,
      -Jt.y,
      Jt.x,
      0
    ];
    return !Pi(t, ln, cn, un, Wn) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !Pi(t, ln, cn, un, Wn)) ? !1 : (Xn.crossVectors(kt, Wt), t = [Xn.x, Xn.y, Xn.z], Pi(t, ln, cn, un, Wn));
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, bt).distanceTo(e);
  }
  getBoundingSphere(e) {
    return this.isEmpty() ? e.makeEmpty() : (this.getCenter(e.center), e.radius = this.getSize(bt).length() * 0.5), e;
  }
  intersect(e) {
    return this.min.max(e.min), this.max.min(e.max), this.isEmpty() && this.makeEmpty(), this;
  }
  union(e) {
    return this.min.min(e.min), this.max.max(e.max), this;
  }
  applyMatrix4(e) {
    return this.isEmpty() ? this : (Nt[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e), Nt[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e), Nt[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e), Nt[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e), Nt[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e), Nt[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e), Nt[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e), Nt[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e), this.setFromPoints(Nt), this);
  }
  translate(e) {
    return this.min.add(e), this.max.add(e), this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
}
const Nt = [
  /* @__PURE__ */ new G(),
  /* @__PURE__ */ new G(),
  /* @__PURE__ */ new G(),
  /* @__PURE__ */ new G(),
  /* @__PURE__ */ new G(),
  /* @__PURE__ */ new G(),
  /* @__PURE__ */ new G(),
  /* @__PURE__ */ new G()
], bt = /* @__PURE__ */ new G(), kn = /* @__PURE__ */ new Bn(), ln = /* @__PURE__ */ new G(), cn = /* @__PURE__ */ new G(), un = /* @__PURE__ */ new G(), kt = /* @__PURE__ */ new G(), Wt = /* @__PURE__ */ new G(), Jt = /* @__PURE__ */ new G(), Ln = /* @__PURE__ */ new G(), Wn = /* @__PURE__ */ new G(), Xn = /* @__PURE__ */ new G(), Qt = /* @__PURE__ */ new G();
function Pi(i, e, t, n, r) {
  for (let a = 0, l = i.length - 3; a <= l; a += 3) {
    Qt.fromArray(i, a);
    const s = r.x * Math.abs(Qt.x) + r.y * Math.abs(Qt.y) + r.z * Math.abs(Qt.z), o = e.dot(Qt), c = t.dot(Qt), h = n.dot(Qt);
    if (Math.max(-Math.max(o, c, h), Math.min(o, c, h)) > s)
      return !1;
  }
  return !0;
}
const Pa = /* @__PURE__ */ new Bn(), Pn = /* @__PURE__ */ new G(), Di = /* @__PURE__ */ new G();
class gi {
  constructor(e = new G(), t = -1) {
    this.isSphere = !0, this.center = e, this.radius = t;
  }
  set(e, t) {
    return this.center.copy(e), this.radius = t, this;
  }
  setFromPoints(e, t) {
    const n = this.center;
    t !== void 0 ? n.copy(t) : Pa.setFromPoints(e).getCenter(n);
    let r = 0;
    for (let a = 0, l = e.length; a < l; a++)
      r = Math.max(r, n.distanceToSquared(e[a]));
    return this.radius = Math.sqrt(r), this;
  }
  copy(e) {
    return this.center.copy(e.center), this.radius = e.radius, this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    return this.center.set(0, 0, 0), this.radius = -1, this;
  }
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(e, t) {
    const n = this.center.distanceToSquared(e);
    return t.copy(e), n > this.radius * this.radius && (t.sub(this.center).normalize(), t.multiplyScalar(this.radius).add(this.center)), t;
  }
  getBoundingBox(e) {
    return this.isEmpty() ? (e.makeEmpty(), e) : (e.set(this.center, this.center), e.expandByScalar(this.radius), e);
  }
  applyMatrix4(e) {
    return this.center.applyMatrix4(e), this.radius = this.radius * e.getMaxScaleOnAxis(), this;
  }
  translate(e) {
    return this.center.add(e), this;
  }
  expandByPoint(e) {
    if (this.isEmpty())
      return this.center.copy(e), this.radius = 0, this;
    Pn.subVectors(e, this.center);
    const t = Pn.lengthSq();
    if (t > this.radius * this.radius) {
      const n = Math.sqrt(t), r = (n - this.radius) * 0.5;
      this.center.addScaledVector(Pn, r / n), this.radius += r;
    }
    return this;
  }
  union(e) {
    return e.isEmpty() ? this : this.isEmpty() ? (this.copy(e), this) : (this.center.equals(e.center) === !0 ? this.radius = Math.max(this.radius, e.radius) : (Di.subVectors(e.center, this.center).setLength(e.radius), this.expandByPoint(Pn.copy(e.center).add(Di)), this.expandByPoint(Pn.copy(e.center).sub(Di))), this);
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const Ot = /* @__PURE__ */ new G(), Ui = /* @__PURE__ */ new G(), qn = /* @__PURE__ */ new G(), Xt = /* @__PURE__ */ new G(), Fi = /* @__PURE__ */ new G(), Yn = /* @__PURE__ */ new G(), Ii = /* @__PURE__ */ new G();
class Da {
  constructor(e = new G(), t = new G(0, 0, -1)) {
    this.origin = e, this.direction = t;
  }
  set(e, t) {
    return this.origin.copy(e), this.direction.copy(t), this;
  }
  copy(e) {
    return this.origin.copy(e.origin), this.direction.copy(e.direction), this;
  }
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  lookAt(e) {
    return this.direction.copy(e).sub(this.origin).normalize(), this;
  }
  recast(e) {
    return this.origin.copy(this.at(e, Ot)), this;
  }
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const n = t.dot(this.direction);
    return n < 0 ? t.copy(this.origin) : t.copy(this.origin).addScaledVector(this.direction, n);
  }
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  distanceSqToPoint(e) {
    const t = Ot.subVectors(e, this.origin).dot(this.direction);
    return t < 0 ? this.origin.distanceToSquared(e) : (Ot.copy(this.origin).addScaledVector(this.direction, t), Ot.distanceToSquared(e));
  }
  distanceSqToSegment(e, t, n, r) {
    Ui.copy(e).add(t).multiplyScalar(0.5), qn.copy(t).sub(e).normalize(), Xt.copy(this.origin).sub(Ui);
    const a = e.distanceTo(t) * 0.5, l = -this.direction.dot(qn), s = Xt.dot(this.direction), o = -Xt.dot(qn), c = Xt.lengthSq(), h = Math.abs(1 - l * l);
    let d, p, m, g;
    if (h > 0)
      if (d = l * o - s, p = l * s - o, g = a * h, d >= 0)
        if (p >= -g)
          if (p <= g) {
            const v = 1 / h;
            d *= v, p *= v, m = d * (d + l * p + 2 * s) + p * (l * d + p + 2 * o) + c;
          } else
            p = a, d = Math.max(0, -(l * p + s)), m = -d * d + p * (p + 2 * o) + c;
        else
          p = -a, d = Math.max(0, -(l * p + s)), m = -d * d + p * (p + 2 * o) + c;
      else
        p <= -g ? (d = Math.max(0, -(-l * a + s)), p = d > 0 ? -a : Math.min(Math.max(-a, -o), a), m = -d * d + p * (p + 2 * o) + c) : p <= g ? (d = 0, p = Math.min(Math.max(-a, -o), a), m = p * (p + 2 * o) + c) : (d = Math.max(0, -(l * a + s)), p = d > 0 ? a : Math.min(Math.max(-a, -o), a), m = -d * d + p * (p + 2 * o) + c);
    else
      p = l > 0 ? -a : a, d = Math.max(0, -(l * p + s)), m = -d * d + p * (p + 2 * o) + c;
    return n && n.copy(this.origin).addScaledVector(this.direction, d), r && r.copy(Ui).addScaledVector(qn, p), m;
  }
  intersectSphere(e, t) {
    Ot.subVectors(e.center, this.origin);
    const n = Ot.dot(this.direction), r = Ot.dot(Ot) - n * n, a = e.radius * e.radius;
    if (r > a) return null;
    const l = Math.sqrt(a - r), s = n - l, o = n + l;
    return o < 0 ? null : s < 0 ? this.at(o, t) : this.at(s, t);
  }
  intersectsSphere(e) {
    return this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (t === 0)
      return e.distanceToPoint(this.origin) === 0 ? 0 : null;
    const n = -(this.origin.dot(e.normal) + e.constant) / t;
    return n >= 0 ? n : null;
  }
  intersectPlane(e, t) {
    const n = this.distanceToPlane(e);
    return n === null ? null : this.at(n, t);
  }
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    return t === 0 || e.normal.dot(this.direction) * t < 0;
  }
  intersectBox(e, t) {
    let n, r, a, l, s, o;
    const c = 1 / this.direction.x, h = 1 / this.direction.y, d = 1 / this.direction.z, p = this.origin;
    return c >= 0 ? (n = (e.min.x - p.x) * c, r = (e.max.x - p.x) * c) : (n = (e.max.x - p.x) * c, r = (e.min.x - p.x) * c), h >= 0 ? (a = (e.min.y - p.y) * h, l = (e.max.y - p.y) * h) : (a = (e.max.y - p.y) * h, l = (e.min.y - p.y) * h), n > l || a > r || ((a > n || isNaN(n)) && (n = a), (l < r || isNaN(r)) && (r = l), d >= 0 ? (s = (e.min.z - p.z) * d, o = (e.max.z - p.z) * d) : (s = (e.max.z - p.z) * d, o = (e.min.z - p.z) * d), n > o || s > r) || ((s > n || n !== n) && (n = s), (o < r || r !== r) && (r = o), r < 0) ? null : this.at(n >= 0 ? n : r, t);
  }
  intersectsBox(e) {
    return this.intersectBox(e, Ot) !== null;
  }
  intersectTriangle(e, t, n, r, a) {
    Fi.subVectors(t, e), Yn.subVectors(n, e), Ii.crossVectors(Fi, Yn);
    let l = this.direction.dot(Ii), s;
    if (l > 0) {
      if (r) return null;
      s = 1;
    } else if (l < 0)
      s = -1, l = -l;
    else
      return null;
    Xt.subVectors(this.origin, e);
    const o = s * this.direction.dot(Yn.crossVectors(Xt, Yn));
    if (o < 0)
      return null;
    const c = s * this.direction.dot(Fi.cross(Xt));
    if (c < 0 || o + c > l)
      return null;
    const h = -s * Xt.dot(Ii);
    return h < 0 ? null : this.at(h / l, a);
  }
  applyMatrix4(e) {
    return this.origin.applyMatrix4(e), this.direction.transformDirection(e), this;
  }
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class ct {
  constructor(e, t, n, r, a, l, s, o, c, h, d, p, m, g, v, f) {
    ct.prototype.isMatrix4 = !0, this.elements = [
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ], e !== void 0 && this.set(e, t, n, r, a, l, s, o, c, h, d, p, m, g, v, f);
  }
  set(e, t, n, r, a, l, s, o, c, h, d, p, m, g, v, f) {
    const u = this.elements;
    return u[0] = e, u[4] = t, u[8] = n, u[12] = r, u[1] = a, u[5] = l, u[9] = s, u[13] = o, u[2] = c, u[6] = h, u[10] = d, u[14] = p, u[3] = m, u[7] = g, u[11] = v, u[15] = f, this;
  }
  identity() {
    return this.set(
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  clone() {
    return new ct().fromArray(this.elements);
  }
  copy(e) {
    const t = this.elements, n = e.elements;
    return t[0] = n[0], t[1] = n[1], t[2] = n[2], t[3] = n[3], t[4] = n[4], t[5] = n[5], t[6] = n[6], t[7] = n[7], t[8] = n[8], t[9] = n[9], t[10] = n[10], t[11] = n[11], t[12] = n[12], t[13] = n[13], t[14] = n[14], t[15] = n[15], this;
  }
  copyPosition(e) {
    const t = this.elements, n = e.elements;
    return t[12] = n[12], t[13] = n[13], t[14] = n[14], this;
  }
  setFromMatrix3(e) {
    const t = e.elements;
    return this.set(
      t[0],
      t[3],
      t[6],
      0,
      t[1],
      t[4],
      t[7],
      0,
      t[2],
      t[5],
      t[8],
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractBasis(e, t, n) {
    return e.setFromMatrixColumn(this, 0), t.setFromMatrixColumn(this, 1), n.setFromMatrixColumn(this, 2), this;
  }
  makeBasis(e, t, n) {
    return this.set(
      e.x,
      t.x,
      n.x,
      0,
      e.y,
      t.y,
      n.y,
      0,
      e.z,
      t.z,
      n.z,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  extractRotation(e) {
    const t = this.elements, n = e.elements, r = 1 / hn.setFromMatrixColumn(e, 0).length(), a = 1 / hn.setFromMatrixColumn(e, 1).length(), l = 1 / hn.setFromMatrixColumn(e, 2).length();
    return t[0] = n[0] * r, t[1] = n[1] * r, t[2] = n[2] * r, t[3] = 0, t[4] = n[4] * a, t[5] = n[5] * a, t[6] = n[6] * a, t[7] = 0, t[8] = n[8] * l, t[9] = n[9] * l, t[10] = n[10] * l, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromEuler(e) {
    const t = this.elements, n = e.x, r = e.y, a = e.z, l = Math.cos(n), s = Math.sin(n), o = Math.cos(r), c = Math.sin(r), h = Math.cos(a), d = Math.sin(a);
    if (e.order === "XYZ") {
      const p = l * h, m = l * d, g = s * h, v = s * d;
      t[0] = o * h, t[4] = -o * d, t[8] = c, t[1] = m + g * c, t[5] = p - v * c, t[9] = -s * o, t[2] = v - p * c, t[6] = g + m * c, t[10] = l * o;
    } else if (e.order === "YXZ") {
      const p = o * h, m = o * d, g = c * h, v = c * d;
      t[0] = p + v * s, t[4] = g * s - m, t[8] = l * c, t[1] = l * d, t[5] = l * h, t[9] = -s, t[2] = m * s - g, t[6] = v + p * s, t[10] = l * o;
    } else if (e.order === "ZXY") {
      const p = o * h, m = o * d, g = c * h, v = c * d;
      t[0] = p - v * s, t[4] = -l * d, t[8] = g + m * s, t[1] = m + g * s, t[5] = l * h, t[9] = v - p * s, t[2] = -l * c, t[6] = s, t[10] = l * o;
    } else if (e.order === "ZYX") {
      const p = l * h, m = l * d, g = s * h, v = s * d;
      t[0] = o * h, t[4] = g * c - m, t[8] = p * c + v, t[1] = o * d, t[5] = v * c + p, t[9] = m * c - g, t[2] = -c, t[6] = s * o, t[10] = l * o;
    } else if (e.order === "YZX") {
      const p = l * o, m = l * c, g = s * o, v = s * c;
      t[0] = o * h, t[4] = v - p * d, t[8] = g * d + m, t[1] = d, t[5] = l * h, t[9] = -s * h, t[2] = -c * h, t[6] = m * d + g, t[10] = p - v * d;
    } else if (e.order === "XZY") {
      const p = l * o, m = l * c, g = s * o, v = s * c;
      t[0] = o * h, t[4] = -d, t[8] = c * h, t[1] = p * d + v, t[5] = l * h, t[9] = m * d - g, t[2] = g * d - m, t[6] = s * h, t[10] = v * d + p;
    }
    return t[3] = 0, t[7] = 0, t[11] = 0, t[12] = 0, t[13] = 0, t[14] = 0, t[15] = 1, this;
  }
  makeRotationFromQuaternion(e) {
    return this.compose(Ua, e, Fa);
  }
  lookAt(e, t, n) {
    const r = this.elements;
    return St.subVectors(e, t), St.lengthSq() === 0 && (St.z = 1), St.normalize(), qt.crossVectors(n, St), qt.lengthSq() === 0 && (Math.abs(n.z) === 1 ? St.x += 1e-4 : St.z += 1e-4, St.normalize(), qt.crossVectors(n, St)), qt.normalize(), Kn.crossVectors(St, qt), r[0] = qt.x, r[4] = Kn.x, r[8] = St.x, r[1] = qt.y, r[5] = Kn.y, r[9] = St.y, r[2] = qt.z, r[6] = Kn.z, r[10] = St.z, this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const n = e.elements, r = t.elements, a = this.elements, l = n[0], s = n[4], o = n[8], c = n[12], h = n[1], d = n[5], p = n[9], m = n[13], g = n[2], v = n[6], f = n[10], u = n[14], y = n[3], S = n[7], w = n[11], D = n[15], C = r[0], R = r[4], K = r[8], M = r[12], T = r[1], z = r[5], Y = r[9], ie = r[13], L = r[2], I = r[6], V = r[10], q = r[14], X = r[3], k = r[7], j = r[11], A = r[15];
    return a[0] = l * C + s * T + o * L + c * X, a[4] = l * R + s * z + o * I + c * k, a[8] = l * K + s * Y + o * V + c * j, a[12] = l * M + s * ie + o * q + c * A, a[1] = h * C + d * T + p * L + m * X, a[5] = h * R + d * z + p * I + m * k, a[9] = h * K + d * Y + p * V + m * j, a[13] = h * M + d * ie + p * q + m * A, a[2] = g * C + v * T + f * L + u * X, a[6] = g * R + v * z + f * I + u * k, a[10] = g * K + v * Y + f * V + u * j, a[14] = g * M + v * ie + f * q + u * A, a[3] = y * C + S * T + w * L + D * X, a[7] = y * R + S * z + w * I + D * k, a[11] = y * K + S * Y + w * V + D * j, a[15] = y * M + S * ie + w * q + D * A, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], n = e[4], r = e[8], a = e[12], l = e[1], s = e[5], o = e[9], c = e[13], h = e[2], d = e[6], p = e[10], m = e[14], g = e[3], v = e[7], f = e[11], u = e[15];
    return g * (+a * o * d - r * c * d - a * s * p + n * c * p + r * s * m - n * o * m) + v * (+t * o * m - t * c * p + a * l * p - r * l * m + r * c * h - a * o * h) + f * (+t * c * d - t * s * m - a * l * d + n * l * m + a * s * h - n * c * h) + u * (-r * s * h - t * o * d + t * s * p + r * l * d - n * l * p + n * o * h);
  }
  transpose() {
    const e = this.elements;
    let t;
    return t = e[1], e[1] = e[4], e[4] = t, t = e[2], e[2] = e[8], e[8] = t, t = e[6], e[6] = e[9], e[9] = t, t = e[3], e[3] = e[12], e[12] = t, t = e[7], e[7] = e[13], e[13] = t, t = e[11], e[11] = e[14], e[14] = t, this;
  }
  setPosition(e, t, n) {
    const r = this.elements;
    return e.isVector3 ? (r[12] = e.x, r[13] = e.y, r[14] = e.z) : (r[12] = e, r[13] = t, r[14] = n), this;
  }
  invert() {
    const e = this.elements, t = e[0], n = e[1], r = e[2], a = e[3], l = e[4], s = e[5], o = e[6], c = e[7], h = e[8], d = e[9], p = e[10], m = e[11], g = e[12], v = e[13], f = e[14], u = e[15], y = d * f * c - v * p * c + v * o * m - s * f * m - d * o * u + s * p * u, S = g * p * c - h * f * c - g * o * m + l * f * m + h * o * u - l * p * u, w = h * v * c - g * d * c + g * s * m - l * v * m - h * s * u + l * d * u, D = g * d * o - h * v * o - g * s * p + l * v * p + h * s * f - l * d * f, C = t * y + n * S + r * w + a * D;
    if (C === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const R = 1 / C;
    return e[0] = y * R, e[1] = (v * p * a - d * f * a - v * r * m + n * f * m + d * r * u - n * p * u) * R, e[2] = (s * f * a - v * o * a + v * r * c - n * f * c - s * r * u + n * o * u) * R, e[3] = (d * o * a - s * p * a - d * r * c + n * p * c + s * r * m - n * o * m) * R, e[4] = S * R, e[5] = (h * f * a - g * p * a + g * r * m - t * f * m - h * r * u + t * p * u) * R, e[6] = (g * o * a - l * f * a - g * r * c + t * f * c + l * r * u - t * o * u) * R, e[7] = (l * p * a - h * o * a + h * r * c - t * p * c - l * r * m + t * o * m) * R, e[8] = w * R, e[9] = (g * d * a - h * v * a - g * n * m + t * v * m + h * n * u - t * d * u) * R, e[10] = (l * v * a - g * s * a + g * n * c - t * v * c - l * n * u + t * s * u) * R, e[11] = (h * s * a - l * d * a - h * n * c + t * d * c + l * n * m - t * s * m) * R, e[12] = D * R, e[13] = (h * v * r - g * d * r + g * n * p - t * v * p - h * n * f + t * d * f) * R, e[14] = (g * s * r - l * v * r - g * n * o + t * v * o + l * n * f - t * s * f) * R, e[15] = (l * d * r - h * s * r + h * n * o - t * d * o - l * n * p + t * s * p) * R, this;
  }
  scale(e) {
    const t = this.elements, n = e.x, r = e.y, a = e.z;
    return t[0] *= n, t[4] *= r, t[8] *= a, t[1] *= n, t[5] *= r, t[9] *= a, t[2] *= n, t[6] *= r, t[10] *= a, t[3] *= n, t[7] *= r, t[11] *= a, this;
  }
  getMaxScaleOnAxis() {
    const e = this.elements, t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2], n = e[4] * e[4] + e[5] * e[5] + e[6] * e[6], r = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(t, n, r));
  }
  makeTranslation(e, t, n) {
    return e.isVector3 ? this.set(
      1,
      0,
      0,
      e.x,
      0,
      1,
      0,
      e.y,
      0,
      0,
      1,
      e.z,
      0,
      0,
      0,
      1
    ) : this.set(
      1,
      0,
      0,
      e,
      0,
      1,
      0,
      t,
      0,
      0,
      1,
      n,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationX(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      1,
      0,
      0,
      0,
      0,
      t,
      -n,
      0,
      0,
      n,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationY(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      0,
      n,
      0,
      0,
      1,
      0,
      0,
      -n,
      0,
      t,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationZ(e) {
    const t = Math.cos(e), n = Math.sin(e);
    return this.set(
      t,
      -n,
      0,
      0,
      n,
      t,
      0,
      0,
      0,
      0,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeRotationAxis(e, t) {
    const n = Math.cos(t), r = Math.sin(t), a = 1 - n, l = e.x, s = e.y, o = e.z, c = a * l, h = a * s;
    return this.set(
      c * l + n,
      c * s - r * o,
      c * o + r * s,
      0,
      c * s + r * o,
      h * s + n,
      h * o - r * l,
      0,
      c * o - r * s,
      h * o + r * l,
      a * o * o + n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeScale(e, t, n) {
    return this.set(
      e,
      0,
      0,
      0,
      0,
      t,
      0,
      0,
      0,
      0,
      n,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  makeShear(e, t, n, r, a, l) {
    return this.set(
      1,
      n,
      a,
      0,
      e,
      1,
      l,
      0,
      t,
      r,
      1,
      0,
      0,
      0,
      0,
      1
    ), this;
  }
  compose(e, t, n) {
    const r = this.elements, a = t._x, l = t._y, s = t._z, o = t._w, c = a + a, h = l + l, d = s + s, p = a * c, m = a * h, g = a * d, v = l * h, f = l * d, u = s * d, y = o * c, S = o * h, w = o * d, D = n.x, C = n.y, R = n.z;
    return r[0] = (1 - (v + u)) * D, r[1] = (m + w) * D, r[2] = (g - S) * D, r[3] = 0, r[4] = (m - w) * C, r[5] = (1 - (p + u)) * C, r[6] = (f + y) * C, r[7] = 0, r[8] = (g + S) * R, r[9] = (f - y) * R, r[10] = (1 - (p + v)) * R, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this;
  }
  decompose(e, t, n) {
    const r = this.elements;
    let a = hn.set(r[0], r[1], r[2]).length();
    const l = hn.set(r[4], r[5], r[6]).length(), s = hn.set(r[8], r[9], r[10]).length();
    this.determinant() < 0 && (a = -a), e.x = r[12], e.y = r[13], e.z = r[14], Rt.copy(this);
    const c = 1 / a, h = 1 / l, d = 1 / s;
    return Rt.elements[0] *= c, Rt.elements[1] *= c, Rt.elements[2] *= c, Rt.elements[4] *= h, Rt.elements[5] *= h, Rt.elements[6] *= h, Rt.elements[8] *= d, Rt.elements[9] *= d, Rt.elements[10] *= d, t.setFromRotationMatrix(Rt), n.x = a, n.y = l, n.z = s, this;
  }
  makePerspective(e, t, n, r, a, l, s = 2e3) {
    const o = this.elements, c = 2 * a / (t - e), h = 2 * a / (n - r), d = (t + e) / (t - e), p = (n + r) / (n - r);
    let m, g;
    if (s === 2e3)
      m = -(l + a) / (l - a), g = -2 * l * a / (l - a);
    else if (s === 2001)
      m = -l / (l - a), g = -l * a / (l - a);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + s);
    return o[0] = c, o[4] = 0, o[8] = d, o[12] = 0, o[1] = 0, o[5] = h, o[9] = p, o[13] = 0, o[2] = 0, o[6] = 0, o[10] = m, o[14] = g, o[3] = 0, o[7] = 0, o[11] = -1, o[15] = 0, this;
  }
  makeOrthographic(e, t, n, r, a, l, s = 2e3) {
    const o = this.elements, c = 1 / (t - e), h = 1 / (n - r), d = 1 / (l - a), p = (t + e) * c, m = (n + r) * h;
    let g, v;
    if (s === 2e3)
      g = (l + a) * d, v = -2 * d;
    else if (s === 2001)
      g = a * d, v = -1 * d;
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + s);
    return o[0] = 2 * c, o[4] = 0, o[8] = 0, o[12] = -p, o[1] = 0, o[5] = 2 * h, o[9] = 0, o[13] = -m, o[2] = 0, o[6] = 0, o[10] = v, o[14] = -g, o[3] = 0, o[7] = 0, o[11] = 0, o[15] = 1, this;
  }
  equals(e) {
    const t = this.elements, n = e.elements;
    for (let r = 0; r < 16; r++)
      if (t[r] !== n[r]) return !1;
    return !0;
  }
  fromArray(e, t = 0) {
    for (let n = 0; n < 16; n++)
      this.elements[n] = e[n + t];
    return this;
  }
  toArray(e = [], t = 0) {
    const n = this.elements;
    return e[t] = n[0], e[t + 1] = n[1], e[t + 2] = n[2], e[t + 3] = n[3], e[t + 4] = n[4], e[t + 5] = n[5], e[t + 6] = n[6], e[t + 7] = n[7], e[t + 8] = n[8], e[t + 9] = n[9], e[t + 10] = n[10], e[t + 11] = n[11], e[t + 12] = n[12], e[t + 13] = n[13], e[t + 14] = n[14], e[t + 15] = n[15], e;
  }
}
const hn = /* @__PURE__ */ new G(), Rt = /* @__PURE__ */ new ct(), Ua = /* @__PURE__ */ new G(0, 0, 0), Fa = /* @__PURE__ */ new G(1, 1, 1), qt = /* @__PURE__ */ new G(), Kn = /* @__PURE__ */ new G(), St = /* @__PURE__ */ new G(), gr = /* @__PURE__ */ new ct(), vr = /* @__PURE__ */ new On();
class vi {
  constructor(e = 0, t = 0, n = 0, r = vi.DEFAULT_ORDER) {
    this.isEuler = !0, this._x = e, this._y = t, this._z = n, this._order = r;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e, this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e, this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e, this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(e) {
    this._order = e, this._onChangeCallback();
  }
  set(e, t, n, r = this._order) {
    return this._x = e, this._y = t, this._z = n, this._order = r, this._onChangeCallback(), this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(e) {
    return this._x = e._x, this._y = e._y, this._z = e._z, this._order = e._order, this._onChangeCallback(), this;
  }
  setFromRotationMatrix(e, t = this._order, n = !0) {
    const r = e.elements, a = r[0], l = r[4], s = r[8], o = r[1], c = r[5], h = r[9], d = r[2], p = r[6], m = r[10];
    switch (t) {
      case "XYZ":
        this._y = Math.asin(gt(s, -1, 1)), Math.abs(s) < 0.9999999 ? (this._x = Math.atan2(-h, m), this._z = Math.atan2(-l, a)) : (this._x = Math.atan2(p, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-gt(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(s, m), this._z = Math.atan2(o, c)) : (this._y = Math.atan2(-d, a), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(gt(p, -1, 1)), Math.abs(p) < 0.9999999 ? (this._y = Math.atan2(-d, m), this._z = Math.atan2(-l, c)) : (this._y = 0, this._z = Math.atan2(o, a));
        break;
      case "ZYX":
        this._y = Math.asin(-gt(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._x = Math.atan2(p, m), this._z = Math.atan2(o, a)) : (this._x = 0, this._z = Math.atan2(-l, c));
        break;
      case "YZX":
        this._z = Math.asin(gt(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-h, c), this._y = Math.atan2(-d, a)) : (this._x = 0, this._y = Math.atan2(s, m));
        break;
      case "XZY":
        this._z = Math.asin(-gt(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(p, c), this._y = Math.atan2(s, a)) : (this._x = Math.atan2(-h, m), this._y = 0);
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
    }
    return this._order = t, n === !0 && this._onChangeCallback(), this;
  }
  setFromQuaternion(e, t, n) {
    return gr.makeRotationFromQuaternion(e), this.setFromRotationMatrix(gr, t, n);
  }
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  reorder(e) {
    return vr.setFromEuler(this), this.setFromQuaternion(vr, e);
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  fromArray(e) {
    return this._x = e[0], this._y = e[1], this._z = e[2], e[3] !== void 0 && (this._order = e[3]), this._onChangeCallback(), this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this._x, e[t + 1] = this._y, e[t + 2] = this._z, e[t + 3] = this._order, e;
  }
  _onChange(e) {
    return this._onChangeCallback = e, this;
  }
  _onChangeCallback() {
  }
  *[Symbol.iterator]() {
    yield this._x, yield this._y, yield this._z, yield this._order;
  }
}
vi.DEFAULT_ORDER = "XYZ";
class ta {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  isEnabled(e) {
    return (this.mask & (1 << e | 0)) !== 0;
  }
}
let Ia = 0;
const xr = /* @__PURE__ */ new G(), fn = /* @__PURE__ */ new On(), Bt = /* @__PURE__ */ new ct(), Zn = /* @__PURE__ */ new G(), Dn = /* @__PURE__ */ new G(), Na = /* @__PURE__ */ new G(), Oa = /* @__PURE__ */ new On(), Sr = /* @__PURE__ */ new G(1, 0, 0), Mr = /* @__PURE__ */ new G(0, 1, 0), Er = /* @__PURE__ */ new G(0, 0, 1), Ba = { type: "added" }, Ga = { type: "removed" };
class Et extends bn {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Ia++ }), this.uuid = Nn(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = Et.DEFAULT_UP.clone();
    const e = new G(), t = new vi(), n = new On(), r = new G(1, 1, 1);
    function a() {
      n.setFromEuler(t, !1);
    }
    function l() {
      t.setFromQuaternion(n, void 0, !1);
    }
    t._onChange(a), n._onChange(l), Object.defineProperties(this, {
      position: {
        configurable: !0,
        enumerable: !0,
        value: e
      },
      rotation: {
        configurable: !0,
        enumerable: !0,
        value: t
      },
      quaternion: {
        configurable: !0,
        enumerable: !0,
        value: n
      },
      scale: {
        configurable: !0,
        enumerable: !0,
        value: r
      },
      modelViewMatrix: {
        value: new ct()
      },
      normalMatrix: {
        value: new Oe()
      }
    }), this.matrix = new ct(), this.matrixWorld = new ct(), this.matrixAutoUpdate = Et.DEFAULT_MATRIX_AUTO_UPDATE, this.matrixWorldAutoUpdate = Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE, this.matrixWorldNeedsUpdate = !1, this.layers = new ta(), this.visible = !0, this.castShadow = !1, this.receiveShadow = !1, this.frustumCulled = !0, this.renderOrder = 0, this.animations = [], this.userData = {};
  }
  onBeforeShadow() {
  }
  onAfterShadow() {
  }
  onBeforeRender() {
  }
  onAfterRender() {
  }
  applyMatrix4(e) {
    this.matrixAutoUpdate && this.updateMatrix(), this.matrix.premultiply(e), this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(e) {
    return this.quaternion.premultiply(e), this;
  }
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, !0);
  }
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  rotateOnAxis(e, t) {
    return fn.setFromAxisAngle(e, t), this.quaternion.multiply(fn), this;
  }
  rotateOnWorldAxis(e, t) {
    return fn.setFromAxisAngle(e, t), this.quaternion.premultiply(fn), this;
  }
  rotateX(e) {
    return this.rotateOnAxis(Sr, e);
  }
  rotateY(e) {
    return this.rotateOnAxis(Mr, e);
  }
  rotateZ(e) {
    return this.rotateOnAxis(Er, e);
  }
  translateOnAxis(e, t) {
    return xr.copy(e).applyQuaternion(this.quaternion), this.position.add(xr.multiplyScalar(t)), this;
  }
  translateX(e) {
    return this.translateOnAxis(Sr, e);
  }
  translateY(e) {
    return this.translateOnAxis(Mr, e);
  }
  translateZ(e) {
    return this.translateOnAxis(Er, e);
  }
  localToWorld(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(e) {
    return this.updateWorldMatrix(!0, !1), e.applyMatrix4(Bt.copy(this.matrixWorld).invert());
  }
  lookAt(e, t, n) {
    e.isVector3 ? Zn.copy(e) : Zn.set(e, t, n);
    const r = this.parent;
    this.updateWorldMatrix(!0, !1), Dn.setFromMatrixPosition(this.matrixWorld), this.isCamera || this.isLight ? Bt.lookAt(Dn, Zn, this.up) : Bt.lookAt(Zn, Dn, this.up), this.quaternion.setFromRotationMatrix(Bt), r && (Bt.extractRotation(r.matrixWorld), fn.setFromRotationMatrix(Bt), this.quaternion.premultiply(fn.invert()));
  }
  add(e) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++)
        this.add(arguments[t]);
      return this;
    }
    return e === this ? (console.error("THREE.Object3D.add: object can't be added as a child of itself.", e), this) : (e && e.isObject3D ? (e.parent !== null && e.parent.remove(e), e.parent = this, this.children.push(e), e.dispatchEvent(Ba)) : console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e), this);
  }
  remove(e) {
    if (arguments.length > 1) {
      for (let n = 0; n < arguments.length; n++)
        this.remove(arguments[n]);
      return this;
    }
    const t = this.children.indexOf(e);
    return t !== -1 && (e.parent = null, this.children.splice(t, 1), e.dispatchEvent(Ga)), this;
  }
  removeFromParent() {
    const e = this.parent;
    return e !== null && e.remove(this), this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(e) {
    return this.updateWorldMatrix(!0, !1), Bt.copy(this.matrixWorld).invert(), e.parent !== null && (e.parent.updateWorldMatrix(!0, !1), Bt.multiply(e.parent.matrixWorld)), e.applyMatrix4(Bt), this.add(e), e.updateWorldMatrix(!1, !0), this;
  }
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  getObjectByProperty(e, t) {
    if (this[e] === t) return this;
    for (let n = 0, r = this.children.length; n < r; n++) {
      const l = this.children[n].getObjectByProperty(e, t);
      if (l !== void 0)
        return l;
    }
  }
  getObjectsByProperty(e, t, n = []) {
    this[e] === t && n.push(this);
    const r = this.children;
    for (let a = 0, l = r.length; a < l; a++)
      r[a].getObjectsByProperty(e, t, n);
    return n;
  }
  getWorldPosition(e) {
    return this.updateWorldMatrix(!0, !1), e.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Dn, e, Na), e;
  }
  getWorldScale(e) {
    return this.updateWorldMatrix(!0, !1), this.matrixWorld.decompose(Dn, Oa, e), e;
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(!0, !1);
    const t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  raycast() {
  }
  traverse(e) {
    e(this);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++)
      t[n].traverse(e);
  }
  traverseVisible(e) {
    if (this.visible === !1) return;
    e(this);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++)
      t[n].traverseVisible(e);
  }
  traverseAncestors(e) {
    const t = this.parent;
    t !== null && (e(t), t.traverseAncestors(e));
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale), this.matrixWorldNeedsUpdate = !0;
  }
  updateMatrixWorld(e) {
    this.matrixAutoUpdate && this.updateMatrix(), (this.matrixWorldNeedsUpdate || e) && (this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), this.matrixWorldNeedsUpdate = !1, e = !0);
    const t = this.children;
    for (let n = 0, r = t.length; n < r; n++) {
      const a = t[n];
      (a.matrixWorldAutoUpdate === !0 || e === !0) && a.updateMatrixWorld(e);
    }
  }
  updateWorldMatrix(e, t) {
    const n = this.parent;
    if (e === !0 && n !== null && n.matrixWorldAutoUpdate === !0 && n.updateWorldMatrix(!0, !1), this.matrixAutoUpdate && this.updateMatrix(), this.parent === null ? this.matrixWorld.copy(this.matrix) : this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix), t === !0) {
      const r = this.children;
      for (let a = 0, l = r.length; a < l; a++) {
        const s = r[a];
        s.matrixWorldAutoUpdate === !0 && s.updateWorldMatrix(!1, !0);
      }
    }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string", n = {};
    t && (e = {
      geometries: {},
      materials: {},
      textures: {},
      images: {},
      shapes: {},
      skeletons: {},
      animations: {},
      nodes: {}
    }, n.metadata = {
      version: 4.6,
      type: "Object",
      generator: "Object3D.toJSON"
    });
    const r = {};
    r.uuid = this.uuid, r.type = this.type, this.name !== "" && (r.name = this.name), this.castShadow === !0 && (r.castShadow = !0), this.receiveShadow === !0 && (r.receiveShadow = !0), this.visible === !1 && (r.visible = !1), this.frustumCulled === !1 && (r.frustumCulled = !1), this.renderOrder !== 0 && (r.renderOrder = this.renderOrder), Object.keys(this.userData).length > 0 && (r.userData = this.userData), r.layers = this.layers.mask, r.matrix = this.matrix.toArray(), r.up = this.up.toArray(), this.matrixAutoUpdate === !1 && (r.matrixAutoUpdate = !1), this.isInstancedMesh && (r.type = "InstancedMesh", r.count = this.count, r.instanceMatrix = this.instanceMatrix.toJSON(), this.instanceColor !== null && (r.instanceColor = this.instanceColor.toJSON())), this.isBatchedMesh && (r.type = "BatchedMesh", r.perObjectFrustumCulled = this.perObjectFrustumCulled, r.sortObjects = this.sortObjects, r.drawRanges = this._drawRanges, r.reservedRanges = this._reservedRanges, r.visibility = this._visibility, r.active = this._active, r.bounds = this._bounds.map((s) => ({
      boxInitialized: s.boxInitialized,
      boxMin: s.box.min.toArray(),
      boxMax: s.box.max.toArray(),
      sphereInitialized: s.sphereInitialized,
      sphereRadius: s.sphere.radius,
      sphereCenter: s.sphere.center.toArray()
    })), r.maxGeometryCount = this._maxGeometryCount, r.maxVertexCount = this._maxVertexCount, r.maxIndexCount = this._maxIndexCount, r.geometryInitialized = this._geometryInitialized, r.geometryCount = this._geometryCount, r.matricesTexture = this._matricesTexture.toJSON(e), this.boundingSphere !== null && (r.boundingSphere = {
      center: r.boundingSphere.center.toArray(),
      radius: r.boundingSphere.radius
    }), this.boundingBox !== null && (r.boundingBox = {
      min: r.boundingBox.min.toArray(),
      max: r.boundingBox.max.toArray()
    }));
    function a(s, o) {
      return s[o.uuid] === void 0 && (s[o.uuid] = o.toJSON(e)), o.uuid;
    }
    if (this.isScene)
      this.background && (this.background.isColor ? r.background = this.background.toJSON() : this.background.isTexture && (r.background = this.background.toJSON(e).uuid)), this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== !0 && (r.environment = this.environment.toJSON(e).uuid);
    else if (this.isMesh || this.isLine || this.isPoints) {
      r.geometry = a(e.geometries, this.geometry);
      const s = this.geometry.parameters;
      if (s !== void 0 && s.shapes !== void 0) {
        const o = s.shapes;
        if (Array.isArray(o))
          for (let c = 0, h = o.length; c < h; c++) {
            const d = o[c];
            a(e.shapes, d);
          }
        else
          a(e.shapes, o);
      }
    }
    if (this.isSkinnedMesh && (r.bindMode = this.bindMode, r.bindMatrix = this.bindMatrix.toArray(), this.skeleton !== void 0 && (a(e.skeletons, this.skeleton), r.skeleton = this.skeleton.uuid)), this.material !== void 0)
      if (Array.isArray(this.material)) {
        const s = [];
        for (let o = 0, c = this.material.length; o < c; o++)
          s.push(a(e.materials, this.material[o]));
        r.material = s;
      } else
        r.material = a(e.materials, this.material);
    if (this.children.length > 0) {
      r.children = [];
      for (let s = 0; s < this.children.length; s++)
        r.children.push(this.children[s].toJSON(e).object);
    }
    if (this.animations.length > 0) {
      r.animations = [];
      for (let s = 0; s < this.animations.length; s++) {
        const o = this.animations[s];
        r.animations.push(a(e.animations, o));
      }
    }
    if (t) {
      const s = l(e.geometries), o = l(e.materials), c = l(e.textures), h = l(e.images), d = l(e.shapes), p = l(e.skeletons), m = l(e.animations), g = l(e.nodes);
      s.length > 0 && (n.geometries = s), o.length > 0 && (n.materials = o), c.length > 0 && (n.textures = c), h.length > 0 && (n.images = h), d.length > 0 && (n.shapes = d), p.length > 0 && (n.skeletons = p), m.length > 0 && (n.animations = m), g.length > 0 && (n.nodes = g);
    }
    return n.object = r, n;
    function l(s) {
      const o = [];
      for (const c in s) {
        const h = s[c];
        delete h.metadata, o.push(h);
      }
      return o;
    }
  }
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  copy(e, t = !0) {
    if (this.name = e.name, this.up.copy(e.up), this.position.copy(e.position), this.rotation.order = e.rotation.order, this.quaternion.copy(e.quaternion), this.scale.copy(e.scale), this.matrix.copy(e.matrix), this.matrixWorld.copy(e.matrixWorld), this.matrixAutoUpdate = e.matrixAutoUpdate, this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate, this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate, this.layers.mask = e.layers.mask, this.visible = e.visible, this.castShadow = e.castShadow, this.receiveShadow = e.receiveShadow, this.frustumCulled = e.frustumCulled, this.renderOrder = e.renderOrder, this.animations = e.animations.slice(), this.userData = JSON.parse(JSON.stringify(e.userData)), t === !0)
      for (let n = 0; n < e.children.length; n++) {
        const r = e.children[n];
        this.add(r.clone());
      }
    return this;
  }
}
Et.DEFAULT_UP = /* @__PURE__ */ new G(0, 1, 0);
Et.DEFAULT_MATRIX_AUTO_UPDATE = !0;
Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const wt = /* @__PURE__ */ new G(), Gt = /* @__PURE__ */ new G(), Ni = /* @__PURE__ */ new G(), Ht = /* @__PURE__ */ new G(), dn = /* @__PURE__ */ new G(), pn = /* @__PURE__ */ new G(), Tr = /* @__PURE__ */ new G(), Oi = /* @__PURE__ */ new G(), Bi = /* @__PURE__ */ new G(), Gi = /* @__PURE__ */ new G();
let jn = !1;
class Ct {
  constructor(e = new G(), t = new G(), n = new G()) {
    this.a = e, this.b = t, this.c = n;
  }
  static getNormal(e, t, n, r) {
    r.subVectors(n, t), wt.subVectors(e, t), r.cross(wt);
    const a = r.lengthSq();
    return a > 0 ? r.multiplyScalar(1 / Math.sqrt(a)) : r.set(0, 0, 0);
  }
  // static/instance method to calculate barycentric coordinates
  // based on: http://www.blackpawn.com/texts/pointinpoly/default.html
  static getBarycoord(e, t, n, r, a) {
    wt.subVectors(r, t), Gt.subVectors(n, t), Ni.subVectors(e, t);
    const l = wt.dot(wt), s = wt.dot(Gt), o = wt.dot(Ni), c = Gt.dot(Gt), h = Gt.dot(Ni), d = l * c - s * s;
    if (d === 0)
      return a.set(0, 0, 0), null;
    const p = 1 / d, m = (c * o - s * h) * p, g = (l * h - s * o) * p;
    return a.set(1 - m - g, g, m);
  }
  static containsPoint(e, t, n, r) {
    return this.getBarycoord(e, t, n, r, Ht) === null ? !1 : Ht.x >= 0 && Ht.y >= 0 && Ht.x + Ht.y <= 1;
  }
  static getUV(e, t, n, r, a, l, s, o) {
    return jn === !1 && (console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."), jn = !0), this.getInterpolation(e, t, n, r, a, l, s, o);
  }
  static getInterpolation(e, t, n, r, a, l, s, o) {
    return this.getBarycoord(e, t, n, r, Ht) === null ? (o.x = 0, o.y = 0, "z" in o && (o.z = 0), "w" in o && (o.w = 0), null) : (o.setScalar(0), o.addScaledVector(a, Ht.x), o.addScaledVector(l, Ht.y), o.addScaledVector(s, Ht.z), o);
  }
  static isFrontFacing(e, t, n, r) {
    return wt.subVectors(n, t), Gt.subVectors(e, t), wt.cross(Gt).dot(r) < 0;
  }
  set(e, t, n) {
    return this.a.copy(e), this.b.copy(t), this.c.copy(n), this;
  }
  setFromPointsAndIndices(e, t, n, r) {
    return this.a.copy(e[t]), this.b.copy(e[n]), this.c.copy(e[r]), this;
  }
  setFromAttributeAndIndices(e, t, n, r) {
    return this.a.fromBufferAttribute(e, t), this.b.fromBufferAttribute(e, n), this.c.fromBufferAttribute(e, r), this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    return this.a.copy(e.a), this.b.copy(e.b), this.c.copy(e.c), this;
  }
  getArea() {
    return wt.subVectors(this.c, this.b), Gt.subVectors(this.a, this.b), wt.cross(Gt).length() * 0.5;
  }
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(e) {
    return Ct.getNormal(this.a, this.b, this.c, e);
  }
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(e, t) {
    return Ct.getBarycoord(e, this.a, this.b, this.c, t);
  }
  getUV(e, t, n, r, a) {
    return jn === !1 && (console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."), jn = !0), Ct.getInterpolation(e, this.a, this.b, this.c, t, n, r, a);
  }
  getInterpolation(e, t, n, r, a) {
    return Ct.getInterpolation(e, this.a, this.b, this.c, t, n, r, a);
  }
  containsPoint(e) {
    return Ct.containsPoint(e, this.a, this.b, this.c);
  }
  isFrontFacing(e) {
    return Ct.isFrontFacing(this.a, this.b, this.c, e);
  }
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  closestPointToPoint(e, t) {
    const n = this.a, r = this.b, a = this.c;
    let l, s;
    dn.subVectors(r, n), pn.subVectors(a, n), Oi.subVectors(e, n);
    const o = dn.dot(Oi), c = pn.dot(Oi);
    if (o <= 0 && c <= 0)
      return t.copy(n);
    Bi.subVectors(e, r);
    const h = dn.dot(Bi), d = pn.dot(Bi);
    if (h >= 0 && d <= h)
      return t.copy(r);
    const p = o * d - h * c;
    if (p <= 0 && o >= 0 && h <= 0)
      return l = o / (o - h), t.copy(n).addScaledVector(dn, l);
    Gi.subVectors(e, a);
    const m = dn.dot(Gi), g = pn.dot(Gi);
    if (g >= 0 && m <= g)
      return t.copy(a);
    const v = m * c - o * g;
    if (v <= 0 && c >= 0 && g <= 0)
      return s = c / (c - g), t.copy(n).addScaledVector(pn, s);
    const f = h * g - m * d;
    if (f <= 0 && d - h >= 0 && m - g >= 0)
      return Tr.subVectors(a, r), s = (d - h) / (d - h + (m - g)), t.copy(r).addScaledVector(Tr, s);
    const u = 1 / (f + v + p);
    return l = v * u, s = p * u, t.copy(n).addScaledVector(dn, l).addScaledVector(pn, s);
  }
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
const na = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
}, Yt = { h: 0, s: 0, l: 0 }, $n = { h: 0, s: 0, l: 0 };
function Hi(i, e, t) {
  return t < 0 && (t += 1), t > 1 && (t -= 1), t < 1 / 6 ? i + (e - i) * 6 * t : t < 1 / 2 ? e : t < 2 / 3 ? i + (e - i) * 6 * (2 / 3 - t) : i;
}
class We {
  constructor(e, t, n) {
    return this.isColor = !0, this.r = 1, this.g = 1, this.b = 1, this.set(e, t, n);
  }
  set(e, t, n) {
    if (t === void 0 && n === void 0) {
      const r = e;
      r && r.isColor ? this.copy(r) : typeof r == "number" ? this.setHex(r) : typeof r == "string" && this.setStyle(r);
    } else
      this.setRGB(e, t, n);
    return this;
  }
  setScalar(e) {
    return this.r = e, this.g = e, this.b = e, this;
  }
  setHex(e, t = ot) {
    return e = Math.floor(e), this.r = (e >> 16 & 255) / 255, this.g = (e >> 8 & 255) / 255, this.b = (e & 255) / 255, ke.toWorkingColorSpace(this, t), this;
  }
  setRGB(e, t, n, r = ke.workingColorSpace) {
    return this.r = e, this.g = t, this.b = n, ke.toWorkingColorSpace(this, r), this;
  }
  setHSL(e, t, n, r = ke.workingColorSpace) {
    if (e = ya(e, 1), t = gt(t, 0, 1), n = gt(n, 0, 1), t === 0)
      this.r = this.g = this.b = n;
    else {
      const a = n <= 0.5 ? n * (1 + t) : n + t - n * t, l = 2 * n - a;
      this.r = Hi(l, a, e + 1 / 3), this.g = Hi(l, a, e), this.b = Hi(l, a, e - 1 / 3);
    }
    return ke.toWorkingColorSpace(this, r), this;
  }
  setStyle(e, t = ot) {
    function n(a) {
      a !== void 0 && parseFloat(a) < 1 && console.warn("THREE.Color: Alpha component of " + e + " will be ignored.");
    }
    let r;
    if (r = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let a;
      const l = r[1], s = r[2];
      switch (l) {
        case "rgb":
        case "rgba":
          if (a = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))
            return n(a[4]), this.setRGB(
              Math.min(255, parseInt(a[1], 10)) / 255,
              Math.min(255, parseInt(a[2], 10)) / 255,
              Math.min(255, parseInt(a[3], 10)) / 255,
              t
            );
          if (a = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))
            return n(a[4]), this.setRGB(
              Math.min(100, parseInt(a[1], 10)) / 100,
              Math.min(100, parseInt(a[2], 10)) / 100,
              Math.min(100, parseInt(a[3], 10)) / 100,
              t
            );
          break;
        case "hsl":
        case "hsla":
          if (a = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))
            return n(a[4]), this.setHSL(
              parseFloat(a[1]) / 360,
              parseFloat(a[2]) / 100,
              parseFloat(a[3]) / 100,
              t
            );
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + e);
      }
    } else if (r = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const a = r[1], l = a.length;
      if (l === 3)
        return this.setRGB(
          parseInt(a.charAt(0), 16) / 15,
          parseInt(a.charAt(1), 16) / 15,
          parseInt(a.charAt(2), 16) / 15,
          t
        );
      if (l === 6)
        return this.setHex(parseInt(a, 16), t);
      console.warn("THREE.Color: Invalid hex color " + e);
    } else if (e && e.length > 0)
      return this.setColorName(e, t);
    return this;
  }
  setColorName(e, t = ot) {
    const n = na[e.toLowerCase()];
    return n !== void 0 ? this.setHex(n, t) : console.warn("THREE.Color: Unknown color " + e), this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    return this.r = e.r, this.g = e.g, this.b = e.b, this;
  }
  copySRGBToLinear(e) {
    return this.r = yn(e.r), this.g = yn(e.g), this.b = yn(e.b), this;
  }
  copyLinearToSRGB(e) {
    return this.r = wi(e.r), this.g = wi(e.g), this.b = wi(e.b), this;
  }
  convertSRGBToLinear() {
    return this.copySRGBToLinear(this), this;
  }
  convertLinearToSRGB() {
    return this.copyLinearToSRGB(this), this;
  }
  getHex(e = ot) {
    return ke.fromWorkingColorSpace(ft.copy(this), e), Math.round(gt(ft.r * 255, 0, 255)) * 65536 + Math.round(gt(ft.g * 255, 0, 255)) * 256 + Math.round(gt(ft.b * 255, 0, 255));
  }
  getHexString(e = ot) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = ke.workingColorSpace) {
    ke.fromWorkingColorSpace(ft.copy(this), t);
    const n = ft.r, r = ft.g, a = ft.b, l = Math.max(n, r, a), s = Math.min(n, r, a);
    let o, c;
    const h = (s + l) / 2;
    if (s === l)
      o = 0, c = 0;
    else {
      const d = l - s;
      switch (c = h <= 0.5 ? d / (l + s) : d / (2 - l - s), l) {
        case n:
          o = (r - a) / d + (r < a ? 6 : 0);
          break;
        case r:
          o = (a - n) / d + 2;
          break;
        case a:
          o = (n - r) / d + 4;
          break;
      }
      o /= 6;
    }
    return e.h = o, e.s = c, e.l = h, e;
  }
  getRGB(e, t = ke.workingColorSpace) {
    return ke.fromWorkingColorSpace(ft.copy(this), t), e.r = ft.r, e.g = ft.g, e.b = ft.b, e;
  }
  getStyle(e = ot) {
    ke.fromWorkingColorSpace(ft.copy(this), e);
    const t = ft.r, n = ft.g, r = ft.b;
    return e !== ot ? `color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${r.toFixed(3)})` : `rgb(${Math.round(t * 255)},${Math.round(n * 255)},${Math.round(r * 255)})`;
  }
  offsetHSL(e, t, n) {
    return this.getHSL(Yt), this.setHSL(Yt.h + e, Yt.s + t, Yt.l + n);
  }
  add(e) {
    return this.r += e.r, this.g += e.g, this.b += e.b, this;
  }
  addColors(e, t) {
    return this.r = e.r + t.r, this.g = e.g + t.g, this.b = e.b + t.b, this;
  }
  addScalar(e) {
    return this.r += e, this.g += e, this.b += e, this;
  }
  sub(e) {
    return this.r = Math.max(0, this.r - e.r), this.g = Math.max(0, this.g - e.g), this.b = Math.max(0, this.b - e.b), this;
  }
  multiply(e) {
    return this.r *= e.r, this.g *= e.g, this.b *= e.b, this;
  }
  multiplyScalar(e) {
    return this.r *= e, this.g *= e, this.b *= e, this;
  }
  lerp(e, t) {
    return this.r += (e.r - this.r) * t, this.g += (e.g - this.g) * t, this.b += (e.b - this.b) * t, this;
  }
  lerpColors(e, t, n) {
    return this.r = e.r + (t.r - e.r) * n, this.g = e.g + (t.g - e.g) * n, this.b = e.b + (t.b - e.b) * n, this;
  }
  lerpHSL(e, t) {
    this.getHSL(Yt), e.getHSL($n);
    const n = bi(Yt.h, $n.h, t), r = bi(Yt.s, $n.s, t), a = bi(Yt.l, $n.l, t);
    return this.setHSL(n, r, a), this;
  }
  setFromVector3(e) {
    return this.r = e.x, this.g = e.y, this.b = e.z, this;
  }
  applyMatrix3(e) {
    const t = this.r, n = this.g, r = this.b, a = e.elements;
    return this.r = a[0] * t + a[3] * n + a[6] * r, this.g = a[1] * t + a[4] * n + a[7] * r, this.b = a[2] * t + a[5] * n + a[8] * r, this;
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, t = 0) {
    return this.r = e[t], this.g = e[t + 1], this.b = e[t + 2], this;
  }
  toArray(e = [], t = 0) {
    return e[t] = this.r, e[t + 1] = this.g, e[t + 2] = this.b, e;
  }
  fromBufferAttribute(e, t) {
    return this.r = e.getX(t), this.g = e.getY(t), this.b = e.getZ(t), this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r, yield this.g, yield this.b;
  }
}
const ft = /* @__PURE__ */ new We();
We.NAMES = na;
let Ha = 0;
class xi extends bn {
  constructor() {
    super(), this.isMaterial = !0, Object.defineProperty(this, "id", { value: Ha++ }), this.uuid = Nn(), this.name = "", this.type = "Material", this.blending = 1, this.side = 0, this.vertexColors = !1, this.opacity = 1, this.transparent = !1, this.alphaHash = !1, this.blendSrc = 204, this.blendDst = 205, this.blendEquation = 100, this.blendSrcAlpha = null, this.blendDstAlpha = null, this.blendEquationAlpha = null, this.blendColor = new We(0, 0, 0), this.blendAlpha = 0, this.depthFunc = 3, this.depthTest = !0, this.depthWrite = !0, this.stencilWriteMask = 255, this.stencilFunc = 519, this.stencilRef = 0, this.stencilFuncMask = 255, this.stencilFail = 7680, this.stencilZFail = 7680, this.stencilZPass = 7680, this.stencilWrite = !1, this.clippingPlanes = null, this.clipIntersection = !1, this.clipShadows = !1, this.shadowSide = null, this.colorWrite = !0, this.precision = null, this.polygonOffset = !1, this.polygonOffsetFactor = 0, this.polygonOffsetUnits = 0, this.dithering = !1, this.alphaToCoverage = !1, this.premultipliedAlpha = !1, this.forceSinglePass = !1, this.visible = !0, this.toneMapped = !0, this.userData = {}, this.version = 0, this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    this._alphaTest > 0 != e > 0 && this.version++, this._alphaTest = e;
  }
  onBuild() {
  }
  onBeforeRender() {
  }
  onBeforeCompile() {
  }
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(e) {
    if (e !== void 0)
      for (const t in e) {
        const n = e[t];
        if (n === void 0) {
          console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);
          continue;
        }
        const r = this[t];
        if (r === void 0) {
          console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);
          continue;
        }
        r && r.isColor ? r.set(n) : r && r.isVector3 && n && n.isVector3 ? r.copy(n) : this[t] = n;
      }
  }
  toJSON(e) {
    const t = e === void 0 || typeof e == "string";
    t && (e = {
      textures: {},
      images: {}
    });
    const n = {
      metadata: {
        version: 4.6,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    n.uuid = this.uuid, n.type = this.type, this.name !== "" && (n.name = this.name), this.color && this.color.isColor && (n.color = this.color.getHex()), this.roughness !== void 0 && (n.roughness = this.roughness), this.metalness !== void 0 && (n.metalness = this.metalness), this.sheen !== void 0 && (n.sheen = this.sheen), this.sheenColor && this.sheenColor.isColor && (n.sheenColor = this.sheenColor.getHex()), this.sheenRoughness !== void 0 && (n.sheenRoughness = this.sheenRoughness), this.emissive && this.emissive.isColor && (n.emissive = this.emissive.getHex()), this.emissiveIntensity && this.emissiveIntensity !== 1 && (n.emissiveIntensity = this.emissiveIntensity), this.specular && this.specular.isColor && (n.specular = this.specular.getHex()), this.specularIntensity !== void 0 && (n.specularIntensity = this.specularIntensity), this.specularColor && this.specularColor.isColor && (n.specularColor = this.specularColor.getHex()), this.shininess !== void 0 && (n.shininess = this.shininess), this.clearcoat !== void 0 && (n.clearcoat = this.clearcoat), this.clearcoatRoughness !== void 0 && (n.clearcoatRoughness = this.clearcoatRoughness), this.clearcoatMap && this.clearcoatMap.isTexture && (n.clearcoatMap = this.clearcoatMap.toJSON(e).uuid), this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture && (n.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid), this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture && (n.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid, n.clearcoatNormalScale = this.clearcoatNormalScale.toArray()), this.iridescence !== void 0 && (n.iridescence = this.iridescence), this.iridescenceIOR !== void 0 && (n.iridescenceIOR = this.iridescenceIOR), this.iridescenceThicknessRange !== void 0 && (n.iridescenceThicknessRange = this.iridescenceThicknessRange), this.iridescenceMap && this.iridescenceMap.isTexture && (n.iridescenceMap = this.iridescenceMap.toJSON(e).uuid), this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture && (n.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid), this.anisotropy !== void 0 && (n.anisotropy = this.anisotropy), this.anisotropyRotation !== void 0 && (n.anisotropyRotation = this.anisotropyRotation), this.anisotropyMap && this.anisotropyMap.isTexture && (n.anisotropyMap = this.anisotropyMap.toJSON(e).uuid), this.map && this.map.isTexture && (n.map = this.map.toJSON(e).uuid), this.matcap && this.matcap.isTexture && (n.matcap = this.matcap.toJSON(e).uuid), this.alphaMap && this.alphaMap.isTexture && (n.alphaMap = this.alphaMap.toJSON(e).uuid), this.lightMap && this.lightMap.isTexture && (n.lightMap = this.lightMap.toJSON(e).uuid, n.lightMapIntensity = this.lightMapIntensity), this.aoMap && this.aoMap.isTexture && (n.aoMap = this.aoMap.toJSON(e).uuid, n.aoMapIntensity = this.aoMapIntensity), this.bumpMap && this.bumpMap.isTexture && (n.bumpMap = this.bumpMap.toJSON(e).uuid, n.bumpScale = this.bumpScale), this.normalMap && this.normalMap.isTexture && (n.normalMap = this.normalMap.toJSON(e).uuid, n.normalMapType = this.normalMapType, n.normalScale = this.normalScale.toArray()), this.displacementMap && this.displacementMap.isTexture && (n.displacementMap = this.displacementMap.toJSON(e).uuid, n.displacementScale = this.displacementScale, n.displacementBias = this.displacementBias), this.roughnessMap && this.roughnessMap.isTexture && (n.roughnessMap = this.roughnessMap.toJSON(e).uuid), this.metalnessMap && this.metalnessMap.isTexture && (n.metalnessMap = this.metalnessMap.toJSON(e).uuid), this.emissiveMap && this.emissiveMap.isTexture && (n.emissiveMap = this.emissiveMap.toJSON(e).uuid), this.specularMap && this.specularMap.isTexture && (n.specularMap = this.specularMap.toJSON(e).uuid), this.specularIntensityMap && this.specularIntensityMap.isTexture && (n.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid), this.specularColorMap && this.specularColorMap.isTexture && (n.specularColorMap = this.specularColorMap.toJSON(e).uuid), this.envMap && this.envMap.isTexture && (n.envMap = this.envMap.toJSON(e).uuid, this.combine !== void 0 && (n.combine = this.combine)), this.envMapIntensity !== void 0 && (n.envMapIntensity = this.envMapIntensity), this.reflectivity !== void 0 && (n.reflectivity = this.reflectivity), this.refractionRatio !== void 0 && (n.refractionRatio = this.refractionRatio), this.gradientMap && this.gradientMap.isTexture && (n.gradientMap = this.gradientMap.toJSON(e).uuid), this.transmission !== void 0 && (n.transmission = this.transmission), this.transmissionMap && this.transmissionMap.isTexture && (n.transmissionMap = this.transmissionMap.toJSON(e).uuid), this.thickness !== void 0 && (n.thickness = this.thickness), this.thicknessMap && this.thicknessMap.isTexture && (n.thicknessMap = this.thicknessMap.toJSON(e).uuid), this.attenuationDistance !== void 0 && this.attenuationDistance !== 1 / 0 && (n.attenuationDistance = this.attenuationDistance), this.attenuationColor !== void 0 && (n.attenuationColor = this.attenuationColor.getHex()), this.size !== void 0 && (n.size = this.size), this.shadowSide !== null && (n.shadowSide = this.shadowSide), this.sizeAttenuation !== void 0 && (n.sizeAttenuation = this.sizeAttenuation), this.blending !== 1 && (n.blending = this.blending), this.side !== 0 && (n.side = this.side), this.vertexColors === !0 && (n.vertexColors = !0), this.opacity < 1 && (n.opacity = this.opacity), this.transparent === !0 && (n.transparent = !0), this.blendSrc !== 204 && (n.blendSrc = this.blendSrc), this.blendDst !== 205 && (n.blendDst = this.blendDst), this.blendEquation !== 100 && (n.blendEquation = this.blendEquation), this.blendSrcAlpha !== null && (n.blendSrcAlpha = this.blendSrcAlpha), this.blendDstAlpha !== null && (n.blendDstAlpha = this.blendDstAlpha), this.blendEquationAlpha !== null && (n.blendEquationAlpha = this.blendEquationAlpha), this.blendColor && this.blendColor.isColor && (n.blendColor = this.blendColor.getHex()), this.blendAlpha !== 0 && (n.blendAlpha = this.blendAlpha), this.depthFunc !== 3 && (n.depthFunc = this.depthFunc), this.depthTest === !1 && (n.depthTest = this.depthTest), this.depthWrite === !1 && (n.depthWrite = this.depthWrite), this.colorWrite === !1 && (n.colorWrite = this.colorWrite), this.stencilWriteMask !== 255 && (n.stencilWriteMask = this.stencilWriteMask), this.stencilFunc !== 519 && (n.stencilFunc = this.stencilFunc), this.stencilRef !== 0 && (n.stencilRef = this.stencilRef), this.stencilFuncMask !== 255 && (n.stencilFuncMask = this.stencilFuncMask), this.stencilFail !== 7680 && (n.stencilFail = this.stencilFail), this.stencilZFail !== 7680 && (n.stencilZFail = this.stencilZFail), this.stencilZPass !== 7680 && (n.stencilZPass = this.stencilZPass), this.stencilWrite === !0 && (n.stencilWrite = this.stencilWrite), this.rotation !== void 0 && this.rotation !== 0 && (n.rotation = this.rotation), this.polygonOffset === !0 && (n.polygonOffset = !0), this.polygonOffsetFactor !== 0 && (n.polygonOffsetFactor = this.polygonOffsetFactor), this.polygonOffsetUnits !== 0 && (n.polygonOffsetUnits = this.polygonOffsetUnits), this.linewidth !== void 0 && this.linewidth !== 1 && (n.linewidth = this.linewidth), this.dashSize !== void 0 && (n.dashSize = this.dashSize), this.gapSize !== void 0 && (n.gapSize = this.gapSize), this.scale !== void 0 && (n.scale = this.scale), this.dithering === !0 && (n.dithering = !0), this.alphaTest > 0 && (n.alphaTest = this.alphaTest), this.alphaHash === !0 && (n.alphaHash = !0), this.alphaToCoverage === !0 && (n.alphaToCoverage = !0), this.premultipliedAlpha === !0 && (n.premultipliedAlpha = !0), this.forceSinglePass === !0 && (n.forceSinglePass = !0), this.wireframe === !0 && (n.wireframe = !0), this.wireframeLinewidth > 1 && (n.wireframeLinewidth = this.wireframeLinewidth), this.wireframeLinecap !== "round" && (n.wireframeLinecap = this.wireframeLinecap), this.wireframeLinejoin !== "round" && (n.wireframeLinejoin = this.wireframeLinejoin), this.flatShading === !0 && (n.flatShading = !0), this.visible === !1 && (n.visible = !1), this.toneMapped === !1 && (n.toneMapped = !1), this.fog === !1 && (n.fog = !1), Object.keys(this.userData).length > 0 && (n.userData = this.userData);
    function r(a) {
      const l = [];
      for (const s in a) {
        const o = a[s];
        delete o.metadata, l.push(o);
      }
      return l;
    }
    if (t) {
      const a = r(e.textures), l = r(e.images);
      a.length > 0 && (n.textures = a), l.length > 0 && (n.images = l);
    }
    return n;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.name = e.name, this.blending = e.blending, this.side = e.side, this.vertexColors = e.vertexColors, this.opacity = e.opacity, this.transparent = e.transparent, this.blendSrc = e.blendSrc, this.blendDst = e.blendDst, this.blendEquation = e.blendEquation, this.blendSrcAlpha = e.blendSrcAlpha, this.blendDstAlpha = e.blendDstAlpha, this.blendEquationAlpha = e.blendEquationAlpha, this.blendColor.copy(e.blendColor), this.blendAlpha = e.blendAlpha, this.depthFunc = e.depthFunc, this.depthTest = e.depthTest, this.depthWrite = e.depthWrite, this.stencilWriteMask = e.stencilWriteMask, this.stencilFunc = e.stencilFunc, this.stencilRef = e.stencilRef, this.stencilFuncMask = e.stencilFuncMask, this.stencilFail = e.stencilFail, this.stencilZFail = e.stencilZFail, this.stencilZPass = e.stencilZPass, this.stencilWrite = e.stencilWrite;
    const t = e.clippingPlanes;
    let n = null;
    if (t !== null) {
      const r = t.length;
      n = new Array(r);
      for (let a = 0; a !== r; ++a)
        n[a] = t[a].clone();
    }
    return this.clippingPlanes = n, this.clipIntersection = e.clipIntersection, this.clipShadows = e.clipShadows, this.shadowSide = e.shadowSide, this.colorWrite = e.colorWrite, this.precision = e.precision, this.polygonOffset = e.polygonOffset, this.polygonOffsetFactor = e.polygonOffsetFactor, this.polygonOffsetUnits = e.polygonOffsetUnits, this.dithering = e.dithering, this.alphaTest = e.alphaTest, this.alphaHash = e.alphaHash, this.alphaToCoverage = e.alphaToCoverage, this.premultipliedAlpha = e.premultipliedAlpha, this.forceSinglePass = e.forceSinglePass, this.visible = e.visible, this.toneMapped = e.toneMapped, this.userData = JSON.parse(JSON.stringify(e.userData)), this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
}
class ia extends xi {
  constructor(e) {
    super(), this.isMeshBasicMaterial = !0, this.type = "MeshBasicMaterial", this.color = new We(16777215), this.map = null, this.lightMap = null, this.lightMapIntensity = 1, this.aoMap = null, this.aoMapIntensity = 1, this.specularMap = null, this.alphaMap = null, this.envMap = null, this.combine = 0, this.reflectivity = 1, this.refractionRatio = 0.98, this.wireframe = !1, this.wireframeLinewidth = 1, this.wireframeLinecap = "round", this.wireframeLinejoin = "round", this.fog = !0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.color.copy(e.color), this.map = e.map, this.lightMap = e.lightMap, this.lightMapIntensity = e.lightMapIntensity, this.aoMap = e.aoMap, this.aoMapIntensity = e.aoMapIntensity, this.specularMap = e.specularMap, this.alphaMap = e.alphaMap, this.envMap = e.envMap, this.combine = e.combine, this.reflectivity = e.reflectivity, this.refractionRatio = e.refractionRatio, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.wireframeLinecap = e.wireframeLinecap, this.wireframeLinejoin = e.wireframeLinejoin, this.fog = e.fog, this;
  }
}
const et = /* @__PURE__ */ new G(), Jn = /* @__PURE__ */ new He();
class Dt {
  constructor(e, t, n = !1) {
    if (Array.isArray(e))
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    this.isBufferAttribute = !0, this.name = "", this.array = e, this.itemSize = t, this.count = e !== void 0 ? e.length / t : 0, this.normalized = n, this.usage = 35044, this._updateRange = { offset: 0, count: -1 }, this.updateRanges = [], this.gpuType = 1015, this.version = 0;
  }
  onUploadCallback() {
  }
  set needsUpdate(e) {
    e === !0 && this.version++;
  }
  get updateRange() {
    return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."), this._updateRange;
  }
  setUsage(e) {
    return this.usage = e, this;
  }
  addUpdateRange(e, t) {
    this.updateRanges.push({ start: e, count: t });
  }
  clearUpdateRanges() {
    this.updateRanges.length = 0;
  }
  copy(e) {
    return this.name = e.name, this.array = new e.array.constructor(e.array), this.itemSize = e.itemSize, this.count = e.count, this.normalized = e.normalized, this.usage = e.usage, this.gpuType = e.gpuType, this;
  }
  copyAt(e, t, n) {
    e *= this.itemSize, n *= t.itemSize;
    for (let r = 0, a = this.itemSize; r < a; r++)
      this.array[e + r] = t.array[n + r];
    return this;
  }
  copyArray(e) {
    return this.array.set(e), this;
  }
  applyMatrix3(e) {
    if (this.itemSize === 2)
      for (let t = 0, n = this.count; t < n; t++)
        Jn.fromBufferAttribute(this, t), Jn.applyMatrix3(e), this.setXY(t, Jn.x, Jn.y);
    else if (this.itemSize === 3)
      for (let t = 0, n = this.count; t < n; t++)
        et.fromBufferAttribute(this, t), et.applyMatrix3(e), this.setXYZ(t, et.x, et.y, et.z);
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, n = this.count; t < n; t++)
      et.fromBufferAttribute(this, t), et.applyMatrix4(e), this.setXYZ(t, et.x, et.y, et.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      et.fromBufferAttribute(this, t), et.applyNormalMatrix(e), this.setXYZ(t, et.x, et.y, et.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      et.fromBufferAttribute(this, t), et.transformDirection(e), this.setXYZ(t, et.x, et.y, et.z);
    return this;
  }
  set(e, t = 0) {
    return this.array.set(e, t), this;
  }
  getComponent(e, t) {
    let n = this.array[e * this.itemSize + t];
    return this.normalized && (n = Cn(n, this.array)), n;
  }
  setComponent(e, t, n) {
    return this.normalized && (n = _t(n, this.array)), this.array[e * this.itemSize + t] = n, this;
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    return this.normalized && (t = Cn(t, this.array)), t;
  }
  setX(e, t) {
    return this.normalized && (t = _t(t, this.array)), this.array[e * this.itemSize] = t, this;
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    return this.normalized && (t = Cn(t, this.array)), t;
  }
  setY(e, t) {
    return this.normalized && (t = _t(t, this.array)), this.array[e * this.itemSize + 1] = t, this;
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    return this.normalized && (t = Cn(t, this.array)), t;
  }
  setZ(e, t) {
    return this.normalized && (t = _t(t, this.array)), this.array[e * this.itemSize + 2] = t, this;
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    return this.normalized && (t = Cn(t, this.array)), t;
  }
  setW(e, t) {
    return this.normalized && (t = _t(t, this.array)), this.array[e * this.itemSize + 3] = t, this;
  }
  setXY(e, t, n) {
    return e *= this.itemSize, this.normalized && (t = _t(t, this.array), n = _t(n, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this;
  }
  setXYZ(e, t, n, r) {
    return e *= this.itemSize, this.normalized && (t = _t(t, this.array), n = _t(n, this.array), r = _t(r, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this;
  }
  setXYZW(e, t, n, r, a) {
    return e *= this.itemSize, this.normalized && (t = _t(t, this.array), n = _t(n, this.array), r = _t(r, this.array), a = _t(a, this.array)), this.array[e + 0] = t, this.array[e + 1] = n, this.array[e + 2] = r, this.array[e + 3] = a, this;
  }
  onUpload(e) {
    return this.onUploadCallback = e, this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    return this.name !== "" && (e.name = this.name), this.usage !== 35044 && (e.usage = this.usage), e;
  }
}
class ra extends Dt {
  constructor(e, t, n) {
    super(new Uint16Array(e), t, n);
  }
}
class aa extends Dt {
  constructor(e, t, n) {
    super(new Uint32Array(e), t, n);
  }
}
class sn extends Dt {
  constructor(e, t, n) {
    super(new Float32Array(e), t, n);
  }
}
let za = 0;
const yt = /* @__PURE__ */ new ct(), zi = /* @__PURE__ */ new Et(), mn = /* @__PURE__ */ new G(), Mt = /* @__PURE__ */ new Bn(), Un = /* @__PURE__ */ new Bn(), st = /* @__PURE__ */ new G();
class Zt extends bn {
  constructor() {
    super(), this.isBufferGeometry = !0, Object.defineProperty(this, "id", { value: za++ }), this.uuid = Nn(), this.name = "", this.type = "BufferGeometry", this.index = null, this.attributes = {}, this.morphAttributes = {}, this.morphTargetsRelative = !1, this.groups = [], this.boundingBox = null, this.boundingSphere = null, this.drawRange = { start: 0, count: 1 / 0 }, this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(e) {
    return Array.isArray(e) ? this.index = new ($r(e) ? aa : ra)(e, 1) : this.index = e, this;
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  setAttribute(e, t) {
    return this.attributes[e] = t, this;
  }
  deleteAttribute(e) {
    return delete this.attributes[e], this;
  }
  hasAttribute(e) {
    return this.attributes[e] !== void 0;
  }
  addGroup(e, t, n = 0) {
    this.groups.push({
      start: e,
      count: t,
      materialIndex: n
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(e, t) {
    this.drawRange.start = e, this.drawRange.count = t;
  }
  applyMatrix4(e) {
    const t = this.attributes.position;
    t !== void 0 && (t.applyMatrix4(e), t.needsUpdate = !0);
    const n = this.attributes.normal;
    if (n !== void 0) {
      const a = new Oe().getNormalMatrix(e);
      n.applyNormalMatrix(a), n.needsUpdate = !0;
    }
    const r = this.attributes.tangent;
    return r !== void 0 && (r.transformDirection(e), r.needsUpdate = !0), this.boundingBox !== null && this.computeBoundingBox(), this.boundingSphere !== null && this.computeBoundingSphere(), this;
  }
  applyQuaternion(e) {
    return yt.makeRotationFromQuaternion(e), this.applyMatrix4(yt), this;
  }
  rotateX(e) {
    return yt.makeRotationX(e), this.applyMatrix4(yt), this;
  }
  rotateY(e) {
    return yt.makeRotationY(e), this.applyMatrix4(yt), this;
  }
  rotateZ(e) {
    return yt.makeRotationZ(e), this.applyMatrix4(yt), this;
  }
  translate(e, t, n) {
    return yt.makeTranslation(e, t, n), this.applyMatrix4(yt), this;
  }
  scale(e, t, n) {
    return yt.makeScale(e, t, n), this.applyMatrix4(yt), this;
  }
  lookAt(e) {
    return zi.lookAt(e), zi.updateMatrix(), this.applyMatrix4(zi.matrix), this;
  }
  center() {
    return this.computeBoundingBox(), this.boundingBox.getCenter(mn).negate(), this.translate(mn.x, mn.y, mn.z), this;
  }
  setFromPoints(e) {
    const t = [];
    for (let n = 0, r = e.length; n < r; n++) {
      const a = e[n];
      t.push(a.x, a.y, a.z || 0);
    }
    return this.setAttribute("position", new sn(t, 3)), this;
  }
  computeBoundingBox() {
    this.boundingBox === null && (this.boundingBox = new Bn());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingBox.set(
        new G(-1 / 0, -1 / 0, -1 / 0),
        new G(1 / 0, 1 / 0, 1 / 0)
      );
      return;
    }
    if (e !== void 0) {
      if (this.boundingBox.setFromBufferAttribute(e), t)
        for (let n = 0, r = t.length; n < r; n++) {
          const a = t[n];
          Mt.setFromBufferAttribute(a), this.morphTargetsRelative ? (st.addVectors(this.boundingBox.min, Mt.min), this.boundingBox.expandByPoint(st), st.addVectors(this.boundingBox.max, Mt.max), this.boundingBox.expandByPoint(st)) : (this.boundingBox.expandByPoint(Mt.min), this.boundingBox.expandByPoint(Mt.max));
        }
    } else
      this.boundingBox.makeEmpty();
    (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) && console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.', this);
  }
  computeBoundingSphere() {
    this.boundingSphere === null && (this.boundingSphere = new gi());
    const e = this.attributes.position, t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingSphere.set(new G(), 1 / 0);
      return;
    }
    if (e) {
      const n = this.boundingSphere.center;
      if (Mt.setFromBufferAttribute(e), t)
        for (let a = 0, l = t.length; a < l; a++) {
          const s = t[a];
          Un.setFromBufferAttribute(s), this.morphTargetsRelative ? (st.addVectors(Mt.min, Un.min), Mt.expandByPoint(st), st.addVectors(Mt.max, Un.max), Mt.expandByPoint(st)) : (Mt.expandByPoint(Un.min), Mt.expandByPoint(Un.max));
        }
      Mt.getCenter(n);
      let r = 0;
      for (let a = 0, l = e.count; a < l; a++)
        st.fromBufferAttribute(e, a), r = Math.max(r, n.distanceToSquared(st));
      if (t)
        for (let a = 0, l = t.length; a < l; a++) {
          const s = t[a], o = this.morphTargetsRelative;
          for (let c = 0, h = s.count; c < h; c++)
            st.fromBufferAttribute(s, c), o && (mn.fromBufferAttribute(e, c), st.add(mn)), r = Math.max(r, n.distanceToSquared(st));
        }
      this.boundingSphere.radius = Math.sqrt(r), isNaN(this.boundingSphere.radius) && console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.', this);
    }
  }
  computeTangents() {
    const e = this.index, t = this.attributes;
    if (e === null || t.position === void 0 || t.normal === void 0 || t.uv === void 0) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const n = e.array, r = t.position.array, a = t.normal.array, l = t.uv.array, s = r.length / 3;
    this.hasAttribute("tangent") === !1 && this.setAttribute("tangent", new Dt(new Float32Array(4 * s), 4));
    const o = this.getAttribute("tangent").array, c = [], h = [];
    for (let T = 0; T < s; T++)
      c[T] = new G(), h[T] = new G();
    const d = new G(), p = new G(), m = new G(), g = new He(), v = new He(), f = new He(), u = new G(), y = new G();
    function S(T, z, Y) {
      d.fromArray(r, T * 3), p.fromArray(r, z * 3), m.fromArray(r, Y * 3), g.fromArray(l, T * 2), v.fromArray(l, z * 2), f.fromArray(l, Y * 2), p.sub(d), m.sub(d), v.sub(g), f.sub(g);
      const ie = 1 / (v.x * f.y - f.x * v.y);
      isFinite(ie) && (u.copy(p).multiplyScalar(f.y).addScaledVector(m, -v.y).multiplyScalar(ie), y.copy(m).multiplyScalar(v.x).addScaledVector(p, -f.x).multiplyScalar(ie), c[T].add(u), c[z].add(u), c[Y].add(u), h[T].add(y), h[z].add(y), h[Y].add(y));
    }
    let w = this.groups;
    w.length === 0 && (w = [{
      start: 0,
      count: n.length
    }]);
    for (let T = 0, z = w.length; T < z; ++T) {
      const Y = w[T], ie = Y.start, L = Y.count;
      for (let I = ie, V = ie + L; I < V; I += 3)
        S(
          n[I + 0],
          n[I + 1],
          n[I + 2]
        );
    }
    const D = new G(), C = new G(), R = new G(), K = new G();
    function M(T) {
      R.fromArray(a, T * 3), K.copy(R);
      const z = c[T];
      D.copy(z), D.sub(R.multiplyScalar(R.dot(z))).normalize(), C.crossVectors(K, z);
      const ie = C.dot(h[T]) < 0 ? -1 : 1;
      o[T * 4] = D.x, o[T * 4 + 1] = D.y, o[T * 4 + 2] = D.z, o[T * 4 + 3] = ie;
    }
    for (let T = 0, z = w.length; T < z; ++T) {
      const Y = w[T], ie = Y.start, L = Y.count;
      for (let I = ie, V = ie + L; I < V; I += 3)
        M(n[I + 0]), M(n[I + 1]), M(n[I + 2]);
    }
  }
  computeVertexNormals() {
    const e = this.index, t = this.getAttribute("position");
    if (t !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0)
        n = new Dt(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
      else
        for (let p = 0, m = n.count; p < m; p++)
          n.setXYZ(p, 0, 0, 0);
      const r = new G(), a = new G(), l = new G(), s = new G(), o = new G(), c = new G(), h = new G(), d = new G();
      if (e)
        for (let p = 0, m = e.count; p < m; p += 3) {
          const g = e.getX(p + 0), v = e.getX(p + 1), f = e.getX(p + 2);
          r.fromBufferAttribute(t, g), a.fromBufferAttribute(t, v), l.fromBufferAttribute(t, f), h.subVectors(l, a), d.subVectors(r, a), h.cross(d), s.fromBufferAttribute(n, g), o.fromBufferAttribute(n, v), c.fromBufferAttribute(n, f), s.add(h), o.add(h), c.add(h), n.setXYZ(g, s.x, s.y, s.z), n.setXYZ(v, o.x, o.y, o.z), n.setXYZ(f, c.x, c.y, c.z);
        }
      else
        for (let p = 0, m = t.count; p < m; p += 3)
          r.fromBufferAttribute(t, p + 0), a.fromBufferAttribute(t, p + 1), l.fromBufferAttribute(t, p + 2), h.subVectors(l, a), d.subVectors(r, a), h.cross(d), n.setXYZ(p + 0, h.x, h.y, h.z), n.setXYZ(p + 1, h.x, h.y, h.z), n.setXYZ(p + 2, h.x, h.y, h.z);
      this.normalizeNormals(), n.needsUpdate = !0;
    }
  }
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let t = 0, n = e.count; t < n; t++)
      st.fromBufferAttribute(e, t), st.normalize(), e.setXYZ(t, st.x, st.y, st.z);
  }
  toNonIndexed() {
    function e(s, o) {
      const c = s.array, h = s.itemSize, d = s.normalized, p = new c.constructor(o.length * h);
      let m = 0, g = 0;
      for (let v = 0, f = o.length; v < f; v++) {
        s.isInterleavedBufferAttribute ? m = o[v] * s.data.stride + s.offset : m = o[v] * h;
        for (let u = 0; u < h; u++)
          p[g++] = c[m++];
      }
      return new Dt(p, h, d);
    }
    if (this.index === null)
      return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."), this;
    const t = new Zt(), n = this.index.array, r = this.attributes;
    for (const s in r) {
      const o = r[s], c = e(o, n);
      t.setAttribute(s, c);
    }
    const a = this.morphAttributes;
    for (const s in a) {
      const o = [], c = a[s];
      for (let h = 0, d = c.length; h < d; h++) {
        const p = c[h], m = e(p, n);
        o.push(m);
      }
      t.morphAttributes[s] = o;
    }
    t.morphTargetsRelative = this.morphTargetsRelative;
    const l = this.groups;
    for (let s = 0, o = l.length; s < o; s++) {
      const c = l[s];
      t.addGroup(c.start, c.count, c.materialIndex);
    }
    return t;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.6,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    if (e.uuid = this.uuid, e.type = this.type, this.name !== "" && (e.name = this.name), Object.keys(this.userData).length > 0 && (e.userData = this.userData), this.parameters !== void 0) {
      const o = this.parameters;
      for (const c in o)
        o[c] !== void 0 && (e[c] = o[c]);
      return e;
    }
    e.data = { attributes: {} };
    const t = this.index;
    t !== null && (e.data.index = {
      type: t.array.constructor.name,
      array: Array.prototype.slice.call(t.array)
    });
    const n = this.attributes;
    for (const o in n) {
      const c = n[o];
      e.data.attributes[o] = c.toJSON(e.data);
    }
    const r = {};
    let a = !1;
    for (const o in this.morphAttributes) {
      const c = this.morphAttributes[o], h = [];
      for (let d = 0, p = c.length; d < p; d++) {
        const m = c[d];
        h.push(m.toJSON(e.data));
      }
      h.length > 0 && (r[o] = h, a = !0);
    }
    a && (e.data.morphAttributes = r, e.data.morphTargetsRelative = this.morphTargetsRelative);
    const l = this.groups;
    l.length > 0 && (e.data.groups = JSON.parse(JSON.stringify(l)));
    const s = this.boundingSphere;
    return s !== null && (e.data.boundingSphere = {
      center: s.center.toArray(),
      radius: s.radius
    }), e;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.index = null, this.attributes = {}, this.morphAttributes = {}, this.groups = [], this.boundingBox = null, this.boundingSphere = null;
    const t = {};
    this.name = e.name;
    const n = e.index;
    n !== null && this.setIndex(n.clone(t));
    const r = e.attributes;
    for (const c in r) {
      const h = r[c];
      this.setAttribute(c, h.clone(t));
    }
    const a = e.morphAttributes;
    for (const c in a) {
      const h = [], d = a[c];
      for (let p = 0, m = d.length; p < m; p++)
        h.push(d[p].clone(t));
      this.morphAttributes[c] = h;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const l = e.groups;
    for (let c = 0, h = l.length; c < h; c++) {
      const d = l[c];
      this.addGroup(d.start, d.count, d.materialIndex);
    }
    const s = e.boundingBox;
    s !== null && (this.boundingBox = s.clone());
    const o = e.boundingSphere;
    return o !== null && (this.boundingSphere = o.clone()), this.drawRange.start = e.drawRange.start, this.drawRange.count = e.drawRange.count, this.userData = e.userData, this;
  }
  dispose() {
    this.dispatchEvent({ type: "dispose" });
  }
}
const yr = /* @__PURE__ */ new ct(), en = /* @__PURE__ */ new Da(), Qn = /* @__PURE__ */ new gi(), Ar = /* @__PURE__ */ new G(), _n = /* @__PURE__ */ new G(), gn = /* @__PURE__ */ new G(), vn = /* @__PURE__ */ new G(), Vi = /* @__PURE__ */ new G(), ei = /* @__PURE__ */ new G(), ti = /* @__PURE__ */ new He(), ni = /* @__PURE__ */ new He(), ii = /* @__PURE__ */ new He(), br = /* @__PURE__ */ new G(), Rr = /* @__PURE__ */ new G(), wr = /* @__PURE__ */ new G(), ri = /* @__PURE__ */ new G(), ai = /* @__PURE__ */ new G();
class Pt extends Et {
  constructor(e = new Zt(), t = new ia()) {
    super(), this.isMesh = !0, this.type = "Mesh", this.geometry = e, this.material = t, this.updateMorphTargets();
  }
  copy(e, t) {
    return super.copy(e, t), e.morphTargetInfluences !== void 0 && (this.morphTargetInfluences = e.morphTargetInfluences.slice()), e.morphTargetDictionary !== void 0 && (this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary)), this.material = Array.isArray(e.material) ? e.material.slice() : e.material, this.geometry = e.geometry, this;
  }
  updateMorphTargets() {
    const t = this.geometry.morphAttributes, n = Object.keys(t);
    if (n.length > 0) {
      const r = t[n[0]];
      if (r !== void 0) {
        this.morphTargetInfluences = [], this.morphTargetDictionary = {};
        for (let a = 0, l = r.length; a < l; a++) {
          const s = r[a].name || String(a);
          this.morphTargetInfluences.push(0), this.morphTargetDictionary[s] = a;
        }
      }
    }
  }
  getVertexPosition(e, t) {
    const n = this.geometry, r = n.attributes.position, a = n.morphAttributes.position, l = n.morphTargetsRelative;
    t.fromBufferAttribute(r, e);
    const s = this.morphTargetInfluences;
    if (a && s) {
      ei.set(0, 0, 0);
      for (let o = 0, c = a.length; o < c; o++) {
        const h = s[o], d = a[o];
        h !== 0 && (Vi.fromBufferAttribute(d, e), l ? ei.addScaledVector(Vi, h) : ei.addScaledVector(Vi.sub(t), h));
      }
      t.add(ei);
    }
    return t;
  }
  raycast(e, t) {
    const n = this.geometry, r = this.material, a = this.matrixWorld;
    r !== void 0 && (n.boundingSphere === null && n.computeBoundingSphere(), Qn.copy(n.boundingSphere), Qn.applyMatrix4(a), en.copy(e.ray).recast(e.near), !(Qn.containsPoint(en.origin) === !1 && (en.intersectSphere(Qn, Ar) === null || en.origin.distanceToSquared(Ar) > (e.far - e.near) ** 2)) && (yr.copy(a).invert(), en.copy(e.ray).applyMatrix4(yr), !(n.boundingBox !== null && en.intersectsBox(n.boundingBox) === !1) && this._computeIntersections(e, t, en)));
  }
  _computeIntersections(e, t, n) {
    let r;
    const a = this.geometry, l = this.material, s = a.index, o = a.attributes.position, c = a.attributes.uv, h = a.attributes.uv1, d = a.attributes.normal, p = a.groups, m = a.drawRange;
    if (s !== null)
      if (Array.isArray(l))
        for (let g = 0, v = p.length; g < v; g++) {
          const f = p[g], u = l[f.materialIndex], y = Math.max(f.start, m.start), S = Math.min(s.count, Math.min(f.start + f.count, m.start + m.count));
          for (let w = y, D = S; w < D; w += 3) {
            const C = s.getX(w), R = s.getX(w + 1), K = s.getX(w + 2);
            r = si(this, u, e, n, c, h, d, C, R, K), r && (r.faceIndex = Math.floor(w / 3), r.face.materialIndex = f.materialIndex, t.push(r));
          }
        }
      else {
        const g = Math.max(0, m.start), v = Math.min(s.count, m.start + m.count);
        for (let f = g, u = v; f < u; f += 3) {
          const y = s.getX(f), S = s.getX(f + 1), w = s.getX(f + 2);
          r = si(this, l, e, n, c, h, d, y, S, w), r && (r.faceIndex = Math.floor(f / 3), t.push(r));
        }
      }
    else if (o !== void 0)
      if (Array.isArray(l))
        for (let g = 0, v = p.length; g < v; g++) {
          const f = p[g], u = l[f.materialIndex], y = Math.max(f.start, m.start), S = Math.min(o.count, Math.min(f.start + f.count, m.start + m.count));
          for (let w = y, D = S; w < D; w += 3) {
            const C = w, R = w + 1, K = w + 2;
            r = si(this, u, e, n, c, h, d, C, R, K), r && (r.faceIndex = Math.floor(w / 3), r.face.materialIndex = f.materialIndex, t.push(r));
          }
        }
      else {
        const g = Math.max(0, m.start), v = Math.min(o.count, m.start + m.count);
        for (let f = g, u = v; f < u; f += 3) {
          const y = f, S = f + 1, w = f + 2;
          r = si(this, l, e, n, c, h, d, y, S, w), r && (r.faceIndex = Math.floor(f / 3), t.push(r));
        }
      }
  }
}
function Va(i, e, t, n, r, a, l, s) {
  let o;
  if (e.side === 1 ? o = n.intersectTriangle(l, a, r, !0, s) : o = n.intersectTriangle(r, a, l, e.side === 0, s), o === null) return null;
  ai.copy(s), ai.applyMatrix4(i.matrixWorld);
  const c = t.ray.origin.distanceTo(ai);
  return c < t.near || c > t.far ? null : {
    distance: c,
    point: ai.clone(),
    object: i
  };
}
function si(i, e, t, n, r, a, l, s, o, c) {
  i.getVertexPosition(s, _n), i.getVertexPosition(o, gn), i.getVertexPosition(c, vn);
  const h = Va(i, e, t, n, _n, gn, vn, ri);
  if (h) {
    r && (ti.fromBufferAttribute(r, s), ni.fromBufferAttribute(r, o), ii.fromBufferAttribute(r, c), h.uv = Ct.getInterpolation(ri, _n, gn, vn, ti, ni, ii, new He())), a && (ti.fromBufferAttribute(a, s), ni.fromBufferAttribute(a, o), ii.fromBufferAttribute(a, c), h.uv1 = Ct.getInterpolation(ri, _n, gn, vn, ti, ni, ii, new He()), h.uv2 = h.uv1), l && (br.fromBufferAttribute(l, s), Rr.fromBufferAttribute(l, o), wr.fromBufferAttribute(l, c), h.normal = Ct.getInterpolation(ri, _n, gn, vn, br, Rr, wr, new G()), h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
    const d = {
      a: s,
      b: o,
      c,
      normal: new G(),
      materialIndex: 0
    };
    Ct.getNormal(_n, gn, vn, d.normal), h.face = d;
  }
  return h;
}
class Gn extends Zt {
  constructor(e = 1, t = 1, n = 1, r = 1, a = 1, l = 1) {
    super(), this.type = "BoxGeometry", this.parameters = {
      width: e,
      height: t,
      depth: n,
      widthSegments: r,
      heightSegments: a,
      depthSegments: l
    };
    const s = this;
    r = Math.floor(r), a = Math.floor(a), l = Math.floor(l);
    const o = [], c = [], h = [], d = [];
    let p = 0, m = 0;
    g("z", "y", "x", -1, -1, n, t, e, l, a, 0), g("z", "y", "x", 1, -1, n, t, -e, l, a, 1), g("x", "z", "y", 1, 1, e, n, t, r, l, 2), g("x", "z", "y", 1, -1, e, n, -t, r, l, 3), g("x", "y", "z", 1, -1, e, t, n, r, a, 4), g("x", "y", "z", -1, -1, e, t, -n, r, a, 5), this.setIndex(o), this.setAttribute("position", new sn(c, 3)), this.setAttribute("normal", new sn(h, 3)), this.setAttribute("uv", new sn(d, 2));
    function g(v, f, u, y, S, w, D, C, R, K, M) {
      const T = w / R, z = D / K, Y = w / 2, ie = D / 2, L = C / 2, I = R + 1, V = K + 1;
      let q = 0, X = 0;
      const k = new G();
      for (let j = 0; j < V; j++) {
        const A = j * z - ie;
        for (let J = 0; J < I; J++) {
          const N = J * T - Y;
          k[v] = N * y, k[f] = A * S, k[u] = L, c.push(k.x, k.y, k.z), k[v] = 0, k[f] = 0, k[u] = C > 0 ? 1 : -1, h.push(k.x, k.y, k.z), d.push(J / R), d.push(1 - j / K), q += 1;
        }
      }
      for (let j = 0; j < K; j++)
        for (let A = 0; A < R; A++) {
          const J = p + A + I * j, N = p + A + I * (j + 1), W = p + (A + 1) + I * (j + 1), re = p + (A + 1) + I * j;
          o.push(J, N, re), o.push(N, W, re), X += 6;
        }
      s.addGroup(m, X, M), m += X, p += q;
    }
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new Gn(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}
function An(i) {
  const e = {};
  for (const t in i) {
    e[t] = {};
    for (const n in i[t]) {
      const r = i[t][n];
      r && (r.isColor || r.isMatrix3 || r.isMatrix4 || r.isVector2 || r.isVector3 || r.isVector4 || r.isTexture || r.isQuaternion) ? r.isRenderTargetTexture ? (console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."), e[t][n] = null) : e[t][n] = r.clone() : Array.isArray(r) ? e[t][n] = r.slice() : e[t][n] = r;
    }
  }
  return e;
}
function mt(i) {
  const e = {};
  for (let t = 0; t < i.length; t++) {
    const n = An(i[t]);
    for (const r in n)
      e[r] = n[r];
  }
  return e;
}
function ka(i) {
  const e = [];
  for (let t = 0; t < i.length; t++)
    e.push(i[t].clone());
  return e;
}
function sa(i) {
  return i.getRenderTarget() === null ? i.outputColorSpace : ke.workingColorSpace;
}
const Wa = { clone: An, merge: mt };
var Xa = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`, qa = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class Kt extends xi {
  constructor(e) {
    super(), this.isShaderMaterial = !0, this.type = "ShaderMaterial", this.defines = {}, this.uniforms = {}, this.uniformsGroups = [], this.vertexShader = Xa, this.fragmentShader = qa, this.linewidth = 1, this.wireframe = !1, this.wireframeLinewidth = 1, this.fog = !1, this.lights = !1, this.clipping = !1, this.forceSinglePass = !0, this.extensions = {
      derivatives: !1,
      // set to use derivatives
      fragDepth: !1,
      // set to use fragment depth values
      drawBuffers: !1,
      // set to use draw buffers
      shaderTextureLOD: !1,
      // set to use shader texture LOD
      clipCullDistance: !1
      // set to use vertex shader clipping
    }, this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    }, this.index0AttributeName = void 0, this.uniformsNeedUpdate = !1, this.glslVersion = null, e !== void 0 && this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.fragmentShader = e.fragmentShader, this.vertexShader = e.vertexShader, this.uniforms = An(e.uniforms), this.uniformsGroups = ka(e.uniformsGroups), this.defines = Object.assign({}, e.defines), this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this.fog = e.fog, this.lights = e.lights, this.clipping = e.clipping, this.extensions = Object.assign({}, e.extensions), this.glslVersion = e.glslVersion, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion, t.uniforms = {};
    for (const r in this.uniforms) {
      const l = this.uniforms[r].value;
      l && l.isTexture ? t.uniforms[r] = {
        type: "t",
        value: l.toJSON(e).uuid
      } : l && l.isColor ? t.uniforms[r] = {
        type: "c",
        value: l.getHex()
      } : l && l.isVector2 ? t.uniforms[r] = {
        type: "v2",
        value: l.toArray()
      } : l && l.isVector3 ? t.uniforms[r] = {
        type: "v3",
        value: l.toArray()
      } : l && l.isVector4 ? t.uniforms[r] = {
        type: "v4",
        value: l.toArray()
      } : l && l.isMatrix3 ? t.uniforms[r] = {
        type: "m3",
        value: l.toArray()
      } : l && l.isMatrix4 ? t.uniforms[r] = {
        type: "m4",
        value: l.toArray()
      } : t.uniforms[r] = {
        value: l
      };
    }
    Object.keys(this.defines).length > 0 && (t.defines = this.defines), t.vertexShader = this.vertexShader, t.fragmentShader = this.fragmentShader, t.lights = this.lights, t.clipping = this.clipping;
    const n = {};
    for (const r in this.extensions)
      this.extensions[r] === !0 && (n[r] = !0);
    return Object.keys(n).length > 0 && (t.extensions = n), t;
  }
}
class oa extends Et {
  constructor() {
    super(), this.isCamera = !0, this.type = "Camera", this.matrixWorldInverse = new ct(), this.projectionMatrix = new ct(), this.projectionMatrixInverse = new ct(), this.coordinateSystem = 2e3;
  }
  copy(e, t) {
    return super.copy(e, t), this.matrixWorldInverse.copy(e.matrixWorldInverse), this.projectionMatrix.copy(e.projectionMatrix), this.projectionMatrixInverse.copy(e.projectionMatrixInverse), this.coordinateSystem = e.coordinateSystem, this;
  }
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(e, t) {
    super.updateWorldMatrix(e, t), this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Lt extends oa {
  constructor(e = 50, t = 1, n = 0.1, r = 2e3) {
    super(), this.isPerspectiveCamera = !0, this.type = "PerspectiveCamera", this.fov = e, this.zoom = 1, this.near = n, this.far = r, this.focus = 10, this.aspect = t, this.view = null, this.filmGauge = 35, this.filmOffset = 0, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.fov = e.fov, this.zoom = e.zoom, this.near = e.near, this.far = e.far, this.focus = e.focus, this.aspect = e.aspect, this.view = e.view === null ? null : Object.assign({}, e.view), this.filmGauge = e.filmGauge, this.filmOffset = e.filmOffset, this;
  }
  /**
   * Sets the FOV by focal length in respect to the current .filmGauge.
   *
   * The default film gauge is 35, so that the focal length can be specified for
   * a 35mm (full frame) camera.
   *
   * Values for focal length and film gauge must have the same unit.
   */
  setFocalLength(e) {
    const t = 0.5 * this.getFilmHeight() / e;
    this.fov = Qi * 2 * Math.atan(t), this.updateProjectionMatrix();
  }
  /**
   * Calculates the focal length from the current .fov and .filmGauge.
   */
  getFocalLength() {
    const e = Math.tan(Ai * 0.5 * this.fov);
    return 0.5 * this.getFilmHeight() / e;
  }
  getEffectiveFOV() {
    return Qi * 2 * Math.atan(
      Math.tan(Ai * 0.5 * this.fov) / this.zoom
    );
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  /**
   * Sets an offset in a larger frustum. This is useful for multi-window or
   * multi-monitor/multi-machine setups.
   *
   * For example, if you have 3x2 monitors and each monitor is 1920x1080 and
   * the monitors are in grid like this
   *
   *   +---+---+---+
   *   | A | B | C |
   *   +---+---+---+
   *   | D | E | F |
   *   +---+---+---+
   *
   * then for each monitor you would call it like this
   *
   *   const w = 1920;
   *   const h = 1080;
   *   const fullWidth = w * 3;
   *   const fullHeight = h * 2;
   *
   *   --A--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 0, w, h );
   *   --B--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 0, w, h );
   *   --C--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 0, w, h );
   *   --D--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 0, h * 1, w, h );
   *   --E--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 1, h * 1, w, h );
   *   --F--
   *   camera.setViewOffset( fullWidth, fullHeight, w * 2, h * 1, w, h );
   *
   *   Note there is no reason monitors have to be the same size or in a grid.
   */
  setViewOffset(e, t, n, r, a, l) {
    this.aspect = e / t, this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = a, this.view.height = l, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = this.near;
    let t = e * Math.tan(Ai * 0.5 * this.fov) / this.zoom, n = 2 * t, r = this.aspect * n, a = -0.5 * r;
    const l = this.view;
    if (this.view !== null && this.view.enabled) {
      const o = l.fullWidth, c = l.fullHeight;
      a += l.offsetX * r / o, t -= l.offsetY * n / c, r *= l.width / o, n *= l.height / c;
    }
    const s = this.filmOffset;
    s !== 0 && (a += e * s / this.getFilmWidth()), this.projectionMatrix.makePerspective(a, a + r, t, t - n, e, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.fov = this.fov, t.object.zoom = this.zoom, t.object.near = this.near, t.object.far = this.far, t.object.focus = this.focus, t.object.aspect = this.aspect, this.view !== null && (t.object.view = Object.assign({}, this.view)), t.object.filmGauge = this.filmGauge, t.object.filmOffset = this.filmOffset, t;
  }
}
const xn = -90, Sn = 1;
class Ya extends Et {
  constructor(e, t, n) {
    super(), this.type = "CubeCamera", this.renderTarget = n, this.coordinateSystem = null, this.activeMipmapLevel = 0;
    const r = new Lt(xn, Sn, e, t);
    r.layers = this.layers, this.add(r);
    const a = new Lt(xn, Sn, e, t);
    a.layers = this.layers, this.add(a);
    const l = new Lt(xn, Sn, e, t);
    l.layers = this.layers, this.add(l);
    const s = new Lt(xn, Sn, e, t);
    s.layers = this.layers, this.add(s);
    const o = new Lt(xn, Sn, e, t);
    o.layers = this.layers, this.add(o);
    const c = new Lt(xn, Sn, e, t);
    c.layers = this.layers, this.add(c);
  }
  updateCoordinateSystem() {
    const e = this.coordinateSystem, t = this.children.concat(), [n, r, a, l, s, o] = t;
    for (const c of t) this.remove(c);
    if (e === 2e3)
      n.up.set(0, 1, 0), n.lookAt(1, 0, 0), r.up.set(0, 1, 0), r.lookAt(-1, 0, 0), a.up.set(0, 0, -1), a.lookAt(0, 1, 0), l.up.set(0, 0, 1), l.lookAt(0, -1, 0), s.up.set(0, 1, 0), s.lookAt(0, 0, 1), o.up.set(0, 1, 0), o.lookAt(0, 0, -1);
    else if (e === 2001)
      n.up.set(0, -1, 0), n.lookAt(-1, 0, 0), r.up.set(0, -1, 0), r.lookAt(1, 0, 0), a.up.set(0, 0, 1), a.lookAt(0, 1, 0), l.up.set(0, 0, -1), l.lookAt(0, -1, 0), s.up.set(0, -1, 0), s.lookAt(0, 0, 1), o.up.set(0, -1, 0), o.lookAt(0, 0, -1);
    else
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    for (const c of t)
      this.add(c), c.updateMatrixWorld();
  }
  update(e, t) {
    this.parent === null && this.updateMatrixWorld();
    const { renderTarget: n, activeMipmapLevel: r } = this;
    this.coordinateSystem !== e.coordinateSystem && (this.coordinateSystem = e.coordinateSystem, this.updateCoordinateSystem());
    const [a, l, s, o, c, h] = this.children, d = e.getRenderTarget(), p = e.getActiveCubeFace(), m = e.getActiveMipmapLevel(), g = e.xr.enabled;
    e.xr.enabled = !1;
    const v = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1, e.setRenderTarget(n, 0, r), e.render(t, a), e.setRenderTarget(n, 1, r), e.render(t, l), e.setRenderTarget(n, 2, r), e.render(t, s), e.setRenderTarget(n, 3, r), e.render(t, o), e.setRenderTarget(n, 4, r), e.render(t, c), n.texture.generateMipmaps = v, e.setRenderTarget(n, 5, r), e.render(t, h), e.setRenderTarget(d, p, m), e.xr.enabled = g, n.texture.needsPMREMUpdate = !0;
  }
}
class la extends vt {
  constructor(e, t, n, r, a, l, s, o, c, h) {
    e = e !== void 0 ? e : [], t = t !== void 0 ? t : 301, super(e, t, n, r, a, l, s, o, c, h), this.isCubeTexture = !0, this.flipY = !1;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class Ka extends Vt {
  constructor(e = 1, t = {}) {
    super(e, e, t), this.isWebGLCubeRenderTarget = !0;
    const n = { width: e, height: e, depth: 1 }, r = [n, n, n, n, n, n];
    t.encoding !== void 0 && (In("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."), t.colorSpace = t.encoding === 3001 ? ot : At), this.texture = new la(r, t.mapping, t.wrapS, t.wrapT, t.magFilter, t.minFilter, t.format, t.type, t.anisotropy, t.colorSpace), this.texture.isRenderTargetTexture = !0, this.texture.generateMipmaps = t.generateMipmaps !== void 0 ? t.generateMipmaps : !1, this.texture.minFilter = t.minFilter !== void 0 ? t.minFilter : 1006;
  }
  fromEquirectangularTexture(e, t) {
    this.texture.type = t.type, this.texture.colorSpace = t.colorSpace, this.texture.generateMipmaps = t.generateMipmaps, this.texture.minFilter = t.minFilter, this.texture.magFilter = t.magFilter;
    const n = {
      uniforms: {
        tEquirect: { value: null }
      },
      vertexShader: (
        /* glsl */
        `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`
      ),
      fragmentShader: (
        /* glsl */
        `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
      )
    }, r = new Gn(5, 5, 5), a = new Kt({
      name: "CubemapFromEquirect",
      uniforms: An(n.uniforms),
      vertexShader: n.vertexShader,
      fragmentShader: n.fragmentShader,
      side: 1,
      blending: 0
    });
    a.uniforms.tEquirect.value = t;
    const l = new Pt(r, a), s = t.minFilter;
    return t.minFilter === 1008 && (t.minFilter = 1006), new Ya(1, 10, this).update(e, l), t.minFilter = s, l.geometry.dispose(), l.material.dispose(), this;
  }
  clear(e, t, n, r) {
    const a = e.getRenderTarget();
    for (let l = 0; l < 6; l++)
      e.setRenderTarget(this, l), e.clear(t, n, r);
    e.setRenderTarget(a);
  }
}
const ki = /* @__PURE__ */ new G(), Za = /* @__PURE__ */ new G(), ja = /* @__PURE__ */ new Oe();
class nn {
  constructor(e = new G(1, 0, 0), t = 0) {
    this.isPlane = !0, this.normal = e, this.constant = t;
  }
  set(e, t) {
    return this.normal.copy(e), this.constant = t, this;
  }
  setComponents(e, t, n, r) {
    return this.normal.set(e, t, n), this.constant = r, this;
  }
  setFromNormalAndCoplanarPoint(e, t) {
    return this.normal.copy(e), this.constant = -t.dot(this.normal), this;
  }
  setFromCoplanarPoints(e, t, n) {
    const r = ki.subVectors(n, t).cross(Za.subVectors(e, t)).normalize();
    return this.setFromNormalAndCoplanarPoint(r, e), this;
  }
  copy(e) {
    return this.normal.copy(e.normal), this.constant = e.constant, this;
  }
  normalize() {
    const e = 1 / this.normal.length();
    return this.normal.multiplyScalar(e), this.constant *= e, this;
  }
  negate() {
    return this.constant *= -1, this.normal.negate(), this;
  }
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  intersectLine(e, t) {
    const n = e.delta(ki), r = this.normal.dot(n);
    if (r === 0)
      return this.distanceToPoint(e.start) === 0 ? t.copy(e.start) : null;
    const a = -(e.start.dot(this.normal) + this.constant) / r;
    return a < 0 || a > 1 ? null : t.copy(e.start).addScaledVector(n, a);
  }
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start), n = this.distanceToPoint(e.end);
    return t < 0 && n > 0 || n < 0 && t > 0;
  }
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(e, t) {
    const n = t || ja.getNormalMatrix(e), r = this.coplanarPoint(ki).applyMatrix4(e), a = this.normal.applyMatrix3(n).normalize();
    return this.constant = -r.dot(a), this;
  }
  translate(e) {
    return this.constant -= e.dot(this.normal), this;
  }
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const tn = /* @__PURE__ */ new gi(), oi = /* @__PURE__ */ new G();
class ca {
  constructor(e = new nn(), t = new nn(), n = new nn(), r = new nn(), a = new nn(), l = new nn()) {
    this.planes = [e, t, n, r, a, l];
  }
  set(e, t, n, r, a, l) {
    const s = this.planes;
    return s[0].copy(e), s[1].copy(t), s[2].copy(n), s[3].copy(r), s[4].copy(a), s[5].copy(l), this;
  }
  copy(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      t[n].copy(e.planes[n]);
    return this;
  }
  setFromProjectionMatrix(e, t = 2e3) {
    const n = this.planes, r = e.elements, a = r[0], l = r[1], s = r[2], o = r[3], c = r[4], h = r[5], d = r[6], p = r[7], m = r[8], g = r[9], v = r[10], f = r[11], u = r[12], y = r[13], S = r[14], w = r[15];
    if (n[0].setComponents(o - a, p - c, f - m, w - u).normalize(), n[1].setComponents(o + a, p + c, f + m, w + u).normalize(), n[2].setComponents(o + l, p + h, f + g, w + y).normalize(), n[3].setComponents(o - l, p - h, f - g, w - y).normalize(), n[4].setComponents(o - s, p - d, f - v, w - S).normalize(), t === 2e3)
      n[5].setComponents(o + s, p + d, f + v, w + S).normalize();
    else if (t === 2001)
      n[5].setComponents(s, d, v, S).normalize();
    else
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    return this;
  }
  intersectsObject(e) {
    if (e.boundingSphere !== void 0)
      e.boundingSphere === null && e.computeBoundingSphere(), tn.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    else {
      const t = e.geometry;
      t.boundingSphere === null && t.computeBoundingSphere(), tn.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(tn);
  }
  intersectsSprite(e) {
    return tn.center.set(0, 0, 0), tn.radius = 0.7071067811865476, tn.applyMatrix4(e.matrixWorld), this.intersectsSphere(tn);
  }
  intersectsSphere(e) {
    const t = this.planes, n = e.center, r = -e.radius;
    for (let a = 0; a < 6; a++)
      if (t[a].distanceToPoint(n) < r)
        return !1;
    return !0;
  }
  intersectsBox(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++) {
      const r = t[n];
      if (oi.x = r.normal.x > 0 ? e.max.x : e.min.x, oi.y = r.normal.y > 0 ? e.max.y : e.min.y, oi.z = r.normal.z > 0 ? e.max.z : e.min.z, r.distanceToPoint(oi) < 0)
        return !1;
    }
    return !0;
  }
  containsPoint(e) {
    const t = this.planes;
    for (let n = 0; n < 6; n++)
      if (t[n].distanceToPoint(e) < 0)
        return !1;
    return !0;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
function ua() {
  let i = null, e = !1, t = null, n = null;
  function r(a, l) {
    t(a, l), n = i.requestAnimationFrame(r);
  }
  return {
    start: function() {
      e !== !0 && t !== null && (n = i.requestAnimationFrame(r), e = !0);
    },
    stop: function() {
      i.cancelAnimationFrame(n), e = !1;
    },
    setAnimationLoop: function(a) {
      t = a;
    },
    setContext: function(a) {
      i = a;
    }
  };
}
function $a(i, e) {
  const t = e.isWebGL2, n = /* @__PURE__ */ new WeakMap();
  function r(c, h) {
    const d = c.array, p = c.usage, m = d.byteLength, g = i.createBuffer();
    i.bindBuffer(h, g), i.bufferData(h, d, p), c.onUploadCallback();
    let v;
    if (d instanceof Float32Array)
      v = i.FLOAT;
    else if (d instanceof Uint16Array)
      if (c.isFloat16BufferAttribute)
        if (t)
          v = i.HALF_FLOAT;
        else
          throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");
      else
        v = i.UNSIGNED_SHORT;
    else if (d instanceof Int16Array)
      v = i.SHORT;
    else if (d instanceof Uint32Array)
      v = i.UNSIGNED_INT;
    else if (d instanceof Int32Array)
      v = i.INT;
    else if (d instanceof Int8Array)
      v = i.BYTE;
    else if (d instanceof Uint8Array)
      v = i.UNSIGNED_BYTE;
    else if (d instanceof Uint8ClampedArray)
      v = i.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + d);
    return {
      buffer: g,
      type: v,
      bytesPerElement: d.BYTES_PER_ELEMENT,
      version: c.version,
      size: m
    };
  }
  function a(c, h, d) {
    const p = h.array, m = h._updateRange, g = h.updateRanges;
    if (i.bindBuffer(d, c), m.count === -1 && g.length === 0 && i.bufferSubData(d, 0, p), g.length !== 0) {
      for (let v = 0, f = g.length; v < f; v++) {
        const u = g[v];
        t ? i.bufferSubData(
          d,
          u.start * p.BYTES_PER_ELEMENT,
          p,
          u.start,
          u.count
        ) : i.bufferSubData(
          d,
          u.start * p.BYTES_PER_ELEMENT,
          p.subarray(u.start, u.start + u.count)
        );
      }
      h.clearUpdateRanges();
    }
    m.count !== -1 && (t ? i.bufferSubData(
      d,
      m.offset * p.BYTES_PER_ELEMENT,
      p,
      m.offset,
      m.count
    ) : i.bufferSubData(
      d,
      m.offset * p.BYTES_PER_ELEMENT,
      p.subarray(m.offset, m.offset + m.count)
    ), m.count = -1), h.onUploadCallback();
  }
  function l(c) {
    return c.isInterleavedBufferAttribute && (c = c.data), n.get(c);
  }
  function s(c) {
    c.isInterleavedBufferAttribute && (c = c.data);
    const h = n.get(c);
    h && (i.deleteBuffer(h.buffer), n.delete(c));
  }
  function o(c, h) {
    if (c.isGLBufferAttribute) {
      const p = n.get(c);
      (!p || p.version < c.version) && n.set(c, {
        buffer: c.buffer,
        type: c.type,
        bytesPerElement: c.elementSize,
        version: c.version
      });
      return;
    }
    c.isInterleavedBufferAttribute && (c = c.data);
    const d = n.get(c);
    if (d === void 0)
      n.set(c, r(c, h));
    else if (d.version < c.version) {
      if (d.size !== c.array.byteLength)
        throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");
      a(d.buffer, c, h), d.version = c.version;
    }
  }
  return {
    get: l,
    remove: s,
    update: o
  };
}
class rr extends Zt {
  constructor(e = 1, t = 1, n = 1, r = 1) {
    super(), this.type = "PlaneGeometry", this.parameters = {
      width: e,
      height: t,
      widthSegments: n,
      heightSegments: r
    };
    const a = e / 2, l = t / 2, s = Math.floor(n), o = Math.floor(r), c = s + 1, h = o + 1, d = e / s, p = t / o, m = [], g = [], v = [], f = [];
    for (let u = 0; u < h; u++) {
      const y = u * p - l;
      for (let S = 0; S < c; S++) {
        const w = S * d - a;
        g.push(w, -y, 0), v.push(0, 0, 1), f.push(S / s), f.push(1 - u / o);
      }
    }
    for (let u = 0; u < o; u++)
      for (let y = 0; y < s; y++) {
        const S = y + c * u, w = y + c * (u + 1), D = y + 1 + c * (u + 1), C = y + 1 + c * u;
        m.push(S, w, C), m.push(w, D, C);
      }
    this.setIndex(m), this.setAttribute("position", new sn(g, 3)), this.setAttribute("normal", new sn(v, 3)), this.setAttribute("uv", new sn(f, 2));
  }
  copy(e) {
    return super.copy(e), this.parameters = Object.assign({}, e.parameters), this;
  }
  static fromJSON(e) {
    return new rr(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
var Ja = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`, Qa = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`, es = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`, ts = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, ns = `#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`, is = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`, rs = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`, as = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`, ss = `#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, os = `#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`, ls = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`, cs = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`, us = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`, hs = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`, fs = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`, ds = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`, ps = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`, ms = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`, _s = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`, gs = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`, vs = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`, xs = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`, Ss = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`, Ms = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`, Es = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`, Ts = `vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`, ys = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`, As = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`, bs = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`, Rs = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`, ws = "gl_FragColor = linearToOutputTexel( gl_FragColor );", Cs = `
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`, Ls = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`, Ps = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`, Ds = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`, Us = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`, Fs = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`, Is = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`, Ns = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`, Os = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`, Bs = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`, Gs = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`, Hs = `#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`, zs = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`, Vs = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`, ks = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`, Ws = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`, Xs = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`, qs = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`, Ys = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`, Ks = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`, Zs = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`, js = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`, $s = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`, Js = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`, Qs = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`, eo = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`, to = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`, no = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`, io = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`, ro = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`, ao = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`, so = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`, oo = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`, lo = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`, co = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`, uo = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`, ho = `#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`, fo = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`, po = `#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`, mo = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`, _o = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`, go = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`, vo = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, xo = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`, So = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`, Mo = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`, Eo = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`, To = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`, yo = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`, Ao = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`, bo = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`, Ro = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`, wo = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`, Co = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`, Lo = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`, Po = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`, Do = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`, Uo = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`, Fo = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`, Io = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`, No = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`, Oo = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`, Bo = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`, Go = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`, Ho = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`, zo = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`, Vo = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`, ko = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`, Wo = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`, Xo = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`, qo = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`, Yo = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`, Ko = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, Zo = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`, jo = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`, $o = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const Jo = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`, Qo = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, el = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, tl = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, nl = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`, il = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, rl = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`, al = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`, sl = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`, ol = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`, ll = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`, cl = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`, ul = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, hl = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, fl = `#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`, dl = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, pl = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, ml = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, _l = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`, gl = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, vl = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`, xl = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`, Sl = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Ml = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, El = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`, Tl = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, yl = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Al = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`, bl = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`, Rl = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`, wl = `#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`, Cl = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Ll = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`, Pl = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`, Pe = {
  alphahash_fragment: Ja,
  alphahash_pars_fragment: Qa,
  alphamap_fragment: es,
  alphamap_pars_fragment: ts,
  alphatest_fragment: ns,
  alphatest_pars_fragment: is,
  aomap_fragment: rs,
  aomap_pars_fragment: as,
  batching_pars_vertex: ss,
  batching_vertex: os,
  begin_vertex: ls,
  beginnormal_vertex: cs,
  bsdfs: us,
  iridescence_fragment: hs,
  bumpmap_pars_fragment: fs,
  clipping_planes_fragment: ds,
  clipping_planes_pars_fragment: ps,
  clipping_planes_pars_vertex: ms,
  clipping_planes_vertex: _s,
  color_fragment: gs,
  color_pars_fragment: vs,
  color_pars_vertex: xs,
  color_vertex: Ss,
  common: Ms,
  cube_uv_reflection_fragment: Es,
  defaultnormal_vertex: Ts,
  displacementmap_pars_vertex: ys,
  displacementmap_vertex: As,
  emissivemap_fragment: bs,
  emissivemap_pars_fragment: Rs,
  colorspace_fragment: ws,
  colorspace_pars_fragment: Cs,
  envmap_fragment: Ls,
  envmap_common_pars_fragment: Ps,
  envmap_pars_fragment: Ds,
  envmap_pars_vertex: Us,
  envmap_physical_pars_fragment: Xs,
  envmap_vertex: Fs,
  fog_vertex: Is,
  fog_pars_vertex: Ns,
  fog_fragment: Os,
  fog_pars_fragment: Bs,
  gradientmap_pars_fragment: Gs,
  lightmap_fragment: Hs,
  lightmap_pars_fragment: zs,
  lights_lambert_fragment: Vs,
  lights_lambert_pars_fragment: ks,
  lights_pars_begin: Ws,
  lights_toon_fragment: qs,
  lights_toon_pars_fragment: Ys,
  lights_phong_fragment: Ks,
  lights_phong_pars_fragment: Zs,
  lights_physical_fragment: js,
  lights_physical_pars_fragment: $s,
  lights_fragment_begin: Js,
  lights_fragment_maps: Qs,
  lights_fragment_end: eo,
  logdepthbuf_fragment: to,
  logdepthbuf_pars_fragment: no,
  logdepthbuf_pars_vertex: io,
  logdepthbuf_vertex: ro,
  map_fragment: ao,
  map_pars_fragment: so,
  map_particle_fragment: oo,
  map_particle_pars_fragment: lo,
  metalnessmap_fragment: co,
  metalnessmap_pars_fragment: uo,
  morphcolor_vertex: ho,
  morphnormal_vertex: fo,
  morphtarget_pars_vertex: po,
  morphtarget_vertex: mo,
  normal_fragment_begin: _o,
  normal_fragment_maps: go,
  normal_pars_fragment: vo,
  normal_pars_vertex: xo,
  normal_vertex: So,
  normalmap_pars_fragment: Mo,
  clearcoat_normal_fragment_begin: Eo,
  clearcoat_normal_fragment_maps: To,
  clearcoat_pars_fragment: yo,
  iridescence_pars_fragment: Ao,
  opaque_fragment: bo,
  packing: Ro,
  premultiplied_alpha_fragment: wo,
  project_vertex: Co,
  dithering_fragment: Lo,
  dithering_pars_fragment: Po,
  roughnessmap_fragment: Do,
  roughnessmap_pars_fragment: Uo,
  shadowmap_pars_fragment: Fo,
  shadowmap_pars_vertex: Io,
  shadowmap_vertex: No,
  shadowmask_pars_fragment: Oo,
  skinbase_vertex: Bo,
  skinning_pars_vertex: Go,
  skinning_vertex: Ho,
  skinnormal_vertex: zo,
  specularmap_fragment: Vo,
  specularmap_pars_fragment: ko,
  tonemapping_fragment: Wo,
  tonemapping_pars_fragment: Xo,
  transmission_fragment: qo,
  transmission_pars_fragment: Yo,
  uv_pars_fragment: Ko,
  uv_pars_vertex: Zo,
  uv_vertex: jo,
  worldpos_vertex: $o,
  background_vert: Jo,
  background_frag: Qo,
  backgroundCube_vert: el,
  backgroundCube_frag: tl,
  cube_vert: nl,
  cube_frag: il,
  depth_vert: rl,
  depth_frag: al,
  distanceRGBA_vert: sl,
  distanceRGBA_frag: ol,
  equirect_vert: ll,
  equirect_frag: cl,
  linedashed_vert: ul,
  linedashed_frag: hl,
  meshbasic_vert: fl,
  meshbasic_frag: dl,
  meshlambert_vert: pl,
  meshlambert_frag: ml,
  meshmatcap_vert: _l,
  meshmatcap_frag: gl,
  meshnormal_vert: vl,
  meshnormal_frag: xl,
  meshphong_vert: Sl,
  meshphong_frag: Ml,
  meshphysical_vert: El,
  meshphysical_frag: Tl,
  meshtoon_vert: yl,
  meshtoon_frag: Al,
  points_vert: bl,
  points_frag: Rl,
  shadow_vert: wl,
  shadow_frag: Cl,
  sprite_vert: Ll,
  sprite_frag: Pl
}, ne = {
  common: {
    diffuse: { value: /* @__PURE__ */ new We(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Oe() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Oe() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new Oe() }
  },
  envmap: {
    envMap: { value: null },
    flipEnvMap: { value: -1 },
    reflectivity: { value: 1 },
    // basic, lambert, phong
    ior: { value: 1.5 },
    // physical
    refractionRatio: { value: 0.98 }
    // basic, lambert, phong
  },
  aomap: {
    aoMap: { value: null },
    aoMapIntensity: { value: 1 },
    aoMapTransform: { value: /* @__PURE__ */ new Oe() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new Oe() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new Oe() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new Oe() },
    normalScale: { value: /* @__PURE__ */ new He(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new Oe() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new Oe() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new Oe() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new Oe() }
  },
  gradientmap: {
    gradientMap: { value: null }
  },
  fog: {
    fogDensity: { value: 25e-5 },
    fogNear: { value: 1 },
    fogFar: { value: 2e3 },
    fogColor: { value: /* @__PURE__ */ new We(16777215) }
  },
  lights: {
    ambientLightColor: { value: [] },
    lightProbe: { value: [] },
    directionalLights: { value: [], properties: {
      direction: {},
      color: {}
    } },
    directionalLightShadows: { value: [], properties: {
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    directionalShadowMap: { value: [] },
    directionalShadowMatrix: { value: [] },
    spotLights: { value: [], properties: {
      color: {},
      position: {},
      direction: {},
      distance: {},
      coneCos: {},
      penumbraCos: {},
      decay: {}
    } },
    spotLightShadows: { value: [], properties: {
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {}
    } },
    spotLightMap: { value: [] },
    spotShadowMap: { value: [] },
    spotLightMatrix: { value: [] },
    pointLights: { value: [], properties: {
      color: {},
      position: {},
      decay: {},
      distance: {}
    } },
    pointLightShadows: { value: [], properties: {
      shadowBias: {},
      shadowNormalBias: {},
      shadowRadius: {},
      shadowMapSize: {},
      shadowCameraNear: {},
      shadowCameraFar: {}
    } },
    pointShadowMap: { value: [] },
    pointShadowMatrix: { value: [] },
    hemisphereLights: { value: [], properties: {
      direction: {},
      skyColor: {},
      groundColor: {}
    } },
    // TODO (abelnation): RectAreaLight BRDF data needs to be moved from example to main src
    rectAreaLights: { value: [], properties: {
      color: {},
      position: {},
      width: {},
      height: {}
    } },
    ltc_1: { value: null },
    ltc_2: { value: null }
  },
  points: {
    diffuse: { value: /* @__PURE__ */ new We(16777215) },
    opacity: { value: 1 },
    size: { value: 1 },
    scale: { value: 1 },
    map: { value: null },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Oe() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Oe() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new We(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new He(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Oe() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Oe() },
    alphaTest: { value: 0 }
  }
}, Ft = {
  basic: {
    uniforms: /* @__PURE__ */ mt([
      ne.common,
      ne.specularmap,
      ne.envmap,
      ne.aomap,
      ne.lightmap,
      ne.fog
    ]),
    vertexShader: Pe.meshbasic_vert,
    fragmentShader: Pe.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ mt([
      ne.common,
      ne.specularmap,
      ne.envmap,
      ne.aomap,
      ne.lightmap,
      ne.emissivemap,
      ne.bumpmap,
      ne.normalmap,
      ne.displacementmap,
      ne.fog,
      ne.lights,
      {
        emissive: { value: /* @__PURE__ */ new We(0) }
      }
    ]),
    vertexShader: Pe.meshlambert_vert,
    fragmentShader: Pe.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ mt([
      ne.common,
      ne.specularmap,
      ne.envmap,
      ne.aomap,
      ne.lightmap,
      ne.emissivemap,
      ne.bumpmap,
      ne.normalmap,
      ne.displacementmap,
      ne.fog,
      ne.lights,
      {
        emissive: { value: /* @__PURE__ */ new We(0) },
        specular: { value: /* @__PURE__ */ new We(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: Pe.meshphong_vert,
    fragmentShader: Pe.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ mt([
      ne.common,
      ne.envmap,
      ne.aomap,
      ne.lightmap,
      ne.emissivemap,
      ne.bumpmap,
      ne.normalmap,
      ne.displacementmap,
      ne.roughnessmap,
      ne.metalnessmap,
      ne.fog,
      ne.lights,
      {
        emissive: { value: /* @__PURE__ */ new We(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
        // temporary
      }
    ]),
    vertexShader: Pe.meshphysical_vert,
    fragmentShader: Pe.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ mt([
      ne.common,
      ne.aomap,
      ne.lightmap,
      ne.emissivemap,
      ne.bumpmap,
      ne.normalmap,
      ne.displacementmap,
      ne.gradientmap,
      ne.fog,
      ne.lights,
      {
        emissive: { value: /* @__PURE__ */ new We(0) }
      }
    ]),
    vertexShader: Pe.meshtoon_vert,
    fragmentShader: Pe.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ mt([
      ne.common,
      ne.bumpmap,
      ne.normalmap,
      ne.displacementmap,
      ne.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: Pe.meshmatcap_vert,
    fragmentShader: Pe.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ mt([
      ne.points,
      ne.fog
    ]),
    vertexShader: Pe.points_vert,
    fragmentShader: Pe.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ mt([
      ne.common,
      ne.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: Pe.linedashed_vert,
    fragmentShader: Pe.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ mt([
      ne.common,
      ne.displacementmap
    ]),
    vertexShader: Pe.depth_vert,
    fragmentShader: Pe.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ mt([
      ne.common,
      ne.bumpmap,
      ne.normalmap,
      ne.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Pe.meshnormal_vert,
    fragmentShader: Pe.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ mt([
      ne.sprite,
      ne.fog
    ]),
    vertexShader: Pe.sprite_vert,
    fragmentShader: Pe.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new Oe() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Pe.background_vert,
    fragmentShader: Pe.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: Pe.backgroundCube_vert,
    fragmentShader: Pe.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: Pe.cube_vert,
    fragmentShader: Pe.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: Pe.equirect_vert,
    fragmentShader: Pe.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ mt([
      ne.common,
      ne.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new G() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: Pe.distanceRGBA_vert,
    fragmentShader: Pe.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ mt([
      ne.lights,
      ne.fog,
      {
        color: { value: /* @__PURE__ */ new We(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: Pe.shadow_vert,
    fragmentShader: Pe.shadow_frag
  }
};
Ft.physical = {
  uniforms: /* @__PURE__ */ mt([
    Ft.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new Oe() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Oe() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new He(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Oe() },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new Oe() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Oe() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new We(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new Oe() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Oe() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new Oe() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new He() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new Oe() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new We(0) },
      specularColor: { value: /* @__PURE__ */ new We(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new Oe() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new Oe() },
      anisotropyVector: { value: /* @__PURE__ */ new He() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new Oe() }
    }
  ]),
  vertexShader: Pe.meshphysical_vert,
  fragmentShader: Pe.meshphysical_frag
};
const li = { r: 0, b: 0, g: 0 };
function Dl(i, e, t, n, r, a, l) {
  const s = new We(0);
  let o = a === !0 ? 0 : 1, c, h, d = null, p = 0, m = null;
  function g(f, u) {
    let y = !1, S = u.isScene === !0 ? u.background : null;
    S && S.isTexture && (S = (u.backgroundBlurriness > 0 ? t : e).get(S)), S === null ? v(s, o) : S && S.isColor && (v(S, 1), y = !0);
    const w = i.xr.getEnvironmentBlendMode();
    w === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, l) : w === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, l), (i.autoClear || y) && i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil), S && (S.isCubeTexture || S.mapping === 306) ? (h === void 0 && (h = new Pt(
      new Gn(1, 1, 1),
      new Kt({
        name: "BackgroundCubeMaterial",
        uniforms: An(Ft.backgroundCube.uniforms),
        vertexShader: Ft.backgroundCube.vertexShader,
        fragmentShader: Ft.backgroundCube.fragmentShader,
        side: 1,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), h.geometry.deleteAttribute("normal"), h.geometry.deleteAttribute("uv"), h.onBeforeRender = function(D, C, R) {
      this.matrixWorld.copyPosition(R.matrixWorld);
    }, Object.defineProperty(h.material, "envMap", {
      get: function() {
        return this.uniforms.envMap.value;
      }
    }), r.update(h)), h.material.uniforms.envMap.value = S, h.material.uniforms.flipEnvMap.value = S.isCubeTexture && S.isRenderTargetTexture === !1 ? -1 : 1, h.material.uniforms.backgroundBlurriness.value = u.backgroundBlurriness, h.material.uniforms.backgroundIntensity.value = u.backgroundIntensity, h.material.toneMapped = ke.getTransfer(S.colorSpace) !== Ke, (d !== S || p !== S.version || m !== i.toneMapping) && (h.material.needsUpdate = !0, d = S, p = S.version, m = i.toneMapping), h.layers.enableAll(), f.unshift(h, h.geometry, h.material, 0, 0, null)) : S && S.isTexture && (c === void 0 && (c = new Pt(
      new rr(2, 2),
      new Kt({
        name: "BackgroundMaterial",
        uniforms: An(Ft.background.uniforms),
        vertexShader: Ft.background.vertexShader,
        fragmentShader: Ft.background.fragmentShader,
        side: 0,
        depthTest: !1,
        depthWrite: !1,
        fog: !1
      })
    ), c.geometry.deleteAttribute("normal"), Object.defineProperty(c.material, "map", {
      get: function() {
        return this.uniforms.t2D.value;
      }
    }), r.update(c)), c.material.uniforms.t2D.value = S, c.material.uniforms.backgroundIntensity.value = u.backgroundIntensity, c.material.toneMapped = ke.getTransfer(S.colorSpace) !== Ke, S.matrixAutoUpdate === !0 && S.updateMatrix(), c.material.uniforms.uvTransform.value.copy(S.matrix), (d !== S || p !== S.version || m !== i.toneMapping) && (c.material.needsUpdate = !0, d = S, p = S.version, m = i.toneMapping), c.layers.enableAll(), f.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function v(f, u) {
    f.getRGB(li, sa(i)), n.buffers.color.setClear(li.r, li.g, li.b, u, l);
  }
  return {
    getClearColor: function() {
      return s;
    },
    setClearColor: function(f, u = 1) {
      s.set(f), o = u, v(s, o);
    },
    getClearAlpha: function() {
      return o;
    },
    setClearAlpha: function(f) {
      o = f, v(s, o);
    },
    render: g
  };
}
function Ul(i, e, t, n) {
  const r = i.getParameter(i.MAX_VERTEX_ATTRIBS), a = n.isWebGL2 ? null : e.get("OES_vertex_array_object"), l = n.isWebGL2 || a !== null, s = {}, o = f(null);
  let c = o, h = !1;
  function d(L, I, V, q, X) {
    let k = !1;
    if (l) {
      const j = v(q, V, I);
      c !== j && (c = j, m(c.object)), k = u(L, q, V, X), k && y(L, q, V, X);
    } else {
      const j = I.wireframe === !0;
      (c.geometry !== q.id || c.program !== V.id || c.wireframe !== j) && (c.geometry = q.id, c.program = V.id, c.wireframe = j, k = !0);
    }
    X !== null && t.update(X, i.ELEMENT_ARRAY_BUFFER), (k || h) && (h = !1, K(L, I, V, q), X !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, t.get(X).buffer));
  }
  function p() {
    return n.isWebGL2 ? i.createVertexArray() : a.createVertexArrayOES();
  }
  function m(L) {
    return n.isWebGL2 ? i.bindVertexArray(L) : a.bindVertexArrayOES(L);
  }
  function g(L) {
    return n.isWebGL2 ? i.deleteVertexArray(L) : a.deleteVertexArrayOES(L);
  }
  function v(L, I, V) {
    const q = V.wireframe === !0;
    let X = s[L.id];
    X === void 0 && (X = {}, s[L.id] = X);
    let k = X[I.id];
    k === void 0 && (k = {}, X[I.id] = k);
    let j = k[q];
    return j === void 0 && (j = f(p()), k[q] = j), j;
  }
  function f(L) {
    const I = [], V = [], q = [];
    for (let X = 0; X < r; X++)
      I[X] = 0, V[X] = 0, q[X] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: I,
      enabledAttributes: V,
      attributeDivisors: q,
      object: L,
      attributes: {},
      index: null
    };
  }
  function u(L, I, V, q) {
    const X = c.attributes, k = I.attributes;
    let j = 0;
    const A = V.getAttributes();
    for (const J in A)
      if (A[J].location >= 0) {
        const W = X[J];
        let re = k[J];
        if (re === void 0 && (J === "instanceMatrix" && L.instanceMatrix && (re = L.instanceMatrix), J === "instanceColor" && L.instanceColor && (re = L.instanceColor)), W === void 0 || W.attribute !== re || re && W.data !== re.data) return !0;
        j++;
      }
    return c.attributesNum !== j || c.index !== q;
  }
  function y(L, I, V, q) {
    const X = {}, k = I.attributes;
    let j = 0;
    const A = V.getAttributes();
    for (const J in A)
      if (A[J].location >= 0) {
        let W = k[J];
        W === void 0 && (J === "instanceMatrix" && L.instanceMatrix && (W = L.instanceMatrix), J === "instanceColor" && L.instanceColor && (W = L.instanceColor));
        const re = {};
        re.attribute = W, W && W.data && (re.data = W.data), X[J] = re, j++;
      }
    c.attributes = X, c.attributesNum = j, c.index = q;
  }
  function S() {
    const L = c.newAttributes;
    for (let I = 0, V = L.length; I < V; I++)
      L[I] = 0;
  }
  function w(L) {
    D(L, 0);
  }
  function D(L, I) {
    const V = c.newAttributes, q = c.enabledAttributes, X = c.attributeDivisors;
    V[L] = 1, q[L] === 0 && (i.enableVertexAttribArray(L), q[L] = 1), X[L] !== I && ((n.isWebGL2 ? i : e.get("ANGLE_instanced_arrays"))[n.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](L, I), X[L] = I);
  }
  function C() {
    const L = c.newAttributes, I = c.enabledAttributes;
    for (let V = 0, q = I.length; V < q; V++)
      I[V] !== L[V] && (i.disableVertexAttribArray(V), I[V] = 0);
  }
  function R(L, I, V, q, X, k, j) {
    j === !0 ? i.vertexAttribIPointer(L, I, V, X, k) : i.vertexAttribPointer(L, I, V, q, X, k);
  }
  function K(L, I, V, q) {
    if (n.isWebGL2 === !1 && (L.isInstancedMesh || q.isInstancedBufferGeometry) && e.get("ANGLE_instanced_arrays") === null)
      return;
    S();
    const X = q.attributes, k = V.getAttributes(), j = I.defaultAttributeValues;
    for (const A in k) {
      const J = k[A];
      if (J.location >= 0) {
        let N = X[A];
        if (N === void 0 && (A === "instanceMatrix" && L.instanceMatrix && (N = L.instanceMatrix), A === "instanceColor" && L.instanceColor && (N = L.instanceColor)), N !== void 0) {
          const W = N.normalized, re = N.itemSize, he = t.get(N);
          if (he === void 0) continue;
          const fe = he.buffer, xe = he.type, Ee = he.bytesPerElement, Se = n.isWebGL2 === !0 && (xe === i.INT || xe === i.UNSIGNED_INT || N.gpuType === 1013);
          if (N.isInterleavedBufferAttribute) {
            const Ge = N.data, U = Ge.stride, it = N.offset;
            if (Ge.isInstancedInterleavedBuffer) {
              for (let ge = 0; ge < J.locationSize; ge++)
                D(J.location + ge, Ge.meshPerAttribute);
              L.isInstancedMesh !== !0 && q._maxInstanceCount === void 0 && (q._maxInstanceCount = Ge.meshPerAttribute * Ge.count);
            } else
              for (let ge = 0; ge < J.locationSize; ge++)
                w(J.location + ge);
            i.bindBuffer(i.ARRAY_BUFFER, fe);
            for (let ge = 0; ge < J.locationSize; ge++)
              R(
                J.location + ge,
                re / J.locationSize,
                xe,
                W,
                U * Ee,
                (it + re / J.locationSize * ge) * Ee,
                Se
              );
          } else {
            if (N.isInstancedBufferAttribute) {
              for (let Ge = 0; Ge < J.locationSize; Ge++)
                D(J.location + Ge, N.meshPerAttribute);
              L.isInstancedMesh !== !0 && q._maxInstanceCount === void 0 && (q._maxInstanceCount = N.meshPerAttribute * N.count);
            } else
              for (let Ge = 0; Ge < J.locationSize; Ge++)
                w(J.location + Ge);
            i.bindBuffer(i.ARRAY_BUFFER, fe);
            for (let Ge = 0; Ge < J.locationSize; Ge++)
              R(
                J.location + Ge,
                re / J.locationSize,
                xe,
                W,
                re * Ee,
                re / J.locationSize * Ge * Ee,
                Se
              );
          }
        } else if (j !== void 0) {
          const W = j[A];
          if (W !== void 0)
            switch (W.length) {
              case 2:
                i.vertexAttrib2fv(J.location, W);
                break;
              case 3:
                i.vertexAttrib3fv(J.location, W);
                break;
              case 4:
                i.vertexAttrib4fv(J.location, W);
                break;
              default:
                i.vertexAttrib1fv(J.location, W);
            }
        }
      }
    }
    C();
  }
  function M() {
    Y();
    for (const L in s) {
      const I = s[L];
      for (const V in I) {
        const q = I[V];
        for (const X in q)
          g(q[X].object), delete q[X];
        delete I[V];
      }
      delete s[L];
    }
  }
  function T(L) {
    if (s[L.id] === void 0) return;
    const I = s[L.id];
    for (const V in I) {
      const q = I[V];
      for (const X in q)
        g(q[X].object), delete q[X];
      delete I[V];
    }
    delete s[L.id];
  }
  function z(L) {
    for (const I in s) {
      const V = s[I];
      if (V[L.id] === void 0) continue;
      const q = V[L.id];
      for (const X in q)
        g(q[X].object), delete q[X];
      delete V[L.id];
    }
  }
  function Y() {
    ie(), h = !0, c !== o && (c = o, m(c.object));
  }
  function ie() {
    o.geometry = null, o.program = null, o.wireframe = !1;
  }
  return {
    setup: d,
    reset: Y,
    resetDefaultState: ie,
    dispose: M,
    releaseStatesOfGeometry: T,
    releaseStatesOfProgram: z,
    initAttributes: S,
    enableAttribute: w,
    disableUnusedAttributes: C
  };
}
function Fl(i, e, t, n) {
  const r = n.isWebGL2;
  let a;
  function l(h) {
    a = h;
  }
  function s(h, d) {
    i.drawArrays(a, h, d), t.update(d, a, 1);
  }
  function o(h, d, p) {
    if (p === 0) return;
    let m, g;
    if (r)
      m = i, g = "drawArraysInstanced";
    else if (m = e.get("ANGLE_instanced_arrays"), g = "drawArraysInstancedANGLE", m === null) {
      console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
      return;
    }
    m[g](a, h, d, p), t.update(d, a, p);
  }
  function c(h, d, p) {
    if (p === 0) return;
    const m = e.get("WEBGL_multi_draw");
    if (m === null)
      for (let g = 0; g < p; g++)
        this.render(h[g], d[g]);
    else {
      m.multiDrawArraysWEBGL(a, h, 0, d, 0, p);
      let g = 0;
      for (let v = 0; v < p; v++)
        g += d[v];
      t.update(g, a, 1);
    }
  }
  this.setMode = l, this.render = s, this.renderInstances = o, this.renderMultiDraw = c;
}
function Il(i, e, t) {
  let n;
  function r() {
    if (n !== void 0) return n;
    if (e.has("EXT_texture_filter_anisotropic") === !0) {
      const R = e.get("EXT_texture_filter_anisotropic");
      n = i.getParameter(R.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else
      n = 0;
    return n;
  }
  function a(R) {
    if (R === "highp") {
      if (i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.HIGH_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.HIGH_FLOAT).precision > 0)
        return "highp";
      R = "mediump";
    }
    return R === "mediump" && i.getShaderPrecisionFormat(i.VERTEX_SHADER, i.MEDIUM_FLOAT).precision > 0 && i.getShaderPrecisionFormat(i.FRAGMENT_SHADER, i.MEDIUM_FLOAT).precision > 0 ? "mediump" : "lowp";
  }
  const l = typeof WebGL2RenderingContext < "u" && i.constructor.name === "WebGL2RenderingContext";
  let s = t.precision !== void 0 ? t.precision : "highp";
  const o = a(s);
  o !== s && (console.warn("THREE.WebGLRenderer:", s, "not supported, using", o, "instead."), s = o);
  const c = l || e.has("WEBGL_draw_buffers"), h = t.logarithmicDepthBuffer === !0, d = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), p = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), m = i.getParameter(i.MAX_TEXTURE_SIZE), g = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), v = i.getParameter(i.MAX_VERTEX_ATTRIBS), f = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), u = i.getParameter(i.MAX_VARYING_VECTORS), y = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), S = p > 0, w = l || e.has("OES_texture_float"), D = S && w, C = l ? i.getParameter(i.MAX_SAMPLES) : 0;
  return {
    isWebGL2: l,
    drawBuffers: c,
    getMaxAnisotropy: r,
    getMaxPrecision: a,
    precision: s,
    logarithmicDepthBuffer: h,
    maxTextures: d,
    maxVertexTextures: p,
    maxTextureSize: m,
    maxCubemapSize: g,
    maxAttributes: v,
    maxVertexUniforms: f,
    maxVaryings: u,
    maxFragmentUniforms: y,
    vertexTextures: S,
    floatFragmentTextures: w,
    floatVertexTextures: D,
    maxSamples: C
  };
}
function Nl(i) {
  const e = this;
  let t = null, n = 0, r = !1, a = !1;
  const l = new nn(), s = new Oe(), o = { value: null, needsUpdate: !1 };
  this.uniform = o, this.numPlanes = 0, this.numIntersection = 0, this.init = function(d, p) {
    const m = d.length !== 0 || p || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    n !== 0 || r;
    return r = p, n = d.length, m;
  }, this.beginShadows = function() {
    a = !0, h(null);
  }, this.endShadows = function() {
    a = !1;
  }, this.setGlobalState = function(d, p) {
    t = h(d, p, 0);
  }, this.setState = function(d, p, m) {
    const g = d.clippingPlanes, v = d.clipIntersection, f = d.clipShadows, u = i.get(d);
    if (!r || g === null || g.length === 0 || a && !f)
      a ? h(null) : c();
    else {
      const y = a ? 0 : n, S = y * 4;
      let w = u.clippingState || null;
      o.value = w, w = h(g, p, S, m);
      for (let D = 0; D !== S; ++D)
        w[D] = t[D];
      u.clippingState = w, this.numIntersection = v ? this.numPlanes : 0, this.numPlanes += y;
    }
  };
  function c() {
    o.value !== t && (o.value = t, o.needsUpdate = n > 0), e.numPlanes = n, e.numIntersection = 0;
  }
  function h(d, p, m, g) {
    const v = d !== null ? d.length : 0;
    let f = null;
    if (v !== 0) {
      if (f = o.value, g !== !0 || f === null) {
        const u = m + v * 4, y = p.matrixWorldInverse;
        s.getNormalMatrix(y), (f === null || f.length < u) && (f = new Float32Array(u));
        for (let S = 0, w = m; S !== v; ++S, w += 4)
          l.copy(d[S]).applyMatrix4(y, s), l.normal.toArray(f, w), f[w + 3] = l.constant;
      }
      o.value = f, o.needsUpdate = !0;
    }
    return e.numPlanes = v, e.numIntersection = 0, f;
  }
}
function Ol(i) {
  let e = /* @__PURE__ */ new WeakMap();
  function t(l, s) {
    return s === 303 ? l.mapping = 301 : s === 304 && (l.mapping = 302), l;
  }
  function n(l) {
    if (l && l.isTexture) {
      const s = l.mapping;
      if (s === 303 || s === 304)
        if (e.has(l)) {
          const o = e.get(l).texture;
          return t(o, l.mapping);
        } else {
          const o = l.image;
          if (o && o.height > 0) {
            const c = new Ka(o.height / 2);
            return c.fromEquirectangularTexture(i, l), e.set(l, c), l.addEventListener("dispose", r), t(c.texture, l.mapping);
          } else
            return null;
        }
    }
    return l;
  }
  function r(l) {
    const s = l.target;
    s.removeEventListener("dispose", r);
    const o = e.get(s);
    o !== void 0 && (e.delete(s), o.dispose());
  }
  function a() {
    e = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: n,
    dispose: a
  };
}
class ha extends oa {
  constructor(e = -1, t = 1, n = 1, r = -1, a = 0.1, l = 2e3) {
    super(), this.isOrthographicCamera = !0, this.type = "OrthographicCamera", this.zoom = 1, this.view = null, this.left = e, this.right = t, this.top = n, this.bottom = r, this.near = a, this.far = l, this.updateProjectionMatrix();
  }
  copy(e, t) {
    return super.copy(e, t), this.left = e.left, this.right = e.right, this.top = e.top, this.bottom = e.bottom, this.near = e.near, this.far = e.far, this.zoom = e.zoom, this.view = e.view === null ? null : Object.assign({}, e.view), this;
  }
  setViewOffset(e, t, n, r, a, l) {
    this.view === null && (this.view = {
      enabled: !0,
      fullWidth: 1,
      fullHeight: 1,
      offsetX: 0,
      offsetY: 0,
      width: 1,
      height: 1
    }), this.view.enabled = !0, this.view.fullWidth = e, this.view.fullHeight = t, this.view.offsetX = n, this.view.offsetY = r, this.view.width = a, this.view.height = l, this.updateProjectionMatrix();
  }
  clearViewOffset() {
    this.view !== null && (this.view.enabled = !1), this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (2 * this.zoom), t = (this.top - this.bottom) / (2 * this.zoom), n = (this.right + this.left) / 2, r = (this.top + this.bottom) / 2;
    let a = n - e, l = n + e, s = r + t, o = r - t;
    if (this.view !== null && this.view.enabled) {
      const c = (this.right - this.left) / this.view.fullWidth / this.zoom, h = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      a += c * this.view.offsetX, l = a + c * this.view.width, s -= h * this.view.offsetY, o = s - h * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(a, l, s, o, this.near, this.far, this.coordinateSystem), this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return t.object.zoom = this.zoom, t.object.left = this.left, t.object.right = this.right, t.object.top = this.top, t.object.bottom = this.bottom, t.object.near = this.near, t.object.far = this.far, this.view !== null && (t.object.view = Object.assign({}, this.view)), t;
  }
}
const En = 4, Cr = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582], an = 20, Wi = /* @__PURE__ */ new ha(), Lr = /* @__PURE__ */ new We();
let Xi = null, qi = 0, Yi = 0;
const rn = (1 + Math.sqrt(5)) / 2, Mn = 1 / rn, Pr = [
  /* @__PURE__ */ new G(1, 1, 1),
  /* @__PURE__ */ new G(-1, 1, 1),
  /* @__PURE__ */ new G(1, 1, -1),
  /* @__PURE__ */ new G(-1, 1, -1),
  /* @__PURE__ */ new G(0, rn, Mn),
  /* @__PURE__ */ new G(0, rn, -Mn),
  /* @__PURE__ */ new G(Mn, 0, rn),
  /* @__PURE__ */ new G(-Mn, 0, rn),
  /* @__PURE__ */ new G(rn, Mn, 0),
  /* @__PURE__ */ new G(-rn, Mn, 0)
];
class Dr {
  constructor(e) {
    this._renderer = e, this._pingPongRenderTarget = null, this._lodMax = 0, this._cubeSize = 0, this._lodPlanes = [], this._sizeLods = [], this._sigmas = [], this._blurMaterial = null, this._cubemapMaterial = null, this._equirectMaterial = null, this._compileMaterial(this._blurMaterial);
  }
  /**
   * Generates a PMREM from a supplied Scene, which can be faster than using an
   * image if networking bandwidth is low. Optional sigma specifies a blur radius
   * in radians to be applied to the scene before PMREM generation. Optional near
   * and far planes ensure the scene is rendered in its entirety (the cubeCamera
   * is placed at the origin).
   */
  fromScene(e, t = 0, n = 0.1, r = 100) {
    Xi = this._renderer.getRenderTarget(), qi = this._renderer.getActiveCubeFace(), Yi = this._renderer.getActiveMipmapLevel(), this._setSize(256);
    const a = this._allocateTargets();
    return a.depthBuffer = !0, this._sceneToCubeUV(e, n, r, a), t > 0 && this._blur(a, 0, 0, t), this._applyPMREM(a), this._cleanup(a), a;
  }
  /**
   * Generates a PMREM from an equirectangular texture, which can be either LDR
   * or HDR. The ideal input image size is 1k (1024 x 512),
   * as this matches best with the 256 x 256 cubemap output.
   */
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Generates a PMREM from an cubemap texture, which can be either LDR
   * or HDR. The ideal input cube size is 256 x 256,
   * as this matches best with the 256 x 256 cubemap output.
   */
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  /**
   * Pre-compiles the cubemap shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileCubemapShader() {
    this._cubemapMaterial === null && (this._cubemapMaterial = Ir(), this._compileMaterial(this._cubemapMaterial));
  }
  /**
   * Pre-compiles the equirectangular shader. You can get faster start-up by invoking this method during
   * your texture's network fetch for increased concurrency.
   */
  compileEquirectangularShader() {
    this._equirectMaterial === null && (this._equirectMaterial = Fr(), this._compileMaterial(this._equirectMaterial));
  }
  /**
   * Disposes of the PMREMGenerator's internal memory. Note that PMREMGenerator is a static class,
   * so you should not need more than one PMREMGenerator object. If you do, calling dispose() on
   * one of them will cause any others to also become unusable.
   */
  dispose() {
    this._dispose(), this._cubemapMaterial !== null && this._cubemapMaterial.dispose(), this._equirectMaterial !== null && this._equirectMaterial.dispose();
  }
  // private interface
  _setSize(e) {
    this._lodMax = Math.floor(Math.log2(e)), this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    this._blurMaterial !== null && this._blurMaterial.dispose(), this._pingPongRenderTarget !== null && this._pingPongRenderTarget.dispose();
    for (let e = 0; e < this._lodPlanes.length; e++)
      this._lodPlanes[e].dispose();
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(Xi, qi, Yi), e.scissorTest = !1, ci(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    e.mapping === 301 || e.mapping === 302 ? this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width) : this._setSize(e.image.width / 4), Xi = this._renderer.getRenderTarget(), qi = this._renderer.getActiveCubeFace(), Yi = this._renderer.getActiveMipmapLevel();
    const n = t || this._allocateTargets();
    return this._textureToCubeUV(e, n), this._applyPMREM(n), this._cleanup(n), n;
  }
  _allocateTargets() {
    const e = 3 * Math.max(this._cubeSize, 112), t = 4 * this._cubeSize, n = {
      magFilter: 1006,
      minFilter: 1006,
      generateMipmaps: !1,
      type: 1016,
      format: 1023,
      colorSpace: zt,
      depthBuffer: !1
    }, r = Ur(e, t, n);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      this._pingPongRenderTarget !== null && this._dispose(), this._pingPongRenderTarget = Ur(e, t, n);
      const { _lodMax: a } = this;
      ({ sizeLods: this._sizeLods, lodPlanes: this._lodPlanes, sigmas: this._sigmas } = Bl(a)), this._blurMaterial = Gl(a, e, t);
    }
    return r;
  }
  _compileMaterial(e) {
    const t = new Pt(this._lodPlanes[0], e);
    this._renderer.compile(t, Wi);
  }
  _sceneToCubeUV(e, t, n, r) {
    const s = new Lt(90, 1, t, n), o = [1, -1, 1, 1, 1, 1], c = [1, 1, 1, -1, -1, -1], h = this._renderer, d = h.autoClear, p = h.toneMapping;
    h.getClearColor(Lr), h.toneMapping = 0, h.autoClear = !1;
    const m = new ia({
      name: "PMREM.Background",
      side: 1,
      depthWrite: !1,
      depthTest: !1
    }), g = new Pt(new Gn(), m);
    let v = !1;
    const f = e.background;
    f ? f.isColor && (m.color.copy(f), e.background = null, v = !0) : (m.color.copy(Lr), v = !0);
    for (let u = 0; u < 6; u++) {
      const y = u % 3;
      y === 0 ? (s.up.set(0, o[u], 0), s.lookAt(c[u], 0, 0)) : y === 1 ? (s.up.set(0, 0, o[u]), s.lookAt(0, c[u], 0)) : (s.up.set(0, o[u], 0), s.lookAt(0, 0, c[u]));
      const S = this._cubeSize;
      ci(r, y * S, u > 2 ? S : 0, S, S), h.setRenderTarget(r), v && h.render(g, s), h.render(e, s);
    }
    g.geometry.dispose(), g.material.dispose(), h.toneMapping = p, h.autoClear = d, e.background = f;
  }
  _textureToCubeUV(e, t) {
    const n = this._renderer, r = e.mapping === 301 || e.mapping === 302;
    r ? (this._cubemapMaterial === null && (this._cubemapMaterial = Ir()), this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === !1 ? -1 : 1) : this._equirectMaterial === null && (this._equirectMaterial = Fr());
    const a = r ? this._cubemapMaterial : this._equirectMaterial, l = new Pt(this._lodPlanes[0], a), s = a.uniforms;
    s.envMap.value = e;
    const o = this._cubeSize;
    ci(t, 0, 0, 3 * o, 2 * o), n.setRenderTarget(t), n.render(l, Wi);
  }
  _applyPMREM(e) {
    const t = this._renderer, n = t.autoClear;
    t.autoClear = !1;
    for (let r = 1; r < this._lodPlanes.length; r++) {
      const a = Math.sqrt(this._sigmas[r] * this._sigmas[r] - this._sigmas[r - 1] * this._sigmas[r - 1]), l = Pr[(r - 1) % Pr.length];
      this._blur(e, r - 1, r, a, l);
    }
    t.autoClear = n;
  }
  /**
   * This is a two-pass Gaussian blur for a cubemap. Normally this is done
   * vertically and horizontally, but this breaks down on a cube. Here we apply
   * the blur latitudinally (around the poles), and then longitudinally (towards
   * the poles) to approximate the orthogonally-separable blur. It is least
   * accurate at the poles, but still does a decent job.
   */
  _blur(e, t, n, r, a) {
    const l = this._pingPongRenderTarget;
    this._halfBlur(
      e,
      l,
      t,
      n,
      r,
      "latitudinal",
      a
    ), this._halfBlur(
      l,
      e,
      n,
      n,
      r,
      "longitudinal",
      a
    );
  }
  _halfBlur(e, t, n, r, a, l, s) {
    const o = this._renderer, c = this._blurMaterial;
    l !== "latitudinal" && l !== "longitudinal" && console.error(
      "blur direction must be either latitudinal or longitudinal!"
    );
    const h = 3, d = new Pt(this._lodPlanes[r], c), p = c.uniforms, m = this._sizeLods[n] - 1, g = isFinite(a) ? Math.PI / (2 * m) : 2 * Math.PI / (2 * an - 1), v = a / g, f = isFinite(a) ? 1 + Math.floor(h * v) : an;
    f > an && console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${f} samples when the maximum is set to ${an}`);
    const u = [];
    let y = 0;
    for (let R = 0; R < an; ++R) {
      const K = R / v, M = Math.exp(-K * K / 2);
      u.push(M), R === 0 ? y += M : R < f && (y += 2 * M);
    }
    for (let R = 0; R < u.length; R++)
      u[R] = u[R] / y;
    p.envMap.value = e.texture, p.samples.value = f, p.weights.value = u, p.latitudinal.value = l === "latitudinal", s && (p.poleAxis.value = s);
    const { _lodMax: S } = this;
    p.dTheta.value = g, p.mipInt.value = S - n;
    const w = this._sizeLods[r], D = 3 * w * (r > S - En ? r - S + En : 0), C = 4 * (this._cubeSize - w);
    ci(t, D, C, 3 * w, 2 * w), o.setRenderTarget(t), o.render(d, Wi);
  }
}
function Bl(i) {
  const e = [], t = [], n = [];
  let r = i;
  const a = i - En + 1 + Cr.length;
  for (let l = 0; l < a; l++) {
    const s = Math.pow(2, r);
    t.push(s);
    let o = 1 / s;
    l > i - En ? o = Cr[l - i + En - 1] : l === 0 && (o = 0), n.push(o);
    const c = 1 / (s - 2), h = -c, d = 1 + c, p = [h, h, d, h, d, d, h, h, d, d, h, d], m = 6, g = 6, v = 3, f = 2, u = 1, y = new Float32Array(v * g * m), S = new Float32Array(f * g * m), w = new Float32Array(u * g * m);
    for (let C = 0; C < m; C++) {
      const R = C % 3 * 2 / 3 - 1, K = C > 2 ? 0 : -1, M = [
        R,
        K,
        0,
        R + 2 / 3,
        K,
        0,
        R + 2 / 3,
        K + 1,
        0,
        R,
        K,
        0,
        R + 2 / 3,
        K + 1,
        0,
        R,
        K + 1,
        0
      ];
      y.set(M, v * g * C), S.set(p, f * g * C);
      const T = [C, C, C, C, C, C];
      w.set(T, u * g * C);
    }
    const D = new Zt();
    D.setAttribute("position", new Dt(y, v)), D.setAttribute("uv", new Dt(S, f)), D.setAttribute("faceIndex", new Dt(w, u)), e.push(D), r > En && r--;
  }
  return { lodPlanes: e, sizeLods: t, sigmas: n };
}
function Ur(i, e, t) {
  const n = new Vt(i, e, t);
  return n.texture.mapping = 306, n.texture.name = "PMREM.cubeUv", n.scissorTest = !0, n;
}
function ci(i, e, t, n, r) {
  i.viewport.set(e, t, n, r), i.scissor.set(e, t, n, r);
}
function Gl(i, e, t) {
  const n = new Float32Array(an), r = new G(0, 1, 0);
  return new Kt({
    name: "SphericalGaussianBlur",
    defines: {
      n: an,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${i}.0`
    },
    uniforms: {
      envMap: { value: null },
      samples: { value: 1 },
      weights: { value: n },
      latitudinal: { value: !1 },
      dTheta: { value: 0 },
      mipInt: { value: 0 },
      poleAxis: { value: r }
    },
    vertexShader: ar(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function Fr() {
  return new Kt({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: { value: null }
    },
    vertexShader: ar(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function Ir() {
  return new Kt({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 }
    },
    vertexShader: ar(),
    fragmentShader: (
      /* glsl */
      `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`
    ),
    blending: 0,
    depthTest: !1,
    depthWrite: !1
  });
}
function ar() {
  return (
    /* glsl */
    `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`
  );
}
function Hl(i) {
  let e = /* @__PURE__ */ new WeakMap(), t = null;
  function n(s) {
    if (s && s.isTexture) {
      const o = s.mapping, c = o === 303 || o === 304, h = o === 301 || o === 302;
      if (c || h)
        if (s.isRenderTargetTexture && s.needsPMREMUpdate === !0) {
          s.needsPMREMUpdate = !1;
          let d = e.get(s);
          return t === null && (t = new Dr(i)), d = c ? t.fromEquirectangular(s, d) : t.fromCubemap(s, d), e.set(s, d), d.texture;
        } else {
          if (e.has(s))
            return e.get(s).texture;
          {
            const d = s.image;
            if (c && d && d.height > 0 || h && d && r(d)) {
              t === null && (t = new Dr(i));
              const p = c ? t.fromEquirectangular(s) : t.fromCubemap(s);
              return e.set(s, p), s.addEventListener("dispose", a), p.texture;
            } else
              return null;
          }
        }
    }
    return s;
  }
  function r(s) {
    let o = 0;
    const c = 6;
    for (let h = 0; h < c; h++)
      s[h] !== void 0 && o++;
    return o === c;
  }
  function a(s) {
    const o = s.target;
    o.removeEventListener("dispose", a);
    const c = e.get(o);
    c !== void 0 && (e.delete(o), c.dispose());
  }
  function l() {
    e = /* @__PURE__ */ new WeakMap(), t !== null && (t.dispose(), t = null);
  }
  return {
    get: n,
    dispose: l
  };
}
function zl(i) {
  const e = {};
  function t(n) {
    if (e[n] !== void 0)
      return e[n];
    let r;
    switch (n) {
      case "WEBGL_depth_texture":
        r = i.getExtension("WEBGL_depth_texture") || i.getExtension("MOZ_WEBGL_depth_texture") || i.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        r = i.getExtension("EXT_texture_filter_anisotropic") || i.getExtension("MOZ_EXT_texture_filter_anisotropic") || i.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        r = i.getExtension("WEBGL_compressed_texture_s3tc") || i.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        r = i.getExtension("WEBGL_compressed_texture_pvrtc") || i.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        r = i.getExtension(n);
    }
    return e[n] = r, r;
  }
  return {
    has: function(n) {
      return t(n) !== null;
    },
    init: function(n) {
      n.isWebGL2 ? (t("EXT_color_buffer_float"), t("WEBGL_clip_cull_distance")) : (t("WEBGL_depth_texture"), t("OES_texture_float"), t("OES_texture_half_float"), t("OES_texture_half_float_linear"), t("OES_standard_derivatives"), t("OES_element_index_uint"), t("OES_vertex_array_object"), t("ANGLE_instanced_arrays")), t("OES_texture_float_linear"), t("EXT_color_buffer_half_float"), t("WEBGL_multisampled_render_to_texture");
    },
    get: function(n) {
      const r = t(n);
      return r === null && console.warn("THREE.WebGLRenderer: " + n + " extension not supported."), r;
    }
  };
}
function Vl(i, e, t, n) {
  const r = {}, a = /* @__PURE__ */ new WeakMap();
  function l(d) {
    const p = d.target;
    p.index !== null && e.remove(p.index);
    for (const g in p.attributes)
      e.remove(p.attributes[g]);
    for (const g in p.morphAttributes) {
      const v = p.morphAttributes[g];
      for (let f = 0, u = v.length; f < u; f++)
        e.remove(v[f]);
    }
    p.removeEventListener("dispose", l), delete r[p.id];
    const m = a.get(p);
    m && (e.remove(m), a.delete(p)), n.releaseStatesOfGeometry(p), p.isInstancedBufferGeometry === !0 && delete p._maxInstanceCount, t.memory.geometries--;
  }
  function s(d, p) {
    return r[p.id] === !0 || (p.addEventListener("dispose", l), r[p.id] = !0, t.memory.geometries++), p;
  }
  function o(d) {
    const p = d.attributes;
    for (const g in p)
      e.update(p[g], i.ARRAY_BUFFER);
    const m = d.morphAttributes;
    for (const g in m) {
      const v = m[g];
      for (let f = 0, u = v.length; f < u; f++)
        e.update(v[f], i.ARRAY_BUFFER);
    }
  }
  function c(d) {
    const p = [], m = d.index, g = d.attributes.position;
    let v = 0;
    if (m !== null) {
      const y = m.array;
      v = m.version;
      for (let S = 0, w = y.length; S < w; S += 3) {
        const D = y[S + 0], C = y[S + 1], R = y[S + 2];
        p.push(D, C, C, R, R, D);
      }
    } else if (g !== void 0) {
      const y = g.array;
      v = g.version;
      for (let S = 0, w = y.length / 3 - 1; S < w; S += 3) {
        const D = S + 0, C = S + 1, R = S + 2;
        p.push(D, C, C, R, R, D);
      }
    } else
      return;
    const f = new ($r(p) ? aa : ra)(p, 1);
    f.version = v;
    const u = a.get(d);
    u && e.remove(u), a.set(d, f);
  }
  function h(d) {
    const p = a.get(d);
    if (p) {
      const m = d.index;
      m !== null && p.version < m.version && c(d);
    } else
      c(d);
    return a.get(d);
  }
  return {
    get: s,
    update: o,
    getWireframeAttribute: h
  };
}
function kl(i, e, t, n) {
  const r = n.isWebGL2;
  let a;
  function l(m) {
    a = m;
  }
  let s, o;
  function c(m) {
    s = m.type, o = m.bytesPerElement;
  }
  function h(m, g) {
    i.drawElements(a, g, s, m * o), t.update(g, a, 1);
  }
  function d(m, g, v) {
    if (v === 0) return;
    let f, u;
    if (r)
      f = i, u = "drawElementsInstanced";
    else if (f = e.get("ANGLE_instanced_arrays"), u = "drawElementsInstancedANGLE", f === null) {
      console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
      return;
    }
    f[u](a, g, s, m * o, v), t.update(g, a, v);
  }
  function p(m, g, v) {
    if (v === 0) return;
    const f = e.get("WEBGL_multi_draw");
    if (f === null)
      for (let u = 0; u < v; u++)
        this.render(m[u] / o, g[u]);
    else {
      f.multiDrawElementsWEBGL(a, g, 0, s, m, 0, v);
      let u = 0;
      for (let y = 0; y < v; y++)
        u += g[y];
      t.update(u, a, 1);
    }
  }
  this.setMode = l, this.setIndex = c, this.render = h, this.renderInstances = d, this.renderMultiDraw = p;
}
function Wl(i) {
  const e = {
    geometries: 0,
    textures: 0
  }, t = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function n(a, l, s) {
    switch (t.calls++, l) {
      case i.TRIANGLES:
        t.triangles += s * (a / 3);
        break;
      case i.LINES:
        t.lines += s * (a / 2);
        break;
      case i.LINE_STRIP:
        t.lines += s * (a - 1);
        break;
      case i.LINE_LOOP:
        t.lines += s * a;
        break;
      case i.POINTS:
        t.points += s * a;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", l);
        break;
    }
  }
  function r() {
    t.calls = 0, t.triangles = 0, t.points = 0, t.lines = 0;
  }
  return {
    memory: e,
    render: t,
    programs: null,
    autoReset: !0,
    reset: r,
    update: n
  };
}
function Xl(i, e) {
  return i[0] - e[0];
}
function ql(i, e) {
  return Math.abs(e[1]) - Math.abs(i[1]);
}
function Yl(i, e, t) {
  const n = {}, r = new Float32Array(8), a = /* @__PURE__ */ new WeakMap(), l = new lt(), s = [];
  for (let c = 0; c < 8; c++)
    s[c] = [c, 0];
  function o(c, h, d) {
    const p = c.morphTargetInfluences;
    if (e.isWebGL2 === !0) {
      const m = h.morphAttributes.position || h.morphAttributes.normal || h.morphAttributes.color, g = m !== void 0 ? m.length : 0;
      let v = a.get(h);
      if (v === void 0 || v.count !== g) {
        let L = function() {
          Y.dispose(), a.delete(h), h.removeEventListener("dispose", L);
        };
        v !== void 0 && v.texture.dispose();
        const y = h.morphAttributes.position !== void 0, S = h.morphAttributes.normal !== void 0, w = h.morphAttributes.color !== void 0, D = h.morphAttributes.position || [], C = h.morphAttributes.normal || [], R = h.morphAttributes.color || [];
        let K = 0;
        y === !0 && (K = 1), S === !0 && (K = 2), w === !0 && (K = 3);
        let M = h.attributes.position.count * K, T = 1;
        M > e.maxTextureSize && (T = Math.ceil(M / e.maxTextureSize), M = e.maxTextureSize);
        const z = new Float32Array(M * T * 4 * g), Y = new ea(z, M, T, g);
        Y.type = 1015, Y.needsUpdate = !0;
        const ie = K * 4;
        for (let I = 0; I < g; I++) {
          const V = D[I], q = C[I], X = R[I], k = M * T * 4 * I;
          for (let j = 0; j < V.count; j++) {
            const A = j * ie;
            y === !0 && (l.fromBufferAttribute(V, j), z[k + A + 0] = l.x, z[k + A + 1] = l.y, z[k + A + 2] = l.z, z[k + A + 3] = 0), S === !0 && (l.fromBufferAttribute(q, j), z[k + A + 4] = l.x, z[k + A + 5] = l.y, z[k + A + 6] = l.z, z[k + A + 7] = 0), w === !0 && (l.fromBufferAttribute(X, j), z[k + A + 8] = l.x, z[k + A + 9] = l.y, z[k + A + 10] = l.z, z[k + A + 11] = X.itemSize === 4 ? l.w : 1);
          }
        }
        v = {
          count: g,
          texture: Y,
          size: new He(M, T)
        }, a.set(h, v), h.addEventListener("dispose", L);
      }
      let f = 0;
      for (let y = 0; y < p.length; y++)
        f += p[y];
      const u = h.morphTargetsRelative ? 1 : 1 - f;
      d.getUniforms().setValue(i, "morphTargetBaseInfluence", u), d.getUniforms().setValue(i, "morphTargetInfluences", p), d.getUniforms().setValue(i, "morphTargetsTexture", v.texture, t), d.getUniforms().setValue(i, "morphTargetsTextureSize", v.size);
    } else {
      const m = p === void 0 ? 0 : p.length;
      let g = n[h.id];
      if (g === void 0 || g.length !== m) {
        g = [];
        for (let S = 0; S < m; S++)
          g[S] = [S, 0];
        n[h.id] = g;
      }
      for (let S = 0; S < m; S++) {
        const w = g[S];
        w[0] = S, w[1] = p[S];
      }
      g.sort(ql);
      for (let S = 0; S < 8; S++)
        S < m && g[S][1] ? (s[S][0] = g[S][0], s[S][1] = g[S][1]) : (s[S][0] = Number.MAX_SAFE_INTEGER, s[S][1] = 0);
      s.sort(Xl);
      const v = h.morphAttributes.position, f = h.morphAttributes.normal;
      let u = 0;
      for (let S = 0; S < 8; S++) {
        const w = s[S], D = w[0], C = w[1];
        D !== Number.MAX_SAFE_INTEGER && C ? (v && h.getAttribute("morphTarget" + S) !== v[D] && h.setAttribute("morphTarget" + S, v[D]), f && h.getAttribute("morphNormal" + S) !== f[D] && h.setAttribute("morphNormal" + S, f[D]), r[S] = C, u += C) : (v && h.hasAttribute("morphTarget" + S) === !0 && h.deleteAttribute("morphTarget" + S), f && h.hasAttribute("morphNormal" + S) === !0 && h.deleteAttribute("morphNormal" + S), r[S] = 0);
      }
      const y = h.morphTargetsRelative ? 1 : 1 - u;
      d.getUniforms().setValue(i, "morphTargetBaseInfluence", y), d.getUniforms().setValue(i, "morphTargetInfluences", r);
    }
  }
  return {
    update: o
  };
}
function Kl(i, e, t, n) {
  let r = /* @__PURE__ */ new WeakMap();
  function a(o) {
    const c = n.render.frame, h = o.geometry, d = e.get(o, h);
    if (r.get(d) !== c && (e.update(d), r.set(d, c)), o.isInstancedMesh && (o.hasEventListener("dispose", s) === !1 && o.addEventListener("dispose", s), r.get(o) !== c && (t.update(o.instanceMatrix, i.ARRAY_BUFFER), o.instanceColor !== null && t.update(o.instanceColor, i.ARRAY_BUFFER), r.set(o, c))), o.isSkinnedMesh) {
      const p = o.skeleton;
      r.get(p) !== c && (p.update(), r.set(p, c));
    }
    return d;
  }
  function l() {
    r = /* @__PURE__ */ new WeakMap();
  }
  function s(o) {
    const c = o.target;
    c.removeEventListener("dispose", s), t.remove(c.instanceMatrix), c.instanceColor !== null && t.remove(c.instanceColor);
  }
  return {
    update: a,
    dispose: l
  };
}
class fa extends vt {
  constructor(e, t, n, r, a, l, s, o, c, h) {
    if (h = h !== void 0 ? h : 1026, h !== 1026 && h !== 1027)
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    n === void 0 && h === 1026 && (n = 1014), n === void 0 && h === 1027 && (n = 1020), super(null, r, a, l, s, o, h, n, c), this.isDepthTexture = !0, this.image = { width: e, height: t }, this.magFilter = s !== void 0 ? s : 1003, this.minFilter = o !== void 0 ? o : 1003, this.flipY = !1, this.generateMipmaps = !1, this.compareFunction = null;
  }
  copy(e) {
    return super.copy(e), this.compareFunction = e.compareFunction, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.compareFunction !== null && (t.compareFunction = this.compareFunction), t;
  }
}
const da = /* @__PURE__ */ new vt(), pa = /* @__PURE__ */ new fa(1, 1);
pa.compareFunction = 515;
const ma = /* @__PURE__ */ new ea(), _a = /* @__PURE__ */ new La(), ga = /* @__PURE__ */ new la(), Nr = [], Or = [], Br = new Float32Array(16), Gr = new Float32Array(9), Hr = new Float32Array(4);
function Rn(i, e, t) {
  const n = i[0];
  if (n <= 0 || n > 0) return i;
  const r = e * t;
  let a = Nr[r];
  if (a === void 0 && (a = new Float32Array(r), Nr[r] = a), e !== 0) {
    n.toArray(a, 0);
    for (let l = 1, s = 0; l !== e; ++l)
      s += t, i[l].toArray(a, s);
  }
  return a;
}
function tt(i, e) {
  if (i.length !== e.length) return !1;
  for (let t = 0, n = i.length; t < n; t++)
    if (i[t] !== e[t]) return !1;
  return !0;
}
function nt(i, e) {
  for (let t = 0, n = e.length; t < n; t++)
    i[t] = e[t];
}
function Si(i, e) {
  let t = Or[e];
  t === void 0 && (t = new Int32Array(e), Or[e] = t);
  for (let n = 0; n !== e; ++n)
    t[n] = i.allocateTextureUnit();
  return t;
}
function Zl(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1f(this.addr, e), t[0] = e);
}
function jl(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2f(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (tt(t, e)) return;
    i.uniform2fv(this.addr, e), nt(t, e);
  }
}
function $l(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3f(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else if (e.r !== void 0)
    (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (i.uniform3f(this.addr, e.r, e.g, e.b), t[0] = e.r, t[1] = e.g, t[2] = e.b);
  else {
    if (tt(t, e)) return;
    i.uniform3fv(this.addr, e), nt(t, e);
  }
}
function Jl(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4f(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (tt(t, e)) return;
    i.uniform4fv(this.addr, e), nt(t, e);
  }
}
function Ql(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (tt(t, e)) return;
    i.uniformMatrix2fv(this.addr, !1, e), nt(t, e);
  } else {
    if (tt(t, n)) return;
    Hr.set(n), i.uniformMatrix2fv(this.addr, !1, Hr), nt(t, n);
  }
}
function ec(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (tt(t, e)) return;
    i.uniformMatrix3fv(this.addr, !1, e), nt(t, e);
  } else {
    if (tt(t, n)) return;
    Gr.set(n), i.uniformMatrix3fv(this.addr, !1, Gr), nt(t, n);
  }
}
function tc(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (tt(t, e)) return;
    i.uniformMatrix4fv(this.addr, !1, e), nt(t, e);
  } else {
    if (tt(t, n)) return;
    Br.set(n), i.uniformMatrix4fv(this.addr, !1, Br), nt(t, n);
  }
}
function nc(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1i(this.addr, e), t[0] = e);
}
function ic(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2i(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (tt(t, e)) return;
    i.uniform2iv(this.addr, e), nt(t, e);
  }
}
function rc(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3i(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (tt(t, e)) return;
    i.uniform3iv(this.addr, e), nt(t, e);
  }
}
function ac(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4i(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (tt(t, e)) return;
    i.uniform4iv(this.addr, e), nt(t, e);
  }
}
function sc(i, e) {
  const t = this.cache;
  t[0] !== e && (i.uniform1ui(this.addr, e), t[0] = e);
}
function oc(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y) && (i.uniform2ui(this.addr, e.x, e.y), t[0] = e.x, t[1] = e.y);
  else {
    if (tt(t, e)) return;
    i.uniform2uiv(this.addr, e), nt(t, e);
  }
}
function lc(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3ui(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (tt(t, e)) return;
    i.uniform3uiv(this.addr, e), nt(t, e);
  }
}
function cc(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4ui(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (tt(t, e)) return;
    i.uniform4uiv(this.addr, e), nt(t, e);
  }
}
function uc(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r);
  const a = this.type === i.SAMPLER_2D_SHADOW ? pa : da;
  t.setTexture2D(e || a, r);
}
function hc(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTexture3D(e || _a, r);
}
function fc(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTextureCube(e || ga, r);
}
function dc(i, e, t) {
  const n = this.cache, r = t.allocateTextureUnit();
  n[0] !== r && (i.uniform1i(this.addr, r), n[0] = r), t.setTexture2DArray(e || ma, r);
}
function pc(i) {
  switch (i) {
    case 5126:
      return Zl;
    case 35664:
      return jl;
    case 35665:
      return $l;
    case 35666:
      return Jl;
    case 35674:
      return Ql;
    case 35675:
      return ec;
    case 35676:
      return tc;
    case 5124:
    case 35670:
      return nc;
    case 35667:
    case 35671:
      return ic;
    case 35668:
    case 35672:
      return rc;
    case 35669:
    case 35673:
      return ac;
    case 5125:
      return sc;
    case 36294:
      return oc;
    case 36295:
      return lc;
    case 36296:
      return cc;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return uc;
    case 35679:
    case 36299:
    case 36307:
      return hc;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return fc;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return dc;
  }
}
function mc(i, e) {
  i.uniform1fv(this.addr, e);
}
function _c(i, e) {
  const t = Rn(e, this.size, 2);
  i.uniform2fv(this.addr, t);
}
function gc(i, e) {
  const t = Rn(e, this.size, 3);
  i.uniform3fv(this.addr, t);
}
function vc(i, e) {
  const t = Rn(e, this.size, 4);
  i.uniform4fv(this.addr, t);
}
function xc(i, e) {
  const t = Rn(e, this.size, 4);
  i.uniformMatrix2fv(this.addr, !1, t);
}
function Sc(i, e) {
  const t = Rn(e, this.size, 9);
  i.uniformMatrix3fv(this.addr, !1, t);
}
function Mc(i, e) {
  const t = Rn(e, this.size, 16);
  i.uniformMatrix4fv(this.addr, !1, t);
}
function Ec(i, e) {
  i.uniform1iv(this.addr, e);
}
function Tc(i, e) {
  i.uniform2iv(this.addr, e);
}
function yc(i, e) {
  i.uniform3iv(this.addr, e);
}
function Ac(i, e) {
  i.uniform4iv(this.addr, e);
}
function bc(i, e) {
  i.uniform1uiv(this.addr, e);
}
function Rc(i, e) {
  i.uniform2uiv(this.addr, e);
}
function wc(i, e) {
  i.uniform3uiv(this.addr, e);
}
function Cc(i, e) {
  i.uniform4uiv(this.addr, e);
}
function Lc(i, e, t) {
  const n = this.cache, r = e.length, a = Si(t, r);
  tt(n, a) || (i.uniform1iv(this.addr, a), nt(n, a));
  for (let l = 0; l !== r; ++l)
    t.setTexture2D(e[l] || da, a[l]);
}
function Pc(i, e, t) {
  const n = this.cache, r = e.length, a = Si(t, r);
  tt(n, a) || (i.uniform1iv(this.addr, a), nt(n, a));
  for (let l = 0; l !== r; ++l)
    t.setTexture3D(e[l] || _a, a[l]);
}
function Dc(i, e, t) {
  const n = this.cache, r = e.length, a = Si(t, r);
  tt(n, a) || (i.uniform1iv(this.addr, a), nt(n, a));
  for (let l = 0; l !== r; ++l)
    t.setTextureCube(e[l] || ga, a[l]);
}
function Uc(i, e, t) {
  const n = this.cache, r = e.length, a = Si(t, r);
  tt(n, a) || (i.uniform1iv(this.addr, a), nt(n, a));
  for (let l = 0; l !== r; ++l)
    t.setTexture2DArray(e[l] || ma, a[l]);
}
function Fc(i) {
  switch (i) {
    case 5126:
      return mc;
    case 35664:
      return _c;
    case 35665:
      return gc;
    case 35666:
      return vc;
    case 35674:
      return xc;
    case 35675:
      return Sc;
    case 35676:
      return Mc;
    case 5124:
    case 35670:
      return Ec;
    case 35667:
    case 35671:
      return Tc;
    case 35668:
    case 35672:
      return yc;
    case 35669:
    case 35673:
      return Ac;
    case 5125:
      return bc;
    case 36294:
      return Rc;
    case 36295:
      return wc;
    case 36296:
      return Cc;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return Lc;
    case 35679:
    case 36299:
    case 36307:
      return Pc;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return Dc;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return Uc;
  }
}
class Ic {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.setValue = pc(t.type);
  }
}
class Nc {
  constructor(e, t, n) {
    this.id = e, this.addr = n, this.cache = [], this.type = t.type, this.size = t.size, this.setValue = Fc(t.type);
  }
}
class Oc {
  constructor(e) {
    this.id = e, this.seq = [], this.map = {};
  }
  setValue(e, t, n) {
    const r = this.seq;
    for (let a = 0, l = r.length; a !== l; ++a) {
      const s = r[a];
      s.setValue(e, t[s.id], n);
    }
  }
}
const Ki = /(\w+)(\])?(\[|\.)?/g;
function zr(i, e) {
  i.seq.push(e), i.map[e.id] = e;
}
function Bc(i, e, t) {
  const n = i.name, r = n.length;
  for (Ki.lastIndex = 0; ; ) {
    const a = Ki.exec(n), l = Ki.lastIndex;
    let s = a[1];
    const o = a[2] === "]", c = a[3];
    if (o && (s = s | 0), c === void 0 || c === "[" && l + 2 === r) {
      zr(t, c === void 0 ? new Ic(s, i, e) : new Nc(s, i, e));
      break;
    } else {
      let d = t.map[s];
      d === void 0 && (d = new Oc(s), zr(t, d)), t = d;
    }
  }
}
class hi {
  constructor(e, t) {
    this.seq = [], this.map = {};
    const n = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let r = 0; r < n; ++r) {
      const a = e.getActiveUniform(t, r), l = e.getUniformLocation(t, a.name);
      Bc(a, l, this);
    }
  }
  setValue(e, t, n, r) {
    const a = this.map[t];
    a !== void 0 && a.setValue(e, n, r);
  }
  setOptional(e, t, n) {
    const r = t[n];
    r !== void 0 && this.setValue(e, n, r);
  }
  static upload(e, t, n, r) {
    for (let a = 0, l = t.length; a !== l; ++a) {
      const s = t[a], o = n[s.id];
      o.needsUpdate !== !1 && s.setValue(e, o.value, r);
    }
  }
  static seqWithValue(e, t) {
    const n = [];
    for (let r = 0, a = e.length; r !== a; ++r) {
      const l = e[r];
      l.id in t && n.push(l);
    }
    return n;
  }
}
function Vr(i, e, t) {
  const n = i.createShader(e);
  return i.shaderSource(n, t), i.compileShader(n), n;
}
const Gc = 37297;
let Hc = 0;
function zc(i, e) {
  const t = i.split(`
`), n = [], r = Math.max(e - 6, 0), a = Math.min(e + 6, t.length);
  for (let l = r; l < a; l++) {
    const s = l + 1;
    n.push(`${s === e ? ">" : " "} ${s}: ${t[l]}`);
  }
  return n.join(`
`);
}
function Vc(i) {
  const e = ke.getPrimaries(ke.workingColorSpace), t = ke.getPrimaries(i);
  let n;
  switch (e === t ? n = "" : e === pi && t === di ? n = "LinearDisplayP3ToLinearSRGB" : e === di && t === pi && (n = "LinearSRGBToLinearDisplayP3"), i) {
    case zt:
    case _i:
      return [n, "LinearTransferOETF"];
    case ot:
    case ir:
      return [n, "sRGBTransferOETF"];
    default:
      return console.warn("THREE.WebGLProgram: Unsupported color space:", i), [n, "LinearTransferOETF"];
  }
}
function kr(i, e, t) {
  const n = i.getShaderParameter(e, i.COMPILE_STATUS), r = i.getShaderInfoLog(e).trim();
  if (n && r === "") return "";
  const a = /ERROR: 0:(\d+)/.exec(r);
  if (a) {
    const l = parseInt(a[1]);
    return t.toUpperCase() + `

` + r + `

` + zc(i.getShaderSource(e), l);
  } else
    return r;
}
function kc(i, e) {
  const t = Vc(e);
  return `vec4 ${i}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`;
}
function Wc(i, e) {
  let t;
  switch (e) {
    case 1:
      t = "Linear";
      break;
    case 2:
      t = "Reinhard";
      break;
    case 3:
      t = "OptimizedCineon";
      break;
    case 4:
      t = "ACESFilmic";
      break;
    case 6:
      t = "AgX";
      break;
    case 5:
      t = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e), t = "Linear";
  }
  return "vec3 " + i + "( vec3 color ) { return " + t + "ToneMapping( color ); }";
}
function Xc(i) {
  return [
    i.extensionDerivatives || i.envMapCubeUVHeight || i.bumpMap || i.normalMapTangentSpace || i.clearcoatNormalMap || i.flatShading || i.shaderID === "physical" ? "#extension GL_OES_standard_derivatives : enable" : "",
    (i.extensionFragDepth || i.logarithmicDepthBuffer) && i.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "",
    i.extensionDrawBuffers && i.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "",
    (i.extensionShaderTextureLOD || i.envMap || i.transmission) && i.rendererExtensionShaderTextureLod ? "#extension GL_EXT_shader_texture_lod : enable" : ""
  ].filter(Tn).join(`
`);
}
function qc(i) {
  return [
    i.extensionClipCullDistance ? "#extension GL_ANGLE_clip_cull_distance : require" : ""
  ].filter(Tn).join(`
`);
}
function Yc(i) {
  const e = [];
  for (const t in i) {
    const n = i[t];
    n !== !1 && e.push("#define " + t + " " + n);
  }
  return e.join(`
`);
}
function Kc(i, e) {
  const t = {}, n = i.getProgramParameter(e, i.ACTIVE_ATTRIBUTES);
  for (let r = 0; r < n; r++) {
    const a = i.getActiveAttrib(e, r), l = a.name;
    let s = 1;
    a.type === i.FLOAT_MAT2 && (s = 2), a.type === i.FLOAT_MAT3 && (s = 3), a.type === i.FLOAT_MAT4 && (s = 4), t[l] = {
      type: a.type,
      location: i.getAttribLocation(e, l),
      locationSize: s
    };
  }
  return t;
}
function Tn(i) {
  return i !== "";
}
function Wr(i, e) {
  const t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return i.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function Xr(i, e) {
  return i.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
const Zc = /^[ \t]*#include +<([\w\d./]+)>/gm;
function tr(i) {
  return i.replace(Zc, $c);
}
const jc = /* @__PURE__ */ new Map([
  ["encodings_fragment", "colorspace_fragment"],
  // @deprecated, r154
  ["encodings_pars_fragment", "colorspace_pars_fragment"],
  // @deprecated, r154
  ["output_fragment", "opaque_fragment"]
  // @deprecated, r154
]);
function $c(i, e) {
  let t = Pe[e];
  if (t === void 0) {
    const n = jc.get(e);
    if (n !== void 0)
      t = Pe[n], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, n);
    else
      throw new Error("Can not resolve #include <" + e + ">");
  }
  return tr(t);
}
const Jc = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function qr(i) {
  return i.replace(Jc, Qc);
}
function Qc(i, e, t, n) {
  let r = "";
  for (let a = parseInt(e); a < parseInt(t); a++)
    r += n.replace(/\[\s*i\s*\]/g, "[ " + a + " ]").replace(/UNROLLED_LOOP_INDEX/g, a);
  return r;
}
function Yr(i) {
  let e = "precision " + i.precision + ` float;
precision ` + i.precision + " int;";
  return i.precision === "highp" ? e += `
#define HIGH_PRECISION` : i.precision === "mediump" ? e += `
#define MEDIUM_PRECISION` : i.precision === "lowp" && (e += `
#define LOW_PRECISION`), e;
}
function eu(i) {
  let e = "SHADOWMAP_TYPE_BASIC";
  return i.shadowMapType === 1 ? e = "SHADOWMAP_TYPE_PCF" : i.shadowMapType === 2 ? e = "SHADOWMAP_TYPE_PCF_SOFT" : i.shadowMapType === 3 && (e = "SHADOWMAP_TYPE_VSM"), e;
}
function tu(i) {
  let e = "ENVMAP_TYPE_CUBE";
  if (i.envMap)
    switch (i.envMapMode) {
      case 301:
      case 302:
        e = "ENVMAP_TYPE_CUBE";
        break;
      case 306:
        e = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  return e;
}
function nu(i) {
  let e = "ENVMAP_MODE_REFLECTION";
  if (i.envMap)
    switch (i.envMapMode) {
      case 302:
        e = "ENVMAP_MODE_REFRACTION";
        break;
    }
  return e;
}
function iu(i) {
  let e = "ENVMAP_BLENDING_NONE";
  if (i.envMap)
    switch (i.combine) {
      case 0:
        e = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case 1:
        e = "ENVMAP_BLENDING_MIX";
        break;
      case 2:
        e = "ENVMAP_BLENDING_ADD";
        break;
    }
  return e;
}
function ru(i) {
  const e = i.envMapCubeUVHeight;
  if (e === null) return null;
  const t = Math.log2(e) - 2, n = 1 / e;
  return { texelWidth: 1 / (3 * Math.max(Math.pow(2, t), 7 * 16)), texelHeight: n, maxMip: t };
}
function au(i, e, t, n) {
  const r = i.getContext(), a = t.defines;
  let l = t.vertexShader, s = t.fragmentShader;
  const o = eu(t), c = tu(t), h = nu(t), d = iu(t), p = ru(t), m = t.isWebGL2 ? "" : Xc(t), g = qc(t), v = Yc(a), f = r.createProgram();
  let u, y, S = t.glslVersion ? "#version " + t.glslVersion + `
` : "";
  t.isRawShaderMaterial ? (u = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    v
  ].filter(Tn).join(`
`), u.length > 0 && (u += `
`), y = [
    m,
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    v
  ].filter(Tn).join(`
`), y.length > 0 && (y += `
`)) : (u = [
    Yr(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    v,
    t.extensionClipCullDistance ? "#define USE_CLIP_DISTANCE" : "",
    t.batching ? "#define USE_BATCHING" : "",
    t.instancing ? "#define USE_INSTANCING" : "",
    t.instancingColor ? "#define USE_INSTANCING_COLOR" : "",
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.map ? "#define USE_MAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + h : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.displacementMap ? "#define USE_DISPLACEMENTMAP" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    //
    t.mapUv ? "#define MAP_UV " + t.mapUv : "",
    t.alphaMapUv ? "#define ALPHAMAP_UV " + t.alphaMapUv : "",
    t.lightMapUv ? "#define LIGHTMAP_UV " + t.lightMapUv : "",
    t.aoMapUv ? "#define AOMAP_UV " + t.aoMapUv : "",
    t.emissiveMapUv ? "#define EMISSIVEMAP_UV " + t.emissiveMapUv : "",
    t.bumpMapUv ? "#define BUMPMAP_UV " + t.bumpMapUv : "",
    t.normalMapUv ? "#define NORMALMAP_UV " + t.normalMapUv : "",
    t.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + t.displacementMapUv : "",
    t.metalnessMapUv ? "#define METALNESSMAP_UV " + t.metalnessMapUv : "",
    t.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + t.roughnessMapUv : "",
    t.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + t.anisotropyMapUv : "",
    t.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + t.clearcoatMapUv : "",
    t.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + t.clearcoatNormalMapUv : "",
    t.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + t.clearcoatRoughnessMapUv : "",
    t.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + t.iridescenceMapUv : "",
    t.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + t.iridescenceThicknessMapUv : "",
    t.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + t.sheenColorMapUv : "",
    t.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + t.sheenRoughnessMapUv : "",
    t.specularMapUv ? "#define SPECULARMAP_UV " + t.specularMapUv : "",
    t.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + t.specularColorMapUv : "",
    t.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + t.specularIntensityMapUv : "",
    t.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + t.transmissionMapUv : "",
    t.thicknessMapUv ? "#define THICKNESSMAP_UV " + t.thicknessMapUv : "",
    //
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.skinning ? "#define USE_SKINNING" : "",
    t.morphTargets ? "#define USE_MORPHTARGETS" : "",
    t.morphNormals && t.flatShading === !1 ? "#define USE_MORPHNORMALS" : "",
    t.morphColors && t.isWebGL2 ? "#define USE_MORPHCOLORS" : "",
    t.morphTargetsCount > 0 && t.isWebGL2 ? "#define MORPHTARGETS_TEXTURE" : "",
    t.morphTargetsCount > 0 && t.isWebGL2 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride : "",
    t.morphTargetsCount > 0 && t.isWebGL2 ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + o : "",
    t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.useLegacyLights ? "#define LEGACY_LIGHTS" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    t.logarithmicDepthBuffer && t.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "",
    "uniform mat4 modelMatrix;",
    "uniform mat4 modelViewMatrix;",
    "uniform mat4 projectionMatrix;",
    "uniform mat4 viewMatrix;",
    "uniform mat3 normalMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    "#ifdef USE_INSTANCING",
    "	attribute mat4 instanceMatrix;",
    "#endif",
    "#ifdef USE_INSTANCING_COLOR",
    "	attribute vec3 instanceColor;",
    "#endif",
    "attribute vec3 position;",
    "attribute vec3 normal;",
    "attribute vec2 uv;",
    "#ifdef USE_UV1",
    "	attribute vec2 uv1;",
    "#endif",
    "#ifdef USE_UV2",
    "	attribute vec2 uv2;",
    "#endif",
    "#ifdef USE_UV3",
    "	attribute vec2 uv3;",
    "#endif",
    "#ifdef USE_TANGENT",
    "	attribute vec4 tangent;",
    "#endif",
    "#if defined( USE_COLOR_ALPHA )",
    "	attribute vec4 color;",
    "#elif defined( USE_COLOR )",
    "	attribute vec3 color;",
    "#endif",
    "#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )",
    "	attribute vec3 morphTarget0;",
    "	attribute vec3 morphTarget1;",
    "	attribute vec3 morphTarget2;",
    "	attribute vec3 morphTarget3;",
    "	#ifdef USE_MORPHNORMALS",
    "		attribute vec3 morphNormal0;",
    "		attribute vec3 morphNormal1;",
    "		attribute vec3 morphNormal2;",
    "		attribute vec3 morphNormal3;",
    "	#else",
    "		attribute vec3 morphTarget4;",
    "		attribute vec3 morphTarget5;",
    "		attribute vec3 morphTarget6;",
    "		attribute vec3 morphTarget7;",
    "	#endif",
    "#endif",
    "#ifdef USE_SKINNING",
    "	attribute vec4 skinIndex;",
    "	attribute vec4 skinWeight;",
    "#endif",
    `
`
  ].filter(Tn).join(`
`), y = [
    m,
    Yr(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    v,
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.map ? "#define USE_MAP" : "",
    t.matcap ? "#define USE_MATCAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + c : "",
    t.envMap ? "#define " + h : "",
    t.envMap ? "#define " + d : "",
    p ? "#define CUBEUV_TEXEL_WIDTH " + p.texelWidth : "",
    p ? "#define CUBEUV_TEXEL_HEIGHT " + p.texelHeight : "",
    p ? "#define CUBEUV_MAX_MIP " + p.maxMip + ".0" : "",
    t.lightMap ? "#define USE_LIGHTMAP" : "",
    t.aoMap ? "#define USE_AOMAP" : "",
    t.bumpMap ? "#define USE_BUMPMAP" : "",
    t.normalMap ? "#define USE_NORMALMAP" : "",
    t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "",
    t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "",
    t.emissiveMap ? "#define USE_EMISSIVEMAP" : "",
    t.anisotropy ? "#define USE_ANISOTROPY" : "",
    t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "",
    t.clearcoat ? "#define USE_CLEARCOAT" : "",
    t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "",
    t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "",
    t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "",
    t.iridescence ? "#define USE_IRIDESCENCE" : "",
    t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "",
    t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "",
    t.specularMap ? "#define USE_SPECULARMAP" : "",
    t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "",
    t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "",
    t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "",
    t.metalnessMap ? "#define USE_METALNESSMAP" : "",
    t.alphaMap ? "#define USE_ALPHAMAP" : "",
    t.alphaTest ? "#define USE_ALPHATEST" : "",
    t.alphaHash ? "#define USE_ALPHAHASH" : "",
    t.sheen ? "#define USE_SHEEN" : "",
    t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "",
    t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "",
    t.transmission ? "#define USE_TRANSMISSION" : "",
    t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "",
    t.thicknessMap ? "#define USE_THICKNESSMAP" : "",
    t.vertexTangents && t.flatShading === !1 ? "#define USE_TANGENT" : "",
    t.vertexColors || t.instancingColor ? "#define USE_COLOR" : "",
    t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "",
    t.vertexUv1s ? "#define USE_UV1" : "",
    t.vertexUv2s ? "#define USE_UV2" : "",
    t.vertexUv3s ? "#define USE_UV3" : "",
    t.pointsUvs ? "#define USE_POINTS_UV" : "",
    t.gradientMap ? "#define USE_GRADIENTMAP" : "",
    t.flatShading ? "#define FLAT_SHADED" : "",
    t.doubleSided ? "#define DOUBLE_SIDED" : "",
    t.flipSided ? "#define FLIP_SIDED" : "",
    t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "",
    t.shadowMapEnabled ? "#define " + o : "",
    t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "",
    t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "",
    t.useLegacyLights ? "#define LEGACY_LIGHTS" : "",
    t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "",
    t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "",
    t.logarithmicDepthBuffer && t.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "",
    "uniform mat4 viewMatrix;",
    "uniform vec3 cameraPosition;",
    "uniform bool isOrthographic;",
    t.toneMapping !== 0 ? "#define TONE_MAPPING" : "",
    t.toneMapping !== 0 ? Pe.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    t.toneMapping !== 0 ? Wc("toneMapping", t.toneMapping) : "",
    t.dithering ? "#define DITHERING" : "",
    t.opaque ? "#define OPAQUE" : "",
    Pe.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    kc("linearToOutputTexel", t.outputColorSpace),
    t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "",
    `
`
  ].filter(Tn).join(`
`)), l = tr(l), l = Wr(l, t), l = Xr(l, t), s = tr(s), s = Wr(s, t), s = Xr(s, t), l = qr(l), s = qr(s), t.isWebGL2 && t.isRawShaderMaterial !== !0 && (S = `#version 300 es
`, u = [
    g,
    "precision mediump sampler2DArray;",
    "#define attribute in",
    "#define varying out",
    "#define texture2D texture"
  ].join(`
`) + `
` + u, y = [
    "precision mediump sampler2DArray;",
    "#define varying in",
    t.glslVersion === Fn ? "" : "layout(location = 0) out highp vec4 pc_fragColor;",
    t.glslVersion === Fn ? "" : "#define gl_FragColor pc_fragColor",
    "#define gl_FragDepthEXT gl_FragDepth",
    "#define texture2D texture",
    "#define textureCube texture",
    "#define texture2DProj textureProj",
    "#define texture2DLodEXT textureLod",
    "#define texture2DProjLodEXT textureProjLod",
    "#define textureCubeLodEXT textureLod",
    "#define texture2DGradEXT textureGrad",
    "#define texture2DProjGradEXT textureProjGrad",
    "#define textureCubeGradEXT textureGrad"
  ].join(`
`) + `
` + y);
  const w = S + u + l, D = S + y + s, C = Vr(r, r.VERTEX_SHADER, w), R = Vr(r, r.FRAGMENT_SHADER, D);
  r.attachShader(f, C), r.attachShader(f, R), t.index0AttributeName !== void 0 ? r.bindAttribLocation(f, 0, t.index0AttributeName) : t.morphTargets === !0 && r.bindAttribLocation(f, 0, "position"), r.linkProgram(f);
  function K(Y) {
    if (i.debug.checkShaderErrors) {
      const ie = r.getProgramInfoLog(f).trim(), L = r.getShaderInfoLog(C).trim(), I = r.getShaderInfoLog(R).trim();
      let V = !0, q = !0;
      if (r.getProgramParameter(f, r.LINK_STATUS) === !1)
        if (V = !1, typeof i.debug.onShaderError == "function")
          i.debug.onShaderError(r, f, C, R);
        else {
          const X = kr(r, C, "vertex"), k = kr(r, R, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(f, r.VALIDATE_STATUS) + `

Program Info Log: ` + ie + `
` + X + `
` + k
          );
        }
      else ie !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", ie) : (L === "" || I === "") && (q = !1);
      q && (Y.diagnostics = {
        runnable: V,
        programLog: ie,
        vertexShader: {
          log: L,
          prefix: u
        },
        fragmentShader: {
          log: I,
          prefix: y
        }
      });
    }
    r.deleteShader(C), r.deleteShader(R), M = new hi(r, f), T = Kc(r, f);
  }
  let M;
  this.getUniforms = function() {
    return M === void 0 && K(this), M;
  };
  let T;
  this.getAttributes = function() {
    return T === void 0 && K(this), T;
  };
  let z = t.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return z === !1 && (z = r.getProgramParameter(f, Gc)), z;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), r.deleteProgram(f), this.program = void 0;
  }, this.type = t.shaderType, this.name = t.shaderName, this.id = Hc++, this.cacheKey = e, this.usedTimes = 1, this.program = f, this.vertexShader = C, this.fragmentShader = R, this;
}
let su = 0;
class ou {
  constructor() {
    this.shaderCache = /* @__PURE__ */ new Map(), this.materialCache = /* @__PURE__ */ new Map();
  }
  update(e) {
    const t = e.vertexShader, n = e.fragmentShader, r = this._getShaderStage(t), a = this._getShaderStage(n), l = this._getShaderCacheForMaterial(e);
    return l.has(r) === !1 && (l.add(r), r.usedTimes++), l.has(a) === !1 && (l.add(a), a.usedTimes++), this;
  }
  remove(e) {
    const t = this.materialCache.get(e);
    for (const n of t)
      n.usedTimes--, n.usedTimes === 0 && this.shaderCache.delete(n.code);
    return this.materialCache.delete(e), this;
  }
  getVertexShaderID(e) {
    return this._getShaderStage(e.vertexShader).id;
  }
  getFragmentShaderID(e) {
    return this._getShaderStage(e.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear(), this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const t = this.materialCache;
    let n = t.get(e);
    return n === void 0 && (n = /* @__PURE__ */ new Set(), t.set(e, n)), n;
  }
  _getShaderStage(e) {
    const t = this.shaderCache;
    let n = t.get(e);
    return n === void 0 && (n = new lu(e), t.set(e, n)), n;
  }
}
class lu {
  constructor(e) {
    this.id = su++, this.code = e, this.usedTimes = 0;
  }
}
function cu(i, e, t, n, r, a, l) {
  const s = new ta(), o = new ou(), c = [], h = r.isWebGL2, d = r.logarithmicDepthBuffer, p = r.vertexTextures;
  let m = r.precision;
  const g = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function v(M) {
    return M === 0 ? "uv" : `uv${M}`;
  }
  function f(M, T, z, Y, ie) {
    const L = Y.fog, I = ie.geometry, V = M.isMeshStandardMaterial ? Y.environment : null, q = (M.isMeshStandardMaterial ? t : e).get(M.envMap || V), X = q && q.mapping === 306 ? q.image.height : null, k = g[M.type];
    M.precision !== null && (m = r.getMaxPrecision(M.precision), m !== M.precision && console.warn("THREE.WebGLProgram.getParameters:", M.precision, "not supported, using", m, "instead."));
    const j = I.morphAttributes.position || I.morphAttributes.normal || I.morphAttributes.color, A = j !== void 0 ? j.length : 0;
    let J = 0;
    I.morphAttributes.position !== void 0 && (J = 1), I.morphAttributes.normal !== void 0 && (J = 2), I.morphAttributes.color !== void 0 && (J = 3);
    let N, W, re, he;
    if (k) {
      const dt = Ft[k];
      N = dt.vertexShader, W = dt.fragmentShader;
    } else
      N = M.vertexShader, W = M.fragmentShader, o.update(M), re = o.getVertexShaderID(M), he = o.getFragmentShaderID(M);
    const fe = i.getRenderTarget(), xe = ie.isInstancedMesh === !0, Ee = ie.isBatchedMesh === !0, Se = !!M.map, Ge = !!M.matcap, U = !!q, it = !!M.aoMap, ge = !!M.lightMap, Re = !!M.bumpMap, de = !!M.normalMap, Ze = !!M.displacementMap, De = !!M.emissiveMap, E = !!M.metalnessMap, _ = !!M.roughnessMap, O = M.anisotropy > 0, Q = M.clearcoat > 0, $ = M.iridescence > 0, ee = M.sheen > 0, pe = M.transmission > 0, oe = O && !!M.anisotropyMap, ce = Q && !!M.clearcoatMap, Te = Q && !!M.clearcoatNormalMap, Ue = Q && !!M.clearcoatRoughnessMap, Z = $ && !!M.iridescenceMap, Ve = $ && !!M.iridescenceThicknessMap, Be = ee && !!M.sheenColorMap, be = ee && !!M.sheenRoughnessMap, _e = !!M.specularMap, ue = !!M.specularColorMap, Le = !!M.specularIntensityMap, ze = pe && !!M.transmissionMap, $e = pe && !!M.thicknessMap, Ie = !!M.gradientMap, te = !!M.alphaMap, b = M.alphaTest > 0, ae = !!M.alphaHash, se = !!M.extensions, ye = !!I.attributes.uv1, ve = !!I.attributes.uv2, Xe = !!I.attributes.uv3;
    let qe = 0;
    return M.toneMapped && (fe === null || fe.isXRRenderTarget === !0) && (qe = i.toneMapping), {
      isWebGL2: h,
      shaderID: k,
      shaderType: M.type,
      shaderName: M.name,
      vertexShader: N,
      fragmentShader: W,
      defines: M.defines,
      customVertexShaderID: re,
      customFragmentShaderID: he,
      isRawShaderMaterial: M.isRawShaderMaterial === !0,
      glslVersion: M.glslVersion,
      precision: m,
      batching: Ee,
      instancing: xe,
      instancingColor: xe && ie.instanceColor !== null,
      supportsVertexTextures: p,
      outputColorSpace: fe === null ? i.outputColorSpace : fe.isXRRenderTarget === !0 ? fe.texture.colorSpace : zt,
      map: Se,
      matcap: Ge,
      envMap: U,
      envMapMode: U && q.mapping,
      envMapCubeUVHeight: X,
      aoMap: it,
      lightMap: ge,
      bumpMap: Re,
      normalMap: de,
      displacementMap: p && Ze,
      emissiveMap: De,
      normalMapObjectSpace: de && M.normalMapType === 1,
      normalMapTangentSpace: de && M.normalMapType === 0,
      metalnessMap: E,
      roughnessMap: _,
      anisotropy: O,
      anisotropyMap: oe,
      clearcoat: Q,
      clearcoatMap: ce,
      clearcoatNormalMap: Te,
      clearcoatRoughnessMap: Ue,
      iridescence: $,
      iridescenceMap: Z,
      iridescenceThicknessMap: Ve,
      sheen: ee,
      sheenColorMap: Be,
      sheenRoughnessMap: be,
      specularMap: _e,
      specularColorMap: ue,
      specularIntensityMap: Le,
      transmission: pe,
      transmissionMap: ze,
      thicknessMap: $e,
      gradientMap: Ie,
      opaque: M.transparent === !1 && M.blending === 1,
      alphaMap: te,
      alphaTest: b,
      alphaHash: ae,
      combine: M.combine,
      //
      mapUv: Se && v(M.map.channel),
      aoMapUv: it && v(M.aoMap.channel),
      lightMapUv: ge && v(M.lightMap.channel),
      bumpMapUv: Re && v(M.bumpMap.channel),
      normalMapUv: de && v(M.normalMap.channel),
      displacementMapUv: Ze && v(M.displacementMap.channel),
      emissiveMapUv: De && v(M.emissiveMap.channel),
      metalnessMapUv: E && v(M.metalnessMap.channel),
      roughnessMapUv: _ && v(M.roughnessMap.channel),
      anisotropyMapUv: oe && v(M.anisotropyMap.channel),
      clearcoatMapUv: ce && v(M.clearcoatMap.channel),
      clearcoatNormalMapUv: Te && v(M.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: Ue && v(M.clearcoatRoughnessMap.channel),
      iridescenceMapUv: Z && v(M.iridescenceMap.channel),
      iridescenceThicknessMapUv: Ve && v(M.iridescenceThicknessMap.channel),
      sheenColorMapUv: Be && v(M.sheenColorMap.channel),
      sheenRoughnessMapUv: be && v(M.sheenRoughnessMap.channel),
      specularMapUv: _e && v(M.specularMap.channel),
      specularColorMapUv: ue && v(M.specularColorMap.channel),
      specularIntensityMapUv: Le && v(M.specularIntensityMap.channel),
      transmissionMapUv: ze && v(M.transmissionMap.channel),
      thicknessMapUv: $e && v(M.thicknessMap.channel),
      alphaMapUv: te && v(M.alphaMap.channel),
      //
      vertexTangents: !!I.attributes.tangent && (de || O),
      vertexColors: M.vertexColors,
      vertexAlphas: M.vertexColors === !0 && !!I.attributes.color && I.attributes.color.itemSize === 4,
      vertexUv1s: ye,
      vertexUv2s: ve,
      vertexUv3s: Xe,
      pointsUvs: ie.isPoints === !0 && !!I.attributes.uv && (Se || te),
      fog: !!L,
      useFog: M.fog === !0,
      fogExp2: L && L.isFogExp2,
      flatShading: M.flatShading === !0,
      sizeAttenuation: M.sizeAttenuation === !0,
      logarithmicDepthBuffer: d,
      skinning: ie.isSkinnedMesh === !0,
      morphTargets: I.morphAttributes.position !== void 0,
      morphNormals: I.morphAttributes.normal !== void 0,
      morphColors: I.morphAttributes.color !== void 0,
      morphTargetsCount: A,
      morphTextureStride: J,
      numDirLights: T.directional.length,
      numPointLights: T.point.length,
      numSpotLights: T.spot.length,
      numSpotLightMaps: T.spotLightMap.length,
      numRectAreaLights: T.rectArea.length,
      numHemiLights: T.hemi.length,
      numDirLightShadows: T.directionalShadowMap.length,
      numPointLightShadows: T.pointShadowMap.length,
      numSpotLightShadows: T.spotShadowMap.length,
      numSpotLightShadowsWithMaps: T.numSpotLightShadowsWithMaps,
      numLightProbes: T.numLightProbes,
      numClippingPlanes: l.numPlanes,
      numClipIntersection: l.numIntersection,
      dithering: M.dithering,
      shadowMapEnabled: i.shadowMap.enabled && z.length > 0,
      shadowMapType: i.shadowMap.type,
      toneMapping: qe,
      useLegacyLights: i._useLegacyLights,
      decodeVideoTexture: Se && M.map.isVideoTexture === !0 && ke.getTransfer(M.map.colorSpace) === Ke,
      premultipliedAlpha: M.premultipliedAlpha,
      doubleSided: M.side === 2,
      flipSided: M.side === 1,
      useDepthPacking: M.depthPacking >= 0,
      depthPacking: M.depthPacking || 0,
      index0AttributeName: M.index0AttributeName,
      extensionDerivatives: se && M.extensions.derivatives === !0,
      extensionFragDepth: se && M.extensions.fragDepth === !0,
      extensionDrawBuffers: se && M.extensions.drawBuffers === !0,
      extensionShaderTextureLOD: se && M.extensions.shaderTextureLOD === !0,
      extensionClipCullDistance: se && M.extensions.clipCullDistance && n.has("WEBGL_clip_cull_distance"),
      rendererExtensionFragDepth: h || n.has("EXT_frag_depth"),
      rendererExtensionDrawBuffers: h || n.has("WEBGL_draw_buffers"),
      rendererExtensionShaderTextureLod: h || n.has("EXT_shader_texture_lod"),
      rendererExtensionParallelShaderCompile: n.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: M.customProgramCacheKey()
    };
  }
  function u(M) {
    const T = [];
    if (M.shaderID ? T.push(M.shaderID) : (T.push(M.customVertexShaderID), T.push(M.customFragmentShaderID)), M.defines !== void 0)
      for (const z in M.defines)
        T.push(z), T.push(M.defines[z]);
    return M.isRawShaderMaterial === !1 && (y(T, M), S(T, M), T.push(i.outputColorSpace)), T.push(M.customProgramCacheKey), T.join();
  }
  function y(M, T) {
    M.push(T.precision), M.push(T.outputColorSpace), M.push(T.envMapMode), M.push(T.envMapCubeUVHeight), M.push(T.mapUv), M.push(T.alphaMapUv), M.push(T.lightMapUv), M.push(T.aoMapUv), M.push(T.bumpMapUv), M.push(T.normalMapUv), M.push(T.displacementMapUv), M.push(T.emissiveMapUv), M.push(T.metalnessMapUv), M.push(T.roughnessMapUv), M.push(T.anisotropyMapUv), M.push(T.clearcoatMapUv), M.push(T.clearcoatNormalMapUv), M.push(T.clearcoatRoughnessMapUv), M.push(T.iridescenceMapUv), M.push(T.iridescenceThicknessMapUv), M.push(T.sheenColorMapUv), M.push(T.sheenRoughnessMapUv), M.push(T.specularMapUv), M.push(T.specularColorMapUv), M.push(T.specularIntensityMapUv), M.push(T.transmissionMapUv), M.push(T.thicknessMapUv), M.push(T.combine), M.push(T.fogExp2), M.push(T.sizeAttenuation), M.push(T.morphTargetsCount), M.push(T.morphAttributeCount), M.push(T.numDirLights), M.push(T.numPointLights), M.push(T.numSpotLights), M.push(T.numSpotLightMaps), M.push(T.numHemiLights), M.push(T.numRectAreaLights), M.push(T.numDirLightShadows), M.push(T.numPointLightShadows), M.push(T.numSpotLightShadows), M.push(T.numSpotLightShadowsWithMaps), M.push(T.numLightProbes), M.push(T.shadowMapType), M.push(T.toneMapping), M.push(T.numClippingPlanes), M.push(T.numClipIntersection), M.push(T.depthPacking);
  }
  function S(M, T) {
    s.disableAll(), T.isWebGL2 && s.enable(0), T.supportsVertexTextures && s.enable(1), T.instancing && s.enable(2), T.instancingColor && s.enable(3), T.matcap && s.enable(4), T.envMap && s.enable(5), T.normalMapObjectSpace && s.enable(6), T.normalMapTangentSpace && s.enable(7), T.clearcoat && s.enable(8), T.iridescence && s.enable(9), T.alphaTest && s.enable(10), T.vertexColors && s.enable(11), T.vertexAlphas && s.enable(12), T.vertexUv1s && s.enable(13), T.vertexUv2s && s.enable(14), T.vertexUv3s && s.enable(15), T.vertexTangents && s.enable(16), T.anisotropy && s.enable(17), T.alphaHash && s.enable(18), T.batching && s.enable(19), M.push(s.mask), s.disableAll(), T.fog && s.enable(0), T.useFog && s.enable(1), T.flatShading && s.enable(2), T.logarithmicDepthBuffer && s.enable(3), T.skinning && s.enable(4), T.morphTargets && s.enable(5), T.morphNormals && s.enable(6), T.morphColors && s.enable(7), T.premultipliedAlpha && s.enable(8), T.shadowMapEnabled && s.enable(9), T.useLegacyLights && s.enable(10), T.doubleSided && s.enable(11), T.flipSided && s.enable(12), T.useDepthPacking && s.enable(13), T.dithering && s.enable(14), T.transmission && s.enable(15), T.sheen && s.enable(16), T.opaque && s.enable(17), T.pointsUvs && s.enable(18), T.decodeVideoTexture && s.enable(19), M.push(s.mask);
  }
  function w(M) {
    const T = g[M.type];
    let z;
    if (T) {
      const Y = Ft[T];
      z = Wa.clone(Y.uniforms);
    } else
      z = M.uniforms;
    return z;
  }
  function D(M, T) {
    let z;
    for (let Y = 0, ie = c.length; Y < ie; Y++) {
      const L = c[Y];
      if (L.cacheKey === T) {
        z = L, ++z.usedTimes;
        break;
      }
    }
    return z === void 0 && (z = new au(i, T, M, a), c.push(z)), z;
  }
  function C(M) {
    if (--M.usedTimes === 0) {
      const T = c.indexOf(M);
      c[T] = c[c.length - 1], c.pop(), M.destroy();
    }
  }
  function R(M) {
    o.remove(M);
  }
  function K() {
    o.dispose();
  }
  return {
    getParameters: f,
    getProgramCacheKey: u,
    getUniforms: w,
    acquireProgram: D,
    releaseProgram: C,
    releaseShaderCache: R,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: c,
    dispose: K
  };
}
function uu() {
  let i = /* @__PURE__ */ new WeakMap();
  function e(a) {
    let l = i.get(a);
    return l === void 0 && (l = {}, i.set(a, l)), l;
  }
  function t(a) {
    i.delete(a);
  }
  function n(a, l, s) {
    i.get(a)[l] = s;
  }
  function r() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    remove: t,
    update: n,
    dispose: r
  };
}
function hu(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.material.id !== e.material.id ? i.material.id - e.material.id : i.z !== e.z ? i.z - e.z : i.id - e.id;
}
function Kr(i, e) {
  return i.groupOrder !== e.groupOrder ? i.groupOrder - e.groupOrder : i.renderOrder !== e.renderOrder ? i.renderOrder - e.renderOrder : i.z !== e.z ? e.z - i.z : i.id - e.id;
}
function Zr() {
  const i = [];
  let e = 0;
  const t = [], n = [], r = [];
  function a() {
    e = 0, t.length = 0, n.length = 0, r.length = 0;
  }
  function l(d, p, m, g, v, f) {
    let u = i[e];
    return u === void 0 ? (u = {
      id: d.id,
      object: d,
      geometry: p,
      material: m,
      groupOrder: g,
      renderOrder: d.renderOrder,
      z: v,
      group: f
    }, i[e] = u) : (u.id = d.id, u.object = d, u.geometry = p, u.material = m, u.groupOrder = g, u.renderOrder = d.renderOrder, u.z = v, u.group = f), e++, u;
  }
  function s(d, p, m, g, v, f) {
    const u = l(d, p, m, g, v, f);
    m.transmission > 0 ? n.push(u) : m.transparent === !0 ? r.push(u) : t.push(u);
  }
  function o(d, p, m, g, v, f) {
    const u = l(d, p, m, g, v, f);
    m.transmission > 0 ? n.unshift(u) : m.transparent === !0 ? r.unshift(u) : t.unshift(u);
  }
  function c(d, p) {
    t.length > 1 && t.sort(d || hu), n.length > 1 && n.sort(p || Kr), r.length > 1 && r.sort(p || Kr);
  }
  function h() {
    for (let d = e, p = i.length; d < p; d++) {
      const m = i[d];
      if (m.id === null) break;
      m.id = null, m.object = null, m.geometry = null, m.material = null, m.group = null;
    }
  }
  return {
    opaque: t,
    transmissive: n,
    transparent: r,
    init: a,
    push: s,
    unshift: o,
    finish: h,
    sort: c
  };
}
function fu() {
  let i = /* @__PURE__ */ new WeakMap();
  function e(n, r) {
    const a = i.get(n);
    let l;
    return a === void 0 ? (l = new Zr(), i.set(n, [l])) : r >= a.length ? (l = new Zr(), a.push(l)) : l = a[r], l;
  }
  function t() {
    i = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: e,
    dispose: t
  };
}
function du() {
  const i = {};
  return {
    get: function(e) {
      if (i[e.id] !== void 0)
        return i[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            direction: new G(),
            color: new We()
          };
          break;
        case "SpotLight":
          t = {
            position: new G(),
            direction: new G(),
            color: new We(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          t = {
            position: new G(),
            color: new We(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          t = {
            direction: new G(),
            skyColor: new We(),
            groundColor: new We()
          };
          break;
        case "RectAreaLight":
          t = {
            color: new We(),
            position: new G(),
            halfWidth: new G(),
            halfHeight: new G()
          };
          break;
      }
      return i[e.id] = t, t;
    }
  };
}
function pu() {
  const i = {};
  return {
    get: function(e) {
      if (i[e.id] !== void 0)
        return i[e.id];
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new He()
          };
          break;
        case "SpotLight":
          t = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new He()
          };
          break;
        case "PointLight":
          t = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new He(),
            shadowCameraNear: 1,
            shadowCameraFar: 1e3
          };
          break;
      }
      return i[e.id] = t, t;
    }
  };
}
let mu = 0;
function _u(i, e) {
  return (e.castShadow ? 2 : 0) - (i.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (i.map ? 1 : 0);
}
function gu(i, e) {
  const t = new du(), n = pu(), r = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let h = 0; h < 9; h++) r.probe.push(new G());
  const a = new G(), l = new ct(), s = new ct();
  function o(h, d) {
    let p = 0, m = 0, g = 0;
    for (let Y = 0; Y < 9; Y++) r.probe[Y].set(0, 0, 0);
    let v = 0, f = 0, u = 0, y = 0, S = 0, w = 0, D = 0, C = 0, R = 0, K = 0, M = 0;
    h.sort(_u);
    const T = d === !0 ? Math.PI : 1;
    for (let Y = 0, ie = h.length; Y < ie; Y++) {
      const L = h[Y], I = L.color, V = L.intensity, q = L.distance, X = L.shadow && L.shadow.map ? L.shadow.map.texture : null;
      if (L.isAmbientLight)
        p += I.r * V * T, m += I.g * V * T, g += I.b * V * T;
      else if (L.isLightProbe) {
        for (let k = 0; k < 9; k++)
          r.probe[k].addScaledVector(L.sh.coefficients[k], V);
        M++;
      } else if (L.isDirectionalLight) {
        const k = t.get(L);
        if (k.color.copy(L.color).multiplyScalar(L.intensity * T), L.castShadow) {
          const j = L.shadow, A = n.get(L);
          A.shadowBias = j.bias, A.shadowNormalBias = j.normalBias, A.shadowRadius = j.radius, A.shadowMapSize = j.mapSize, r.directionalShadow[v] = A, r.directionalShadowMap[v] = X, r.directionalShadowMatrix[v] = L.shadow.matrix, w++;
        }
        r.directional[v] = k, v++;
      } else if (L.isSpotLight) {
        const k = t.get(L);
        k.position.setFromMatrixPosition(L.matrixWorld), k.color.copy(I).multiplyScalar(V * T), k.distance = q, k.coneCos = Math.cos(L.angle), k.penumbraCos = Math.cos(L.angle * (1 - L.penumbra)), k.decay = L.decay, r.spot[u] = k;
        const j = L.shadow;
        if (L.map && (r.spotLightMap[R] = L.map, R++, j.updateMatrices(L), L.castShadow && K++), r.spotLightMatrix[u] = j.matrix, L.castShadow) {
          const A = n.get(L);
          A.shadowBias = j.bias, A.shadowNormalBias = j.normalBias, A.shadowRadius = j.radius, A.shadowMapSize = j.mapSize, r.spotShadow[u] = A, r.spotShadowMap[u] = X, C++;
        }
        u++;
      } else if (L.isRectAreaLight) {
        const k = t.get(L);
        k.color.copy(I).multiplyScalar(V), k.halfWidth.set(L.width * 0.5, 0, 0), k.halfHeight.set(0, L.height * 0.5, 0), r.rectArea[y] = k, y++;
      } else if (L.isPointLight) {
        const k = t.get(L);
        if (k.color.copy(L.color).multiplyScalar(L.intensity * T), k.distance = L.distance, k.decay = L.decay, L.castShadow) {
          const j = L.shadow, A = n.get(L);
          A.shadowBias = j.bias, A.shadowNormalBias = j.normalBias, A.shadowRadius = j.radius, A.shadowMapSize = j.mapSize, A.shadowCameraNear = j.camera.near, A.shadowCameraFar = j.camera.far, r.pointShadow[f] = A, r.pointShadowMap[f] = X, r.pointShadowMatrix[f] = L.shadow.matrix, D++;
        }
        r.point[f] = k, f++;
      } else if (L.isHemisphereLight) {
        const k = t.get(L);
        k.skyColor.copy(L.color).multiplyScalar(V * T), k.groundColor.copy(L.groundColor).multiplyScalar(V * T), r.hemi[S] = k, S++;
      }
    }
    y > 0 && (e.isWebGL2 ? i.has("OES_texture_float_linear") === !0 ? (r.rectAreaLTC1 = ne.LTC_FLOAT_1, r.rectAreaLTC2 = ne.LTC_FLOAT_2) : (r.rectAreaLTC1 = ne.LTC_HALF_1, r.rectAreaLTC2 = ne.LTC_HALF_2) : i.has("OES_texture_float_linear") === !0 ? (r.rectAreaLTC1 = ne.LTC_FLOAT_1, r.rectAreaLTC2 = ne.LTC_FLOAT_2) : i.has("OES_texture_half_float_linear") === !0 ? (r.rectAreaLTC1 = ne.LTC_HALF_1, r.rectAreaLTC2 = ne.LTC_HALF_2) : console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")), r.ambient[0] = p, r.ambient[1] = m, r.ambient[2] = g;
    const z = r.hash;
    (z.directionalLength !== v || z.pointLength !== f || z.spotLength !== u || z.rectAreaLength !== y || z.hemiLength !== S || z.numDirectionalShadows !== w || z.numPointShadows !== D || z.numSpotShadows !== C || z.numSpotMaps !== R || z.numLightProbes !== M) && (r.directional.length = v, r.spot.length = u, r.rectArea.length = y, r.point.length = f, r.hemi.length = S, r.directionalShadow.length = w, r.directionalShadowMap.length = w, r.pointShadow.length = D, r.pointShadowMap.length = D, r.spotShadow.length = C, r.spotShadowMap.length = C, r.directionalShadowMatrix.length = w, r.pointShadowMatrix.length = D, r.spotLightMatrix.length = C + R - K, r.spotLightMap.length = R, r.numSpotLightShadowsWithMaps = K, r.numLightProbes = M, z.directionalLength = v, z.pointLength = f, z.spotLength = u, z.rectAreaLength = y, z.hemiLength = S, z.numDirectionalShadows = w, z.numPointShadows = D, z.numSpotShadows = C, z.numSpotMaps = R, z.numLightProbes = M, r.version = mu++);
  }
  function c(h, d) {
    let p = 0, m = 0, g = 0, v = 0, f = 0;
    const u = d.matrixWorldInverse;
    for (let y = 0, S = h.length; y < S; y++) {
      const w = h[y];
      if (w.isDirectionalLight) {
        const D = r.directional[p];
        D.direction.setFromMatrixPosition(w.matrixWorld), a.setFromMatrixPosition(w.target.matrixWorld), D.direction.sub(a), D.direction.transformDirection(u), p++;
      } else if (w.isSpotLight) {
        const D = r.spot[g];
        D.position.setFromMatrixPosition(w.matrixWorld), D.position.applyMatrix4(u), D.direction.setFromMatrixPosition(w.matrixWorld), a.setFromMatrixPosition(w.target.matrixWorld), D.direction.sub(a), D.direction.transformDirection(u), g++;
      } else if (w.isRectAreaLight) {
        const D = r.rectArea[v];
        D.position.setFromMatrixPosition(w.matrixWorld), D.position.applyMatrix4(u), s.identity(), l.copy(w.matrixWorld), l.premultiply(u), s.extractRotation(l), D.halfWidth.set(w.width * 0.5, 0, 0), D.halfHeight.set(0, w.height * 0.5, 0), D.halfWidth.applyMatrix4(s), D.halfHeight.applyMatrix4(s), v++;
      } else if (w.isPointLight) {
        const D = r.point[m];
        D.position.setFromMatrixPosition(w.matrixWorld), D.position.applyMatrix4(u), m++;
      } else if (w.isHemisphereLight) {
        const D = r.hemi[f];
        D.direction.setFromMatrixPosition(w.matrixWorld), D.direction.transformDirection(u), f++;
      }
    }
  }
  return {
    setup: o,
    setupView: c,
    state: r
  };
}
function jr(i, e) {
  const t = new gu(i, e), n = [], r = [];
  function a() {
    n.length = 0, r.length = 0;
  }
  function l(d) {
    n.push(d);
  }
  function s(d) {
    r.push(d);
  }
  function o(d) {
    t.setup(n, d);
  }
  function c(d) {
    t.setupView(n, d);
  }
  return {
    init: a,
    state: {
      lightsArray: n,
      shadowsArray: r,
      lights: t
    },
    setupLights: o,
    setupLightsView: c,
    pushLight: l,
    pushShadow: s
  };
}
function vu(i, e) {
  let t = /* @__PURE__ */ new WeakMap();
  function n(a, l = 0) {
    const s = t.get(a);
    let o;
    return s === void 0 ? (o = new jr(i, e), t.set(a, [o])) : l >= s.length ? (o = new jr(i, e), s.push(o)) : o = s[l], o;
  }
  function r() {
    t = /* @__PURE__ */ new WeakMap();
  }
  return {
    get: n,
    dispose: r
  };
}
class xu extends xi {
  constructor(e) {
    super(), this.isMeshDepthMaterial = !0, this.type = "MeshDepthMaterial", this.depthPacking = 3200, this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.wireframe = !1, this.wireframeLinewidth = 1, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.depthPacking = e.depthPacking, this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this.wireframe = e.wireframe, this.wireframeLinewidth = e.wireframeLinewidth, this;
  }
}
class Su extends xi {
  constructor(e) {
    super(), this.isMeshDistanceMaterial = !0, this.type = "MeshDistanceMaterial", this.map = null, this.alphaMap = null, this.displacementMap = null, this.displacementScale = 1, this.displacementBias = 0, this.setValues(e);
  }
  copy(e) {
    return super.copy(e), this.map = e.map, this.alphaMap = e.alphaMap, this.displacementMap = e.displacementMap, this.displacementScale = e.displacementScale, this.displacementBias = e.displacementBias, this;
  }
}
const Mu = `void main() {
	gl_Position = vec4( position, 1.0 );
}`, Eu = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function Tu(i, e, t) {
  let n = new ca();
  const r = new He(), a = new He(), l = new lt(), s = new xu({ depthPacking: 3201 }), o = new Su(), c = {}, h = t.maxTextureSize, d = { 0: 1, 1: 0, 2: 2 }, p = new Kt({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: { value: null },
      resolution: { value: new He() },
      radius: { value: 4 }
    },
    vertexShader: Mu,
    fragmentShader: Eu
  }), m = p.clone();
  m.defines.HORIZONTAL_PASS = 1;
  const g = new Zt();
  g.setAttribute(
    "position",
    new Dt(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const v = new Pt(g, p), f = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
  let u = this.type;
  this.render = function(C, R, K) {
    if (f.enabled === !1 || f.autoUpdate === !1 && f.needsUpdate === !1 || C.length === 0) return;
    const M = i.getRenderTarget(), T = i.getActiveCubeFace(), z = i.getActiveMipmapLevel(), Y = i.state;
    Y.setBlending(0), Y.buffers.color.setClear(1, 1, 1, 1), Y.buffers.depth.setTest(!0), Y.setScissorTest(!1);
    const ie = u !== 3 && this.type === 3, L = u === 3 && this.type !== 3;
    for (let I = 0, V = C.length; I < V; I++) {
      const q = C[I], X = q.shadow;
      if (X === void 0) {
        console.warn("THREE.WebGLShadowMap:", q, "has no shadow.");
        continue;
      }
      if (X.autoUpdate === !1 && X.needsUpdate === !1) continue;
      r.copy(X.mapSize);
      const k = X.getFrameExtents();
      if (r.multiply(k), a.copy(X.mapSize), (r.x > h || r.y > h) && (r.x > h && (a.x = Math.floor(h / k.x), r.x = a.x * k.x, X.mapSize.x = a.x), r.y > h && (a.y = Math.floor(h / k.y), r.y = a.y * k.y, X.mapSize.y = a.y)), X.map === null || ie === !0 || L === !0) {
        const A = this.type !== 3 ? { minFilter: 1003, magFilter: 1003 } : {};
        X.map !== null && X.map.dispose(), X.map = new Vt(r.x, r.y, A), X.map.texture.name = q.name + ".shadowMap", X.camera.updateProjectionMatrix();
      }
      i.setRenderTarget(X.map), i.clear();
      const j = X.getViewportCount();
      for (let A = 0; A < j; A++) {
        const J = X.getViewport(A);
        l.set(
          a.x * J.x,
          a.y * J.y,
          a.x * J.z,
          a.y * J.w
        ), Y.viewport(l), X.updateMatrices(q, A), n = X.getFrustum(), w(R, K, X.camera, q, this.type);
      }
      X.isPointLightShadow !== !0 && this.type === 3 && y(X, K), X.needsUpdate = !1;
    }
    u = this.type, f.needsUpdate = !1, i.setRenderTarget(M, T, z);
  };
  function y(C, R) {
    const K = e.update(v);
    p.defines.VSM_SAMPLES !== C.blurSamples && (p.defines.VSM_SAMPLES = C.blurSamples, m.defines.VSM_SAMPLES = C.blurSamples, p.needsUpdate = !0, m.needsUpdate = !0), C.mapPass === null && (C.mapPass = new Vt(r.x, r.y)), p.uniforms.shadow_pass.value = C.map.texture, p.uniforms.resolution.value = C.mapSize, p.uniforms.radius.value = C.radius, i.setRenderTarget(C.mapPass), i.clear(), i.renderBufferDirect(R, null, K, p, v, null), m.uniforms.shadow_pass.value = C.mapPass.texture, m.uniforms.resolution.value = C.mapSize, m.uniforms.radius.value = C.radius, i.setRenderTarget(C.map), i.clear(), i.renderBufferDirect(R, null, K, m, v, null);
  }
  function S(C, R, K, M) {
    let T = null;
    const z = K.isPointLight === !0 ? C.customDistanceMaterial : C.customDepthMaterial;
    if (z !== void 0)
      T = z;
    else if (T = K.isPointLight === !0 ? o : s, i.localClippingEnabled && R.clipShadows === !0 && Array.isArray(R.clippingPlanes) && R.clippingPlanes.length !== 0 || R.displacementMap && R.displacementScale !== 0 || R.alphaMap && R.alphaTest > 0 || R.map && R.alphaTest > 0) {
      const Y = T.uuid, ie = R.uuid;
      let L = c[Y];
      L === void 0 && (L = {}, c[Y] = L);
      let I = L[ie];
      I === void 0 && (I = T.clone(), L[ie] = I, R.addEventListener("dispose", D)), T = I;
    }
    if (T.visible = R.visible, T.wireframe = R.wireframe, M === 3 ? T.side = R.shadowSide !== null ? R.shadowSide : R.side : T.side = R.shadowSide !== null ? R.shadowSide : d[R.side], T.alphaMap = R.alphaMap, T.alphaTest = R.alphaTest, T.map = R.map, T.clipShadows = R.clipShadows, T.clippingPlanes = R.clippingPlanes, T.clipIntersection = R.clipIntersection, T.displacementMap = R.displacementMap, T.displacementScale = R.displacementScale, T.displacementBias = R.displacementBias, T.wireframeLinewidth = R.wireframeLinewidth, T.linewidth = R.linewidth, K.isPointLight === !0 && T.isMeshDistanceMaterial === !0) {
      const Y = i.properties.get(T);
      Y.light = K;
    }
    return T;
  }
  function w(C, R, K, M, T) {
    if (C.visible === !1) return;
    if (C.layers.test(R.layers) && (C.isMesh || C.isLine || C.isPoints) && (C.castShadow || C.receiveShadow && T === 3) && (!C.frustumCulled || n.intersectsObject(C))) {
      C.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse, C.matrixWorld);
      const ie = e.update(C), L = C.material;
      if (Array.isArray(L)) {
        const I = ie.groups;
        for (let V = 0, q = I.length; V < q; V++) {
          const X = I[V], k = L[X.materialIndex];
          if (k && k.visible) {
            const j = S(C, k, M, T);
            C.onBeforeShadow(i, C, R, K, ie, j, X), i.renderBufferDirect(K, null, ie, j, C, X), C.onAfterShadow(i, C, R, K, ie, j, X);
          }
        }
      } else if (L.visible) {
        const I = S(C, L, M, T);
        C.onBeforeShadow(i, C, R, K, ie, I, null), i.renderBufferDirect(K, null, ie, I, C, null), C.onAfterShadow(i, C, R, K, ie, I, null);
      }
    }
    const Y = C.children;
    for (let ie = 0, L = Y.length; ie < L; ie++)
      w(Y[ie], R, K, M, T);
  }
  function D(C) {
    C.target.removeEventListener("dispose", D);
    for (const K in c) {
      const M = c[K], T = C.target.uuid;
      T in M && (M[T].dispose(), delete M[T]);
    }
  }
}
function yu(i, e, t) {
  const n = t.isWebGL2;
  function r() {
    let b = !1;
    const ae = new lt();
    let se = null;
    const ye = new lt(0, 0, 0, 0);
    return {
      setMask: function(ve) {
        se !== ve && !b && (i.colorMask(ve, ve, ve, ve), se = ve);
      },
      setLocked: function(ve) {
        b = ve;
      },
      setClear: function(ve, Xe, qe, rt, dt) {
        dt === !0 && (ve *= rt, Xe *= rt, qe *= rt), ae.set(ve, Xe, qe, rt), ye.equals(ae) === !1 && (i.clearColor(ve, Xe, qe, rt), ye.copy(ae));
      },
      reset: function() {
        b = !1, se = null, ye.set(-1, 0, 0, 0);
      }
    };
  }
  function a() {
    let b = !1, ae = null, se = null, ye = null;
    return {
      setTest: function(ve) {
        ve ? Ee(i.DEPTH_TEST) : Se(i.DEPTH_TEST);
      },
      setMask: function(ve) {
        ae !== ve && !b && (i.depthMask(ve), ae = ve);
      },
      setFunc: function(ve) {
        if (se !== ve) {
          switch (ve) {
            case 0:
              i.depthFunc(i.NEVER);
              break;
            case 1:
              i.depthFunc(i.ALWAYS);
              break;
            case 2:
              i.depthFunc(i.LESS);
              break;
            case 3:
              i.depthFunc(i.LEQUAL);
              break;
            case 4:
              i.depthFunc(i.EQUAL);
              break;
            case 5:
              i.depthFunc(i.GEQUAL);
              break;
            case 6:
              i.depthFunc(i.GREATER);
              break;
            case 7:
              i.depthFunc(i.NOTEQUAL);
              break;
            default:
              i.depthFunc(i.LEQUAL);
          }
          se = ve;
        }
      },
      setLocked: function(ve) {
        b = ve;
      },
      setClear: function(ve) {
        ye !== ve && (i.clearDepth(ve), ye = ve);
      },
      reset: function() {
        b = !1, ae = null, se = null, ye = null;
      }
    };
  }
  function l() {
    let b = !1, ae = null, se = null, ye = null, ve = null, Xe = null, qe = null, rt = null, dt = null;
    return {
      setTest: function(Ye) {
        b || (Ye ? Ee(i.STENCIL_TEST) : Se(i.STENCIL_TEST));
      },
      setMask: function(Ye) {
        ae !== Ye && !b && (i.stencilMask(Ye), ae = Ye);
      },
      setFunc: function(Ye, pt, Ut) {
        (se !== Ye || ye !== pt || ve !== Ut) && (i.stencilFunc(Ye, pt, Ut), se = Ye, ye = pt, ve = Ut);
      },
      setOp: function(Ye, pt, Ut) {
        (Xe !== Ye || qe !== pt || rt !== Ut) && (i.stencilOp(Ye, pt, Ut), Xe = Ye, qe = pt, rt = Ut);
      },
      setLocked: function(Ye) {
        b = Ye;
      },
      setClear: function(Ye) {
        dt !== Ye && (i.clearStencil(Ye), dt = Ye);
      },
      reset: function() {
        b = !1, ae = null, se = null, ye = null, ve = null, Xe = null, qe = null, rt = null, dt = null;
      }
    };
  }
  const s = new r(), o = new a(), c = new l(), h = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap();
  let p = {}, m = {}, g = /* @__PURE__ */ new WeakMap(), v = [], f = null, u = !1, y = null, S = null, w = null, D = null, C = null, R = null, K = null, M = new We(0, 0, 0), T = 0, z = !1, Y = null, ie = null, L = null, I = null, V = null;
  const q = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let X = !1, k = 0;
  const j = i.getParameter(i.VERSION);
  j.indexOf("WebGL") !== -1 ? (k = parseFloat(/^WebGL (\d)/.exec(j)[1]), X = k >= 1) : j.indexOf("OpenGL ES") !== -1 && (k = parseFloat(/^OpenGL ES (\d)/.exec(j)[1]), X = k >= 2);
  let A = null, J = {};
  const N = i.getParameter(i.SCISSOR_BOX), W = i.getParameter(i.VIEWPORT), re = new lt().fromArray(N), he = new lt().fromArray(W);
  function fe(b, ae, se, ye) {
    const ve = new Uint8Array(4), Xe = i.createTexture();
    i.bindTexture(b, Xe), i.texParameteri(b, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(b, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let qe = 0; qe < se; qe++)
      n && (b === i.TEXTURE_3D || b === i.TEXTURE_2D_ARRAY) ? i.texImage3D(ae, 0, i.RGBA, 1, 1, ye, 0, i.RGBA, i.UNSIGNED_BYTE, ve) : i.texImage2D(ae + qe, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, ve);
    return Xe;
  }
  const xe = {};
  xe[i.TEXTURE_2D] = fe(i.TEXTURE_2D, i.TEXTURE_2D, 1), xe[i.TEXTURE_CUBE_MAP] = fe(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), n && (xe[i.TEXTURE_2D_ARRAY] = fe(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), xe[i.TEXTURE_3D] = fe(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1)), s.setClear(0, 0, 0, 1), o.setClear(1), c.setClear(0), Ee(i.DEPTH_TEST), o.setFunc(3), De(!1), E(1), Ee(i.CULL_FACE), de(0);
  function Ee(b) {
    p[b] !== !0 && (i.enable(b), p[b] = !0);
  }
  function Se(b) {
    p[b] !== !1 && (i.disable(b), p[b] = !1);
  }
  function Ge(b, ae) {
    return m[b] !== ae ? (i.bindFramebuffer(b, ae), m[b] = ae, n && (b === i.DRAW_FRAMEBUFFER && (m[i.FRAMEBUFFER] = ae), b === i.FRAMEBUFFER && (m[i.DRAW_FRAMEBUFFER] = ae)), !0) : !1;
  }
  function U(b, ae) {
    let se = v, ye = !1;
    if (b)
      if (se = g.get(ae), se === void 0 && (se = [], g.set(ae, se)), b.isWebGLMultipleRenderTargets) {
        const ve = b.texture;
        if (se.length !== ve.length || se[0] !== i.COLOR_ATTACHMENT0) {
          for (let Xe = 0, qe = ve.length; Xe < qe; Xe++)
            se[Xe] = i.COLOR_ATTACHMENT0 + Xe;
          se.length = ve.length, ye = !0;
        }
      } else
        se[0] !== i.COLOR_ATTACHMENT0 && (se[0] = i.COLOR_ATTACHMENT0, ye = !0);
    else
      se[0] !== i.BACK && (se[0] = i.BACK, ye = !0);
    ye && (t.isWebGL2 ? i.drawBuffers(se) : e.get("WEBGL_draw_buffers").drawBuffersWEBGL(se));
  }
  function it(b) {
    return f !== b ? (i.useProgram(b), f = b, !0) : !1;
  }
  const ge = {
    100: i.FUNC_ADD,
    101: i.FUNC_SUBTRACT,
    102: i.FUNC_REVERSE_SUBTRACT
  };
  if (n)
    ge[103] = i.MIN, ge[104] = i.MAX;
  else {
    const b = e.get("EXT_blend_minmax");
    b !== null && (ge[103] = b.MIN_EXT, ge[104] = b.MAX_EXT);
  }
  const Re = {
    200: i.ZERO,
    201: i.ONE,
    202: i.SRC_COLOR,
    204: i.SRC_ALPHA,
    210: i.SRC_ALPHA_SATURATE,
    208: i.DST_COLOR,
    206: i.DST_ALPHA,
    203: i.ONE_MINUS_SRC_COLOR,
    205: i.ONE_MINUS_SRC_ALPHA,
    209: i.ONE_MINUS_DST_COLOR,
    207: i.ONE_MINUS_DST_ALPHA,
    211: i.CONSTANT_COLOR,
    212: i.ONE_MINUS_CONSTANT_COLOR,
    213: i.CONSTANT_ALPHA,
    214: i.ONE_MINUS_CONSTANT_ALPHA
  };
  function de(b, ae, se, ye, ve, Xe, qe, rt, dt, Ye) {
    if (b === 0) {
      u === !0 && (Se(i.BLEND), u = !1);
      return;
    }
    if (u === !1 && (Ee(i.BLEND), u = !0), b !== 5) {
      if (b !== y || Ye !== z) {
        if ((S !== 100 || C !== 100) && (i.blendEquation(i.FUNC_ADD), S = 100, C = 100), Ye)
          switch (b) {
            case 1:
              i.blendFuncSeparate(i.ONE, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              i.blendFunc(i.ONE, i.ONE);
              break;
            case 3:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case 4:
              i.blendFuncSeparate(i.ZERO, i.SRC_COLOR, i.ZERO, i.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", b);
              break;
          }
        else
          switch (b) {
            case 1:
              i.blendFuncSeparate(i.SRC_ALPHA, i.ONE_MINUS_SRC_ALPHA, i.ONE, i.ONE_MINUS_SRC_ALPHA);
              break;
            case 2:
              i.blendFunc(i.SRC_ALPHA, i.ONE);
              break;
            case 3:
              i.blendFuncSeparate(i.ZERO, i.ONE_MINUS_SRC_COLOR, i.ZERO, i.ONE);
              break;
            case 4:
              i.blendFunc(i.ZERO, i.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", b);
              break;
          }
        w = null, D = null, R = null, K = null, M.set(0, 0, 0), T = 0, y = b, z = Ye;
      }
      return;
    }
    ve = ve || ae, Xe = Xe || se, qe = qe || ye, (ae !== S || ve !== C) && (i.blendEquationSeparate(ge[ae], ge[ve]), S = ae, C = ve), (se !== w || ye !== D || Xe !== R || qe !== K) && (i.blendFuncSeparate(Re[se], Re[ye], Re[Xe], Re[qe]), w = se, D = ye, R = Xe, K = qe), (rt.equals(M) === !1 || dt !== T) && (i.blendColor(rt.r, rt.g, rt.b, dt), M.copy(rt), T = dt), y = b, z = !1;
  }
  function Ze(b, ae) {
    b.side === 2 ? Se(i.CULL_FACE) : Ee(i.CULL_FACE);
    let se = b.side === 1;
    ae && (se = !se), De(se), b.blending === 1 && b.transparent === !1 ? de(0) : de(b.blending, b.blendEquation, b.blendSrc, b.blendDst, b.blendEquationAlpha, b.blendSrcAlpha, b.blendDstAlpha, b.blendColor, b.blendAlpha, b.premultipliedAlpha), o.setFunc(b.depthFunc), o.setTest(b.depthTest), o.setMask(b.depthWrite), s.setMask(b.colorWrite);
    const ye = b.stencilWrite;
    c.setTest(ye), ye && (c.setMask(b.stencilWriteMask), c.setFunc(b.stencilFunc, b.stencilRef, b.stencilFuncMask), c.setOp(b.stencilFail, b.stencilZFail, b.stencilZPass)), O(b.polygonOffset, b.polygonOffsetFactor, b.polygonOffsetUnits), b.alphaToCoverage === !0 ? Ee(i.SAMPLE_ALPHA_TO_COVERAGE) : Se(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function De(b) {
    Y !== b && (b ? i.frontFace(i.CW) : i.frontFace(i.CCW), Y = b);
  }
  function E(b) {
    b !== 0 ? (Ee(i.CULL_FACE), b !== ie && (b === 1 ? i.cullFace(i.BACK) : b === 2 ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : Se(i.CULL_FACE), ie = b;
  }
  function _(b) {
    b !== L && (X && i.lineWidth(b), L = b);
  }
  function O(b, ae, se) {
    b ? (Ee(i.POLYGON_OFFSET_FILL), (I !== ae || V !== se) && (i.polygonOffset(ae, se), I = ae, V = se)) : Se(i.POLYGON_OFFSET_FILL);
  }
  function Q(b) {
    b ? Ee(i.SCISSOR_TEST) : Se(i.SCISSOR_TEST);
  }
  function $(b) {
    b === void 0 && (b = i.TEXTURE0 + q - 1), A !== b && (i.activeTexture(b), A = b);
  }
  function ee(b, ae, se) {
    se === void 0 && (A === null ? se = i.TEXTURE0 + q - 1 : se = A);
    let ye = J[se];
    ye === void 0 && (ye = { type: void 0, texture: void 0 }, J[se] = ye), (ye.type !== b || ye.texture !== ae) && (A !== se && (i.activeTexture(se), A = se), i.bindTexture(b, ae || xe[b]), ye.type = b, ye.texture = ae);
  }
  function pe() {
    const b = J[A];
    b !== void 0 && b.type !== void 0 && (i.bindTexture(b.type, null), b.type = void 0, b.texture = void 0);
  }
  function oe() {
    try {
      i.compressedTexImage2D.apply(i, arguments);
    } catch (b) {
      console.error("THREE.WebGLState:", b);
    }
  }
  function ce() {
    try {
      i.compressedTexImage3D.apply(i, arguments);
    } catch (b) {
      console.error("THREE.WebGLState:", b);
    }
  }
  function Te() {
    try {
      i.texSubImage2D.apply(i, arguments);
    } catch (b) {
      console.error("THREE.WebGLState:", b);
    }
  }
  function Ue() {
    try {
      i.texSubImage3D.apply(i, arguments);
    } catch (b) {
      console.error("THREE.WebGLState:", b);
    }
  }
  function Z() {
    try {
      i.compressedTexSubImage2D.apply(i, arguments);
    } catch (b) {
      console.error("THREE.WebGLState:", b);
    }
  }
  function Ve() {
    try {
      i.compressedTexSubImage3D.apply(i, arguments);
    } catch (b) {
      console.error("THREE.WebGLState:", b);
    }
  }
  function Be() {
    try {
      i.texStorage2D.apply(i, arguments);
    } catch (b) {
      console.error("THREE.WebGLState:", b);
    }
  }
  function be() {
    try {
      i.texStorage3D.apply(i, arguments);
    } catch (b) {
      console.error("THREE.WebGLState:", b);
    }
  }
  function _e() {
    try {
      i.texImage2D.apply(i, arguments);
    } catch (b) {
      console.error("THREE.WebGLState:", b);
    }
  }
  function ue() {
    try {
      i.texImage3D.apply(i, arguments);
    } catch (b) {
      console.error("THREE.WebGLState:", b);
    }
  }
  function Le(b) {
    re.equals(b) === !1 && (i.scissor(b.x, b.y, b.z, b.w), re.copy(b));
  }
  function ze(b) {
    he.equals(b) === !1 && (i.viewport(b.x, b.y, b.z, b.w), he.copy(b));
  }
  function $e(b, ae) {
    let se = d.get(ae);
    se === void 0 && (se = /* @__PURE__ */ new WeakMap(), d.set(ae, se));
    let ye = se.get(b);
    ye === void 0 && (ye = i.getUniformBlockIndex(ae, b.name), se.set(b, ye));
  }
  function Ie(b, ae) {
    const ye = d.get(ae).get(b);
    h.get(ae) !== ye && (i.uniformBlockBinding(ae, ye, b.__bindingPointIndex), h.set(ae, ye));
  }
  function te() {
    i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.depthMask(!0), i.depthFunc(i.LESS), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), n === !0 && (i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null)), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), p = {}, A = null, J = {}, m = {}, g = /* @__PURE__ */ new WeakMap(), v = [], f = null, u = !1, y = null, S = null, w = null, D = null, C = null, R = null, K = null, M = new We(0, 0, 0), T = 0, z = !1, Y = null, ie = null, L = null, I = null, V = null, re.set(0, 0, i.canvas.width, i.canvas.height), he.set(0, 0, i.canvas.width, i.canvas.height), s.reset(), o.reset(), c.reset();
  }
  return {
    buffers: {
      color: s,
      depth: o,
      stencil: c
    },
    enable: Ee,
    disable: Se,
    bindFramebuffer: Ge,
    drawBuffers: U,
    useProgram: it,
    setBlending: de,
    setMaterial: Ze,
    setFlipSided: De,
    setCullFace: E,
    setLineWidth: _,
    setPolygonOffset: O,
    setScissorTest: Q,
    activeTexture: $,
    bindTexture: ee,
    unbindTexture: pe,
    compressedTexImage2D: oe,
    compressedTexImage3D: ce,
    texImage2D: _e,
    texImage3D: ue,
    updateUBOMapping: $e,
    uniformBlockBinding: Ie,
    texStorage2D: Be,
    texStorage3D: be,
    texSubImage2D: Te,
    texSubImage3D: Ue,
    compressedTexSubImage2D: Z,
    compressedTexSubImage3D: Ve,
    scissor: Le,
    viewport: ze,
    reset: te
  };
}
function Au(i, e, t, n, r, a, l) {
  const s = r.isWebGL2, o = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null, c = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), h = /* @__PURE__ */ new WeakMap();
  let d;
  const p = /* @__PURE__ */ new WeakMap();
  let m = !1;
  try {
    m = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function g(E, _) {
    return m ? (
      // eslint-disable-next-line compat/compat
      new OffscreenCanvas(E, _)
    ) : mi("canvas");
  }
  function v(E, _, O, Q) {
    let $ = 1;
    if ((E.width > Q || E.height > Q) && ($ = Q / Math.max(E.width, E.height)), $ < 1 || _ === !0)
      if (typeof HTMLImageElement < "u" && E instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && E instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && E instanceof ImageBitmap) {
        const ee = _ ? er : Math.floor, pe = ee($ * E.width), oe = ee($ * E.height);
        d === void 0 && (d = g(pe, oe));
        const ce = O ? g(pe, oe) : d;
        return ce.width = pe, ce.height = oe, ce.getContext("2d").drawImage(E, 0, 0, pe, oe), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + E.width + "x" + E.height + ") to (" + pe + "x" + oe + ")."), ce;
      } else
        return "data" in E && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + E.width + "x" + E.height + ")."), E;
    return E;
  }
  function f(E) {
    return fr(E.width) && fr(E.height);
  }
  function u(E) {
    return s ? !1 : E.wrapS !== 1001 || E.wrapT !== 1001 || E.minFilter !== 1003 && E.minFilter !== 1006;
  }
  function y(E, _) {
    return E.generateMipmaps && _ && E.minFilter !== 1003 && E.minFilter !== 1006;
  }
  function S(E) {
    i.generateMipmap(E);
  }
  function w(E, _, O, Q, $ = !1) {
    if (s === !1) return _;
    if (E !== null) {
      if (i[E] !== void 0) return i[E];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + E + "'");
    }
    let ee = _;
    if (_ === i.RED && (O === i.FLOAT && (ee = i.R32F), O === i.HALF_FLOAT && (ee = i.R16F), O === i.UNSIGNED_BYTE && (ee = i.R8)), _ === i.RED_INTEGER && (O === i.UNSIGNED_BYTE && (ee = i.R8UI), O === i.UNSIGNED_SHORT && (ee = i.R16UI), O === i.UNSIGNED_INT && (ee = i.R32UI), O === i.BYTE && (ee = i.R8I), O === i.SHORT && (ee = i.R16I), O === i.INT && (ee = i.R32I)), _ === i.RG && (O === i.FLOAT && (ee = i.RG32F), O === i.HALF_FLOAT && (ee = i.RG16F), O === i.UNSIGNED_BYTE && (ee = i.RG8)), _ === i.RGBA) {
      const pe = $ ? fi : ke.getTransfer(Q);
      O === i.FLOAT && (ee = i.RGBA32F), O === i.HALF_FLOAT && (ee = i.RGBA16F), O === i.UNSIGNED_BYTE && (ee = pe === Ke ? i.SRGB8_ALPHA8 : i.RGBA8), O === i.UNSIGNED_SHORT_4_4_4_4 && (ee = i.RGBA4), O === i.UNSIGNED_SHORT_5_5_5_1 && (ee = i.RGB5_A1);
    }
    return (ee === i.R16F || ee === i.R32F || ee === i.RG16F || ee === i.RG32F || ee === i.RGBA16F || ee === i.RGBA32F) && e.get("EXT_color_buffer_float"), ee;
  }
  function D(E, _, O) {
    return y(E, O) === !0 || E.isFramebufferTexture && E.minFilter !== 1003 && E.minFilter !== 1006 ? Math.log2(Math.max(_.width, _.height)) + 1 : E.mipmaps !== void 0 && E.mipmaps.length > 0 ? E.mipmaps.length : E.isCompressedTexture && Array.isArray(E.image) ? _.mipmaps.length : 1;
  }
  function C(E) {
    return E === 1003 || E === 1004 || E === 1005 ? i.NEAREST : i.LINEAR;
  }
  function R(E) {
    const _ = E.target;
    _.removeEventListener("dispose", R), M(_), _.isVideoTexture && h.delete(_);
  }
  function K(E) {
    const _ = E.target;
    _.removeEventListener("dispose", K), z(_);
  }
  function M(E) {
    const _ = n.get(E);
    if (_.__webglInit === void 0) return;
    const O = E.source, Q = p.get(O);
    if (Q) {
      const $ = Q[_.__cacheKey];
      $.usedTimes--, $.usedTimes === 0 && T(E), Object.keys(Q).length === 0 && p.delete(O);
    }
    n.remove(E);
  }
  function T(E) {
    const _ = n.get(E);
    i.deleteTexture(_.__webglTexture);
    const O = E.source, Q = p.get(O);
    delete Q[_.__cacheKey], l.memory.textures--;
  }
  function z(E) {
    const _ = E.texture, O = n.get(E), Q = n.get(_);
    if (Q.__webglTexture !== void 0 && (i.deleteTexture(Q.__webglTexture), l.memory.textures--), E.depthTexture && E.depthTexture.dispose(), E.isWebGLCubeRenderTarget)
      for (let $ = 0; $ < 6; $++) {
        if (Array.isArray(O.__webglFramebuffer[$]))
          for (let ee = 0; ee < O.__webglFramebuffer[$].length; ee++) i.deleteFramebuffer(O.__webglFramebuffer[$][ee]);
        else
          i.deleteFramebuffer(O.__webglFramebuffer[$]);
        O.__webglDepthbuffer && i.deleteRenderbuffer(O.__webglDepthbuffer[$]);
      }
    else {
      if (Array.isArray(O.__webglFramebuffer))
        for (let $ = 0; $ < O.__webglFramebuffer.length; $++) i.deleteFramebuffer(O.__webglFramebuffer[$]);
      else
        i.deleteFramebuffer(O.__webglFramebuffer);
      if (O.__webglDepthbuffer && i.deleteRenderbuffer(O.__webglDepthbuffer), O.__webglMultisampledFramebuffer && i.deleteFramebuffer(O.__webglMultisampledFramebuffer), O.__webglColorRenderbuffer)
        for (let $ = 0; $ < O.__webglColorRenderbuffer.length; $++)
          O.__webglColorRenderbuffer[$] && i.deleteRenderbuffer(O.__webglColorRenderbuffer[$]);
      O.__webglDepthRenderbuffer && i.deleteRenderbuffer(O.__webglDepthRenderbuffer);
    }
    if (E.isWebGLMultipleRenderTargets)
      for (let $ = 0, ee = _.length; $ < ee; $++) {
        const pe = n.get(_[$]);
        pe.__webglTexture && (i.deleteTexture(pe.__webglTexture), l.memory.textures--), n.remove(_[$]);
      }
    n.remove(_), n.remove(E);
  }
  let Y = 0;
  function ie() {
    Y = 0;
  }
  function L() {
    const E = Y;
    return E >= r.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + E + " texture units while this GPU supports only " + r.maxTextures), Y += 1, E;
  }
  function I(E) {
    const _ = [];
    return _.push(E.wrapS), _.push(E.wrapT), _.push(E.wrapR || 0), _.push(E.magFilter), _.push(E.minFilter), _.push(E.anisotropy), _.push(E.internalFormat), _.push(E.format), _.push(E.type), _.push(E.generateMipmaps), _.push(E.premultiplyAlpha), _.push(E.flipY), _.push(E.unpackAlignment), _.push(E.colorSpace), _.join();
  }
  function V(E, _) {
    const O = n.get(E);
    if (E.isVideoTexture && Ze(E), E.isRenderTargetTexture === !1 && E.version > 0 && O.__version !== E.version) {
      const Q = E.image;
      if (Q === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (Q.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        re(O, E, _);
        return;
      }
    }
    t.bindTexture(i.TEXTURE_2D, O.__webglTexture, i.TEXTURE0 + _);
  }
  function q(E, _) {
    const O = n.get(E);
    if (E.version > 0 && O.__version !== E.version) {
      re(O, E, _);
      return;
    }
    t.bindTexture(i.TEXTURE_2D_ARRAY, O.__webglTexture, i.TEXTURE0 + _);
  }
  function X(E, _) {
    const O = n.get(E);
    if (E.version > 0 && O.__version !== E.version) {
      re(O, E, _);
      return;
    }
    t.bindTexture(i.TEXTURE_3D, O.__webglTexture, i.TEXTURE0 + _);
  }
  function k(E, _) {
    const O = n.get(E);
    if (E.version > 0 && O.__version !== E.version) {
      he(O, E, _);
      return;
    }
    t.bindTexture(i.TEXTURE_CUBE_MAP, O.__webglTexture, i.TEXTURE0 + _);
  }
  const j = {
    1e3: i.REPEAT,
    1001: i.CLAMP_TO_EDGE,
    1002: i.MIRRORED_REPEAT
  }, A = {
    1003: i.NEAREST,
    1004: i.NEAREST_MIPMAP_NEAREST,
    1005: i.NEAREST_MIPMAP_LINEAR,
    1006: i.LINEAR,
    1007: i.LINEAR_MIPMAP_NEAREST,
    1008: i.LINEAR_MIPMAP_LINEAR
  }, J = {
    512: i.NEVER,
    519: i.ALWAYS,
    513: i.LESS,
    515: i.LEQUAL,
    514: i.EQUAL,
    518: i.GEQUAL,
    516: i.GREATER,
    517: i.NOTEQUAL
  };
  function N(E, _, O) {
    if (O ? (i.texParameteri(E, i.TEXTURE_WRAP_S, j[_.wrapS]), i.texParameteri(E, i.TEXTURE_WRAP_T, j[_.wrapT]), (E === i.TEXTURE_3D || E === i.TEXTURE_2D_ARRAY) && i.texParameteri(E, i.TEXTURE_WRAP_R, j[_.wrapR]), i.texParameteri(E, i.TEXTURE_MAG_FILTER, A[_.magFilter]), i.texParameteri(E, i.TEXTURE_MIN_FILTER, A[_.minFilter])) : (i.texParameteri(E, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(E, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE), (E === i.TEXTURE_3D || E === i.TEXTURE_2D_ARRAY) && i.texParameteri(E, i.TEXTURE_WRAP_R, i.CLAMP_TO_EDGE), (_.wrapS !== 1001 || _.wrapT !== 1001) && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."), i.texParameteri(E, i.TEXTURE_MAG_FILTER, C(_.magFilter)), i.texParameteri(E, i.TEXTURE_MIN_FILTER, C(_.minFilter)), _.minFilter !== 1003 && _.minFilter !== 1006 && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")), _.compareFunction && (i.texParameteri(E, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(E, i.TEXTURE_COMPARE_FUNC, J[_.compareFunction])), e.has("EXT_texture_filter_anisotropic") === !0) {
      const Q = e.get("EXT_texture_filter_anisotropic");
      if (_.magFilter === 1003 || _.minFilter !== 1005 && _.minFilter !== 1008 || _.type === 1015 && e.has("OES_texture_float_linear") === !1 || s === !1 && _.type === 1016 && e.has("OES_texture_half_float_linear") === !1) return;
      (_.anisotropy > 1 || n.get(_).__currentAnisotropy) && (i.texParameterf(E, Q.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(_.anisotropy, r.getMaxAnisotropy())), n.get(_).__currentAnisotropy = _.anisotropy);
    }
  }
  function W(E, _) {
    let O = !1;
    E.__webglInit === void 0 && (E.__webglInit = !0, _.addEventListener("dispose", R));
    const Q = _.source;
    let $ = p.get(Q);
    $ === void 0 && ($ = {}, p.set(Q, $));
    const ee = I(_);
    if (ee !== E.__cacheKey) {
      $[ee] === void 0 && ($[ee] = {
        texture: i.createTexture(),
        usedTimes: 0
      }, l.memory.textures++, O = !0), $[ee].usedTimes++;
      const pe = $[E.__cacheKey];
      pe !== void 0 && ($[E.__cacheKey].usedTimes--, pe.usedTimes === 0 && T(_)), E.__cacheKey = ee, E.__webglTexture = $[ee].texture;
    }
    return O;
  }
  function re(E, _, O) {
    let Q = i.TEXTURE_2D;
    (_.isDataArrayTexture || _.isCompressedArrayTexture) && (Q = i.TEXTURE_2D_ARRAY), _.isData3DTexture && (Q = i.TEXTURE_3D);
    const $ = W(E, _), ee = _.source;
    t.bindTexture(Q, E.__webglTexture, i.TEXTURE0 + O);
    const pe = n.get(ee);
    if (ee.version !== pe.__version || $ === !0) {
      t.activeTexture(i.TEXTURE0 + O);
      const oe = ke.getPrimaries(ke.workingColorSpace), ce = _.colorSpace === At ? null : ke.getPrimaries(_.colorSpace), Te = _.colorSpace === At || oe === ce ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, _.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, _.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, Te);
      const Ue = u(_) && f(_.image) === !1;
      let Z = v(_.image, Ue, !1, r.maxTextureSize);
      Z = De(_, Z);
      const Ve = f(Z) || s, Be = a.convert(_.format, _.colorSpace);
      let be = a.convert(_.type), _e = w(_.internalFormat, Be, be, _.colorSpace, _.isVideoTexture);
      N(Q, _, Ve);
      let ue;
      const Le = _.mipmaps, ze = s && _.isVideoTexture !== !0 && _e !== 36196, $e = pe.__version === void 0 || $ === !0, Ie = D(_, Z, Ve);
      if (_.isDepthTexture)
        _e = i.DEPTH_COMPONENT, s ? _.type === 1015 ? _e = i.DEPTH_COMPONENT32F : _.type === 1014 ? _e = i.DEPTH_COMPONENT24 : _.type === 1020 ? _e = i.DEPTH24_STENCIL8 : _e = i.DEPTH_COMPONENT16 : _.type === 1015 && console.error("WebGLRenderer: Floating point depth texture requires WebGL2."), _.format === 1026 && _e === i.DEPTH_COMPONENT && _.type !== 1012 && _.type !== 1014 && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), _.type = 1014, be = a.convert(_.type)), _.format === 1027 && _e === i.DEPTH_COMPONENT && (_e = i.DEPTH_STENCIL, _.type !== 1020 && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), _.type = 1020, be = a.convert(_.type))), $e && (ze ? t.texStorage2D(i.TEXTURE_2D, 1, _e, Z.width, Z.height) : t.texImage2D(i.TEXTURE_2D, 0, _e, Z.width, Z.height, 0, Be, be, null));
      else if (_.isDataTexture)
        if (Le.length > 0 && Ve) {
          ze && $e && t.texStorage2D(i.TEXTURE_2D, Ie, _e, Le[0].width, Le[0].height);
          for (let te = 0, b = Le.length; te < b; te++)
            ue = Le[te], ze ? t.texSubImage2D(i.TEXTURE_2D, te, 0, 0, ue.width, ue.height, Be, be, ue.data) : t.texImage2D(i.TEXTURE_2D, te, _e, ue.width, ue.height, 0, Be, be, ue.data);
          _.generateMipmaps = !1;
        } else
          ze ? ($e && t.texStorage2D(i.TEXTURE_2D, Ie, _e, Z.width, Z.height), t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, Z.width, Z.height, Be, be, Z.data)) : t.texImage2D(i.TEXTURE_2D, 0, _e, Z.width, Z.height, 0, Be, be, Z.data);
      else if (_.isCompressedTexture)
        if (_.isCompressedArrayTexture) {
          ze && $e && t.texStorage3D(i.TEXTURE_2D_ARRAY, Ie, _e, Le[0].width, Le[0].height, Z.depth);
          for (let te = 0, b = Le.length; te < b; te++)
            ue = Le[te], _.format !== 1023 ? Be !== null ? ze ? t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, te, 0, 0, 0, ue.width, ue.height, Z.depth, Be, ue.data, 0, 0) : t.compressedTexImage3D(i.TEXTURE_2D_ARRAY, te, _e, ue.width, ue.height, Z.depth, 0, ue.data, 0, 0) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : ze ? t.texSubImage3D(i.TEXTURE_2D_ARRAY, te, 0, 0, 0, ue.width, ue.height, Z.depth, Be, be, ue.data) : t.texImage3D(i.TEXTURE_2D_ARRAY, te, _e, ue.width, ue.height, Z.depth, 0, Be, be, ue.data);
        } else {
          ze && $e && t.texStorage2D(i.TEXTURE_2D, Ie, _e, Le[0].width, Le[0].height);
          for (let te = 0, b = Le.length; te < b; te++)
            ue = Le[te], _.format !== 1023 ? Be !== null ? ze ? t.compressedTexSubImage2D(i.TEXTURE_2D, te, 0, 0, ue.width, ue.height, Be, ue.data) : t.compressedTexImage2D(i.TEXTURE_2D, te, _e, ue.width, ue.height, 0, ue.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : ze ? t.texSubImage2D(i.TEXTURE_2D, te, 0, 0, ue.width, ue.height, Be, be, ue.data) : t.texImage2D(i.TEXTURE_2D, te, _e, ue.width, ue.height, 0, Be, be, ue.data);
        }
      else if (_.isDataArrayTexture)
        ze ? ($e && t.texStorage3D(i.TEXTURE_2D_ARRAY, Ie, _e, Z.width, Z.height, Z.depth), t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, Z.width, Z.height, Z.depth, Be, be, Z.data)) : t.texImage3D(i.TEXTURE_2D_ARRAY, 0, _e, Z.width, Z.height, Z.depth, 0, Be, be, Z.data);
      else if (_.isData3DTexture)
        ze ? ($e && t.texStorage3D(i.TEXTURE_3D, Ie, _e, Z.width, Z.height, Z.depth), t.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, Z.width, Z.height, Z.depth, Be, be, Z.data)) : t.texImage3D(i.TEXTURE_3D, 0, _e, Z.width, Z.height, Z.depth, 0, Be, be, Z.data);
      else if (_.isFramebufferTexture) {
        if ($e)
          if (ze)
            t.texStorage2D(i.TEXTURE_2D, Ie, _e, Z.width, Z.height);
          else {
            let te = Z.width, b = Z.height;
            for (let ae = 0; ae < Ie; ae++)
              t.texImage2D(i.TEXTURE_2D, ae, _e, te, b, 0, Be, be, null), te >>= 1, b >>= 1;
          }
      } else if (Le.length > 0 && Ve) {
        ze && $e && t.texStorage2D(i.TEXTURE_2D, Ie, _e, Le[0].width, Le[0].height);
        for (let te = 0, b = Le.length; te < b; te++)
          ue = Le[te], ze ? t.texSubImage2D(i.TEXTURE_2D, te, 0, 0, Be, be, ue) : t.texImage2D(i.TEXTURE_2D, te, _e, Be, be, ue);
        _.generateMipmaps = !1;
      } else
        ze ? ($e && t.texStorage2D(i.TEXTURE_2D, Ie, _e, Z.width, Z.height), t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, Be, be, Z)) : t.texImage2D(i.TEXTURE_2D, 0, _e, Be, be, Z);
      y(_, Ve) && S(Q), pe.__version = ee.version, _.onUpdate && _.onUpdate(_);
    }
    E.__version = _.version;
  }
  function he(E, _, O) {
    if (_.image.length !== 6) return;
    const Q = W(E, _), $ = _.source;
    t.bindTexture(i.TEXTURE_CUBE_MAP, E.__webglTexture, i.TEXTURE0 + O);
    const ee = n.get($);
    if ($.version !== ee.__version || Q === !0) {
      t.activeTexture(i.TEXTURE0 + O);
      const pe = ke.getPrimaries(ke.workingColorSpace), oe = _.colorSpace === At ? null : ke.getPrimaries(_.colorSpace), ce = _.colorSpace === At || pe === oe ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, _.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, _.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, _.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, ce);
      const Te = _.isCompressedTexture || _.image[0].isCompressedTexture, Ue = _.image[0] && _.image[0].isDataTexture, Z = [];
      for (let te = 0; te < 6; te++)
        !Te && !Ue ? Z[te] = v(_.image[te], !1, !0, r.maxCubemapSize) : Z[te] = Ue ? _.image[te].image : _.image[te], Z[te] = De(_, Z[te]);
      const Ve = Z[0], Be = f(Ve) || s, be = a.convert(_.format, _.colorSpace), _e = a.convert(_.type), ue = w(_.internalFormat, be, _e, _.colorSpace), Le = s && _.isVideoTexture !== !0, ze = ee.__version === void 0 || Q === !0;
      let $e = D(_, Ve, Be);
      N(i.TEXTURE_CUBE_MAP, _, Be);
      let Ie;
      if (Te) {
        Le && ze && t.texStorage2D(i.TEXTURE_CUBE_MAP, $e, ue, Ve.width, Ve.height);
        for (let te = 0; te < 6; te++) {
          Ie = Z[te].mipmaps;
          for (let b = 0; b < Ie.length; b++) {
            const ae = Ie[b];
            _.format !== 1023 ? be !== null ? Le ? t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + te, b, 0, 0, ae.width, ae.height, be, ae.data) : t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + te, b, ue, ae.width, ae.height, 0, ae.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : Le ? t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + te, b, 0, 0, ae.width, ae.height, be, _e, ae.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + te, b, ue, ae.width, ae.height, 0, be, _e, ae.data);
          }
        }
      } else {
        Ie = _.mipmaps, Le && ze && (Ie.length > 0 && $e++, t.texStorage2D(i.TEXTURE_CUBE_MAP, $e, ue, Z[0].width, Z[0].height));
        for (let te = 0; te < 6; te++)
          if (Ue) {
            Le ? t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + te, 0, 0, 0, Z[te].width, Z[te].height, be, _e, Z[te].data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + te, 0, ue, Z[te].width, Z[te].height, 0, be, _e, Z[te].data);
            for (let b = 0; b < Ie.length; b++) {
              const se = Ie[b].image[te].image;
              Le ? t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + te, b + 1, 0, 0, se.width, se.height, be, _e, se.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + te, b + 1, ue, se.width, se.height, 0, be, _e, se.data);
            }
          } else {
            Le ? t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + te, 0, 0, 0, be, _e, Z[te]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + te, 0, ue, be, _e, Z[te]);
            for (let b = 0; b < Ie.length; b++) {
              const ae = Ie[b];
              Le ? t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + te, b + 1, 0, 0, be, _e, ae.image[te]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + te, b + 1, ue, be, _e, ae.image[te]);
            }
          }
      }
      y(_, Be) && S(i.TEXTURE_CUBE_MAP), ee.__version = $.version, _.onUpdate && _.onUpdate(_);
    }
    E.__version = _.version;
  }
  function fe(E, _, O, Q, $, ee) {
    const pe = a.convert(O.format, O.colorSpace), oe = a.convert(O.type), ce = w(O.internalFormat, pe, oe, O.colorSpace);
    if (!n.get(_).__hasExternalTextures) {
      const Ue = Math.max(1, _.width >> ee), Z = Math.max(1, _.height >> ee);
      $ === i.TEXTURE_3D || $ === i.TEXTURE_2D_ARRAY ? t.texImage3D($, ee, ce, Ue, Z, _.depth, 0, pe, oe, null) : t.texImage2D($, ee, ce, Ue, Z, 0, pe, oe, null);
    }
    t.bindFramebuffer(i.FRAMEBUFFER, E), de(_) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, Q, $, n.get(O).__webglTexture, 0, Re(_)) : ($ === i.TEXTURE_2D || $ >= i.TEXTURE_CUBE_MAP_POSITIVE_X && $ <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, Q, $, n.get(O).__webglTexture, ee), t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function xe(E, _, O) {
    if (i.bindRenderbuffer(i.RENDERBUFFER, E), _.depthBuffer && !_.stencilBuffer) {
      let Q = s === !0 ? i.DEPTH_COMPONENT24 : i.DEPTH_COMPONENT16;
      if (O || de(_)) {
        const $ = _.depthTexture;
        $ && $.isDepthTexture && ($.type === 1015 ? Q = i.DEPTH_COMPONENT32F : $.type === 1014 && (Q = i.DEPTH_COMPONENT24));
        const ee = Re(_);
        de(_) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, ee, Q, _.width, _.height) : i.renderbufferStorageMultisample(i.RENDERBUFFER, ee, Q, _.width, _.height);
      } else
        i.renderbufferStorage(i.RENDERBUFFER, Q, _.width, _.height);
      i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.RENDERBUFFER, E);
    } else if (_.depthBuffer && _.stencilBuffer) {
      const Q = Re(_);
      O && de(_) === !1 ? i.renderbufferStorageMultisample(i.RENDERBUFFER, Q, i.DEPTH24_STENCIL8, _.width, _.height) : de(_) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, Q, i.DEPTH24_STENCIL8, _.width, _.height) : i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_STENCIL, _.width, _.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.RENDERBUFFER, E);
    } else {
      const Q = _.isWebGLMultipleRenderTargets === !0 ? _.texture : [_.texture];
      for (let $ = 0; $ < Q.length; $++) {
        const ee = Q[$], pe = a.convert(ee.format, ee.colorSpace), oe = a.convert(ee.type), ce = w(ee.internalFormat, pe, oe, ee.colorSpace), Te = Re(_);
        O && de(_) === !1 ? i.renderbufferStorageMultisample(i.RENDERBUFFER, Te, ce, _.width, _.height) : de(_) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, Te, ce, _.width, _.height) : i.renderbufferStorage(i.RENDERBUFFER, ce, _.width, _.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function Ee(E, _) {
    if (_ && _.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (t.bindFramebuffer(i.FRAMEBUFFER, E), !(_.depthTexture && _.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    (!n.get(_.depthTexture).__webglTexture || _.depthTexture.image.width !== _.width || _.depthTexture.image.height !== _.height) && (_.depthTexture.image.width = _.width, _.depthTexture.image.height = _.height, _.depthTexture.needsUpdate = !0), V(_.depthTexture, 0);
    const Q = n.get(_.depthTexture).__webglTexture, $ = Re(_);
    if (_.depthTexture.format === 1026)
      de(_) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, Q, 0, $) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, Q, 0);
    else if (_.depthTexture.format === 1027)
      de(_) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, Q, 0, $) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, Q, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function Se(E) {
    const _ = n.get(E), O = E.isWebGLCubeRenderTarget === !0;
    if (E.depthTexture && !_.__autoAllocateDepthBuffer) {
      if (O) throw new Error("target.depthTexture not supported in Cube render targets");
      Ee(_.__webglFramebuffer, E);
    } else if (O) {
      _.__webglDepthbuffer = [];
      for (let Q = 0; Q < 6; Q++)
        t.bindFramebuffer(i.FRAMEBUFFER, _.__webglFramebuffer[Q]), _.__webglDepthbuffer[Q] = i.createRenderbuffer(), xe(_.__webglDepthbuffer[Q], E, !1);
    } else
      t.bindFramebuffer(i.FRAMEBUFFER, _.__webglFramebuffer), _.__webglDepthbuffer = i.createRenderbuffer(), xe(_.__webglDepthbuffer, E, !1);
    t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function Ge(E, _, O) {
    const Q = n.get(E);
    _ !== void 0 && fe(Q.__webglFramebuffer, E, E.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), O !== void 0 && Se(E);
  }
  function U(E) {
    const _ = E.texture, O = n.get(E), Q = n.get(_);
    E.addEventListener("dispose", K), E.isWebGLMultipleRenderTargets !== !0 && (Q.__webglTexture === void 0 && (Q.__webglTexture = i.createTexture()), Q.__version = _.version, l.memory.textures++);
    const $ = E.isWebGLCubeRenderTarget === !0, ee = E.isWebGLMultipleRenderTargets === !0, pe = f(E) || s;
    if ($) {
      O.__webglFramebuffer = [];
      for (let oe = 0; oe < 6; oe++)
        if (s && _.mipmaps && _.mipmaps.length > 0) {
          O.__webglFramebuffer[oe] = [];
          for (let ce = 0; ce < _.mipmaps.length; ce++)
            O.__webglFramebuffer[oe][ce] = i.createFramebuffer();
        } else
          O.__webglFramebuffer[oe] = i.createFramebuffer();
    } else {
      if (s && _.mipmaps && _.mipmaps.length > 0) {
        O.__webglFramebuffer = [];
        for (let oe = 0; oe < _.mipmaps.length; oe++)
          O.__webglFramebuffer[oe] = i.createFramebuffer();
      } else
        O.__webglFramebuffer = i.createFramebuffer();
      if (ee)
        if (r.drawBuffers) {
          const oe = E.texture;
          for (let ce = 0, Te = oe.length; ce < Te; ce++) {
            const Ue = n.get(oe[ce]);
            Ue.__webglTexture === void 0 && (Ue.__webglTexture = i.createTexture(), l.memory.textures++);
          }
        } else
          console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");
      if (s && E.samples > 0 && de(E) === !1) {
        const oe = ee ? _ : [_];
        O.__webglMultisampledFramebuffer = i.createFramebuffer(), O.__webglColorRenderbuffer = [], t.bindFramebuffer(i.FRAMEBUFFER, O.__webglMultisampledFramebuffer);
        for (let ce = 0; ce < oe.length; ce++) {
          const Te = oe[ce];
          O.__webglColorRenderbuffer[ce] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, O.__webglColorRenderbuffer[ce]);
          const Ue = a.convert(Te.format, Te.colorSpace), Z = a.convert(Te.type), Ve = w(Te.internalFormat, Ue, Z, Te.colorSpace, E.isXRRenderTarget === !0), Be = Re(E);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, Be, Ve, E.width, E.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + ce, i.RENDERBUFFER, O.__webglColorRenderbuffer[ce]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null), E.depthBuffer && (O.__webglDepthRenderbuffer = i.createRenderbuffer(), xe(O.__webglDepthRenderbuffer, E, !0)), t.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if ($) {
      t.bindTexture(i.TEXTURE_CUBE_MAP, Q.__webglTexture), N(i.TEXTURE_CUBE_MAP, _, pe);
      for (let oe = 0; oe < 6; oe++)
        if (s && _.mipmaps && _.mipmaps.length > 0)
          for (let ce = 0; ce < _.mipmaps.length; ce++)
            fe(O.__webglFramebuffer[oe][ce], E, _, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + oe, ce);
        else
          fe(O.__webglFramebuffer[oe], E, _, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + oe, 0);
      y(_, pe) && S(i.TEXTURE_CUBE_MAP), t.unbindTexture();
    } else if (ee) {
      const oe = E.texture;
      for (let ce = 0, Te = oe.length; ce < Te; ce++) {
        const Ue = oe[ce], Z = n.get(Ue);
        t.bindTexture(i.TEXTURE_2D, Z.__webglTexture), N(i.TEXTURE_2D, Ue, pe), fe(O.__webglFramebuffer, E, Ue, i.COLOR_ATTACHMENT0 + ce, i.TEXTURE_2D, 0), y(Ue, pe) && S(i.TEXTURE_2D);
      }
      t.unbindTexture();
    } else {
      let oe = i.TEXTURE_2D;
      if ((E.isWebGL3DRenderTarget || E.isWebGLArrayRenderTarget) && (s ? oe = E.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY : console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")), t.bindTexture(oe, Q.__webglTexture), N(oe, _, pe), s && _.mipmaps && _.mipmaps.length > 0)
        for (let ce = 0; ce < _.mipmaps.length; ce++)
          fe(O.__webglFramebuffer[ce], E, _, i.COLOR_ATTACHMENT0, oe, ce);
      else
        fe(O.__webglFramebuffer, E, _, i.COLOR_ATTACHMENT0, oe, 0);
      y(_, pe) && S(oe), t.unbindTexture();
    }
    E.depthBuffer && Se(E);
  }
  function it(E) {
    const _ = f(E) || s, O = E.isWebGLMultipleRenderTargets === !0 ? E.texture : [E.texture];
    for (let Q = 0, $ = O.length; Q < $; Q++) {
      const ee = O[Q];
      if (y(ee, _)) {
        const pe = E.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : i.TEXTURE_2D, oe = n.get(ee).__webglTexture;
        t.bindTexture(pe, oe), S(pe), t.unbindTexture();
      }
    }
  }
  function ge(E) {
    if (s && E.samples > 0 && de(E) === !1) {
      const _ = E.isWebGLMultipleRenderTargets ? E.texture : [E.texture], O = E.width, Q = E.height;
      let $ = i.COLOR_BUFFER_BIT;
      const ee = [], pe = E.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, oe = n.get(E), ce = E.isWebGLMultipleRenderTargets === !0;
      if (ce)
        for (let Te = 0; Te < _.length; Te++)
          t.bindFramebuffer(i.FRAMEBUFFER, oe.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Te, i.RENDERBUFFER, null), t.bindFramebuffer(i.FRAMEBUFFER, oe.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Te, i.TEXTURE_2D, null, 0);
      t.bindFramebuffer(i.READ_FRAMEBUFFER, oe.__webglMultisampledFramebuffer), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, oe.__webglFramebuffer);
      for (let Te = 0; Te < _.length; Te++) {
        ee.push(i.COLOR_ATTACHMENT0 + Te), E.depthBuffer && ee.push(pe);
        const Ue = oe.__ignoreDepthValues !== void 0 ? oe.__ignoreDepthValues : !1;
        if (Ue === !1 && (E.depthBuffer && ($ |= i.DEPTH_BUFFER_BIT), E.stencilBuffer && ($ |= i.STENCIL_BUFFER_BIT)), ce && i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, oe.__webglColorRenderbuffer[Te]), Ue === !0 && (i.invalidateFramebuffer(i.READ_FRAMEBUFFER, [pe]), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [pe])), ce) {
          const Z = n.get(_[Te]).__webglTexture;
          i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, Z, 0);
        }
        i.blitFramebuffer(0, 0, O, Q, 0, 0, O, Q, $, i.NEAREST), c && i.invalidateFramebuffer(i.READ_FRAMEBUFFER, ee);
      }
      if (t.bindFramebuffer(i.READ_FRAMEBUFFER, null), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), ce)
        for (let Te = 0; Te < _.length; Te++) {
          t.bindFramebuffer(i.FRAMEBUFFER, oe.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Te, i.RENDERBUFFER, oe.__webglColorRenderbuffer[Te]);
          const Ue = n.get(_[Te]).__webglTexture;
          t.bindFramebuffer(i.FRAMEBUFFER, oe.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Te, i.TEXTURE_2D, Ue, 0);
        }
      t.bindFramebuffer(i.DRAW_FRAMEBUFFER, oe.__webglMultisampledFramebuffer);
    }
  }
  function Re(E) {
    return Math.min(r.maxSamples, E.samples);
  }
  function de(E) {
    const _ = n.get(E);
    return s && E.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && _.__useRenderToTexture !== !1;
  }
  function Ze(E) {
    const _ = l.render.frame;
    h.get(E) !== _ && (h.set(E, _), E.update());
  }
  function De(E, _) {
    const O = E.colorSpace, Q = E.format, $ = E.type;
    return E.isCompressedTexture === !0 || E.isVideoTexture === !0 || E.format === 1035 || O !== zt && O !== At && (ke.getTransfer(O) === Ke ? s === !1 ? e.has("EXT_sRGB") === !0 && Q === 1023 ? (E.format = 1035, E.minFilter = 1006, E.generateMipmaps = !1) : _ = Jr.sRGBToLinear(_) : (Q !== 1023 || $ !== 1009) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", O)), _;
  }
  this.allocateTextureUnit = L, this.resetTextureUnits = ie, this.setTexture2D = V, this.setTexture2DArray = q, this.setTexture3D = X, this.setTextureCube = k, this.rebindTextures = Ge, this.setupRenderTarget = U, this.updateRenderTargetMipmap = it, this.updateMultisampleRenderTarget = ge, this.setupDepthRenderbuffer = Se, this.setupFrameBufferTexture = fe, this.useMultisampledRTT = de;
}
function bu(i, e, t) {
  const n = t.isWebGL2;
  function r(a, l = At) {
    let s;
    const o = ke.getTransfer(l);
    if (a === 1009) return i.UNSIGNED_BYTE;
    if (a === 1017) return i.UNSIGNED_SHORT_4_4_4_4;
    if (a === 1018) return i.UNSIGNED_SHORT_5_5_5_1;
    if (a === 1010) return i.BYTE;
    if (a === 1011) return i.SHORT;
    if (a === 1012) return i.UNSIGNED_SHORT;
    if (a === 1013) return i.INT;
    if (a === 1014) return i.UNSIGNED_INT;
    if (a === 1015) return i.FLOAT;
    if (a === 1016)
      return n ? i.HALF_FLOAT : (s = e.get("OES_texture_half_float"), s !== null ? s.HALF_FLOAT_OES : null);
    if (a === 1021) return i.ALPHA;
    if (a === 1023) return i.RGBA;
    if (a === 1024) return i.LUMINANCE;
    if (a === 1025) return i.LUMINANCE_ALPHA;
    if (a === 1026) return i.DEPTH_COMPONENT;
    if (a === 1027) return i.DEPTH_STENCIL;
    if (a === 1035)
      return s = e.get("EXT_sRGB"), s !== null ? s.SRGB_ALPHA_EXT : null;
    if (a === 1028) return i.RED;
    if (a === 1029) return i.RED_INTEGER;
    if (a === 1030) return i.RG;
    if (a === 1031) return i.RG_INTEGER;
    if (a === 1033) return i.RGBA_INTEGER;
    if (a === 33776 || a === 33777 || a === 33778 || a === 33779)
      if (o === Ke)
        if (s = e.get("WEBGL_compressed_texture_s3tc_srgb"), s !== null) {
          if (a === 33776) return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          if (a === 33777) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          if (a === 33778) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          if (a === 33779) return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
        } else
          return null;
      else if (s = e.get("WEBGL_compressed_texture_s3tc"), s !== null) {
        if (a === 33776) return s.COMPRESSED_RGB_S3TC_DXT1_EXT;
        if (a === 33777) return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;
        if (a === 33778) return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;
        if (a === 33779) return s.COMPRESSED_RGBA_S3TC_DXT5_EXT;
      } else
        return null;
    if (a === 35840 || a === 35841 || a === 35842 || a === 35843)
      if (s = e.get("WEBGL_compressed_texture_pvrtc"), s !== null) {
        if (a === 35840) return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        if (a === 35841) return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        if (a === 35842) return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        if (a === 35843) return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
      } else
        return null;
    if (a === 36196)
      return s = e.get("WEBGL_compressed_texture_etc1"), s !== null ? s.COMPRESSED_RGB_ETC1_WEBGL : null;
    if (a === 37492 || a === 37496)
      if (s = e.get("WEBGL_compressed_texture_etc"), s !== null) {
        if (a === 37492) return o === Ke ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
        if (a === 37496) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (a === 37808 || a === 37809 || a === 37810 || a === 37811 || a === 37812 || a === 37813 || a === 37814 || a === 37815 || a === 37816 || a === 37817 || a === 37818 || a === 37819 || a === 37820 || a === 37821)
      if (s = e.get("WEBGL_compressed_texture_astc"), s !== null) {
        if (a === 37808) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (a === 37809) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (a === 37810) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (a === 37811) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (a === 37812) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (a === 37813) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (a === 37814) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (a === 37815) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (a === 37816) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (a === 37817) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (a === 37818) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (a === 37819) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (a === 37820) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (a === 37821) return o === Ke ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (a === 36492 || a === 36494 || a === 36495)
      if (s = e.get("EXT_texture_compression_bptc"), s !== null) {
        if (a === 36492) return o === Ke ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
        if (a === 36494) return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        if (a === 36495) return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
      } else
        return null;
    if (a === 36283 || a === 36284 || a === 36285 || a === 36286)
      if (s = e.get("EXT_texture_compression_rgtc"), s !== null) {
        if (a === 36492) return s.COMPRESSED_RED_RGTC1_EXT;
        if (a === 36284) return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        if (a === 36285) return s.COMPRESSED_RED_GREEN_RGTC2_EXT;
        if (a === 36286) return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
      } else
        return null;
    return a === 1020 ? n ? i.UNSIGNED_INT_24_8 : (s = e.get("WEBGL_depth_texture"), s !== null ? s.UNSIGNED_INT_24_8_WEBGL : null) : i[a] !== void 0 ? i[a] : null;
  }
  return { convert: r };
}
class Ru extends Lt {
  constructor(e = []) {
    super(), this.isArrayCamera = !0, this.cameras = e;
  }
}
class ui extends Et {
  constructor() {
    super(), this.isGroup = !0, this.type = "Group";
  }
}
const wu = { type: "move" };
class Zi {
  constructor() {
    this._targetRay = null, this._grip = null, this._hand = null;
  }
  getHandSpace() {
    return this._hand === null && (this._hand = new ui(), this._hand.matrixAutoUpdate = !1, this._hand.visible = !1, this._hand.joints = {}, this._hand.inputState = { pinching: !1 }), this._hand;
  }
  getTargetRaySpace() {
    return this._targetRay === null && (this._targetRay = new ui(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new G(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new G()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new ui(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new G(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new G()), this._grip;
  }
  dispatchEvent(e) {
    return this._targetRay !== null && this._targetRay.dispatchEvent(e), this._grip !== null && this._grip.dispatchEvent(e), this._hand !== null && this._hand.dispatchEvent(e), this;
  }
  connect(e) {
    if (e && e.hand) {
      const t = this._hand;
      if (t)
        for (const n of e.hand.values())
          this._getHandJoint(t, n);
    }
    return this.dispatchEvent({ type: "connected", data: e }), this;
  }
  disconnect(e) {
    return this.dispatchEvent({ type: "disconnected", data: e }), this._targetRay !== null && (this._targetRay.visible = !1), this._grip !== null && (this._grip.visible = !1), this._hand !== null && (this._hand.visible = !1), this;
  }
  update(e, t, n) {
    let r = null, a = null, l = null;
    const s = this._targetRay, o = this._grip, c = this._hand;
    if (e && t.session.visibilityState !== "visible-blurred") {
      if (c && e.hand) {
        l = !0;
        for (const v of e.hand.values()) {
          const f = t.getJointPose(v, n), u = this._getHandJoint(c, v);
          f !== null && (u.matrix.fromArray(f.transform.matrix), u.matrix.decompose(u.position, u.rotation, u.scale), u.matrixWorldNeedsUpdate = !0, u.jointRadius = f.radius), u.visible = f !== null;
        }
        const h = c.joints["index-finger-tip"], d = c.joints["thumb-tip"], p = h.position.distanceTo(d.position), m = 0.02, g = 5e-3;
        c.inputState.pinching && p > m + g ? (c.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !c.inputState.pinching && p <= m - g && (c.inputState.pinching = !0, this.dispatchEvent({
          type: "pinchstart",
          handedness: e.handedness,
          target: this
        }));
      } else
        o !== null && e.gripSpace && (a = t.getPose(e.gripSpace, n), a !== null && (o.matrix.fromArray(a.transform.matrix), o.matrix.decompose(o.position, o.rotation, o.scale), o.matrixWorldNeedsUpdate = !0, a.linearVelocity ? (o.hasLinearVelocity = !0, o.linearVelocity.copy(a.linearVelocity)) : o.hasLinearVelocity = !1, a.angularVelocity ? (o.hasAngularVelocity = !0, o.angularVelocity.copy(a.angularVelocity)) : o.hasAngularVelocity = !1));
      s !== null && (r = t.getPose(e.targetRaySpace, n), r === null && a !== null && (r = a), r !== null && (s.matrix.fromArray(r.transform.matrix), s.matrix.decompose(s.position, s.rotation, s.scale), s.matrixWorldNeedsUpdate = !0, r.linearVelocity ? (s.hasLinearVelocity = !0, s.linearVelocity.copy(r.linearVelocity)) : s.hasLinearVelocity = !1, r.angularVelocity ? (s.hasAngularVelocity = !0, s.angularVelocity.copy(r.angularVelocity)) : s.hasAngularVelocity = !1, this.dispatchEvent(wu)));
    }
    return s !== null && (s.visible = r !== null), o !== null && (o.visible = a !== null), c !== null && (c.visible = l !== null), this;
  }
  // private method
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === void 0) {
      const n = new ui();
      n.matrixAutoUpdate = !1, n.visible = !1, e.joints[t.jointName] = n, e.add(n);
    }
    return e.joints[t.jointName];
  }
}
class Cu extends bn {
  constructor(e, t) {
    super();
    const n = this;
    let r = null, a = 1, l = null, s = "local-floor", o = 1, c = null, h = null, d = null, p = null, m = null, g = null;
    const v = t.getContextAttributes();
    let f = null, u = null;
    const y = [], S = [], w = new He();
    let D = null;
    const C = new Lt();
    C.layers.enable(1), C.viewport = new lt();
    const R = new Lt();
    R.layers.enable(2), R.viewport = new lt();
    const K = [C, R], M = new Ru();
    M.layers.enable(1), M.layers.enable(2);
    let T = null, z = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(N) {
      let W = y[N];
      return W === void 0 && (W = new Zi(), y[N] = W), W.getTargetRaySpace();
    }, this.getControllerGrip = function(N) {
      let W = y[N];
      return W === void 0 && (W = new Zi(), y[N] = W), W.getGripSpace();
    }, this.getHand = function(N) {
      let W = y[N];
      return W === void 0 && (W = new Zi(), y[N] = W), W.getHandSpace();
    };
    function Y(N) {
      const W = S.indexOf(N.inputSource);
      if (W === -1)
        return;
      const re = y[W];
      re !== void 0 && (re.update(N.inputSource, N.frame, c || l), re.dispatchEvent({ type: N.type, data: N.inputSource }));
    }
    function ie() {
      r.removeEventListener("select", Y), r.removeEventListener("selectstart", Y), r.removeEventListener("selectend", Y), r.removeEventListener("squeeze", Y), r.removeEventListener("squeezestart", Y), r.removeEventListener("squeezeend", Y), r.removeEventListener("end", ie), r.removeEventListener("inputsourceschange", L);
      for (let N = 0; N < y.length; N++) {
        const W = S[N];
        W !== null && (S[N] = null, y[N].disconnect(W));
      }
      T = null, z = null, e.setRenderTarget(f), m = null, p = null, d = null, r = null, u = null, J.stop(), n.isPresenting = !1, e.setPixelRatio(D), e.setSize(w.width, w.height, !1), n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(N) {
      a = N, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(N) {
      s = N, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return c || l;
    }, this.setReferenceSpace = function(N) {
      c = N;
    }, this.getBaseLayer = function() {
      return p !== null ? p : m;
    }, this.getBinding = function() {
      return d;
    }, this.getFrame = function() {
      return g;
    }, this.getSession = function() {
      return r;
    }, this.setSession = async function(N) {
      if (r = N, r !== null) {
        if (f = e.getRenderTarget(), r.addEventListener("select", Y), r.addEventListener("selectstart", Y), r.addEventListener("selectend", Y), r.addEventListener("squeeze", Y), r.addEventListener("squeezestart", Y), r.addEventListener("squeezeend", Y), r.addEventListener("end", ie), r.addEventListener("inputsourceschange", L), v.xrCompatible !== !0 && await t.makeXRCompatible(), D = e.getPixelRatio(), e.getSize(w), r.renderState.layers === void 0 || e.capabilities.isWebGL2 === !1) {
          const W = {
            antialias: r.renderState.layers === void 0 ? v.antialias : !0,
            alpha: !0,
            depth: v.depth,
            stencil: v.stencil,
            framebufferScaleFactor: a
          };
          m = new XRWebGLLayer(r, t, W), r.updateRenderState({ baseLayer: m }), e.setPixelRatio(1), e.setSize(m.framebufferWidth, m.framebufferHeight, !1), u = new Vt(
            m.framebufferWidth,
            m.framebufferHeight,
            {
              format: 1023,
              type: 1009,
              colorSpace: e.outputColorSpace,
              stencilBuffer: v.stencil
            }
          );
        } else {
          let W = null, re = null, he = null;
          v.depth && (he = v.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, W = v.stencil ? 1027 : 1026, re = v.stencil ? 1020 : 1014);
          const fe = {
            colorFormat: t.RGBA8,
            depthFormat: he,
            scaleFactor: a
          };
          d = new XRWebGLBinding(r, t), p = d.createProjectionLayer(fe), r.updateRenderState({ layers: [p] }), e.setPixelRatio(1), e.setSize(p.textureWidth, p.textureHeight, !1), u = new Vt(
            p.textureWidth,
            p.textureHeight,
            {
              format: 1023,
              type: 1009,
              depthTexture: new fa(p.textureWidth, p.textureHeight, re, void 0, void 0, void 0, void 0, void 0, void 0, W),
              stencilBuffer: v.stencil,
              colorSpace: e.outputColorSpace,
              samples: v.antialias ? 4 : 0
            }
          );
          const xe = e.properties.get(u);
          xe.__ignoreDepthValues = p.ignoreDepthValues;
        }
        u.isXRRenderTarget = !0, this.setFoveation(o), c = null, l = await r.requestReferenceSpace(s), J.setContext(r), J.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (r !== null)
        return r.environmentBlendMode;
    };
    function L(N) {
      for (let W = 0; W < N.removed.length; W++) {
        const re = N.removed[W], he = S.indexOf(re);
        he >= 0 && (S[he] = null, y[he].disconnect(re));
      }
      for (let W = 0; W < N.added.length; W++) {
        const re = N.added[W];
        let he = S.indexOf(re);
        if (he === -1) {
          for (let xe = 0; xe < y.length; xe++)
            if (xe >= S.length) {
              S.push(re), he = xe;
              break;
            } else if (S[xe] === null) {
              S[xe] = re, he = xe;
              break;
            }
          if (he === -1) break;
        }
        const fe = y[he];
        fe && fe.connect(re);
      }
    }
    const I = new G(), V = new G();
    function q(N, W, re) {
      I.setFromMatrixPosition(W.matrixWorld), V.setFromMatrixPosition(re.matrixWorld);
      const he = I.distanceTo(V), fe = W.projectionMatrix.elements, xe = re.projectionMatrix.elements, Ee = fe[14] / (fe[10] - 1), Se = fe[14] / (fe[10] + 1), Ge = (fe[9] + 1) / fe[5], U = (fe[9] - 1) / fe[5], it = (fe[8] - 1) / fe[0], ge = (xe[8] + 1) / xe[0], Re = Ee * it, de = Ee * ge, Ze = he / (-it + ge), De = Ze * -it;
      W.matrixWorld.decompose(N.position, N.quaternion, N.scale), N.translateX(De), N.translateZ(Ze), N.matrixWorld.compose(N.position, N.quaternion, N.scale), N.matrixWorldInverse.copy(N.matrixWorld).invert();
      const E = Ee + Ze, _ = Se + Ze, O = Re - De, Q = de + (he - De), $ = Ge * Se / _ * E, ee = U * Se / _ * E;
      N.projectionMatrix.makePerspective(O, Q, $, ee, E, _), N.projectionMatrixInverse.copy(N.projectionMatrix).invert();
    }
    function X(N, W) {
      W === null ? N.matrixWorld.copy(N.matrix) : N.matrixWorld.multiplyMatrices(W.matrixWorld, N.matrix), N.matrixWorldInverse.copy(N.matrixWorld).invert();
    }
    this.updateCamera = function(N) {
      if (r === null) return;
      M.near = R.near = C.near = N.near, M.far = R.far = C.far = N.far, (T !== M.near || z !== M.far) && (r.updateRenderState({
        depthNear: M.near,
        depthFar: M.far
      }), T = M.near, z = M.far);
      const W = N.parent, re = M.cameras;
      X(M, W);
      for (let he = 0; he < re.length; he++)
        X(re[he], W);
      re.length === 2 ? q(M, C, R) : M.projectionMatrix.copy(C.projectionMatrix), k(N, M, W);
    };
    function k(N, W, re) {
      re === null ? N.matrix.copy(W.matrixWorld) : (N.matrix.copy(re.matrixWorld), N.matrix.invert(), N.matrix.multiply(W.matrixWorld)), N.matrix.decompose(N.position, N.quaternion, N.scale), N.updateMatrixWorld(!0), N.projectionMatrix.copy(W.projectionMatrix), N.projectionMatrixInverse.copy(W.projectionMatrixInverse), N.isPerspectiveCamera && (N.fov = Qi * 2 * Math.atan(1 / N.projectionMatrix.elements[5]), N.zoom = 1);
    }
    this.getCamera = function() {
      return M;
    }, this.getFoveation = function() {
      if (!(p === null && m === null))
        return o;
    }, this.setFoveation = function(N) {
      o = N, p !== null && (p.fixedFoveation = N), m !== null && m.fixedFoveation !== void 0 && (m.fixedFoveation = N);
    };
    let j = null;
    function A(N, W) {
      if (h = W.getViewerPose(c || l), g = W, h !== null) {
        const re = h.views;
        m !== null && (e.setRenderTargetFramebuffer(u, m.framebuffer), e.setRenderTarget(u));
        let he = !1;
        re.length !== M.cameras.length && (M.cameras.length = 0, he = !0);
        for (let fe = 0; fe < re.length; fe++) {
          const xe = re[fe];
          let Ee = null;
          if (m !== null)
            Ee = m.getViewport(xe);
          else {
            const Ge = d.getViewSubImage(p, xe);
            Ee = Ge.viewport, fe === 0 && (e.setRenderTargetTextures(
              u,
              Ge.colorTexture,
              p.ignoreDepthValues ? void 0 : Ge.depthStencilTexture
            ), e.setRenderTarget(u));
          }
          let Se = K[fe];
          Se === void 0 && (Se = new Lt(), Se.layers.enable(fe), Se.viewport = new lt(), K[fe] = Se), Se.matrix.fromArray(xe.transform.matrix), Se.matrix.decompose(Se.position, Se.quaternion, Se.scale), Se.projectionMatrix.fromArray(xe.projectionMatrix), Se.projectionMatrixInverse.copy(Se.projectionMatrix).invert(), Se.viewport.set(Ee.x, Ee.y, Ee.width, Ee.height), fe === 0 && (M.matrix.copy(Se.matrix), M.matrix.decompose(M.position, M.quaternion, M.scale)), he === !0 && M.cameras.push(Se);
        }
      }
      for (let re = 0; re < y.length; re++) {
        const he = S[re], fe = y[re];
        he !== null && fe !== void 0 && fe.update(he, W, c || l);
      }
      j && j(N, W), W.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: W }), g = null;
    }
    const J = new ua();
    J.setAnimationLoop(A), this.setAnimationLoop = function(N) {
      j = N;
    }, this.dispose = function() {
    };
  }
}
function Lu(i, e) {
  function t(f, u) {
    f.matrixAutoUpdate === !0 && f.updateMatrix(), u.value.copy(f.matrix);
  }
  function n(f, u) {
    u.color.getRGB(f.fogColor.value, sa(i)), u.isFog ? (f.fogNear.value = u.near, f.fogFar.value = u.far) : u.isFogExp2 && (f.fogDensity.value = u.density);
  }
  function r(f, u, y, S, w) {
    u.isMeshBasicMaterial || u.isMeshLambertMaterial ? a(f, u) : u.isMeshToonMaterial ? (a(f, u), d(f, u)) : u.isMeshPhongMaterial ? (a(f, u), h(f, u)) : u.isMeshStandardMaterial ? (a(f, u), p(f, u), u.isMeshPhysicalMaterial && m(f, u, w)) : u.isMeshMatcapMaterial ? (a(f, u), g(f, u)) : u.isMeshDepthMaterial ? a(f, u) : u.isMeshDistanceMaterial ? (a(f, u), v(f, u)) : u.isMeshNormalMaterial ? a(f, u) : u.isLineBasicMaterial ? (l(f, u), u.isLineDashedMaterial && s(f, u)) : u.isPointsMaterial ? o(f, u, y, S) : u.isSpriteMaterial ? c(f, u) : u.isShadowMaterial ? (f.color.value.copy(u.color), f.opacity.value = u.opacity) : u.isShaderMaterial && (u.uniformsNeedUpdate = !1);
  }
  function a(f, u) {
    f.opacity.value = u.opacity, u.color && f.diffuse.value.copy(u.color), u.emissive && f.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity), u.map && (f.map.value = u.map, t(u.map, f.mapTransform)), u.alphaMap && (f.alphaMap.value = u.alphaMap, t(u.alphaMap, f.alphaMapTransform)), u.bumpMap && (f.bumpMap.value = u.bumpMap, t(u.bumpMap, f.bumpMapTransform), f.bumpScale.value = u.bumpScale, u.side === 1 && (f.bumpScale.value *= -1)), u.normalMap && (f.normalMap.value = u.normalMap, t(u.normalMap, f.normalMapTransform), f.normalScale.value.copy(u.normalScale), u.side === 1 && f.normalScale.value.negate()), u.displacementMap && (f.displacementMap.value = u.displacementMap, t(u.displacementMap, f.displacementMapTransform), f.displacementScale.value = u.displacementScale, f.displacementBias.value = u.displacementBias), u.emissiveMap && (f.emissiveMap.value = u.emissiveMap, t(u.emissiveMap, f.emissiveMapTransform)), u.specularMap && (f.specularMap.value = u.specularMap, t(u.specularMap, f.specularMapTransform)), u.alphaTest > 0 && (f.alphaTest.value = u.alphaTest);
    const y = e.get(u).envMap;
    if (y && (f.envMap.value = y, f.flipEnvMap.value = y.isCubeTexture && y.isRenderTargetTexture === !1 ? -1 : 1, f.reflectivity.value = u.reflectivity, f.ior.value = u.ior, f.refractionRatio.value = u.refractionRatio), u.lightMap) {
      f.lightMap.value = u.lightMap;
      const S = i._useLegacyLights === !0 ? Math.PI : 1;
      f.lightMapIntensity.value = u.lightMapIntensity * S, t(u.lightMap, f.lightMapTransform);
    }
    u.aoMap && (f.aoMap.value = u.aoMap, f.aoMapIntensity.value = u.aoMapIntensity, t(u.aoMap, f.aoMapTransform));
  }
  function l(f, u) {
    f.diffuse.value.copy(u.color), f.opacity.value = u.opacity, u.map && (f.map.value = u.map, t(u.map, f.mapTransform));
  }
  function s(f, u) {
    f.dashSize.value = u.dashSize, f.totalSize.value = u.dashSize + u.gapSize, f.scale.value = u.scale;
  }
  function o(f, u, y, S) {
    f.diffuse.value.copy(u.color), f.opacity.value = u.opacity, f.size.value = u.size * y, f.scale.value = S * 0.5, u.map && (f.map.value = u.map, t(u.map, f.uvTransform)), u.alphaMap && (f.alphaMap.value = u.alphaMap, t(u.alphaMap, f.alphaMapTransform)), u.alphaTest > 0 && (f.alphaTest.value = u.alphaTest);
  }
  function c(f, u) {
    f.diffuse.value.copy(u.color), f.opacity.value = u.opacity, f.rotation.value = u.rotation, u.map && (f.map.value = u.map, t(u.map, f.mapTransform)), u.alphaMap && (f.alphaMap.value = u.alphaMap, t(u.alphaMap, f.alphaMapTransform)), u.alphaTest > 0 && (f.alphaTest.value = u.alphaTest);
  }
  function h(f, u) {
    f.specular.value.copy(u.specular), f.shininess.value = Math.max(u.shininess, 1e-4);
  }
  function d(f, u) {
    u.gradientMap && (f.gradientMap.value = u.gradientMap);
  }
  function p(f, u) {
    f.metalness.value = u.metalness, u.metalnessMap && (f.metalnessMap.value = u.metalnessMap, t(u.metalnessMap, f.metalnessMapTransform)), f.roughness.value = u.roughness, u.roughnessMap && (f.roughnessMap.value = u.roughnessMap, t(u.roughnessMap, f.roughnessMapTransform)), e.get(u).envMap && (f.envMapIntensity.value = u.envMapIntensity);
  }
  function m(f, u, y) {
    f.ior.value = u.ior, u.sheen > 0 && (f.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen), f.sheenRoughness.value = u.sheenRoughness, u.sheenColorMap && (f.sheenColorMap.value = u.sheenColorMap, t(u.sheenColorMap, f.sheenColorMapTransform)), u.sheenRoughnessMap && (f.sheenRoughnessMap.value = u.sheenRoughnessMap, t(u.sheenRoughnessMap, f.sheenRoughnessMapTransform))), u.clearcoat > 0 && (f.clearcoat.value = u.clearcoat, f.clearcoatRoughness.value = u.clearcoatRoughness, u.clearcoatMap && (f.clearcoatMap.value = u.clearcoatMap, t(u.clearcoatMap, f.clearcoatMapTransform)), u.clearcoatRoughnessMap && (f.clearcoatRoughnessMap.value = u.clearcoatRoughnessMap, t(u.clearcoatRoughnessMap, f.clearcoatRoughnessMapTransform)), u.clearcoatNormalMap && (f.clearcoatNormalMap.value = u.clearcoatNormalMap, t(u.clearcoatNormalMap, f.clearcoatNormalMapTransform), f.clearcoatNormalScale.value.copy(u.clearcoatNormalScale), u.side === 1 && f.clearcoatNormalScale.value.negate())), u.iridescence > 0 && (f.iridescence.value = u.iridescence, f.iridescenceIOR.value = u.iridescenceIOR, f.iridescenceThicknessMinimum.value = u.iridescenceThicknessRange[0], f.iridescenceThicknessMaximum.value = u.iridescenceThicknessRange[1], u.iridescenceMap && (f.iridescenceMap.value = u.iridescenceMap, t(u.iridescenceMap, f.iridescenceMapTransform)), u.iridescenceThicknessMap && (f.iridescenceThicknessMap.value = u.iridescenceThicknessMap, t(u.iridescenceThicknessMap, f.iridescenceThicknessMapTransform))), u.transmission > 0 && (f.transmission.value = u.transmission, f.transmissionSamplerMap.value = y.texture, f.transmissionSamplerSize.value.set(y.width, y.height), u.transmissionMap && (f.transmissionMap.value = u.transmissionMap, t(u.transmissionMap, f.transmissionMapTransform)), f.thickness.value = u.thickness, u.thicknessMap && (f.thicknessMap.value = u.thicknessMap, t(u.thicknessMap, f.thicknessMapTransform)), f.attenuationDistance.value = u.attenuationDistance, f.attenuationColor.value.copy(u.attenuationColor)), u.anisotropy > 0 && (f.anisotropyVector.value.set(u.anisotropy * Math.cos(u.anisotropyRotation), u.anisotropy * Math.sin(u.anisotropyRotation)), u.anisotropyMap && (f.anisotropyMap.value = u.anisotropyMap, t(u.anisotropyMap, f.anisotropyMapTransform))), f.specularIntensity.value = u.specularIntensity, f.specularColor.value.copy(u.specularColor), u.specularColorMap && (f.specularColorMap.value = u.specularColorMap, t(u.specularColorMap, f.specularColorMapTransform)), u.specularIntensityMap && (f.specularIntensityMap.value = u.specularIntensityMap, t(u.specularIntensityMap, f.specularIntensityMapTransform));
  }
  function g(f, u) {
    u.matcap && (f.matcap.value = u.matcap);
  }
  function v(f, u) {
    const y = e.get(u).light;
    f.referencePosition.value.setFromMatrixPosition(y.matrixWorld), f.nearDistance.value = y.shadow.camera.near, f.farDistance.value = y.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: r
  };
}
function Pu(i, e, t, n) {
  let r = {}, a = {}, l = [];
  const s = t.isWebGL2 ? i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS) : 0;
  function o(y, S) {
    const w = S.program;
    n.uniformBlockBinding(y, w);
  }
  function c(y, S) {
    let w = r[y.id];
    w === void 0 && (g(y), w = h(y), r[y.id] = w, y.addEventListener("dispose", f));
    const D = S.program;
    n.updateUBOMapping(y, D);
    const C = e.render.frame;
    a[y.id] !== C && (p(y), a[y.id] = C);
  }
  function h(y) {
    const S = d();
    y.__bindingPointIndex = S;
    const w = i.createBuffer(), D = y.__size, C = y.usage;
    return i.bindBuffer(i.UNIFORM_BUFFER, w), i.bufferData(i.UNIFORM_BUFFER, D, C), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, S, w), w;
  }
  function d() {
    for (let y = 0; y < s; y++)
      if (l.indexOf(y) === -1)
        return l.push(y), y;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function p(y) {
    const S = r[y.id], w = y.uniforms, D = y.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, S);
    for (let C = 0, R = w.length; C < R; C++) {
      const K = Array.isArray(w[C]) ? w[C] : [w[C]];
      for (let M = 0, T = K.length; M < T; M++) {
        const z = K[M];
        if (m(z, C, M, D) === !0) {
          const Y = z.__offset, ie = Array.isArray(z.value) ? z.value : [z.value];
          let L = 0;
          for (let I = 0; I < ie.length; I++) {
            const V = ie[I], q = v(V);
            typeof V == "number" || typeof V == "boolean" ? (z.__data[0] = V, i.bufferSubData(i.UNIFORM_BUFFER, Y + L, z.__data)) : V.isMatrix3 ? (z.__data[0] = V.elements[0], z.__data[1] = V.elements[1], z.__data[2] = V.elements[2], z.__data[3] = 0, z.__data[4] = V.elements[3], z.__data[5] = V.elements[4], z.__data[6] = V.elements[5], z.__data[7] = 0, z.__data[8] = V.elements[6], z.__data[9] = V.elements[7], z.__data[10] = V.elements[8], z.__data[11] = 0) : (V.toArray(z.__data, L), L += q.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          i.bufferSubData(i.UNIFORM_BUFFER, Y, z.__data);
        }
      }
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function m(y, S, w, D) {
    const C = y.value, R = S + "_" + w;
    if (D[R] === void 0)
      return typeof C == "number" || typeof C == "boolean" ? D[R] = C : D[R] = C.clone(), !0;
    {
      const K = D[R];
      if (typeof C == "number" || typeof C == "boolean") {
        if (K !== C)
          return D[R] = C, !0;
      } else if (K.equals(C) === !1)
        return K.copy(C), !0;
    }
    return !1;
  }
  function g(y) {
    const S = y.uniforms;
    let w = 0;
    const D = 16;
    for (let R = 0, K = S.length; R < K; R++) {
      const M = Array.isArray(S[R]) ? S[R] : [S[R]];
      for (let T = 0, z = M.length; T < z; T++) {
        const Y = M[T], ie = Array.isArray(Y.value) ? Y.value : [Y.value];
        for (let L = 0, I = ie.length; L < I; L++) {
          const V = ie[L], q = v(V), X = w % D;
          X !== 0 && D - X < q.boundary && (w += D - X), Y.__data = new Float32Array(q.storage / Float32Array.BYTES_PER_ELEMENT), Y.__offset = w, w += q.storage;
        }
      }
    }
    const C = w % D;
    return C > 0 && (w += D - C), y.__size = w, y.__cache = {}, this;
  }
  function v(y) {
    const S = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof y == "number" || typeof y == "boolean" ? (S.boundary = 4, S.storage = 4) : y.isVector2 ? (S.boundary = 8, S.storage = 8) : y.isVector3 || y.isColor ? (S.boundary = 16, S.storage = 12) : y.isVector4 ? (S.boundary = 16, S.storage = 16) : y.isMatrix3 ? (S.boundary = 48, S.storage = 48) : y.isMatrix4 ? (S.boundary = 64, S.storage = 64) : y.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", y), S;
  }
  function f(y) {
    const S = y.target;
    S.removeEventListener("dispose", f);
    const w = l.indexOf(S.__bindingPointIndex);
    l.splice(w, 1), i.deleteBuffer(r[S.id]), delete r[S.id], delete a[S.id];
  }
  function u() {
    for (const y in r)
      i.deleteBuffer(r[y]);
    l = [], r = {}, a = {};
  }
  return {
    bind: o,
    update: c,
    dispose: u
  };
}
class va {
  constructor(e = {}) {
    const {
      canvas: t = Aa(),
      context: n = null,
      depth: r = !0,
      stencil: a = !0,
      alpha: l = !1,
      antialias: s = !1,
      premultipliedAlpha: o = !0,
      preserveDrawingBuffer: c = !1,
      powerPreference: h = "default",
      failIfMajorPerformanceCaveat: d = !1
    } = e;
    this.isWebGLRenderer = !0;
    let p;
    n !== null ? p = n.getContextAttributes().alpha : p = l;
    const m = new Uint32Array(4), g = new Int32Array(4);
    let v = null, f = null;
    const u = [], y = [];
    this.domElement = t, this.debug = {
      /**
       * Enables error checking and reporting when shader programs are being compiled
       * @type {boolean}
       */
      checkShaderErrors: !0,
      /**
       * Callback for custom error reporting.
       * @type {?Function}
       */
      onShaderError: null
    }, this.autoClear = !0, this.autoClearColor = !0, this.autoClearDepth = !0, this.autoClearStencil = !0, this.sortObjects = !0, this.clippingPlanes = [], this.localClippingEnabled = !1, this._outputColorSpace = ot, this._useLegacyLights = !1, this.toneMapping = 0, this.toneMappingExposure = 1;
    const S = this;
    let w = !1, D = 0, C = 0, R = null, K = -1, M = null;
    const T = new lt(), z = new lt();
    let Y = null;
    const ie = new We(0);
    let L = 0, I = t.width, V = t.height, q = 1, X = null, k = null;
    const j = new lt(0, 0, I, V), A = new lt(0, 0, I, V);
    let J = !1;
    const N = new ca();
    let W = !1, re = !1, he = null;
    const fe = new ct(), xe = new He(), Ee = new G(), Se = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    function Ge() {
      return R === null ? q : 1;
    }
    let U = n;
    function it(x, P) {
      for (let B = 0; B < x.length; B++) {
        const H = x[B], F = t.getContext(H, P);
        if (F !== null) return F;
      }
      return null;
    }
    try {
      const x = {
        alpha: !0,
        depth: r,
        stencil: a,
        antialias: s,
        premultipliedAlpha: o,
        preserveDrawingBuffer: c,
        powerPreference: h,
        failIfMajorPerformanceCaveat: d
      };
      if ("setAttribute" in t && t.setAttribute("data-engine", `three.js r${nr}`), t.addEventListener("webglcontextlost", te, !1), t.addEventListener("webglcontextrestored", b, !1), t.addEventListener("webglcontextcreationerror", ae, !1), U === null) {
        const P = ["webgl2", "webgl", "experimental-webgl"];
        if (S.isWebGL1Renderer === !0 && P.shift(), U = it(P, x), U === null)
          throw it(P) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
      typeof WebGLRenderingContext < "u" && U instanceof WebGLRenderingContext && console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."), U.getShaderPrecisionFormat === void 0 && (U.getShaderPrecisionFormat = function() {
        return { rangeMin: 1, rangeMax: 1, precision: 1 };
      });
    } catch (x) {
      throw console.error("THREE.WebGLRenderer: " + x.message), x;
    }
    let ge, Re, de, Ze, De, E, _, O, Q, $, ee, pe, oe, ce, Te, Ue, Z, Ve, Be, be, _e, ue, Le, ze;
    function $e() {
      ge = new zl(U), Re = new Il(U, ge, e), ge.init(Re), ue = new bu(U, ge, Re), de = new yu(U, ge, Re), Ze = new Wl(U), De = new uu(), E = new Au(U, ge, de, De, Re, ue, Ze), _ = new Ol(S), O = new Hl(S), Q = new $a(U, Re), Le = new Ul(U, ge, Q, Re), $ = new Vl(U, Q, Ze, Le), ee = new Kl(U, $, Q, Ze), Be = new Yl(U, Re, E), Ue = new Nl(De), pe = new cu(S, _, O, ge, Re, Le, Ue), oe = new Lu(S, De), ce = new fu(), Te = new vu(ge, Re), Ve = new Dl(S, _, O, de, ee, p, o), Z = new Tu(S, ee, Re), ze = new Pu(U, Ze, Re, de), be = new Fl(U, ge, Ze, Re), _e = new kl(U, ge, Ze, Re), Ze.programs = pe.programs, S.capabilities = Re, S.extensions = ge, S.properties = De, S.renderLists = ce, S.shadowMap = Z, S.state = de, S.info = Ze;
    }
    $e();
    const Ie = new Cu(S, U);
    this.xr = Ie, this.getContext = function() {
      return U;
    }, this.getContextAttributes = function() {
      return U.getContextAttributes();
    }, this.forceContextLoss = function() {
      const x = ge.get("WEBGL_lose_context");
      x && x.loseContext();
    }, this.forceContextRestore = function() {
      const x = ge.get("WEBGL_lose_context");
      x && x.restoreContext();
    }, this.getPixelRatio = function() {
      return q;
    }, this.setPixelRatio = function(x) {
      x !== void 0 && (q = x, this.setSize(I, V, !1));
    }, this.getSize = function(x) {
      return x.set(I, V);
    }, this.setSize = function(x, P, B = !0) {
      if (Ie.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      I = x, V = P, t.width = Math.floor(x * q), t.height = Math.floor(P * q), B === !0 && (t.style.width = x + "px", t.style.height = P + "px"), this.setViewport(0, 0, x, P);
    }, this.getDrawingBufferSize = function(x) {
      return x.set(I * q, V * q).floor();
    }, this.setDrawingBufferSize = function(x, P, B) {
      I = x, V = P, q = B, t.width = Math.floor(x * B), t.height = Math.floor(P * B), this.setViewport(0, 0, x, P);
    }, this.getCurrentViewport = function(x) {
      return x.copy(T);
    }, this.getViewport = function(x) {
      return x.copy(j);
    }, this.setViewport = function(x, P, B, H) {
      x.isVector4 ? j.set(x.x, x.y, x.z, x.w) : j.set(x, P, B, H), de.viewport(T.copy(j).multiplyScalar(q).floor());
    }, this.getScissor = function(x) {
      return x.copy(A);
    }, this.setScissor = function(x, P, B, H) {
      x.isVector4 ? A.set(x.x, x.y, x.z, x.w) : A.set(x, P, B, H), de.scissor(z.copy(A).multiplyScalar(q).floor());
    }, this.getScissorTest = function() {
      return J;
    }, this.setScissorTest = function(x) {
      de.setScissorTest(J = x);
    }, this.setOpaqueSort = function(x) {
      X = x;
    }, this.setTransparentSort = function(x) {
      k = x;
    }, this.getClearColor = function(x) {
      return x.copy(Ve.getClearColor());
    }, this.setClearColor = function() {
      Ve.setClearColor.apply(Ve, arguments);
    }, this.getClearAlpha = function() {
      return Ve.getClearAlpha();
    }, this.setClearAlpha = function() {
      Ve.setClearAlpha.apply(Ve, arguments);
    }, this.clear = function(x = !0, P = !0, B = !0) {
      let H = 0;
      if (x) {
        let F = !1;
        if (R !== null) {
          const le = R.texture.format;
          F = le === 1033 || le === 1031 || le === 1029;
        }
        if (F) {
          const le = R.texture.type, me = le === 1009 || le === 1014 || le === 1012 || le === 1020 || le === 1017 || le === 1018, Me = Ve.getClearColor(), Ae = Ve.getClearAlpha(), Fe = Me.r, we = Me.g, Ce = Me.b;
          me ? (m[0] = Fe, m[1] = we, m[2] = Ce, m[3] = Ae, U.clearBufferuiv(U.COLOR, 0, m)) : (g[0] = Fe, g[1] = we, g[2] = Ce, g[3] = Ae, U.clearBufferiv(U.COLOR, 0, g));
        } else
          H |= U.COLOR_BUFFER_BIT;
      }
      P && (H |= U.DEPTH_BUFFER_BIT), B && (H |= U.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), U.clear(H);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.dispose = function() {
      t.removeEventListener("webglcontextlost", te, !1), t.removeEventListener("webglcontextrestored", b, !1), t.removeEventListener("webglcontextcreationerror", ae, !1), ce.dispose(), Te.dispose(), De.dispose(), _.dispose(), O.dispose(), ee.dispose(), Le.dispose(), ze.dispose(), pe.dispose(), Ie.dispose(), Ie.removeEventListener("sessionstart", dt), Ie.removeEventListener("sessionend", Ye), he && (he.dispose(), he = null), pt.stop();
    };
    function te(x) {
      x.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), w = !0;
    }
    function b() {
      console.log("THREE.WebGLRenderer: Context Restored."), w = !1;
      const x = Ze.autoReset, P = Z.enabled, B = Z.autoUpdate, H = Z.needsUpdate, F = Z.type;
      $e(), Ze.autoReset = x, Z.enabled = P, Z.autoUpdate = B, Z.needsUpdate = H, Z.type = F;
    }
    function ae(x) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", x.statusMessage);
    }
    function se(x) {
      const P = x.target;
      P.removeEventListener("dispose", se), ye(P);
    }
    function ye(x) {
      ve(x), De.remove(x);
    }
    function ve(x) {
      const P = De.get(x).programs;
      P !== void 0 && (P.forEach(function(B) {
        pe.releaseProgram(B);
      }), x.isShaderMaterial && pe.releaseShaderCache(x));
    }
    this.renderBufferDirect = function(x, P, B, H, F, le) {
      P === null && (P = Se);
      const me = F.isMesh && F.matrixWorld.determinant() < 0, Me = Sa(x, P, B, H, F);
      de.setMaterial(H, me);
      let Ae = B.index, Fe = 1;
      if (H.wireframe === !0) {
        if (Ae = $.getWireframeAttribute(B), Ae === void 0) return;
        Fe = 2;
      }
      const we = B.drawRange, Ce = B.attributes.position;
      let Qe = we.start * Fe, xt = (we.start + we.count) * Fe;
      le !== null && (Qe = Math.max(Qe, le.start * Fe), xt = Math.min(xt, (le.start + le.count) * Fe)), Ae !== null ? (Qe = Math.max(Qe, 0), xt = Math.min(xt, Ae.count)) : Ce != null && (Qe = Math.max(Qe, 0), xt = Math.min(xt, Ce.count));
      const at = xt - Qe;
      if (at < 0 || at === 1 / 0) return;
      Le.setup(F, H, Me, B, Ae);
      let It, je = be;
      if (Ae !== null && (It = Q.get(Ae), je = _e, je.setIndex(It)), F.isMesh)
        H.wireframe === !0 ? (de.setLineWidth(H.wireframeLinewidth * Ge()), je.setMode(U.LINES)) : je.setMode(U.TRIANGLES);
      else if (F.isLine) {
        let Ne = H.linewidth;
        Ne === void 0 && (Ne = 1), de.setLineWidth(Ne * Ge()), F.isLineSegments ? je.setMode(U.LINES) : F.isLineLoop ? je.setMode(U.LINE_LOOP) : je.setMode(U.LINE_STRIP);
      } else F.isPoints ? je.setMode(U.POINTS) : F.isSprite && je.setMode(U.TRIANGLES);
      if (F.isBatchedMesh)
        je.renderMultiDraw(F._multiDrawStarts, F._multiDrawCounts, F._multiDrawCount);
      else if (F.isInstancedMesh)
        je.renderInstances(Qe, at, F.count);
      else if (B.isInstancedBufferGeometry) {
        const Ne = B._maxInstanceCount !== void 0 ? B._maxInstanceCount : 1 / 0, Mi = Math.min(B.instanceCount, Ne);
        je.renderInstances(Qe, at, Mi);
      } else
        je.render(Qe, at);
    };
    function Xe(x, P, B) {
      x.transparent === !0 && x.side === 2 && x.forceSinglePass === !1 ? (x.side = 1, x.needsUpdate = !0, zn(x, P, B), x.side = 0, x.needsUpdate = !0, zn(x, P, B), x.side = 2) : zn(x, P, B);
    }
    this.compile = function(x, P, B = null) {
      B === null && (B = x), f = Te.get(B), f.init(), y.push(f), B.traverseVisible(function(F) {
        F.isLight && F.layers.test(P.layers) && (f.pushLight(F), F.castShadow && f.pushShadow(F));
      }), x !== B && x.traverseVisible(function(F) {
        F.isLight && F.layers.test(P.layers) && (f.pushLight(F), F.castShadow && f.pushShadow(F));
      }), f.setupLights(S._useLegacyLights);
      const H = /* @__PURE__ */ new Set();
      return x.traverse(function(F) {
        const le = F.material;
        if (le)
          if (Array.isArray(le))
            for (let me = 0; me < le.length; me++) {
              const Me = le[me];
              Xe(Me, B, F), H.add(Me);
            }
          else
            Xe(le, B, F), H.add(le);
      }), y.pop(), f = null, H;
    }, this.compileAsync = function(x, P, B = null) {
      const H = this.compile(x, P, B);
      return new Promise((F) => {
        function le() {
          if (H.forEach(function(me) {
            De.get(me).currentProgram.isReady() && H.delete(me);
          }), H.size === 0) {
            F(x);
            return;
          }
          setTimeout(le, 10);
        }
        ge.get("KHR_parallel_shader_compile") !== null ? le() : setTimeout(le, 10);
      });
    };
    let qe = null;
    function rt(x) {
      qe && qe(x);
    }
    function dt() {
      pt.stop();
    }
    function Ye() {
      pt.start();
    }
    const pt = new ua();
    pt.setAnimationLoop(rt), typeof self < "u" && pt.setContext(self), this.setAnimationLoop = function(x) {
      qe = x, Ie.setAnimationLoop(x), x === null ? pt.stop() : pt.start();
    }, Ie.addEventListener("sessionstart", dt), Ie.addEventListener("sessionend", Ye), this.render = function(x, P) {
      if (P !== void 0 && P.isCamera !== !0) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (w === !0) return;
      x.matrixWorldAutoUpdate === !0 && x.updateMatrixWorld(), P.parent === null && P.matrixWorldAutoUpdate === !0 && P.updateMatrixWorld(), Ie.enabled === !0 && Ie.isPresenting === !0 && (Ie.cameraAutoUpdate === !0 && Ie.updateCamera(P), P = Ie.getCamera()), x.isScene === !0 && x.onBeforeRender(S, x, P, R), f = Te.get(x, y.length), f.init(), y.push(f), fe.multiplyMatrices(P.projectionMatrix, P.matrixWorldInverse), N.setFromProjectionMatrix(fe), re = this.localClippingEnabled, W = Ue.init(this.clippingPlanes, re), v = ce.get(x, u.length), v.init(), u.push(v), Ut(x, P, 0, S.sortObjects), v.finish(), S.sortObjects === !0 && v.sort(X, k), this.info.render.frame++, W === !0 && Ue.beginShadows();
      const B = f.state.shadowsArray;
      if (Z.render(B, x, P), W === !0 && Ue.endShadows(), this.info.autoReset === !0 && this.info.reset(), Ve.render(v, x), f.setupLights(S._useLegacyLights), P.isArrayCamera) {
        const H = P.cameras;
        for (let F = 0, le = H.length; F < le; F++) {
          const me = H[F];
          sr(v, x, me, me.viewport);
        }
      } else
        sr(v, x, P);
      R !== null && (E.updateMultisampleRenderTarget(R), E.updateRenderTargetMipmap(R)), x.isScene === !0 && x.onAfterRender(S, x, P), Le.resetDefaultState(), K = -1, M = null, y.pop(), y.length > 0 ? f = y[y.length - 1] : f = null, u.pop(), u.length > 0 ? v = u[u.length - 1] : v = null;
    };
    function Ut(x, P, B, H) {
      if (x.visible === !1) return;
      if (x.layers.test(P.layers)) {
        if (x.isGroup)
          B = x.renderOrder;
        else if (x.isLOD)
          x.autoUpdate === !0 && x.update(P);
        else if (x.isLight)
          f.pushLight(x), x.castShadow && f.pushShadow(x);
        else if (x.isSprite) {
          if (!x.frustumCulled || N.intersectsSprite(x)) {
            H && Ee.setFromMatrixPosition(x.matrixWorld).applyMatrix4(fe);
            const me = ee.update(x), Me = x.material;
            Me.visible && v.push(x, me, Me, B, Ee.z, null);
          }
        } else if ((x.isMesh || x.isLine || x.isPoints) && (!x.frustumCulled || N.intersectsObject(x))) {
          const me = ee.update(x), Me = x.material;
          if (H && (x.boundingSphere !== void 0 ? (x.boundingSphere === null && x.computeBoundingSphere(), Ee.copy(x.boundingSphere.center)) : (me.boundingSphere === null && me.computeBoundingSphere(), Ee.copy(me.boundingSphere.center)), Ee.applyMatrix4(x.matrixWorld).applyMatrix4(fe)), Array.isArray(Me)) {
            const Ae = me.groups;
            for (let Fe = 0, we = Ae.length; Fe < we; Fe++) {
              const Ce = Ae[Fe], Qe = Me[Ce.materialIndex];
              Qe && Qe.visible && v.push(x, me, Qe, B, Ee.z, Ce);
            }
          } else Me.visible && v.push(x, me, Me, B, Ee.z, null);
        }
      }
      const le = x.children;
      for (let me = 0, Me = le.length; me < Me; me++)
        Ut(le[me], P, B, H);
    }
    function sr(x, P, B, H) {
      const F = x.opaque, le = x.transmissive, me = x.transparent;
      f.setupLightsView(B), W === !0 && Ue.setGlobalState(S.clippingPlanes, B), le.length > 0 && xa(F, le, P, B), H && de.viewport(T.copy(H)), F.length > 0 && Hn(F, P, B), le.length > 0 && Hn(le, P, B), me.length > 0 && Hn(me, P, B), de.buffers.depth.setTest(!0), de.buffers.depth.setMask(!0), de.buffers.color.setMask(!0), de.setPolygonOffset(!1);
    }
    function xa(x, P, B, H) {
      if ((B.isScene === !0 ? B.overrideMaterial : null) !== null)
        return;
      const le = Re.isWebGL2;
      he === null && (he = new Vt(1, 1, {
        generateMipmaps: !0,
        type: ge.has("EXT_color_buffer_half_float") ? 1016 : 1009,
        minFilter: 1008,
        samples: le ? 4 : 0
      })), S.getDrawingBufferSize(xe), le ? he.setSize(xe.x, xe.y) : he.setSize(er(xe.x), er(xe.y));
      const me = S.getRenderTarget();
      S.setRenderTarget(he), S.getClearColor(ie), L = S.getClearAlpha(), L < 1 && S.setClearColor(16777215, 0.5), S.clear();
      const Me = S.toneMapping;
      S.toneMapping = 0, Hn(x, B, H), E.updateMultisampleRenderTarget(he), E.updateRenderTargetMipmap(he);
      let Ae = !1;
      for (let Fe = 0, we = P.length; Fe < we; Fe++) {
        const Ce = P[Fe], Qe = Ce.object, xt = Ce.geometry, at = Ce.material, It = Ce.group;
        if (at.side === 2 && Qe.layers.test(H.layers)) {
          const je = at.side;
          at.side = 1, at.needsUpdate = !0, or(Qe, B, H, xt, at, It), at.side = je, at.needsUpdate = !0, Ae = !0;
        }
      }
      Ae === !0 && (E.updateMultisampleRenderTarget(he), E.updateRenderTargetMipmap(he)), S.setRenderTarget(me), S.setClearColor(ie, L), S.toneMapping = Me;
    }
    function Hn(x, P, B) {
      const H = P.isScene === !0 ? P.overrideMaterial : null;
      for (let F = 0, le = x.length; F < le; F++) {
        const me = x[F], Me = me.object, Ae = me.geometry, Fe = H === null ? me.material : H, we = me.group;
        Me.layers.test(B.layers) && or(Me, P, B, Ae, Fe, we);
      }
    }
    function or(x, P, B, H, F, le) {
      x.onBeforeRender(S, P, B, H, F, le), x.modelViewMatrix.multiplyMatrices(B.matrixWorldInverse, x.matrixWorld), x.normalMatrix.getNormalMatrix(x.modelViewMatrix), F.onBeforeRender(S, P, B, H, x, le), F.transparent === !0 && F.side === 2 && F.forceSinglePass === !1 ? (F.side = 1, F.needsUpdate = !0, S.renderBufferDirect(B, P, H, F, x, le), F.side = 0, F.needsUpdate = !0, S.renderBufferDirect(B, P, H, F, x, le), F.side = 2) : S.renderBufferDirect(B, P, H, F, x, le), x.onAfterRender(S, P, B, H, F, le);
    }
    function zn(x, P, B) {
      P.isScene !== !0 && (P = Se);
      const H = De.get(x), F = f.state.lights, le = f.state.shadowsArray, me = F.state.version, Me = pe.getParameters(x, F.state, le, P, B), Ae = pe.getProgramCacheKey(Me);
      let Fe = H.programs;
      H.environment = x.isMeshStandardMaterial ? P.environment : null, H.fog = P.fog, H.envMap = (x.isMeshStandardMaterial ? O : _).get(x.envMap || H.environment), Fe === void 0 && (x.addEventListener("dispose", se), Fe = /* @__PURE__ */ new Map(), H.programs = Fe);
      let we = Fe.get(Ae);
      if (we !== void 0) {
        if (H.currentProgram === we && H.lightsStateVersion === me)
          return cr(x, Me), we;
      } else
        Me.uniforms = pe.getUniforms(x), x.onBuild(B, Me, S), x.onBeforeCompile(Me, S), we = pe.acquireProgram(Me, Ae), Fe.set(Ae, we), H.uniforms = Me.uniforms;
      const Ce = H.uniforms;
      return (!x.isShaderMaterial && !x.isRawShaderMaterial || x.clipping === !0) && (Ce.clippingPlanes = Ue.uniform), cr(x, Me), H.needsLights = Ea(x), H.lightsStateVersion = me, H.needsLights && (Ce.ambientLightColor.value = F.state.ambient, Ce.lightProbe.value = F.state.probe, Ce.directionalLights.value = F.state.directional, Ce.directionalLightShadows.value = F.state.directionalShadow, Ce.spotLights.value = F.state.spot, Ce.spotLightShadows.value = F.state.spotShadow, Ce.rectAreaLights.value = F.state.rectArea, Ce.ltc_1.value = F.state.rectAreaLTC1, Ce.ltc_2.value = F.state.rectAreaLTC2, Ce.pointLights.value = F.state.point, Ce.pointLightShadows.value = F.state.pointShadow, Ce.hemisphereLights.value = F.state.hemi, Ce.directionalShadowMap.value = F.state.directionalShadowMap, Ce.directionalShadowMatrix.value = F.state.directionalShadowMatrix, Ce.spotShadowMap.value = F.state.spotShadowMap, Ce.spotLightMatrix.value = F.state.spotLightMatrix, Ce.spotLightMap.value = F.state.spotLightMap, Ce.pointShadowMap.value = F.state.pointShadowMap, Ce.pointShadowMatrix.value = F.state.pointShadowMatrix), H.currentProgram = we, H.uniformsList = null, we;
    }
    function lr(x) {
      if (x.uniformsList === null) {
        const P = x.currentProgram.getUniforms();
        x.uniformsList = hi.seqWithValue(P.seq, x.uniforms);
      }
      return x.uniformsList;
    }
    function cr(x, P) {
      const B = De.get(x);
      B.outputColorSpace = P.outputColorSpace, B.batching = P.batching, B.instancing = P.instancing, B.instancingColor = P.instancingColor, B.skinning = P.skinning, B.morphTargets = P.morphTargets, B.morphNormals = P.morphNormals, B.morphColors = P.morphColors, B.morphTargetsCount = P.morphTargetsCount, B.numClippingPlanes = P.numClippingPlanes, B.numIntersection = P.numClipIntersection, B.vertexAlphas = P.vertexAlphas, B.vertexTangents = P.vertexTangents, B.toneMapping = P.toneMapping;
    }
    function Sa(x, P, B, H, F) {
      P.isScene !== !0 && (P = Se), E.resetTextureUnits();
      const le = P.fog, me = H.isMeshStandardMaterial ? P.environment : null, Me = R === null ? S.outputColorSpace : R.isXRRenderTarget === !0 ? R.texture.colorSpace : zt, Ae = (H.isMeshStandardMaterial ? O : _).get(H.envMap || me), Fe = H.vertexColors === !0 && !!B.attributes.color && B.attributes.color.itemSize === 4, we = !!B.attributes.tangent && (!!H.normalMap || H.anisotropy > 0), Ce = !!B.morphAttributes.position, Qe = !!B.morphAttributes.normal, xt = !!B.morphAttributes.color;
      let at = 0;
      H.toneMapped && (R === null || R.isXRRenderTarget === !0) && (at = S.toneMapping);
      const It = B.morphAttributes.position || B.morphAttributes.normal || B.morphAttributes.color, je = It !== void 0 ? It.length : 0, Ne = De.get(H), Mi = f.state.lights;
      if (W === !0 && (re === !0 || x !== M)) {
        const Tt = x === M && H.id === K;
        Ue.setState(H, x, Tt);
      }
      let Je = !1;
      H.version === Ne.__version ? (Ne.needsLights && Ne.lightsStateVersion !== Mi.state.version || Ne.outputColorSpace !== Me || F.isBatchedMesh && Ne.batching === !1 || !F.isBatchedMesh && Ne.batching === !0 || F.isInstancedMesh && Ne.instancing === !1 || !F.isInstancedMesh && Ne.instancing === !0 || F.isSkinnedMesh && Ne.skinning === !1 || !F.isSkinnedMesh && Ne.skinning === !0 || F.isInstancedMesh && Ne.instancingColor === !0 && F.instanceColor === null || F.isInstancedMesh && Ne.instancingColor === !1 && F.instanceColor !== null || Ne.envMap !== Ae || H.fog === !0 && Ne.fog !== le || Ne.numClippingPlanes !== void 0 && (Ne.numClippingPlanes !== Ue.numPlanes || Ne.numIntersection !== Ue.numIntersection) || Ne.vertexAlphas !== Fe || Ne.vertexTangents !== we || Ne.morphTargets !== Ce || Ne.morphNormals !== Qe || Ne.morphColors !== xt || Ne.toneMapping !== at || Re.isWebGL2 === !0 && Ne.morphTargetsCount !== je) && (Je = !0) : (Je = !0, Ne.__version = H.version);
      let jt = Ne.currentProgram;
      Je === !0 && (jt = zn(H, P, F));
      let ur = !1, wn = !1, Ei = !1;
      const ut = jt.getUniforms(), $t = Ne.uniforms;
      if (de.useProgram(jt.program) && (ur = !0, wn = !0, Ei = !0), H.id !== K && (K = H.id, wn = !0), ur || M !== x) {
        ut.setValue(U, "projectionMatrix", x.projectionMatrix), ut.setValue(U, "viewMatrix", x.matrixWorldInverse);
        const Tt = ut.map.cameraPosition;
        Tt !== void 0 && Tt.setValue(U, Ee.setFromMatrixPosition(x.matrixWorld)), Re.logarithmicDepthBuffer && ut.setValue(
          U,
          "logDepthBufFC",
          2 / (Math.log(x.far + 1) / Math.LN2)
        ), (H.isMeshPhongMaterial || H.isMeshToonMaterial || H.isMeshLambertMaterial || H.isMeshBasicMaterial || H.isMeshStandardMaterial || H.isShaderMaterial) && ut.setValue(U, "isOrthographic", x.isOrthographicCamera === !0), M !== x && (M = x, wn = !0, Ei = !0);
      }
      if (F.isSkinnedMesh) {
        ut.setOptional(U, F, "bindMatrix"), ut.setOptional(U, F, "bindMatrixInverse");
        const Tt = F.skeleton;
        Tt && (Re.floatVertexTextures ? (Tt.boneTexture === null && Tt.computeBoneTexture(), ut.setValue(U, "boneTexture", Tt.boneTexture, E)) : console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."));
      }
      F.isBatchedMesh && (ut.setOptional(U, F, "batchingTexture"), ut.setValue(U, "batchingTexture", F._matricesTexture, E));
      const Ti = B.morphAttributes;
      if ((Ti.position !== void 0 || Ti.normal !== void 0 || Ti.color !== void 0 && Re.isWebGL2 === !0) && Be.update(F, B, jt), (wn || Ne.receiveShadow !== F.receiveShadow) && (Ne.receiveShadow = F.receiveShadow, ut.setValue(U, "receiveShadow", F.receiveShadow)), H.isMeshGouraudMaterial && H.envMap !== null && ($t.envMap.value = Ae, $t.flipEnvMap.value = Ae.isCubeTexture && Ae.isRenderTargetTexture === !1 ? -1 : 1), wn && (ut.setValue(U, "toneMappingExposure", S.toneMappingExposure), Ne.needsLights && Ma($t, Ei), le && H.fog === !0 && oe.refreshFogUniforms($t, le), oe.refreshMaterialUniforms($t, H, q, V, he), hi.upload(U, lr(Ne), $t, E)), H.isShaderMaterial && H.uniformsNeedUpdate === !0 && (hi.upload(U, lr(Ne), $t, E), H.uniformsNeedUpdate = !1), H.isSpriteMaterial && ut.setValue(U, "center", F.center), ut.setValue(U, "modelViewMatrix", F.modelViewMatrix), ut.setValue(U, "normalMatrix", F.normalMatrix), ut.setValue(U, "modelMatrix", F.matrixWorld), H.isShaderMaterial || H.isRawShaderMaterial) {
        const Tt = H.uniformsGroups;
        for (let yi = 0, Ta = Tt.length; yi < Ta; yi++)
          if (Re.isWebGL2) {
            const hr = Tt[yi];
            ze.update(hr, jt), ze.bind(hr, jt);
          } else
            console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.");
      }
      return jt;
    }
    function Ma(x, P) {
      x.ambientLightColor.needsUpdate = P, x.lightProbe.needsUpdate = P, x.directionalLights.needsUpdate = P, x.directionalLightShadows.needsUpdate = P, x.pointLights.needsUpdate = P, x.pointLightShadows.needsUpdate = P, x.spotLights.needsUpdate = P, x.spotLightShadows.needsUpdate = P, x.rectAreaLights.needsUpdate = P, x.hemisphereLights.needsUpdate = P;
    }
    function Ea(x) {
      return x.isMeshLambertMaterial || x.isMeshToonMaterial || x.isMeshPhongMaterial || x.isMeshStandardMaterial || x.isShadowMaterial || x.isShaderMaterial && x.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return D;
    }, this.getActiveMipmapLevel = function() {
      return C;
    }, this.getRenderTarget = function() {
      return R;
    }, this.setRenderTargetTextures = function(x, P, B) {
      De.get(x.texture).__webglTexture = P, De.get(x.depthTexture).__webglTexture = B;
      const H = De.get(x);
      H.__hasExternalTextures = !0, H.__hasExternalTextures && (H.__autoAllocateDepthBuffer = B === void 0, H.__autoAllocateDepthBuffer || ge.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), H.__useRenderToTexture = !1));
    }, this.setRenderTargetFramebuffer = function(x, P) {
      const B = De.get(x);
      B.__webglFramebuffer = P, B.__useDefaultFramebuffer = P === void 0;
    }, this.setRenderTarget = function(x, P = 0, B = 0) {
      R = x, D = P, C = B;
      let H = !0, F = null, le = !1, me = !1;
      if (x) {
        const Ae = De.get(x);
        Ae.__useDefaultFramebuffer !== void 0 ? (de.bindFramebuffer(U.FRAMEBUFFER, null), H = !1) : Ae.__webglFramebuffer === void 0 ? E.setupRenderTarget(x) : Ae.__hasExternalTextures && E.rebindTextures(x, De.get(x.texture).__webglTexture, De.get(x.depthTexture).__webglTexture);
        const Fe = x.texture;
        (Fe.isData3DTexture || Fe.isDataArrayTexture || Fe.isCompressedArrayTexture) && (me = !0);
        const we = De.get(x).__webglFramebuffer;
        x.isWebGLCubeRenderTarget ? (Array.isArray(we[P]) ? F = we[P][B] : F = we[P], le = !0) : Re.isWebGL2 && x.samples > 0 && E.useMultisampledRTT(x) === !1 ? F = De.get(x).__webglMultisampledFramebuffer : Array.isArray(we) ? F = we[B] : F = we, T.copy(x.viewport), z.copy(x.scissor), Y = x.scissorTest;
      } else
        T.copy(j).multiplyScalar(q).floor(), z.copy(A).multiplyScalar(q).floor(), Y = J;
      if (de.bindFramebuffer(U.FRAMEBUFFER, F) && Re.drawBuffers && H && de.drawBuffers(x, F), de.viewport(T), de.scissor(z), de.setScissorTest(Y), le) {
        const Ae = De.get(x.texture);
        U.framebufferTexture2D(U.FRAMEBUFFER, U.COLOR_ATTACHMENT0, U.TEXTURE_CUBE_MAP_POSITIVE_X + P, Ae.__webglTexture, B);
      } else if (me) {
        const Ae = De.get(x.texture), Fe = P || 0;
        U.framebufferTextureLayer(U.FRAMEBUFFER, U.COLOR_ATTACHMENT0, Ae.__webglTexture, B || 0, Fe);
      }
      K = -1;
    }, this.readRenderTargetPixels = function(x, P, B, H, F, le, me) {
      if (!(x && x.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let Me = De.get(x).__webglFramebuffer;
      if (x.isWebGLCubeRenderTarget && me !== void 0 && (Me = Me[me]), Me) {
        de.bindFramebuffer(U.FRAMEBUFFER, Me);
        try {
          const Ae = x.texture, Fe = Ae.format, we = Ae.type;
          if (Fe !== 1023 && ue.convert(Fe) !== U.getParameter(U.IMPLEMENTATION_COLOR_READ_FORMAT)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          const Ce = we === 1016 && (ge.has("EXT_color_buffer_half_float") || Re.isWebGL2 && ge.has("EXT_color_buffer_float"));
          if (we !== 1009 && ue.convert(we) !== U.getParameter(U.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
          !(we === 1015 && (Re.isWebGL2 || ge.has("OES_texture_float") || ge.has("WEBGL_color_buffer_float"))) && // Chrome Mac >= 52 and Firefox
          !Ce) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          P >= 0 && P <= x.width - H && B >= 0 && B <= x.height - F && U.readPixels(P, B, H, F, ue.convert(Fe), ue.convert(we), le);
        } finally {
          const Ae = R !== null ? De.get(R).__webglFramebuffer : null;
          de.bindFramebuffer(U.FRAMEBUFFER, Ae);
        }
      }
    }, this.copyFramebufferToTexture = function(x, P, B = 0) {
      const H = Math.pow(2, -B), F = Math.floor(P.image.width * H), le = Math.floor(P.image.height * H);
      E.setTexture2D(P, 0), U.copyTexSubImage2D(U.TEXTURE_2D, B, 0, 0, x.x, x.y, F, le), de.unbindTexture();
    }, this.copyTextureToTexture = function(x, P, B, H = 0) {
      const F = P.image.width, le = P.image.height, me = ue.convert(B.format), Me = ue.convert(B.type);
      E.setTexture2D(B, 0), U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL, B.flipY), U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL, B.premultiplyAlpha), U.pixelStorei(U.UNPACK_ALIGNMENT, B.unpackAlignment), P.isDataTexture ? U.texSubImage2D(U.TEXTURE_2D, H, x.x, x.y, F, le, me, Me, P.image.data) : P.isCompressedTexture ? U.compressedTexSubImage2D(U.TEXTURE_2D, H, x.x, x.y, P.mipmaps[0].width, P.mipmaps[0].height, me, P.mipmaps[0].data) : U.texSubImage2D(U.TEXTURE_2D, H, x.x, x.y, me, Me, P.image), H === 0 && B.generateMipmaps && U.generateMipmap(U.TEXTURE_2D), de.unbindTexture();
    }, this.copyTextureToTexture3D = function(x, P, B, H, F = 0) {
      if (S.isWebGL1Renderer) {
        console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");
        return;
      }
      const le = x.max.x - x.min.x + 1, me = x.max.y - x.min.y + 1, Me = x.max.z - x.min.z + 1, Ae = ue.convert(H.format), Fe = ue.convert(H.type);
      let we;
      if (H.isData3DTexture)
        E.setTexture3D(H, 0), we = U.TEXTURE_3D;
      else if (H.isDataArrayTexture || H.isCompressedArrayTexture)
        E.setTexture2DArray(H, 0), we = U.TEXTURE_2D_ARRAY;
      else {
        console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
        return;
      }
      U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL, H.flipY), U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL, H.premultiplyAlpha), U.pixelStorei(U.UNPACK_ALIGNMENT, H.unpackAlignment);
      const Ce = U.getParameter(U.UNPACK_ROW_LENGTH), Qe = U.getParameter(U.UNPACK_IMAGE_HEIGHT), xt = U.getParameter(U.UNPACK_SKIP_PIXELS), at = U.getParameter(U.UNPACK_SKIP_ROWS), It = U.getParameter(U.UNPACK_SKIP_IMAGES), je = B.isCompressedTexture ? B.mipmaps[F] : B.image;
      U.pixelStorei(U.UNPACK_ROW_LENGTH, je.width), U.pixelStorei(U.UNPACK_IMAGE_HEIGHT, je.height), U.pixelStorei(U.UNPACK_SKIP_PIXELS, x.min.x), U.pixelStorei(U.UNPACK_SKIP_ROWS, x.min.y), U.pixelStorei(U.UNPACK_SKIP_IMAGES, x.min.z), B.isDataTexture || B.isData3DTexture ? U.texSubImage3D(we, F, P.x, P.y, P.z, le, me, Me, Ae, Fe, je.data) : B.isCompressedArrayTexture ? (console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."), U.compressedTexSubImage3D(we, F, P.x, P.y, P.z, le, me, Me, Ae, je.data)) : U.texSubImage3D(we, F, P.x, P.y, P.z, le, me, Me, Ae, Fe, je), U.pixelStorei(U.UNPACK_ROW_LENGTH, Ce), U.pixelStorei(U.UNPACK_IMAGE_HEIGHT, Qe), U.pixelStorei(U.UNPACK_SKIP_PIXELS, xt), U.pixelStorei(U.UNPACK_SKIP_ROWS, at), U.pixelStorei(U.UNPACK_SKIP_IMAGES, It), F === 0 && H.generateMipmaps && U.generateMipmap(we), de.unbindTexture();
    }, this.initTexture = function(x) {
      x.isCubeTexture ? E.setTextureCube(x, 0) : x.isData3DTexture ? E.setTexture3D(x, 0) : x.isDataArrayTexture || x.isCompressedArrayTexture ? E.setTexture2DArray(x, 0) : E.setTexture2D(x, 0), de.unbindTexture();
    }, this.resetState = function() {
      D = 0, C = 0, R = null, de.reset(), Le.reset();
    }, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  get coordinateSystem() {
    return 2e3;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const t = this.getContext();
    t.drawingBufferColorSpace = e === ir ? "display-p3" : "srgb", t.unpackColorSpace = ke.workingColorSpace === _i ? "display-p3" : "srgb";
  }
  get outputEncoding() {
    return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."), this.outputColorSpace === ot ? 3001 : 3e3;
  }
  set outputEncoding(e) {
    console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."), this.outputColorSpace = e === 3001 ? ot : zt;
  }
  get useLegacyLights() {
    return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."), this._useLegacyLights;
  }
  set useLegacyLights(e) {
    console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."), this._useLegacyLights = e;
  }
}
class Du extends va {
}
Du.prototype.isWebGL1Renderer = !0;
class ji extends Et {
  constructor() {
    super(), this.isScene = !0, this.type = "Scene", this.background = null, this.environment = null, this.fog = null, this.backgroundBlurriness = 0, this.backgroundIntensity = 1, this.overrideMaterial = null, typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", { detail: this }));
  }
  copy(e, t) {
    return super.copy(e, t), e.background !== null && (this.background = e.background.clone()), e.environment !== null && (this.environment = e.environment.clone()), e.fog !== null && (this.fog = e.fog.clone()), this.backgroundBlurriness = e.backgroundBlurriness, this.backgroundIntensity = e.backgroundIntensity, e.overrideMaterial !== null && (this.overrideMaterial = e.overrideMaterial.clone()), this.matrixAutoUpdate = e.matrixAutoUpdate, this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    return this.fog !== null && (t.object.fog = this.fog.toJSON()), this.backgroundBlurriness > 0 && (t.object.backgroundBlurriness = this.backgroundBlurriness), this.backgroundIntensity !== 1 && (t.object.backgroundIntensity = this.backgroundIntensity), t;
  }
}
class Uu extends vt {
  constructor(e = null, t = 1, n = 1, r, a, l, s, o, c = 1003, h = 1003, d, p) {
    super(null, l, s, o, c, h, r, a, d, p), this.isDataTexture = !0, this.image = { data: e, width: t, height: n }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
  }
}
class $i extends Kt {
  constructor(e) {
    super(e), this.isRawShaderMaterial = !0, this.type = "RawShaderMaterial";
  }
}
typeof __THREE_DEVTOOLS__ < "u" && __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", { detail: {
  revision: nr
} }));
typeof window < "u" && (window.__THREE__ ? console.warn("WARNING: Multiple instances of Three.js being imported.") : window.__THREE__ = nr);
var Ji = `precision highp float;

layout(location=0) in vec2 position;
out vec2 vUv;

void main() {
  vUv = position * 0.5 + 0.5;   
  gl_Position = vec4(position, 0.0, 1.0);
}`, Fu = `precision highp float;

in vec2 vUv;
out vec2 outUV;

uniform sampler2D uPrev;
uniform vec2      uTexel;
uniform float     uDt;
uniform float     uFeed;
uniform float     uKill;
uniform float     uDu;
uniform float     uDv;
uniform vec2      uMouse;
uniform float     uTouchGain;
uniform float     uTouchRadius;

uniform float     uFlowAmp;   
uniform float     uFlowFreq;  
uniform float     uTime;      

float n2(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453); }
float noise(vec2 p){
  vec2 i=floor(p), f=fract(p);
  float a=n2(i), b=n2(i+vec2(1,0)), c=n2(i+vec2(0,1)), d=n2(i+vec2(1,1));
  vec2 u=f*f*(3.0-2.0*f);
  return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
}

vec2 curl(vec2 p){
  float e = 0.5;
  float a = noise(p + vec2(0.0, e));
  float b = noise(p - vec2(0.0, e));
  float c = noise(p + vec2(e, 0.0));
  float d = noise(p - vec2(e, 0.0));
  float dx = (a - b);
  float dy = (c - d);
  return vec2(dy, -dx); 
}

vec2 uvSample(vec2 st){
  float t = uTime * 0.15;
  vec2 flow = curl(st * uFlowFreq + t) * (uFlowAmp * 6.0); 
  return texture(uPrev, st + flow * uTexel).rg;
}

vec2 laplacian() {
  vec2 t = vec2(0.0);
  vec2 U  = uvSample(vUv);
  t += uvSample(vUv + vec2( uTexel.x, 0.0));
  t += uvSample(vUv + vec2(-uTexel.x, 0.0));
  t += uvSample(vUv + vec2(0.0,  uTexel.y));
  t += uvSample(vUv + vec2(0.0, -uTexel.y));
  t += uvSample(vUv + vec2( uTexel.x,  uTexel.y));
  t += uvSample(vUv + vec2(-uTexel.x,  uTexel.y));
  t += uvSample(vUv + vec2( uTexel.x, -uTexel.y));
  t += uvSample(vUv + vec2(-uTexel.x, -uTexel.y));
  return (t - 8.0 * U);
}

void main() {
  vec2 UV = uvSample(vUv);
  float U = UV.r;
  float V = UV.g;

  vec2 L  = laplacian();

  
  float localDt = uDt;

  
  float localFeed = uFeed;
  float localKill = uKill;
  
  if (uMouse.x >= 0.0) {
    float d = distance(vUv, uMouse);
    
    float touchRadiusWide = uTouchRadius * 2.0; 
    float touch = exp(-pow(d / touchRadiusWide, 2.0));
    
    
    float period = 3.5; 
    float sine = sin(uTime * 2.0 * 3.14159265 / period);
    
    
    
    
    float fVariationRatio = 0.9; 
    float kVariationRatio = 0.9; 
    
    
    float fMod = sine * uFeed * fVariationRatio * touch;
    float kMod = -sine * uKill * kVariationRatio * touch; 
    
    localFeed = uFeed + fMod;
    localKill = uKill + kMod;
    
    
    
    float dtTouchRadius = uTouchRadius * 3.0; 
    float dtTouch = exp(-pow(d / dtTouchRadius, 2.0));
    
    float dtModulation = 1.0 + dtTouch * 2.0; 
    localDt = uDt * dtModulation;
    
    
    float touchV = exp(-pow(d / uTouchRadius, 2.0));
    
    float vModulation = 1.0 - sine * 0.5; 
    V += uTouchGain * touchV * vModulation;
    
    
    
    float touchU = exp(-pow(d / uTouchRadius, 2.0));
    U += uTouchGain * touchU * 0.5; 
  }

  float UVV = U * V * V;
  float dU = uDu * L.r - UVV + localFeed * (1.0 - U);
  float dV = uDv * L.g + UVV - (localFeed + localKill) * V;

  U += dU * localDt;
  V += dV * localDt;

  outUV = clamp(vec2(U, V), 0.0, 1.0);
}`, Iu = `precision highp float;

uniform sampler2D uTexUV;      
uniform vec2 uTexel;            
uniform float uBlurRadius;      

in vec2 vUv;
out vec4 fragColor;             

float gaussian(float x, float sigma) {
  return exp(-0.5 * x * x / (sigma * sigma));
}

float blur1DR(sampler2D s, vec2 uv, vec2 dir, float radius, float sigma) {
  float sum = 0.0;
  float wsum = 0.0;
  int r = int(ceil(radius));
  for (int i = -32; i <= 32; i++) {
    if (i < -r || i > r) continue;
    float w = gaussian(float(i), sigma);
    sum += texture(s, uv + dir * float(i)).r * w;
    wsum += w;
  }
  return sum / max(wsum, 1e-6);
}

float blur1DG(sampler2D s, vec2 uv, vec2 dir, float radius, float sigma) {
  float sum = 0.0;
  float wsum = 0.0;
  int r = int(ceil(radius));
  for (int i = -32; i <= 32; i++) {
    if (i < -r || i > r) continue;
    float w = gaussian(float(i), sigma);
    sum += texture(s, uv + dir * float(i)).g * w;
    wsum += w;
  }
  return sum / max(wsum, 1e-6);
}

void main() {
  
  vec2 uv = texture(uTexUV, vUv).rg;
  float u = uv.r;
  float v = uv.g;
  
  
  float h = u - v;
  
  
  float sigma = max(uBlurRadius, 0.0);
  if (sigma > 0.0) {
    
    float uH = blur1DR(uTexUV, vUv, vec2(uTexel.x, 0.0), uBlurRadius, sigma);
    float vH = blur1DG(uTexUV, vUv, vec2(uTexel.x, 0.0), uBlurRadius, sigma);
    float uV = blur1DR(uTexUV, vUv, vec2(0.0, uTexel.y), uBlurRadius, sigma);
    float vV = blur1DG(uTexUV, vUv, vec2(0.0, uTexel.y), uBlurRadius, sigma);
    
    
    float hH = uH - vH;
    float hV = uV - vV;
    h = 0.5 * (hH + hV);
  }
  
  
  
  h = 0.5 + 0.5 * tanh(h * 3.0);
  
  
  fragColor = vec4(clamp(h, 0.0, 1.0), 0.0, 0.0, 1.0);
}`, Nu = `precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform sampler2D uHeight;      
uniform vec2 uTexel;            
uniform float freq;              
uniform float bandThickness;    
uniform float relief;            
uniform float exposure;          

uniform vec3 lightDir;           
uniform float ambient;
uniform float diffuse;
uniform float specular;
uniform float shininess;
uniform float rim;

uniform float warpAmp;           
uniform float warpScale;         
uniform float warpSpeed;         
uniform float time;

uniform float showHeight;        
uniform float showBandsOnly;     

uniform float enableColor;       
uniform float colorHueOffset;   
uniform float colorSpeed;       
uniform float colorSaturation;  
uniform float colorIntensity;   

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p *= 2.03;
    a *= 0.5;
  }
  return v;
}

vec2 curl(vec2 p) {
  float e = 0.5;
  float a = fbm(p + vec2(0.0, e));
  float b = fbm(p - vec2(0.0, e));
  float c = fbm(p + vec2(e, 0.0));
  float d = fbm(p - vec2(e, 0.0));
  return vec2(a - b, d - c); 
}

vec3 normalFromHeight(vec2 uv) {
  float hC = texture(uHeight, uv).r;
  float hL = texture(uHeight, uv - vec2(uTexel.x, 0.0)).r;
  float hR = texture(uHeight, uv + vec2(uTexel.x, 0.0)).r;
  float hD = texture(uHeight, uv - vec2(0.0, uTexel.y)).r;
  float hU = texture(uHeight, uv + vec2(0.0, uTexel.y)).r;
  vec2 g = vec2(hR - hL, hU - hD); 
  
  vec3 n = normalize(vec3(-g.x * relief, -g.y * relief, 1.0));
  return n;
}

float bandsAA(float x, float freq, float thickness) {
  float w = fwidth(x * freq);                    
  float y = cos(2.0 * 3.14159265 * freq * x);   
  
  float b = smoothstep(1.0 - thickness, 1.0, (y * 0.5 + 0.5));
  
  float aaWidth = max(w * 2.0, 0.01); 
  return smoothstep(0.0, aaWidth, b) * smoothstep(1.0, 1.0 - aaWidth, b);
}

vec3 tonemap(vec3 c, float e) {
  return 1.0 - exp(-c * e);
}

vec3 hsv2rgb(vec3 c) {
  vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
  vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
  return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 rgb2hsv(vec3 c) {
  vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
  vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
  vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
  float d = q.x - min(q.w, q.y);
  float e = 1.0e-10;
  return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

void main() {
  
  
  float lfoFreq = 0.30;  
  float lfoAmount = 0.5; 
  float modulatedAmp = warpAmp * (1.0 + lfoAmount * sin(time * 6.28318530718 * lfoFreq));
  float scaleLfoFreq = 0.15;  
  float scaleLfoAmount = 0.4; 
  float modulatedScale = warpScale * (1.0 + scaleLfoAmount * sin(time * 6.28318530718 * scaleLfoFreq));
  float speedLfoFreq = 0.12;  
  float speedLfoAmount = 0.15; 
  float modulatedSpeed = warpSpeed * (1.0 + speedLfoAmount * sin(time * 6.28318530718 * speedLfoFreq));
  
  vec2 p = vUv * modulatedScale + vec2(0.0, time * modulatedSpeed);
  vec2 w = curl(p) * modulatedAmp;
  vec2 uvWarped = vUv + w;
  
  
  float H = texture(uHeight, uvWarped).r;
  
  
  if (showHeight > 0.5) {
    fragColor = vec4(vec3(H), 1.0);
    return;
  }
  
  
  float B = bandsAA(H, freq, bandThickness);
  
  
  if (showBandsOnly > 0.5) {
    fragColor = vec4(vec3(B), 1.0);
    return;
  }
  
  
  vec3 N = normalFromHeight(vUv);
  vec3 L = normalize(lightDir);
  float diff = max(dot(N, L), 0.0);
  vec3 V = vec3(0.0, 0.0, 1.0);
  vec3 Hn = normalize(L + V);
  float spec = pow(max(dot(N, Hn), 0.0), shininess);
  float rimVal = pow(1.0 - max(dot(N, V), 0.0), 2.0);
  
  
  vec3 base = mix(vec3(0.0), vec3(1.0), B);
  vec3 lit = ambient * base + diffuse * diff * base + specular * spec * vec3(1.0) + rim * rimVal * base;
  
  
  if (enableColor > 0.5) {
    
    
    float bandPhase = freq * H; 
    
    
    
    float bandHue = fract(bandPhase * 2.0); 
    
    
    float noiseHue = noise(vUv * 25.0 + time * colorSpeed * 0.1) * 0.1;
    
    
    float timeHue = fract(colorHueOffset + time * colorSpeed * 0.03);
    
    
    
    float hue = fract(bandHue + noiseHue + timeHue * 0.05);
    
    
    
    float brightness = max(lit.r, 0.4); 
    
    
    float colorBrightness = min(brightness * 1.8, 1.0);
    
    
    vec3 hsv = vec3(hue, colorSaturation, colorBrightness);
    vec3 color = hsv2rgb(hsv);
    
    
    
    
    float darkAreaThreshold = 0.15; 
    float brightnessFactor = smoothstep(darkAreaThreshold, darkAreaThreshold + 0.1, lit.r); 
    float mixFactor = max(colorIntensity, 0.7) * brightnessFactor; 
    vec3 finalColor = mix(lit, color, mixFactor);
    
    fragColor = vec4(tonemap(finalColor, exposure), 1.0);
  } else {
    
    fragColor = vec4(tonemap(lit, exposure), 1.0);
  }
}`;
const Ou = {
  gridSize: 1024,
  stepsPerFrame: 10,
  dt: 1,
  f: 0.037,
  // Slightly higher feed for more active patterns
  k: 0.065,
  // Slightly higher kill for more dynamic behavior
  Du: 0.16,
  Dv: 0.08,
  touchGain: 0.65,
  touchRadius: 0.03,
  blurRadius: 1,
  freq: 8,
  bandThickness: 0.65,
  relief: 0.8,
  exposure: 1.15,
  warpAmp: 0.04,
  warpScale: 3,
  warpSpeed: 0.06,
  ambient: 0.25,
  diffuse: 0.85,
  specular: 0.25,
  shininess: 24,
  rim: 0.25,
  lightDir: [0.2, 0.5, 1],
  showHeight: !1,
  showBandsOnly: !1,
  enableColor: !1,
  colorHueOffset: 0,
  colorSpeed: 1,
  colorSaturation: 0.9,
  colorIntensity: 0.8
};
function Bu(i, e = {}) {
  const t = { ...Ou, ...e };
  console.log("[TuringStripes] Initialization - opts.enableColor:", e.enableColor, "options.enableColor:", t.enableColor, "will set uniform to:", t.enableColor ? 1 : 0);
  const n = new va({
    canvas: i,
    antialias: !0,
    // Enable anti-aliasing to reduce aliasing artifacts
    alpha: !1,
    // Set to false so clear color shows through properly
    powerPreference: "high-performance"
  });
  n.outputColorSpace = ot, n.setClearColor(657930, 1);
  const r = n.getContext();
  if (!(r instanceof WebGL2RenderingContext))
    throw new Error("WebGL2 required");
  const a = new ha(-1, 1, 1, -1, 0, 1), l = new Zt();
  l.setAttribute("position", new Dt(new Float32Array([
    -1,
    -1,
    1,
    -1,
    1,
    1,
    -1,
    -1,
    1,
    1,
    -1,
    1
  ]), 2));
  const s = new gi(new G(0, 0, 0), Math.sqrt(3));
  l.boundingSphere = s;
  const o = {
    grid: t.gridSize,
    stepsPerFrame: t.stepsPerFrame,
    dt: t.dt,
    f: t.f,
    k: t.k,
    Du: t.Du,
    Dv: t.Dv,
    blurRadius: t.blurRadius,
    freq: t.freq,
    bandThickness: t.bandThickness,
    relief: t.relief,
    exposure: t.exposure,
    lightDir: new G(...t.lightDir),
    ambient: t.ambient,
    diffuse: t.diffuse,
    specular: t.specular,
    shininess: t.shininess,
    rim: t.rim,
    warpAmp: t.warpAmp,
    warpScale: t.warpScale,
    warpSpeed: t.warpSpeed,
    showHeight: t.showHeight,
    showBandsOnly: t.showBandsOnly,
    touchGain: t.touchGain,
    touchRadius: t.touchRadius,
    mouseUv: new He(-1, -1),
    time: 0,
    enableColor: t.enableColor,
    colorHueOffset: t.colorHueOffset,
    colorSpeed: t.colorSpeed,
    colorSaturation: t.colorSaturation,
    colorIntensity: t.colorIntensity
  };
  let c = null, h = null, d = null;
  function p(A) {
    return new Vt(A, A, {
      type: 1015,
      format: 1030,
      internalFormat: "RG32F",
      depthBuffer: !1,
      stencilBuffer: !1,
      minFilter: 1003,
      magFilter: 1003,
      wrapS: 1001,
      wrapT: 1001
    });
  }
  function m(A) {
    const J = r.getExtension("EXT_color_buffer_half_float");
    return new Vt(A, A, {
      type: J ? 1016 : 1015,
      format: 1028,
      internalFormat: J ? "R16F" : "R32F",
      depthBuffer: !1,
      stencilBuffer: !1,
      minFilter: 1006,
      magFilter: 1006,
      wrapS: 1001,
      wrapT: 1001,
      // Generate mipmaps for better quality at different scales
      generateMipmaps: !1
      // Keep false for float textures (mipmaps not always supported)
    });
  }
  const g = new $i({
    vertexShader: Ji,
    fragmentShader: Fu,
    glslVersion: Fn,
    depthTest: !1,
    depthWrite: !1,
    transparent: !1,
    uniforms: {
      uPrev: { value: null },
      uTexel: { value: new He() },
      uDt: { value: o.dt },
      uFeed: { value: o.f },
      uKill: { value: o.k },
      uDu: { value: o.Du },
      uDv: { value: o.Dv },
      uMouse: { value: o.mouseUv },
      uTouchGain: { value: o.touchGain },
      uTouchRadius: { value: o.touchRadius },
      uFlowAmp: { value: 0.15 },
      // Enable flow to keep pattern evolving
      uFlowFreq: { value: 2 },
      uTime: { value: 0 }
    }
  }), v = new $i({
    vertexShader: Ji,
    fragmentShader: Iu,
    glslVersion: Fn,
    depthTest: !1,
    depthWrite: !1,
    transparent: !1,
    uniforms: {
      uTexUV: { value: null },
      uTexel: { value: new He() },
      uBlurRadius: { value: o.blurRadius }
    }
  }), f = new $i({
    vertexShader: Ji,
    fragmentShader: Nu,
    glslVersion: Fn,
    depthTest: !1,
    depthWrite: !1,
    transparent: !1,
    uniforms: {
      uHeight: { value: null },
      uTexel: { value: new He() },
      freq: { value: o.freq },
      bandThickness: { value: o.bandThickness },
      relief: { value: o.relief },
      exposure: { value: o.exposure },
      lightDir: { value: o.lightDir.clone().normalize() },
      ambient: { value: o.ambient },
      diffuse: { value: o.diffuse },
      specular: { value: o.specular },
      shininess: { value: o.shininess },
      rim: { value: o.rim },
      warpAmp: { value: o.warpAmp },
      warpScale: { value: o.warpScale },
      warpSpeed: { value: o.warpSpeed },
      time: { value: 0 },
      showHeight: { value: o.showHeight ? 1 : 0 },
      showBandsOnly: { value: o.showBandsOnly ? 1 : 0 },
      enableColor: { value: t.enableColor ? 1 : 0 },
      // DEBUG: Log uniform value
      colorHueOffset: { value: t.colorHueOffset ?? 0 },
      colorSpeed: { value: t.colorSpeed ?? 1 },
      colorSaturation: { value: t.colorSaturation ?? 0.9 },
      colorIntensity: { value: t.colorIntensity ?? 0.8 }
    }
  }), u = new Pt(l, g), y = new Pt(l, v), S = new Pt(l, f);
  u.frustumCulled = !1, y.frustumCulled = !1, S.frustumCulled = !1;
  const w = new ji();
  w.add(u);
  const D = new ji();
  D.add(y);
  const C = new ji();
  C.add(S);
  function R(A) {
    const J = new Float32Array(A * A * 2);
    for (let W = 0; W < J.length; W += 2)
      J[W] = 1, J[W + 1] = 0;
    const N = 8 + Math.floor(Math.random() * 12);
    for (let W = 0; W < N; W++) {
      const re = Math.random(), he = Math.random(), fe = 0.03 + Math.random() * 0.05;
      for (let xe = 0; xe < A; xe++)
        for (let Ee = 0; Ee < A; Ee++) {
          const Se = Ee / A - re, Ge = xe / A - he;
          if (Math.hypot(Se, Ge) < fe) {
            const it = (xe * A + Ee) * 2;
            J[it] = 0.5 + Math.random() * 0.3, J[it + 1] = 0.7 + Math.random() * 0.3;
          }
        }
    }
    K(J, A);
  }
  function K(A, J) {
    if (!c) return;
    const N = new Uu(A, J, J, 1030, 1015);
    N.needsUpdate = !0;
    const W = n.getRenderTarget();
    n.setRenderTarget(c), n.clear(), n.copyTextureToTexture(new He(0, 0), N, c.texture), n.setRenderTarget(W), N.dispose();
  }
  function M(A) {
    c && (c.dispose(), h == null || h.dispose(), d == null || d.dispose()), c = p(A), h = p(A), d = m(A), g.uniforms.uPrev.value = c.texture, g.uniforms.uTexel.value.set(1 / A, 1 / A), v.uniforms.uTexel.value.set(1 / A, 1 / A), f.uniforms.uTexel.value.set(1 / A, 1 / A), o.grid = A, R(A), Y();
  }
  function T() {
    const A = window.devicePixelRatio || 1;
    n.setPixelRatio(A);
    const J = i.clientWidth || window.innerWidth, N = i.clientHeight || window.innerHeight;
    n.setSize(J, N, !1);
  }
  function z() {
    if (!(!c || !h)) {
      for (let A = 0; A < o.stepsPerFrame; A++) {
        g.uniforms.uPrev.value = c.texture, n.setRenderTarget(h), n.render(w, a);
        const J = c;
        c = h, h = J;
      }
      n.setRenderTarget(null);
    }
  }
  function Y() {
    if (!c || !d) return;
    v.uniforms.uTexUV.value = c.texture, v.uniforms.uBlurRadius.value = o.blurRadius;
    const A = n.getRenderTarget();
    n.setRenderTarget(d), n.clear(), n.render(D, a), f.uniforms.uHeight.value = d.texture, n.setRenderTarget(A);
  }
  let ie = !0, L = null, I = 0;
  function V(A) {
    if (!ie) return;
    L === null && (L = A);
    const J = Math.max(0, (A - L) / 1e3);
    if (L = A, isNaN(o.time) && (o.time = 0), isNaN(J) || !isFinite(J)) {
      o.time = 0;
      return;
    }
    o.time += J;
    const N = isNaN(o.time) ? 0 : o.time;
    g.uniforms.uTime.value = N;
    const W = 10, re = 0.8, he = 1.2, fe = (re + he) / 2, xe = (he - re) / 2, Ee = fe + xe * Math.sin(N * Math.PI / W);
    if (g.uniforms.uDt.value = Ee, z(), Y(), f.uniforms.lightDir.value.copy(o.lightDir).normalize(), f.uniforms.warpAmp.value = o.warpAmp, f.uniforms.warpScale.value = o.warpScale, f.uniforms.warpSpeed.value = o.warpSpeed, f.uniforms.time.value = N, f.uniforms.showHeight.value = o.showHeight ? 1 : 0, f.uniforms.showBandsOnly.value = o.showBandsOnly ? 1 : 0, f.uniforms.enableColor.value = o.enableColor ? 1 : 0, f.uniforms.colorHueOffset.value = o.colorHueOffset, f.uniforms.colorSpeed.value = o.colorSpeed, f.uniforms.colorSaturation.value = o.colorSaturation, f.uniforms.colorIntensity.value = o.colorIntensity, !f.uniforms.uHeight.value) {
      I = requestAnimationFrame(V);
      return;
    }
    n.setRenderTarget(null), n.clear(), n.render(C, a), I = requestAnimationFrame(V);
  }
  const q = new ResizeObserver(() => {
    T();
  });
  q.observe(i);
  function X(A) {
    const J = i.getBoundingClientRect(), N = (A.clientX - J.left) / J.width, W = 1 - (A.clientY - J.top) / J.height;
    N >= 0 && N <= 1 && W >= 0 && W <= 1 ? (o.mouseUv.set(N, W), g.uniforms.uMouse.value.copy(o.mouseUv), Math.random() < 0.01 && console.log("[TuringStripes] Mouse at UV:", N.toFixed(3), W.toFixed(3), "TouchGain:", o.touchGain, "TouchRadius:", o.touchRadius)) : k();
  }
  function k() {
    o.mouseUv.set(-1, -1), g.uniforms.uMouse.value.copy(o.mouseUv);
  }
  return window.addEventListener("pointermove", X), window.addEventListener("pointerdown", X), window.addEventListener("pointerup", k), window.addEventListener("pointerleave", k), T(), n.setRenderTarget(null), n.clear(), M(o.grid), I = requestAnimationFrame(V), {
    cleanup: () => {
      cancelAnimationFrame(I), q.disconnect(), window.removeEventListener("pointermove", X), window.removeEventListener("pointerdown", X), window.removeEventListener("pointerup", k), window.removeEventListener("pointerleave", k), ie = !1, c && c.dispose(), h && h.dispose(), d && d.dispose(), g.dispose(), v.dispose(), f.dispose(), l.dispose(), n.dispose();
    },
    setParams: (A) => {
      A.gridSize !== void 0 && A.gridSize !== o.grid && (o.grid = A.gridSize, M(A.gridSize)), A.stepsPerFrame !== void 0 && (o.stepsPerFrame = A.stepsPerFrame), A.dt !== void 0 && (o.dt = A.dt, g.uniforms.uDt.value = A.dt), A.f !== void 0 && (o.f = A.f, g.uniforms.uFeed.value = A.f), A.k !== void 0 && (o.k = A.k, g.uniforms.uKill.value = A.k), A.Du !== void 0 && (o.Du = A.Du, g.uniforms.uDu.value = A.Du), A.Dv !== void 0 && (o.Dv = A.Dv, g.uniforms.uDv.value = A.Dv), A.touchGain !== void 0 && (o.touchGain = A.touchGain, g.uniforms.uTouchGain.value = A.touchGain), A.touchRadius !== void 0 && (o.touchRadius = A.touchRadius, g.uniforms.uTouchRadius.value = A.touchRadius), A.blurRadius !== void 0 && (o.blurRadius = A.blurRadius, v.uniforms.uBlurRadius.value = A.blurRadius), A.freq !== void 0 && (o.freq = A.freq, f.uniforms.freq.value = A.freq), A.bandThickness !== void 0 && (o.bandThickness = A.bandThickness, f.uniforms.bandThickness.value = A.bandThickness), A.relief !== void 0 && (o.relief = A.relief, f.uniforms.relief.value = A.relief), A.exposure !== void 0 && (o.exposure = A.exposure, f.uniforms.exposure.value = A.exposure), A.warpAmp !== void 0 && (o.warpAmp = A.warpAmp, f.uniforms.warpAmp.value = A.warpAmp), A.warpScale !== void 0 && (o.warpScale = A.warpScale, f.uniforms.warpScale.value = A.warpScale), A.warpSpeed !== void 0 && (o.warpSpeed = A.warpSpeed, f.uniforms.warpSpeed.value = A.warpSpeed), A.ambient !== void 0 && (o.ambient = A.ambient, f.uniforms.ambient.value = A.ambient), A.diffuse !== void 0 && (o.diffuse = A.diffuse, f.uniforms.diffuse.value = A.diffuse), A.specular !== void 0 && (o.specular = A.specular, f.uniforms.specular.value = A.specular), A.shininess !== void 0 && (o.shininess = A.shininess, f.uniforms.shininess.value = A.shininess), A.rim !== void 0 && (o.rim = A.rim, f.uniforms.rim.value = A.rim), A.lightDir !== void 0 && (o.lightDir.set(...A.lightDir), f.uniforms.lightDir.value.copy(o.lightDir).normalize()), A.showHeight !== void 0 && (o.showHeight = A.showHeight, f.uniforms.showHeight.value = A.showHeight ? 1 : 0), A.showBandsOnly !== void 0 && (o.showBandsOnly = A.showBandsOnly, f.uniforms.showBandsOnly.value = A.showBandsOnly ? 1 : 0), A.enableColor !== void 0 && (o.enableColor = A.enableColor, f.uniforms.enableColor.value = A.enableColor ? 1 : 0), A.colorHueOffset !== void 0 && (o.colorHueOffset = A.colorHueOffset, f.uniforms.colorHueOffset.value = A.colorHueOffset), A.colorSpeed !== void 0 && (o.colorSpeed = A.colorSpeed, f.uniforms.colorSpeed.value = A.colorSpeed), A.colorSaturation !== void 0 && (o.colorSaturation = A.colorSaturation, f.uniforms.colorSaturation.value = A.colorSaturation), A.colorIntensity !== void 0 && (o.colorIntensity = A.colorIntensity, f.uniforms.colorIntensity.value = A.colorIntensity);
    },
    reseed: () => {
      c && (R(o.grid), Y());
    }
  };
}
export {
  Bu as createTuringStripes
};
