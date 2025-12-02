/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const nr = "160";
const At = "", ot = "srgb", zt = "srgb-linear", ir = "display-p3", _i = "display-p3-linear", fi = "linear", Ze = "srgb", di = "rec709", pi = "p3";
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
class Be {
  constructor(e, t, n, r, a, l, s, o, c) {
    Be.prototype.isMatrix3 = !0, this.elements = [
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
    const n = e.elements, r = t.elements, a = this.elements, l = n[0], s = n[3], o = n[6], c = n[1], h = n[4], d = n[7], f = n[2], m = n[5], v = n[8], x = r[0], p = r[3], u = r[6], y = r[1], _ = r[4], w = r[7], D = r[2], C = r[5], R = r[8];
    return a[0] = l * x + s * y + o * D, a[3] = l * p + s * _ + o * C, a[6] = l * u + s * w + o * R, a[1] = c * x + h * y + d * D, a[4] = c * p + h * _ + d * C, a[7] = c * u + h * w + d * R, a[2] = f * x + m * y + v * D, a[5] = f * p + m * _ + v * C, a[8] = f * u + m * w + v * R, this;
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
    const e = this.elements, t = e[0], n = e[1], r = e[2], a = e[3], l = e[4], s = e[5], o = e[6], c = e[7], h = e[8], d = h * l - s * c, f = s * o - h * a, m = c * a - l * o, v = t * d + n * f + r * m;
    if (v === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    const x = 1 / v;
    return e[0] = d * x, e[1] = (r * c - h * n) * x, e[2] = (s * n - r * l) * x, e[3] = f * x, e[4] = (h * t - r * o) * x, e[5] = (r * a - s * t) * x, e[6] = m * x, e[7] = (n * o - c * t) * x, e[8] = (l * t - n * a) * x, this;
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
const Ri = /* @__PURE__ */ new Be();
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
const pr = /* @__PURE__ */ new Be().set(
  0.8224621,
  0.177538,
  0,
  0.0331941,
  0.9668058,
  0,
  0.0170827,
  0.0723974,
  0.9105199
), mr = /* @__PURE__ */ new Be().set(
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
    transfer: Ze,
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
    transfer: Ze,
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
    super(), this.isTexture = !0, Object.defineProperty(this, "id", { value: wa++ }), this.uuid = Nn(), this.name = "", this.source = new Qr(e), this.mipmaps = [], this.mapping = t, this.channel = 0, this.wrapS = n, this.wrapT = r, this.magFilter = a, this.minFilter = l, this.anisotropy = c, this.format = s, this.internalFormat = null, this.type = o, this.offset = new He(0, 0), this.repeat = new He(1, 1), this.center = new He(0, 0), this.rotation = 0, this.matrixAutoUpdate = !0, this.matrix = new Be(), this.generateMipmaps = !0, this.premultiplyAlpha = !1, this.flipY = !0, this.unpackAlignment = 4, typeof h == "string" ? this.colorSpace = h : (In("THREE.Texture: Property .encoding has been replaced by .colorSpace."), this.colorSpace = h === 3001 ? ot : At), this.userData = {}, this.version = 0, this.onUpdate = null, this.isRenderTargetTexture = !1, this.needsPMREMUpdate = !1;
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
    const o = e.elements, c = o[0], h = o[4], d = o[8], f = o[1], m = o[5], v = o[9], x = o[2], p = o[6], u = o[10];
    if (Math.abs(h - f) < 0.01 && Math.abs(d - x) < 0.01 && Math.abs(v - p) < 0.01) {
      if (Math.abs(h + f) < 0.1 && Math.abs(d + x) < 0.1 && Math.abs(v + p) < 0.1 && Math.abs(c + m + u - 3) < 0.1)
        return this.set(1, 0, 0, 0), this;
      t = Math.PI;
      const _ = (c + 1) / 2, w = (m + 1) / 2, D = (u + 1) / 2, C = (h + f) / 4, R = (d + x) / 4, q = (v + p) / 4;
      return _ > w && _ > D ? _ < 0.01 ? (n = 0, r = 0.707106781, a = 0.707106781) : (n = Math.sqrt(_), r = C / n, a = R / n) : w > D ? w < 0.01 ? (n = 0.707106781, r = 0, a = 0.707106781) : (r = Math.sqrt(w), n = C / r, a = q / r) : D < 0.01 ? (n = 0.707106781, r = 0.707106781, a = 0) : (a = Math.sqrt(D), n = R / a, r = q / a), this.set(n, r, a, t), this;
    }
    let y = Math.sqrt((p - v) * (p - v) + (d - x) * (d - x) + (f - h) * (f - h));
    return Math.abs(y) < 1e-3 && (y = 1), this.x = (p - v) / y, this.y = (d - x) / y, this.z = (f - h) / y, this.w = Math.acos((c + m + u - 1) / 2), this;
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
    const f = a[l + 0], m = a[l + 1], v = a[l + 2], x = a[l + 3];
    if (s === 0) {
      e[t + 0] = o, e[t + 1] = c, e[t + 2] = h, e[t + 3] = d;
      return;
    }
    if (s === 1) {
      e[t + 0] = f, e[t + 1] = m, e[t + 2] = v, e[t + 3] = x;
      return;
    }
    if (d !== x || o !== f || c !== m || h !== v) {
      let p = 1 - s;
      const u = o * f + c * m + h * v + d * x, y = u >= 0 ? 1 : -1, _ = 1 - u * u;
      if (_ > Number.EPSILON) {
        const D = Math.sqrt(_), C = Math.atan2(D, u * y);
        p = Math.sin(p * C) / D, s = Math.sin(s * C) / D;
      }
      const w = s * y;
      if (o = o * p + f * w, c = c * p + m * w, h = h * p + v * w, d = d * p + x * w, p === 1 - s) {
        const D = 1 / Math.sqrt(o * o + c * c + h * h + d * d);
        o *= D, c *= D, h *= D, d *= D;
      }
    }
    e[t] = o, e[t + 1] = c, e[t + 2] = h, e[t + 3] = d;
  }
  static multiplyQuaternionsFlat(e, t, n, r, a, l) {
    const s = n[r], o = n[r + 1], c = n[r + 2], h = n[r + 3], d = a[l], f = a[l + 1], m = a[l + 2], v = a[l + 3];
    return e[t] = s * v + h * d + o * m - c * f, e[t + 1] = o * v + h * f + c * d - s * m, e[t + 2] = c * v + h * m + s * f - o * d, e[t + 3] = h * v - s * d - o * f - c * m, e;
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
    const n = e._x, r = e._y, a = e._z, l = e._order, s = Math.cos, o = Math.sin, c = s(n / 2), h = s(r / 2), d = s(a / 2), f = o(n / 2), m = o(r / 2), v = o(a / 2);
    switch (l) {
      case "XYZ":
        this._x = f * h * d + c * m * v, this._y = c * m * d - f * h * v, this._z = c * h * v + f * m * d, this._w = c * h * d - f * m * v;
        break;
      case "YXZ":
        this._x = f * h * d + c * m * v, this._y = c * m * d - f * h * v, this._z = c * h * v - f * m * d, this._w = c * h * d + f * m * v;
        break;
      case "ZXY":
        this._x = f * h * d - c * m * v, this._y = c * m * d + f * h * v, this._z = c * h * v + f * m * d, this._w = c * h * d - f * m * v;
        break;
      case "ZYX":
        this._x = f * h * d - c * m * v, this._y = c * m * d + f * h * v, this._z = c * h * v - f * m * d, this._w = c * h * d + f * m * v;
        break;
      case "YZX":
        this._x = f * h * d + c * m * v, this._y = c * m * d + f * h * v, this._z = c * h * v - f * m * d, this._w = c * h * d - f * m * v;
        break;
      case "XZY":
        this._x = f * h * d - c * m * v, this._y = c * m * d - f * h * v, this._z = c * h * v + f * m * d, this._w = c * h * d + f * m * v;
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
    const t = e.elements, n = t[0], r = t[4], a = t[8], l = t[1], s = t[5], o = t[9], c = t[2], h = t[6], d = t[10], f = n + s + d;
    if (f > 0) {
      const m = 0.5 / Math.sqrt(f + 1);
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
    const c = Math.sqrt(o), h = Math.atan2(c, s), d = Math.sin((1 - t) * h) / c, f = Math.sin(t * h) / c;
    return this._w = l * d + this._w * f, this._x = n * d + this._x * f, this._y = r * d + this._y * f, this._z = a * d + this._z * f, this._onChangeCallback(), this;
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
class B {
  constructor(e = 0, t = 0, n = 0) {
    B.prototype.isVector3 = !0, this.x = e, this.y = t, this.z = n;
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
const Li = /* @__PURE__ */ new B(), _r = /* @__PURE__ */ new On();
class Bn {
  constructor(e = new B(1 / 0, 1 / 0, 1 / 0), t = new B(-1 / 0, -1 / 0, -1 / 0)) {
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
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B(),
  /* @__PURE__ */ new B()
], bt = /* @__PURE__ */ new B(), kn = /* @__PURE__ */ new Bn(), ln = /* @__PURE__ */ new B(), cn = /* @__PURE__ */ new B(), un = /* @__PURE__ */ new B(), kt = /* @__PURE__ */ new B(), Wt = /* @__PURE__ */ new B(), Jt = /* @__PURE__ */ new B(), Ln = /* @__PURE__ */ new B(), Wn = /* @__PURE__ */ new B(), Xn = /* @__PURE__ */ new B(), Qt = /* @__PURE__ */ new B();
function Pi(i, e, t, n, r) {
  for (let a = 0, l = i.length - 3; a <= l; a += 3) {
    Qt.fromArray(i, a);
    const s = r.x * Math.abs(Qt.x) + r.y * Math.abs(Qt.y) + r.z * Math.abs(Qt.z), o = e.dot(Qt), c = t.dot(Qt), h = n.dot(Qt);
    if (Math.max(-Math.max(o, c, h), Math.min(o, c, h)) > s)
      return !1;
  }
  return !0;
}
const Pa = /* @__PURE__ */ new Bn(), Pn = /* @__PURE__ */ new B(), Di = /* @__PURE__ */ new B();
class gi {
  constructor(e = new B(), t = -1) {
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
const Ot = /* @__PURE__ */ new B(), Ui = /* @__PURE__ */ new B(), qn = /* @__PURE__ */ new B(), Xt = /* @__PURE__ */ new B(), Fi = /* @__PURE__ */ new B(), Yn = /* @__PURE__ */ new B(), Ii = /* @__PURE__ */ new B();
class Da {
  constructor(e = new B(), t = new B(0, 0, -1)) {
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
    let d, f, m, v;
    if (h > 0)
      if (d = l * o - s, f = l * s - o, v = a * h, d >= 0)
        if (f >= -v)
          if (f <= v) {
            const x = 1 / h;
            d *= x, f *= x, m = d * (d + l * f + 2 * s) + f * (l * d + f + 2 * o) + c;
          } else
            f = a, d = Math.max(0, -(l * f + s)), m = -d * d + f * (f + 2 * o) + c;
        else
          f = -a, d = Math.max(0, -(l * f + s)), m = -d * d + f * (f + 2 * o) + c;
      else
        f <= -v ? (d = Math.max(0, -(-l * a + s)), f = d > 0 ? -a : Math.min(Math.max(-a, -o), a), m = -d * d + f * (f + 2 * o) + c) : f <= v ? (d = 0, f = Math.min(Math.max(-a, -o), a), m = f * (f + 2 * o) + c) : (d = Math.max(0, -(l * a + s)), f = d > 0 ? a : Math.min(Math.max(-a, -o), a), m = -d * d + f * (f + 2 * o) + c);
    else
      f = l > 0 ? -a : a, d = Math.max(0, -(l * f + s)), m = -d * d + f * (f + 2 * o) + c;
    return n && n.copy(this.origin).addScaledVector(this.direction, d), r && r.copy(Ui).addScaledVector(qn, f), m;
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
    const c = 1 / this.direction.x, h = 1 / this.direction.y, d = 1 / this.direction.z, f = this.origin;
    return c >= 0 ? (n = (e.min.x - f.x) * c, r = (e.max.x - f.x) * c) : (n = (e.max.x - f.x) * c, r = (e.min.x - f.x) * c), h >= 0 ? (a = (e.min.y - f.y) * h, l = (e.max.y - f.y) * h) : (a = (e.max.y - f.y) * h, l = (e.min.y - f.y) * h), n > l || a > r || ((a > n || isNaN(n)) && (n = a), (l < r || isNaN(r)) && (r = l), d >= 0 ? (s = (e.min.z - f.z) * d, o = (e.max.z - f.z) * d) : (s = (e.max.z - f.z) * d, o = (e.min.z - f.z) * d), n > o || s > r) || ((s > n || n !== n) && (n = s), (o < r || r !== r) && (r = o), r < 0) ? null : this.at(n >= 0 ? n : r, t);
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
  constructor(e, t, n, r, a, l, s, o, c, h, d, f, m, v, x, p) {
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
    ], e !== void 0 && this.set(e, t, n, r, a, l, s, o, c, h, d, f, m, v, x, p);
  }
  set(e, t, n, r, a, l, s, o, c, h, d, f, m, v, x, p) {
    const u = this.elements;
    return u[0] = e, u[4] = t, u[8] = n, u[12] = r, u[1] = a, u[5] = l, u[9] = s, u[13] = o, u[2] = c, u[6] = h, u[10] = d, u[14] = f, u[3] = m, u[7] = v, u[11] = x, u[15] = p, this;
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
      const f = l * h, m = l * d, v = s * h, x = s * d;
      t[0] = o * h, t[4] = -o * d, t[8] = c, t[1] = m + v * c, t[5] = f - x * c, t[9] = -s * o, t[2] = x - f * c, t[6] = v + m * c, t[10] = l * o;
    } else if (e.order === "YXZ") {
      const f = o * h, m = o * d, v = c * h, x = c * d;
      t[0] = f + x * s, t[4] = v * s - m, t[8] = l * c, t[1] = l * d, t[5] = l * h, t[9] = -s, t[2] = m * s - v, t[6] = x + f * s, t[10] = l * o;
    } else if (e.order === "ZXY") {
      const f = o * h, m = o * d, v = c * h, x = c * d;
      t[0] = f - x * s, t[4] = -l * d, t[8] = v + m * s, t[1] = m + v * s, t[5] = l * h, t[9] = x - f * s, t[2] = -l * c, t[6] = s, t[10] = l * o;
    } else if (e.order === "ZYX") {
      const f = l * h, m = l * d, v = s * h, x = s * d;
      t[0] = o * h, t[4] = v * c - m, t[8] = f * c + x, t[1] = o * d, t[5] = x * c + f, t[9] = m * c - v, t[2] = -c, t[6] = s * o, t[10] = l * o;
    } else if (e.order === "YZX") {
      const f = l * o, m = l * c, v = s * o, x = s * c;
      t[0] = o * h, t[4] = x - f * d, t[8] = v * d + m, t[1] = d, t[5] = l * h, t[9] = -s * h, t[2] = -c * h, t[6] = m * d + v, t[10] = f - x * d;
    } else if (e.order === "XZY") {
      const f = l * o, m = l * c, v = s * o, x = s * c;
      t[0] = o * h, t[4] = -d, t[8] = c * h, t[1] = f * d + x, t[5] = l * h, t[9] = m * d - v, t[2] = v * d - m, t[6] = s * h, t[10] = x * d + f;
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
    const n = e.elements, r = t.elements, a = this.elements, l = n[0], s = n[4], o = n[8], c = n[12], h = n[1], d = n[5], f = n[9], m = n[13], v = n[2], x = n[6], p = n[10], u = n[14], y = n[3], _ = n[7], w = n[11], D = n[15], C = r[0], R = r[4], q = r[8], M = r[12], T = r[1], z = r[5], Y = r[9], re = r[13], L = r[2], N = r[6], k = r[10], X = r[14], W = r[3], V = r[7], K = r[11], J = r[15];
    return a[0] = l * C + s * T + o * L + c * W, a[4] = l * R + s * z + o * N + c * V, a[8] = l * q + s * Y + o * k + c * K, a[12] = l * M + s * re + o * X + c * J, a[1] = h * C + d * T + f * L + m * W, a[5] = h * R + d * z + f * N + m * V, a[9] = h * q + d * Y + f * k + m * K, a[13] = h * M + d * re + f * X + m * J, a[2] = v * C + x * T + p * L + u * W, a[6] = v * R + x * z + p * N + u * V, a[10] = v * q + x * Y + p * k + u * K, a[14] = v * M + x * re + p * X + u * J, a[3] = y * C + _ * T + w * L + D * W, a[7] = y * R + _ * z + w * N + D * V, a[11] = y * q + _ * Y + w * k + D * K, a[15] = y * M + _ * re + w * X + D * J, this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    return t[0] *= e, t[4] *= e, t[8] *= e, t[12] *= e, t[1] *= e, t[5] *= e, t[9] *= e, t[13] *= e, t[2] *= e, t[6] *= e, t[10] *= e, t[14] *= e, t[3] *= e, t[7] *= e, t[11] *= e, t[15] *= e, this;
  }
  determinant() {
    const e = this.elements, t = e[0], n = e[4], r = e[8], a = e[12], l = e[1], s = e[5], o = e[9], c = e[13], h = e[2], d = e[6], f = e[10], m = e[14], v = e[3], x = e[7], p = e[11], u = e[15];
    return v * (+a * o * d - r * c * d - a * s * f + n * c * f + r * s * m - n * o * m) + x * (+t * o * m - t * c * f + a * l * f - r * l * m + r * c * h - a * o * h) + p * (+t * c * d - t * s * m - a * l * d + n * l * m + a * s * h - n * c * h) + u * (-r * s * h - t * o * d + t * s * f + r * l * d - n * l * f + n * o * h);
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
    const e = this.elements, t = e[0], n = e[1], r = e[2], a = e[3], l = e[4], s = e[5], o = e[6], c = e[7], h = e[8], d = e[9], f = e[10], m = e[11], v = e[12], x = e[13], p = e[14], u = e[15], y = d * p * c - x * f * c + x * o * m - s * p * m - d * o * u + s * f * u, _ = v * f * c - h * p * c - v * o * m + l * p * m + h * o * u - l * f * u, w = h * x * c - v * d * c + v * s * m - l * x * m - h * s * u + l * d * u, D = v * d * o - h * x * o - v * s * f + l * x * f + h * s * p - l * d * p, C = t * y + n * _ + r * w + a * D;
    if (C === 0) return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    const R = 1 / C;
    return e[0] = y * R, e[1] = (x * f * a - d * p * a - x * r * m + n * p * m + d * r * u - n * f * u) * R, e[2] = (s * p * a - x * o * a + x * r * c - n * p * c - s * r * u + n * o * u) * R, e[3] = (d * o * a - s * f * a - d * r * c + n * f * c + s * r * m - n * o * m) * R, e[4] = _ * R, e[5] = (h * p * a - v * f * a + v * r * m - t * p * m - h * r * u + t * f * u) * R, e[6] = (v * o * a - l * p * a - v * r * c + t * p * c + l * r * u - t * o * u) * R, e[7] = (l * f * a - h * o * a + h * r * c - t * f * c - l * r * m + t * o * m) * R, e[8] = w * R, e[9] = (v * d * a - h * x * a - v * n * m + t * x * m + h * n * u - t * d * u) * R, e[10] = (l * x * a - v * s * a + v * n * c - t * x * c - l * n * u + t * s * u) * R, e[11] = (h * s * a - l * d * a - h * n * c + t * d * c + l * n * m - t * s * m) * R, e[12] = D * R, e[13] = (h * x * r - v * d * r + v * n * f - t * x * f - h * n * p + t * d * p) * R, e[14] = (v * s * r - l * x * r - v * n * o + t * x * o + l * n * p - t * s * p) * R, e[15] = (l * d * r - h * s * r + h * n * o - t * d * o - l * n * f + t * s * f) * R, this;
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
    const r = this.elements, a = t._x, l = t._y, s = t._z, o = t._w, c = a + a, h = l + l, d = s + s, f = a * c, m = a * h, v = a * d, x = l * h, p = l * d, u = s * d, y = o * c, _ = o * h, w = o * d, D = n.x, C = n.y, R = n.z;
    return r[0] = (1 - (x + u)) * D, r[1] = (m + w) * D, r[2] = (v - _) * D, r[3] = 0, r[4] = (m - w) * C, r[5] = (1 - (f + u)) * C, r[6] = (p + y) * C, r[7] = 0, r[8] = (v + _) * R, r[9] = (p - y) * R, r[10] = (1 - (f + x)) * R, r[11] = 0, r[12] = e.x, r[13] = e.y, r[14] = e.z, r[15] = 1, this;
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
    const o = this.elements, c = 2 * a / (t - e), h = 2 * a / (n - r), d = (t + e) / (t - e), f = (n + r) / (n - r);
    let m, v;
    if (s === 2e3)
      m = -(l + a) / (l - a), v = -2 * l * a / (l - a);
    else if (s === 2001)
      m = -l / (l - a), v = -l * a / (l - a);
    else
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + s);
    return o[0] = c, o[4] = 0, o[8] = d, o[12] = 0, o[1] = 0, o[5] = h, o[9] = f, o[13] = 0, o[2] = 0, o[6] = 0, o[10] = m, o[14] = v, o[3] = 0, o[7] = 0, o[11] = -1, o[15] = 0, this;
  }
  makeOrthographic(e, t, n, r, a, l, s = 2e3) {
    const o = this.elements, c = 1 / (t - e), h = 1 / (n - r), d = 1 / (l - a), f = (t + e) * c, m = (n + r) * h;
    let v, x;
    if (s === 2e3)
      v = (l + a) * d, x = -2 * d;
    else if (s === 2001)
      v = a * d, x = -1 * d;
    else
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + s);
    return o[0] = 2 * c, o[4] = 0, o[8] = 0, o[12] = -f, o[1] = 0, o[5] = 2 * h, o[9] = 0, o[13] = -m, o[2] = 0, o[6] = 0, o[10] = x, o[14] = -v, o[3] = 0, o[7] = 0, o[11] = 0, o[15] = 1, this;
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
const hn = /* @__PURE__ */ new B(), Rt = /* @__PURE__ */ new ct(), Ua = /* @__PURE__ */ new B(0, 0, 0), Fa = /* @__PURE__ */ new B(1, 1, 1), qt = /* @__PURE__ */ new B(), Kn = /* @__PURE__ */ new B(), St = /* @__PURE__ */ new B(), gr = /* @__PURE__ */ new ct(), vr = /* @__PURE__ */ new On();
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
    const r = e.elements, a = r[0], l = r[4], s = r[8], o = r[1], c = r[5], h = r[9], d = r[2], f = r[6], m = r[10];
    switch (t) {
      case "XYZ":
        this._y = Math.asin(gt(s, -1, 1)), Math.abs(s) < 0.9999999 ? (this._x = Math.atan2(-h, m), this._z = Math.atan2(-l, a)) : (this._x = Math.atan2(f, c), this._z = 0);
        break;
      case "YXZ":
        this._x = Math.asin(-gt(h, -1, 1)), Math.abs(h) < 0.9999999 ? (this._y = Math.atan2(s, m), this._z = Math.atan2(o, c)) : (this._y = Math.atan2(-d, a), this._z = 0);
        break;
      case "ZXY":
        this._x = Math.asin(gt(f, -1, 1)), Math.abs(f) < 0.9999999 ? (this._y = Math.atan2(-d, m), this._z = Math.atan2(-l, c)) : (this._y = 0, this._z = Math.atan2(o, a));
        break;
      case "ZYX":
        this._y = Math.asin(-gt(d, -1, 1)), Math.abs(d) < 0.9999999 ? (this._x = Math.atan2(f, m), this._z = Math.atan2(o, a)) : (this._x = 0, this._z = Math.atan2(-l, c));
        break;
      case "YZX":
        this._z = Math.asin(gt(o, -1, 1)), Math.abs(o) < 0.9999999 ? (this._x = Math.atan2(-h, c), this._y = Math.atan2(-d, a)) : (this._x = 0, this._y = Math.atan2(s, m));
        break;
      case "XZY":
        this._z = Math.asin(-gt(l, -1, 1)), Math.abs(l) < 0.9999999 ? (this._x = Math.atan2(f, c), this._y = Math.atan2(s, a)) : (this._x = Math.atan2(-h, m), this._y = 0);
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
const xr = /* @__PURE__ */ new B(), fn = /* @__PURE__ */ new On(), Bt = /* @__PURE__ */ new ct(), Zn = /* @__PURE__ */ new B(), Dn = /* @__PURE__ */ new B(), Na = /* @__PURE__ */ new B(), Oa = /* @__PURE__ */ new On(), Sr = /* @__PURE__ */ new B(1, 0, 0), Mr = /* @__PURE__ */ new B(0, 1, 0), Er = /* @__PURE__ */ new B(0, 0, 1), Ba = { type: "added" }, Ga = { type: "removed" };
class Et extends bn {
  constructor() {
    super(), this.isObject3D = !0, Object.defineProperty(this, "id", { value: Ia++ }), this.uuid = Nn(), this.name = "", this.type = "Object3D", this.parent = null, this.children = [], this.up = Et.DEFAULT_UP.clone();
    const e = new B(), t = new vi(), n = new On(), r = new B(1, 1, 1);
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
        value: new Be()
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
      const s = l(e.geometries), o = l(e.materials), c = l(e.textures), h = l(e.images), d = l(e.shapes), f = l(e.skeletons), m = l(e.animations), v = l(e.nodes);
      s.length > 0 && (n.geometries = s), o.length > 0 && (n.materials = o), c.length > 0 && (n.textures = c), h.length > 0 && (n.images = h), d.length > 0 && (n.shapes = d), f.length > 0 && (n.skeletons = f), m.length > 0 && (n.animations = m), v.length > 0 && (n.nodes = v);
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
Et.DEFAULT_UP = /* @__PURE__ */ new B(0, 1, 0);
Et.DEFAULT_MATRIX_AUTO_UPDATE = !0;
Et.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = !0;
const wt = /* @__PURE__ */ new B(), Gt = /* @__PURE__ */ new B(), Ni = /* @__PURE__ */ new B(), Ht = /* @__PURE__ */ new B(), dn = /* @__PURE__ */ new B(), pn = /* @__PURE__ */ new B(), Tr = /* @__PURE__ */ new B(), Oi = /* @__PURE__ */ new B(), Bi = /* @__PURE__ */ new B(), Gi = /* @__PURE__ */ new B();
let jn = !1;
class Ct {
  constructor(e = new B(), t = new B(), n = new B()) {
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
    const f = 1 / d, m = (c * o - s * h) * f, v = (l * h - s * o) * f;
    return a.set(1 - m - v, v, m);
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
    const f = o * d - h * c;
    if (f <= 0 && o >= 0 && h <= 0)
      return l = o / (o - h), t.copy(n).addScaledVector(dn, l);
    Gi.subVectors(e, a);
    const m = dn.dot(Gi), v = pn.dot(Gi);
    if (v >= 0 && m <= v)
      return t.copy(a);
    const x = m * c - o * v;
    if (x <= 0 && c >= 0 && v <= 0)
      return s = c / (c - v), t.copy(n).addScaledVector(pn, s);
    const p = h * v - m * d;
    if (p <= 0 && d - h >= 0 && m - v >= 0)
      return Tr.subVectors(a, r), s = (d - h) / (d - h + (m - v)), t.copy(r).addScaledVector(Tr, s);
    const u = 1 / (p + x + f);
    return l = x * u, s = f * u, t.copy(n).addScaledVector(dn, l).addScaledVector(pn, s);
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
const tt = /* @__PURE__ */ new B(), Jn = /* @__PURE__ */ new He();
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
        tt.fromBufferAttribute(this, t), tt.applyMatrix3(e), this.setXYZ(t, tt.x, tt.y, tt.z);
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, n = this.count; t < n; t++)
      tt.fromBufferAttribute(this, t), tt.applyMatrix4(e), this.setXYZ(t, tt.x, tt.y, tt.z);
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, n = this.count; t < n; t++)
      tt.fromBufferAttribute(this, t), tt.applyNormalMatrix(e), this.setXYZ(t, tt.x, tt.y, tt.z);
    return this;
  }
  transformDirection(e) {
    for (let t = 0, n = this.count; t < n; t++)
      tt.fromBufferAttribute(this, t), tt.transformDirection(e), this.setXYZ(t, tt.x, tt.y, tt.z);
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
const yt = /* @__PURE__ */ new ct(), zi = /* @__PURE__ */ new Et(), mn = /* @__PURE__ */ new B(), Mt = /* @__PURE__ */ new Bn(), Un = /* @__PURE__ */ new Bn(), st = /* @__PURE__ */ new B();
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
      const a = new Be().getNormalMatrix(e);
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
        new B(-1 / 0, -1 / 0, -1 / 0),
        new B(1 / 0, 1 / 0, 1 / 0)
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
      console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".', this), this.boundingSphere.set(new B(), 1 / 0);
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
      c[T] = new B(), h[T] = new B();
    const d = new B(), f = new B(), m = new B(), v = new He(), x = new He(), p = new He(), u = new B(), y = new B();
    function _(T, z, Y) {
      d.fromArray(r, T * 3), f.fromArray(r, z * 3), m.fromArray(r, Y * 3), v.fromArray(l, T * 2), x.fromArray(l, z * 2), p.fromArray(l, Y * 2), f.sub(d), m.sub(d), x.sub(v), p.sub(v);
      const re = 1 / (x.x * p.y - p.x * x.y);
      isFinite(re) && (u.copy(f).multiplyScalar(p.y).addScaledVector(m, -x.y).multiplyScalar(re), y.copy(m).multiplyScalar(x.x).addScaledVector(f, -p.x).multiplyScalar(re), c[T].add(u), c[z].add(u), c[Y].add(u), h[T].add(y), h[z].add(y), h[Y].add(y));
    }
    let w = this.groups;
    w.length === 0 && (w = [{
      start: 0,
      count: n.length
    }]);
    for (let T = 0, z = w.length; T < z; ++T) {
      const Y = w[T], re = Y.start, L = Y.count;
      for (let N = re, k = re + L; N < k; N += 3)
        _(
          n[N + 0],
          n[N + 1],
          n[N + 2]
        );
    }
    const D = new B(), C = new B(), R = new B(), q = new B();
    function M(T) {
      R.fromArray(a, T * 3), q.copy(R);
      const z = c[T];
      D.copy(z), D.sub(R.multiplyScalar(R.dot(z))).normalize(), C.crossVectors(q, z);
      const re = C.dot(h[T]) < 0 ? -1 : 1;
      o[T * 4] = D.x, o[T * 4 + 1] = D.y, o[T * 4 + 2] = D.z, o[T * 4 + 3] = re;
    }
    for (let T = 0, z = w.length; T < z; ++T) {
      const Y = w[T], re = Y.start, L = Y.count;
      for (let N = re, k = re + L; N < k; N += 3)
        M(n[N + 0]), M(n[N + 1]), M(n[N + 2]);
    }
  }
  computeVertexNormals() {
    const e = this.index, t = this.getAttribute("position");
    if (t !== void 0) {
      let n = this.getAttribute("normal");
      if (n === void 0)
        n = new Dt(new Float32Array(t.count * 3), 3), this.setAttribute("normal", n);
      else
        for (let f = 0, m = n.count; f < m; f++)
          n.setXYZ(f, 0, 0, 0);
      const r = new B(), a = new B(), l = new B(), s = new B(), o = new B(), c = new B(), h = new B(), d = new B();
      if (e)
        for (let f = 0, m = e.count; f < m; f += 3) {
          const v = e.getX(f + 0), x = e.getX(f + 1), p = e.getX(f + 2);
          r.fromBufferAttribute(t, v), a.fromBufferAttribute(t, x), l.fromBufferAttribute(t, p), h.subVectors(l, a), d.subVectors(r, a), h.cross(d), s.fromBufferAttribute(n, v), o.fromBufferAttribute(n, x), c.fromBufferAttribute(n, p), s.add(h), o.add(h), c.add(h), n.setXYZ(v, s.x, s.y, s.z), n.setXYZ(x, o.x, o.y, o.z), n.setXYZ(p, c.x, c.y, c.z);
        }
      else
        for (let f = 0, m = t.count; f < m; f += 3)
          r.fromBufferAttribute(t, f + 0), a.fromBufferAttribute(t, f + 1), l.fromBufferAttribute(t, f + 2), h.subVectors(l, a), d.subVectors(r, a), h.cross(d), n.setXYZ(f + 0, h.x, h.y, h.z), n.setXYZ(f + 1, h.x, h.y, h.z), n.setXYZ(f + 2, h.x, h.y, h.z);
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
      const c = s.array, h = s.itemSize, d = s.normalized, f = new c.constructor(o.length * h);
      let m = 0, v = 0;
      for (let x = 0, p = o.length; x < p; x++) {
        s.isInterleavedBufferAttribute ? m = o[x] * s.data.stride + s.offset : m = o[x] * h;
        for (let u = 0; u < h; u++)
          f[v++] = c[m++];
      }
      return new Dt(f, h, d);
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
        const f = c[h], m = e(f, n);
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
      for (let d = 0, f = c.length; d < f; d++) {
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
      for (let f = 0, m = d.length; f < m; f++)
        h.push(d[f].clone(t));
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
const yr = /* @__PURE__ */ new ct(), en = /* @__PURE__ */ new Da(), Qn = /* @__PURE__ */ new gi(), Ar = /* @__PURE__ */ new B(), _n = /* @__PURE__ */ new B(), gn = /* @__PURE__ */ new B(), vn = /* @__PURE__ */ new B(), Vi = /* @__PURE__ */ new B(), ei = /* @__PURE__ */ new B(), ti = /* @__PURE__ */ new He(), ni = /* @__PURE__ */ new He(), ii = /* @__PURE__ */ new He(), br = /* @__PURE__ */ new B(), Rr = /* @__PURE__ */ new B(), wr = /* @__PURE__ */ new B(), ri = /* @__PURE__ */ new B(), ai = /* @__PURE__ */ new B();
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
    const a = this.geometry, l = this.material, s = a.index, o = a.attributes.position, c = a.attributes.uv, h = a.attributes.uv1, d = a.attributes.normal, f = a.groups, m = a.drawRange;
    if (s !== null)
      if (Array.isArray(l))
        for (let v = 0, x = f.length; v < x; v++) {
          const p = f[v], u = l[p.materialIndex], y = Math.max(p.start, m.start), _ = Math.min(s.count, Math.min(p.start + p.count, m.start + m.count));
          for (let w = y, D = _; w < D; w += 3) {
            const C = s.getX(w), R = s.getX(w + 1), q = s.getX(w + 2);
            r = si(this, u, e, n, c, h, d, C, R, q), r && (r.faceIndex = Math.floor(w / 3), r.face.materialIndex = p.materialIndex, t.push(r));
          }
        }
      else {
        const v = Math.max(0, m.start), x = Math.min(s.count, m.start + m.count);
        for (let p = v, u = x; p < u; p += 3) {
          const y = s.getX(p), _ = s.getX(p + 1), w = s.getX(p + 2);
          r = si(this, l, e, n, c, h, d, y, _, w), r && (r.faceIndex = Math.floor(p / 3), t.push(r));
        }
      }
    else if (o !== void 0)
      if (Array.isArray(l))
        for (let v = 0, x = f.length; v < x; v++) {
          const p = f[v], u = l[p.materialIndex], y = Math.max(p.start, m.start), _ = Math.min(o.count, Math.min(p.start + p.count, m.start + m.count));
          for (let w = y, D = _; w < D; w += 3) {
            const C = w, R = w + 1, q = w + 2;
            r = si(this, u, e, n, c, h, d, C, R, q), r && (r.faceIndex = Math.floor(w / 3), r.face.materialIndex = p.materialIndex, t.push(r));
          }
        }
      else {
        const v = Math.max(0, m.start), x = Math.min(o.count, m.start + m.count);
        for (let p = v, u = x; p < u; p += 3) {
          const y = p, _ = p + 1, w = p + 2;
          r = si(this, l, e, n, c, h, d, y, _, w), r && (r.faceIndex = Math.floor(p / 3), t.push(r));
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
    r && (ti.fromBufferAttribute(r, s), ni.fromBufferAttribute(r, o), ii.fromBufferAttribute(r, c), h.uv = Ct.getInterpolation(ri, _n, gn, vn, ti, ni, ii, new He())), a && (ti.fromBufferAttribute(a, s), ni.fromBufferAttribute(a, o), ii.fromBufferAttribute(a, c), h.uv1 = Ct.getInterpolation(ri, _n, gn, vn, ti, ni, ii, new He()), h.uv2 = h.uv1), l && (br.fromBufferAttribute(l, s), Rr.fromBufferAttribute(l, o), wr.fromBufferAttribute(l, c), h.normal = Ct.getInterpolation(ri, _n, gn, vn, br, Rr, wr, new B()), h.normal.dot(n.direction) > 0 && h.normal.multiplyScalar(-1));
    const d = {
      a: s,
      b: o,
      c,
      normal: new B(),
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
    let f = 0, m = 0;
    v("z", "y", "x", -1, -1, n, t, e, l, a, 0), v("z", "y", "x", 1, -1, n, t, -e, l, a, 1), v("x", "z", "y", 1, 1, e, n, t, r, l, 2), v("x", "z", "y", 1, -1, e, n, -t, r, l, 3), v("x", "y", "z", 1, -1, e, t, n, r, a, 4), v("x", "y", "z", -1, -1, e, t, -n, r, a, 5), this.setIndex(o), this.setAttribute("position", new sn(c, 3)), this.setAttribute("normal", new sn(h, 3)), this.setAttribute("uv", new sn(d, 2));
    function v(x, p, u, y, _, w, D, C, R, q, M) {
      const T = w / R, z = D / q, Y = w / 2, re = D / 2, L = C / 2, N = R + 1, k = q + 1;
      let X = 0, W = 0;
      const V = new B();
      for (let K = 0; K < k; K++) {
        const J = K * z - re;
        for (let le = 0; le < N; le++) {
          const H = le * T - Y;
          V[x] = H * y, V[p] = J * _, V[u] = L, c.push(V.x, V.y, V.z), V[x] = 0, V[p] = 0, V[u] = C > 0 ? 1 : -1, h.push(V.x, V.y, V.z), d.push(le / R), d.push(1 - K / q), X += 1;
        }
      }
      for (let K = 0; K < q; K++)
        for (let J = 0; J < R; J++) {
          const le = f + J + N * K, H = f + J + N * (K + 1), Z = f + (J + 1) + N * (K + 1), A = f + (J + 1) + N * K;
          o.push(le, H, A), o.push(H, Z, A), W += 6;
        }
      s.addGroup(m, W, M), m += W, f += X;
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
    const [a, l, s, o, c, h] = this.children, d = e.getRenderTarget(), f = e.getActiveCubeFace(), m = e.getActiveMipmapLevel(), v = e.xr.enabled;
    e.xr.enabled = !1;
    const x = n.texture.generateMipmaps;
    n.texture.generateMipmaps = !1, e.setRenderTarget(n, 0, r), e.render(t, a), e.setRenderTarget(n, 1, r), e.render(t, l), e.setRenderTarget(n, 2, r), e.render(t, s), e.setRenderTarget(n, 3, r), e.render(t, o), e.setRenderTarget(n, 4, r), e.render(t, c), n.texture.generateMipmaps = x, e.setRenderTarget(n, 5, r), e.render(t, h), e.setRenderTarget(d, f, m), e.xr.enabled = v, n.texture.needsPMREMUpdate = !0;
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
const ki = /* @__PURE__ */ new B(), Za = /* @__PURE__ */ new B(), ja = /* @__PURE__ */ new Be();
class nn {
  constructor(e = new B(1, 0, 0), t = 0) {
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
const tn = /* @__PURE__ */ new gi(), oi = /* @__PURE__ */ new B();
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
    const n = this.planes, r = e.elements, a = r[0], l = r[1], s = r[2], o = r[3], c = r[4], h = r[5], d = r[6], f = r[7], m = r[8], v = r[9], x = r[10], p = r[11], u = r[12], y = r[13], _ = r[14], w = r[15];
    if (n[0].setComponents(o - a, f - c, p - m, w - u).normalize(), n[1].setComponents(o + a, f + c, p + m, w + u).normalize(), n[2].setComponents(o + l, f + h, p + v, w + y).normalize(), n[3].setComponents(o - l, f - h, p - v, w - y).normalize(), n[4].setComponents(o - s, f - d, p - x, w - _).normalize(), t === 2e3)
      n[5].setComponents(o + s, f + d, p + x, w + _).normalize();
    else if (t === 2001)
      n[5].setComponents(s, d, x, _).normalize();
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
    const d = c.array, f = c.usage, m = d.byteLength, v = i.createBuffer();
    i.bindBuffer(h, v), i.bufferData(h, d, f), c.onUploadCallback();
    let x;
    if (d instanceof Float32Array)
      x = i.FLOAT;
    else if (d instanceof Uint16Array)
      if (c.isFloat16BufferAttribute)
        if (t)
          x = i.HALF_FLOAT;
        else
          throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");
      else
        x = i.UNSIGNED_SHORT;
    else if (d instanceof Int16Array)
      x = i.SHORT;
    else if (d instanceof Uint32Array)
      x = i.UNSIGNED_INT;
    else if (d instanceof Int32Array)
      x = i.INT;
    else if (d instanceof Int8Array)
      x = i.BYTE;
    else if (d instanceof Uint8Array)
      x = i.UNSIGNED_BYTE;
    else if (d instanceof Uint8ClampedArray)
      x = i.UNSIGNED_BYTE;
    else
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + d);
    return {
      buffer: v,
      type: x,
      bytesPerElement: d.BYTES_PER_ELEMENT,
      version: c.version,
      size: m
    };
  }
  function a(c, h, d) {
    const f = h.array, m = h._updateRange, v = h.updateRanges;
    if (i.bindBuffer(d, c), m.count === -1 && v.length === 0 && i.bufferSubData(d, 0, f), v.length !== 0) {
      for (let x = 0, p = v.length; x < p; x++) {
        const u = v[x];
        t ? i.bufferSubData(
          d,
          u.start * f.BYTES_PER_ELEMENT,
          f,
          u.start,
          u.count
        ) : i.bufferSubData(
          d,
          u.start * f.BYTES_PER_ELEMENT,
          f.subarray(u.start, u.start + u.count)
        );
      }
      h.clearUpdateRanges();
    }
    m.count !== -1 && (t ? i.bufferSubData(
      d,
      m.offset * f.BYTES_PER_ELEMENT,
      f,
      m.offset,
      m.count
    ) : i.bufferSubData(
      d,
      m.offset * f.BYTES_PER_ELEMENT,
      f.subarray(m.offset, m.offset + m.count)
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
      const f = n.get(c);
      (!f || f.version < c.version) && n.set(c, {
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
    const a = e / 2, l = t / 2, s = Math.floor(n), o = Math.floor(r), c = s + 1, h = o + 1, d = e / s, f = t / o, m = [], v = [], x = [], p = [];
    for (let u = 0; u < h; u++) {
      const y = u * f - l;
      for (let _ = 0; _ < c; _++) {
        const w = _ * d - a;
        v.push(w, -y, 0), x.push(0, 0, 1), p.push(_ / s), p.push(1 - u / o);
      }
    }
    for (let u = 0; u < o; u++)
      for (let y = 0; y < s; y++) {
        const _ = y + c * u, w = y + c * (u + 1), D = y + 1 + c * (u + 1), C = y + 1 + c * u;
        m.push(_, w, C), m.push(w, D, C);
      }
    this.setIndex(m), this.setAttribute("position", new sn(v, 3)), this.setAttribute("normal", new sn(x, 3)), this.setAttribute("uv", new sn(p, 2));
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
}`, De = {
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
}, ie = {
  common: {
    diffuse: { value: /* @__PURE__ */ new We(16777215) },
    opacity: { value: 1 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Be() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Be() },
    alphaTest: { value: 0 }
  },
  specularmap: {
    specularMap: { value: null },
    specularMapTransform: { value: /* @__PURE__ */ new Be() }
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
    aoMapTransform: { value: /* @__PURE__ */ new Be() }
  },
  lightmap: {
    lightMap: { value: null },
    lightMapIntensity: { value: 1 },
    lightMapTransform: { value: /* @__PURE__ */ new Be() }
  },
  bumpmap: {
    bumpMap: { value: null },
    bumpMapTransform: { value: /* @__PURE__ */ new Be() },
    bumpScale: { value: 1 }
  },
  normalmap: {
    normalMap: { value: null },
    normalMapTransform: { value: /* @__PURE__ */ new Be() },
    normalScale: { value: /* @__PURE__ */ new He(1, 1) }
  },
  displacementmap: {
    displacementMap: { value: null },
    displacementMapTransform: { value: /* @__PURE__ */ new Be() },
    displacementScale: { value: 1 },
    displacementBias: { value: 0 }
  },
  emissivemap: {
    emissiveMap: { value: null },
    emissiveMapTransform: { value: /* @__PURE__ */ new Be() }
  },
  metalnessmap: {
    metalnessMap: { value: null },
    metalnessMapTransform: { value: /* @__PURE__ */ new Be() }
  },
  roughnessmap: {
    roughnessMap: { value: null },
    roughnessMapTransform: { value: /* @__PURE__ */ new Be() }
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
    alphaMapTransform: { value: /* @__PURE__ */ new Be() },
    alphaTest: { value: 0 },
    uvTransform: { value: /* @__PURE__ */ new Be() }
  },
  sprite: {
    diffuse: { value: /* @__PURE__ */ new We(16777215) },
    opacity: { value: 1 },
    center: { value: /* @__PURE__ */ new He(0.5, 0.5) },
    rotation: { value: 0 },
    map: { value: null },
    mapTransform: { value: /* @__PURE__ */ new Be() },
    alphaMap: { value: null },
    alphaMapTransform: { value: /* @__PURE__ */ new Be() },
    alphaTest: { value: 0 }
  }
}, Ft = {
  basic: {
    uniforms: /* @__PURE__ */ mt([
      ie.common,
      ie.specularmap,
      ie.envmap,
      ie.aomap,
      ie.lightmap,
      ie.fog
    ]),
    vertexShader: De.meshbasic_vert,
    fragmentShader: De.meshbasic_frag
  },
  lambert: {
    uniforms: /* @__PURE__ */ mt([
      ie.common,
      ie.specularmap,
      ie.envmap,
      ie.aomap,
      ie.lightmap,
      ie.emissivemap,
      ie.bumpmap,
      ie.normalmap,
      ie.displacementmap,
      ie.fog,
      ie.lights,
      {
        emissive: { value: /* @__PURE__ */ new We(0) }
      }
    ]),
    vertexShader: De.meshlambert_vert,
    fragmentShader: De.meshlambert_frag
  },
  phong: {
    uniforms: /* @__PURE__ */ mt([
      ie.common,
      ie.specularmap,
      ie.envmap,
      ie.aomap,
      ie.lightmap,
      ie.emissivemap,
      ie.bumpmap,
      ie.normalmap,
      ie.displacementmap,
      ie.fog,
      ie.lights,
      {
        emissive: { value: /* @__PURE__ */ new We(0) },
        specular: { value: /* @__PURE__ */ new We(1118481) },
        shininess: { value: 30 }
      }
    ]),
    vertexShader: De.meshphong_vert,
    fragmentShader: De.meshphong_frag
  },
  standard: {
    uniforms: /* @__PURE__ */ mt([
      ie.common,
      ie.envmap,
      ie.aomap,
      ie.lightmap,
      ie.emissivemap,
      ie.bumpmap,
      ie.normalmap,
      ie.displacementmap,
      ie.roughnessmap,
      ie.metalnessmap,
      ie.fog,
      ie.lights,
      {
        emissive: { value: /* @__PURE__ */ new We(0) },
        roughness: { value: 1 },
        metalness: { value: 0 },
        envMapIntensity: { value: 1 }
        // temporary
      }
    ]),
    vertexShader: De.meshphysical_vert,
    fragmentShader: De.meshphysical_frag
  },
  toon: {
    uniforms: /* @__PURE__ */ mt([
      ie.common,
      ie.aomap,
      ie.lightmap,
      ie.emissivemap,
      ie.bumpmap,
      ie.normalmap,
      ie.displacementmap,
      ie.gradientmap,
      ie.fog,
      ie.lights,
      {
        emissive: { value: /* @__PURE__ */ new We(0) }
      }
    ]),
    vertexShader: De.meshtoon_vert,
    fragmentShader: De.meshtoon_frag
  },
  matcap: {
    uniforms: /* @__PURE__ */ mt([
      ie.common,
      ie.bumpmap,
      ie.normalmap,
      ie.displacementmap,
      ie.fog,
      {
        matcap: { value: null }
      }
    ]),
    vertexShader: De.meshmatcap_vert,
    fragmentShader: De.meshmatcap_frag
  },
  points: {
    uniforms: /* @__PURE__ */ mt([
      ie.points,
      ie.fog
    ]),
    vertexShader: De.points_vert,
    fragmentShader: De.points_frag
  },
  dashed: {
    uniforms: /* @__PURE__ */ mt([
      ie.common,
      ie.fog,
      {
        scale: { value: 1 },
        dashSize: { value: 1 },
        totalSize: { value: 2 }
      }
    ]),
    vertexShader: De.linedashed_vert,
    fragmentShader: De.linedashed_frag
  },
  depth: {
    uniforms: /* @__PURE__ */ mt([
      ie.common,
      ie.displacementmap
    ]),
    vertexShader: De.depth_vert,
    fragmentShader: De.depth_frag
  },
  normal: {
    uniforms: /* @__PURE__ */ mt([
      ie.common,
      ie.bumpmap,
      ie.normalmap,
      ie.displacementmap,
      {
        opacity: { value: 1 }
      }
    ]),
    vertexShader: De.meshnormal_vert,
    fragmentShader: De.meshnormal_frag
  },
  sprite: {
    uniforms: /* @__PURE__ */ mt([
      ie.sprite,
      ie.fog
    ]),
    vertexShader: De.sprite_vert,
    fragmentShader: De.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: { value: /* @__PURE__ */ new Be() },
      t2D: { value: null },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: De.background_vert,
    fragmentShader: De.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: { value: null },
      flipEnvMap: { value: -1 },
      backgroundBlurriness: { value: 0 },
      backgroundIntensity: { value: 1 }
    },
    vertexShader: De.backgroundCube_vert,
    fragmentShader: De.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: { value: null },
      tFlip: { value: -1 },
      opacity: { value: 1 }
    },
    vertexShader: De.cube_vert,
    fragmentShader: De.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: { value: null }
    },
    vertexShader: De.equirect_vert,
    fragmentShader: De.equirect_frag
  },
  distanceRGBA: {
    uniforms: /* @__PURE__ */ mt([
      ie.common,
      ie.displacementmap,
      {
        referencePosition: { value: /* @__PURE__ */ new B() },
        nearDistance: { value: 1 },
        farDistance: { value: 1e3 }
      }
    ]),
    vertexShader: De.distanceRGBA_vert,
    fragmentShader: De.distanceRGBA_frag
  },
  shadow: {
    uniforms: /* @__PURE__ */ mt([
      ie.lights,
      ie.fog,
      {
        color: { value: /* @__PURE__ */ new We(0) },
        opacity: { value: 1 }
      }
    ]),
    vertexShader: De.shadow_vert,
    fragmentShader: De.shadow_frag
  }
};
Ft.physical = {
  uniforms: /* @__PURE__ */ mt([
    Ft.standard.uniforms,
    {
      clearcoat: { value: 0 },
      clearcoatMap: { value: null },
      clearcoatMapTransform: { value: /* @__PURE__ */ new Be() },
      clearcoatNormalMap: { value: null },
      clearcoatNormalMapTransform: { value: /* @__PURE__ */ new Be() },
      clearcoatNormalScale: { value: /* @__PURE__ */ new He(1, 1) },
      clearcoatRoughness: { value: 0 },
      clearcoatRoughnessMap: { value: null },
      clearcoatRoughnessMapTransform: { value: /* @__PURE__ */ new Be() },
      iridescence: { value: 0 },
      iridescenceMap: { value: null },
      iridescenceMapTransform: { value: /* @__PURE__ */ new Be() },
      iridescenceIOR: { value: 1.3 },
      iridescenceThicknessMinimum: { value: 100 },
      iridescenceThicknessMaximum: { value: 400 },
      iridescenceThicknessMap: { value: null },
      iridescenceThicknessMapTransform: { value: /* @__PURE__ */ new Be() },
      sheen: { value: 0 },
      sheenColor: { value: /* @__PURE__ */ new We(0) },
      sheenColorMap: { value: null },
      sheenColorMapTransform: { value: /* @__PURE__ */ new Be() },
      sheenRoughness: { value: 1 },
      sheenRoughnessMap: { value: null },
      sheenRoughnessMapTransform: { value: /* @__PURE__ */ new Be() },
      transmission: { value: 0 },
      transmissionMap: { value: null },
      transmissionMapTransform: { value: /* @__PURE__ */ new Be() },
      transmissionSamplerSize: { value: /* @__PURE__ */ new He() },
      transmissionSamplerMap: { value: null },
      thickness: { value: 0 },
      thicknessMap: { value: null },
      thicknessMapTransform: { value: /* @__PURE__ */ new Be() },
      attenuationDistance: { value: 0 },
      attenuationColor: { value: /* @__PURE__ */ new We(0) },
      specularColor: { value: /* @__PURE__ */ new We(1, 1, 1) },
      specularColorMap: { value: null },
      specularColorMapTransform: { value: /* @__PURE__ */ new Be() },
      specularIntensity: { value: 1 },
      specularIntensityMap: { value: null },
      specularIntensityMapTransform: { value: /* @__PURE__ */ new Be() },
      anisotropyVector: { value: /* @__PURE__ */ new He() },
      anisotropyMap: { value: null },
      anisotropyMapTransform: { value: /* @__PURE__ */ new Be() }
    }
  ]),
  vertexShader: De.meshphysical_vert,
  fragmentShader: De.meshphysical_frag
};
const li = { r: 0, b: 0, g: 0 };
function Dl(i, e, t, n, r, a, l) {
  const s = new We(0);
  let o = a === !0 ? 0 : 1, c, h, d = null, f = 0, m = null;
  function v(p, u) {
    let y = !1, _ = u.isScene === !0 ? u.background : null;
    _ && _.isTexture && (_ = (u.backgroundBlurriness > 0 ? t : e).get(_)), _ === null ? x(s, o) : _ && _.isColor && (x(_, 1), y = !0);
    const w = i.xr.getEnvironmentBlendMode();
    w === "additive" ? n.buffers.color.setClear(0, 0, 0, 1, l) : w === "alpha-blend" && n.buffers.color.setClear(0, 0, 0, 0, l), (i.autoClear || y) && i.clear(i.autoClearColor, i.autoClearDepth, i.autoClearStencil), _ && (_.isCubeTexture || _.mapping === 306) ? (h === void 0 && (h = new Pt(
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
    }), r.update(h)), h.material.uniforms.envMap.value = _, h.material.uniforms.flipEnvMap.value = _.isCubeTexture && _.isRenderTargetTexture === !1 ? -1 : 1, h.material.uniforms.backgroundBlurriness.value = u.backgroundBlurriness, h.material.uniforms.backgroundIntensity.value = u.backgroundIntensity, h.material.toneMapped = ke.getTransfer(_.colorSpace) !== Ze, (d !== _ || f !== _.version || m !== i.toneMapping) && (h.material.needsUpdate = !0, d = _, f = _.version, m = i.toneMapping), h.layers.enableAll(), p.unshift(h, h.geometry, h.material, 0, 0, null)) : _ && _.isTexture && (c === void 0 && (c = new Pt(
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
    }), r.update(c)), c.material.uniforms.t2D.value = _, c.material.uniforms.backgroundIntensity.value = u.backgroundIntensity, c.material.toneMapped = ke.getTransfer(_.colorSpace) !== Ze, _.matrixAutoUpdate === !0 && _.updateMatrix(), c.material.uniforms.uvTransform.value.copy(_.matrix), (d !== _ || f !== _.version || m !== i.toneMapping) && (c.material.needsUpdate = !0, d = _, f = _.version, m = i.toneMapping), c.layers.enableAll(), p.unshift(c, c.geometry, c.material, 0, 0, null));
  }
  function x(p, u) {
    p.getRGB(li, sa(i)), n.buffers.color.setClear(li.r, li.g, li.b, u, l);
  }
  return {
    getClearColor: function() {
      return s;
    },
    setClearColor: function(p, u = 1) {
      s.set(p), o = u, x(s, o);
    },
    getClearAlpha: function() {
      return o;
    },
    setClearAlpha: function(p) {
      o = p, x(s, o);
    },
    render: v
  };
}
function Ul(i, e, t, n) {
  const r = i.getParameter(i.MAX_VERTEX_ATTRIBS), a = n.isWebGL2 ? null : e.get("OES_vertex_array_object"), l = n.isWebGL2 || a !== null, s = {}, o = p(null);
  let c = o, h = !1;
  function d(L, N, k, X, W) {
    let V = !1;
    if (l) {
      const K = x(X, k, N);
      c !== K && (c = K, m(c.object)), V = u(L, X, k, W), V && y(L, X, k, W);
    } else {
      const K = N.wireframe === !0;
      (c.geometry !== X.id || c.program !== k.id || c.wireframe !== K) && (c.geometry = X.id, c.program = k.id, c.wireframe = K, V = !0);
    }
    W !== null && t.update(W, i.ELEMENT_ARRAY_BUFFER), (V || h) && (h = !1, q(L, N, k, X), W !== null && i.bindBuffer(i.ELEMENT_ARRAY_BUFFER, t.get(W).buffer));
  }
  function f() {
    return n.isWebGL2 ? i.createVertexArray() : a.createVertexArrayOES();
  }
  function m(L) {
    return n.isWebGL2 ? i.bindVertexArray(L) : a.bindVertexArrayOES(L);
  }
  function v(L) {
    return n.isWebGL2 ? i.deleteVertexArray(L) : a.deleteVertexArrayOES(L);
  }
  function x(L, N, k) {
    const X = k.wireframe === !0;
    let W = s[L.id];
    W === void 0 && (W = {}, s[L.id] = W);
    let V = W[N.id];
    V === void 0 && (V = {}, W[N.id] = V);
    let K = V[X];
    return K === void 0 && (K = p(f()), V[X] = K), K;
  }
  function p(L) {
    const N = [], k = [], X = [];
    for (let W = 0; W < r; W++)
      N[W] = 0, k[W] = 0, X[W] = 0;
    return {
      // for backward compatibility on non-VAO support browser
      geometry: null,
      program: null,
      wireframe: !1,
      newAttributes: N,
      enabledAttributes: k,
      attributeDivisors: X,
      object: L,
      attributes: {},
      index: null
    };
  }
  function u(L, N, k, X) {
    const W = c.attributes, V = N.attributes;
    let K = 0;
    const J = k.getAttributes();
    for (const le in J)
      if (J[le].location >= 0) {
        const Z = W[le];
        let A = V[le];
        if (A === void 0 && (le === "instanceMatrix" && L.instanceMatrix && (A = L.instanceMatrix), le === "instanceColor" && L.instanceColor && (A = L.instanceColor)), Z === void 0 || Z.attribute !== A || A && Z.data !== A.data) return !0;
        K++;
      }
    return c.attributesNum !== K || c.index !== X;
  }
  function y(L, N, k, X) {
    const W = {}, V = N.attributes;
    let K = 0;
    const J = k.getAttributes();
    for (const le in J)
      if (J[le].location >= 0) {
        let Z = V[le];
        Z === void 0 && (le === "instanceMatrix" && L.instanceMatrix && (Z = L.instanceMatrix), le === "instanceColor" && L.instanceColor && (Z = L.instanceColor));
        const A = {};
        A.attribute = Z, Z && Z.data && (A.data = Z.data), W[le] = A, K++;
      }
    c.attributes = W, c.attributesNum = K, c.index = X;
  }
  function _() {
    const L = c.newAttributes;
    for (let N = 0, k = L.length; N < k; N++)
      L[N] = 0;
  }
  function w(L) {
    D(L, 0);
  }
  function D(L, N) {
    const k = c.newAttributes, X = c.enabledAttributes, W = c.attributeDivisors;
    k[L] = 1, X[L] === 0 && (i.enableVertexAttribArray(L), X[L] = 1), W[L] !== N && ((n.isWebGL2 ? i : e.get("ANGLE_instanced_arrays"))[n.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](L, N), W[L] = N);
  }
  function C() {
    const L = c.newAttributes, N = c.enabledAttributes;
    for (let k = 0, X = N.length; k < X; k++)
      N[k] !== L[k] && (i.disableVertexAttribArray(k), N[k] = 0);
  }
  function R(L, N, k, X, W, V, K) {
    K === !0 ? i.vertexAttribIPointer(L, N, k, W, V) : i.vertexAttribPointer(L, N, k, X, W, V);
  }
  function q(L, N, k, X) {
    if (n.isWebGL2 === !1 && (L.isInstancedMesh || X.isInstancedBufferGeometry) && e.get("ANGLE_instanced_arrays") === null)
      return;
    _();
    const W = X.attributes, V = k.getAttributes(), K = N.defaultAttributeValues;
    for (const J in V) {
      const le = V[J];
      if (le.location >= 0) {
        let H = W[J];
        if (H === void 0 && (J === "instanceMatrix" && L.instanceMatrix && (H = L.instanceMatrix), J === "instanceColor" && L.instanceColor && (H = L.instanceColor)), H !== void 0) {
          const Z = H.normalized, A = H.itemSize, Q = t.get(H);
          if (Q === void 0) continue;
          const ae = Q.buffer, he = Q.type, Se = Q.bytesPerElement, ge = n.isWebGL2 === !0 && (he === i.INT || he === i.UNSIGNED_INT || H.gpuType === 1013);
          if (H.isInterleavedBufferAttribute) {
            const we = H.data, U = we.stride, je = H.offset;
            if (we.isInstancedInterleavedBuffer) {
              for (let ve = 0; ve < le.locationSize; ve++)
                D(le.location + ve, we.meshPerAttribute);
              L.isInstancedMesh !== !0 && X._maxInstanceCount === void 0 && (X._maxInstanceCount = we.meshPerAttribute * we.count);
            } else
              for (let ve = 0; ve < le.locationSize; ve++)
                w(le.location + ve);
            i.bindBuffer(i.ARRAY_BUFFER, ae);
            for (let ve = 0; ve < le.locationSize; ve++)
              R(
                le.location + ve,
                A / le.locationSize,
                he,
                Z,
                U * Se,
                (je + A / le.locationSize * ve) * Se,
                ge
              );
          } else {
            if (H.isInstancedBufferAttribute) {
              for (let we = 0; we < le.locationSize; we++)
                D(le.location + we, H.meshPerAttribute);
              L.isInstancedMesh !== !0 && X._maxInstanceCount === void 0 && (X._maxInstanceCount = H.meshPerAttribute * H.count);
            } else
              for (let we = 0; we < le.locationSize; we++)
                w(le.location + we);
            i.bindBuffer(i.ARRAY_BUFFER, ae);
            for (let we = 0; we < le.locationSize; we++)
              R(
                le.location + we,
                A / le.locationSize,
                he,
                Z,
                A * Se,
                A / le.locationSize * we * Se,
                ge
              );
          }
        } else if (K !== void 0) {
          const Z = K[J];
          if (Z !== void 0)
            switch (Z.length) {
              case 2:
                i.vertexAttrib2fv(le.location, Z);
                break;
              case 3:
                i.vertexAttrib3fv(le.location, Z);
                break;
              case 4:
                i.vertexAttrib4fv(le.location, Z);
                break;
              default:
                i.vertexAttrib1fv(le.location, Z);
            }
        }
      }
    }
    C();
  }
  function M() {
    Y();
    for (const L in s) {
      const N = s[L];
      for (const k in N) {
        const X = N[k];
        for (const W in X)
          v(X[W].object), delete X[W];
        delete N[k];
      }
      delete s[L];
    }
  }
  function T(L) {
    if (s[L.id] === void 0) return;
    const N = s[L.id];
    for (const k in N) {
      const X = N[k];
      for (const W in X)
        v(X[W].object), delete X[W];
      delete N[k];
    }
    delete s[L.id];
  }
  function z(L) {
    for (const N in s) {
      const k = s[N];
      if (k[L.id] === void 0) continue;
      const X = k[L.id];
      for (const W in X)
        v(X[W].object), delete X[W];
      delete k[L.id];
    }
  }
  function Y() {
    re(), h = !0, c !== o && (c = o, m(c.object));
  }
  function re() {
    o.geometry = null, o.program = null, o.wireframe = !1;
  }
  return {
    setup: d,
    reset: Y,
    resetDefaultState: re,
    dispose: M,
    releaseStatesOfGeometry: T,
    releaseStatesOfProgram: z,
    initAttributes: _,
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
  function o(h, d, f) {
    if (f === 0) return;
    let m, v;
    if (r)
      m = i, v = "drawArraysInstanced";
    else if (m = e.get("ANGLE_instanced_arrays"), v = "drawArraysInstancedANGLE", m === null) {
      console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
      return;
    }
    m[v](a, h, d, f), t.update(d, a, f);
  }
  function c(h, d, f) {
    if (f === 0) return;
    const m = e.get("WEBGL_multi_draw");
    if (m === null)
      for (let v = 0; v < f; v++)
        this.render(h[v], d[v]);
    else {
      m.multiDrawArraysWEBGL(a, h, 0, d, 0, f);
      let v = 0;
      for (let x = 0; x < f; x++)
        v += d[x];
      t.update(v, a, 1);
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
  const c = l || e.has("WEBGL_draw_buffers"), h = t.logarithmicDepthBuffer === !0, d = i.getParameter(i.MAX_TEXTURE_IMAGE_UNITS), f = i.getParameter(i.MAX_VERTEX_TEXTURE_IMAGE_UNITS), m = i.getParameter(i.MAX_TEXTURE_SIZE), v = i.getParameter(i.MAX_CUBE_MAP_TEXTURE_SIZE), x = i.getParameter(i.MAX_VERTEX_ATTRIBS), p = i.getParameter(i.MAX_VERTEX_UNIFORM_VECTORS), u = i.getParameter(i.MAX_VARYING_VECTORS), y = i.getParameter(i.MAX_FRAGMENT_UNIFORM_VECTORS), _ = f > 0, w = l || e.has("OES_texture_float"), D = _ && w, C = l ? i.getParameter(i.MAX_SAMPLES) : 0;
  return {
    isWebGL2: l,
    drawBuffers: c,
    getMaxAnisotropy: r,
    getMaxPrecision: a,
    precision: s,
    logarithmicDepthBuffer: h,
    maxTextures: d,
    maxVertexTextures: f,
    maxTextureSize: m,
    maxCubemapSize: v,
    maxAttributes: x,
    maxVertexUniforms: p,
    maxVaryings: u,
    maxFragmentUniforms: y,
    vertexTextures: _,
    floatFragmentTextures: w,
    floatVertexTextures: D,
    maxSamples: C
  };
}
function Nl(i) {
  const e = this;
  let t = null, n = 0, r = !1, a = !1;
  const l = new nn(), s = new Be(), o = { value: null, needsUpdate: !1 };
  this.uniform = o, this.numPlanes = 0, this.numIntersection = 0, this.init = function(d, f) {
    const m = d.length !== 0 || f || // enable state of previous frame - the clipping code has to
    // run another frame in order to reset the state:
    n !== 0 || r;
    return r = f, n = d.length, m;
  }, this.beginShadows = function() {
    a = !0, h(null);
  }, this.endShadows = function() {
    a = !1;
  }, this.setGlobalState = function(d, f) {
    t = h(d, f, 0);
  }, this.setState = function(d, f, m) {
    const v = d.clippingPlanes, x = d.clipIntersection, p = d.clipShadows, u = i.get(d);
    if (!r || v === null || v.length === 0 || a && !p)
      a ? h(null) : c();
    else {
      const y = a ? 0 : n, _ = y * 4;
      let w = u.clippingState || null;
      o.value = w, w = h(v, f, _, m);
      for (let D = 0; D !== _; ++D)
        w[D] = t[D];
      u.clippingState = w, this.numIntersection = x ? this.numPlanes : 0, this.numPlanes += y;
    }
  };
  function c() {
    o.value !== t && (o.value = t, o.needsUpdate = n > 0), e.numPlanes = n, e.numIntersection = 0;
  }
  function h(d, f, m, v) {
    const x = d !== null ? d.length : 0;
    let p = null;
    if (x !== 0) {
      if (p = o.value, v !== !0 || p === null) {
        const u = m + x * 4, y = f.matrixWorldInverse;
        s.getNormalMatrix(y), (p === null || p.length < u) && (p = new Float32Array(u));
        for (let _ = 0, w = m; _ !== x; ++_, w += 4)
          l.copy(d[_]).applyMatrix4(y, s), l.normal.toArray(p, w), p[w + 3] = l.constant;
      }
      o.value = p, o.needsUpdate = !0;
    }
    return e.numPlanes = x, e.numIntersection = 0, p;
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
  /* @__PURE__ */ new B(1, 1, 1),
  /* @__PURE__ */ new B(-1, 1, 1),
  /* @__PURE__ */ new B(1, 1, -1),
  /* @__PURE__ */ new B(-1, 1, -1),
  /* @__PURE__ */ new B(0, rn, Mn),
  /* @__PURE__ */ new B(0, rn, -Mn),
  /* @__PURE__ */ new B(Mn, 0, rn),
  /* @__PURE__ */ new B(-Mn, 0, rn),
  /* @__PURE__ */ new B(rn, Mn, 0),
  /* @__PURE__ */ new B(-rn, Mn, 0)
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
    const s = new Lt(90, 1, t, n), o = [1, -1, 1, 1, 1, 1], c = [1, 1, 1, -1, -1, -1], h = this._renderer, d = h.autoClear, f = h.toneMapping;
    h.getClearColor(Lr), h.toneMapping = 0, h.autoClear = !1;
    const m = new ia({
      name: "PMREM.Background",
      side: 1,
      depthWrite: !1,
      depthTest: !1
    }), v = new Pt(new Gn(), m);
    let x = !1;
    const p = e.background;
    p ? p.isColor && (m.color.copy(p), e.background = null, x = !0) : (m.color.copy(Lr), x = !0);
    for (let u = 0; u < 6; u++) {
      const y = u % 3;
      y === 0 ? (s.up.set(0, o[u], 0), s.lookAt(c[u], 0, 0)) : y === 1 ? (s.up.set(0, 0, o[u]), s.lookAt(0, c[u], 0)) : (s.up.set(0, o[u], 0), s.lookAt(0, 0, c[u]));
      const _ = this._cubeSize;
      ci(r, y * _, u > 2 ? _ : 0, _, _), h.setRenderTarget(r), x && h.render(v, s), h.render(e, s);
    }
    v.geometry.dispose(), v.material.dispose(), h.toneMapping = f, h.autoClear = d, e.background = p;
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
    const h = 3, d = new Pt(this._lodPlanes[r], c), f = c.uniforms, m = this._sizeLods[n] - 1, v = isFinite(a) ? Math.PI / (2 * m) : 2 * Math.PI / (2 * an - 1), x = a / v, p = isFinite(a) ? 1 + Math.floor(h * x) : an;
    p > an && console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${p} samples when the maximum is set to ${an}`);
    const u = [];
    let y = 0;
    for (let R = 0; R < an; ++R) {
      const q = R / x, M = Math.exp(-q * q / 2);
      u.push(M), R === 0 ? y += M : R < p && (y += 2 * M);
    }
    for (let R = 0; R < u.length; R++)
      u[R] = u[R] / y;
    f.envMap.value = e.texture, f.samples.value = p, f.weights.value = u, f.latitudinal.value = l === "latitudinal", s && (f.poleAxis.value = s);
    const { _lodMax: _ } = this;
    f.dTheta.value = v, f.mipInt.value = _ - n;
    const w = this._sizeLods[r], D = 3 * w * (r > _ - En ? r - _ + En : 0), C = 4 * (this._cubeSize - w);
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
    const c = 1 / (s - 2), h = -c, d = 1 + c, f = [h, h, d, h, d, d, h, h, d, d, h, d], m = 6, v = 6, x = 3, p = 2, u = 1, y = new Float32Array(x * v * m), _ = new Float32Array(p * v * m), w = new Float32Array(u * v * m);
    for (let C = 0; C < m; C++) {
      const R = C % 3 * 2 / 3 - 1, q = C > 2 ? 0 : -1, M = [
        R,
        q,
        0,
        R + 2 / 3,
        q,
        0,
        R + 2 / 3,
        q + 1,
        0,
        R,
        q,
        0,
        R + 2 / 3,
        q + 1,
        0,
        R,
        q + 1,
        0
      ];
      y.set(M, x * v * C), _.set(f, p * v * C);
      const T = [C, C, C, C, C, C];
      w.set(T, u * v * C);
    }
    const D = new Zt();
    D.setAttribute("position", new Dt(y, x)), D.setAttribute("uv", new Dt(_, p)), D.setAttribute("faceIndex", new Dt(w, u)), e.push(D), r > En && r--;
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
  const n = new Float32Array(an), r = new B(0, 1, 0);
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
              const f = c ? t.fromEquirectangular(s) : t.fromCubemap(s);
              return e.set(s, f), s.addEventListener("dispose", a), f.texture;
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
    const f = d.target;
    f.index !== null && e.remove(f.index);
    for (const v in f.attributes)
      e.remove(f.attributes[v]);
    for (const v in f.morphAttributes) {
      const x = f.morphAttributes[v];
      for (let p = 0, u = x.length; p < u; p++)
        e.remove(x[p]);
    }
    f.removeEventListener("dispose", l), delete r[f.id];
    const m = a.get(f);
    m && (e.remove(m), a.delete(f)), n.releaseStatesOfGeometry(f), f.isInstancedBufferGeometry === !0 && delete f._maxInstanceCount, t.memory.geometries--;
  }
  function s(d, f) {
    return r[f.id] === !0 || (f.addEventListener("dispose", l), r[f.id] = !0, t.memory.geometries++), f;
  }
  function o(d) {
    const f = d.attributes;
    for (const v in f)
      e.update(f[v], i.ARRAY_BUFFER);
    const m = d.morphAttributes;
    for (const v in m) {
      const x = m[v];
      for (let p = 0, u = x.length; p < u; p++)
        e.update(x[p], i.ARRAY_BUFFER);
    }
  }
  function c(d) {
    const f = [], m = d.index, v = d.attributes.position;
    let x = 0;
    if (m !== null) {
      const y = m.array;
      x = m.version;
      for (let _ = 0, w = y.length; _ < w; _ += 3) {
        const D = y[_ + 0], C = y[_ + 1], R = y[_ + 2];
        f.push(D, C, C, R, R, D);
      }
    } else if (v !== void 0) {
      const y = v.array;
      x = v.version;
      for (let _ = 0, w = y.length / 3 - 1; _ < w; _ += 3) {
        const D = _ + 0, C = _ + 1, R = _ + 2;
        f.push(D, C, C, R, R, D);
      }
    } else
      return;
    const p = new ($r(f) ? aa : ra)(f, 1);
    p.version = x;
    const u = a.get(d);
    u && e.remove(u), a.set(d, p);
  }
  function h(d) {
    const f = a.get(d);
    if (f) {
      const m = d.index;
      m !== null && f.version < m.version && c(d);
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
  function h(m, v) {
    i.drawElements(a, v, s, m * o), t.update(v, a, 1);
  }
  function d(m, v, x) {
    if (x === 0) return;
    let p, u;
    if (r)
      p = i, u = "drawElementsInstanced";
    else if (p = e.get("ANGLE_instanced_arrays"), u = "drawElementsInstancedANGLE", p === null) {
      console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
      return;
    }
    p[u](a, v, s, m * o, x), t.update(v, a, x);
  }
  function f(m, v, x) {
    if (x === 0) return;
    const p = e.get("WEBGL_multi_draw");
    if (p === null)
      for (let u = 0; u < x; u++)
        this.render(m[u] / o, v[u]);
    else {
      p.multiDrawElementsWEBGL(a, v, 0, s, m, 0, x);
      let u = 0;
      for (let y = 0; y < x; y++)
        u += v[y];
      t.update(u, a, 1);
    }
  }
  this.setMode = l, this.setIndex = c, this.render = h, this.renderInstances = d, this.renderMultiDraw = f;
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
    const f = c.morphTargetInfluences;
    if (e.isWebGL2 === !0) {
      const m = h.morphAttributes.position || h.morphAttributes.normal || h.morphAttributes.color, v = m !== void 0 ? m.length : 0;
      let x = a.get(h);
      if (x === void 0 || x.count !== v) {
        let L = function() {
          Y.dispose(), a.delete(h), h.removeEventListener("dispose", L);
        };
        x !== void 0 && x.texture.dispose();
        const y = h.morphAttributes.position !== void 0, _ = h.morphAttributes.normal !== void 0, w = h.morphAttributes.color !== void 0, D = h.morphAttributes.position || [], C = h.morphAttributes.normal || [], R = h.morphAttributes.color || [];
        let q = 0;
        y === !0 && (q = 1), _ === !0 && (q = 2), w === !0 && (q = 3);
        let M = h.attributes.position.count * q, T = 1;
        M > e.maxTextureSize && (T = Math.ceil(M / e.maxTextureSize), M = e.maxTextureSize);
        const z = new Float32Array(M * T * 4 * v), Y = new ea(z, M, T, v);
        Y.type = 1015, Y.needsUpdate = !0;
        const re = q * 4;
        for (let N = 0; N < v; N++) {
          const k = D[N], X = C[N], W = R[N], V = M * T * 4 * N;
          for (let K = 0; K < k.count; K++) {
            const J = K * re;
            y === !0 && (l.fromBufferAttribute(k, K), z[V + J + 0] = l.x, z[V + J + 1] = l.y, z[V + J + 2] = l.z, z[V + J + 3] = 0), _ === !0 && (l.fromBufferAttribute(X, K), z[V + J + 4] = l.x, z[V + J + 5] = l.y, z[V + J + 6] = l.z, z[V + J + 7] = 0), w === !0 && (l.fromBufferAttribute(W, K), z[V + J + 8] = l.x, z[V + J + 9] = l.y, z[V + J + 10] = l.z, z[V + J + 11] = W.itemSize === 4 ? l.w : 1);
          }
        }
        x = {
          count: v,
          texture: Y,
          size: new He(M, T)
        }, a.set(h, x), h.addEventListener("dispose", L);
      }
      let p = 0;
      for (let y = 0; y < f.length; y++)
        p += f[y];
      const u = h.morphTargetsRelative ? 1 : 1 - p;
      d.getUniforms().setValue(i, "morphTargetBaseInfluence", u), d.getUniforms().setValue(i, "morphTargetInfluences", f), d.getUniforms().setValue(i, "morphTargetsTexture", x.texture, t), d.getUniforms().setValue(i, "morphTargetsTextureSize", x.size);
    } else {
      const m = f === void 0 ? 0 : f.length;
      let v = n[h.id];
      if (v === void 0 || v.length !== m) {
        v = [];
        for (let _ = 0; _ < m; _++)
          v[_] = [_, 0];
        n[h.id] = v;
      }
      for (let _ = 0; _ < m; _++) {
        const w = v[_];
        w[0] = _, w[1] = f[_];
      }
      v.sort(ql);
      for (let _ = 0; _ < 8; _++)
        _ < m && v[_][1] ? (s[_][0] = v[_][0], s[_][1] = v[_][1]) : (s[_][0] = Number.MAX_SAFE_INTEGER, s[_][1] = 0);
      s.sort(Xl);
      const x = h.morphAttributes.position, p = h.morphAttributes.normal;
      let u = 0;
      for (let _ = 0; _ < 8; _++) {
        const w = s[_], D = w[0], C = w[1];
        D !== Number.MAX_SAFE_INTEGER && C ? (x && h.getAttribute("morphTarget" + _) !== x[D] && h.setAttribute("morphTarget" + _, x[D]), p && h.getAttribute("morphNormal" + _) !== p[D] && h.setAttribute("morphNormal" + _, p[D]), r[_] = C, u += C) : (x && h.hasAttribute("morphTarget" + _) === !0 && h.deleteAttribute("morphTarget" + _), p && h.hasAttribute("morphNormal" + _) === !0 && h.deleteAttribute("morphNormal" + _), r[_] = 0);
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
      const f = o.skeleton;
      r.get(f) !== c && (f.update(), r.set(f, c));
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
function nt(i, e) {
  if (i.length !== e.length) return !1;
  for (let t = 0, n = i.length; t < n; t++)
    if (i[t] !== e[t]) return !1;
  return !0;
}
function it(i, e) {
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
    if (nt(t, e)) return;
    i.uniform2fv(this.addr, e), it(t, e);
  }
}
function $l(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3f(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else if (e.r !== void 0)
    (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) && (i.uniform3f(this.addr, e.r, e.g, e.b), t[0] = e.r, t[1] = e.g, t[2] = e.b);
  else {
    if (nt(t, e)) return;
    i.uniform3fv(this.addr, e), it(t, e);
  }
}
function Jl(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4f(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (nt(t, e)) return;
    i.uniform4fv(this.addr, e), it(t, e);
  }
}
function Ql(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (nt(t, e)) return;
    i.uniformMatrix2fv(this.addr, !1, e), it(t, e);
  } else {
    if (nt(t, n)) return;
    Hr.set(n), i.uniformMatrix2fv(this.addr, !1, Hr), it(t, n);
  }
}
function ec(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (nt(t, e)) return;
    i.uniformMatrix3fv(this.addr, !1, e), it(t, e);
  } else {
    if (nt(t, n)) return;
    Gr.set(n), i.uniformMatrix3fv(this.addr, !1, Gr), it(t, n);
  }
}
function tc(i, e) {
  const t = this.cache, n = e.elements;
  if (n === void 0) {
    if (nt(t, e)) return;
    i.uniformMatrix4fv(this.addr, !1, e), it(t, e);
  } else {
    if (nt(t, n)) return;
    Br.set(n), i.uniformMatrix4fv(this.addr, !1, Br), it(t, n);
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
    if (nt(t, e)) return;
    i.uniform2iv(this.addr, e), it(t, e);
  }
}
function rc(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3i(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (nt(t, e)) return;
    i.uniform3iv(this.addr, e), it(t, e);
  }
}
function ac(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4i(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (nt(t, e)) return;
    i.uniform4iv(this.addr, e), it(t, e);
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
    if (nt(t, e)) return;
    i.uniform2uiv(this.addr, e), it(t, e);
  }
}
function lc(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) && (i.uniform3ui(this.addr, e.x, e.y, e.z), t[0] = e.x, t[1] = e.y, t[2] = e.z);
  else {
    if (nt(t, e)) return;
    i.uniform3uiv(this.addr, e), it(t, e);
  }
}
function cc(i, e) {
  const t = this.cache;
  if (e.x !== void 0)
    (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) && (i.uniform4ui(this.addr, e.x, e.y, e.z, e.w), t[0] = e.x, t[1] = e.y, t[2] = e.z, t[3] = e.w);
  else {
    if (nt(t, e)) return;
    i.uniform4uiv(this.addr, e), it(t, e);
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
  nt(n, a) || (i.uniform1iv(this.addr, a), it(n, a));
  for (let l = 0; l !== r; ++l)
    t.setTexture2D(e[l] || da, a[l]);
}
function Pc(i, e, t) {
  const n = this.cache, r = e.length, a = Si(t, r);
  nt(n, a) || (i.uniform1iv(this.addr, a), it(n, a));
  for (let l = 0; l !== r; ++l)
    t.setTexture3D(e[l] || _a, a[l]);
}
function Dc(i, e, t) {
  const n = this.cache, r = e.length, a = Si(t, r);
  nt(n, a) || (i.uniform1iv(this.addr, a), it(n, a));
  for (let l = 0; l !== r; ++l)
    t.setTextureCube(e[l] || ga, a[l]);
}
function Uc(i, e, t) {
  const n = this.cache, r = e.length, a = Si(t, r);
  nt(n, a) || (i.uniform1iv(this.addr, a), it(n, a));
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
  let t = De[e];
  if (t === void 0) {
    const n = jc.get(e);
    if (n !== void 0)
      t = De[n], console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.', e, n);
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
  const o = eu(t), c = tu(t), h = nu(t), d = iu(t), f = ru(t), m = t.isWebGL2 ? "" : Xc(t), v = qc(t), x = Yc(a), p = r.createProgram();
  let u, y, _ = t.glslVersion ? "#version " + t.glslVersion + `
` : "";
  t.isRawShaderMaterial ? (u = [
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    x
  ].filter(Tn).join(`
`), u.length > 0 && (u += `
`), y = [
    m,
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    x
  ].filter(Tn).join(`
`), y.length > 0 && (y += `
`)) : (u = [
    Yr(t),
    "#define SHADER_TYPE " + t.shaderType,
    "#define SHADER_NAME " + t.shaderName,
    x,
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
    x,
    t.useFog && t.fog ? "#define USE_FOG" : "",
    t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "",
    t.map ? "#define USE_MAP" : "",
    t.matcap ? "#define USE_MATCAP" : "",
    t.envMap ? "#define USE_ENVMAP" : "",
    t.envMap ? "#define " + c : "",
    t.envMap ? "#define " + h : "",
    t.envMap ? "#define " + d : "",
    f ? "#define CUBEUV_TEXEL_WIDTH " + f.texelWidth : "",
    f ? "#define CUBEUV_TEXEL_HEIGHT " + f.texelHeight : "",
    f ? "#define CUBEUV_MAX_MIP " + f.maxMip + ".0" : "",
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
    t.toneMapping !== 0 ? De.tonemapping_pars_fragment : "",
    // this code is required here because it is used by the toneMapping() function defined below
    t.toneMapping !== 0 ? Wc("toneMapping", t.toneMapping) : "",
    t.dithering ? "#define DITHERING" : "",
    t.opaque ? "#define OPAQUE" : "",
    De.colorspace_pars_fragment,
    // this code is required here because it is used by the various encoding/decoding function defined below
    kc("linearToOutputTexel", t.outputColorSpace),
    t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "",
    `
`
  ].filter(Tn).join(`
`)), l = tr(l), l = Wr(l, t), l = Xr(l, t), s = tr(s), s = Wr(s, t), s = Xr(s, t), l = qr(l), s = qr(s), t.isWebGL2 && t.isRawShaderMaterial !== !0 && (_ = `#version 300 es
`, u = [
    v,
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
  const w = _ + u + l, D = _ + y + s, C = Vr(r, r.VERTEX_SHADER, w), R = Vr(r, r.FRAGMENT_SHADER, D);
  r.attachShader(p, C), r.attachShader(p, R), t.index0AttributeName !== void 0 ? r.bindAttribLocation(p, 0, t.index0AttributeName) : t.morphTargets === !0 && r.bindAttribLocation(p, 0, "position"), r.linkProgram(p);
  function q(Y) {
    if (i.debug.checkShaderErrors) {
      const re = r.getProgramInfoLog(p).trim(), L = r.getShaderInfoLog(C).trim(), N = r.getShaderInfoLog(R).trim();
      let k = !0, X = !0;
      if (r.getProgramParameter(p, r.LINK_STATUS) === !1)
        if (k = !1, typeof i.debug.onShaderError == "function")
          i.debug.onShaderError(r, p, C, R);
        else {
          const W = kr(r, C, "vertex"), V = kr(r, R, "fragment");
          console.error(
            "THREE.WebGLProgram: Shader Error " + r.getError() + " - VALIDATE_STATUS " + r.getProgramParameter(p, r.VALIDATE_STATUS) + `

Program Info Log: ` + re + `
` + W + `
` + V
          );
        }
      else re !== "" ? console.warn("THREE.WebGLProgram: Program Info Log:", re) : (L === "" || N === "") && (X = !1);
      X && (Y.diagnostics = {
        runnable: k,
        programLog: re,
        vertexShader: {
          log: L,
          prefix: u
        },
        fragmentShader: {
          log: N,
          prefix: y
        }
      });
    }
    r.deleteShader(C), r.deleteShader(R), M = new hi(r, p), T = Kc(r, p);
  }
  let M;
  this.getUniforms = function() {
    return M === void 0 && q(this), M;
  };
  let T;
  this.getAttributes = function() {
    return T === void 0 && q(this), T;
  };
  let z = t.rendererExtensionParallelShaderCompile === !1;
  return this.isReady = function() {
    return z === !1 && (z = r.getProgramParameter(p, Gc)), z;
  }, this.destroy = function() {
    n.releaseStatesOfProgram(this), r.deleteProgram(p), this.program = void 0;
  }, this.type = t.shaderType, this.name = t.shaderName, this.id = Hc++, this.cacheKey = e, this.usedTimes = 1, this.program = p, this.vertexShader = C, this.fragmentShader = R, this;
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
  const s = new ta(), o = new ou(), c = [], h = r.isWebGL2, d = r.logarithmicDepthBuffer, f = r.vertexTextures;
  let m = r.precision;
  const v = {
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
  function x(M) {
    return M === 0 ? "uv" : `uv${M}`;
  }
  function p(M, T, z, Y, re) {
    const L = Y.fog, N = re.geometry, k = M.isMeshStandardMaterial ? Y.environment : null, X = (M.isMeshStandardMaterial ? t : e).get(M.envMap || k), W = X && X.mapping === 306 ? X.image.height : null, V = v[M.type];
    M.precision !== null && (m = r.getMaxPrecision(M.precision), m !== M.precision && console.warn("THREE.WebGLProgram.getParameters:", M.precision, "not supported, using", m, "instead."));
    const K = N.morphAttributes.position || N.morphAttributes.normal || N.morphAttributes.color, J = K !== void 0 ? K.length : 0;
    let le = 0;
    N.morphAttributes.position !== void 0 && (le = 1), N.morphAttributes.normal !== void 0 && (le = 2), N.morphAttributes.color !== void 0 && (le = 3);
    let H, Z, A, Q;
    if (V) {
      const dt = Ft[V];
      H = dt.vertexShader, Z = dt.fragmentShader;
    } else
      H = M.vertexShader, Z = M.fragmentShader, o.update(M), A = o.getVertexShaderID(M), Q = o.getFragmentShaderID(M);
    const ae = i.getRenderTarget(), he = re.isInstancedMesh === !0, Se = re.isBatchedMesh === !0, ge = !!M.map, we = !!M.matcap, U = !!X, je = !!M.aoMap, ve = !!M.lightMap, be = !!M.bumpMap, pe = !!M.normalMap, Xe = !!M.displacementMap, Ue = !!M.emissiveMap, E = !!M.metalnessMap, g = !!M.roughnessMap, I = M.anisotropy > 0, ee = M.clearcoat > 0, $ = M.iridescence > 0, te = M.sheen > 0, me = M.transmission > 0, ce = I && !!M.anisotropyMap, fe = ee && !!M.clearcoatMap, Te = ee && !!M.clearcoatNormalMap, Fe = ee && !!M.clearcoatRoughnessMap, j = $ && !!M.iridescenceMap, Ve = $ && !!M.iridescenceThicknessMap, Ge = te && !!M.sheenColorMap, Re = te && !!M.sheenRoughnessMap, xe = !!M.specularMap, de = !!M.specularColorMap, Pe = !!M.specularIntensityMap, ze = me && !!M.transmissionMap, Je = me && !!M.thicknessMap, Ne = !!M.gradientMap, ne = !!M.alphaMap, b = M.alphaTest > 0, se = !!M.alphaHash, oe = !!M.extensions, ye = !!N.attributes.uv1, Me = !!N.attributes.uv2, qe = !!N.attributes.uv3;
    let Ye = 0;
    return M.toneMapped && (ae === null || ae.isXRRenderTarget === !0) && (Ye = i.toneMapping), {
      isWebGL2: h,
      shaderID: V,
      shaderType: M.type,
      shaderName: M.name,
      vertexShader: H,
      fragmentShader: Z,
      defines: M.defines,
      customVertexShaderID: A,
      customFragmentShaderID: Q,
      isRawShaderMaterial: M.isRawShaderMaterial === !0,
      glslVersion: M.glslVersion,
      precision: m,
      batching: Se,
      instancing: he,
      instancingColor: he && re.instanceColor !== null,
      supportsVertexTextures: f,
      outputColorSpace: ae === null ? i.outputColorSpace : ae.isXRRenderTarget === !0 ? ae.texture.colorSpace : zt,
      map: ge,
      matcap: we,
      envMap: U,
      envMapMode: U && X.mapping,
      envMapCubeUVHeight: W,
      aoMap: je,
      lightMap: ve,
      bumpMap: be,
      normalMap: pe,
      displacementMap: f && Xe,
      emissiveMap: Ue,
      normalMapObjectSpace: pe && M.normalMapType === 1,
      normalMapTangentSpace: pe && M.normalMapType === 0,
      metalnessMap: E,
      roughnessMap: g,
      anisotropy: I,
      anisotropyMap: ce,
      clearcoat: ee,
      clearcoatMap: fe,
      clearcoatNormalMap: Te,
      clearcoatRoughnessMap: Fe,
      iridescence: $,
      iridescenceMap: j,
      iridescenceThicknessMap: Ve,
      sheen: te,
      sheenColorMap: Ge,
      sheenRoughnessMap: Re,
      specularMap: xe,
      specularColorMap: de,
      specularIntensityMap: Pe,
      transmission: me,
      transmissionMap: ze,
      thicknessMap: Je,
      gradientMap: Ne,
      opaque: M.transparent === !1 && M.blending === 1,
      alphaMap: ne,
      alphaTest: b,
      alphaHash: se,
      combine: M.combine,
      //
      mapUv: ge && x(M.map.channel),
      aoMapUv: je && x(M.aoMap.channel),
      lightMapUv: ve && x(M.lightMap.channel),
      bumpMapUv: be && x(M.bumpMap.channel),
      normalMapUv: pe && x(M.normalMap.channel),
      displacementMapUv: Xe && x(M.displacementMap.channel),
      emissiveMapUv: Ue && x(M.emissiveMap.channel),
      metalnessMapUv: E && x(M.metalnessMap.channel),
      roughnessMapUv: g && x(M.roughnessMap.channel),
      anisotropyMapUv: ce && x(M.anisotropyMap.channel),
      clearcoatMapUv: fe && x(M.clearcoatMap.channel),
      clearcoatNormalMapUv: Te && x(M.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: Fe && x(M.clearcoatRoughnessMap.channel),
      iridescenceMapUv: j && x(M.iridescenceMap.channel),
      iridescenceThicknessMapUv: Ve && x(M.iridescenceThicknessMap.channel),
      sheenColorMapUv: Ge && x(M.sheenColorMap.channel),
      sheenRoughnessMapUv: Re && x(M.sheenRoughnessMap.channel),
      specularMapUv: xe && x(M.specularMap.channel),
      specularColorMapUv: de && x(M.specularColorMap.channel),
      specularIntensityMapUv: Pe && x(M.specularIntensityMap.channel),
      transmissionMapUv: ze && x(M.transmissionMap.channel),
      thicknessMapUv: Je && x(M.thicknessMap.channel),
      alphaMapUv: ne && x(M.alphaMap.channel),
      //
      vertexTangents: !!N.attributes.tangent && (pe || I),
      vertexColors: M.vertexColors,
      vertexAlphas: M.vertexColors === !0 && !!N.attributes.color && N.attributes.color.itemSize === 4,
      vertexUv1s: ye,
      vertexUv2s: Me,
      vertexUv3s: qe,
      pointsUvs: re.isPoints === !0 && !!N.attributes.uv && (ge || ne),
      fog: !!L,
      useFog: M.fog === !0,
      fogExp2: L && L.isFogExp2,
      flatShading: M.flatShading === !0,
      sizeAttenuation: M.sizeAttenuation === !0,
      logarithmicDepthBuffer: d,
      skinning: re.isSkinnedMesh === !0,
      morphTargets: N.morphAttributes.position !== void 0,
      morphNormals: N.morphAttributes.normal !== void 0,
      morphColors: N.morphAttributes.color !== void 0,
      morphTargetsCount: J,
      morphTextureStride: le,
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
      toneMapping: Ye,
      useLegacyLights: i._useLegacyLights,
      decodeVideoTexture: ge && M.map.isVideoTexture === !0 && ke.getTransfer(M.map.colorSpace) === Ze,
      premultipliedAlpha: M.premultipliedAlpha,
      doubleSided: M.side === 2,
      flipSided: M.side === 1,
      useDepthPacking: M.depthPacking >= 0,
      depthPacking: M.depthPacking || 0,
      index0AttributeName: M.index0AttributeName,
      extensionDerivatives: oe && M.extensions.derivatives === !0,
      extensionFragDepth: oe && M.extensions.fragDepth === !0,
      extensionDrawBuffers: oe && M.extensions.drawBuffers === !0,
      extensionShaderTextureLOD: oe && M.extensions.shaderTextureLOD === !0,
      extensionClipCullDistance: oe && M.extensions.clipCullDistance && n.has("WEBGL_clip_cull_distance"),
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
    return M.isRawShaderMaterial === !1 && (y(T, M), _(T, M), T.push(i.outputColorSpace)), T.push(M.customProgramCacheKey), T.join();
  }
  function y(M, T) {
    M.push(T.precision), M.push(T.outputColorSpace), M.push(T.envMapMode), M.push(T.envMapCubeUVHeight), M.push(T.mapUv), M.push(T.alphaMapUv), M.push(T.lightMapUv), M.push(T.aoMapUv), M.push(T.bumpMapUv), M.push(T.normalMapUv), M.push(T.displacementMapUv), M.push(T.emissiveMapUv), M.push(T.metalnessMapUv), M.push(T.roughnessMapUv), M.push(T.anisotropyMapUv), M.push(T.clearcoatMapUv), M.push(T.clearcoatNormalMapUv), M.push(T.clearcoatRoughnessMapUv), M.push(T.iridescenceMapUv), M.push(T.iridescenceThicknessMapUv), M.push(T.sheenColorMapUv), M.push(T.sheenRoughnessMapUv), M.push(T.specularMapUv), M.push(T.specularColorMapUv), M.push(T.specularIntensityMapUv), M.push(T.transmissionMapUv), M.push(T.thicknessMapUv), M.push(T.combine), M.push(T.fogExp2), M.push(T.sizeAttenuation), M.push(T.morphTargetsCount), M.push(T.morphAttributeCount), M.push(T.numDirLights), M.push(T.numPointLights), M.push(T.numSpotLights), M.push(T.numSpotLightMaps), M.push(T.numHemiLights), M.push(T.numRectAreaLights), M.push(T.numDirLightShadows), M.push(T.numPointLightShadows), M.push(T.numSpotLightShadows), M.push(T.numSpotLightShadowsWithMaps), M.push(T.numLightProbes), M.push(T.shadowMapType), M.push(T.toneMapping), M.push(T.numClippingPlanes), M.push(T.numClipIntersection), M.push(T.depthPacking);
  }
  function _(M, T) {
    s.disableAll(), T.isWebGL2 && s.enable(0), T.supportsVertexTextures && s.enable(1), T.instancing && s.enable(2), T.instancingColor && s.enable(3), T.matcap && s.enable(4), T.envMap && s.enable(5), T.normalMapObjectSpace && s.enable(6), T.normalMapTangentSpace && s.enable(7), T.clearcoat && s.enable(8), T.iridescence && s.enable(9), T.alphaTest && s.enable(10), T.vertexColors && s.enable(11), T.vertexAlphas && s.enable(12), T.vertexUv1s && s.enable(13), T.vertexUv2s && s.enable(14), T.vertexUv3s && s.enable(15), T.vertexTangents && s.enable(16), T.anisotropy && s.enable(17), T.alphaHash && s.enable(18), T.batching && s.enable(19), M.push(s.mask), s.disableAll(), T.fog && s.enable(0), T.useFog && s.enable(1), T.flatShading && s.enable(2), T.logarithmicDepthBuffer && s.enable(3), T.skinning && s.enable(4), T.morphTargets && s.enable(5), T.morphNormals && s.enable(6), T.morphColors && s.enable(7), T.premultipliedAlpha && s.enable(8), T.shadowMapEnabled && s.enable(9), T.useLegacyLights && s.enable(10), T.doubleSided && s.enable(11), T.flipSided && s.enable(12), T.useDepthPacking && s.enable(13), T.dithering && s.enable(14), T.transmission && s.enable(15), T.sheen && s.enable(16), T.opaque && s.enable(17), T.pointsUvs && s.enable(18), T.decodeVideoTexture && s.enable(19), M.push(s.mask);
  }
  function w(M) {
    const T = v[M.type];
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
    for (let Y = 0, re = c.length; Y < re; Y++) {
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
  function q() {
    o.dispose();
  }
  return {
    getParameters: p,
    getProgramCacheKey: u,
    getUniforms: w,
    acquireProgram: D,
    releaseProgram: C,
    releaseShaderCache: R,
    // Exposed for resource monitoring & error feedback via renderer.info:
    programs: c,
    dispose: q
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
  function l(d, f, m, v, x, p) {
    let u = i[e];
    return u === void 0 ? (u = {
      id: d.id,
      object: d,
      geometry: f,
      material: m,
      groupOrder: v,
      renderOrder: d.renderOrder,
      z: x,
      group: p
    }, i[e] = u) : (u.id = d.id, u.object = d, u.geometry = f, u.material = m, u.groupOrder = v, u.renderOrder = d.renderOrder, u.z = x, u.group = p), e++, u;
  }
  function s(d, f, m, v, x, p) {
    const u = l(d, f, m, v, x, p);
    m.transmission > 0 ? n.push(u) : m.transparent === !0 ? r.push(u) : t.push(u);
  }
  function o(d, f, m, v, x, p) {
    const u = l(d, f, m, v, x, p);
    m.transmission > 0 ? n.unshift(u) : m.transparent === !0 ? r.unshift(u) : t.unshift(u);
  }
  function c(d, f) {
    t.length > 1 && t.sort(d || hu), n.length > 1 && n.sort(f || Kr), r.length > 1 && r.sort(f || Kr);
  }
  function h() {
    for (let d = e, f = i.length; d < f; d++) {
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
            direction: new B(),
            color: new We()
          };
          break;
        case "SpotLight":
          t = {
            position: new B(),
            direction: new B(),
            color: new We(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          t = {
            position: new B(),
            color: new We(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          t = {
            direction: new B(),
            skyColor: new We(),
            groundColor: new We()
          };
          break;
        case "RectAreaLight":
          t = {
            color: new We(),
            position: new B(),
            halfWidth: new B(),
            halfHeight: new B()
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
  for (let h = 0; h < 9; h++) r.probe.push(new B());
  const a = new B(), l = new ct(), s = new ct();
  function o(h, d) {
    let f = 0, m = 0, v = 0;
    for (let Y = 0; Y < 9; Y++) r.probe[Y].set(0, 0, 0);
    let x = 0, p = 0, u = 0, y = 0, _ = 0, w = 0, D = 0, C = 0, R = 0, q = 0, M = 0;
    h.sort(_u);
    const T = d === !0 ? Math.PI : 1;
    for (let Y = 0, re = h.length; Y < re; Y++) {
      const L = h[Y], N = L.color, k = L.intensity, X = L.distance, W = L.shadow && L.shadow.map ? L.shadow.map.texture : null;
      if (L.isAmbientLight)
        f += N.r * k * T, m += N.g * k * T, v += N.b * k * T;
      else if (L.isLightProbe) {
        for (let V = 0; V < 9; V++)
          r.probe[V].addScaledVector(L.sh.coefficients[V], k);
        M++;
      } else if (L.isDirectionalLight) {
        const V = t.get(L);
        if (V.color.copy(L.color).multiplyScalar(L.intensity * T), L.castShadow) {
          const K = L.shadow, J = n.get(L);
          J.shadowBias = K.bias, J.shadowNormalBias = K.normalBias, J.shadowRadius = K.radius, J.shadowMapSize = K.mapSize, r.directionalShadow[x] = J, r.directionalShadowMap[x] = W, r.directionalShadowMatrix[x] = L.shadow.matrix, w++;
        }
        r.directional[x] = V, x++;
      } else if (L.isSpotLight) {
        const V = t.get(L);
        V.position.setFromMatrixPosition(L.matrixWorld), V.color.copy(N).multiplyScalar(k * T), V.distance = X, V.coneCos = Math.cos(L.angle), V.penumbraCos = Math.cos(L.angle * (1 - L.penumbra)), V.decay = L.decay, r.spot[u] = V;
        const K = L.shadow;
        if (L.map && (r.spotLightMap[R] = L.map, R++, K.updateMatrices(L), L.castShadow && q++), r.spotLightMatrix[u] = K.matrix, L.castShadow) {
          const J = n.get(L);
          J.shadowBias = K.bias, J.shadowNormalBias = K.normalBias, J.shadowRadius = K.radius, J.shadowMapSize = K.mapSize, r.spotShadow[u] = J, r.spotShadowMap[u] = W, C++;
        }
        u++;
      } else if (L.isRectAreaLight) {
        const V = t.get(L);
        V.color.copy(N).multiplyScalar(k), V.halfWidth.set(L.width * 0.5, 0, 0), V.halfHeight.set(0, L.height * 0.5, 0), r.rectArea[y] = V, y++;
      } else if (L.isPointLight) {
        const V = t.get(L);
        if (V.color.copy(L.color).multiplyScalar(L.intensity * T), V.distance = L.distance, V.decay = L.decay, L.castShadow) {
          const K = L.shadow, J = n.get(L);
          J.shadowBias = K.bias, J.shadowNormalBias = K.normalBias, J.shadowRadius = K.radius, J.shadowMapSize = K.mapSize, J.shadowCameraNear = K.camera.near, J.shadowCameraFar = K.camera.far, r.pointShadow[p] = J, r.pointShadowMap[p] = W, r.pointShadowMatrix[p] = L.shadow.matrix, D++;
        }
        r.point[p] = V, p++;
      } else if (L.isHemisphereLight) {
        const V = t.get(L);
        V.skyColor.copy(L.color).multiplyScalar(k * T), V.groundColor.copy(L.groundColor).multiplyScalar(k * T), r.hemi[_] = V, _++;
      }
    }
    y > 0 && (e.isWebGL2 ? i.has("OES_texture_float_linear") === !0 ? (r.rectAreaLTC1 = ie.LTC_FLOAT_1, r.rectAreaLTC2 = ie.LTC_FLOAT_2) : (r.rectAreaLTC1 = ie.LTC_HALF_1, r.rectAreaLTC2 = ie.LTC_HALF_2) : i.has("OES_texture_float_linear") === !0 ? (r.rectAreaLTC1 = ie.LTC_FLOAT_1, r.rectAreaLTC2 = ie.LTC_FLOAT_2) : i.has("OES_texture_half_float_linear") === !0 ? (r.rectAreaLTC1 = ie.LTC_HALF_1, r.rectAreaLTC2 = ie.LTC_HALF_2) : console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")), r.ambient[0] = f, r.ambient[1] = m, r.ambient[2] = v;
    const z = r.hash;
    (z.directionalLength !== x || z.pointLength !== p || z.spotLength !== u || z.rectAreaLength !== y || z.hemiLength !== _ || z.numDirectionalShadows !== w || z.numPointShadows !== D || z.numSpotShadows !== C || z.numSpotMaps !== R || z.numLightProbes !== M) && (r.directional.length = x, r.spot.length = u, r.rectArea.length = y, r.point.length = p, r.hemi.length = _, r.directionalShadow.length = w, r.directionalShadowMap.length = w, r.pointShadow.length = D, r.pointShadowMap.length = D, r.spotShadow.length = C, r.spotShadowMap.length = C, r.directionalShadowMatrix.length = w, r.pointShadowMatrix.length = D, r.spotLightMatrix.length = C + R - q, r.spotLightMap.length = R, r.numSpotLightShadowsWithMaps = q, r.numLightProbes = M, z.directionalLength = x, z.pointLength = p, z.spotLength = u, z.rectAreaLength = y, z.hemiLength = _, z.numDirectionalShadows = w, z.numPointShadows = D, z.numSpotShadows = C, z.numSpotMaps = R, z.numLightProbes = M, r.version = mu++);
  }
  function c(h, d) {
    let f = 0, m = 0, v = 0, x = 0, p = 0;
    const u = d.matrixWorldInverse;
    for (let y = 0, _ = h.length; y < _; y++) {
      const w = h[y];
      if (w.isDirectionalLight) {
        const D = r.directional[f];
        D.direction.setFromMatrixPosition(w.matrixWorld), a.setFromMatrixPosition(w.target.matrixWorld), D.direction.sub(a), D.direction.transformDirection(u), f++;
      } else if (w.isSpotLight) {
        const D = r.spot[v];
        D.position.setFromMatrixPosition(w.matrixWorld), D.position.applyMatrix4(u), D.direction.setFromMatrixPosition(w.matrixWorld), a.setFromMatrixPosition(w.target.matrixWorld), D.direction.sub(a), D.direction.transformDirection(u), v++;
      } else if (w.isRectAreaLight) {
        const D = r.rectArea[x];
        D.position.setFromMatrixPosition(w.matrixWorld), D.position.applyMatrix4(u), s.identity(), l.copy(w.matrixWorld), l.premultiply(u), s.extractRotation(l), D.halfWidth.set(w.width * 0.5, 0, 0), D.halfHeight.set(0, w.height * 0.5, 0), D.halfWidth.applyMatrix4(s), D.halfHeight.applyMatrix4(s), x++;
      } else if (w.isPointLight) {
        const D = r.point[m];
        D.position.setFromMatrixPosition(w.matrixWorld), D.position.applyMatrix4(u), m++;
      } else if (w.isHemisphereLight) {
        const D = r.hemi[p];
        D.direction.setFromMatrixPosition(w.matrixWorld), D.direction.transformDirection(u), p++;
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
  const r = new He(), a = new He(), l = new lt(), s = new xu({ depthPacking: 3201 }), o = new Su(), c = {}, h = t.maxTextureSize, d = { 0: 1, 1: 0, 2: 2 }, f = new Kt({
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
  }), m = f.clone();
  m.defines.HORIZONTAL_PASS = 1;
  const v = new Zt();
  v.setAttribute(
    "position",
    new Dt(
      new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]),
      3
    )
  );
  const x = new Pt(v, f), p = this;
  this.enabled = !1, this.autoUpdate = !0, this.needsUpdate = !1, this.type = 1;
  let u = this.type;
  this.render = function(C, R, q) {
    if (p.enabled === !1 || p.autoUpdate === !1 && p.needsUpdate === !1 || C.length === 0) return;
    const M = i.getRenderTarget(), T = i.getActiveCubeFace(), z = i.getActiveMipmapLevel(), Y = i.state;
    Y.setBlending(0), Y.buffers.color.setClear(1, 1, 1, 1), Y.buffers.depth.setTest(!0), Y.setScissorTest(!1);
    const re = u !== 3 && this.type === 3, L = u === 3 && this.type !== 3;
    for (let N = 0, k = C.length; N < k; N++) {
      const X = C[N], W = X.shadow;
      if (W === void 0) {
        console.warn("THREE.WebGLShadowMap:", X, "has no shadow.");
        continue;
      }
      if (W.autoUpdate === !1 && W.needsUpdate === !1) continue;
      r.copy(W.mapSize);
      const V = W.getFrameExtents();
      if (r.multiply(V), a.copy(W.mapSize), (r.x > h || r.y > h) && (r.x > h && (a.x = Math.floor(h / V.x), r.x = a.x * V.x, W.mapSize.x = a.x), r.y > h && (a.y = Math.floor(h / V.y), r.y = a.y * V.y, W.mapSize.y = a.y)), W.map === null || re === !0 || L === !0) {
        const J = this.type !== 3 ? { minFilter: 1003, magFilter: 1003 } : {};
        W.map !== null && W.map.dispose(), W.map = new Vt(r.x, r.y, J), W.map.texture.name = X.name + ".shadowMap", W.camera.updateProjectionMatrix();
      }
      i.setRenderTarget(W.map), i.clear();
      const K = W.getViewportCount();
      for (let J = 0; J < K; J++) {
        const le = W.getViewport(J);
        l.set(
          a.x * le.x,
          a.y * le.y,
          a.x * le.z,
          a.y * le.w
        ), Y.viewport(l), W.updateMatrices(X, J), n = W.getFrustum(), w(R, q, W.camera, X, this.type);
      }
      W.isPointLightShadow !== !0 && this.type === 3 && y(W, q), W.needsUpdate = !1;
    }
    u = this.type, p.needsUpdate = !1, i.setRenderTarget(M, T, z);
  };
  function y(C, R) {
    const q = e.update(x);
    f.defines.VSM_SAMPLES !== C.blurSamples && (f.defines.VSM_SAMPLES = C.blurSamples, m.defines.VSM_SAMPLES = C.blurSamples, f.needsUpdate = !0, m.needsUpdate = !0), C.mapPass === null && (C.mapPass = new Vt(r.x, r.y)), f.uniforms.shadow_pass.value = C.map.texture, f.uniforms.resolution.value = C.mapSize, f.uniforms.radius.value = C.radius, i.setRenderTarget(C.mapPass), i.clear(), i.renderBufferDirect(R, null, q, f, x, null), m.uniforms.shadow_pass.value = C.mapPass.texture, m.uniforms.resolution.value = C.mapSize, m.uniforms.radius.value = C.radius, i.setRenderTarget(C.map), i.clear(), i.renderBufferDirect(R, null, q, m, x, null);
  }
  function _(C, R, q, M) {
    let T = null;
    const z = q.isPointLight === !0 ? C.customDistanceMaterial : C.customDepthMaterial;
    if (z !== void 0)
      T = z;
    else if (T = q.isPointLight === !0 ? o : s, i.localClippingEnabled && R.clipShadows === !0 && Array.isArray(R.clippingPlanes) && R.clippingPlanes.length !== 0 || R.displacementMap && R.displacementScale !== 0 || R.alphaMap && R.alphaTest > 0 || R.map && R.alphaTest > 0) {
      const Y = T.uuid, re = R.uuid;
      let L = c[Y];
      L === void 0 && (L = {}, c[Y] = L);
      let N = L[re];
      N === void 0 && (N = T.clone(), L[re] = N, R.addEventListener("dispose", D)), T = N;
    }
    if (T.visible = R.visible, T.wireframe = R.wireframe, M === 3 ? T.side = R.shadowSide !== null ? R.shadowSide : R.side : T.side = R.shadowSide !== null ? R.shadowSide : d[R.side], T.alphaMap = R.alphaMap, T.alphaTest = R.alphaTest, T.map = R.map, T.clipShadows = R.clipShadows, T.clippingPlanes = R.clippingPlanes, T.clipIntersection = R.clipIntersection, T.displacementMap = R.displacementMap, T.displacementScale = R.displacementScale, T.displacementBias = R.displacementBias, T.wireframeLinewidth = R.wireframeLinewidth, T.linewidth = R.linewidth, q.isPointLight === !0 && T.isMeshDistanceMaterial === !0) {
      const Y = i.properties.get(T);
      Y.light = q;
    }
    return T;
  }
  function w(C, R, q, M, T) {
    if (C.visible === !1) return;
    if (C.layers.test(R.layers) && (C.isMesh || C.isLine || C.isPoints) && (C.castShadow || C.receiveShadow && T === 3) && (!C.frustumCulled || n.intersectsObject(C))) {
      C.modelViewMatrix.multiplyMatrices(q.matrixWorldInverse, C.matrixWorld);
      const re = e.update(C), L = C.material;
      if (Array.isArray(L)) {
        const N = re.groups;
        for (let k = 0, X = N.length; k < X; k++) {
          const W = N[k], V = L[W.materialIndex];
          if (V && V.visible) {
            const K = _(C, V, M, T);
            C.onBeforeShadow(i, C, R, q, re, K, W), i.renderBufferDirect(q, null, re, K, C, W), C.onAfterShadow(i, C, R, q, re, K, W);
          }
        }
      } else if (L.visible) {
        const N = _(C, L, M, T);
        C.onBeforeShadow(i, C, R, q, re, N, null), i.renderBufferDirect(q, null, re, N, C, null), C.onAfterShadow(i, C, R, q, re, N, null);
      }
    }
    const Y = C.children;
    for (let re = 0, L = Y.length; re < L; re++)
      w(Y[re], R, q, M, T);
  }
  function D(C) {
    C.target.removeEventListener("dispose", D);
    for (const q in c) {
      const M = c[q], T = C.target.uuid;
      T in M && (M[T].dispose(), delete M[T]);
    }
  }
}
function yu(i, e, t) {
  const n = t.isWebGL2;
  function r() {
    let b = !1;
    const se = new lt();
    let oe = null;
    const ye = new lt(0, 0, 0, 0);
    return {
      setMask: function(Me) {
        oe !== Me && !b && (i.colorMask(Me, Me, Me, Me), oe = Me);
      },
      setLocked: function(Me) {
        b = Me;
      },
      setClear: function(Me, qe, Ye, rt, dt) {
        dt === !0 && (Me *= rt, qe *= rt, Ye *= rt), se.set(Me, qe, Ye, rt), ye.equals(se) === !1 && (i.clearColor(Me, qe, Ye, rt), ye.copy(se));
      },
      reset: function() {
        b = !1, oe = null, ye.set(-1, 0, 0, 0);
      }
    };
  }
  function a() {
    let b = !1, se = null, oe = null, ye = null;
    return {
      setTest: function(Me) {
        Me ? Se(i.DEPTH_TEST) : ge(i.DEPTH_TEST);
      },
      setMask: function(Me) {
        se !== Me && !b && (i.depthMask(Me), se = Me);
      },
      setFunc: function(Me) {
        if (oe !== Me) {
          switch (Me) {
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
          oe = Me;
        }
      },
      setLocked: function(Me) {
        b = Me;
      },
      setClear: function(Me) {
        ye !== Me && (i.clearDepth(Me), ye = Me);
      },
      reset: function() {
        b = !1, se = null, oe = null, ye = null;
      }
    };
  }
  function l() {
    let b = !1, se = null, oe = null, ye = null, Me = null, qe = null, Ye = null, rt = null, dt = null;
    return {
      setTest: function(Ke) {
        b || (Ke ? Se(i.STENCIL_TEST) : ge(i.STENCIL_TEST));
      },
      setMask: function(Ke) {
        se !== Ke && !b && (i.stencilMask(Ke), se = Ke);
      },
      setFunc: function(Ke, pt, Ut) {
        (oe !== Ke || ye !== pt || Me !== Ut) && (i.stencilFunc(Ke, pt, Ut), oe = Ke, ye = pt, Me = Ut);
      },
      setOp: function(Ke, pt, Ut) {
        (qe !== Ke || Ye !== pt || rt !== Ut) && (i.stencilOp(Ke, pt, Ut), qe = Ke, Ye = pt, rt = Ut);
      },
      setLocked: function(Ke) {
        b = Ke;
      },
      setClear: function(Ke) {
        dt !== Ke && (i.clearStencil(Ke), dt = Ke);
      },
      reset: function() {
        b = !1, se = null, oe = null, ye = null, Me = null, qe = null, Ye = null, rt = null, dt = null;
      }
    };
  }
  const s = new r(), o = new a(), c = new l(), h = /* @__PURE__ */ new WeakMap(), d = /* @__PURE__ */ new WeakMap();
  let f = {}, m = {}, v = /* @__PURE__ */ new WeakMap(), x = [], p = null, u = !1, y = null, _ = null, w = null, D = null, C = null, R = null, q = null, M = new We(0, 0, 0), T = 0, z = !1, Y = null, re = null, L = null, N = null, k = null;
  const X = i.getParameter(i.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let W = !1, V = 0;
  const K = i.getParameter(i.VERSION);
  K.indexOf("WebGL") !== -1 ? (V = parseFloat(/^WebGL (\d)/.exec(K)[1]), W = V >= 1) : K.indexOf("OpenGL ES") !== -1 && (V = parseFloat(/^OpenGL ES (\d)/.exec(K)[1]), W = V >= 2);
  let J = null, le = {};
  const H = i.getParameter(i.SCISSOR_BOX), Z = i.getParameter(i.VIEWPORT), A = new lt().fromArray(H), Q = new lt().fromArray(Z);
  function ae(b, se, oe, ye) {
    const Me = new Uint8Array(4), qe = i.createTexture();
    i.bindTexture(b, qe), i.texParameteri(b, i.TEXTURE_MIN_FILTER, i.NEAREST), i.texParameteri(b, i.TEXTURE_MAG_FILTER, i.NEAREST);
    for (let Ye = 0; Ye < oe; Ye++)
      n && (b === i.TEXTURE_3D || b === i.TEXTURE_2D_ARRAY) ? i.texImage3D(se, 0, i.RGBA, 1, 1, ye, 0, i.RGBA, i.UNSIGNED_BYTE, Me) : i.texImage2D(se + Ye, 0, i.RGBA, 1, 1, 0, i.RGBA, i.UNSIGNED_BYTE, Me);
    return qe;
  }
  const he = {};
  he[i.TEXTURE_2D] = ae(i.TEXTURE_2D, i.TEXTURE_2D, 1), he[i.TEXTURE_CUBE_MAP] = ae(i.TEXTURE_CUBE_MAP, i.TEXTURE_CUBE_MAP_POSITIVE_X, 6), n && (he[i.TEXTURE_2D_ARRAY] = ae(i.TEXTURE_2D_ARRAY, i.TEXTURE_2D_ARRAY, 1, 1), he[i.TEXTURE_3D] = ae(i.TEXTURE_3D, i.TEXTURE_3D, 1, 1)), s.setClear(0, 0, 0, 1), o.setClear(1), c.setClear(0), Se(i.DEPTH_TEST), o.setFunc(3), Ue(!1), E(1), Se(i.CULL_FACE), pe(0);
  function Se(b) {
    f[b] !== !0 && (i.enable(b), f[b] = !0);
  }
  function ge(b) {
    f[b] !== !1 && (i.disable(b), f[b] = !1);
  }
  function we(b, se) {
    return m[b] !== se ? (i.bindFramebuffer(b, se), m[b] = se, n && (b === i.DRAW_FRAMEBUFFER && (m[i.FRAMEBUFFER] = se), b === i.FRAMEBUFFER && (m[i.DRAW_FRAMEBUFFER] = se)), !0) : !1;
  }
  function U(b, se) {
    let oe = x, ye = !1;
    if (b)
      if (oe = v.get(se), oe === void 0 && (oe = [], v.set(se, oe)), b.isWebGLMultipleRenderTargets) {
        const Me = b.texture;
        if (oe.length !== Me.length || oe[0] !== i.COLOR_ATTACHMENT0) {
          for (let qe = 0, Ye = Me.length; qe < Ye; qe++)
            oe[qe] = i.COLOR_ATTACHMENT0 + qe;
          oe.length = Me.length, ye = !0;
        }
      } else
        oe[0] !== i.COLOR_ATTACHMENT0 && (oe[0] = i.COLOR_ATTACHMENT0, ye = !0);
    else
      oe[0] !== i.BACK && (oe[0] = i.BACK, ye = !0);
    ye && (t.isWebGL2 ? i.drawBuffers(oe) : e.get("WEBGL_draw_buffers").drawBuffersWEBGL(oe));
  }
  function je(b) {
    return p !== b ? (i.useProgram(b), p = b, !0) : !1;
  }
  const ve = {
    100: i.FUNC_ADD,
    101: i.FUNC_SUBTRACT,
    102: i.FUNC_REVERSE_SUBTRACT
  };
  if (n)
    ve[103] = i.MIN, ve[104] = i.MAX;
  else {
    const b = e.get("EXT_blend_minmax");
    b !== null && (ve[103] = b.MIN_EXT, ve[104] = b.MAX_EXT);
  }
  const be = {
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
  function pe(b, se, oe, ye, Me, qe, Ye, rt, dt, Ke) {
    if (b === 0) {
      u === !0 && (ge(i.BLEND), u = !1);
      return;
    }
    if (u === !1 && (Se(i.BLEND), u = !0), b !== 5) {
      if (b !== y || Ke !== z) {
        if ((_ !== 100 || C !== 100) && (i.blendEquation(i.FUNC_ADD), _ = 100, C = 100), Ke)
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
        w = null, D = null, R = null, q = null, M.set(0, 0, 0), T = 0, y = b, z = Ke;
      }
      return;
    }
    Me = Me || se, qe = qe || oe, Ye = Ye || ye, (se !== _ || Me !== C) && (i.blendEquationSeparate(ve[se], ve[Me]), _ = se, C = Me), (oe !== w || ye !== D || qe !== R || Ye !== q) && (i.blendFuncSeparate(be[oe], be[ye], be[qe], be[Ye]), w = oe, D = ye, R = qe, q = Ye), (rt.equals(M) === !1 || dt !== T) && (i.blendColor(rt.r, rt.g, rt.b, dt), M.copy(rt), T = dt), y = b, z = !1;
  }
  function Xe(b, se) {
    b.side === 2 ? ge(i.CULL_FACE) : Se(i.CULL_FACE);
    let oe = b.side === 1;
    se && (oe = !oe), Ue(oe), b.blending === 1 && b.transparent === !1 ? pe(0) : pe(b.blending, b.blendEquation, b.blendSrc, b.blendDst, b.blendEquationAlpha, b.blendSrcAlpha, b.blendDstAlpha, b.blendColor, b.blendAlpha, b.premultipliedAlpha), o.setFunc(b.depthFunc), o.setTest(b.depthTest), o.setMask(b.depthWrite), s.setMask(b.colorWrite);
    const ye = b.stencilWrite;
    c.setTest(ye), ye && (c.setMask(b.stencilWriteMask), c.setFunc(b.stencilFunc, b.stencilRef, b.stencilFuncMask), c.setOp(b.stencilFail, b.stencilZFail, b.stencilZPass)), I(b.polygonOffset, b.polygonOffsetFactor, b.polygonOffsetUnits), b.alphaToCoverage === !0 ? Se(i.SAMPLE_ALPHA_TO_COVERAGE) : ge(i.SAMPLE_ALPHA_TO_COVERAGE);
  }
  function Ue(b) {
    Y !== b && (b ? i.frontFace(i.CW) : i.frontFace(i.CCW), Y = b);
  }
  function E(b) {
    b !== 0 ? (Se(i.CULL_FACE), b !== re && (b === 1 ? i.cullFace(i.BACK) : b === 2 ? i.cullFace(i.FRONT) : i.cullFace(i.FRONT_AND_BACK))) : ge(i.CULL_FACE), re = b;
  }
  function g(b) {
    b !== L && (W && i.lineWidth(b), L = b);
  }
  function I(b, se, oe) {
    b ? (Se(i.POLYGON_OFFSET_FILL), (N !== se || k !== oe) && (i.polygonOffset(se, oe), N = se, k = oe)) : ge(i.POLYGON_OFFSET_FILL);
  }
  function ee(b) {
    b ? Se(i.SCISSOR_TEST) : ge(i.SCISSOR_TEST);
  }
  function $(b) {
    b === void 0 && (b = i.TEXTURE0 + X - 1), J !== b && (i.activeTexture(b), J = b);
  }
  function te(b, se, oe) {
    oe === void 0 && (J === null ? oe = i.TEXTURE0 + X - 1 : oe = J);
    let ye = le[oe];
    ye === void 0 && (ye = { type: void 0, texture: void 0 }, le[oe] = ye), (ye.type !== b || ye.texture !== se) && (J !== oe && (i.activeTexture(oe), J = oe), i.bindTexture(b, se || he[b]), ye.type = b, ye.texture = se);
  }
  function me() {
    const b = le[J];
    b !== void 0 && b.type !== void 0 && (i.bindTexture(b.type, null), b.type = void 0, b.texture = void 0);
  }
  function ce() {
    try {
      i.compressedTexImage2D.apply(i, arguments);
    } catch (b) {
      console.error("THREE.WebGLState:", b);
    }
  }
  function fe() {
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
  function Fe() {
    try {
      i.texSubImage3D.apply(i, arguments);
    } catch (b) {
      console.error("THREE.WebGLState:", b);
    }
  }
  function j() {
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
  function Ge() {
    try {
      i.texStorage2D.apply(i, arguments);
    } catch (b) {
      console.error("THREE.WebGLState:", b);
    }
  }
  function Re() {
    try {
      i.texStorage3D.apply(i, arguments);
    } catch (b) {
      console.error("THREE.WebGLState:", b);
    }
  }
  function xe() {
    try {
      i.texImage2D.apply(i, arguments);
    } catch (b) {
      console.error("THREE.WebGLState:", b);
    }
  }
  function de() {
    try {
      i.texImage3D.apply(i, arguments);
    } catch (b) {
      console.error("THREE.WebGLState:", b);
    }
  }
  function Pe(b) {
    A.equals(b) === !1 && (i.scissor(b.x, b.y, b.z, b.w), A.copy(b));
  }
  function ze(b) {
    Q.equals(b) === !1 && (i.viewport(b.x, b.y, b.z, b.w), Q.copy(b));
  }
  function Je(b, se) {
    let oe = d.get(se);
    oe === void 0 && (oe = /* @__PURE__ */ new WeakMap(), d.set(se, oe));
    let ye = oe.get(b);
    ye === void 0 && (ye = i.getUniformBlockIndex(se, b.name), oe.set(b, ye));
  }
  function Ne(b, se) {
    const ye = d.get(se).get(b);
    h.get(se) !== ye && (i.uniformBlockBinding(se, ye, b.__bindingPointIndex), h.set(se, ye));
  }
  function ne() {
    i.disable(i.BLEND), i.disable(i.CULL_FACE), i.disable(i.DEPTH_TEST), i.disable(i.POLYGON_OFFSET_FILL), i.disable(i.SCISSOR_TEST), i.disable(i.STENCIL_TEST), i.disable(i.SAMPLE_ALPHA_TO_COVERAGE), i.blendEquation(i.FUNC_ADD), i.blendFunc(i.ONE, i.ZERO), i.blendFuncSeparate(i.ONE, i.ZERO, i.ONE, i.ZERO), i.blendColor(0, 0, 0, 0), i.colorMask(!0, !0, !0, !0), i.clearColor(0, 0, 0, 0), i.depthMask(!0), i.depthFunc(i.LESS), i.clearDepth(1), i.stencilMask(4294967295), i.stencilFunc(i.ALWAYS, 0, 4294967295), i.stencilOp(i.KEEP, i.KEEP, i.KEEP), i.clearStencil(0), i.cullFace(i.BACK), i.frontFace(i.CCW), i.polygonOffset(0, 0), i.activeTexture(i.TEXTURE0), i.bindFramebuffer(i.FRAMEBUFFER, null), n === !0 && (i.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), i.bindFramebuffer(i.READ_FRAMEBUFFER, null)), i.useProgram(null), i.lineWidth(1), i.scissor(0, 0, i.canvas.width, i.canvas.height), i.viewport(0, 0, i.canvas.width, i.canvas.height), f = {}, J = null, le = {}, m = {}, v = /* @__PURE__ */ new WeakMap(), x = [], p = null, u = !1, y = null, _ = null, w = null, D = null, C = null, R = null, q = null, M = new We(0, 0, 0), T = 0, z = !1, Y = null, re = null, L = null, N = null, k = null, A.set(0, 0, i.canvas.width, i.canvas.height), Q.set(0, 0, i.canvas.width, i.canvas.height), s.reset(), o.reset(), c.reset();
  }
  return {
    buffers: {
      color: s,
      depth: o,
      stencil: c
    },
    enable: Se,
    disable: ge,
    bindFramebuffer: we,
    drawBuffers: U,
    useProgram: je,
    setBlending: pe,
    setMaterial: Xe,
    setFlipSided: Ue,
    setCullFace: E,
    setLineWidth: g,
    setPolygonOffset: I,
    setScissorTest: ee,
    activeTexture: $,
    bindTexture: te,
    unbindTexture: me,
    compressedTexImage2D: ce,
    compressedTexImage3D: fe,
    texImage2D: xe,
    texImage3D: de,
    updateUBOMapping: Je,
    uniformBlockBinding: Ne,
    texStorage2D: Ge,
    texStorage3D: Re,
    texSubImage2D: Te,
    texSubImage3D: Fe,
    compressedTexSubImage2D: j,
    compressedTexSubImage3D: Ve,
    scissor: Pe,
    viewport: ze,
    reset: ne
  };
}
function Au(i, e, t, n, r, a, l) {
  const s = r.isWebGL2, o = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null, c = typeof navigator > "u" ? !1 : /OculusBrowser/g.test(navigator.userAgent), h = /* @__PURE__ */ new WeakMap();
  let d;
  const f = /* @__PURE__ */ new WeakMap();
  let m = !1;
  try {
    m = typeof OffscreenCanvas < "u" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {
  }
  function v(E, g) {
    return m ? (
      // eslint-disable-next-line compat/compat
      new OffscreenCanvas(E, g)
    ) : mi("canvas");
  }
  function x(E, g, I, ee) {
    let $ = 1;
    if ((E.width > ee || E.height > ee) && ($ = ee / Math.max(E.width, E.height)), $ < 1 || g === !0)
      if (typeof HTMLImageElement < "u" && E instanceof HTMLImageElement || typeof HTMLCanvasElement < "u" && E instanceof HTMLCanvasElement || typeof ImageBitmap < "u" && E instanceof ImageBitmap) {
        const te = g ? er : Math.floor, me = te($ * E.width), ce = te($ * E.height);
        d === void 0 && (d = v(me, ce));
        const fe = I ? v(me, ce) : d;
        return fe.width = me, fe.height = ce, fe.getContext("2d").drawImage(E, 0, 0, me, ce), console.warn("THREE.WebGLRenderer: Texture has been resized from (" + E.width + "x" + E.height + ") to (" + me + "x" + ce + ")."), fe;
      } else
        return "data" in E && console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + E.width + "x" + E.height + ")."), E;
    return E;
  }
  function p(E) {
    return fr(E.width) && fr(E.height);
  }
  function u(E) {
    return s ? !1 : E.wrapS !== 1001 || E.wrapT !== 1001 || E.minFilter !== 1003 && E.minFilter !== 1006;
  }
  function y(E, g) {
    return E.generateMipmaps && g && E.minFilter !== 1003 && E.minFilter !== 1006;
  }
  function _(E) {
    i.generateMipmap(E);
  }
  function w(E, g, I, ee, $ = !1) {
    if (s === !1) return g;
    if (E !== null) {
      if (i[E] !== void 0) return i[E];
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + E + "'");
    }
    let te = g;
    if (g === i.RED && (I === i.FLOAT && (te = i.R32F), I === i.HALF_FLOAT && (te = i.R16F), I === i.UNSIGNED_BYTE && (te = i.R8)), g === i.RED_INTEGER && (I === i.UNSIGNED_BYTE && (te = i.R8UI), I === i.UNSIGNED_SHORT && (te = i.R16UI), I === i.UNSIGNED_INT && (te = i.R32UI), I === i.BYTE && (te = i.R8I), I === i.SHORT && (te = i.R16I), I === i.INT && (te = i.R32I)), g === i.RG && (I === i.FLOAT && (te = i.RG32F), I === i.HALF_FLOAT && (te = i.RG16F), I === i.UNSIGNED_BYTE && (te = i.RG8)), g === i.RGBA) {
      const me = $ ? fi : ke.getTransfer(ee);
      I === i.FLOAT && (te = i.RGBA32F), I === i.HALF_FLOAT && (te = i.RGBA16F), I === i.UNSIGNED_BYTE && (te = me === Ze ? i.SRGB8_ALPHA8 : i.RGBA8), I === i.UNSIGNED_SHORT_4_4_4_4 && (te = i.RGBA4), I === i.UNSIGNED_SHORT_5_5_5_1 && (te = i.RGB5_A1);
    }
    return (te === i.R16F || te === i.R32F || te === i.RG16F || te === i.RG32F || te === i.RGBA16F || te === i.RGBA32F) && e.get("EXT_color_buffer_float"), te;
  }
  function D(E, g, I) {
    return y(E, I) === !0 || E.isFramebufferTexture && E.minFilter !== 1003 && E.minFilter !== 1006 ? Math.log2(Math.max(g.width, g.height)) + 1 : E.mipmaps !== void 0 && E.mipmaps.length > 0 ? E.mipmaps.length : E.isCompressedTexture && Array.isArray(E.image) ? g.mipmaps.length : 1;
  }
  function C(E) {
    return E === 1003 || E === 1004 || E === 1005 ? i.NEAREST : i.LINEAR;
  }
  function R(E) {
    const g = E.target;
    g.removeEventListener("dispose", R), M(g), g.isVideoTexture && h.delete(g);
  }
  function q(E) {
    const g = E.target;
    g.removeEventListener("dispose", q), z(g);
  }
  function M(E) {
    const g = n.get(E);
    if (g.__webglInit === void 0) return;
    const I = E.source, ee = f.get(I);
    if (ee) {
      const $ = ee[g.__cacheKey];
      $.usedTimes--, $.usedTimes === 0 && T(E), Object.keys(ee).length === 0 && f.delete(I);
    }
    n.remove(E);
  }
  function T(E) {
    const g = n.get(E);
    i.deleteTexture(g.__webglTexture);
    const I = E.source, ee = f.get(I);
    delete ee[g.__cacheKey], l.memory.textures--;
  }
  function z(E) {
    const g = E.texture, I = n.get(E), ee = n.get(g);
    if (ee.__webglTexture !== void 0 && (i.deleteTexture(ee.__webglTexture), l.memory.textures--), E.depthTexture && E.depthTexture.dispose(), E.isWebGLCubeRenderTarget)
      for (let $ = 0; $ < 6; $++) {
        if (Array.isArray(I.__webglFramebuffer[$]))
          for (let te = 0; te < I.__webglFramebuffer[$].length; te++) i.deleteFramebuffer(I.__webglFramebuffer[$][te]);
        else
          i.deleteFramebuffer(I.__webglFramebuffer[$]);
        I.__webglDepthbuffer && i.deleteRenderbuffer(I.__webglDepthbuffer[$]);
      }
    else {
      if (Array.isArray(I.__webglFramebuffer))
        for (let $ = 0; $ < I.__webglFramebuffer.length; $++) i.deleteFramebuffer(I.__webglFramebuffer[$]);
      else
        i.deleteFramebuffer(I.__webglFramebuffer);
      if (I.__webglDepthbuffer && i.deleteRenderbuffer(I.__webglDepthbuffer), I.__webglMultisampledFramebuffer && i.deleteFramebuffer(I.__webglMultisampledFramebuffer), I.__webglColorRenderbuffer)
        for (let $ = 0; $ < I.__webglColorRenderbuffer.length; $++)
          I.__webglColorRenderbuffer[$] && i.deleteRenderbuffer(I.__webglColorRenderbuffer[$]);
      I.__webglDepthRenderbuffer && i.deleteRenderbuffer(I.__webglDepthRenderbuffer);
    }
    if (E.isWebGLMultipleRenderTargets)
      for (let $ = 0, te = g.length; $ < te; $++) {
        const me = n.get(g[$]);
        me.__webglTexture && (i.deleteTexture(me.__webglTexture), l.memory.textures--), n.remove(g[$]);
      }
    n.remove(g), n.remove(E);
  }
  let Y = 0;
  function re() {
    Y = 0;
  }
  function L() {
    const E = Y;
    return E >= r.maxTextures && console.warn("THREE.WebGLTextures: Trying to use " + E + " texture units while this GPU supports only " + r.maxTextures), Y += 1, E;
  }
  function N(E) {
    const g = [];
    return g.push(E.wrapS), g.push(E.wrapT), g.push(E.wrapR || 0), g.push(E.magFilter), g.push(E.minFilter), g.push(E.anisotropy), g.push(E.internalFormat), g.push(E.format), g.push(E.type), g.push(E.generateMipmaps), g.push(E.premultiplyAlpha), g.push(E.flipY), g.push(E.unpackAlignment), g.push(E.colorSpace), g.join();
  }
  function k(E, g) {
    const I = n.get(E);
    if (E.isVideoTexture && Xe(E), E.isRenderTargetTexture === !1 && E.version > 0 && I.__version !== E.version) {
      const ee = E.image;
      if (ee === null)
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      else if (ee.complete === !1)
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      else {
        A(I, E, g);
        return;
      }
    }
    t.bindTexture(i.TEXTURE_2D, I.__webglTexture, i.TEXTURE0 + g);
  }
  function X(E, g) {
    const I = n.get(E);
    if (E.version > 0 && I.__version !== E.version) {
      A(I, E, g);
      return;
    }
    t.bindTexture(i.TEXTURE_2D_ARRAY, I.__webglTexture, i.TEXTURE0 + g);
  }
  function W(E, g) {
    const I = n.get(E);
    if (E.version > 0 && I.__version !== E.version) {
      A(I, E, g);
      return;
    }
    t.bindTexture(i.TEXTURE_3D, I.__webglTexture, i.TEXTURE0 + g);
  }
  function V(E, g) {
    const I = n.get(E);
    if (E.version > 0 && I.__version !== E.version) {
      Q(I, E, g);
      return;
    }
    t.bindTexture(i.TEXTURE_CUBE_MAP, I.__webglTexture, i.TEXTURE0 + g);
  }
  const K = {
    1e3: i.REPEAT,
    1001: i.CLAMP_TO_EDGE,
    1002: i.MIRRORED_REPEAT
  }, J = {
    1003: i.NEAREST,
    1004: i.NEAREST_MIPMAP_NEAREST,
    1005: i.NEAREST_MIPMAP_LINEAR,
    1006: i.LINEAR,
    1007: i.LINEAR_MIPMAP_NEAREST,
    1008: i.LINEAR_MIPMAP_LINEAR
  }, le = {
    512: i.NEVER,
    519: i.ALWAYS,
    513: i.LESS,
    515: i.LEQUAL,
    514: i.EQUAL,
    518: i.GEQUAL,
    516: i.GREATER,
    517: i.NOTEQUAL
  };
  function H(E, g, I) {
    if (I ? (i.texParameteri(E, i.TEXTURE_WRAP_S, K[g.wrapS]), i.texParameteri(E, i.TEXTURE_WRAP_T, K[g.wrapT]), (E === i.TEXTURE_3D || E === i.TEXTURE_2D_ARRAY) && i.texParameteri(E, i.TEXTURE_WRAP_R, K[g.wrapR]), i.texParameteri(E, i.TEXTURE_MAG_FILTER, J[g.magFilter]), i.texParameteri(E, i.TEXTURE_MIN_FILTER, J[g.minFilter])) : (i.texParameteri(E, i.TEXTURE_WRAP_S, i.CLAMP_TO_EDGE), i.texParameteri(E, i.TEXTURE_WRAP_T, i.CLAMP_TO_EDGE), (E === i.TEXTURE_3D || E === i.TEXTURE_2D_ARRAY) && i.texParameteri(E, i.TEXTURE_WRAP_R, i.CLAMP_TO_EDGE), (g.wrapS !== 1001 || g.wrapT !== 1001) && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."), i.texParameteri(E, i.TEXTURE_MAG_FILTER, C(g.magFilter)), i.texParameteri(E, i.TEXTURE_MIN_FILTER, C(g.minFilter)), g.minFilter !== 1003 && g.minFilter !== 1006 && console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")), g.compareFunction && (i.texParameteri(E, i.TEXTURE_COMPARE_MODE, i.COMPARE_REF_TO_TEXTURE), i.texParameteri(E, i.TEXTURE_COMPARE_FUNC, le[g.compareFunction])), e.has("EXT_texture_filter_anisotropic") === !0) {
      const ee = e.get("EXT_texture_filter_anisotropic");
      if (g.magFilter === 1003 || g.minFilter !== 1005 && g.minFilter !== 1008 || g.type === 1015 && e.has("OES_texture_float_linear") === !1 || s === !1 && g.type === 1016 && e.has("OES_texture_half_float_linear") === !1) return;
      (g.anisotropy > 1 || n.get(g).__currentAnisotropy) && (i.texParameterf(E, ee.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(g.anisotropy, r.getMaxAnisotropy())), n.get(g).__currentAnisotropy = g.anisotropy);
    }
  }
  function Z(E, g) {
    let I = !1;
    E.__webglInit === void 0 && (E.__webglInit = !0, g.addEventListener("dispose", R));
    const ee = g.source;
    let $ = f.get(ee);
    $ === void 0 && ($ = {}, f.set(ee, $));
    const te = N(g);
    if (te !== E.__cacheKey) {
      $[te] === void 0 && ($[te] = {
        texture: i.createTexture(),
        usedTimes: 0
      }, l.memory.textures++, I = !0), $[te].usedTimes++;
      const me = $[E.__cacheKey];
      me !== void 0 && ($[E.__cacheKey].usedTimes--, me.usedTimes === 0 && T(g)), E.__cacheKey = te, E.__webglTexture = $[te].texture;
    }
    return I;
  }
  function A(E, g, I) {
    let ee = i.TEXTURE_2D;
    (g.isDataArrayTexture || g.isCompressedArrayTexture) && (ee = i.TEXTURE_2D_ARRAY), g.isData3DTexture && (ee = i.TEXTURE_3D);
    const $ = Z(E, g), te = g.source;
    t.bindTexture(ee, E.__webglTexture, i.TEXTURE0 + I);
    const me = n.get(te);
    if (te.version !== me.__version || $ === !0) {
      t.activeTexture(i.TEXTURE0 + I);
      const ce = ke.getPrimaries(ke.workingColorSpace), fe = g.colorSpace === At ? null : ke.getPrimaries(g.colorSpace), Te = g.colorSpace === At || ce === fe ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, g.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, g.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, g.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, Te);
      const Fe = u(g) && p(g.image) === !1;
      let j = x(g.image, Fe, !1, r.maxTextureSize);
      j = Ue(g, j);
      const Ve = p(j) || s, Ge = a.convert(g.format, g.colorSpace);
      let Re = a.convert(g.type), xe = w(g.internalFormat, Ge, Re, g.colorSpace, g.isVideoTexture);
      H(ee, g, Ve);
      let de;
      const Pe = g.mipmaps, ze = s && g.isVideoTexture !== !0 && xe !== 36196, Je = me.__version === void 0 || $ === !0, Ne = D(g, j, Ve);
      if (g.isDepthTexture)
        xe = i.DEPTH_COMPONENT, s ? g.type === 1015 ? xe = i.DEPTH_COMPONENT32F : g.type === 1014 ? xe = i.DEPTH_COMPONENT24 : g.type === 1020 ? xe = i.DEPTH24_STENCIL8 : xe = i.DEPTH_COMPONENT16 : g.type === 1015 && console.error("WebGLRenderer: Floating point depth texture requires WebGL2."), g.format === 1026 && xe === i.DEPTH_COMPONENT && g.type !== 1012 && g.type !== 1014 && (console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."), g.type = 1014, Re = a.convert(g.type)), g.format === 1027 && xe === i.DEPTH_COMPONENT && (xe = i.DEPTH_STENCIL, g.type !== 1020 && (console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."), g.type = 1020, Re = a.convert(g.type))), Je && (ze ? t.texStorage2D(i.TEXTURE_2D, 1, xe, j.width, j.height) : t.texImage2D(i.TEXTURE_2D, 0, xe, j.width, j.height, 0, Ge, Re, null));
      else if (g.isDataTexture)
        if (Pe.length > 0 && Ve) {
          ze && Je && t.texStorage2D(i.TEXTURE_2D, Ne, xe, Pe[0].width, Pe[0].height);
          for (let ne = 0, b = Pe.length; ne < b; ne++)
            de = Pe[ne], ze ? t.texSubImage2D(i.TEXTURE_2D, ne, 0, 0, de.width, de.height, Ge, Re, de.data) : t.texImage2D(i.TEXTURE_2D, ne, xe, de.width, de.height, 0, Ge, Re, de.data);
          g.generateMipmaps = !1;
        } else
          ze ? (Je && t.texStorage2D(i.TEXTURE_2D, Ne, xe, j.width, j.height), t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, j.width, j.height, Ge, Re, j.data)) : t.texImage2D(i.TEXTURE_2D, 0, xe, j.width, j.height, 0, Ge, Re, j.data);
      else if (g.isCompressedTexture)
        if (g.isCompressedArrayTexture) {
          ze && Je && t.texStorage3D(i.TEXTURE_2D_ARRAY, Ne, xe, Pe[0].width, Pe[0].height, j.depth);
          for (let ne = 0, b = Pe.length; ne < b; ne++)
            de = Pe[ne], g.format !== 1023 ? Ge !== null ? ze ? t.compressedTexSubImage3D(i.TEXTURE_2D_ARRAY, ne, 0, 0, 0, de.width, de.height, j.depth, Ge, de.data, 0, 0) : t.compressedTexImage3D(i.TEXTURE_2D_ARRAY, ne, xe, de.width, de.height, j.depth, 0, de.data, 0, 0) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : ze ? t.texSubImage3D(i.TEXTURE_2D_ARRAY, ne, 0, 0, 0, de.width, de.height, j.depth, Ge, Re, de.data) : t.texImage3D(i.TEXTURE_2D_ARRAY, ne, xe, de.width, de.height, j.depth, 0, Ge, Re, de.data);
        } else {
          ze && Je && t.texStorage2D(i.TEXTURE_2D, Ne, xe, Pe[0].width, Pe[0].height);
          for (let ne = 0, b = Pe.length; ne < b; ne++)
            de = Pe[ne], g.format !== 1023 ? Ge !== null ? ze ? t.compressedTexSubImage2D(i.TEXTURE_2D, ne, 0, 0, de.width, de.height, Ge, de.data) : t.compressedTexImage2D(i.TEXTURE_2D, ne, xe, de.width, de.height, 0, de.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()") : ze ? t.texSubImage2D(i.TEXTURE_2D, ne, 0, 0, de.width, de.height, Ge, Re, de.data) : t.texImage2D(i.TEXTURE_2D, ne, xe, de.width, de.height, 0, Ge, Re, de.data);
        }
      else if (g.isDataArrayTexture)
        ze ? (Je && t.texStorage3D(i.TEXTURE_2D_ARRAY, Ne, xe, j.width, j.height, j.depth), t.texSubImage3D(i.TEXTURE_2D_ARRAY, 0, 0, 0, 0, j.width, j.height, j.depth, Ge, Re, j.data)) : t.texImage3D(i.TEXTURE_2D_ARRAY, 0, xe, j.width, j.height, j.depth, 0, Ge, Re, j.data);
      else if (g.isData3DTexture)
        ze ? (Je && t.texStorage3D(i.TEXTURE_3D, Ne, xe, j.width, j.height, j.depth), t.texSubImage3D(i.TEXTURE_3D, 0, 0, 0, 0, j.width, j.height, j.depth, Ge, Re, j.data)) : t.texImage3D(i.TEXTURE_3D, 0, xe, j.width, j.height, j.depth, 0, Ge, Re, j.data);
      else if (g.isFramebufferTexture) {
        if (Je)
          if (ze)
            t.texStorage2D(i.TEXTURE_2D, Ne, xe, j.width, j.height);
          else {
            let ne = j.width, b = j.height;
            for (let se = 0; se < Ne; se++)
              t.texImage2D(i.TEXTURE_2D, se, xe, ne, b, 0, Ge, Re, null), ne >>= 1, b >>= 1;
          }
      } else if (Pe.length > 0 && Ve) {
        ze && Je && t.texStorage2D(i.TEXTURE_2D, Ne, xe, Pe[0].width, Pe[0].height);
        for (let ne = 0, b = Pe.length; ne < b; ne++)
          de = Pe[ne], ze ? t.texSubImage2D(i.TEXTURE_2D, ne, 0, 0, Ge, Re, de) : t.texImage2D(i.TEXTURE_2D, ne, xe, Ge, Re, de);
        g.generateMipmaps = !1;
      } else
        ze ? (Je && t.texStorage2D(i.TEXTURE_2D, Ne, xe, j.width, j.height), t.texSubImage2D(i.TEXTURE_2D, 0, 0, 0, Ge, Re, j)) : t.texImage2D(i.TEXTURE_2D, 0, xe, Ge, Re, j);
      y(g, Ve) && _(ee), me.__version = te.version, g.onUpdate && g.onUpdate(g);
    }
    E.__version = g.version;
  }
  function Q(E, g, I) {
    if (g.image.length !== 6) return;
    const ee = Z(E, g), $ = g.source;
    t.bindTexture(i.TEXTURE_CUBE_MAP, E.__webglTexture, i.TEXTURE0 + I);
    const te = n.get($);
    if ($.version !== te.__version || ee === !0) {
      t.activeTexture(i.TEXTURE0 + I);
      const me = ke.getPrimaries(ke.workingColorSpace), ce = g.colorSpace === At ? null : ke.getPrimaries(g.colorSpace), fe = g.colorSpace === At || me === ce ? i.NONE : i.BROWSER_DEFAULT_WEBGL;
      i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL, g.flipY), i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL, g.premultiplyAlpha), i.pixelStorei(i.UNPACK_ALIGNMENT, g.unpackAlignment), i.pixelStorei(i.UNPACK_COLORSPACE_CONVERSION_WEBGL, fe);
      const Te = g.isCompressedTexture || g.image[0].isCompressedTexture, Fe = g.image[0] && g.image[0].isDataTexture, j = [];
      for (let ne = 0; ne < 6; ne++)
        !Te && !Fe ? j[ne] = x(g.image[ne], !1, !0, r.maxCubemapSize) : j[ne] = Fe ? g.image[ne].image : g.image[ne], j[ne] = Ue(g, j[ne]);
      const Ve = j[0], Ge = p(Ve) || s, Re = a.convert(g.format, g.colorSpace), xe = a.convert(g.type), de = w(g.internalFormat, Re, xe, g.colorSpace), Pe = s && g.isVideoTexture !== !0, ze = te.__version === void 0 || ee === !0;
      let Je = D(g, Ve, Ge);
      H(i.TEXTURE_CUBE_MAP, g, Ge);
      let Ne;
      if (Te) {
        Pe && ze && t.texStorage2D(i.TEXTURE_CUBE_MAP, Je, de, Ve.width, Ve.height);
        for (let ne = 0; ne < 6; ne++) {
          Ne = j[ne].mipmaps;
          for (let b = 0; b < Ne.length; b++) {
            const se = Ne[b];
            g.format !== 1023 ? Re !== null ? Pe ? t.compressedTexSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ne, b, 0, 0, se.width, se.height, Re, se.data) : t.compressedTexImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ne, b, de, se.width, se.height, 0, se.data) : console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()") : Pe ? t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ne, b, 0, 0, se.width, se.height, Re, xe, se.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ne, b, de, se.width, se.height, 0, Re, xe, se.data);
          }
        }
      } else {
        Ne = g.mipmaps, Pe && ze && (Ne.length > 0 && Je++, t.texStorage2D(i.TEXTURE_CUBE_MAP, Je, de, j[0].width, j[0].height));
        for (let ne = 0; ne < 6; ne++)
          if (Fe) {
            Pe ? t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ne, 0, 0, 0, j[ne].width, j[ne].height, Re, xe, j[ne].data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ne, 0, de, j[ne].width, j[ne].height, 0, Re, xe, j[ne].data);
            for (let b = 0; b < Ne.length; b++) {
              const oe = Ne[b].image[ne].image;
              Pe ? t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ne, b + 1, 0, 0, oe.width, oe.height, Re, xe, oe.data) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ne, b + 1, de, oe.width, oe.height, 0, Re, xe, oe.data);
            }
          } else {
            Pe ? t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ne, 0, 0, 0, Re, xe, j[ne]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ne, 0, de, Re, xe, j[ne]);
            for (let b = 0; b < Ne.length; b++) {
              const se = Ne[b];
              Pe ? t.texSubImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ne, b + 1, 0, 0, Re, xe, se.image[ne]) : t.texImage2D(i.TEXTURE_CUBE_MAP_POSITIVE_X + ne, b + 1, de, Re, xe, se.image[ne]);
            }
          }
      }
      y(g, Ge) && _(i.TEXTURE_CUBE_MAP), te.__version = $.version, g.onUpdate && g.onUpdate(g);
    }
    E.__version = g.version;
  }
  function ae(E, g, I, ee, $, te) {
    const me = a.convert(I.format, I.colorSpace), ce = a.convert(I.type), fe = w(I.internalFormat, me, ce, I.colorSpace);
    if (!n.get(g).__hasExternalTextures) {
      const Fe = Math.max(1, g.width >> te), j = Math.max(1, g.height >> te);
      $ === i.TEXTURE_3D || $ === i.TEXTURE_2D_ARRAY ? t.texImage3D($, te, fe, Fe, j, g.depth, 0, me, ce, null) : t.texImage2D($, te, fe, Fe, j, 0, me, ce, null);
    }
    t.bindFramebuffer(i.FRAMEBUFFER, E), pe(g) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, ee, $, n.get(I).__webglTexture, 0, be(g)) : ($ === i.TEXTURE_2D || $ >= i.TEXTURE_CUBE_MAP_POSITIVE_X && $ <= i.TEXTURE_CUBE_MAP_NEGATIVE_Z) && i.framebufferTexture2D(i.FRAMEBUFFER, ee, $, n.get(I).__webglTexture, te), t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function he(E, g, I) {
    if (i.bindRenderbuffer(i.RENDERBUFFER, E), g.depthBuffer && !g.stencilBuffer) {
      let ee = s === !0 ? i.DEPTH_COMPONENT24 : i.DEPTH_COMPONENT16;
      if (I || pe(g)) {
        const $ = g.depthTexture;
        $ && $.isDepthTexture && ($.type === 1015 ? ee = i.DEPTH_COMPONENT32F : $.type === 1014 && (ee = i.DEPTH_COMPONENT24));
        const te = be(g);
        pe(g) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, te, ee, g.width, g.height) : i.renderbufferStorageMultisample(i.RENDERBUFFER, te, ee, g.width, g.height);
      } else
        i.renderbufferStorage(i.RENDERBUFFER, ee, g.width, g.height);
      i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.RENDERBUFFER, E);
    } else if (g.depthBuffer && g.stencilBuffer) {
      const ee = be(g);
      I && pe(g) === !1 ? i.renderbufferStorageMultisample(i.RENDERBUFFER, ee, i.DEPTH24_STENCIL8, g.width, g.height) : pe(g) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, ee, i.DEPTH24_STENCIL8, g.width, g.height) : i.renderbufferStorage(i.RENDERBUFFER, i.DEPTH_STENCIL, g.width, g.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.RENDERBUFFER, E);
    } else {
      const ee = g.isWebGLMultipleRenderTargets === !0 ? g.texture : [g.texture];
      for (let $ = 0; $ < ee.length; $++) {
        const te = ee[$], me = a.convert(te.format, te.colorSpace), ce = a.convert(te.type), fe = w(te.internalFormat, me, ce, te.colorSpace), Te = be(g);
        I && pe(g) === !1 ? i.renderbufferStorageMultisample(i.RENDERBUFFER, Te, fe, g.width, g.height) : pe(g) ? o.renderbufferStorageMultisampleEXT(i.RENDERBUFFER, Te, fe, g.width, g.height) : i.renderbufferStorage(i.RENDERBUFFER, fe, g.width, g.height);
      }
    }
    i.bindRenderbuffer(i.RENDERBUFFER, null);
  }
  function Se(E, g) {
    if (g && g.isWebGLCubeRenderTarget) throw new Error("Depth Texture with cube render targets is not supported");
    if (t.bindFramebuffer(i.FRAMEBUFFER, E), !(g.depthTexture && g.depthTexture.isDepthTexture))
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    (!n.get(g.depthTexture).__webglTexture || g.depthTexture.image.width !== g.width || g.depthTexture.image.height !== g.height) && (g.depthTexture.image.width = g.width, g.depthTexture.image.height = g.height, g.depthTexture.needsUpdate = !0), k(g.depthTexture, 0);
    const ee = n.get(g.depthTexture).__webglTexture, $ = be(g);
    if (g.depthTexture.format === 1026)
      pe(g) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, ee, 0, $) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_ATTACHMENT, i.TEXTURE_2D, ee, 0);
    else if (g.depthTexture.format === 1027)
      pe(g) ? o.framebufferTexture2DMultisampleEXT(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, ee, 0, $) : i.framebufferTexture2D(i.FRAMEBUFFER, i.DEPTH_STENCIL_ATTACHMENT, i.TEXTURE_2D, ee, 0);
    else
      throw new Error("Unknown depthTexture format");
  }
  function ge(E) {
    const g = n.get(E), I = E.isWebGLCubeRenderTarget === !0;
    if (E.depthTexture && !g.__autoAllocateDepthBuffer) {
      if (I) throw new Error("target.depthTexture not supported in Cube render targets");
      Se(g.__webglFramebuffer, E);
    } else if (I) {
      g.__webglDepthbuffer = [];
      for (let ee = 0; ee < 6; ee++)
        t.bindFramebuffer(i.FRAMEBUFFER, g.__webglFramebuffer[ee]), g.__webglDepthbuffer[ee] = i.createRenderbuffer(), he(g.__webglDepthbuffer[ee], E, !1);
    } else
      t.bindFramebuffer(i.FRAMEBUFFER, g.__webglFramebuffer), g.__webglDepthbuffer = i.createRenderbuffer(), he(g.__webglDepthbuffer, E, !1);
    t.bindFramebuffer(i.FRAMEBUFFER, null);
  }
  function we(E, g, I) {
    const ee = n.get(E);
    g !== void 0 && ae(ee.__webglFramebuffer, E, E.texture, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, 0), I !== void 0 && ge(E);
  }
  function U(E) {
    const g = E.texture, I = n.get(E), ee = n.get(g);
    E.addEventListener("dispose", q), E.isWebGLMultipleRenderTargets !== !0 && (ee.__webglTexture === void 0 && (ee.__webglTexture = i.createTexture()), ee.__version = g.version, l.memory.textures++);
    const $ = E.isWebGLCubeRenderTarget === !0, te = E.isWebGLMultipleRenderTargets === !0, me = p(E) || s;
    if ($) {
      I.__webglFramebuffer = [];
      for (let ce = 0; ce < 6; ce++)
        if (s && g.mipmaps && g.mipmaps.length > 0) {
          I.__webglFramebuffer[ce] = [];
          for (let fe = 0; fe < g.mipmaps.length; fe++)
            I.__webglFramebuffer[ce][fe] = i.createFramebuffer();
        } else
          I.__webglFramebuffer[ce] = i.createFramebuffer();
    } else {
      if (s && g.mipmaps && g.mipmaps.length > 0) {
        I.__webglFramebuffer = [];
        for (let ce = 0; ce < g.mipmaps.length; ce++)
          I.__webglFramebuffer[ce] = i.createFramebuffer();
      } else
        I.__webglFramebuffer = i.createFramebuffer();
      if (te)
        if (r.drawBuffers) {
          const ce = E.texture;
          for (let fe = 0, Te = ce.length; fe < Te; fe++) {
            const Fe = n.get(ce[fe]);
            Fe.__webglTexture === void 0 && (Fe.__webglTexture = i.createTexture(), l.memory.textures++);
          }
        } else
          console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");
      if (s && E.samples > 0 && pe(E) === !1) {
        const ce = te ? g : [g];
        I.__webglMultisampledFramebuffer = i.createFramebuffer(), I.__webglColorRenderbuffer = [], t.bindFramebuffer(i.FRAMEBUFFER, I.__webglMultisampledFramebuffer);
        for (let fe = 0; fe < ce.length; fe++) {
          const Te = ce[fe];
          I.__webglColorRenderbuffer[fe] = i.createRenderbuffer(), i.bindRenderbuffer(i.RENDERBUFFER, I.__webglColorRenderbuffer[fe]);
          const Fe = a.convert(Te.format, Te.colorSpace), j = a.convert(Te.type), Ve = w(Te.internalFormat, Fe, j, Te.colorSpace, E.isXRRenderTarget === !0), Ge = be(E);
          i.renderbufferStorageMultisample(i.RENDERBUFFER, Ge, Ve, E.width, E.height), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + fe, i.RENDERBUFFER, I.__webglColorRenderbuffer[fe]);
        }
        i.bindRenderbuffer(i.RENDERBUFFER, null), E.depthBuffer && (I.__webglDepthRenderbuffer = i.createRenderbuffer(), he(I.__webglDepthRenderbuffer, E, !0)), t.bindFramebuffer(i.FRAMEBUFFER, null);
      }
    }
    if ($) {
      t.bindTexture(i.TEXTURE_CUBE_MAP, ee.__webglTexture), H(i.TEXTURE_CUBE_MAP, g, me);
      for (let ce = 0; ce < 6; ce++)
        if (s && g.mipmaps && g.mipmaps.length > 0)
          for (let fe = 0; fe < g.mipmaps.length; fe++)
            ae(I.__webglFramebuffer[ce][fe], E, g, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + ce, fe);
        else
          ae(I.__webglFramebuffer[ce], E, g, i.COLOR_ATTACHMENT0, i.TEXTURE_CUBE_MAP_POSITIVE_X + ce, 0);
      y(g, me) && _(i.TEXTURE_CUBE_MAP), t.unbindTexture();
    } else if (te) {
      const ce = E.texture;
      for (let fe = 0, Te = ce.length; fe < Te; fe++) {
        const Fe = ce[fe], j = n.get(Fe);
        t.bindTexture(i.TEXTURE_2D, j.__webglTexture), H(i.TEXTURE_2D, Fe, me), ae(I.__webglFramebuffer, E, Fe, i.COLOR_ATTACHMENT0 + fe, i.TEXTURE_2D, 0), y(Fe, me) && _(i.TEXTURE_2D);
      }
      t.unbindTexture();
    } else {
      let ce = i.TEXTURE_2D;
      if ((E.isWebGL3DRenderTarget || E.isWebGLArrayRenderTarget) && (s ? ce = E.isWebGL3DRenderTarget ? i.TEXTURE_3D : i.TEXTURE_2D_ARRAY : console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")), t.bindTexture(ce, ee.__webglTexture), H(ce, g, me), s && g.mipmaps && g.mipmaps.length > 0)
        for (let fe = 0; fe < g.mipmaps.length; fe++)
          ae(I.__webglFramebuffer[fe], E, g, i.COLOR_ATTACHMENT0, ce, fe);
      else
        ae(I.__webglFramebuffer, E, g, i.COLOR_ATTACHMENT0, ce, 0);
      y(g, me) && _(ce), t.unbindTexture();
    }
    E.depthBuffer && ge(E);
  }
  function je(E) {
    const g = p(E) || s, I = E.isWebGLMultipleRenderTargets === !0 ? E.texture : [E.texture];
    for (let ee = 0, $ = I.length; ee < $; ee++) {
      const te = I[ee];
      if (y(te, g)) {
        const me = E.isWebGLCubeRenderTarget ? i.TEXTURE_CUBE_MAP : i.TEXTURE_2D, ce = n.get(te).__webglTexture;
        t.bindTexture(me, ce), _(me), t.unbindTexture();
      }
    }
  }
  function ve(E) {
    if (s && E.samples > 0 && pe(E) === !1) {
      const g = E.isWebGLMultipleRenderTargets ? E.texture : [E.texture], I = E.width, ee = E.height;
      let $ = i.COLOR_BUFFER_BIT;
      const te = [], me = E.stencilBuffer ? i.DEPTH_STENCIL_ATTACHMENT : i.DEPTH_ATTACHMENT, ce = n.get(E), fe = E.isWebGLMultipleRenderTargets === !0;
      if (fe)
        for (let Te = 0; Te < g.length; Te++)
          t.bindFramebuffer(i.FRAMEBUFFER, ce.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Te, i.RENDERBUFFER, null), t.bindFramebuffer(i.FRAMEBUFFER, ce.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Te, i.TEXTURE_2D, null, 0);
      t.bindFramebuffer(i.READ_FRAMEBUFFER, ce.__webglMultisampledFramebuffer), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, ce.__webglFramebuffer);
      for (let Te = 0; Te < g.length; Te++) {
        te.push(i.COLOR_ATTACHMENT0 + Te), E.depthBuffer && te.push(me);
        const Fe = ce.__ignoreDepthValues !== void 0 ? ce.__ignoreDepthValues : !1;
        if (Fe === !1 && (E.depthBuffer && ($ |= i.DEPTH_BUFFER_BIT), E.stencilBuffer && ($ |= i.STENCIL_BUFFER_BIT)), fe && i.framebufferRenderbuffer(i.READ_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.RENDERBUFFER, ce.__webglColorRenderbuffer[Te]), Fe === !0 && (i.invalidateFramebuffer(i.READ_FRAMEBUFFER, [me]), i.invalidateFramebuffer(i.DRAW_FRAMEBUFFER, [me])), fe) {
          const j = n.get(g[Te]).__webglTexture;
          i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0, i.TEXTURE_2D, j, 0);
        }
        i.blitFramebuffer(0, 0, I, ee, 0, 0, I, ee, $, i.NEAREST), c && i.invalidateFramebuffer(i.READ_FRAMEBUFFER, te);
      }
      if (t.bindFramebuffer(i.READ_FRAMEBUFFER, null), t.bindFramebuffer(i.DRAW_FRAMEBUFFER, null), fe)
        for (let Te = 0; Te < g.length; Te++) {
          t.bindFramebuffer(i.FRAMEBUFFER, ce.__webglMultisampledFramebuffer), i.framebufferRenderbuffer(i.FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Te, i.RENDERBUFFER, ce.__webglColorRenderbuffer[Te]);
          const Fe = n.get(g[Te]).__webglTexture;
          t.bindFramebuffer(i.FRAMEBUFFER, ce.__webglFramebuffer), i.framebufferTexture2D(i.DRAW_FRAMEBUFFER, i.COLOR_ATTACHMENT0 + Te, i.TEXTURE_2D, Fe, 0);
        }
      t.bindFramebuffer(i.DRAW_FRAMEBUFFER, ce.__webglMultisampledFramebuffer);
    }
  }
  function be(E) {
    return Math.min(r.maxSamples, E.samples);
  }
  function pe(E) {
    const g = n.get(E);
    return s && E.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === !0 && g.__useRenderToTexture !== !1;
  }
  function Xe(E) {
    const g = l.render.frame;
    h.get(E) !== g && (h.set(E, g), E.update());
  }
  function Ue(E, g) {
    const I = E.colorSpace, ee = E.format, $ = E.type;
    return E.isCompressedTexture === !0 || E.isVideoTexture === !0 || E.format === 1035 || I !== zt && I !== At && (ke.getTransfer(I) === Ze ? s === !1 ? e.has("EXT_sRGB") === !0 && ee === 1023 ? (E.format = 1035, E.minFilter = 1006, E.generateMipmaps = !1) : g = Jr.sRGBToLinear(g) : (ee !== 1023 || $ !== 1009) && console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.") : console.error("THREE.WebGLTextures: Unsupported texture color space:", I)), g;
  }
  this.allocateTextureUnit = L, this.resetTextureUnits = re, this.setTexture2D = k, this.setTexture2DArray = X, this.setTexture3D = W, this.setTextureCube = V, this.rebindTextures = we, this.setupRenderTarget = U, this.updateRenderTargetMipmap = je, this.updateMultisampleRenderTarget = ve, this.setupDepthRenderbuffer = ge, this.setupFrameBufferTexture = ae, this.useMultisampledRTT = pe;
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
      if (o === Ze)
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
        if (a === 37492) return o === Ze ? s.COMPRESSED_SRGB8_ETC2 : s.COMPRESSED_RGB8_ETC2;
        if (a === 37496) return o === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC : s.COMPRESSED_RGBA8_ETC2_EAC;
      } else
        return null;
    if (a === 37808 || a === 37809 || a === 37810 || a === 37811 || a === 37812 || a === 37813 || a === 37814 || a === 37815 || a === 37816 || a === 37817 || a === 37818 || a === 37819 || a === 37820 || a === 37821)
      if (s = e.get("WEBGL_compressed_texture_astc"), s !== null) {
        if (a === 37808) return o === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR : s.COMPRESSED_RGBA_ASTC_4x4_KHR;
        if (a === 37809) return o === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR : s.COMPRESSED_RGBA_ASTC_5x4_KHR;
        if (a === 37810) return o === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR : s.COMPRESSED_RGBA_ASTC_5x5_KHR;
        if (a === 37811) return o === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR : s.COMPRESSED_RGBA_ASTC_6x5_KHR;
        if (a === 37812) return o === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR : s.COMPRESSED_RGBA_ASTC_6x6_KHR;
        if (a === 37813) return o === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR : s.COMPRESSED_RGBA_ASTC_8x5_KHR;
        if (a === 37814) return o === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR : s.COMPRESSED_RGBA_ASTC_8x6_KHR;
        if (a === 37815) return o === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR : s.COMPRESSED_RGBA_ASTC_8x8_KHR;
        if (a === 37816) return o === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR : s.COMPRESSED_RGBA_ASTC_10x5_KHR;
        if (a === 37817) return o === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR : s.COMPRESSED_RGBA_ASTC_10x6_KHR;
        if (a === 37818) return o === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR : s.COMPRESSED_RGBA_ASTC_10x8_KHR;
        if (a === 37819) return o === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR : s.COMPRESSED_RGBA_ASTC_10x10_KHR;
        if (a === 37820) return o === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR : s.COMPRESSED_RGBA_ASTC_12x10_KHR;
        if (a === 37821) return o === Ze ? s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR : s.COMPRESSED_RGBA_ASTC_12x12_KHR;
      } else
        return null;
    if (a === 36492 || a === 36494 || a === 36495)
      if (s = e.get("EXT_texture_compression_bptc"), s !== null) {
        if (a === 36492) return o === Ze ? s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT : s.COMPRESSED_RGBA_BPTC_UNORM_EXT;
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
    return this._targetRay === null && (this._targetRay = new ui(), this._targetRay.matrixAutoUpdate = !1, this._targetRay.visible = !1, this._targetRay.hasLinearVelocity = !1, this._targetRay.linearVelocity = new B(), this._targetRay.hasAngularVelocity = !1, this._targetRay.angularVelocity = new B()), this._targetRay;
  }
  getGripSpace() {
    return this._grip === null && (this._grip = new ui(), this._grip.matrixAutoUpdate = !1, this._grip.visible = !1, this._grip.hasLinearVelocity = !1, this._grip.linearVelocity = new B(), this._grip.hasAngularVelocity = !1, this._grip.angularVelocity = new B()), this._grip;
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
        for (const x of e.hand.values()) {
          const p = t.getJointPose(x, n), u = this._getHandJoint(c, x);
          p !== null && (u.matrix.fromArray(p.transform.matrix), u.matrix.decompose(u.position, u.rotation, u.scale), u.matrixWorldNeedsUpdate = !0, u.jointRadius = p.radius), u.visible = p !== null;
        }
        const h = c.joints["index-finger-tip"], d = c.joints["thumb-tip"], f = h.position.distanceTo(d.position), m = 0.02, v = 5e-3;
        c.inputState.pinching && f > m + v ? (c.inputState.pinching = !1, this.dispatchEvent({
          type: "pinchend",
          handedness: e.handedness,
          target: this
        })) : !c.inputState.pinching && f <= m - v && (c.inputState.pinching = !0, this.dispatchEvent({
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
    let r = null, a = 1, l = null, s = "local-floor", o = 1, c = null, h = null, d = null, f = null, m = null, v = null;
    const x = t.getContextAttributes();
    let p = null, u = null;
    const y = [], _ = [], w = new He();
    let D = null;
    const C = new Lt();
    C.layers.enable(1), C.viewport = new lt();
    const R = new Lt();
    R.layers.enable(2), R.viewport = new lt();
    const q = [C, R], M = new Ru();
    M.layers.enable(1), M.layers.enable(2);
    let T = null, z = null;
    this.cameraAutoUpdate = !0, this.enabled = !1, this.isPresenting = !1, this.getController = function(H) {
      let Z = y[H];
      return Z === void 0 && (Z = new Zi(), y[H] = Z), Z.getTargetRaySpace();
    }, this.getControllerGrip = function(H) {
      let Z = y[H];
      return Z === void 0 && (Z = new Zi(), y[H] = Z), Z.getGripSpace();
    }, this.getHand = function(H) {
      let Z = y[H];
      return Z === void 0 && (Z = new Zi(), y[H] = Z), Z.getHandSpace();
    };
    function Y(H) {
      const Z = _.indexOf(H.inputSource);
      if (Z === -1)
        return;
      const A = y[Z];
      A !== void 0 && (A.update(H.inputSource, H.frame, c || l), A.dispatchEvent({ type: H.type, data: H.inputSource }));
    }
    function re() {
      r.removeEventListener("select", Y), r.removeEventListener("selectstart", Y), r.removeEventListener("selectend", Y), r.removeEventListener("squeeze", Y), r.removeEventListener("squeezestart", Y), r.removeEventListener("squeezeend", Y), r.removeEventListener("end", re), r.removeEventListener("inputsourceschange", L);
      for (let H = 0; H < y.length; H++) {
        const Z = _[H];
        Z !== null && (_[H] = null, y[H].disconnect(Z));
      }
      T = null, z = null, e.setRenderTarget(p), m = null, f = null, d = null, r = null, u = null, le.stop(), n.isPresenting = !1, e.setPixelRatio(D), e.setSize(w.width, w.height, !1), n.dispatchEvent({ type: "sessionend" });
    }
    this.setFramebufferScaleFactor = function(H) {
      a = H, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
    }, this.setReferenceSpaceType = function(H) {
      s = H, n.isPresenting === !0 && console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
    }, this.getReferenceSpace = function() {
      return c || l;
    }, this.setReferenceSpace = function(H) {
      c = H;
    }, this.getBaseLayer = function() {
      return f !== null ? f : m;
    }, this.getBinding = function() {
      return d;
    }, this.getFrame = function() {
      return v;
    }, this.getSession = function() {
      return r;
    }, this.setSession = async function(H) {
      if (r = H, r !== null) {
        if (p = e.getRenderTarget(), r.addEventListener("select", Y), r.addEventListener("selectstart", Y), r.addEventListener("selectend", Y), r.addEventListener("squeeze", Y), r.addEventListener("squeezestart", Y), r.addEventListener("squeezeend", Y), r.addEventListener("end", re), r.addEventListener("inputsourceschange", L), x.xrCompatible !== !0 && await t.makeXRCompatible(), D = e.getPixelRatio(), e.getSize(w), r.renderState.layers === void 0 || e.capabilities.isWebGL2 === !1) {
          const Z = {
            antialias: r.renderState.layers === void 0 ? x.antialias : !0,
            alpha: !0,
            depth: x.depth,
            stencil: x.stencil,
            framebufferScaleFactor: a
          };
          m = new XRWebGLLayer(r, t, Z), r.updateRenderState({ baseLayer: m }), e.setPixelRatio(1), e.setSize(m.framebufferWidth, m.framebufferHeight, !1), u = new Vt(
            m.framebufferWidth,
            m.framebufferHeight,
            {
              format: 1023,
              type: 1009,
              colorSpace: e.outputColorSpace,
              stencilBuffer: x.stencil
            }
          );
        } else {
          let Z = null, A = null, Q = null;
          x.depth && (Q = x.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24, Z = x.stencil ? 1027 : 1026, A = x.stencil ? 1020 : 1014);
          const ae = {
            colorFormat: t.RGBA8,
            depthFormat: Q,
            scaleFactor: a
          };
          d = new XRWebGLBinding(r, t), f = d.createProjectionLayer(ae), r.updateRenderState({ layers: [f] }), e.setPixelRatio(1), e.setSize(f.textureWidth, f.textureHeight, !1), u = new Vt(
            f.textureWidth,
            f.textureHeight,
            {
              format: 1023,
              type: 1009,
              depthTexture: new fa(f.textureWidth, f.textureHeight, A, void 0, void 0, void 0, void 0, void 0, void 0, Z),
              stencilBuffer: x.stencil,
              colorSpace: e.outputColorSpace,
              samples: x.antialias ? 4 : 0
            }
          );
          const he = e.properties.get(u);
          he.__ignoreDepthValues = f.ignoreDepthValues;
        }
        u.isXRRenderTarget = !0, this.setFoveation(o), c = null, l = await r.requestReferenceSpace(s), le.setContext(r), le.start(), n.isPresenting = !0, n.dispatchEvent({ type: "sessionstart" });
      }
    }, this.getEnvironmentBlendMode = function() {
      if (r !== null)
        return r.environmentBlendMode;
    };
    function L(H) {
      for (let Z = 0; Z < H.removed.length; Z++) {
        const A = H.removed[Z], Q = _.indexOf(A);
        Q >= 0 && (_[Q] = null, y[Q].disconnect(A));
      }
      for (let Z = 0; Z < H.added.length; Z++) {
        const A = H.added[Z];
        let Q = _.indexOf(A);
        if (Q === -1) {
          for (let he = 0; he < y.length; he++)
            if (he >= _.length) {
              _.push(A), Q = he;
              break;
            } else if (_[he] === null) {
              _[he] = A, Q = he;
              break;
            }
          if (Q === -1) break;
        }
        const ae = y[Q];
        ae && ae.connect(A);
      }
    }
    const N = new B(), k = new B();
    function X(H, Z, A) {
      N.setFromMatrixPosition(Z.matrixWorld), k.setFromMatrixPosition(A.matrixWorld);
      const Q = N.distanceTo(k), ae = Z.projectionMatrix.elements, he = A.projectionMatrix.elements, Se = ae[14] / (ae[10] - 1), ge = ae[14] / (ae[10] + 1), we = (ae[9] + 1) / ae[5], U = (ae[9] - 1) / ae[5], je = (ae[8] - 1) / ae[0], ve = (he[8] + 1) / he[0], be = Se * je, pe = Se * ve, Xe = Q / (-je + ve), Ue = Xe * -je;
      Z.matrixWorld.decompose(H.position, H.quaternion, H.scale), H.translateX(Ue), H.translateZ(Xe), H.matrixWorld.compose(H.position, H.quaternion, H.scale), H.matrixWorldInverse.copy(H.matrixWorld).invert();
      const E = Se + Xe, g = ge + Xe, I = be - Ue, ee = pe + (Q - Ue), $ = we * ge / g * E, te = U * ge / g * E;
      H.projectionMatrix.makePerspective(I, ee, $, te, E, g), H.projectionMatrixInverse.copy(H.projectionMatrix).invert();
    }
    function W(H, Z) {
      Z === null ? H.matrixWorld.copy(H.matrix) : H.matrixWorld.multiplyMatrices(Z.matrixWorld, H.matrix), H.matrixWorldInverse.copy(H.matrixWorld).invert();
    }
    this.updateCamera = function(H) {
      if (r === null) return;
      M.near = R.near = C.near = H.near, M.far = R.far = C.far = H.far, (T !== M.near || z !== M.far) && (r.updateRenderState({
        depthNear: M.near,
        depthFar: M.far
      }), T = M.near, z = M.far);
      const Z = H.parent, A = M.cameras;
      W(M, Z);
      for (let Q = 0; Q < A.length; Q++)
        W(A[Q], Z);
      A.length === 2 ? X(M, C, R) : M.projectionMatrix.copy(C.projectionMatrix), V(H, M, Z);
    };
    function V(H, Z, A) {
      A === null ? H.matrix.copy(Z.matrixWorld) : (H.matrix.copy(A.matrixWorld), H.matrix.invert(), H.matrix.multiply(Z.matrixWorld)), H.matrix.decompose(H.position, H.quaternion, H.scale), H.updateMatrixWorld(!0), H.projectionMatrix.copy(Z.projectionMatrix), H.projectionMatrixInverse.copy(Z.projectionMatrixInverse), H.isPerspectiveCamera && (H.fov = Qi * 2 * Math.atan(1 / H.projectionMatrix.elements[5]), H.zoom = 1);
    }
    this.getCamera = function() {
      return M;
    }, this.getFoveation = function() {
      if (!(f === null && m === null))
        return o;
    }, this.setFoveation = function(H) {
      o = H, f !== null && (f.fixedFoveation = H), m !== null && m.fixedFoveation !== void 0 && (m.fixedFoveation = H);
    };
    let K = null;
    function J(H, Z) {
      if (h = Z.getViewerPose(c || l), v = Z, h !== null) {
        const A = h.views;
        m !== null && (e.setRenderTargetFramebuffer(u, m.framebuffer), e.setRenderTarget(u));
        let Q = !1;
        A.length !== M.cameras.length && (M.cameras.length = 0, Q = !0);
        for (let ae = 0; ae < A.length; ae++) {
          const he = A[ae];
          let Se = null;
          if (m !== null)
            Se = m.getViewport(he);
          else {
            const we = d.getViewSubImage(f, he);
            Se = we.viewport, ae === 0 && (e.setRenderTargetTextures(
              u,
              we.colorTexture,
              f.ignoreDepthValues ? void 0 : we.depthStencilTexture
            ), e.setRenderTarget(u));
          }
          let ge = q[ae];
          ge === void 0 && (ge = new Lt(), ge.layers.enable(ae), ge.viewport = new lt(), q[ae] = ge), ge.matrix.fromArray(he.transform.matrix), ge.matrix.decompose(ge.position, ge.quaternion, ge.scale), ge.projectionMatrix.fromArray(he.projectionMatrix), ge.projectionMatrixInverse.copy(ge.projectionMatrix).invert(), ge.viewport.set(Se.x, Se.y, Se.width, Se.height), ae === 0 && (M.matrix.copy(ge.matrix), M.matrix.decompose(M.position, M.quaternion, M.scale)), Q === !0 && M.cameras.push(ge);
        }
      }
      for (let A = 0; A < y.length; A++) {
        const Q = _[A], ae = y[A];
        Q !== null && ae !== void 0 && ae.update(Q, Z, c || l);
      }
      K && K(H, Z), Z.detectedPlanes && n.dispatchEvent({ type: "planesdetected", data: Z }), v = null;
    }
    const le = new ua();
    le.setAnimationLoop(J), this.setAnimationLoop = function(H) {
      K = H;
    }, this.dispose = function() {
    };
  }
}
function Lu(i, e) {
  function t(p, u) {
    p.matrixAutoUpdate === !0 && p.updateMatrix(), u.value.copy(p.matrix);
  }
  function n(p, u) {
    u.color.getRGB(p.fogColor.value, sa(i)), u.isFog ? (p.fogNear.value = u.near, p.fogFar.value = u.far) : u.isFogExp2 && (p.fogDensity.value = u.density);
  }
  function r(p, u, y, _, w) {
    u.isMeshBasicMaterial || u.isMeshLambertMaterial ? a(p, u) : u.isMeshToonMaterial ? (a(p, u), d(p, u)) : u.isMeshPhongMaterial ? (a(p, u), h(p, u)) : u.isMeshStandardMaterial ? (a(p, u), f(p, u), u.isMeshPhysicalMaterial && m(p, u, w)) : u.isMeshMatcapMaterial ? (a(p, u), v(p, u)) : u.isMeshDepthMaterial ? a(p, u) : u.isMeshDistanceMaterial ? (a(p, u), x(p, u)) : u.isMeshNormalMaterial ? a(p, u) : u.isLineBasicMaterial ? (l(p, u), u.isLineDashedMaterial && s(p, u)) : u.isPointsMaterial ? o(p, u, y, _) : u.isSpriteMaterial ? c(p, u) : u.isShadowMaterial ? (p.color.value.copy(u.color), p.opacity.value = u.opacity) : u.isShaderMaterial && (u.uniformsNeedUpdate = !1);
  }
  function a(p, u) {
    p.opacity.value = u.opacity, u.color && p.diffuse.value.copy(u.color), u.emissive && p.emissive.value.copy(u.emissive).multiplyScalar(u.emissiveIntensity), u.map && (p.map.value = u.map, t(u.map, p.mapTransform)), u.alphaMap && (p.alphaMap.value = u.alphaMap, t(u.alphaMap, p.alphaMapTransform)), u.bumpMap && (p.bumpMap.value = u.bumpMap, t(u.bumpMap, p.bumpMapTransform), p.bumpScale.value = u.bumpScale, u.side === 1 && (p.bumpScale.value *= -1)), u.normalMap && (p.normalMap.value = u.normalMap, t(u.normalMap, p.normalMapTransform), p.normalScale.value.copy(u.normalScale), u.side === 1 && p.normalScale.value.negate()), u.displacementMap && (p.displacementMap.value = u.displacementMap, t(u.displacementMap, p.displacementMapTransform), p.displacementScale.value = u.displacementScale, p.displacementBias.value = u.displacementBias), u.emissiveMap && (p.emissiveMap.value = u.emissiveMap, t(u.emissiveMap, p.emissiveMapTransform)), u.specularMap && (p.specularMap.value = u.specularMap, t(u.specularMap, p.specularMapTransform)), u.alphaTest > 0 && (p.alphaTest.value = u.alphaTest);
    const y = e.get(u).envMap;
    if (y && (p.envMap.value = y, p.flipEnvMap.value = y.isCubeTexture && y.isRenderTargetTexture === !1 ? -1 : 1, p.reflectivity.value = u.reflectivity, p.ior.value = u.ior, p.refractionRatio.value = u.refractionRatio), u.lightMap) {
      p.lightMap.value = u.lightMap;
      const _ = i._useLegacyLights === !0 ? Math.PI : 1;
      p.lightMapIntensity.value = u.lightMapIntensity * _, t(u.lightMap, p.lightMapTransform);
    }
    u.aoMap && (p.aoMap.value = u.aoMap, p.aoMapIntensity.value = u.aoMapIntensity, t(u.aoMap, p.aoMapTransform));
  }
  function l(p, u) {
    p.diffuse.value.copy(u.color), p.opacity.value = u.opacity, u.map && (p.map.value = u.map, t(u.map, p.mapTransform));
  }
  function s(p, u) {
    p.dashSize.value = u.dashSize, p.totalSize.value = u.dashSize + u.gapSize, p.scale.value = u.scale;
  }
  function o(p, u, y, _) {
    p.diffuse.value.copy(u.color), p.opacity.value = u.opacity, p.size.value = u.size * y, p.scale.value = _ * 0.5, u.map && (p.map.value = u.map, t(u.map, p.uvTransform)), u.alphaMap && (p.alphaMap.value = u.alphaMap, t(u.alphaMap, p.alphaMapTransform)), u.alphaTest > 0 && (p.alphaTest.value = u.alphaTest);
  }
  function c(p, u) {
    p.diffuse.value.copy(u.color), p.opacity.value = u.opacity, p.rotation.value = u.rotation, u.map && (p.map.value = u.map, t(u.map, p.mapTransform)), u.alphaMap && (p.alphaMap.value = u.alphaMap, t(u.alphaMap, p.alphaMapTransform)), u.alphaTest > 0 && (p.alphaTest.value = u.alphaTest);
  }
  function h(p, u) {
    p.specular.value.copy(u.specular), p.shininess.value = Math.max(u.shininess, 1e-4);
  }
  function d(p, u) {
    u.gradientMap && (p.gradientMap.value = u.gradientMap);
  }
  function f(p, u) {
    p.metalness.value = u.metalness, u.metalnessMap && (p.metalnessMap.value = u.metalnessMap, t(u.metalnessMap, p.metalnessMapTransform)), p.roughness.value = u.roughness, u.roughnessMap && (p.roughnessMap.value = u.roughnessMap, t(u.roughnessMap, p.roughnessMapTransform)), e.get(u).envMap && (p.envMapIntensity.value = u.envMapIntensity);
  }
  function m(p, u, y) {
    p.ior.value = u.ior, u.sheen > 0 && (p.sheenColor.value.copy(u.sheenColor).multiplyScalar(u.sheen), p.sheenRoughness.value = u.sheenRoughness, u.sheenColorMap && (p.sheenColorMap.value = u.sheenColorMap, t(u.sheenColorMap, p.sheenColorMapTransform)), u.sheenRoughnessMap && (p.sheenRoughnessMap.value = u.sheenRoughnessMap, t(u.sheenRoughnessMap, p.sheenRoughnessMapTransform))), u.clearcoat > 0 && (p.clearcoat.value = u.clearcoat, p.clearcoatRoughness.value = u.clearcoatRoughness, u.clearcoatMap && (p.clearcoatMap.value = u.clearcoatMap, t(u.clearcoatMap, p.clearcoatMapTransform)), u.clearcoatRoughnessMap && (p.clearcoatRoughnessMap.value = u.clearcoatRoughnessMap, t(u.clearcoatRoughnessMap, p.clearcoatRoughnessMapTransform)), u.clearcoatNormalMap && (p.clearcoatNormalMap.value = u.clearcoatNormalMap, t(u.clearcoatNormalMap, p.clearcoatNormalMapTransform), p.clearcoatNormalScale.value.copy(u.clearcoatNormalScale), u.side === 1 && p.clearcoatNormalScale.value.negate())), u.iridescence > 0 && (p.iridescence.value = u.iridescence, p.iridescenceIOR.value = u.iridescenceIOR, p.iridescenceThicknessMinimum.value = u.iridescenceThicknessRange[0], p.iridescenceThicknessMaximum.value = u.iridescenceThicknessRange[1], u.iridescenceMap && (p.iridescenceMap.value = u.iridescenceMap, t(u.iridescenceMap, p.iridescenceMapTransform)), u.iridescenceThicknessMap && (p.iridescenceThicknessMap.value = u.iridescenceThicknessMap, t(u.iridescenceThicknessMap, p.iridescenceThicknessMapTransform))), u.transmission > 0 && (p.transmission.value = u.transmission, p.transmissionSamplerMap.value = y.texture, p.transmissionSamplerSize.value.set(y.width, y.height), u.transmissionMap && (p.transmissionMap.value = u.transmissionMap, t(u.transmissionMap, p.transmissionMapTransform)), p.thickness.value = u.thickness, u.thicknessMap && (p.thicknessMap.value = u.thicknessMap, t(u.thicknessMap, p.thicknessMapTransform)), p.attenuationDistance.value = u.attenuationDistance, p.attenuationColor.value.copy(u.attenuationColor)), u.anisotropy > 0 && (p.anisotropyVector.value.set(u.anisotropy * Math.cos(u.anisotropyRotation), u.anisotropy * Math.sin(u.anisotropyRotation)), u.anisotropyMap && (p.anisotropyMap.value = u.anisotropyMap, t(u.anisotropyMap, p.anisotropyMapTransform))), p.specularIntensity.value = u.specularIntensity, p.specularColor.value.copy(u.specularColor), u.specularColorMap && (p.specularColorMap.value = u.specularColorMap, t(u.specularColorMap, p.specularColorMapTransform)), u.specularIntensityMap && (p.specularIntensityMap.value = u.specularIntensityMap, t(u.specularIntensityMap, p.specularIntensityMapTransform));
  }
  function v(p, u) {
    u.matcap && (p.matcap.value = u.matcap);
  }
  function x(p, u) {
    const y = e.get(u).light;
    p.referencePosition.value.setFromMatrixPosition(y.matrixWorld), p.nearDistance.value = y.shadow.camera.near, p.farDistance.value = y.shadow.camera.far;
  }
  return {
    refreshFogUniforms: n,
    refreshMaterialUniforms: r
  };
}
function Pu(i, e, t, n) {
  let r = {}, a = {}, l = [];
  const s = t.isWebGL2 ? i.getParameter(i.MAX_UNIFORM_BUFFER_BINDINGS) : 0;
  function o(y, _) {
    const w = _.program;
    n.uniformBlockBinding(y, w);
  }
  function c(y, _) {
    let w = r[y.id];
    w === void 0 && (v(y), w = h(y), r[y.id] = w, y.addEventListener("dispose", p));
    const D = _.program;
    n.updateUBOMapping(y, D);
    const C = e.render.frame;
    a[y.id] !== C && (f(y), a[y.id] = C);
  }
  function h(y) {
    const _ = d();
    y.__bindingPointIndex = _;
    const w = i.createBuffer(), D = y.__size, C = y.usage;
    return i.bindBuffer(i.UNIFORM_BUFFER, w), i.bufferData(i.UNIFORM_BUFFER, D, C), i.bindBuffer(i.UNIFORM_BUFFER, null), i.bindBufferBase(i.UNIFORM_BUFFER, _, w), w;
  }
  function d() {
    for (let y = 0; y < s; y++)
      if (l.indexOf(y) === -1)
        return l.push(y), y;
    return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."), 0;
  }
  function f(y) {
    const _ = r[y.id], w = y.uniforms, D = y.__cache;
    i.bindBuffer(i.UNIFORM_BUFFER, _);
    for (let C = 0, R = w.length; C < R; C++) {
      const q = Array.isArray(w[C]) ? w[C] : [w[C]];
      for (let M = 0, T = q.length; M < T; M++) {
        const z = q[M];
        if (m(z, C, M, D) === !0) {
          const Y = z.__offset, re = Array.isArray(z.value) ? z.value : [z.value];
          let L = 0;
          for (let N = 0; N < re.length; N++) {
            const k = re[N], X = x(k);
            typeof k == "number" || typeof k == "boolean" ? (z.__data[0] = k, i.bufferSubData(i.UNIFORM_BUFFER, Y + L, z.__data)) : k.isMatrix3 ? (z.__data[0] = k.elements[0], z.__data[1] = k.elements[1], z.__data[2] = k.elements[2], z.__data[3] = 0, z.__data[4] = k.elements[3], z.__data[5] = k.elements[4], z.__data[6] = k.elements[5], z.__data[7] = 0, z.__data[8] = k.elements[6], z.__data[9] = k.elements[7], z.__data[10] = k.elements[8], z.__data[11] = 0) : (k.toArray(z.__data, L), L += X.storage / Float32Array.BYTES_PER_ELEMENT);
          }
          i.bufferSubData(i.UNIFORM_BUFFER, Y, z.__data);
        }
      }
    }
    i.bindBuffer(i.UNIFORM_BUFFER, null);
  }
  function m(y, _, w, D) {
    const C = y.value, R = _ + "_" + w;
    if (D[R] === void 0)
      return typeof C == "number" || typeof C == "boolean" ? D[R] = C : D[R] = C.clone(), !0;
    {
      const q = D[R];
      if (typeof C == "number" || typeof C == "boolean") {
        if (q !== C)
          return D[R] = C, !0;
      } else if (q.equals(C) === !1)
        return q.copy(C), !0;
    }
    return !1;
  }
  function v(y) {
    const _ = y.uniforms;
    let w = 0;
    const D = 16;
    for (let R = 0, q = _.length; R < q; R++) {
      const M = Array.isArray(_[R]) ? _[R] : [_[R]];
      for (let T = 0, z = M.length; T < z; T++) {
        const Y = M[T], re = Array.isArray(Y.value) ? Y.value : [Y.value];
        for (let L = 0, N = re.length; L < N; L++) {
          const k = re[L], X = x(k), W = w % D;
          W !== 0 && D - W < X.boundary && (w += D - W), Y.__data = new Float32Array(X.storage / Float32Array.BYTES_PER_ELEMENT), Y.__offset = w, w += X.storage;
        }
      }
    }
    const C = w % D;
    return C > 0 && (w += D - C), y.__size = w, y.__cache = {}, this;
  }
  function x(y) {
    const _ = {
      boundary: 0,
      // bytes
      storage: 0
      // bytes
    };
    return typeof y == "number" || typeof y == "boolean" ? (_.boundary = 4, _.storage = 4) : y.isVector2 ? (_.boundary = 8, _.storage = 8) : y.isVector3 || y.isColor ? (_.boundary = 16, _.storage = 12) : y.isVector4 ? (_.boundary = 16, _.storage = 16) : y.isMatrix3 ? (_.boundary = 48, _.storage = 48) : y.isMatrix4 ? (_.boundary = 64, _.storage = 64) : y.isTexture ? console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.") : console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", y), _;
  }
  function p(y) {
    const _ = y.target;
    _.removeEventListener("dispose", p);
    const w = l.indexOf(_.__bindingPointIndex);
    l.splice(w, 1), i.deleteBuffer(r[_.id]), delete r[_.id], delete a[_.id];
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
    let f;
    n !== null ? f = n.getContextAttributes().alpha : f = l;
    const m = new Uint32Array(4), v = new Int32Array(4);
    let x = null, p = null;
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
    const _ = this;
    let w = !1, D = 0, C = 0, R = null, q = -1, M = null;
    const T = new lt(), z = new lt();
    let Y = null;
    const re = new We(0);
    let L = 0, N = t.width, k = t.height, X = 1, W = null, V = null;
    const K = new lt(0, 0, N, k), J = new lt(0, 0, N, k);
    let le = !1;
    const H = new ca();
    let Z = !1, A = !1, Q = null;
    const ae = new ct(), he = new He(), Se = new B(), ge = { background: null, fog: null, environment: null, overrideMaterial: null, isScene: !0 };
    function we() {
      return R === null ? X : 1;
    }
    let U = n;
    function je(S, P) {
      for (let O = 0; O < S.length; O++) {
        const G = S[O], F = t.getContext(G, P);
        if (F !== null) return F;
      }
      return null;
    }
    try {
      const S = {
        alpha: !0,
        depth: r,
        stencil: a,
        antialias: s,
        premultipliedAlpha: o,
        preserveDrawingBuffer: c,
        powerPreference: h,
        failIfMajorPerformanceCaveat: d
      };
      if ("setAttribute" in t && t.setAttribute("data-engine", `three.js r${nr}`), t.addEventListener("webglcontextlost", ne, !1), t.addEventListener("webglcontextrestored", b, !1), t.addEventListener("webglcontextcreationerror", se, !1), U === null) {
        const P = ["webgl2", "webgl", "experimental-webgl"];
        if (_.isWebGL1Renderer === !0 && P.shift(), U = je(P, S), U === null)
          throw je(P) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
      }
      typeof WebGLRenderingContext < "u" && U instanceof WebGLRenderingContext && console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."), U.getShaderPrecisionFormat === void 0 && (U.getShaderPrecisionFormat = function() {
        return { rangeMin: 1, rangeMax: 1, precision: 1 };
      });
    } catch (S) {
      throw console.error("THREE.WebGLRenderer: " + S.message), S;
    }
    let ve, be, pe, Xe, Ue, E, g, I, ee, $, te, me, ce, fe, Te, Fe, j, Ve, Ge, Re, xe, de, Pe, ze;
    function Je() {
      ve = new zl(U), be = new Il(U, ve, e), ve.init(be), de = new bu(U, ve, be), pe = new yu(U, ve, be), Xe = new Wl(U), Ue = new uu(), E = new Au(U, ve, pe, Ue, be, de, Xe), g = new Ol(_), I = new Hl(_), ee = new $a(U, be), Pe = new Ul(U, ve, ee, be), $ = new Vl(U, ee, Xe, Pe), te = new Kl(U, $, ee, Xe), Ge = new Yl(U, be, E), Fe = new Nl(Ue), me = new cu(_, g, I, ve, be, Pe, Fe), ce = new Lu(_, Ue), fe = new fu(), Te = new vu(ve, be), Ve = new Dl(_, g, I, pe, te, f, o), j = new Tu(_, te, be), ze = new Pu(U, Xe, be, pe), Re = new Fl(U, ve, Xe, be), xe = new kl(U, ve, Xe, be), Xe.programs = me.programs, _.capabilities = be, _.extensions = ve, _.properties = Ue, _.renderLists = fe, _.shadowMap = j, _.state = pe, _.info = Xe;
    }
    Je();
    const Ne = new Cu(_, U);
    this.xr = Ne, this.getContext = function() {
      return U;
    }, this.getContextAttributes = function() {
      return U.getContextAttributes();
    }, this.forceContextLoss = function() {
      const S = ve.get("WEBGL_lose_context");
      S && S.loseContext();
    }, this.forceContextRestore = function() {
      const S = ve.get("WEBGL_lose_context");
      S && S.restoreContext();
    }, this.getPixelRatio = function() {
      return X;
    }, this.setPixelRatio = function(S) {
      S !== void 0 && (X = S, this.setSize(N, k, !1));
    }, this.getSize = function(S) {
      return S.set(N, k);
    }, this.setSize = function(S, P, O = !0) {
      if (Ne.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      N = S, k = P, t.width = Math.floor(S * X), t.height = Math.floor(P * X), O === !0 && (t.style.width = S + "px", t.style.height = P + "px"), this.setViewport(0, 0, S, P);
    }, this.getDrawingBufferSize = function(S) {
      return S.set(N * X, k * X).floor();
    }, this.setDrawingBufferSize = function(S, P, O) {
      N = S, k = P, X = O, t.width = Math.floor(S * O), t.height = Math.floor(P * O), this.setViewport(0, 0, S, P);
    }, this.getCurrentViewport = function(S) {
      return S.copy(T);
    }, this.getViewport = function(S) {
      return S.copy(K);
    }, this.setViewport = function(S, P, O, G) {
      S.isVector4 ? K.set(S.x, S.y, S.z, S.w) : K.set(S, P, O, G), pe.viewport(T.copy(K).multiplyScalar(X).floor());
    }, this.getScissor = function(S) {
      return S.copy(J);
    }, this.setScissor = function(S, P, O, G) {
      S.isVector4 ? J.set(S.x, S.y, S.z, S.w) : J.set(S, P, O, G), pe.scissor(z.copy(J).multiplyScalar(X).floor());
    }, this.getScissorTest = function() {
      return le;
    }, this.setScissorTest = function(S) {
      pe.setScissorTest(le = S);
    }, this.setOpaqueSort = function(S) {
      W = S;
    }, this.setTransparentSort = function(S) {
      V = S;
    }, this.getClearColor = function(S) {
      return S.copy(Ve.getClearColor());
    }, this.setClearColor = function() {
      Ve.setClearColor.apply(Ve, arguments);
    }, this.getClearAlpha = function() {
      return Ve.getClearAlpha();
    }, this.setClearAlpha = function() {
      Ve.setClearAlpha.apply(Ve, arguments);
    }, this.clear = function(S = !0, P = !0, O = !0) {
      let G = 0;
      if (S) {
        let F = !1;
        if (R !== null) {
          const ue = R.texture.format;
          F = ue === 1033 || ue === 1031 || ue === 1029;
        }
        if (F) {
          const ue = R.texture.type, _e = ue === 1009 || ue === 1014 || ue === 1012 || ue === 1020 || ue === 1017 || ue === 1018, Ee = Ve.getClearColor(), Ae = Ve.getClearAlpha(), Ie = Ee.r, Ce = Ee.g, Le = Ee.b;
          _e ? (m[0] = Ie, m[1] = Ce, m[2] = Le, m[3] = Ae, U.clearBufferuiv(U.COLOR, 0, m)) : (v[0] = Ie, v[1] = Ce, v[2] = Le, v[3] = Ae, U.clearBufferiv(U.COLOR, 0, v));
        } else
          G |= U.COLOR_BUFFER_BIT;
      }
      P && (G |= U.DEPTH_BUFFER_BIT), O && (G |= U.STENCIL_BUFFER_BIT, this.state.buffers.stencil.setMask(4294967295)), U.clear(G);
    }, this.clearColor = function() {
      this.clear(!0, !1, !1);
    }, this.clearDepth = function() {
      this.clear(!1, !0, !1);
    }, this.clearStencil = function() {
      this.clear(!1, !1, !0);
    }, this.dispose = function() {
      t.removeEventListener("webglcontextlost", ne, !1), t.removeEventListener("webglcontextrestored", b, !1), t.removeEventListener("webglcontextcreationerror", se, !1), fe.dispose(), Te.dispose(), Ue.dispose(), g.dispose(), I.dispose(), te.dispose(), Pe.dispose(), ze.dispose(), me.dispose(), Ne.dispose(), Ne.removeEventListener("sessionstart", dt), Ne.removeEventListener("sessionend", Ke), Q && (Q.dispose(), Q = null), pt.stop();
    };
    function ne(S) {
      S.preventDefault(), console.log("THREE.WebGLRenderer: Context Lost."), w = !0;
    }
    function b() {
      console.log("THREE.WebGLRenderer: Context Restored."), w = !1;
      const S = Xe.autoReset, P = j.enabled, O = j.autoUpdate, G = j.needsUpdate, F = j.type;
      Je(), Xe.autoReset = S, j.enabled = P, j.autoUpdate = O, j.needsUpdate = G, j.type = F;
    }
    function se(S) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", S.statusMessage);
    }
    function oe(S) {
      const P = S.target;
      P.removeEventListener("dispose", oe), ye(P);
    }
    function ye(S) {
      Me(S), Ue.remove(S);
    }
    function Me(S) {
      const P = Ue.get(S).programs;
      P !== void 0 && (P.forEach(function(O) {
        me.releaseProgram(O);
      }), S.isShaderMaterial && me.releaseShaderCache(S));
    }
    this.renderBufferDirect = function(S, P, O, G, F, ue) {
      P === null && (P = ge);
      const _e = F.isMesh && F.matrixWorld.determinant() < 0, Ee = Sa(S, P, O, G, F);
      pe.setMaterial(G, _e);
      let Ae = O.index, Ie = 1;
      if (G.wireframe === !0) {
        if (Ae = $.getWireframeAttribute(O), Ae === void 0) return;
        Ie = 2;
      }
      const Ce = O.drawRange, Le = O.attributes.position;
      let et = Ce.start * Ie, xt = (Ce.start + Ce.count) * Ie;
      ue !== null && (et = Math.max(et, ue.start * Ie), xt = Math.min(xt, (ue.start + ue.count) * Ie)), Ae !== null ? (et = Math.max(et, 0), xt = Math.min(xt, Ae.count)) : Le != null && (et = Math.max(et, 0), xt = Math.min(xt, Le.count));
      const at = xt - et;
      if (at < 0 || at === 1 / 0) return;
      Pe.setup(F, G, Ee, O, Ae);
      let It, $e = Re;
      if (Ae !== null && (It = ee.get(Ae), $e = xe, $e.setIndex(It)), F.isMesh)
        G.wireframe === !0 ? (pe.setLineWidth(G.wireframeLinewidth * we()), $e.setMode(U.LINES)) : $e.setMode(U.TRIANGLES);
      else if (F.isLine) {
        let Oe = G.linewidth;
        Oe === void 0 && (Oe = 1), pe.setLineWidth(Oe * we()), F.isLineSegments ? $e.setMode(U.LINES) : F.isLineLoop ? $e.setMode(U.LINE_LOOP) : $e.setMode(U.LINE_STRIP);
      } else F.isPoints ? $e.setMode(U.POINTS) : F.isSprite && $e.setMode(U.TRIANGLES);
      if (F.isBatchedMesh)
        $e.renderMultiDraw(F._multiDrawStarts, F._multiDrawCounts, F._multiDrawCount);
      else if (F.isInstancedMesh)
        $e.renderInstances(et, at, F.count);
      else if (O.isInstancedBufferGeometry) {
        const Oe = O._maxInstanceCount !== void 0 ? O._maxInstanceCount : 1 / 0, Mi = Math.min(O.instanceCount, Oe);
        $e.renderInstances(et, at, Mi);
      } else
        $e.render(et, at);
    };
    function qe(S, P, O) {
      S.transparent === !0 && S.side === 2 && S.forceSinglePass === !1 ? (S.side = 1, S.needsUpdate = !0, zn(S, P, O), S.side = 0, S.needsUpdate = !0, zn(S, P, O), S.side = 2) : zn(S, P, O);
    }
    this.compile = function(S, P, O = null) {
      O === null && (O = S), p = Te.get(O), p.init(), y.push(p), O.traverseVisible(function(F) {
        F.isLight && F.layers.test(P.layers) && (p.pushLight(F), F.castShadow && p.pushShadow(F));
      }), S !== O && S.traverseVisible(function(F) {
        F.isLight && F.layers.test(P.layers) && (p.pushLight(F), F.castShadow && p.pushShadow(F));
      }), p.setupLights(_._useLegacyLights);
      const G = /* @__PURE__ */ new Set();
      return S.traverse(function(F) {
        const ue = F.material;
        if (ue)
          if (Array.isArray(ue))
            for (let _e = 0; _e < ue.length; _e++) {
              const Ee = ue[_e];
              qe(Ee, O, F), G.add(Ee);
            }
          else
            qe(ue, O, F), G.add(ue);
      }), y.pop(), p = null, G;
    }, this.compileAsync = function(S, P, O = null) {
      const G = this.compile(S, P, O);
      return new Promise((F) => {
        function ue() {
          if (G.forEach(function(_e) {
            Ue.get(_e).currentProgram.isReady() && G.delete(_e);
          }), G.size === 0) {
            F(S);
            return;
          }
          setTimeout(ue, 10);
        }
        ve.get("KHR_parallel_shader_compile") !== null ? ue() : setTimeout(ue, 10);
      });
    };
    let Ye = null;
    function rt(S) {
      Ye && Ye(S);
    }
    function dt() {
      pt.stop();
    }
    function Ke() {
      pt.start();
    }
    const pt = new ua();
    pt.setAnimationLoop(rt), typeof self < "u" && pt.setContext(self), this.setAnimationLoop = function(S) {
      Ye = S, Ne.setAnimationLoop(S), S === null ? pt.stop() : pt.start();
    }, Ne.addEventListener("sessionstart", dt), Ne.addEventListener("sessionend", Ke), this.render = function(S, P) {
      if (P !== void 0 && P.isCamera !== !0) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (w === !0) return;
      S.matrixWorldAutoUpdate === !0 && S.updateMatrixWorld(), P.parent === null && P.matrixWorldAutoUpdate === !0 && P.updateMatrixWorld(), Ne.enabled === !0 && Ne.isPresenting === !0 && (Ne.cameraAutoUpdate === !0 && Ne.updateCamera(P), P = Ne.getCamera()), S.isScene === !0 && S.onBeforeRender(_, S, P, R), p = Te.get(S, y.length), p.init(), y.push(p), ae.multiplyMatrices(P.projectionMatrix, P.matrixWorldInverse), H.setFromProjectionMatrix(ae), A = this.localClippingEnabled, Z = Fe.init(this.clippingPlanes, A), x = fe.get(S, u.length), x.init(), u.push(x), Ut(S, P, 0, _.sortObjects), x.finish(), _.sortObjects === !0 && x.sort(W, V), this.info.render.frame++, Z === !0 && Fe.beginShadows();
      const O = p.state.shadowsArray;
      if (j.render(O, S, P), Z === !0 && Fe.endShadows(), this.info.autoReset === !0 && this.info.reset(), Ve.render(x, S), p.setupLights(_._useLegacyLights), P.isArrayCamera) {
        const G = P.cameras;
        for (let F = 0, ue = G.length; F < ue; F++) {
          const _e = G[F];
          sr(x, S, _e, _e.viewport);
        }
      } else
        sr(x, S, P);
      R !== null && (E.updateMultisampleRenderTarget(R), E.updateRenderTargetMipmap(R)), S.isScene === !0 && S.onAfterRender(_, S, P), Pe.resetDefaultState(), q = -1, M = null, y.pop(), y.length > 0 ? p = y[y.length - 1] : p = null, u.pop(), u.length > 0 ? x = u[u.length - 1] : x = null;
    };
    function Ut(S, P, O, G) {
      if (S.visible === !1) return;
      if (S.layers.test(P.layers)) {
        if (S.isGroup)
          O = S.renderOrder;
        else if (S.isLOD)
          S.autoUpdate === !0 && S.update(P);
        else if (S.isLight)
          p.pushLight(S), S.castShadow && p.pushShadow(S);
        else if (S.isSprite) {
          if (!S.frustumCulled || H.intersectsSprite(S)) {
            G && Se.setFromMatrixPosition(S.matrixWorld).applyMatrix4(ae);
            const _e = te.update(S), Ee = S.material;
            Ee.visible && x.push(S, _e, Ee, O, Se.z, null);
          }
        } else if ((S.isMesh || S.isLine || S.isPoints) && (!S.frustumCulled || H.intersectsObject(S))) {
          const _e = te.update(S), Ee = S.material;
          if (G && (S.boundingSphere !== void 0 ? (S.boundingSphere === null && S.computeBoundingSphere(), Se.copy(S.boundingSphere.center)) : (_e.boundingSphere === null && _e.computeBoundingSphere(), Se.copy(_e.boundingSphere.center)), Se.applyMatrix4(S.matrixWorld).applyMatrix4(ae)), Array.isArray(Ee)) {
            const Ae = _e.groups;
            for (let Ie = 0, Ce = Ae.length; Ie < Ce; Ie++) {
              const Le = Ae[Ie], et = Ee[Le.materialIndex];
              et && et.visible && x.push(S, _e, et, O, Se.z, Le);
            }
          } else Ee.visible && x.push(S, _e, Ee, O, Se.z, null);
        }
      }
      const ue = S.children;
      for (let _e = 0, Ee = ue.length; _e < Ee; _e++)
        Ut(ue[_e], P, O, G);
    }
    function sr(S, P, O, G) {
      const F = S.opaque, ue = S.transmissive, _e = S.transparent;
      p.setupLightsView(O), Z === !0 && Fe.setGlobalState(_.clippingPlanes, O), ue.length > 0 && xa(F, ue, P, O), G && pe.viewport(T.copy(G)), F.length > 0 && Hn(F, P, O), ue.length > 0 && Hn(ue, P, O), _e.length > 0 && Hn(_e, P, O), pe.buffers.depth.setTest(!0), pe.buffers.depth.setMask(!0), pe.buffers.color.setMask(!0), pe.setPolygonOffset(!1);
    }
    function xa(S, P, O, G) {
      if ((O.isScene === !0 ? O.overrideMaterial : null) !== null)
        return;
      const ue = be.isWebGL2;
      Q === null && (Q = new Vt(1, 1, {
        generateMipmaps: !0,
        type: ve.has("EXT_color_buffer_half_float") ? 1016 : 1009,
        minFilter: 1008,
        samples: ue ? 4 : 0
      })), _.getDrawingBufferSize(he), ue ? Q.setSize(he.x, he.y) : Q.setSize(er(he.x), er(he.y));
      const _e = _.getRenderTarget();
      _.setRenderTarget(Q), _.getClearColor(re), L = _.getClearAlpha(), L < 1 && _.setClearColor(16777215, 0.5), _.clear();
      const Ee = _.toneMapping;
      _.toneMapping = 0, Hn(S, O, G), E.updateMultisampleRenderTarget(Q), E.updateRenderTargetMipmap(Q);
      let Ae = !1;
      for (let Ie = 0, Ce = P.length; Ie < Ce; Ie++) {
        const Le = P[Ie], et = Le.object, xt = Le.geometry, at = Le.material, It = Le.group;
        if (at.side === 2 && et.layers.test(G.layers)) {
          const $e = at.side;
          at.side = 1, at.needsUpdate = !0, or(et, O, G, xt, at, It), at.side = $e, at.needsUpdate = !0, Ae = !0;
        }
      }
      Ae === !0 && (E.updateMultisampleRenderTarget(Q), E.updateRenderTargetMipmap(Q)), _.setRenderTarget(_e), _.setClearColor(re, L), _.toneMapping = Ee;
    }
    function Hn(S, P, O) {
      const G = P.isScene === !0 ? P.overrideMaterial : null;
      for (let F = 0, ue = S.length; F < ue; F++) {
        const _e = S[F], Ee = _e.object, Ae = _e.geometry, Ie = G === null ? _e.material : G, Ce = _e.group;
        Ee.layers.test(O.layers) && or(Ee, P, O, Ae, Ie, Ce);
      }
    }
    function or(S, P, O, G, F, ue) {
      S.onBeforeRender(_, P, O, G, F, ue), S.modelViewMatrix.multiplyMatrices(O.matrixWorldInverse, S.matrixWorld), S.normalMatrix.getNormalMatrix(S.modelViewMatrix), F.onBeforeRender(_, P, O, G, S, ue), F.transparent === !0 && F.side === 2 && F.forceSinglePass === !1 ? (F.side = 1, F.needsUpdate = !0, _.renderBufferDirect(O, P, G, F, S, ue), F.side = 0, F.needsUpdate = !0, _.renderBufferDirect(O, P, G, F, S, ue), F.side = 2) : _.renderBufferDirect(O, P, G, F, S, ue), S.onAfterRender(_, P, O, G, F, ue);
    }
    function zn(S, P, O) {
      P.isScene !== !0 && (P = ge);
      const G = Ue.get(S), F = p.state.lights, ue = p.state.shadowsArray, _e = F.state.version, Ee = me.getParameters(S, F.state, ue, P, O), Ae = me.getProgramCacheKey(Ee);
      let Ie = G.programs;
      G.environment = S.isMeshStandardMaterial ? P.environment : null, G.fog = P.fog, G.envMap = (S.isMeshStandardMaterial ? I : g).get(S.envMap || G.environment), Ie === void 0 && (S.addEventListener("dispose", oe), Ie = /* @__PURE__ */ new Map(), G.programs = Ie);
      let Ce = Ie.get(Ae);
      if (Ce !== void 0) {
        if (G.currentProgram === Ce && G.lightsStateVersion === _e)
          return cr(S, Ee), Ce;
      } else
        Ee.uniforms = me.getUniforms(S), S.onBuild(O, Ee, _), S.onBeforeCompile(Ee, _), Ce = me.acquireProgram(Ee, Ae), Ie.set(Ae, Ce), G.uniforms = Ee.uniforms;
      const Le = G.uniforms;
      return (!S.isShaderMaterial && !S.isRawShaderMaterial || S.clipping === !0) && (Le.clippingPlanes = Fe.uniform), cr(S, Ee), G.needsLights = Ea(S), G.lightsStateVersion = _e, G.needsLights && (Le.ambientLightColor.value = F.state.ambient, Le.lightProbe.value = F.state.probe, Le.directionalLights.value = F.state.directional, Le.directionalLightShadows.value = F.state.directionalShadow, Le.spotLights.value = F.state.spot, Le.spotLightShadows.value = F.state.spotShadow, Le.rectAreaLights.value = F.state.rectArea, Le.ltc_1.value = F.state.rectAreaLTC1, Le.ltc_2.value = F.state.rectAreaLTC2, Le.pointLights.value = F.state.point, Le.pointLightShadows.value = F.state.pointShadow, Le.hemisphereLights.value = F.state.hemi, Le.directionalShadowMap.value = F.state.directionalShadowMap, Le.directionalShadowMatrix.value = F.state.directionalShadowMatrix, Le.spotShadowMap.value = F.state.spotShadowMap, Le.spotLightMatrix.value = F.state.spotLightMatrix, Le.spotLightMap.value = F.state.spotLightMap, Le.pointShadowMap.value = F.state.pointShadowMap, Le.pointShadowMatrix.value = F.state.pointShadowMatrix), G.currentProgram = Ce, G.uniformsList = null, Ce;
    }
    function lr(S) {
      if (S.uniformsList === null) {
        const P = S.currentProgram.getUniforms();
        S.uniformsList = hi.seqWithValue(P.seq, S.uniforms);
      }
      return S.uniformsList;
    }
    function cr(S, P) {
      const O = Ue.get(S);
      O.outputColorSpace = P.outputColorSpace, O.batching = P.batching, O.instancing = P.instancing, O.instancingColor = P.instancingColor, O.skinning = P.skinning, O.morphTargets = P.morphTargets, O.morphNormals = P.morphNormals, O.morphColors = P.morphColors, O.morphTargetsCount = P.morphTargetsCount, O.numClippingPlanes = P.numClippingPlanes, O.numIntersection = P.numClipIntersection, O.vertexAlphas = P.vertexAlphas, O.vertexTangents = P.vertexTangents, O.toneMapping = P.toneMapping;
    }
    function Sa(S, P, O, G, F) {
      P.isScene !== !0 && (P = ge), E.resetTextureUnits();
      const ue = P.fog, _e = G.isMeshStandardMaterial ? P.environment : null, Ee = R === null ? _.outputColorSpace : R.isXRRenderTarget === !0 ? R.texture.colorSpace : zt, Ae = (G.isMeshStandardMaterial ? I : g).get(G.envMap || _e), Ie = G.vertexColors === !0 && !!O.attributes.color && O.attributes.color.itemSize === 4, Ce = !!O.attributes.tangent && (!!G.normalMap || G.anisotropy > 0), Le = !!O.morphAttributes.position, et = !!O.morphAttributes.normal, xt = !!O.morphAttributes.color;
      let at = 0;
      G.toneMapped && (R === null || R.isXRRenderTarget === !0) && (at = _.toneMapping);
      const It = O.morphAttributes.position || O.morphAttributes.normal || O.morphAttributes.color, $e = It !== void 0 ? It.length : 0, Oe = Ue.get(G), Mi = p.state.lights;
      if (Z === !0 && (A === !0 || S !== M)) {
        const Tt = S === M && G.id === q;
        Fe.setState(G, S, Tt);
      }
      let Qe = !1;
      G.version === Oe.__version ? (Oe.needsLights && Oe.lightsStateVersion !== Mi.state.version || Oe.outputColorSpace !== Ee || F.isBatchedMesh && Oe.batching === !1 || !F.isBatchedMesh && Oe.batching === !0 || F.isInstancedMesh && Oe.instancing === !1 || !F.isInstancedMesh && Oe.instancing === !0 || F.isSkinnedMesh && Oe.skinning === !1 || !F.isSkinnedMesh && Oe.skinning === !0 || F.isInstancedMesh && Oe.instancingColor === !0 && F.instanceColor === null || F.isInstancedMesh && Oe.instancingColor === !1 && F.instanceColor !== null || Oe.envMap !== Ae || G.fog === !0 && Oe.fog !== ue || Oe.numClippingPlanes !== void 0 && (Oe.numClippingPlanes !== Fe.numPlanes || Oe.numIntersection !== Fe.numIntersection) || Oe.vertexAlphas !== Ie || Oe.vertexTangents !== Ce || Oe.morphTargets !== Le || Oe.morphNormals !== et || Oe.morphColors !== xt || Oe.toneMapping !== at || be.isWebGL2 === !0 && Oe.morphTargetsCount !== $e) && (Qe = !0) : (Qe = !0, Oe.__version = G.version);
      let jt = Oe.currentProgram;
      Qe === !0 && (jt = zn(G, P, F));
      let ur = !1, wn = !1, Ei = !1;
      const ut = jt.getUniforms(), $t = Oe.uniforms;
      if (pe.useProgram(jt.program) && (ur = !0, wn = !0, Ei = !0), G.id !== q && (q = G.id, wn = !0), ur || M !== S) {
        ut.setValue(U, "projectionMatrix", S.projectionMatrix), ut.setValue(U, "viewMatrix", S.matrixWorldInverse);
        const Tt = ut.map.cameraPosition;
        Tt !== void 0 && Tt.setValue(U, Se.setFromMatrixPosition(S.matrixWorld)), be.logarithmicDepthBuffer && ut.setValue(
          U,
          "logDepthBufFC",
          2 / (Math.log(S.far + 1) / Math.LN2)
        ), (G.isMeshPhongMaterial || G.isMeshToonMaterial || G.isMeshLambertMaterial || G.isMeshBasicMaterial || G.isMeshStandardMaterial || G.isShaderMaterial) && ut.setValue(U, "isOrthographic", S.isOrthographicCamera === !0), M !== S && (M = S, wn = !0, Ei = !0);
      }
      if (F.isSkinnedMesh) {
        ut.setOptional(U, F, "bindMatrix"), ut.setOptional(U, F, "bindMatrixInverse");
        const Tt = F.skeleton;
        Tt && (be.floatVertexTextures ? (Tt.boneTexture === null && Tt.computeBoneTexture(), ut.setValue(U, "boneTexture", Tt.boneTexture, E)) : console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."));
      }
      F.isBatchedMesh && (ut.setOptional(U, F, "batchingTexture"), ut.setValue(U, "batchingTexture", F._matricesTexture, E));
      const Ti = O.morphAttributes;
      if ((Ti.position !== void 0 || Ti.normal !== void 0 || Ti.color !== void 0 && be.isWebGL2 === !0) && Ge.update(F, O, jt), (wn || Oe.receiveShadow !== F.receiveShadow) && (Oe.receiveShadow = F.receiveShadow, ut.setValue(U, "receiveShadow", F.receiveShadow)), G.isMeshGouraudMaterial && G.envMap !== null && ($t.envMap.value = Ae, $t.flipEnvMap.value = Ae.isCubeTexture && Ae.isRenderTargetTexture === !1 ? -1 : 1), wn && (ut.setValue(U, "toneMappingExposure", _.toneMappingExposure), Oe.needsLights && Ma($t, Ei), ue && G.fog === !0 && ce.refreshFogUniforms($t, ue), ce.refreshMaterialUniforms($t, G, X, k, Q), hi.upload(U, lr(Oe), $t, E)), G.isShaderMaterial && G.uniformsNeedUpdate === !0 && (hi.upload(U, lr(Oe), $t, E), G.uniformsNeedUpdate = !1), G.isSpriteMaterial && ut.setValue(U, "center", F.center), ut.setValue(U, "modelViewMatrix", F.modelViewMatrix), ut.setValue(U, "normalMatrix", F.normalMatrix), ut.setValue(U, "modelMatrix", F.matrixWorld), G.isShaderMaterial || G.isRawShaderMaterial) {
        const Tt = G.uniformsGroups;
        for (let yi = 0, Ta = Tt.length; yi < Ta; yi++)
          if (be.isWebGL2) {
            const hr = Tt[yi];
            ze.update(hr, jt), ze.bind(hr, jt);
          } else
            console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.");
      }
      return jt;
    }
    function Ma(S, P) {
      S.ambientLightColor.needsUpdate = P, S.lightProbe.needsUpdate = P, S.directionalLights.needsUpdate = P, S.directionalLightShadows.needsUpdate = P, S.pointLights.needsUpdate = P, S.pointLightShadows.needsUpdate = P, S.spotLights.needsUpdate = P, S.spotLightShadows.needsUpdate = P, S.rectAreaLights.needsUpdate = P, S.hemisphereLights.needsUpdate = P;
    }
    function Ea(S) {
      return S.isMeshLambertMaterial || S.isMeshToonMaterial || S.isMeshPhongMaterial || S.isMeshStandardMaterial || S.isShadowMaterial || S.isShaderMaterial && S.lights === !0;
    }
    this.getActiveCubeFace = function() {
      return D;
    }, this.getActiveMipmapLevel = function() {
      return C;
    }, this.getRenderTarget = function() {
      return R;
    }, this.setRenderTargetTextures = function(S, P, O) {
      Ue.get(S.texture).__webglTexture = P, Ue.get(S.depthTexture).__webglTexture = O;
      const G = Ue.get(S);
      G.__hasExternalTextures = !0, G.__hasExternalTextures && (G.__autoAllocateDepthBuffer = O === void 0, G.__autoAllocateDepthBuffer || ve.has("WEBGL_multisampled_render_to_texture") === !0 && (console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"), G.__useRenderToTexture = !1));
    }, this.setRenderTargetFramebuffer = function(S, P) {
      const O = Ue.get(S);
      O.__webglFramebuffer = P, O.__useDefaultFramebuffer = P === void 0;
    }, this.setRenderTarget = function(S, P = 0, O = 0) {
      R = S, D = P, C = O;
      let G = !0, F = null, ue = !1, _e = !1;
      if (S) {
        const Ae = Ue.get(S);
        Ae.__useDefaultFramebuffer !== void 0 ? (pe.bindFramebuffer(U.FRAMEBUFFER, null), G = !1) : Ae.__webglFramebuffer === void 0 ? E.setupRenderTarget(S) : Ae.__hasExternalTextures && E.rebindTextures(S, Ue.get(S.texture).__webglTexture, Ue.get(S.depthTexture).__webglTexture);
        const Ie = S.texture;
        (Ie.isData3DTexture || Ie.isDataArrayTexture || Ie.isCompressedArrayTexture) && (_e = !0);
        const Ce = Ue.get(S).__webglFramebuffer;
        S.isWebGLCubeRenderTarget ? (Array.isArray(Ce[P]) ? F = Ce[P][O] : F = Ce[P], ue = !0) : be.isWebGL2 && S.samples > 0 && E.useMultisampledRTT(S) === !1 ? F = Ue.get(S).__webglMultisampledFramebuffer : Array.isArray(Ce) ? F = Ce[O] : F = Ce, T.copy(S.viewport), z.copy(S.scissor), Y = S.scissorTest;
      } else
        T.copy(K).multiplyScalar(X).floor(), z.copy(J).multiplyScalar(X).floor(), Y = le;
      if (pe.bindFramebuffer(U.FRAMEBUFFER, F) && be.drawBuffers && G && pe.drawBuffers(S, F), pe.viewport(T), pe.scissor(z), pe.setScissorTest(Y), ue) {
        const Ae = Ue.get(S.texture);
        U.framebufferTexture2D(U.FRAMEBUFFER, U.COLOR_ATTACHMENT0, U.TEXTURE_CUBE_MAP_POSITIVE_X + P, Ae.__webglTexture, O);
      } else if (_e) {
        const Ae = Ue.get(S.texture), Ie = P || 0;
        U.framebufferTextureLayer(U.FRAMEBUFFER, U.COLOR_ATTACHMENT0, Ae.__webglTexture, O || 0, Ie);
      }
      q = -1;
    }, this.readRenderTargetPixels = function(S, P, O, G, F, ue, _e) {
      if (!(S && S.isWebGLRenderTarget)) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let Ee = Ue.get(S).__webglFramebuffer;
      if (S.isWebGLCubeRenderTarget && _e !== void 0 && (Ee = Ee[_e]), Ee) {
        pe.bindFramebuffer(U.FRAMEBUFFER, Ee);
        try {
          const Ae = S.texture, Ie = Ae.format, Ce = Ae.type;
          if (Ie !== 1023 && de.convert(Ie) !== U.getParameter(U.IMPLEMENTATION_COLOR_READ_FORMAT)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          const Le = Ce === 1016 && (ve.has("EXT_color_buffer_half_float") || be.isWebGL2 && ve.has("EXT_color_buffer_float"));
          if (Ce !== 1009 && de.convert(Ce) !== U.getParameter(U.IMPLEMENTATION_COLOR_READ_TYPE) && // Edge and Chrome Mac < 52 (#9513)
          !(Ce === 1015 && (be.isWebGL2 || ve.has("OES_texture_float") || ve.has("WEBGL_color_buffer_float"))) && // Chrome Mac >= 52 and Firefox
          !Le) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          P >= 0 && P <= S.width - G && O >= 0 && O <= S.height - F && U.readPixels(P, O, G, F, de.convert(Ie), de.convert(Ce), ue);
        } finally {
          const Ae = R !== null ? Ue.get(R).__webglFramebuffer : null;
          pe.bindFramebuffer(U.FRAMEBUFFER, Ae);
        }
      }
    }, this.copyFramebufferToTexture = function(S, P, O = 0) {
      const G = Math.pow(2, -O), F = Math.floor(P.image.width * G), ue = Math.floor(P.image.height * G);
      E.setTexture2D(P, 0), U.copyTexSubImage2D(U.TEXTURE_2D, O, 0, 0, S.x, S.y, F, ue), pe.unbindTexture();
    }, this.copyTextureToTexture = function(S, P, O, G = 0) {
      const F = P.image.width, ue = P.image.height, _e = de.convert(O.format), Ee = de.convert(O.type);
      E.setTexture2D(O, 0), U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL, O.flipY), U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL, O.premultiplyAlpha), U.pixelStorei(U.UNPACK_ALIGNMENT, O.unpackAlignment), P.isDataTexture ? U.texSubImage2D(U.TEXTURE_2D, G, S.x, S.y, F, ue, _e, Ee, P.image.data) : P.isCompressedTexture ? U.compressedTexSubImage2D(U.TEXTURE_2D, G, S.x, S.y, P.mipmaps[0].width, P.mipmaps[0].height, _e, P.mipmaps[0].data) : U.texSubImage2D(U.TEXTURE_2D, G, S.x, S.y, _e, Ee, P.image), G === 0 && O.generateMipmaps && U.generateMipmap(U.TEXTURE_2D), pe.unbindTexture();
    }, this.copyTextureToTexture3D = function(S, P, O, G, F = 0) {
      if (_.isWebGL1Renderer) {
        console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");
        return;
      }
      const ue = S.max.x - S.min.x + 1, _e = S.max.y - S.min.y + 1, Ee = S.max.z - S.min.z + 1, Ae = de.convert(G.format), Ie = de.convert(G.type);
      let Ce;
      if (G.isData3DTexture)
        E.setTexture3D(G, 0), Ce = U.TEXTURE_3D;
      else if (G.isDataArrayTexture || G.isCompressedArrayTexture)
        E.setTexture2DArray(G, 0), Ce = U.TEXTURE_2D_ARRAY;
      else {
        console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
        return;
      }
      U.pixelStorei(U.UNPACK_FLIP_Y_WEBGL, G.flipY), U.pixelStorei(U.UNPACK_PREMULTIPLY_ALPHA_WEBGL, G.premultiplyAlpha), U.pixelStorei(U.UNPACK_ALIGNMENT, G.unpackAlignment);
      const Le = U.getParameter(U.UNPACK_ROW_LENGTH), et = U.getParameter(U.UNPACK_IMAGE_HEIGHT), xt = U.getParameter(U.UNPACK_SKIP_PIXELS), at = U.getParameter(U.UNPACK_SKIP_ROWS), It = U.getParameter(U.UNPACK_SKIP_IMAGES), $e = O.isCompressedTexture ? O.mipmaps[F] : O.image;
      U.pixelStorei(U.UNPACK_ROW_LENGTH, $e.width), U.pixelStorei(U.UNPACK_IMAGE_HEIGHT, $e.height), U.pixelStorei(U.UNPACK_SKIP_PIXELS, S.min.x), U.pixelStorei(U.UNPACK_SKIP_ROWS, S.min.y), U.pixelStorei(U.UNPACK_SKIP_IMAGES, S.min.z), O.isDataTexture || O.isData3DTexture ? U.texSubImage3D(Ce, F, P.x, P.y, P.z, ue, _e, Ee, Ae, Ie, $e.data) : O.isCompressedArrayTexture ? (console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."), U.compressedTexSubImage3D(Ce, F, P.x, P.y, P.z, ue, _e, Ee, Ae, $e.data)) : U.texSubImage3D(Ce, F, P.x, P.y, P.z, ue, _e, Ee, Ae, Ie, $e), U.pixelStorei(U.UNPACK_ROW_LENGTH, Le), U.pixelStorei(U.UNPACK_IMAGE_HEIGHT, et), U.pixelStorei(U.UNPACK_SKIP_PIXELS, xt), U.pixelStorei(U.UNPACK_SKIP_ROWS, at), U.pixelStorei(U.UNPACK_SKIP_IMAGES, It), F === 0 && G.generateMipmaps && U.generateMipmap(Ce), pe.unbindTexture();
    }, this.initTexture = function(S) {
      S.isCubeTexture ? E.setTextureCube(S, 0) : S.isData3DTexture ? E.setTexture3D(S, 0) : S.isDataArrayTexture || S.isCompressedArrayTexture ? E.setTexture2DArray(S, 0) : E.setTexture2D(S, 0), pe.unbindTexture();
    }, this.resetState = function() {
      D = 0, C = 0, R = null, pe.reset(), Pe.reset();
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
  constructor(e = null, t = 1, n = 1, r, a, l, s, o, c = 1003, h = 1003, d, f) {
    super(null, l, s, o, c, h, r, a, d, f), this.isDataTexture = !0, this.image = { data: e, width: t, height: n }, this.generateMipmaps = !1, this.flipY = !1, this.unpackAlignment = 1;
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

uniform vec2 uHoverCenter;      
uniform float uHoverStrength;   

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
  
  
  if (uHoverStrength > 0.001) {
    
    vec2 uvNorm = vUv * 2.0 - 1.0;
    float d = distance(uvNorm, uHoverCenter);
    
    
    float hoverFalloff = smoothstep(0.4, 0.0, d);
    
    
    float hoverOffset = hoverFalloff * uHoverStrength * 0.025;
    
    H += hoverOffset;
  }
  
  
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
  colorIntensity: 0.8,
  hoverCenter: [0, 0],
  hoverStrength: 0,
  onFieldUpdate: void 0
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
  const s = new gi(new B(0, 0, 0), Math.sqrt(3));
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
    lightDir: new B(...t.lightDir),
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
    colorIntensity: t.colorIntensity,
    hoverCenter: new He(...t.hoverCenter),
    hoverStrength: t.hoverStrength
  };
  let c = t.onFieldUpdate, h = 0;
  const d = 33;
  let f = null, m = null, v = null;
  function x(A) {
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
  function p(A) {
    const Q = r.getExtension("EXT_color_buffer_half_float");
    return new Vt(A, A, {
      type: Q ? 1016 : 1015,
      format: 1028,
      internalFormat: Q ? "R16F" : "R32F",
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
  const u = new $i({
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
  }), y = new $i({
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
  }), _ = new $i({
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
      colorIntensity: { value: t.colorIntensity ?? 0.8 },
      uHoverCenter: { value: new He(...t.hoverCenter ?? [0, 0]) },
      uHoverStrength: { value: t.hoverStrength ?? 0 }
    }
  }), w = new Pt(l, u), D = new Pt(l, y), C = new Pt(l, _);
  w.frustumCulled = !1, D.frustumCulled = !1, C.frustumCulled = !1;
  const R = new ji();
  R.add(w);
  const q = new ji();
  q.add(D);
  const M = new ji();
  M.add(C);
  function T(A) {
    const Q = new Float32Array(A * A * 2);
    for (let he = 0; he < Q.length; he += 2)
      Q[he] = 1, Q[he + 1] = 0;
    const ae = 8 + Math.floor(Math.random() * 12);
    for (let he = 0; he < ae; he++) {
      const Se = Math.random(), ge = Math.random(), we = 0.03 + Math.random() * 0.05;
      for (let U = 0; U < A; U++)
        for (let je = 0; je < A; je++) {
          const ve = je / A - Se, be = U / A - ge;
          if (Math.hypot(ve, be) < we) {
            const Xe = (U * A + je) * 2;
            Q[Xe] = 0.5 + Math.random() * 0.3, Q[Xe + 1] = 0.7 + Math.random() * 0.3;
          }
        }
    }
    z(Q, A);
  }
  function z(A, Q) {
    if (!f) return;
    const ae = new Uu(A, Q, Q, 1030, 1015);
    ae.needsUpdate = !0;
    const he = n.getRenderTarget();
    n.setRenderTarget(f), n.clear(), n.copyTextureToTexture(new He(0, 0), ae, f.texture), n.setRenderTarget(he), ae.dispose();
  }
  function Y(A) {
    f && (f.dispose(), m == null || m.dispose(), v == null || v.dispose()), f = x(A), m = x(A), v = p(A), u.uniforms.uPrev.value = f.texture, u.uniforms.uTexel.value.set(1 / A, 1 / A), y.uniforms.uTexel.value.set(1 / A, 1 / A), _.uniforms.uTexel.value.set(1 / A, 1 / A), o.grid = A, T(A), N();
  }
  function re() {
    const A = window.devicePixelRatio || 1;
    n.setPixelRatio(A);
    const Q = i.clientWidth || window.innerWidth, ae = i.clientHeight || window.innerHeight;
    n.setSize(Q, ae, !1);
  }
  function L() {
    if (!(!f || !m)) {
      for (let A = 0; A < o.stepsPerFrame; A++) {
        u.uniforms.uPrev.value = f.texture, n.setRenderTarget(m), n.render(R, a);
        const Q = f;
        f = m, m = Q;
      }
      n.setRenderTarget(null);
    }
  }
  function N() {
    if (!f || !v) return;
    y.uniforms.uTexUV.value = f.texture, y.uniforms.uBlurRadius.value = o.blurRadius;
    const A = n.getRenderTarget();
    n.setRenderTarget(v), n.clear(), n.render(q, a), _.uniforms.uHeight.value = v.texture, n.setRenderTarget(A);
  }
  function k(A) {
    if (!f || !c) return null;
    const Q = f.width, ae = n.getRenderTarget();
    n.setRenderTarget(f);
    const he = new Float32Array(Q * Q * 2), Se = r;
    Se.readPixels(0, 0, Q, Q, Se.RG, Se.FLOAT, he), n.setRenderTarget(ae);
    const ge = new Float32Array(Q * Q);
    for (let we = 0; we < Q * Q; we++)
      ge[we] = he[we * 2 + 1];
    return {
      width: Q,
      height: Q,
      data: ge,
      dt: A
    };
  }
  let X = !0, W = null, V = 0;
  function K(A) {
    if (!X) return;
    W === null && (W = A);
    const Q = Math.max(0, (A - W) / 1e3);
    if (W = A, isNaN(o.time) && (o.time = 0), isNaN(Q) || !isFinite(Q)) {
      o.time = 0;
      return;
    }
    o.time += Q;
    const ae = isNaN(o.time) ? 0 : o.time;
    u.uniforms.uTime.value = ae;
    const he = 5, Se = 0.8, ge = 1.2, we = (Se + ge) / 2, U = (ge - Se) / 2, je = we + U * Math.sin(ae * Math.PI / he);
    if (u.uniforms.uDt.value = je, L(), N(), _.uniforms.lightDir.value.copy(o.lightDir).normalize(), _.uniforms.warpAmp.value = o.warpAmp, _.uniforms.warpScale.value = o.warpScale, _.uniforms.warpSpeed.value = o.warpSpeed, _.uniforms.time.value = ae, _.uniforms.showHeight.value = o.showHeight ? 1 : 0, _.uniforms.showBandsOnly.value = o.showBandsOnly ? 1 : 0, _.uniforms.enableColor.value = o.enableColor ? 1 : 0, _.uniforms.colorHueOffset.value = o.colorHueOffset, _.uniforms.colorSpeed.value = o.colorSpeed, _.uniforms.colorSaturation.value = o.colorSaturation, _.uniforms.colorIntensity.value = o.colorIntensity, _.uniforms.uHoverCenter.value.copy(o.hoverCenter), _.uniforms.uHoverStrength.value = o.hoverStrength, !_.uniforms.uHeight.value) {
      V = requestAnimationFrame(K);
      return;
    }
    if (n.setRenderTarget(null), n.clear(), n.render(M, a), c && A - h >= d) {
      const ve = k(je);
      ve && c(ve), h = A;
    }
    V = requestAnimationFrame(K);
  }
  const J = new ResizeObserver(() => {
    re();
  });
  J.observe(i);
  function le(A) {
    const Q = i.getBoundingClientRect(), ae = (A.clientX - Q.left) / Q.width, he = 1 - (A.clientY - Q.top) / Q.height;
    ae >= 0 && ae <= 1 && he >= 0 && he <= 1 ? (o.mouseUv.set(ae, he), u.uniforms.uMouse.value.copy(o.mouseUv), Math.random() < 0.01 && console.log("[TuringStripes] Mouse at UV:", ae.toFixed(3), he.toFixed(3), "TouchGain:", o.touchGain, "TouchRadius:", o.touchRadius)) : H();
  }
  function H() {
    o.mouseUv.set(-1, -1), u.uniforms.uMouse.value.copy(o.mouseUv);
  }
  return window.addEventListener("pointermove", le), window.addEventListener("pointerdown", le), window.addEventListener("pointerup", H), window.addEventListener("pointerleave", H), re(), n.setRenderTarget(null), n.clear(), Y(o.grid), V = requestAnimationFrame(K), {
    cleanup: () => {
      cancelAnimationFrame(V), J.disconnect(), window.removeEventListener("pointermove", le), window.removeEventListener("pointerdown", le), window.removeEventListener("pointerup", H), window.removeEventListener("pointerleave", H), X = !1, f && f.dispose(), m && m.dispose(), v && v.dispose(), u.dispose(), y.dispose(), _.dispose(), l.dispose(), n.dispose();
    },
    setParams: (A) => {
      A.gridSize !== void 0 && A.gridSize !== o.grid && (o.grid = A.gridSize, Y(A.gridSize)), A.stepsPerFrame !== void 0 && (o.stepsPerFrame = A.stepsPerFrame), A.dt !== void 0 && (o.dt = A.dt, u.uniforms.uDt.value = A.dt), A.f !== void 0 && (o.f = A.f, u.uniforms.uFeed.value = A.f), A.k !== void 0 && (o.k = A.k, u.uniforms.uKill.value = A.k), A.Du !== void 0 && (o.Du = A.Du, u.uniforms.uDu.value = A.Du), A.Dv !== void 0 && (o.Dv = A.Dv, u.uniforms.uDv.value = A.Dv), A.touchGain !== void 0 && (o.touchGain = A.touchGain, u.uniforms.uTouchGain.value = A.touchGain), A.touchRadius !== void 0 && (o.touchRadius = A.touchRadius, u.uniforms.uTouchRadius.value = A.touchRadius), A.blurRadius !== void 0 && (o.blurRadius = A.blurRadius, y.uniforms.uBlurRadius.value = A.blurRadius), A.freq !== void 0 && (o.freq = A.freq, _.uniforms.freq.value = A.freq), A.bandThickness !== void 0 && (o.bandThickness = A.bandThickness, _.uniforms.bandThickness.value = A.bandThickness), A.relief !== void 0 && (o.relief = A.relief, _.uniforms.relief.value = A.relief), A.exposure !== void 0 && (o.exposure = A.exposure, _.uniforms.exposure.value = A.exposure), A.warpAmp !== void 0 && (o.warpAmp = A.warpAmp, _.uniforms.warpAmp.value = A.warpAmp), A.warpScale !== void 0 && (o.warpScale = A.warpScale, _.uniforms.warpScale.value = A.warpScale), A.warpSpeed !== void 0 && (o.warpSpeed = A.warpSpeed, _.uniforms.warpSpeed.value = A.warpSpeed), A.ambient !== void 0 && (o.ambient = A.ambient, _.uniforms.ambient.value = A.ambient), A.diffuse !== void 0 && (o.diffuse = A.diffuse, _.uniforms.diffuse.value = A.diffuse), A.specular !== void 0 && (o.specular = A.specular, _.uniforms.specular.value = A.specular), A.shininess !== void 0 && (o.shininess = A.shininess, _.uniforms.shininess.value = A.shininess), A.rim !== void 0 && (o.rim = A.rim, _.uniforms.rim.value = A.rim), A.lightDir !== void 0 && (o.lightDir.set(...A.lightDir), _.uniforms.lightDir.value.copy(o.lightDir).normalize()), A.showHeight !== void 0 && (o.showHeight = A.showHeight, _.uniforms.showHeight.value = A.showHeight ? 1 : 0), A.showBandsOnly !== void 0 && (o.showBandsOnly = A.showBandsOnly, _.uniforms.showBandsOnly.value = A.showBandsOnly ? 1 : 0), A.enableColor !== void 0 && (o.enableColor = A.enableColor, _.uniforms.enableColor.value = A.enableColor ? 1 : 0), A.colorHueOffset !== void 0 && (o.colorHueOffset = A.colorHueOffset, _.uniforms.colorHueOffset.value = A.colorHueOffset), A.colorSpeed !== void 0 && (o.colorSpeed = A.colorSpeed, _.uniforms.colorSpeed.value = A.colorSpeed), A.colorSaturation !== void 0 && (o.colorSaturation = A.colorSaturation, _.uniforms.colorSaturation.value = A.colorSaturation), A.colorIntensity !== void 0 && (o.colorIntensity = A.colorIntensity, _.uniforms.colorIntensity.value = A.colorIntensity), A.hoverCenter !== void 0 && (o.hoverCenter.set(...A.hoverCenter), _.uniforms.uHoverCenter.value.copy(o.hoverCenter)), A.hoverStrength !== void 0 && (o.hoverStrength = A.hoverStrength, _.uniforms.uHoverStrength.value = A.hoverStrength), A.onFieldUpdate !== void 0 && (c = A.onFieldUpdate);
    },
    reseed: () => {
      f && (T(o.grid), N());
    }
  };
}
export {
  Bu as createTuringStripes
};
