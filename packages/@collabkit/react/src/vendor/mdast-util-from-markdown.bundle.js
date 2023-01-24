var Ft = Object.defineProperty,
  St = (e, r) => {
    for (var t in r) Ft(e, t, { get: r[t], enumerable: !0 });
  };
function bt(e, r) {
  var { includeImageAlt: t = !0 } = r || {};
  return Xe(e, t);
}
function Xe(e, r) {
  return (
    (e &&
      typeof e == 'object' &&
      (e.value ||
        (r ? e.alt : '') ||
        ('children' in e && Re(e.children, r)) ||
        (Array.isArray(e) && Re(e, r)))) ||
    ''
  );
}
function Re(e, r) {
  for (var t = [], n = -1; ++n < e.length; ) t[n] = Xe(e[n], r);
  return t.join('');
}
function ne(e, r, t, n) {
  let i = e.length,
    u = 0,
    c;
  if ((r < 0 ? (r = -r > i ? 0 : i + r) : (r = r > i ? i : r), (t = t > 0 ? t : 0), n.length < 1e4))
    (c = Array.from(n)), c.unshift(r, t), [].splice.apply(e, c);
  else
    for (t && [].splice.apply(e, [r, t]); u < n.length; )
      (c = n.slice(u, u + 1e4)), c.unshift(r, 0), [].splice.apply(e, c), (u += 1e4), (r += 1e4);
}
function W(e, r) {
  return e.length > 0 ? (ne(e, e.length, 0, r), e) : r;
}
var qe = {}.hasOwnProperty;
function At(e) {
  let r = {},
    t = -1;
  for (; ++t < e.length; ) Et(r, e[t]);
  return r;
}
function Et(e, r) {
  let t;
  for (t in r) {
    let n = (qe.call(e, t) ? e[t] : void 0) || (e[t] = {}),
      i = r[t],
      u;
    for (u in i) {
      qe.call(n, u) || (n[u] = []);
      let c = i[u];
      It(n[u], Array.isArray(c) ? c : c ? [c] : []);
    }
  }
}
function It(e, r) {
  let t = -1,
    n = [];
  for (; ++t < r.length; ) (r[t].add === 'after' ? e : n).push(r[t]);
  ne(e, 0, 0, n);
}
var Ct =
    /[!-/:-@[-`{-~\u00A1\u00A7\u00AB\u00B6\u00B7\u00BB\u00BF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/,
  te = ce(/[A-Za-z]/),
  Ie = ce(/\d/),
  Tt = ce(/[\dA-Fa-f]/),
  ee = ce(/[\dA-Za-z]/),
  zt = ce(/[!-/:-@[-`{-~]/),
  He = ce(/[#-'*+\--9=?A-Z^-~]/);
function Ce(e) {
  return e !== null && (e < 32 || e === 127);
}
function G(e) {
  return e !== null && (e < 0 || e === 32);
}
function b(e) {
  return e !== null && e < -2;
}
function H(e) {
  return e === -2 || e === -1 || e === 32;
}
var wt = ce(/\s/),
  Dt = ce(Ct);
function ce(e) {
  return r;
  function r(t) {
    return t !== null && e.test(String.fromCharCode(t));
  }
}
function w(e, r, t, n) {
  let i = n ? n - 1 : Number.POSITIVE_INFINITY,
    u = 0;
  return c;
  function c(l) {
    return H(l) ? (e.enter(t), a(l)) : r(l);
  }
  function a(l) {
    return H(l) && u++ < i ? (e.consume(l), a) : (e.exit(t), r(l));
  }
}
var Bt = { tokenize: _t };
function _t(e) {
  let r = e.attempt(this.parser.constructs.contentInitial, n, i),
    t;
  return r;
  function n(a) {
    if (a === null) {
      e.consume(a);
      return;
    }
    return e.enter('lineEnding'), e.consume(a), e.exit('lineEnding'), w(e, r, 'linePrefix');
  }
  function i(a) {
    return e.enter('paragraph'), u(a);
  }
  function u(a) {
    let l = e.enter('chunkText', { contentType: 'text', previous: t });
    return t && (t.next = l), (t = l), c(a);
  }
  function c(a) {
    if (a === null) {
      e.exit('chunkText'), e.exit('paragraph'), e.consume(a);
      return;
    }
    return b(a) ? (e.consume(a), e.exit('chunkText'), u) : (e.consume(a), c);
  }
}
var Mt = { tokenize: Pt },
  Ve = { tokenize: Ot };
function Pt(e) {
  let r = this,
    t = [],
    n = 0,
    i,
    u,
    c;
  return a;
  function a(S) {
    if (n < t.length) {
      let B = t[n];
      return (r.containerState = B[1]), e.attempt(B[0].continuation, l, d)(S);
    }
    return d(S);
  }
  function l(S) {
    if ((n++, r.containerState._closeFlow)) {
      (r.containerState._closeFlow = void 0), i && O();
      let B = r.events.length,
        _ = B,
        x;
      for (; _--; )
        if (r.events[_][0] === 'exit' && r.events[_][1].type === 'chunkFlow') {
          x = r.events[_][1].end;
          break;
        }
      y(n);
      let L = B;
      for (; L < r.events.length; ) (r.events[L][1].end = Object.assign({}, x)), L++;
      return ne(r.events, _ + 1, 0, r.events.slice(B)), (r.events.length = L), d(S);
    }
    return a(S);
  }
  function d(S) {
    if (n === t.length) {
      if (!i) return p(S);
      if (i.currentConstruct && i.currentConstruct.concrete) return k(S);
      r.interrupt = Boolean(i.currentConstruct && !i._gfmTableDynamicInterruptHack);
    }
    return (r.containerState = {}), e.check(Ve, f, g)(S);
  }
  function f(S) {
    return i && O(), y(n), p(S);
  }
  function g(S) {
    return (r.parser.lazy[r.now().line] = n !== t.length), (c = r.now().offset), k(S);
  }
  function p(S) {
    return (r.containerState = {}), e.attempt(Ve, m, k)(S);
  }
  function m(S) {
    return n++, t.push([r.currentConstruct, r.containerState]), p(S);
  }
  function k(S) {
    if (S === null) {
      i && O(), y(0), e.consume(S);
      return;
    }
    return (
      (i = i || r.parser.flow(r.now())),
      e.enter('chunkFlow', { contentType: 'flow', previous: u, _tokenizer: i }),
      C(S)
    );
  }
  function C(S) {
    if (S === null) {
      D(e.exit('chunkFlow'), !0), y(0), e.consume(S);
      return;
    }
    return b(S)
      ? (e.consume(S), D(e.exit('chunkFlow')), (n = 0), (r.interrupt = void 0), a)
      : (e.consume(S), C);
  }
  function D(S, B) {
    let _ = r.sliceStream(S);
    if (
      (B && _.push(null),
      (S.previous = u),
      u && (u.next = S),
      (u = S),
      i.defineSkip(S.start),
      i.write(_),
      r.parser.lazy[S.start.line])
    ) {
      let x = i.events.length;
      for (; x--; )
        if (
          i.events[x][1].start.offset < c &&
          (!i.events[x][1].end || i.events[x][1].end.offset > c)
        )
          return;
      let L = r.events.length,
        R = L,
        P,
        U;
      for (; R--; )
        if (r.events[R][0] === 'exit' && r.events[R][1].type === 'chunkFlow') {
          if (P) {
            U = r.events[R][1].end;
            break;
          }
          P = !0;
        }
      for (y(n), x = L; x < r.events.length; ) (r.events[x][1].end = Object.assign({}, U)), x++;
      ne(r.events, R + 1, 0, r.events.slice(L)), (r.events.length = x);
    }
  }
  function y(S) {
    let B = t.length;
    for (; B-- > S; ) {
      let _ = t[B];
      (r.containerState = _[1]), _[0].exit.call(r, e);
    }
    t.length = S;
  }
  function O() {
    i.write([null]), (u = void 0), (i = void 0), (r.containerState._closeFlow = void 0);
  }
}
function Ot(e, r, t) {
  return w(
    e,
    e.attempt(this.parser.constructs.document, r, t),
    'linePrefix',
    this.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
  );
}
function Qe(e) {
  if (e === null || G(e) || wt(e)) return 1;
  if (Dt(e)) return 2;
}
function De(e, r, t) {
  let n = [],
    i = -1;
  for (; ++i < e.length; ) {
    let u = e[i].resolveAll;
    u && !n.includes(u) && ((r = u(r, t)), n.push(u));
  }
  return r;
}
var Te = { name: 'attention', tokenize: jt, resolveAll: Lt };
function Lt(e, r) {
  let t = -1,
    n,
    i,
    u,
    c,
    a,
    l,
    d,
    f;
  for (; ++t < e.length; )
    if (e[t][0] === 'enter' && e[t][1].type === 'attentionSequence' && e[t][1]._close) {
      for (n = t; n--; )
        if (
          e[n][0] === 'exit' &&
          e[n][1].type === 'attentionSequence' &&
          e[n][1]._open &&
          r.sliceSerialize(e[n][1]).charCodeAt(0) === r.sliceSerialize(e[t][1]).charCodeAt(0)
        ) {
          if (
            (e[n][1]._close || e[t][1]._open) &&
            (e[t][1].end.offset - e[t][1].start.offset) % 3 &&
            !(
              (e[n][1].end.offset -
                e[n][1].start.offset +
                e[t][1].end.offset -
                e[t][1].start.offset) %
              3
            )
          )
            continue;
          l =
            e[n][1].end.offset - e[n][1].start.offset > 1 &&
            e[t][1].end.offset - e[t][1].start.offset > 1
              ? 2
              : 1;
          let g = Object.assign({}, e[n][1].end),
            p = Object.assign({}, e[t][1].start);
          Ne(g, -l),
            Ne(p, l),
            (c = {
              type: l > 1 ? 'strongSequence' : 'emphasisSequence',
              start: g,
              end: Object.assign({}, e[n][1].end),
            }),
            (a = {
              type: l > 1 ? 'strongSequence' : 'emphasisSequence',
              start: Object.assign({}, e[t][1].start),
              end: p,
            }),
            (u = {
              type: l > 1 ? 'strongText' : 'emphasisText',
              start: Object.assign({}, e[n][1].end),
              end: Object.assign({}, e[t][1].start),
            }),
            (i = {
              type: l > 1 ? 'strong' : 'emphasis',
              start: Object.assign({}, c.start),
              end: Object.assign({}, a.end),
            }),
            (e[n][1].end = Object.assign({}, c.start)),
            (e[t][1].start = Object.assign({}, a.end)),
            (d = []),
            e[n][1].end.offset - e[n][1].start.offset &&
              (d = W(d, [
                ['enter', e[n][1], r],
                ['exit', e[n][1], r],
              ])),
            (d = W(d, [
              ['enter', i, r],
              ['enter', c, r],
              ['exit', c, r],
              ['enter', u, r],
            ])),
            (d = W(d, De(r.parser.constructs.insideSpan.null, e.slice(n + 1, t), r))),
            (d = W(d, [
              ['exit', u, r],
              ['enter', a, r],
              ['exit', a, r],
              ['exit', i, r],
            ])),
            e[t][1].end.offset - e[t][1].start.offset
              ? ((f = 2),
                (d = W(d, [
                  ['enter', e[t][1], r],
                  ['exit', e[t][1], r],
                ])))
              : (f = 0),
            ne(e, n - 1, t - n + 3, d),
            (t = n + d.length - f - 2);
          break;
        }
    }
  for (t = -1; ++t < e.length; ) e[t][1].type === 'attentionSequence' && (e[t][1].type = 'data');
  return e;
}
function jt(e, r) {
  let t = this.parser.constructs.attentionMarkers.null,
    n = this.previous,
    i = Qe(n),
    u;
  return c;
  function c(l) {
    return e.enter('attentionSequence'), (u = l), a(l);
  }
  function a(l) {
    if (l === u) return e.consume(l), a;
    let d = e.exit('attentionSequence'),
      f = Qe(l),
      g = !f || (f === 2 && i) || t.includes(l),
      p = !i || (i === 2 && f) || t.includes(n);
    return (
      (d._open = Boolean(u === 42 ? g : g && (i || !p))),
      (d._close = Boolean(u === 42 ? p : p && (f || !g))),
      r(l)
    );
  }
}
function Ne(e, r) {
  (e.column += r), (e.offset += r), (e._bufferIndex += r);
}
var Rt = { name: 'autolink', tokenize: qt };
function qt(e, r, t) {
  let n = 1;
  return i;
  function i(k) {
    return (
      e.enter('autolink'),
      e.enter('autolinkMarker'),
      e.consume(k),
      e.exit('autolinkMarker'),
      e.enter('autolinkProtocol'),
      u
    );
  }
  function u(k) {
    return te(k) ? (e.consume(k), c) : He(k) ? d(k) : t(k);
  }
  function c(k) {
    return k === 43 || k === 45 || k === 46 || ee(k) ? a(k) : d(k);
  }
  function a(k) {
    return k === 58
      ? (e.consume(k), l)
      : (k === 43 || k === 45 || k === 46 || ee(k)) && n++ < 32
      ? (e.consume(k), a)
      : d(k);
  }
  function l(k) {
    return k === 62
      ? (e.exit('autolinkProtocol'), m(k))
      : k === null || k === 32 || k === 60 || Ce(k)
      ? t(k)
      : (e.consume(k), l);
  }
  function d(k) {
    return k === 64 ? (e.consume(k), (n = 0), f) : He(k) ? (e.consume(k), d) : t(k);
  }
  function f(k) {
    return ee(k) ? g(k) : t(k);
  }
  function g(k) {
    return k === 46
      ? (e.consume(k), (n = 0), f)
      : k === 62
      ? ((e.exit('autolinkProtocol').type = 'autolinkEmail'), m(k))
      : p(k);
  }
  function p(k) {
    return (k === 45 || ee(k)) && n++ < 63 ? (e.consume(k), k === 45 ? p : g) : t(k);
  }
  function m(k) {
    return e.enter('autolinkMarker'), e.consume(k), e.exit('autolinkMarker'), e.exit('autolink'), r;
  }
}
var Se = { tokenize: Ht, partial: !0 };
function Ht(e, r, t) {
  return w(e, n, 'linePrefix');
  function n(i) {
    return i === null || b(i) ? r(i) : t(i);
  }
}
var et = { name: 'blockQuote', tokenize: Vt, continuation: { tokenize: Qt }, exit: Nt };
function Vt(e, r, t) {
  let n = this;
  return i;
  function i(c) {
    if (c === 62) {
      let a = n.containerState;
      return (
        a.open || (e.enter('blockQuote', { _container: !0 }), (a.open = !0)),
        e.enter('blockQuotePrefix'),
        e.enter('blockQuoteMarker'),
        e.consume(c),
        e.exit('blockQuoteMarker'),
        u
      );
    }
    return t(c);
  }
  function u(c) {
    return H(c)
      ? (e.enter('blockQuotePrefixWhitespace'),
        e.consume(c),
        e.exit('blockQuotePrefixWhitespace'),
        e.exit('blockQuotePrefix'),
        r)
      : (e.exit('blockQuotePrefix'), r(c));
  }
}
function Qt(e, r, t) {
  return w(
    e,
    e.attempt(et, r, t),
    'linePrefix',
    this.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
  );
}
function Nt(e) {
  e.exit('blockQuote');
}
var tt = { name: 'characterEscape', tokenize: Ut };
function Ut(e, r, t) {
  return n;
  function n(u) {
    return (
      e.enter('characterEscape'), e.enter('escapeMarker'), e.consume(u), e.exit('escapeMarker'), i
    );
  }
  function i(u) {
    return zt(u)
      ? (e.enter('characterEscapeValue'),
        e.consume(u),
        e.exit('characterEscapeValue'),
        e.exit('characterEscape'),
        r)
      : t(u);
  }
}
var Ue =
  typeof window !== 'undefined' &&
  window.document &&
  window.document.createElement &&
  document.createElement('i');
function Be(e) {
  let r = '&' + e + ';';
  Ue.innerHTML = r;
  let t = Ue.textContent;
  return (t.charCodeAt(t.length - 1) === 59 && e !== 'semi') || t === r ? !1 : t;
}
var nt = { name: 'characterReference', tokenize: Zt };
function Zt(e, r, t) {
  let n = this,
    i = 0,
    u,
    c;
  return a;
  function a(g) {
    return (
      e.enter('characterReference'),
      e.enter('characterReferenceMarker'),
      e.consume(g),
      e.exit('characterReferenceMarker'),
      l
    );
  }
  function l(g) {
    return g === 35
      ? (e.enter('characterReferenceMarkerNumeric'),
        e.consume(g),
        e.exit('characterReferenceMarkerNumeric'),
        d)
      : (e.enter('characterReferenceValue'), (u = 31), (c = ee), f(g));
  }
  function d(g) {
    return g === 88 || g === 120
      ? (e.enter('characterReferenceMarkerHexadecimal'),
        e.consume(g),
        e.exit('characterReferenceMarkerHexadecimal'),
        e.enter('characterReferenceValue'),
        (u = 6),
        (c = Tt),
        f)
      : (e.enter('characterReferenceValue'), (u = 7), (c = Ie), f(g));
  }
  function f(g) {
    let p;
    return g === 59 && i
      ? ((p = e.exit('characterReferenceValue')),
        c === ee && !Be(n.sliceSerialize(p))
          ? t(g)
          : (e.enter('characterReferenceMarker'),
            e.consume(g),
            e.exit('characterReferenceMarker'),
            e.exit('characterReference'),
            r))
      : c(g) && i++ < u
      ? (e.consume(g), f)
      : t(g);
  }
}
var Ze = { name: 'codeFenced', tokenize: Yt, concrete: !0 };
function Yt(e, r, t) {
  let n = this,
    i = { tokenize: _, partial: !0 },
    u = { tokenize: B, partial: !0 },
    c = this.events[this.events.length - 1],
    a = c && c[1].type === 'linePrefix' ? c[2].sliceSerialize(c[1], !0).length : 0,
    l = 0,
    d;
  return f;
  function f(x) {
    return (
      e.enter('codeFenced'),
      e.enter('codeFencedFence'),
      e.enter('codeFencedFenceSequence'),
      (d = x),
      g(x)
    );
  }
  function g(x) {
    return x === d
      ? (e.consume(x), l++, g)
      : (e.exit('codeFencedFenceSequence'), l < 3 ? t(x) : w(e, p, 'whitespace')(x));
  }
  function p(x) {
    return x === null || b(x)
      ? D(x)
      : (e.enter('codeFencedFenceInfo'), e.enter('chunkString', { contentType: 'string' }), m(x));
  }
  function m(x) {
    return x === null || G(x)
      ? (e.exit('chunkString'), e.exit('codeFencedFenceInfo'), w(e, k, 'whitespace')(x))
      : x === 96 && x === d
      ? t(x)
      : (e.consume(x), m);
  }
  function k(x) {
    return x === null || b(x)
      ? D(x)
      : (e.enter('codeFencedFenceMeta'), e.enter('chunkString', { contentType: 'string' }), C(x));
  }
  function C(x) {
    return x === null || b(x)
      ? (e.exit('chunkString'), e.exit('codeFencedFenceMeta'), D(x))
      : x === 96 && x === d
      ? t(x)
      : (e.consume(x), C);
  }
  function D(x) {
    return e.exit('codeFencedFence'), n.interrupt ? r(x) : y(x);
  }
  function y(x) {
    return x === null
      ? S(x)
      : b(x)
      ? e.attempt(u, e.attempt(i, S, a ? w(e, y, 'linePrefix', a + 1) : y), S)(x)
      : (e.enter('codeFlowValue'), O(x));
  }
  function O(x) {
    return x === null || b(x) ? (e.exit('codeFlowValue'), y(x)) : (e.consume(x), O);
  }
  function S(x) {
    return e.exit('codeFenced'), r(x);
  }
  function B(x, L, R) {
    let P = this;
    return U;
    function U(T) {
      return x.enter('lineEnding'), x.consume(T), x.exit('lineEnding'), I;
    }
    function I(T) {
      return P.parser.lazy[P.now().line] ? R(T) : L(T);
    }
  }
  function _(x, L, R) {
    let P = 0;
    return w(
      x,
      U,
      'linePrefix',
      this.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
    );
    function U(F) {
      return x.enter('codeFencedFence'), x.enter('codeFencedFenceSequence'), I(F);
    }
    function I(F) {
      return F === d
        ? (x.consume(F), P++, I)
        : P < l
        ? R(F)
        : (x.exit('codeFencedFenceSequence'), w(x, T, 'whitespace')(F));
    }
    function T(F) {
      return F === null || b(F) ? (x.exit('codeFencedFence'), L(F)) : R(F);
    }
  }
}
var Ae = { name: 'codeIndented', tokenize: $t },
  Kt = { tokenize: Wt, partial: !0 };
function $t(e, r, t) {
  let n = this;
  return i;
  function i(d) {
    return e.enter('codeIndented'), w(e, u, 'linePrefix', 4 + 1)(d);
  }
  function u(d) {
    let f = n.events[n.events.length - 1];
    return f && f[1].type === 'linePrefix' && f[2].sliceSerialize(f[1], !0).length >= 4
      ? c(d)
      : t(d);
  }
  function c(d) {
    return d === null ? l(d) : b(d) ? e.attempt(Kt, c, l)(d) : (e.enter('codeFlowValue'), a(d));
  }
  function a(d) {
    return d === null || b(d) ? (e.exit('codeFlowValue'), c(d)) : (e.consume(d), a);
  }
  function l(d) {
    return e.exit('codeIndented'), r(d);
  }
}
function Wt(e, r, t) {
  let n = this;
  return i;
  function i(c) {
    return n.parser.lazy[n.now().line]
      ? t(c)
      : b(c)
      ? (e.enter('lineEnding'), e.consume(c), e.exit('lineEnding'), i)
      : w(e, u, 'linePrefix', 4 + 1)(c);
  }
  function u(c) {
    let a = n.events[n.events.length - 1];
    return a && a[1].type === 'linePrefix' && a[2].sliceSerialize(a[1], !0).length >= 4
      ? r(c)
      : b(c)
      ? i(c)
      : t(c);
  }
}
var Gt = { name: 'codeText', tokenize: en, resolve: Jt, previous: Xt };
function Jt(e) {
  let r = e.length - 4,
    t = 3,
    n,
    i;
  if (
    (e[t][1].type === 'lineEnding' || e[t][1].type === 'space') &&
    (e[r][1].type === 'lineEnding' || e[r][1].type === 'space')
  ) {
    for (n = t; ++n < r; )
      if (e[n][1].type === 'codeTextData') {
        (e[t][1].type = 'codeTextPadding'), (e[r][1].type = 'codeTextPadding'), (t += 2), (r -= 2);
        break;
      }
  }
  for (n = t - 1, r++; ++n <= r; )
    i === void 0
      ? n !== r && e[n][1].type !== 'lineEnding' && (i = n)
      : (n === r || e[n][1].type === 'lineEnding') &&
        ((e[i][1].type = 'codeTextData'),
        n !== i + 2 &&
          ((e[i][1].end = e[n - 1][1].end),
          e.splice(i + 2, n - i - 2),
          (r -= n - i - 2),
          (n = i + 2)),
        (i = void 0));
  return e;
}
function Xt(e) {
  return e !== 96 || this.events[this.events.length - 1][1].type === 'characterEscape';
}
function en(e, r, t) {
  let n = this,
    i = 0,
    u,
    c;
  return a;
  function a(p) {
    return e.enter('codeText'), e.enter('codeTextSequence'), l(p);
  }
  function l(p) {
    return p === 96 ? (e.consume(p), i++, l) : (e.exit('codeTextSequence'), d(p));
  }
  function d(p) {
    return p === null
      ? t(p)
      : p === 96
      ? ((c = e.enter('codeTextSequence')), (u = 0), g(p))
      : p === 32
      ? (e.enter('space'), e.consume(p), e.exit('space'), d)
      : b(p)
      ? (e.enter('lineEnding'), e.consume(p), e.exit('lineEnding'), d)
      : (e.enter('codeTextData'), f(p));
  }
  function f(p) {
    return p === null || p === 32 || p === 96 || b(p)
      ? (e.exit('codeTextData'), d(p))
      : (e.consume(p), f);
  }
  function g(p) {
    return p === 96
      ? (e.consume(p), u++, g)
      : u === i
      ? (e.exit('codeTextSequence'), e.exit('codeText'), r(p))
      : ((c.type = 'codeTextData'), f(p));
  }
}
function rt(e) {
  let r = {},
    t = -1,
    n,
    i,
    u,
    c,
    a,
    l,
    d;
  for (; ++t < e.length; ) {
    for (; t in r; ) t = r[t];
    if (
      ((n = e[t]),
      t &&
        n[1].type === 'chunkFlow' &&
        e[t - 1][1].type === 'listItemPrefix' &&
        ((l = n[1]._tokenizer.events),
        (u = 0),
        u < l.length && l[u][1].type === 'lineEndingBlank' && (u += 2),
        u < l.length && l[u][1].type === 'content'))
    )
      for (; ++u < l.length && l[u][1].type !== 'content'; )
        l[u][1].type === 'chunkText' && ((l[u][1]._isInFirstContentOfListItem = !0), u++);
    if (n[0] === 'enter') n[1].contentType && (Object.assign(r, tn(e, t)), (t = r[t]), (d = !0));
    else if (n[1]._container) {
      for (
        u = t, i = void 0;
        u-- && ((c = e[u]), c[1].type === 'lineEnding' || c[1].type === 'lineEndingBlank');

      )
        c[0] === 'enter' &&
          (i && (e[i][1].type = 'lineEndingBlank'), (c[1].type = 'lineEnding'), (i = u));
      i &&
        ((n[1].end = Object.assign({}, e[i][1].start)),
        (a = e.slice(i, t)),
        a.unshift(n),
        ne(e, i, t - i + 1, a));
    }
  }
  return !d;
}
function tn(e, r) {
  let t = e[r][1],
    n = e[r][2],
    i = r - 1,
    u = [],
    c = t._tokenizer || n.parser[t.contentType](t.start),
    a = c.events,
    l = [],
    d = {},
    f,
    g,
    p = -1,
    m = t,
    k = 0,
    C = 0,
    D = [C];
  for (; m; ) {
    for (; e[++i][1] !== m; );
    u.push(i),
      m._tokenizer ||
        ((f = n.sliceStream(m)),
        m.next || f.push(null),
        g && c.defineSkip(m.start),
        m._isInFirstContentOfListItem && (c._gfmTasklistFirstContentOfListItem = !0),
        c.write(f),
        m._isInFirstContentOfListItem && (c._gfmTasklistFirstContentOfListItem = void 0)),
      (g = m),
      (m = m.next);
  }
  for (m = t; ++p < a.length; )
    a[p][0] === 'exit' &&
      a[p - 1][0] === 'enter' &&
      a[p][1].type === a[p - 1][1].type &&
      a[p][1].start.line !== a[p][1].end.line &&
      ((C = p + 1), D.push(C), (m._tokenizer = void 0), (m.previous = void 0), (m = m.next));
  for (
    c.events = [], m ? ((m._tokenizer = void 0), (m.previous = void 0)) : D.pop(), p = D.length;
    p--;

  ) {
    let y = a.slice(D[p], D[p + 1]),
      O = u.pop();
    l.unshift([O, O + y.length - 1]), ne(e, O, 2, y);
  }
  for (p = -1; ++p < l.length; ) (d[k + l[p][0]] = k + l[p][1]), (k += l[p][1] - l[p][0] - 1);
  return d;
}
var nn = { tokenize: cn, resolve: un },
  rn = { tokenize: on, partial: !0 };
function un(e) {
  return rt(e), e;
}
function cn(e, r) {
  let t;
  return n;
  function n(a) {
    return e.enter('content'), (t = e.enter('chunkContent', { contentType: 'content' })), i(a);
  }
  function i(a) {
    return a === null ? u(a) : b(a) ? e.check(rn, c, u)(a) : (e.consume(a), i);
  }
  function u(a) {
    return e.exit('chunkContent'), e.exit('content'), r(a);
  }
  function c(a) {
    return (
      e.consume(a),
      e.exit('chunkContent'),
      (t.next = e.enter('chunkContent', { contentType: 'content', previous: t })),
      (t = t.next),
      i
    );
  }
}
function on(e, r, t) {
  let n = this;
  return i;
  function i(c) {
    return (
      e.exit('chunkContent'),
      e.enter('lineEnding'),
      e.consume(c),
      e.exit('lineEnding'),
      w(e, u, 'linePrefix')
    );
  }
  function u(c) {
    if (c === null || b(c)) return t(c);
    let a = n.events[n.events.length - 1];
    return !n.parser.constructs.disable.null.includes('codeIndented') &&
      a &&
      a[1].type === 'linePrefix' &&
      a[2].sliceSerialize(a[1], !0).length >= 4
      ? r(c)
      : e.interrupt(n.parser.constructs.flow, t, r)(c);
  }
}
function it(e, r, t, n, i, u, c, a, l) {
  let d = l || Number.POSITIVE_INFINITY,
    f = 0;
  return g;
  function g(y) {
    return y === 60
      ? (e.enter(n), e.enter(i), e.enter(u), e.consume(y), e.exit(u), p)
      : y === null || y === 41 || Ce(y)
      ? t(y)
      : (e.enter(n),
        e.enter(c),
        e.enter(a),
        e.enter('chunkString', { contentType: 'string' }),
        C(y));
  }
  function p(y) {
    return y === 62
      ? (e.enter(u), e.consume(y), e.exit(u), e.exit(i), e.exit(n), r)
      : (e.enter(a), e.enter('chunkString', { contentType: 'string' }), m(y));
  }
  function m(y) {
    return y === 62
      ? (e.exit('chunkString'), e.exit(a), p(y))
      : y === null || y === 60 || b(y)
      ? t(y)
      : (e.consume(y), y === 92 ? k : m);
  }
  function k(y) {
    return y === 60 || y === 62 || y === 92 ? (e.consume(y), m) : m(y);
  }
  function C(y) {
    return y === 40
      ? ++f > d
        ? t(y)
        : (e.consume(y), C)
      : y === 41
      ? f--
        ? (e.consume(y), C)
        : (e.exit('chunkString'), e.exit(a), e.exit(c), e.exit(n), r(y))
      : y === null || G(y)
      ? f
        ? t(y)
        : (e.exit('chunkString'), e.exit(a), e.exit(c), e.exit(n), r(y))
      : Ce(y)
      ? t(y)
      : (e.consume(y), y === 92 ? D : C);
  }
  function D(y) {
    return y === 40 || y === 41 || y === 92 ? (e.consume(y), C) : C(y);
  }
}
function ut(e, r, t, n, i, u) {
  let c = this,
    a = 0,
    l;
  return d;
  function d(m) {
    return e.enter(n), e.enter(i), e.consume(m), e.exit(i), e.enter(u), f;
  }
  function f(m) {
    return m === null ||
      m === 91 ||
      (m === 93 && !l) ||
      (m === 94 && !a && '_hiddenFootnoteSupport' in c.parser.constructs) ||
      a > 999
      ? t(m)
      : m === 93
      ? (e.exit(u), e.enter(i), e.consume(m), e.exit(i), e.exit(n), r)
      : b(m)
      ? (e.enter('lineEnding'), e.consume(m), e.exit('lineEnding'), f)
      : (e.enter('chunkString', { contentType: 'string' }), g(m));
  }
  function g(m) {
    return m === null || m === 91 || m === 93 || b(m) || a++ > 999
      ? (e.exit('chunkString'), f(m))
      : (e.consume(m), (l = l || !H(m)), m === 92 ? p : g);
  }
  function p(m) {
    return m === 91 || m === 92 || m === 93 ? (e.consume(m), a++, g) : g(m);
  }
}
function ct(e, r, t, n, i, u) {
  let c;
  return a;
  function a(p) {
    return e.enter(n), e.enter(i), e.consume(p), e.exit(i), (c = p === 40 ? 41 : p), l;
  }
  function l(p) {
    return p === c ? (e.enter(i), e.consume(p), e.exit(i), e.exit(n), r) : (e.enter(u), d(p));
  }
  function d(p) {
    return p === c
      ? (e.exit(u), l(c))
      : p === null
      ? t(p)
      : b(p)
      ? (e.enter('lineEnding'), e.consume(p), e.exit('lineEnding'), w(e, d, 'linePrefix'))
      : (e.enter('chunkString', { contentType: 'string' }), f(p));
  }
  function f(p) {
    return p === c || p === null || b(p)
      ? (e.exit('chunkString'), d(p))
      : (e.consume(p), p === 92 ? g : f);
  }
  function g(p) {
    return p === c || p === 92 ? (e.consume(p), f) : f(p);
  }
}
function xe(e, r) {
  let t;
  return n;
  function n(i) {
    return b(i)
      ? (e.enter('lineEnding'), e.consume(i), e.exit('lineEnding'), (t = !0), n)
      : H(i)
      ? w(e, n, t ? 'linePrefix' : 'lineSuffix')(i)
      : r(i);
  }
}
function fe(e) {
  return e
    .replace(/[\t\n\r ]+/g, ' ')
    .replace(/^ | $/g, '')
    .toLowerCase()
    .toUpperCase();
}
var sn = { name: 'definition', tokenize: ln },
  an = { tokenize: fn, partial: !0 };
function ln(e, r, t) {
  let n = this,
    i;
  return u;
  function u(l) {
    return (
      e.enter('definition'),
      ut.call(n, e, c, t, 'definitionLabel', 'definitionLabelMarker', 'definitionLabelString')(l)
    );
  }
  function c(l) {
    return (
      (i = fe(n.sliceSerialize(n.events[n.events.length - 1][1]).slice(1, -1))),
      l === 58
        ? (e.enter('definitionMarker'),
          e.consume(l),
          e.exit('definitionMarker'),
          xe(
            e,
            it(
              e,
              e.attempt(an, w(e, a, 'whitespace'), w(e, a, 'whitespace')),
              t,
              'definitionDestination',
              'definitionDestinationLiteral',
              'definitionDestinationLiteralMarker',
              'definitionDestinationRaw',
              'definitionDestinationString'
            )
          ))
        : t(l)
    );
  }
  function a(l) {
    return l === null || b(l)
      ? (e.exit('definition'), n.parser.defined.includes(i) || n.parser.defined.push(i), r(l))
      : t(l);
  }
}
function fn(e, r, t) {
  return n;
  function n(c) {
    return G(c) ? xe(e, i)(c) : t(c);
  }
  function i(c) {
    return c === 34 || c === 39 || c === 40
      ? ct(
          e,
          w(e, u, 'whitespace'),
          t,
          'definitionTitle',
          'definitionTitleMarker',
          'definitionTitleString'
        )(c)
      : t(c);
  }
  function u(c) {
    return c === null || b(c) ? r(c) : t(c);
  }
}
var dn = { name: 'hardBreakEscape', tokenize: hn };
function hn(e, r, t) {
  return n;
  function n(u) {
    return e.enter('hardBreakEscape'), e.enter('escapeMarker'), e.consume(u), i;
  }
  function i(u) {
    return b(u) ? (e.exit('escapeMarker'), e.exit('hardBreakEscape'), r(u)) : t(u);
  }
}
var pn = { name: 'headingAtx', tokenize: gn, resolve: mn };
function mn(e, r) {
  let t = e.length - 2,
    n = 3,
    i,
    u;
  return (
    e[n][1].type === 'whitespace' && (n += 2),
    t - 2 > n && e[t][1].type === 'whitespace' && (t -= 2),
    e[t][1].type === 'atxHeadingSequence' &&
      (n === t - 1 || (t - 4 > n && e[t - 2][1].type === 'whitespace')) &&
      (t -= n + 1 === t ? 2 : 4),
    t > n &&
      ((i = { type: 'atxHeadingText', start: e[n][1].start, end: e[t][1].end }),
      (u = { type: 'chunkText', start: e[n][1].start, end: e[t][1].end, contentType: 'text' }),
      ne(e, n, t - n + 1, [
        ['enter', i, r],
        ['enter', u, r],
        ['exit', u, r],
        ['exit', i, r],
      ])),
    e
  );
}
function gn(e, r, t) {
  let n = this,
    i = 0;
  return u;
  function u(f) {
    return e.enter('atxHeading'), e.enter('atxHeadingSequence'), c(f);
  }
  function c(f) {
    return f === 35 && i++ < 6
      ? (e.consume(f), c)
      : f === null || G(f)
      ? (e.exit('atxHeadingSequence'), n.interrupt ? r(f) : a(f))
      : t(f);
  }
  function a(f) {
    return f === 35
      ? (e.enter('atxHeadingSequence'), l(f))
      : f === null || b(f)
      ? (e.exit('atxHeading'), r(f))
      : H(f)
      ? w(e, a, 'whitespace')(f)
      : (e.enter('atxHeadingText'), d(f));
  }
  function l(f) {
    return f === 35 ? (e.consume(f), l) : (e.exit('atxHeadingSequence'), a(f));
  }
  function d(f) {
    return f === null || f === 35 || G(f) ? (e.exit('atxHeadingText'), a(f)) : (e.consume(f), d);
  }
}
var kn = [
    'address',
    'article',
    'aside',
    'base',
    'basefont',
    'blockquote',
    'body',
    'caption',
    'center',
    'col',
    'colgroup',
    'dd',
    'details',
    'dialog',
    'dir',
    'div',
    'dl',
    'dt',
    'fieldset',
    'figcaption',
    'figure',
    'footer',
    'form',
    'frame',
    'frameset',
    'h1',
    'h2',
    'h3',
    'h4',
    'h5',
    'h6',
    'head',
    'header',
    'hr',
    'html',
    'iframe',
    'legend',
    'li',
    'link',
    'main',
    'menu',
    'menuitem',
    'nav',
    'noframes',
    'ol',
    'optgroup',
    'option',
    'p',
    'param',
    'section',
    'summary',
    'table',
    'tbody',
    'td',
    'tfoot',
    'th',
    'thead',
    'title',
    'tr',
    'track',
    'ul',
  ],
  Ye = ['pre', 'script', 'style', 'textarea'],
  xn = { name: 'htmlFlow', tokenize: Fn, resolveTo: yn, concrete: !0 },
  vn = { tokenize: Sn, partial: !0 };
function yn(e) {
  let r = e.length;
  for (; r-- && !(e[r][0] === 'enter' && e[r][1].type === 'htmlFlow'); );
  return (
    r > 1 &&
      e[r - 2][1].type === 'linePrefix' &&
      ((e[r][1].start = e[r - 2][1].start),
      (e[r + 1][1].start = e[r - 2][1].start),
      e.splice(r - 2, 2)),
    e
  );
}
function Fn(e, r, t) {
  let n = this,
    i,
    u,
    c,
    a,
    l;
  return d;
  function d(o) {
    return e.enter('htmlFlow'), e.enter('htmlFlowData'), e.consume(o), f;
  }
  function f(o) {
    return o === 33
      ? (e.consume(o), g)
      : o === 47
      ? (e.consume(o), k)
      : o === 63
      ? (e.consume(o), (i = 3), n.interrupt ? r : Y)
      : te(o)
      ? (e.consume(o), (c = String.fromCharCode(o)), (u = !0), C)
      : t(o);
  }
  function g(o) {
    return o === 45
      ? (e.consume(o), (i = 2), p)
      : o === 91
      ? (e.consume(o), (i = 5), (c = 'CDATA['), (a = 0), m)
      : te(o)
      ? (e.consume(o), (i = 4), n.interrupt ? r : Y)
      : t(o);
  }
  function p(o) {
    return o === 45 ? (e.consume(o), n.interrupt ? r : Y) : t(o);
  }
  function m(o) {
    return o === c.charCodeAt(a++)
      ? (e.consume(o), a === c.length ? (n.interrupt ? r : I) : m)
      : t(o);
  }
  function k(o) {
    return te(o) ? (e.consume(o), (c = String.fromCharCode(o)), C) : t(o);
  }
  function C(o) {
    return o === null || o === 47 || o === 62 || G(o)
      ? o !== 47 && u && Ye.includes(c.toLowerCase())
        ? ((i = 1), n.interrupt ? r(o) : I(o))
        : kn.includes(c.toLowerCase())
        ? ((i = 6), o === 47 ? (e.consume(o), D) : n.interrupt ? r(o) : I(o))
        : ((i = 7), n.interrupt && !n.parser.lazy[n.now().line] ? t(o) : u ? O(o) : y(o))
      : o === 45 || ee(o)
      ? (e.consume(o), (c += String.fromCharCode(o)), C)
      : t(o);
  }
  function D(o) {
    return o === 62 ? (e.consume(o), n.interrupt ? r : I) : t(o);
  }
  function y(o) {
    return H(o) ? (e.consume(o), y) : P(o);
  }
  function O(o) {
    return o === 47
      ? (e.consume(o), P)
      : o === 58 || o === 95 || te(o)
      ? (e.consume(o), S)
      : H(o)
      ? (e.consume(o), O)
      : P(o);
  }
  function S(o) {
    return o === 45 || o === 46 || o === 58 || o === 95 || ee(o) ? (e.consume(o), S) : B(o);
  }
  function B(o) {
    return o === 61 ? (e.consume(o), _) : H(o) ? (e.consume(o), B) : O(o);
  }
  function _(o) {
    return o === null || o === 60 || o === 61 || o === 62 || o === 96
      ? t(o)
      : o === 34 || o === 39
      ? (e.consume(o), (l = o), x)
      : H(o)
      ? (e.consume(o), _)
      : ((l = null), L(o));
  }
  function x(o) {
    return o === null || b(o) ? t(o) : o === l ? (e.consume(o), R) : (e.consume(o), x);
  }
  function L(o) {
    return o === null ||
      o === 34 ||
      o === 39 ||
      o === 60 ||
      o === 61 ||
      o === 62 ||
      o === 96 ||
      G(o)
      ? B(o)
      : (e.consume(o), L);
  }
  function R(o) {
    return o === 47 || o === 62 || H(o) ? O(o) : t(o);
  }
  function P(o) {
    return o === 62 ? (e.consume(o), U) : t(o);
  }
  function U(o) {
    return H(o) ? (e.consume(o), U) : o === null || b(o) ? I(o) : t(o);
  }
  function I(o) {
    return o === 45 && i === 2
      ? (e.consume(o), V)
      : o === 60 && i === 1
      ? (e.consume(o), K)
      : o === 62 && i === 4
      ? (e.consume(o), q)
      : o === 63 && i === 3
      ? (e.consume(o), Y)
      : o === 93 && i === 5
      ? (e.consume(o), Q)
      : b(o) && (i === 6 || i === 7)
      ? e.check(vn, q, T)(o)
      : o === null || b(o)
      ? T(o)
      : (e.consume(o), I);
  }
  function T(o) {
    return e.exit('htmlFlowData'), F(o);
  }
  function F(o) {
    return o === null
      ? s(o)
      : b(o)
      ? e.attempt({ tokenize: E, partial: !0 }, F, s)(o)
      : (e.enter('htmlFlowData'), I(o));
  }
  function E(o, de, oe) {
    return se;
    function se(re) {
      return o.enter('lineEnding'), o.consume(re), o.exit('lineEnding'), he;
    }
    function he(re) {
      return n.parser.lazy[n.now().line] ? oe(re) : de(re);
    }
  }
  function V(o) {
    return o === 45 ? (e.consume(o), Y) : I(o);
  }
  function K(o) {
    return o === 47 ? (e.consume(o), (c = ''), J) : I(o);
  }
  function J(o) {
    return o === 62 && Ye.includes(c.toLowerCase())
      ? (e.consume(o), q)
      : te(o) && c.length < 8
      ? (e.consume(o), (c += String.fromCharCode(o)), J)
      : I(o);
  }
  function Q(o) {
    return o === 93 ? (e.consume(o), Y) : I(o);
  }
  function Y(o) {
    return o === 62 ? (e.consume(o), q) : o === 45 && i === 2 ? (e.consume(o), Y) : I(o);
  }
  function q(o) {
    return o === null || b(o) ? (e.exit('htmlFlowData'), s(o)) : (e.consume(o), q);
  }
  function s(o) {
    return e.exit('htmlFlow'), r(o);
  }
}
function Sn(e, r, t) {
  return n;
  function n(i) {
    return (
      e.exit('htmlFlowData'),
      e.enter('lineEndingBlank'),
      e.consume(i),
      e.exit('lineEndingBlank'),
      e.attempt(Se, r, t)
    );
  }
}
var bn = { name: 'htmlText', tokenize: An };
function An(e, r, t) {
  let n = this,
    i,
    u,
    c,
    a;
  return l;
  function l(s) {
    return e.enter('htmlText'), e.enter('htmlTextData'), e.consume(s), d;
  }
  function d(s) {
    return s === 33
      ? (e.consume(s), f)
      : s === 47
      ? (e.consume(s), L)
      : s === 63
      ? (e.consume(s), _)
      : te(s)
      ? (e.consume(s), U)
      : t(s);
  }
  function f(s) {
    return s === 45
      ? (e.consume(s), g)
      : s === 91
      ? (e.consume(s), (u = 'CDATA['), (c = 0), D)
      : te(s)
      ? (e.consume(s), B)
      : t(s);
  }
  function g(s) {
    return s === 45 ? (e.consume(s), p) : t(s);
  }
  function p(s) {
    return s === null || s === 62 ? t(s) : s === 45 ? (e.consume(s), m) : k(s);
  }
  function m(s) {
    return s === null || s === 62 ? t(s) : k(s);
  }
  function k(s) {
    return s === null
      ? t(s)
      : s === 45
      ? (e.consume(s), C)
      : b(s)
      ? ((a = k), Q(s))
      : (e.consume(s), k);
  }
  function C(s) {
    return s === 45 ? (e.consume(s), q) : k(s);
  }
  function D(s) {
    return s === u.charCodeAt(c++) ? (e.consume(s), c === u.length ? y : D) : t(s);
  }
  function y(s) {
    return s === null
      ? t(s)
      : s === 93
      ? (e.consume(s), O)
      : b(s)
      ? ((a = y), Q(s))
      : (e.consume(s), y);
  }
  function O(s) {
    return s === 93 ? (e.consume(s), S) : y(s);
  }
  function S(s) {
    return s === 62 ? q(s) : s === 93 ? (e.consume(s), S) : y(s);
  }
  function B(s) {
    return s === null || s === 62 ? q(s) : b(s) ? ((a = B), Q(s)) : (e.consume(s), B);
  }
  function _(s) {
    return s === null
      ? t(s)
      : s === 63
      ? (e.consume(s), x)
      : b(s)
      ? ((a = _), Q(s))
      : (e.consume(s), _);
  }
  function x(s) {
    return s === 62 ? q(s) : _(s);
  }
  function L(s) {
    return te(s) ? (e.consume(s), R) : t(s);
  }
  function R(s) {
    return s === 45 || ee(s) ? (e.consume(s), R) : P(s);
  }
  function P(s) {
    return b(s) ? ((a = P), Q(s)) : H(s) ? (e.consume(s), P) : q(s);
  }
  function U(s) {
    return s === 45 || ee(s) ? (e.consume(s), U) : s === 47 || s === 62 || G(s) ? I(s) : t(s);
  }
  function I(s) {
    return s === 47
      ? (e.consume(s), q)
      : s === 58 || s === 95 || te(s)
      ? (e.consume(s), T)
      : b(s)
      ? ((a = I), Q(s))
      : H(s)
      ? (e.consume(s), I)
      : q(s);
  }
  function T(s) {
    return s === 45 || s === 46 || s === 58 || s === 95 || ee(s) ? (e.consume(s), T) : F(s);
  }
  function F(s) {
    return s === 61 ? (e.consume(s), E) : b(s) ? ((a = F), Q(s)) : H(s) ? (e.consume(s), F) : I(s);
  }
  function E(s) {
    return s === null || s === 60 || s === 61 || s === 62 || s === 96
      ? t(s)
      : s === 34 || s === 39
      ? (e.consume(s), (i = s), V)
      : b(s)
      ? ((a = E), Q(s))
      : H(s)
      ? (e.consume(s), E)
      : (e.consume(s), (i = void 0), J);
  }
  function V(s) {
    return s === i
      ? (e.consume(s), K)
      : s === null
      ? t(s)
      : b(s)
      ? ((a = V), Q(s))
      : (e.consume(s), V);
  }
  function K(s) {
    return s === 62 || s === 47 || G(s) ? I(s) : t(s);
  }
  function J(s) {
    return s === null || s === 34 || s === 39 || s === 60 || s === 61 || s === 96
      ? t(s)
      : s === 62 || G(s)
      ? I(s)
      : (e.consume(s), J);
  }
  function Q(s) {
    return (
      e.exit('htmlTextData'),
      e.enter('lineEnding'),
      e.consume(s),
      e.exit('lineEnding'),
      w(e, Y, 'linePrefix', n.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4)
    );
  }
  function Y(s) {
    return e.enter('htmlTextData'), a(s);
  }
  function q(s) {
    return s === 62 ? (e.consume(s), e.exit('htmlTextData'), e.exit('htmlText'), r) : t(s);
  }
}
var _e = { name: 'labelEnd', tokenize: wn, resolveTo: zn, resolveAll: Tn },
  En = { tokenize: Dn },
  In = { tokenize: Bn },
  Cn = { tokenize: _n };
function Tn(e) {
  let r = -1,
    t;
  for (; ++r < e.length; )
    (t = e[r][1]),
      (t.type === 'labelImage' || t.type === 'labelLink' || t.type === 'labelEnd') &&
        (e.splice(r + 1, t.type === 'labelImage' ? 4 : 2), (t.type = 'data'), r++);
  return e;
}
function zn(e, r) {
  let t = e.length,
    n = 0,
    i,
    u,
    c,
    a;
  for (; t--; )
    if (((i = e[t][1]), u)) {
      if (i.type === 'link' || (i.type === 'labelLink' && i._inactive)) break;
      e[t][0] === 'enter' && i.type === 'labelLink' && (i._inactive = !0);
    } else if (c) {
      if (
        e[t][0] === 'enter' &&
        (i.type === 'labelImage' || i.type === 'labelLink') &&
        !i._balanced &&
        ((u = t), i.type !== 'labelLink')
      ) {
        n = 2;
        break;
      }
    } else i.type === 'labelEnd' && (c = t);
  let l = {
      type: e[u][1].type === 'labelLink' ? 'link' : 'image',
      start: Object.assign({}, e[u][1].start),
      end: Object.assign({}, e[e.length - 1][1].end),
    },
    d = {
      type: 'label',
      start: Object.assign({}, e[u][1].start),
      end: Object.assign({}, e[c][1].end),
    },
    f = {
      type: 'labelText',
      start: Object.assign({}, e[u + n + 2][1].end),
      end: Object.assign({}, e[c - 2][1].start),
    };
  return (
    (a = [
      ['enter', l, r],
      ['enter', d, r],
    ]),
    (a = W(a, e.slice(u + 1, u + n + 3))),
    (a = W(a, [['enter', f, r]])),
    (a = W(a, De(r.parser.constructs.insideSpan.null, e.slice(u + n + 4, c - 3), r))),
    (a = W(a, [['exit', f, r], e[c - 2], e[c - 1], ['exit', d, r]])),
    (a = W(a, e.slice(c + 1))),
    (a = W(a, [['exit', l, r]])),
    ne(e, u, e.length, a),
    e
  );
}
function wn(e, r, t) {
  let n = this,
    i = n.events.length,
    u,
    c;
  for (; i--; )
    if (
      (n.events[i][1].type === 'labelImage' || n.events[i][1].type === 'labelLink') &&
      !n.events[i][1]._balanced
    ) {
      u = n.events[i][1];
      break;
    }
  return a;
  function a(f) {
    return u
      ? u._inactive
        ? d(f)
        : ((c = n.parser.defined.includes(fe(n.sliceSerialize({ start: u.end, end: n.now() })))),
          e.enter('labelEnd'),
          e.enter('labelMarker'),
          e.consume(f),
          e.exit('labelMarker'),
          e.exit('labelEnd'),
          l)
      : t(f);
  }
  function l(f) {
    return f === 40
      ? e.attempt(En, r, c ? r : d)(f)
      : f === 91
      ? e.attempt(In, r, c ? e.attempt(Cn, r, d) : d)(f)
      : c
      ? r(f)
      : d(f);
  }
  function d(f) {
    return (u._balanced = !0), t(f);
  }
}
function Dn(e, r, t) {
  return n;
  function n(l) {
    return (
      e.enter('resource'),
      e.enter('resourceMarker'),
      e.consume(l),
      e.exit('resourceMarker'),
      xe(e, i)
    );
  }
  function i(l) {
    return l === 41
      ? a(l)
      : it(
          e,
          u,
          t,
          'resourceDestination',
          'resourceDestinationLiteral',
          'resourceDestinationLiteralMarker',
          'resourceDestinationRaw',
          'resourceDestinationString',
          32
        )(l);
  }
  function u(l) {
    return G(l) ? xe(e, c)(l) : a(l);
  }
  function c(l) {
    return l === 34 || l === 39 || l === 40
      ? ct(e, xe(e, a), t, 'resourceTitle', 'resourceTitleMarker', 'resourceTitleString')(l)
      : a(l);
  }
  function a(l) {
    return l === 41
      ? (e.enter('resourceMarker'), e.consume(l), e.exit('resourceMarker'), e.exit('resource'), r)
      : t(l);
  }
}
function Bn(e, r, t) {
  let n = this;
  return i;
  function i(c) {
    return ut.call(n, e, u, t, 'reference', 'referenceMarker', 'referenceString')(c);
  }
  function u(c) {
    return n.parser.defined.includes(
      fe(n.sliceSerialize(n.events[n.events.length - 1][1]).slice(1, -1))
    )
      ? r(c)
      : t(c);
  }
}
function _n(e, r, t) {
  return n;
  function n(u) {
    return (
      e.enter('reference'), e.enter('referenceMarker'), e.consume(u), e.exit('referenceMarker'), i
    );
  }
  function i(u) {
    return u === 93
      ? (e.enter('referenceMarker'),
        e.consume(u),
        e.exit('referenceMarker'),
        e.exit('reference'),
        r)
      : t(u);
  }
}
var Mn = { name: 'labelStartImage', tokenize: Pn, resolveAll: _e.resolveAll };
function Pn(e, r, t) {
  let n = this;
  return i;
  function i(a) {
    return (
      e.enter('labelImage'),
      e.enter('labelImageMarker'),
      e.consume(a),
      e.exit('labelImageMarker'),
      u
    );
  }
  function u(a) {
    return a === 91
      ? (e.enter('labelMarker'), e.consume(a), e.exit('labelMarker'), e.exit('labelImage'), c)
      : t(a);
  }
  function c(a) {
    return a === 94 && '_hiddenFootnoteSupport' in n.parser.constructs ? t(a) : r(a);
  }
}
var On = { name: 'labelStartLink', tokenize: Ln, resolveAll: _e.resolveAll };
function Ln(e, r, t) {
  let n = this;
  return i;
  function i(c) {
    return (
      e.enter('labelLink'),
      e.enter('labelMarker'),
      e.consume(c),
      e.exit('labelMarker'),
      e.exit('labelLink'),
      u
    );
  }
  function u(c) {
    return c === 94 && '_hiddenFootnoteSupport' in n.parser.constructs ? t(c) : r(c);
  }
}
var Ee = { name: 'lineEnding', tokenize: jn };
function jn(e, r) {
  return t;
  function t(n) {
    return e.enter('lineEnding'), e.consume(n), e.exit('lineEnding'), w(e, r, 'linePrefix');
  }
}
var ye = { name: 'thematicBreak', tokenize: Rn };
function Rn(e, r, t) {
  let n = 0,
    i;
  return u;
  function u(l) {
    return e.enter('thematicBreak'), (i = l), c(l);
  }
  function c(l) {
    return l === i
      ? (e.enter('thematicBreakSequence'), a(l))
      : H(l)
      ? w(e, c, 'whitespace')(l)
      : n < 3 || (l !== null && !b(l))
      ? t(l)
      : (e.exit('thematicBreak'), r(l));
  }
  function a(l) {
    return l === i ? (e.consume(l), n++, a) : (e.exit('thematicBreakSequence'), c(l));
  }
}
var $ = { name: 'list', tokenize: Vn, continuation: { tokenize: Qn }, exit: Un },
  qn = { tokenize: Zn, partial: !0 },
  Hn = { tokenize: Nn, partial: !0 };
function Vn(e, r, t) {
  let n = this,
    i = n.events[n.events.length - 1],
    u = i && i[1].type === 'linePrefix' ? i[2].sliceSerialize(i[1], !0).length : 0,
    c = 0;
  return a;
  function a(m) {
    let k =
      n.containerState.type || (m === 42 || m === 43 || m === 45 ? 'listUnordered' : 'listOrdered');
    if (k === 'listUnordered' ? !n.containerState.marker || m === n.containerState.marker : Ie(m)) {
      if (
        (n.containerState.type || ((n.containerState.type = k), e.enter(k, { _container: !0 })),
        k === 'listUnordered')
      )
        return e.enter('listItemPrefix'), m === 42 || m === 45 ? e.check(ye, t, d)(m) : d(m);
      if (!n.interrupt || m === 49)
        return e.enter('listItemPrefix'), e.enter('listItemValue'), l(m);
    }
    return t(m);
  }
  function l(m) {
    return Ie(m) && ++c < 10
      ? (e.consume(m), l)
      : (!n.interrupt || c < 2) &&
        (n.containerState.marker ? m === n.containerState.marker : m === 41 || m === 46)
      ? (e.exit('listItemValue'), d(m))
      : t(m);
  }
  function d(m) {
    return (
      e.enter('listItemMarker'),
      e.consume(m),
      e.exit('listItemMarker'),
      (n.containerState.marker = n.containerState.marker || m),
      e.check(Se, n.interrupt ? t : f, e.attempt(qn, p, g))
    );
  }
  function f(m) {
    return (n.containerState.initialBlankLine = !0), u++, p(m);
  }
  function g(m) {
    return H(m)
      ? (e.enter('listItemPrefixWhitespace'), e.consume(m), e.exit('listItemPrefixWhitespace'), p)
      : t(m);
  }
  function p(m) {
    return (
      (n.containerState.size = u + n.sliceSerialize(e.exit('listItemPrefix'), !0).length), r(m)
    );
  }
}
function Qn(e, r, t) {
  let n = this;
  return (n.containerState._closeFlow = void 0), e.check(Se, i, u);
  function i(a) {
    return (
      (n.containerState.furtherBlankLines =
        n.containerState.furtherBlankLines || n.containerState.initialBlankLine),
      w(e, r, 'listItemIndent', n.containerState.size + 1)(a)
    );
  }
  function u(a) {
    return n.containerState.furtherBlankLines || !H(a)
      ? ((n.containerState.furtherBlankLines = void 0),
        (n.containerState.initialBlankLine = void 0),
        c(a))
      : ((n.containerState.furtherBlankLines = void 0),
        (n.containerState.initialBlankLine = void 0),
        e.attempt(Hn, r, c)(a));
  }
  function c(a) {
    return (
      (n.containerState._closeFlow = !0),
      (n.interrupt = void 0),
      w(
        e,
        e.attempt($, r, t),
        'linePrefix',
        n.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4
      )(a)
    );
  }
}
function Nn(e, r, t) {
  let n = this;
  return w(e, i, 'listItemIndent', n.containerState.size + 1);
  function i(u) {
    let c = n.events[n.events.length - 1];
    return c &&
      c[1].type === 'listItemIndent' &&
      c[2].sliceSerialize(c[1], !0).length === n.containerState.size
      ? r(u)
      : t(u);
  }
}
function Un(e) {
  e.exit(this.containerState.type);
}
function Zn(e, r, t) {
  let n = this;
  return w(
    e,
    i,
    'listItemPrefixWhitespace',
    n.parser.constructs.disable.null.includes('codeIndented') ? void 0 : 4 + 1
  );
  function i(u) {
    let c = n.events[n.events.length - 1];
    return !H(u) && c && c[1].type === 'listItemPrefixWhitespace' ? r(u) : t(u);
  }
}
var Ke = { name: 'setextUnderline', tokenize: Kn, resolveTo: Yn };
function Yn(e, r) {
  let t = e.length,
    n,
    i,
    u;
  for (; t--; )
    if (e[t][0] === 'enter') {
      if (e[t][1].type === 'content') {
        n = t;
        break;
      }
      e[t][1].type === 'paragraph' && (i = t);
    } else
      e[t][1].type === 'content' && e.splice(t, 1), !u && e[t][1].type === 'definition' && (u = t);
  let c = {
    type: 'setextHeading',
    start: Object.assign({}, e[i][1].start),
    end: Object.assign({}, e[e.length - 1][1].end),
  };
  return (
    (e[i][1].type = 'setextHeadingText'),
    u
      ? (e.splice(i, 0, ['enter', c, r]),
        e.splice(u + 1, 0, ['exit', e[n][1], r]),
        (e[n][1].end = Object.assign({}, e[u][1].end)))
      : (e[n][1] = c),
    e.push(['exit', c, r]),
    e
  );
}
function Kn(e, r, t) {
  let n = this,
    i = n.events.length,
    u,
    c;
  for (; i--; )
    if (
      n.events[i][1].type !== 'lineEnding' &&
      n.events[i][1].type !== 'linePrefix' &&
      n.events[i][1].type !== 'content'
    ) {
      c = n.events[i][1].type === 'paragraph';
      break;
    }
  return a;
  function a(f) {
    return !n.parser.lazy[n.now().line] && (n.interrupt || c)
      ? (e.enter('setextHeadingLine'), e.enter('setextHeadingLineSequence'), (u = f), l(f))
      : t(f);
  }
  function l(f) {
    return f === u
      ? (e.consume(f), l)
      : (e.exit('setextHeadingLineSequence'), w(e, d, 'lineSuffix')(f));
  }
  function d(f) {
    return f === null || b(f) ? (e.exit('setextHeadingLine'), r(f)) : t(f);
  }
}
var $n = { tokenize: Wn };
function Wn(e) {
  let r = this,
    t = e.attempt(
      Se,
      n,
      e.attempt(
        this.parser.constructs.flowInitial,
        i,
        w(e, e.attempt(this.parser.constructs.flow, i, e.attempt(nn, i)), 'linePrefix')
      )
    );
  return t;
  function n(u) {
    if (u === null) {
      e.consume(u);
      return;
    }
    return (
      e.enter('lineEndingBlank'),
      e.consume(u),
      e.exit('lineEndingBlank'),
      (r.currentConstruct = void 0),
      t
    );
  }
  function i(u) {
    if (u === null) {
      e.consume(u);
      return;
    }
    return (
      e.enter('lineEnding'), e.consume(u), e.exit('lineEnding'), (r.currentConstruct = void 0), t
    );
  }
}
var Gn = { resolveAll: st() },
  Jn = ot('string'),
  Xn = ot('text');
function ot(e) {
  return { tokenize: r, resolveAll: st(e === 'text' ? er : void 0) };
  function r(t) {
    let n = this,
      i = this.parser.constructs[e],
      u = t.attempt(i, c, a);
    return c;
    function c(f) {
      return d(f) ? u(f) : a(f);
    }
    function a(f) {
      if (f === null) {
        t.consume(f);
        return;
      }
      return t.enter('data'), t.consume(f), l;
    }
    function l(f) {
      return d(f) ? (t.exit('data'), u(f)) : (t.consume(f), l);
    }
    function d(f) {
      if (f === null) return !0;
      let g = i[f],
        p = -1;
      if (g)
        for (; ++p < g.length; ) {
          let m = g[p];
          if (!m.previous || m.previous.call(n, n.previous)) return !0;
        }
      return !1;
    }
  }
}
function st(e) {
  return r;
  function r(t, n) {
    let i = -1,
      u;
    for (; ++i <= t.length; )
      u === void 0
        ? t[i] && t[i][1].type === 'data' && ((u = i), i++)
        : (!t[i] || t[i][1].type !== 'data') &&
          (i !== u + 2 &&
            ((t[u][1].end = t[i - 1][1].end), t.splice(u + 2, i - u - 2), (i = u + 2)),
          (u = void 0));
    return e ? e(t, n) : t;
  }
}
function er(e, r) {
  let t = 0;
  for (; ++t <= e.length; )
    if ((t === e.length || e[t][1].type === 'lineEnding') && e[t - 1][1].type === 'data') {
      let n = e[t - 1][1],
        i = r.sliceStream(n),
        u = i.length,
        c = -1,
        a = 0,
        l;
      for (; u--; ) {
        let d = i[u];
        if (typeof d == 'string') {
          for (c = d.length; d.charCodeAt(c - 1) === 32; ) a++, c--;
          if (c) break;
          c = -1;
        } else if (d === -2) (l = !0), a++;
        else if (d !== -1) {
          u++;
          break;
        }
      }
      if (a) {
        let d = {
          type: t === e.length || l || a < 2 ? 'lineSuffix' : 'hardBreakTrailing',
          start: {
            line: n.end.line,
            column: n.end.column - a,
            offset: n.end.offset - a,
            _index: n.start._index + u,
            _bufferIndex: u ? c : n.start._bufferIndex + c,
          },
          end: Object.assign({}, n.end),
        };
        (n.end = Object.assign({}, d.start)),
          n.start.offset === n.end.offset
            ? Object.assign(n, d)
            : (e.splice(t, 0, ['enter', d, r], ['exit', d, r]), (t += 2));
      }
      t++;
    }
  return e;
}
function tr(e, r, t) {
  let n = Object.assign(t ? Object.assign({}, t) : { line: 1, column: 1, offset: 0 }, {
      _index: 0,
      _bufferIndex: -1,
    }),
    i = {},
    u = [],
    c = [],
    a = [],
    l = !0,
    d = {
      consume: B,
      enter: _,
      exit: x,
      attempt: P(L),
      check: P(R),
      interrupt: P(R, { interrupt: !0 }),
    },
    f = {
      previous: null,
      code: null,
      containerState: {},
      events: [],
      parser: e,
      sliceStream: C,
      sliceSerialize: k,
      now: D,
      defineSkip: y,
      write: m,
    },
    g = r.tokenize.call(f, d),
    p;
  return r.resolveAll && u.push(r), f;
  function m(F) {
    return (
      (c = W(c, F)),
      O(),
      c[c.length - 1] !== null ? [] : (U(r, 0), (f.events = De(u, f.events, f)), f.events)
    );
  }
  function k(F, E) {
    return rr(C(F), E);
  }
  function C(F) {
    return nr(c, F);
  }
  function D() {
    return Object.assign({}, n);
  }
  function y(F) {
    (i[F.line] = F.column), T();
  }
  function O() {
    let F;
    for (; n._index < c.length; ) {
      let E = c[n._index];
      if (typeof E == 'string')
        for (
          F = n._index, n._bufferIndex < 0 && (n._bufferIndex = 0);
          n._index === F && n._bufferIndex < E.length;

        )
          S(E.charCodeAt(n._bufferIndex));
      else S(E);
    }
  }
  function S(F) {
    (l = void 0), (p = F), (g = g(F));
  }
  function B(F) {
    b(F)
      ? (n.line++, (n.column = 1), (n.offset += F === -3 ? 2 : 1), T())
      : F !== -1 && (n.column++, n.offset++),
      n._bufferIndex < 0
        ? n._index++
        : (n._bufferIndex++,
          n._bufferIndex === c[n._index].length && ((n._bufferIndex = -1), n._index++)),
      (f.previous = F),
      (l = !0);
  }
  function _(F, E) {
    let V = E || {};
    return (V.type = F), (V.start = D()), f.events.push(['enter', V, f]), a.push(V), V;
  }
  function x(F) {
    let E = a.pop();
    return (E.end = D()), f.events.push(['exit', E, f]), E;
  }
  function L(F, E) {
    U(F, E.from);
  }
  function R(F, E) {
    E.restore();
  }
  function P(F, E) {
    return V;
    function V(K, J, Q) {
      let Y, q, s, o;
      return Array.isArray(K) ? oe(K) : 'tokenize' in K ? oe([K]) : de(K);
      function de(N) {
        return pe;
        function pe(ie) {
          let ae = ie !== null && N[ie],
            le = ie !== null && N.null,
            ve = [
              ...(Array.isArray(ae) ? ae : ae ? [ae] : []),
              ...(Array.isArray(le) ? le : le ? [le] : []),
            ];
          return oe(ve)(ie);
        }
      }
      function oe(N) {
        return (Y = N), (q = 0), N.length === 0 ? Q : se(N[q]);
      }
      function se(N) {
        return pe;
        function pe(ie) {
          return (
            (o = I()),
            (s = N),
            N.partial || (f.currentConstruct = N),
            N.name && f.parser.constructs.disable.null.includes(N.name)
              ? re(ie)
              : N.tokenize.call(E ? Object.assign(Object.create(f), E) : f, d, he, re)(ie)
          );
        }
      }
      function he(N) {
        return (l = !0), F(s, o), J;
      }
      function re(N) {
        return (l = !0), o.restore(), ++q < Y.length ? se(Y[q]) : Q;
      }
    }
  }
  function U(F, E) {
    F.resolveAll && !u.includes(F) && u.push(F),
      F.resolve && ne(f.events, E, f.events.length - E, F.resolve(f.events.slice(E), f)),
      F.resolveTo && (f.events = F.resolveTo(f.events, f));
  }
  function I() {
    let F = D(),
      E = f.previous,
      V = f.currentConstruct,
      K = f.events.length,
      J = Array.from(a);
    return { restore: Q, from: K };
    function Q() {
      (n = F), (f.previous = E), (f.currentConstruct = V), (f.events.length = K), (a = J), T();
    }
  }
  function T() {
    n.line in i && n.column < 2 && ((n.column = i[n.line]), (n.offset += i[n.line] - 1));
  }
}
function nr(e, r) {
  let t = r.start._index,
    n = r.start._bufferIndex,
    i = r.end._index,
    u = r.end._bufferIndex,
    c;
  return (
    t === i
      ? (c = [e[t].slice(n, u)])
      : ((c = e.slice(t, i)), n > -1 && (c[0] = c[0].slice(n)), u > 0 && c.push(e[i].slice(0, u))),
    c
  );
}
function rr(e, r) {
  let t = -1,
    n = [],
    i;
  for (; ++t < e.length; ) {
    let u = e[t],
      c;
    if (typeof u == 'string') c = u;
    else
      switch (u) {
        case -5: {
          c = '\r';
          break;
        }
        case -4: {
          c = `
`;
          break;
        }
        case -3: {
          c = `\r
`;
          break;
        }
        case -2: {
          c = r ? ' ' : '	';
          break;
        }
        case -1: {
          if (!r && i) continue;
          c = ' ';
          break;
        }
        default:
          c = String.fromCharCode(u);
      }
    (i = u === -2), n.push(c);
  }
  return n.join('');
}
var at = {};
St(at, {
  attentionMarkers: () => fr,
  contentInitial: () => ur,
  disable: () => dr,
  document: () => ir,
  flow: () => or,
  flowInitial: () => cr,
  insideSpan: () => lr,
  string: () => sr,
  text: () => ar,
});
var ir = {
    [42]: $,
    [43]: $,
    [45]: $,
    [48]: $,
    [49]: $,
    [50]: $,
    [51]: $,
    [52]: $,
    [53]: $,
    [54]: $,
    [55]: $,
    [56]: $,
    [57]: $,
    [62]: et,
  },
  ur = { [91]: sn },
  cr = { [-2]: Ae, [-1]: Ae, [32]: Ae },
  or = { [35]: pn, [42]: ye, [45]: [Ke, ye], [60]: xn, [61]: Ke, [95]: ye, [96]: Ze, [126]: Ze },
  sr = { [38]: nt, [92]: tt },
  ar = {
    [-5]: Ee,
    [-4]: Ee,
    [-3]: Ee,
    [33]: Mn,
    [38]: nt,
    [42]: Te,
    [60]: [Rt, bn],
    [91]: On,
    [92]: [dn, tt],
    [93]: _e,
    [95]: Te,
    [96]: Gt,
  },
  lr = { null: [Te, Gn] },
  fr = { null: [42, 95] },
  dr = { null: [] };
function hr(e = {}) {
  let r = At([at].concat(e.extensions || [])),
    t = {
      defined: [],
      lazy: {},
      constructs: r,
      content: n(Bt),
      document: n(Mt),
      flow: n($n),
      string: n(Jn),
      text: n(Xn),
    };
  return t;
  function n(i) {
    return u;
    function u(c) {
      return tr(t, i, c);
    }
  }
}
var $e = /[\0\t\n\r]/g;
function pr() {
  let e = 1,
    r = '',
    t = !0,
    n;
  return i;
  function i(u, c, a) {
    let l = [],
      d,
      f,
      g,
      p,
      m;
    for (
      u = r + u.toString(c), g = 0, r = '', t && (u.charCodeAt(0) === 65279 && g++, (t = void 0));
      g < u.length;

    ) {
      if (
        (($e.lastIndex = g),
        (d = $e.exec(u)),
        (p = d && d.index !== void 0 ? d.index : u.length),
        (m = u.charCodeAt(p)),
        !d)
      ) {
        r = u.slice(g);
        break;
      }
      if (m === 10 && g === p && n) l.push(-3), (n = void 0);
      else
        switch (
          (n && (l.push(-5), (n = void 0)), g < p && (l.push(u.slice(g, p)), (e += p - g)), m)
        ) {
          case 0: {
            l.push(65533), e++;
            break;
          }
          case 9: {
            for (f = Math.ceil(e / 4) * 4, l.push(-2); e++ < f; ) l.push(-1);
            break;
          }
          case 10: {
            l.push(-4), (e = 1);
            break;
          }
          default:
            (n = !0), (e = 1);
        }
      g = p + 1;
    }
    return a && (n && l.push(-5), r && l.push(r), l.push(null)), l;
  }
}
function mr(e) {
  for (; !rt(e); );
  return e;
}
function lt(e, r) {
  let t = Number.parseInt(e, r);
  return t < 9 ||
    t === 11 ||
    (t > 13 && t < 32) ||
    (t > 126 && t < 160) ||
    (t > 55295 && t < 57344) ||
    (t > 64975 && t < 65008) ||
    (t & 65535) === 65535 ||
    (t & 65535) === 65534 ||
    t > 1114111
    ? '\uFFFD'
    : String.fromCharCode(t);
}
var gr = /\\([!-/:-@[-`{-~])|&(#(?:\d{1,7}|x[\da-f]{1,6})|[\da-z]{1,31});/gi;
function kr(e) {
  return e.replace(gr, xr);
}
function xr(e, r, t) {
  if (r) return r;
  if (t.charCodeAt(0) === 35) {
    let n = t.charCodeAt(1),
      i = n === 120 || n === 88;
    return lt(t.slice(i ? 2 : 1), i ? 16 : 10);
  }
  return Be(t) || e;
}
function Fe(e) {
  return !e || typeof e != 'object'
    ? ''
    : 'position' in e || 'type' in e
    ? We(e.position)
    : 'start' in e || 'end' in e
    ? We(e)
    : 'line' in e || 'column' in e
    ? ze(e)
    : '';
}
function ze(e) {
  return Ge(e && e.line) + ':' + Ge(e && e.column);
}
function We(e) {
  return ze(e && e.start) + '-' + ze(e && e.end);
}
function Ge(e) {
  return e && typeof e == 'number' ? e : 1;
}
var we = {}.hasOwnProperty,
  Fr = function (e, r, t) {
    return (
      typeof r != 'string' && ((t = r), (r = void 0)),
      vr(t)(mr(hr(t).document().write(pr()(e, r, !0))))
    );
  };
function vr(e = {}) {
  let r = ft(
      {
        transforms: [],
        canContainEols: ['emphasis', 'fragment', 'heading', 'paragraph', 'strong'],
        enter: {
          autolink: l(Le),
          autolinkProtocol: T,
          autolinkEmail: T,
          atxHeading: l(Me),
          blockQuote: l(le),
          characterEscape: T,
          characterReference: T,
          codeFenced: l(ve),
          codeFencedFenceInfo: d,
          codeFencedFenceMeta: d,
          codeIndented: l(ve, d),
          codeText: l(dt, d),
          codeTextData: T,
          data: T,
          codeFlowValue: T,
          definition: l(ht),
          definitionDestinationString: d,
          definitionLabelString: d,
          definitionTitleString: d,
          emphasis: l(pt),
          hardBreakEscape: l(Pe),
          hardBreakTrailing: l(Pe),
          htmlFlow: l(Oe, d),
          htmlFlowData: T,
          htmlText: l(Oe, d),
          htmlTextData: T,
          image: l(mt),
          label: d,
          link: l(Le),
          listItem: l(gt),
          listItemValue: C,
          listOrdered: l(je, k),
          listUnordered: l(je),
          paragraph: l(kt),
          reference: he,
          referenceString: d,
          resourceDestinationString: d,
          resourceTitleString: d,
          setextHeading: l(Me),
          strong: l(xt),
          thematicBreak: l(yt),
        },
        exit: {
          atxHeading: g(),
          atxHeadingSequence: R,
          autolink: g(),
          autolinkEmail: ae,
          autolinkProtocol: ie,
          blockQuote: g(),
          characterEscapeValue: F,
          characterReferenceMarkerHexadecimal: N,
          characterReferenceMarkerNumeric: N,
          characterReferenceValue: pe,
          codeFenced: g(S),
          codeFencedFence: O,
          codeFencedFenceInfo: D,
          codeFencedFenceMeta: y,
          codeFlowValue: F,
          codeIndented: g(B),
          codeText: g(Q),
          codeTextData: F,
          data: F,
          definition: g(),
          definitionDestinationString: L,
          definitionLabelString: _,
          definitionTitleString: x,
          emphasis: g(),
          hardBreakEscape: g(V),
          hardBreakTrailing: g(V),
          htmlFlow: g(K),
          htmlFlowData: F,
          htmlText: g(J),
          htmlTextData: F,
          image: g(q),
          label: o,
          labelText: s,
          lineEnding: E,
          link: g(Y),
          listItem: g(),
          listOrdered: g(),
          listUnordered: g(),
          paragraph: g(),
          referenceString: re,
          resourceDestinationString: de,
          resourceTitleString: oe,
          resource: se,
          setextHeading: g(I),
          setextHeadingLineSequence: U,
          setextHeadingText: P,
          strong: g(),
          thematicBreak: g(),
        },
      },
      e.mdastExtensions || []
    ),
    t = {};
  return n;
  function n(h) {
    let v = { type: 'root', children: [] },
      A = [v],
      z = [],
      X = [],
      me = {
        stack: A,
        tokenStack: z,
        config: r,
        enter: f,
        exit: p,
        buffer: d,
        resume: m,
        setData: u,
        getData: c,
      },
      M = -1;
    for (; ++M < h.length; )
      if (h[M][1].type === 'listOrdered' || h[M][1].type === 'listUnordered')
        if (h[M][0] === 'enter') X.push(M);
        else {
          let Z = X.pop();
          M = i(h, Z, M);
        }
    for (M = -1; ++M < h.length; ) {
      let Z = r[h[M][0]];
      we.call(Z, h[M][1].type) &&
        Z[h[M][1].type].call(
          Object.assign({ sliceSerialize: h[M][2].sliceSerialize }, me),
          h[M][1]
        );
    }
    if (z.length > 0) {
      let Z = z[z.length - 1];
      (Z[1] || Je).call(me, void 0, Z[0]);
    }
    for (
      v.position = {
        start: a(h.length > 0 ? h[0][1].start : { line: 1, column: 1, offset: 0 }),
        end: a(h.length > 0 ? h[h.length - 2][1].end : { line: 1, column: 1, offset: 0 }),
      },
        M = -1;
      ++M < r.transforms.length;

    )
      v = r.transforms[M](v) || v;
    return v;
  }
  function i(h, v, A) {
    let z = v - 1,
      X = -1,
      me = !1,
      M,
      Z,
      ge,
      ke;
    for (; ++z <= A; ) {
      let j = h[z];
      if (
        (j[1].type === 'listUnordered' || j[1].type === 'listOrdered' || j[1].type === 'blockQuote'
          ? (j[0] === 'enter' ? X++ : X--, (ke = void 0))
          : j[1].type === 'lineEndingBlank'
          ? j[0] === 'enter' && (M && !ke && !X && !ge && (ge = z), (ke = void 0))
          : j[1].type === 'linePrefix' ||
            j[1].type === 'listItemValue' ||
            j[1].type === 'listItemMarker' ||
            j[1].type === 'listItemPrefix' ||
            j[1].type === 'listItemPrefixWhitespace' ||
            (ke = void 0),
        (!X && j[0] === 'enter' && j[1].type === 'listItemPrefix') ||
          (X === -1 &&
            j[0] === 'exit' &&
            (j[1].type === 'listUnordered' || j[1].type === 'listOrdered')))
      ) {
        if (M) {
          let be = z;
          for (Z = void 0; be--; ) {
            let ue = h[be];
            if (ue[1].type === 'lineEnding' || ue[1].type === 'lineEndingBlank') {
              if (ue[0] === 'exit') continue;
              Z && ((h[Z][1].type = 'lineEndingBlank'), (me = !0)),
                (ue[1].type = 'lineEnding'),
                (Z = be);
            } else if (
              !(
                ue[1].type === 'linePrefix' ||
                ue[1].type === 'blockQuotePrefix' ||
                ue[1].type === 'blockQuotePrefixWhitespace' ||
                ue[1].type === 'blockQuoteMarker' ||
                ue[1].type === 'listItemIndent'
              )
            )
              break;
          }
          ge && (!Z || ge < Z) && (M._spread = !0),
            (M.end = Object.assign({}, Z ? h[Z][1].start : j[1].end)),
            h.splice(Z || z, 0, ['exit', M, j[2]]),
            z++,
            A++;
        }
        j[1].type === 'listItemPrefix' &&
          ((M = { type: 'listItem', _spread: !1, start: Object.assign({}, j[1].start) }),
          h.splice(z, 0, ['enter', M, j[2]]),
          z++,
          A++,
          (ge = void 0),
          (ke = !0));
      }
    }
    return (h[v][1]._spread = me), A;
  }
  function u(h, v) {
    t[h] = v;
  }
  function c(h) {
    return t[h];
  }
  function a(h) {
    return { line: h.line, column: h.column, offset: h.offset };
  }
  function l(h, v) {
    return A;
    function A(z) {
      f.call(this, h(z), z), v && v.call(this, z);
    }
  }
  function d() {
    this.stack.push({ type: 'fragment', children: [] });
  }
  function f(h, v, A) {
    return (
      this.stack[this.stack.length - 1].children.push(h),
      this.stack.push(h),
      this.tokenStack.push([v, A]),
      (h.position = { start: a(v.start) }),
      h
    );
  }
  function g(h) {
    return v;
    function v(A) {
      h && h.call(this, A), p.call(this, A);
    }
  }
  function p(h, v) {
    let A = this.stack.pop(),
      z = this.tokenStack.pop();
    if (z) z[0].type !== h.type && (v ? v.call(this, h, z[0]) : (z[1] || Je).call(this, h, z[0]));
    else
      throw new Error(
        'Cannot close `' +
          h.type +
          '` (' +
          Fe({ start: h.start, end: h.end }) +
          '): it\u2019s not open'
      );
    return (A.position.end = a(h.end)), A;
  }
  function m() {
    return bt(this.stack.pop());
  }
  function k() {
    u('expectingFirstListItemValue', !0);
  }
  function C(h) {
    if (c('expectingFirstListItemValue')) {
      let v = this.stack[this.stack.length - 2];
      (v.start = Number.parseInt(this.sliceSerialize(h), 10)), u('expectingFirstListItemValue');
    }
  }
  function D() {
    let h = this.resume(),
      v = this.stack[this.stack.length - 1];
    v.lang = h;
  }
  function y() {
    let h = this.resume(),
      v = this.stack[this.stack.length - 1];
    v.meta = h;
  }
  function O() {
    c('flowCodeInside') || (this.buffer(), u('flowCodeInside', !0));
  }
  function S() {
    let h = this.resume(),
      v = this.stack[this.stack.length - 1];
    (v.value = h.replace(/^(\r?\n|\r)|(\r?\n|\r)$/g, '')), u('flowCodeInside');
  }
  function B() {
    let h = this.resume(),
      v = this.stack[this.stack.length - 1];
    v.value = h.replace(/(\r?\n|\r)$/g, '');
  }
  function _(h) {
    let v = this.resume(),
      A = this.stack[this.stack.length - 1];
    (A.label = v), (A.identifier = fe(this.sliceSerialize(h)).toLowerCase());
  }
  function x() {
    let h = this.resume(),
      v = this.stack[this.stack.length - 1];
    v.title = h;
  }
  function L() {
    let h = this.resume(),
      v = this.stack[this.stack.length - 1];
    v.url = h;
  }
  function R(h) {
    let v = this.stack[this.stack.length - 1];
    if (!v.depth) {
      let A = this.sliceSerialize(h).length;
      v.depth = A;
    }
  }
  function P() {
    u('setextHeadingSlurpLineEnding', !0);
  }
  function U(h) {
    let v = this.stack[this.stack.length - 1];
    v.depth = this.sliceSerialize(h).charCodeAt(0) === 61 ? 1 : 2;
  }
  function I() {
    u('setextHeadingSlurpLineEnding');
  }
  function T(h) {
    let v = this.stack[this.stack.length - 1],
      A = v.children[v.children.length - 1];
    (!A || A.type !== 'text') &&
      ((A = vt()), (A.position = { start: a(h.start) }), v.children.push(A)),
      this.stack.push(A);
  }
  function F(h) {
    let v = this.stack.pop();
    (v.value += this.sliceSerialize(h)), (v.position.end = a(h.end));
  }
  function E(h) {
    let v = this.stack[this.stack.length - 1];
    if (c('atHardBreak')) {
      let A = v.children[v.children.length - 1];
      (A.position.end = a(h.end)), u('atHardBreak');
      return;
    }
    !c('setextHeadingSlurpLineEnding') &&
      r.canContainEols.includes(v.type) &&
      (T.call(this, h), F.call(this, h));
  }
  function V() {
    u('atHardBreak', !0);
  }
  function K() {
    let h = this.resume(),
      v = this.stack[this.stack.length - 1];
    v.value = h;
  }
  function J() {
    let h = this.resume(),
      v = this.stack[this.stack.length - 1];
    v.value = h;
  }
  function Q() {
    let h = this.resume(),
      v = this.stack[this.stack.length - 1];
    v.value = h;
  }
  function Y() {
    let h = this.stack[this.stack.length - 1];
    c('inReference')
      ? ((h.type += 'Reference'),
        (h.referenceType = c('referenceType') || 'shortcut'),
        delete h.url,
        delete h.title)
      : (delete h.identifier, delete h.label),
      u('referenceType');
  }
  function q() {
    let h = this.stack[this.stack.length - 1];
    c('inReference')
      ? ((h.type += 'Reference'),
        (h.referenceType = c('referenceType') || 'shortcut'),
        delete h.url,
        delete h.title)
      : (delete h.identifier, delete h.label),
      u('referenceType');
  }
  function s(h) {
    let v = this.stack[this.stack.length - 2],
      A = this.sliceSerialize(h);
    (v.label = kr(A)), (v.identifier = fe(A).toLowerCase());
  }
  function o() {
    let h = this.stack[this.stack.length - 1],
      v = this.resume(),
      A = this.stack[this.stack.length - 1];
    u('inReference', !0), A.type === 'link' ? (A.children = h.children) : (A.alt = v);
  }
  function de() {
    let h = this.resume(),
      v = this.stack[this.stack.length - 1];
    v.url = h;
  }
  function oe() {
    let h = this.resume(),
      v = this.stack[this.stack.length - 1];
    v.title = h;
  }
  function se() {
    u('inReference');
  }
  function he() {
    u('referenceType', 'collapsed');
  }
  function re(h) {
    let v = this.resume(),
      A = this.stack[this.stack.length - 1];
    (A.label = v),
      (A.identifier = fe(this.sliceSerialize(h)).toLowerCase()),
      u('referenceType', 'full');
  }
  function N(h) {
    u('characterReferenceType', h.type);
  }
  function pe(h) {
    let v = this.sliceSerialize(h),
      A = c('characterReferenceType'),
      z;
    A
      ? ((z = lt(v, A === 'characterReferenceMarkerNumeric' ? 10 : 16)),
        u('characterReferenceType'))
      : (z = Be(v));
    let X = this.stack.pop();
    (X.value += z), (X.position.end = a(h.end));
  }
  function ie(h) {
    F.call(this, h);
    let v = this.stack[this.stack.length - 1];
    v.url = this.sliceSerialize(h);
  }
  function ae(h) {
    F.call(this, h);
    let v = this.stack[this.stack.length - 1];
    v.url = 'mailto:' + this.sliceSerialize(h);
  }
  function le() {
    return { type: 'blockquote', children: [] };
  }
  function ve() {
    return { type: 'code', lang: null, meta: null, value: '' };
  }
  function dt() {
    return { type: 'inlineCode', value: '' };
  }
  function ht() {
    return { type: 'definition', identifier: '', label: null, title: null, url: '' };
  }
  function pt() {
    return { type: 'emphasis', children: [] };
  }
  function Me() {
    return { type: 'heading', depth: void 0, children: [] };
  }
  function Pe() {
    return { type: 'break' };
  }
  function Oe() {
    return { type: 'html', value: '' };
  }
  function mt() {
    return { type: 'image', title: null, url: '', alt: null };
  }
  function Le() {
    return { type: 'link', title: null, url: '', children: [] };
  }
  function je(h) {
    return {
      type: 'list',
      ordered: h.type === 'listOrdered',
      start: null,
      spread: h._spread,
      children: [],
    };
  }
  function gt(h) {
    return { type: 'listItem', spread: h._spread, checked: null, children: [] };
  }
  function kt() {
    return { type: 'paragraph', children: [] };
  }
  function xt() {
    return { type: 'strong', children: [] };
  }
  function vt() {
    return { type: 'text', value: '' };
  }
  function yt() {
    return { type: 'thematicBreak' };
  }
}
function ft(e, r) {
  let t = -1;
  for (; ++t < r.length; ) {
    let n = r[t];
    Array.isArray(n) ? ft(e, n) : yr(e, n);
  }
  return e;
}
function yr(e, r) {
  let t;
  for (t in r)
    if (we.call(r, t)) {
      let n = t === 'canContainEols' || t === 'transforms',
        i = (we.call(e, t) ? e[t] : void 0) || (e[t] = n ? [] : {}),
        u = r[t];
      u && (n ? (e[t] = [...i, ...u]) : Object.assign(i, u));
    }
}
function Je(e, r) {
  throw e
    ? new Error(
        'Cannot close `' +
          e.type +
          '` (' +
          Fe({ start: e.start, end: e.end }) +
          '): a different token (`' +
          r.type +
          '`, ' +
          Fe({ start: r.start, end: r.end }) +
          ') is open'
      )
    : new Error(
        'Cannot close document, a token (`' +
          r.type +
          '`, ' +
          Fe({ start: r.start, end: r.end }) +
          ') is still open'
      );
}
export { Fr as fromMarkdown };
