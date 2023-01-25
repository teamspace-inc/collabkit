/* esm.sh - esbuild bundle(rehype-react@7.1.1) es2022 production */
var zn = Object.create;
var F = Object.defineProperty;
var Bn = Object.getOwnPropertyDescriptor;
var Fn = Object.getOwnPropertyNames;
var Hn = Object.getPrototypeOf,
  jn = Object.prototype.hasOwnProperty;
var L = (n, e) => () => (e || n((e = { exports: {} }).exports, e), e.exports),
  Xn = (n, e) => {
    for (var l in e) F(n, l, { get: e[l], enumerable: !0 });
  },
  _n = (n, e, l, t) => {
    if ((e && typeof e == 'object') || typeof e == 'function')
      for (let a of Fn(e))
        !jn.call(n, a) &&
          a !== l &&
          F(n, a, { get: () => e[a], enumerable: !(t = Bn(e, a)) || t.enumerable });
    return n;
  };
var $ = (n, e, l) => (
  (l = n != null ? zn(Hn(n)) : {}),
  _n(e || !n || !n.__esModule ? F(l, 'default', { value: n, enumerable: !0 }) : l, n)
);
var fn = L((Il, pn) => {
  var an = /\/\*[^*]*\*+([^/*][^*]*\*+)*\//g,
    Zn = /\n/g,
    Jn = /^\s*/,
    $n = /^(\*?[-#/*\\\w]+(\[[0-9a-z_-]+\])?)\s*/,
    Qn = /^:\s*/,
    ne = /^((?:'(?:\\'|.)*?'|"(?:\\"|.)*?"|\([^)]*?\)|[^};])+)/,
    ee = /^[;\s]*/,
    le = /^\s+|\s+$/g,
    te = `
`,
    un = '/',
    sn = '*',
    O = '',
    oe = 'comment',
    re = 'declaration';
  pn.exports = function (n, e) {
    if (typeof n != 'string') throw new TypeError('First argument must be a string');
    if (!n) return [];
    e = e || {};
    var l = 1,
      t = 1;
    function a(f) {
      var s = f.match(Zn);
      s && (l += s.length);
      var w = f.lastIndexOf(te);
      t = ~w ? f.length - w : t + f.length;
    }
    function r() {
      var f = { line: l, column: t };
      return function (s) {
        return (s.position = new i(f)), h(), s;
      };
    }
    function i(f) {
      (this.start = f), (this.end = { line: l, column: t }), (this.source = e.source);
    }
    i.prototype.content = n;
    var c = [];
    function y(f) {
      var s = new Error(e.source + ':' + l + ':' + t + ': ' + f);
      if (
        ((s.reason = f),
        (s.filename = e.source),
        (s.line = l),
        (s.column = t),
        (s.source = n),
        e.silent)
      )
        c.push(s);
      else throw s;
    }
    function d(f) {
      var s = f.exec(n);
      if (!!s) {
        var w = s[0];
        return a(w), (n = n.slice(w.length)), s;
      }
    }
    function h() {
      d(Jn);
    }
    function k(f) {
      var s;
      for (f = f || []; (s = S()); ) s !== !1 && f.push(s);
      return f;
    }
    function S() {
      var f = r();
      if (!(un != n.charAt(0) || sn != n.charAt(1))) {
        for (var s = 2; O != n.charAt(s) && (sn != n.charAt(s) || un != n.charAt(s + 1)); ) ++s;
        if (((s += 2), O === n.charAt(s - 1))) return y('End of comment missing');
        var w = n.slice(2, s - 2);
        return (t += 2), a(w), (n = n.slice(s)), (t += 2), f({ type: oe, comment: w });
      }
    }
    function In() {
      var f = r(),
        s = d($n);
      if (!!s) {
        if ((S(), !d(Qn))) return y("property missing ':'");
        var w = d(ne),
          Nn = f({
            type: re,
            property: cn(s[0].replace(an, O)),
            value: w ? cn(w[0].replace(an, O)) : O,
          });
        return d(ee), Nn;
      }
    }
    function Un() {
      var f = [];
      k(f);
      for (var s; (s = In()); ) s !== !1 && (f.push(s), k(f));
      return f;
    }
    return h(), Un();
  };
  function cn(n) {
    return n ? n.replace(le, O) : O;
  }
});
var dn = L((Ul, mn) => {
  var ae = fn();
  function ie(n, e) {
    var l = null;
    if (!n || typeof n != 'string') return l;
    for (var t, a = ae(n), r = typeof e == 'function', i, c, y = 0, d = a.length; y < d; y++)
      (t = a[y]),
        (i = t.property),
        (c = t.value),
        r ? e(i, c, t) : c && (l || (l = {}), (l[i] = c));
    return l;
  }
  mn.exports = ie;
});
var wn = L((Vl, xn) => {
  'use strict';
  xn.exports = kn;
  function kn(n) {
    if (typeof n == 'string') return Pe(n);
    if (n == null) return Oe;
    if (typeof n == 'object') return ('length' in n ? Ee : Ce)(n);
    if (typeof n == 'function') return n;
    throw new Error('Expected function, string, or object as test');
  }
  function Se(n) {
    for (var e = [], l = n.length, t = -1; ++t < l; ) e[t] = kn(n[t]);
    return e;
  }
  function Ce(n) {
    return e;
    function e(l) {
      var t;
      for (t in n) if (l[t] !== n[t]) return !1;
      return !0;
    }
  }
  function Ee(n) {
    var e = Se(n),
      l = e.length;
    return t;
    function t() {
      for (var a = -1; ++a < l; ) if (e[a].apply(this, arguments)) return !0;
      return !1;
    }
  }
  function Pe(n) {
    return e;
    function e(l) {
      return Boolean(l && l.type === n);
    }
  }
  function Oe() {
    return !0;
  }
});
var Pn = L((Kl, En) => {
  'use strict';
  En.exports = N;
  var Le = wn(),
    Sn = !0,
    Cn = 'skip',
    U = !1;
  N.CONTINUE = Sn;
  N.SKIP = Cn;
  N.EXIT = U;
  function N(n, e, l, t) {
    var a;
    typeof e == 'function' && typeof l != 'function' && ((t = l), (l = e), (e = null)),
      (a = Le(e)),
      r(n, null, []);
    function r(c, y, d) {
      var h = [],
        k;
      return (!e || a(c, y, d[d.length - 1] || null)) && ((h = bn(l(c, d))), h[0] === U)
        ? h
        : c.children && h[0] !== Cn
        ? ((k = bn(i(c.children, d.concat(c)))), k[0] === U ? k : h)
        : h;
    }
    function i(c, y) {
      for (var d = -1, h = t ? -1 : 1, k = (t ? c.length : d) + h, S; k > d && k < c.length; ) {
        if (((S = r(c[k], k, y)), S[0] === U)) return S;
        k = typeof S[1] == 'number' ? S[1] : k + h;
      }
    }
  }
  function bn(n) {
    return n !== null && typeof n == 'object' && 'length' in n
      ? n
      : typeof n == 'number'
      ? [Sn, n]
      : [n];
  }
});
var Ln = L((Wl, On) => {
  'use strict';
  On.exports = B;
  var z = Pn(),
    Te = z.CONTINUE,
    Me = z.SKIP,
    Re = z.EXIT;
  B.CONTINUE = Te;
  B.SKIP = Me;
  B.EXIT = Re;
  function B(n, e, l, t) {
    typeof e == 'function' && typeof l != 'function' && ((t = l), (l = e), (e = null)),
      z(n, e, a, t);
    function a(r, i) {
      var c = i[i.length - 1],
        y = c ? c.children.indexOf(r) : null;
      return l(r, y, c);
    }
  }
});
var Mn = L((ql, Tn) => {
  'use strict';
  var De = Ln(),
    Ae = Object.prototype.hasOwnProperty,
    J = { align: 'text-align', valign: 'vertical-align', height: 'height', width: 'width' };
  Tn.exports = function (e) {
    return De(e, 'element', Ie), e;
  };
  function Ie(n) {
    if (!(n.tagName !== 'tr' && n.tagName !== 'td' && n.tagName !== 'th')) {
      var e, l;
      for (e in J)
        !Ae.call(J, e) ||
          n.properties[e] === void 0 ||
          ((l = J[e]), Ue(n, l, n.properties[e]), delete n.properties[e]);
    }
  }
  function Ue(n, e, l) {
    var t = (n.properties.style || '').trim();
    t && !/;\s*/.test(t) && (t += ';'), t && (t += ' ');
    var a = t + e + ': ' + l + ';';
    n.properties.style = a;
  }
});
var b = class {
  constructor(e, l, t) {
    (this.property = e), (this.normal = l), t && (this.space = t);
  }
};
b.prototype.property = {};
b.prototype.normal = {};
b.prototype.space = null;
function H(n, e) {
  let l = {},
    t = {},
    a = -1;
  for (; ++a < n.length; ) Object.assign(l, n[a].property), Object.assign(t, n[a].normal);
  return new b(l, t, e);
}
function T(n) {
  return n.toLowerCase();
}
var g = class {
  constructor(e, l) {
    (this.property = e), (this.attribute = l);
  }
};
g.prototype.space = null;
g.prototype.boolean = !1;
g.prototype.booleanish = !1;
g.prototype.overloadedBoolean = !1;
g.prototype.number = !1;
g.prototype.commaSeparated = !1;
g.prototype.spaceSeparated = !1;
g.prototype.commaOrSpaceSeparated = !1;
g.prototype.mustUseProperty = !1;
g.prototype.defined = !1;
var M = {};
Xn(M, {
  boolean: () => u,
  booleanish: () => m,
  commaOrSpaceSeparated: () => v,
  commaSeparated: () => C,
  number: () => o,
  overloadedBoolean: () => j,
  spaceSeparated: () => p,
});
var Vn = 0,
  u = E(),
  m = E(),
  j = E(),
  o = E(),
  p = E(),
  C = E(),
  v = E();
function E() {
  return 2 ** ++Vn;
}
var X = Object.keys(M),
  P = class extends g {
    constructor(e, l, t, a) {
      let r = -1;
      if ((super(e, l), Q(this, 'space', a), typeof t == 'number'))
        for (; ++r < X.length; ) {
          let i = X[r];
          Q(this, X[r], (t & M[i]) === M[i]);
        }
    }
  };
P.prototype.defined = !0;
function Q(n, e, l) {
  l && (n[e] = l);
}
var Kn = {}.hasOwnProperty;
function x(n) {
  let e = {},
    l = {},
    t;
  for (t in n.properties)
    if (Kn.call(n.properties, t)) {
      let a = n.properties[t],
        r = new P(t, n.transform(n.attributes || {}, t), a, n.space);
      n.mustUseProperty && n.mustUseProperty.includes(t) && (r.mustUseProperty = !0),
        (e[t] = r),
        (l[T(t)] = t),
        (l[T(r.attribute)] = t);
    }
  return new b(e, l, n.space);
}
var _ = x({
  space: 'xlink',
  transform(n, e) {
    return 'xlink:' + e.slice(5).toLowerCase();
  },
  properties: {
    xLinkActuate: null,
    xLinkArcRole: null,
    xLinkHref: null,
    xLinkRole: null,
    xLinkShow: null,
    xLinkTitle: null,
    xLinkType: null,
  },
});
var V = x({
  space: 'xml',
  transform(n, e) {
    return 'xml:' + e.slice(3).toLowerCase();
  },
  properties: { xmlLang: null, xmlBase: null, xmlSpace: null },
});
function D(n, e) {
  return e in n ? n[e] : e;
}
function A(n, e) {
  return D(n, e.toLowerCase());
}
var K = x({
  space: 'xmlns',
  attributes: { xmlnsxlink: 'xmlns:xlink' },
  transform: A,
  properties: { xmlns: null, xmlnsXLink: null },
});
var W = x({
  transform(n, e) {
    return e === 'role' ? e : 'aria-' + e.slice(4).toLowerCase();
  },
  properties: {
    ariaActiveDescendant: null,
    ariaAtomic: m,
    ariaAutoComplete: null,
    ariaBusy: m,
    ariaChecked: m,
    ariaColCount: o,
    ariaColIndex: o,
    ariaColSpan: o,
    ariaControls: p,
    ariaCurrent: null,
    ariaDescribedBy: p,
    ariaDetails: null,
    ariaDisabled: m,
    ariaDropEffect: p,
    ariaErrorMessage: null,
    ariaExpanded: m,
    ariaFlowTo: p,
    ariaGrabbed: m,
    ariaHasPopup: null,
    ariaHidden: m,
    ariaInvalid: null,
    ariaKeyShortcuts: null,
    ariaLabel: null,
    ariaLabelledBy: p,
    ariaLevel: o,
    ariaLive: null,
    ariaModal: m,
    ariaMultiLine: m,
    ariaMultiSelectable: m,
    ariaOrientation: null,
    ariaOwns: p,
    ariaPlaceholder: null,
    ariaPosInSet: o,
    ariaPressed: m,
    ariaReadOnly: m,
    ariaRelevant: null,
    ariaRequired: m,
    ariaRoleDescription: p,
    ariaRowCount: o,
    ariaRowIndex: o,
    ariaRowSpan: o,
    ariaSelected: m,
    ariaSetSize: o,
    ariaSort: null,
    ariaValueMax: o,
    ariaValueMin: o,
    ariaValueNow: o,
    ariaValueText: null,
    role: null,
  },
});
var nn = x({
  space: 'html',
  attributes: {
    acceptcharset: 'accept-charset',
    classname: 'class',
    htmlfor: 'for',
    httpequiv: 'http-equiv',
  },
  transform: A,
  mustUseProperty: ['checked', 'multiple', 'muted', 'selected'],
  properties: {
    abbr: null,
    accept: C,
    acceptCharset: p,
    accessKey: p,
    action: null,
    allow: null,
    allowFullScreen: u,
    allowPaymentRequest: u,
    allowUserMedia: u,
    alt: null,
    as: null,
    async: u,
    autoCapitalize: null,
    autoComplete: p,
    autoFocus: u,
    autoPlay: u,
    capture: u,
    charSet: null,
    checked: u,
    cite: null,
    className: p,
    cols: o,
    colSpan: null,
    content: null,
    contentEditable: m,
    controls: u,
    controlsList: p,
    coords: o | C,
    crossOrigin: null,
    data: null,
    dateTime: null,
    decoding: null,
    default: u,
    defer: u,
    dir: null,
    dirName: null,
    disabled: u,
    download: j,
    draggable: m,
    encType: null,
    enterKeyHint: null,
    form: null,
    formAction: null,
    formEncType: null,
    formMethod: null,
    formNoValidate: u,
    formTarget: null,
    headers: p,
    height: o,
    hidden: u,
    high: o,
    href: null,
    hrefLang: null,
    htmlFor: p,
    httpEquiv: p,
    id: null,
    imageSizes: null,
    imageSrcSet: null,
    inputMode: null,
    integrity: null,
    is: null,
    isMap: u,
    itemId: null,
    itemProp: p,
    itemRef: p,
    itemScope: u,
    itemType: p,
    kind: null,
    label: null,
    lang: null,
    language: null,
    list: null,
    loading: null,
    loop: u,
    low: o,
    manifest: null,
    max: null,
    maxLength: o,
    media: null,
    method: null,
    min: null,
    minLength: o,
    multiple: u,
    muted: u,
    name: null,
    nonce: null,
    noModule: u,
    noValidate: u,
    onAbort: null,
    onAfterPrint: null,
    onAuxClick: null,
    onBeforePrint: null,
    onBeforeUnload: null,
    onBlur: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onContextLost: null,
    onContextMenu: null,
    onContextRestored: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFormData: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLanguageChange: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadEnd: null,
    onLoadStart: null,
    onMessage: null,
    onMessageError: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRejectionHandled: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSecurityPolicyViolation: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onSlotChange: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnhandledRejection: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onWheel: null,
    open: u,
    optimum: o,
    pattern: null,
    ping: p,
    placeholder: null,
    playsInline: u,
    poster: null,
    preload: null,
    readOnly: u,
    referrerPolicy: null,
    rel: p,
    required: u,
    reversed: u,
    rows: o,
    rowSpan: o,
    sandbox: p,
    scope: null,
    scoped: u,
    seamless: u,
    selected: u,
    shape: null,
    size: o,
    sizes: null,
    slot: null,
    span: o,
    spellCheck: m,
    src: null,
    srcDoc: null,
    srcLang: null,
    srcSet: null,
    start: o,
    step: null,
    style: null,
    tabIndex: o,
    target: null,
    title: null,
    translate: null,
    type: null,
    typeMustMatch: u,
    useMap: null,
    value: m,
    width: o,
    wrap: null,
    align: null,
    aLink: null,
    archive: p,
    axis: null,
    background: null,
    bgColor: null,
    border: o,
    borderColor: null,
    bottomMargin: o,
    cellPadding: null,
    cellSpacing: null,
    char: null,
    charOff: null,
    classId: null,
    clear: null,
    code: null,
    codeBase: null,
    codeType: null,
    color: null,
    compact: u,
    declare: u,
    event: null,
    face: null,
    frame: null,
    frameBorder: null,
    hSpace: o,
    leftMargin: o,
    link: null,
    longDesc: null,
    lowSrc: null,
    marginHeight: o,
    marginWidth: o,
    noResize: u,
    noHref: u,
    noShade: u,
    noWrap: u,
    object: null,
    profile: null,
    prompt: null,
    rev: null,
    rightMargin: o,
    rules: null,
    scheme: null,
    scrolling: m,
    standby: null,
    summary: null,
    text: null,
    topMargin: o,
    valueType: null,
    version: null,
    vAlign: null,
    vLink: null,
    vSpace: o,
    allowTransparency: null,
    autoCorrect: null,
    autoSave: null,
    disablePictureInPicture: u,
    disableRemotePlayback: u,
    prefix: null,
    property: null,
    results: o,
    security: null,
    unselectable: null,
  },
});
var en = x({
  space: 'svg',
  attributes: {
    accentHeight: 'accent-height',
    alignmentBaseline: 'alignment-baseline',
    arabicForm: 'arabic-form',
    baselineShift: 'baseline-shift',
    capHeight: 'cap-height',
    className: 'class',
    clipPath: 'clip-path',
    clipRule: 'clip-rule',
    colorInterpolation: 'color-interpolation',
    colorInterpolationFilters: 'color-interpolation-filters',
    colorProfile: 'color-profile',
    colorRendering: 'color-rendering',
    crossOrigin: 'crossorigin',
    dataType: 'datatype',
    dominantBaseline: 'dominant-baseline',
    enableBackground: 'enable-background',
    fillOpacity: 'fill-opacity',
    fillRule: 'fill-rule',
    floodColor: 'flood-color',
    floodOpacity: 'flood-opacity',
    fontFamily: 'font-family',
    fontSize: 'font-size',
    fontSizeAdjust: 'font-size-adjust',
    fontStretch: 'font-stretch',
    fontStyle: 'font-style',
    fontVariant: 'font-variant',
    fontWeight: 'font-weight',
    glyphName: 'glyph-name',
    glyphOrientationHorizontal: 'glyph-orientation-horizontal',
    glyphOrientationVertical: 'glyph-orientation-vertical',
    hrefLang: 'hreflang',
    horizAdvX: 'horiz-adv-x',
    horizOriginX: 'horiz-origin-x',
    horizOriginY: 'horiz-origin-y',
    imageRendering: 'image-rendering',
    letterSpacing: 'letter-spacing',
    lightingColor: 'lighting-color',
    markerEnd: 'marker-end',
    markerMid: 'marker-mid',
    markerStart: 'marker-start',
    navDown: 'nav-down',
    navDownLeft: 'nav-down-left',
    navDownRight: 'nav-down-right',
    navLeft: 'nav-left',
    navNext: 'nav-next',
    navPrev: 'nav-prev',
    navRight: 'nav-right',
    navUp: 'nav-up',
    navUpLeft: 'nav-up-left',
    navUpRight: 'nav-up-right',
    onAbort: 'onabort',
    onActivate: 'onactivate',
    onAfterPrint: 'onafterprint',
    onBeforePrint: 'onbeforeprint',
    onBegin: 'onbegin',
    onCancel: 'oncancel',
    onCanPlay: 'oncanplay',
    onCanPlayThrough: 'oncanplaythrough',
    onChange: 'onchange',
    onClick: 'onclick',
    onClose: 'onclose',
    onCopy: 'oncopy',
    onCueChange: 'oncuechange',
    onCut: 'oncut',
    onDblClick: 'ondblclick',
    onDrag: 'ondrag',
    onDragEnd: 'ondragend',
    onDragEnter: 'ondragenter',
    onDragExit: 'ondragexit',
    onDragLeave: 'ondragleave',
    onDragOver: 'ondragover',
    onDragStart: 'ondragstart',
    onDrop: 'ondrop',
    onDurationChange: 'ondurationchange',
    onEmptied: 'onemptied',
    onEnd: 'onend',
    onEnded: 'onended',
    onError: 'onerror',
    onFocus: 'onfocus',
    onFocusIn: 'onfocusin',
    onFocusOut: 'onfocusout',
    onHashChange: 'onhashchange',
    onInput: 'oninput',
    onInvalid: 'oninvalid',
    onKeyDown: 'onkeydown',
    onKeyPress: 'onkeypress',
    onKeyUp: 'onkeyup',
    onLoad: 'onload',
    onLoadedData: 'onloadeddata',
    onLoadedMetadata: 'onloadedmetadata',
    onLoadStart: 'onloadstart',
    onMessage: 'onmessage',
    onMouseDown: 'onmousedown',
    onMouseEnter: 'onmouseenter',
    onMouseLeave: 'onmouseleave',
    onMouseMove: 'onmousemove',
    onMouseOut: 'onmouseout',
    onMouseOver: 'onmouseover',
    onMouseUp: 'onmouseup',
    onMouseWheel: 'onmousewheel',
    onOffline: 'onoffline',
    onOnline: 'ononline',
    onPageHide: 'onpagehide',
    onPageShow: 'onpageshow',
    onPaste: 'onpaste',
    onPause: 'onpause',
    onPlay: 'onplay',
    onPlaying: 'onplaying',
    onPopState: 'onpopstate',
    onProgress: 'onprogress',
    onRateChange: 'onratechange',
    onRepeat: 'onrepeat',
    onReset: 'onreset',
    onResize: 'onresize',
    onScroll: 'onscroll',
    onSeeked: 'onseeked',
    onSeeking: 'onseeking',
    onSelect: 'onselect',
    onShow: 'onshow',
    onStalled: 'onstalled',
    onStorage: 'onstorage',
    onSubmit: 'onsubmit',
    onSuspend: 'onsuspend',
    onTimeUpdate: 'ontimeupdate',
    onToggle: 'ontoggle',
    onUnload: 'onunload',
    onVolumeChange: 'onvolumechange',
    onWaiting: 'onwaiting',
    onZoom: 'onzoom',
    overlinePosition: 'overline-position',
    overlineThickness: 'overline-thickness',
    paintOrder: 'paint-order',
    panose1: 'panose-1',
    pointerEvents: 'pointer-events',
    referrerPolicy: 'referrerpolicy',
    renderingIntent: 'rendering-intent',
    shapeRendering: 'shape-rendering',
    stopColor: 'stop-color',
    stopOpacity: 'stop-opacity',
    strikethroughPosition: 'strikethrough-position',
    strikethroughThickness: 'strikethrough-thickness',
    strokeDashArray: 'stroke-dasharray',
    strokeDashOffset: 'stroke-dashoffset',
    strokeLineCap: 'stroke-linecap',
    strokeLineJoin: 'stroke-linejoin',
    strokeMiterLimit: 'stroke-miterlimit',
    strokeOpacity: 'stroke-opacity',
    strokeWidth: 'stroke-width',
    tabIndex: 'tabindex',
    textAnchor: 'text-anchor',
    textDecoration: 'text-decoration',
    textRendering: 'text-rendering',
    typeOf: 'typeof',
    underlinePosition: 'underline-position',
    underlineThickness: 'underline-thickness',
    unicodeBidi: 'unicode-bidi',
    unicodeRange: 'unicode-range',
    unitsPerEm: 'units-per-em',
    vAlphabetic: 'v-alphabetic',
    vHanging: 'v-hanging',
    vIdeographic: 'v-ideographic',
    vMathematical: 'v-mathematical',
    vectorEffect: 'vector-effect',
    vertAdvY: 'vert-adv-y',
    vertOriginX: 'vert-origin-x',
    vertOriginY: 'vert-origin-y',
    wordSpacing: 'word-spacing',
    writingMode: 'writing-mode',
    xHeight: 'x-height',
    playbackOrder: 'playbackorder',
    timelineBegin: 'timelinebegin',
  },
  transform: D,
  properties: {
    about: v,
    accentHeight: o,
    accumulate: null,
    additive: null,
    alignmentBaseline: null,
    alphabetic: o,
    amplitude: o,
    arabicForm: null,
    ascent: o,
    attributeName: null,
    attributeType: null,
    azimuth: o,
    bandwidth: null,
    baselineShift: null,
    baseFrequency: null,
    baseProfile: null,
    bbox: null,
    begin: null,
    bias: o,
    by: null,
    calcMode: null,
    capHeight: o,
    className: p,
    clip: null,
    clipPath: null,
    clipPathUnits: null,
    clipRule: null,
    color: null,
    colorInterpolation: null,
    colorInterpolationFilters: null,
    colorProfile: null,
    colorRendering: null,
    content: null,
    contentScriptType: null,
    contentStyleType: null,
    crossOrigin: null,
    cursor: null,
    cx: null,
    cy: null,
    d: null,
    dataType: null,
    defaultAction: null,
    descent: o,
    diffuseConstant: o,
    direction: null,
    display: null,
    dur: null,
    divisor: o,
    dominantBaseline: null,
    download: u,
    dx: null,
    dy: null,
    edgeMode: null,
    editable: null,
    elevation: o,
    enableBackground: null,
    end: null,
    event: null,
    exponent: o,
    externalResourcesRequired: null,
    fill: null,
    fillOpacity: o,
    fillRule: null,
    filter: null,
    filterRes: null,
    filterUnits: null,
    floodColor: null,
    floodOpacity: null,
    focusable: null,
    focusHighlight: null,
    fontFamily: null,
    fontSize: null,
    fontSizeAdjust: null,
    fontStretch: null,
    fontStyle: null,
    fontVariant: null,
    fontWeight: null,
    format: null,
    fr: null,
    from: null,
    fx: null,
    fy: null,
    g1: C,
    g2: C,
    glyphName: C,
    glyphOrientationHorizontal: null,
    glyphOrientationVertical: null,
    glyphRef: null,
    gradientTransform: null,
    gradientUnits: null,
    handler: null,
    hanging: o,
    hatchContentUnits: null,
    hatchUnits: null,
    height: null,
    href: null,
    hrefLang: null,
    horizAdvX: o,
    horizOriginX: o,
    horizOriginY: o,
    id: null,
    ideographic: o,
    imageRendering: null,
    initialVisibility: null,
    in: null,
    in2: null,
    intercept: o,
    k: o,
    k1: o,
    k2: o,
    k3: o,
    k4: o,
    kernelMatrix: v,
    kernelUnitLength: null,
    keyPoints: null,
    keySplines: null,
    keyTimes: null,
    kerning: null,
    lang: null,
    lengthAdjust: null,
    letterSpacing: null,
    lightingColor: null,
    limitingConeAngle: o,
    local: null,
    markerEnd: null,
    markerMid: null,
    markerStart: null,
    markerHeight: null,
    markerUnits: null,
    markerWidth: null,
    mask: null,
    maskContentUnits: null,
    maskUnits: null,
    mathematical: null,
    max: null,
    media: null,
    mediaCharacterEncoding: null,
    mediaContentEncodings: null,
    mediaSize: o,
    mediaTime: null,
    method: null,
    min: null,
    mode: null,
    name: null,
    navDown: null,
    navDownLeft: null,
    navDownRight: null,
    navLeft: null,
    navNext: null,
    navPrev: null,
    navRight: null,
    navUp: null,
    navUpLeft: null,
    navUpRight: null,
    numOctaves: null,
    observer: null,
    offset: null,
    onAbort: null,
    onActivate: null,
    onAfterPrint: null,
    onBeforePrint: null,
    onBegin: null,
    onCancel: null,
    onCanPlay: null,
    onCanPlayThrough: null,
    onChange: null,
    onClick: null,
    onClose: null,
    onCopy: null,
    onCueChange: null,
    onCut: null,
    onDblClick: null,
    onDrag: null,
    onDragEnd: null,
    onDragEnter: null,
    onDragExit: null,
    onDragLeave: null,
    onDragOver: null,
    onDragStart: null,
    onDrop: null,
    onDurationChange: null,
    onEmptied: null,
    onEnd: null,
    onEnded: null,
    onError: null,
    onFocus: null,
    onFocusIn: null,
    onFocusOut: null,
    onHashChange: null,
    onInput: null,
    onInvalid: null,
    onKeyDown: null,
    onKeyPress: null,
    onKeyUp: null,
    onLoad: null,
    onLoadedData: null,
    onLoadedMetadata: null,
    onLoadStart: null,
    onMessage: null,
    onMouseDown: null,
    onMouseEnter: null,
    onMouseLeave: null,
    onMouseMove: null,
    onMouseOut: null,
    onMouseOver: null,
    onMouseUp: null,
    onMouseWheel: null,
    onOffline: null,
    onOnline: null,
    onPageHide: null,
    onPageShow: null,
    onPaste: null,
    onPause: null,
    onPlay: null,
    onPlaying: null,
    onPopState: null,
    onProgress: null,
    onRateChange: null,
    onRepeat: null,
    onReset: null,
    onResize: null,
    onScroll: null,
    onSeeked: null,
    onSeeking: null,
    onSelect: null,
    onShow: null,
    onStalled: null,
    onStorage: null,
    onSubmit: null,
    onSuspend: null,
    onTimeUpdate: null,
    onToggle: null,
    onUnload: null,
    onVolumeChange: null,
    onWaiting: null,
    onZoom: null,
    opacity: null,
    operator: null,
    order: null,
    orient: null,
    orientation: null,
    origin: null,
    overflow: null,
    overlay: null,
    overlinePosition: o,
    overlineThickness: o,
    paintOrder: null,
    panose1: null,
    path: null,
    pathLength: o,
    patternContentUnits: null,
    patternTransform: null,
    patternUnits: null,
    phase: null,
    ping: p,
    pitch: null,
    playbackOrder: null,
    pointerEvents: null,
    points: null,
    pointsAtX: o,
    pointsAtY: o,
    pointsAtZ: o,
    preserveAlpha: null,
    preserveAspectRatio: null,
    primitiveUnits: null,
    propagate: null,
    property: v,
    r: null,
    radius: null,
    referrerPolicy: null,
    refX: null,
    refY: null,
    rel: v,
    rev: v,
    renderingIntent: null,
    repeatCount: null,
    repeatDur: null,
    requiredExtensions: v,
    requiredFeatures: v,
    requiredFonts: v,
    requiredFormats: v,
    resource: null,
    restart: null,
    result: null,
    rotate: null,
    rx: null,
    ry: null,
    scale: null,
    seed: null,
    shapeRendering: null,
    side: null,
    slope: null,
    snapshotTime: null,
    specularConstant: o,
    specularExponent: o,
    spreadMethod: null,
    spacing: null,
    startOffset: null,
    stdDeviation: null,
    stemh: null,
    stemv: null,
    stitchTiles: null,
    stopColor: null,
    stopOpacity: null,
    strikethroughPosition: o,
    strikethroughThickness: o,
    string: null,
    stroke: null,
    strokeDashArray: v,
    strokeDashOffset: null,
    strokeLineCap: null,
    strokeLineJoin: null,
    strokeMiterLimit: o,
    strokeOpacity: o,
    strokeWidth: null,
    style: null,
    surfaceScale: o,
    syncBehavior: null,
    syncBehaviorDefault: null,
    syncMaster: null,
    syncTolerance: null,
    syncToleranceDefault: null,
    systemLanguage: v,
    tabIndex: o,
    tableValues: null,
    target: null,
    targetX: o,
    targetY: o,
    textAnchor: null,
    textDecoration: null,
    textRendering: null,
    textLength: null,
    timelineBegin: null,
    title: null,
    transformBehavior: null,
    type: null,
    typeOf: v,
    to: null,
    transform: null,
    u1: null,
    u2: null,
    underlinePosition: o,
    underlineThickness: o,
    unicode: null,
    unicodeBidi: null,
    unicodeRange: null,
    unitsPerEm: o,
    values: null,
    vAlphabetic: o,
    vMathematical: o,
    vectorEffect: null,
    vHanging: o,
    vIdeographic: o,
    version: null,
    vertAdvY: o,
    vertOriginX: o,
    vertOriginY: o,
    viewBox: null,
    viewTarget: null,
    visibility: null,
    width: null,
    widths: null,
    wordSpacing: null,
    writingMode: null,
    x: null,
    x1: null,
    x2: null,
    xChannelSelector: null,
    xHeight: o,
    y: null,
    y1: null,
    y2: null,
    yChannelSelector: null,
    z: null,
    zoomAndPan: null,
  },
});
var Wn = /^data[-\w.:]+$/i,
  ln = /-[a-z]/g,
  qn = /[A-Z]/g;
function q(n, e) {
  let l = T(e),
    t = e,
    a = g;
  if (l in n.normal) return n.property[n.normal[l]];
  if (l.length > 4 && l.slice(0, 4) === 'data' && Wn.test(e)) {
    if (e.charAt(4) === '-') {
      let r = e.slice(5).replace(ln, Gn);
      t = 'data' + r.charAt(0).toUpperCase() + r.slice(1);
    } else {
      let r = e.slice(4);
      if (!ln.test(r)) {
        let i = r.replace(qn, Yn);
        i.charAt(0) !== '-' && (i = '-' + i), (e = 'data' + i);
      }
    }
    a = P;
  }
  return new a(t, e);
}
function Yn(n) {
  return '-' + n.toLowerCase();
}
function Gn(n) {
  return n.charAt(1).toUpperCase();
}
var Y = {
  classId: 'classID',
  dataType: 'datatype',
  itemId: 'itemID',
  strokeDashArray: 'strokeDasharray',
  strokeDashOffset: 'strokeDashoffset',
  strokeLineCap: 'strokeLinecap',
  strokeLineJoin: 'strokeLinejoin',
  strokeMiterLimit: 'strokeMiterlimit',
  typeOf: 'typeof',
  xLinkActuate: 'xlinkActuate',
  xLinkArcRole: 'xlinkArcrole',
  xLinkHref: 'xlinkHref',
  xLinkRole: 'xlinkRole',
  xLinkShow: 'xlinkShow',
  xLinkTitle: 'xlinkTitle',
  xLinkType: 'xlinkType',
  xmlnsXLink: 'xmlnsXlink',
};
var tn = H([V, _, K, W, nn], 'html'),
  G = H([V, _, K, W, en], 'svg');
function on(n) {
  return n.join(' ').trim();
}
function rn(n, e) {
  var l = e || {};
  return (
    n[n.length - 1] === '' && (n = n.concat('')),
    n.join((l.padRight ? ' ' : '') + ',' + (l.padLeft === !1 ? '' : ' ')).trim()
  );
}
var gn = $(dn(), 1);
var hn = {
  html: 'http://www.w3.org/1999/xhtml',
  mathml: 'http://www.w3.org/1998/Math/MathML',
  svg: 'http://www.w3.org/2000/svg',
  xlink: 'http://www.w3.org/1999/xlink',
  xml: 'http://www.w3.org/XML/1998/namespace',
  xmlns: 'http://www.w3.org/2000/xmlns/',
};
var R = function (n) {
  if (n == null) return pe;
  if (typeof n == 'string') return ce(n);
  if (typeof n == 'object') return Array.isArray(n) ? ue(n) : se(n);
  if (typeof n == 'function') return I(n);
  throw new Error('Expected function, string, or object as test');
};
function ue(n) {
  let e = [],
    l = -1;
  for (; ++l < n.length; ) e[l] = R(n[l]);
  return I(t);
  function t(...a) {
    let r = -1;
    for (; ++r < e.length; ) if (e[r].call(this, ...a)) return !0;
    return !1;
  }
}
function se(n) {
  return I(e);
  function e(l) {
    let t;
    for (t in n) if (l[t] !== n[t]) return !1;
    return !0;
  }
}
function ce(n) {
  return I(e);
  function e(l) {
    return l && l.type === n;
  }
}
function I(n) {
  return e;
  function e(...l) {
    return Boolean(n.call(this, ...l));
  }
}
function pe() {
  return !0;
}
var fe = hn,
  me = Y,
  de = {}.hasOwnProperty,
  he = R('root'),
  Z = R('element'),
  ge = R('text');
function yn(n, e, l) {
  if (typeof n != 'function') throw new TypeError('h is not a function');
  let t = ve(n),
    a = we(n),
    r = xe(n),
    i,
    c;
  if (
    (typeof l == 'string' || typeof l == 'boolean'
      ? ((i = l), (l = {}))
      : (l || (l = {}), (i = l.prefix)),
    he(e))
  )
    c =
      e.children.length === 1 && Z(e.children[0])
        ? e.children[0]
        : { type: 'element', tagName: 'div', properties: {}, children: e.children };
  else if (Z(e)) c = e;
  else throw new Error('Expected root or element, not `' + ((e && e.type) || e) + '`');
  return vn(n, c, {
    schema: l.space === 'svg' ? G : tn,
    prefix: i == null ? (t || a || r ? 'h-' : null) : typeof i == 'string' ? i : i ? 'h-' : null,
    key: 0,
    react: t,
    vue: a,
    vdom: r,
    hyperscript: ke(n),
  });
}
function vn(n, e, l) {
  let t = l.schema,
    a = t,
    r = e.tagName,
    i = {},
    c = [],
    y = -1,
    d;
  t.space === 'html' && r.toLowerCase() === 'svg' && ((a = G), (l.schema = a));
  for (d in e.properties)
    e.properties && de.call(e.properties, d) && ye(i, d, e.properties[d], l, r);
  if (
    (l.vdom &&
      (a.space === 'html' ? (r = r.toUpperCase()) : a.space && (i.namespace = fe[a.space])),
    l.prefix && (l.key++, (i.key = l.prefix + l.key)),
    e.children)
  )
    for (; ++y < e.children.length; ) {
      let h = e.children[y];
      Z(h) ? c.push(vn(n, h, l)) : ge(h) && c.push(h.value);
    }
  return (l.schema = t), c.length > 0 ? n.call(e, r, i, c) : n.call(e, r, i);
}
function ye(n, e, l, t, a) {
  let r = q(t.schema, e),
    i;
  l == null ||
    (typeof l == 'number' && Number.isNaN(l)) ||
    (l === !1 && (t.vue || t.vdom || t.hyperscript)) ||
    (!l && r.boolean && (t.vue || t.vdom || t.hyperscript)) ||
    (Array.isArray(l) && (l = r.commaSeparated ? rn(l) : on(l)),
    r.boolean && t.hyperscript && (l = ''),
    r.property === 'style' &&
      typeof l == 'string' &&
      (t.react || t.vue || t.vdom) &&
      (l = be(l, a)),
    t.vue
      ? r.property !== 'style' && (i = 'attrs')
      : r.mustUseProperty ||
        (t.vdom ? r.property !== 'style' && (i = 'attributes') : t.hyperscript && (i = 'attrs')),
    i
      ? (n[i] = Object.assign(n[i] || {}, { [r.attribute]: l }))
      : r.space && t.react
      ? (n[me[r.property] || r.property] = l)
      : (n[r.attribute] = l));
}
function ve(n) {
  let e = n('div', {});
  return Boolean(e && ('_owner' in e || '_store' in e) && (e.key === void 0 || e.key === null));
}
function ke(n) {
  return 'context' in n && 'cleanup' in n;
}
function xe(n) {
  return n('div', {}).type === 'VirtualNode';
}
function we(n) {
  let e = n('div', {});
  return Boolean(e && e.context && e.context._isVue);
}
function be(n, e) {
  let l = {};
  try {
    (0, gn.default)(n, (t, a) => {
      t.slice(0, 4) === '-ms-' && (t = 'ms-' + t.slice(4)),
        (l[t.replace(/-([a-z])/g, (r, i) => i.toUpperCase())] = a);
    });
  } catch (t) {
    throw ((t.message = e + '[style]' + t.message.slice(9)), t);
  }
  return l;
}
var Dn = $(Mn(), 1);
function Rn(n) {
  var e = n && typeof n == 'object' && n.type === 'text' ? n.value || '' : n;
  return typeof e == 'string' && e.replace(/[ \t\n\f\r]/g, '') === '';
}
var Ne = {}.hasOwnProperty,
  ze = new Set(['table', 'thead', 'tbody', 'tfoot', 'tr', 'th', 'td']);
function An(n) {
  if (!n || typeof n.createElement != 'function')
    throw new TypeError('createElement is not a function');
  let e = n.createElement;
  Object.assign(this, { Compiler: l });
  function l(a) {
    let r = yn(t, (0, Dn.default)(a), n.prefix);
    return a.type === 'root'
      ? ((r =
          r &&
          typeof r == 'object' &&
          'type' in r &&
          'props' in r &&
          r.type === 'div' &&
          (a.children.length !== 1 || a.children[0].type !== 'element')
            ? r.props.children
            : [r]),
        e(n.Fragment || 'div', {}, r))
      : r;
  }
  function t(a, r, i) {
    if (
      (i && ze.has(a) && (i = i.filter((c) => !Rn(c))), n.components && Ne.call(n.components, a))
    ) {
      let c = n.components[a];
      return (
        n.passNode && typeof c == 'function' && (r = Object.assign({ node: this }, r)), e(c, r, i)
      );
    }
    return e(a, r, i);
  }
}
export { An as default };
