var wt = Object.create,
  Re = Object.defineProperty,
  _t = Object.getOwnPropertyDescriptor,
  Mt = Object.getOwnPropertyNames,
  Lt = Object.getPrototypeOf,
  Bt = Object.prototype.hasOwnProperty,
  I = (A, g) => () => (g || A((g = { exports: {} }).exports, g), g.exports),
  Ot = (A, g, f, h) => {
    if ((g && typeof g == 'object') || typeof g == 'function')
      for (let F of Mt(g))
        !Bt.call(A, F) &&
          F !== f &&
          Re(A, F, { get: () => g[F], enumerable: !(h = _t(g, F)) || h.enumerable });
    return A;
  },
  Pt = (A, g, f) => (
    (f = A != null ? wt(Lt(A)) : {}),
    Ot(g || !A || !A.__esModule ? Re(f, 'default', { value: A, enumerable: !0 }) : f, A)
  ),
  He = I((A, g) => {
    'use strict';
    var f,
      h = 59;
    g.exports = F;
    function F(r) {
      var u = '&' + r + ';',
        c;
      return (
        (f =
          f ||
          (typeof window !== 'undefined' &&
            window.document &&
            window.document.createElement &&
            document.createElement('i'))),
        (f.innerHTML = u),
        (c = f.textContent),
        (c.charCodeAt(c.length - 1) === h && r !== 'semi') || c === u ? !1 : c
      );
    }
  }),
  ge = I((A, g) => {
    'use strict';
    var f = Object.assign;
    g.exports = f;
  }),
  Ie = I((A, g) => {
    'use strict';
    var f = {}.hasOwnProperty;
    g.exports = f;
  }),
  Rt = I((A, g) => {
    'use strict';
    var f = Ie();
    function h(r) {
      for (var u = {}, c = -1; ++c < r.length; ) F(u, r[c]);
      return u;
    }
    function F(r, u) {
      var c, n, l, e;
      for (c in u) {
        (n = f.call(r, c) ? r[c] : (r[c] = {})), (l = u[c]);
        for (e in l) n[e] = l[e];
      }
    }
    g.exports = h;
  }),
  Ht = I((A, g) => {
    'use strict';
    var f = [].splice;
    g.exports = f;
  }),
  le = I((A, g) => {
    'use strict';
    var f = Ht();
    function h(F, r, u, c) {
      var n = F.length,
        l = 0,
        e;
      if (
        (r < 0 ? (r = -r > n ? 0 : n + r) : (r = r > n ? n : r),
        (u = u > 0 ? u : 0),
        c.length < 1e4)
      )
        (e = Array.from(c)), e.unshift(r, u), f.apply(F, e);
      else
        for (u && f.apply(F, [r, u]); l < c.length; )
          (e = c.slice(l, l + 1e4)), e.unshift(r, 0), f.apply(F, e), (l += 1e4), (r += 1e4);
    }
    g.exports = h;
  }),
  Ee = I((A, g) => {
    'use strict';
    var f = le();
    function h(F, r) {
      return F.length ? (f(F, F.length, 0, r), F) : r;
    }
    g.exports = h;
  }),
  Se = I((A, g) => {
    'use strict';
    function f(h) {
      return h == null ? [] : 'length' in h ? h : [h];
    }
    g.exports = f;
  }),
  ze = I((A, g) => {
    'use strict';
    function f(h) {
      return h
        .replace(/[\t\n\r ]+/g, ' ')
        .replace(/^ | $/g, '')
        .toLowerCase()
        .toUpperCase();
    }
    g.exports = f;
  }),
  ke = I((A, g) => {
    'use strict';
    var f = String.fromCharCode;
    g.exports = f;
  }),
  fe = I((A, g) => {
    'use strict';
    var f = ke();
    function h(F) {
      return r;
      function r(u) {
        return F.test(f(u));
      }
    }
    g.exports = h;
  }),
  Fe = I((A, g) => {
    'use strict';
    var f = fe(),
      h = f(/[\dA-Za-z]/);
    g.exports = h;
  }),
  qt = I((A, g) => {
    'use strict';
    var f = Fe(),
      h = ke();
    function F(r) {
      for (var u = -1, c = [], n = 0, l = 0, e, t, i; ++u < r.length; )
        (e = r.charCodeAt(u)),
          e === 37 && f(r.charCodeAt(u + 1)) && f(r.charCodeAt(u + 2))
            ? (l = 2)
            : e < 128
            ? /[!#$&-;=?-Z_a-z~]/.test(h(e)) || (i = h(e))
            : e > 55295 && e < 57344
            ? ((t = r.charCodeAt(u + 1)),
              e < 56320 && t > 56319 && t < 57344 ? ((i = h(e, t)), (l = 1)) : (i = '\uFFFD'))
            : (i = h(e)),
          i && (c.push(r.slice(n, u), encodeURIComponent(i)), (n = u + l + 1), (i = void 0)),
          l && ((u += l), (l = 0));
      return c.join('') + r.slice(n);
    }
    g.exports = F;
  }),
  jt = I((A, g) => {
    'use strict';
    var f = ke();
    function h(F, r) {
      var u = parseInt(F, r);
      return u < 9 ||
        u === 11 ||
        (u > 13 && u < 32) ||
        (u > 126 && u < 160) ||
        (u > 55295 && u < 57344) ||
        (u > 64975 && u < 65008) ||
        (u & 65535) === 65535 ||
        (u & 65535) === 65534 ||
        u > 1114111
        ? '\uFFFD'
        : f(u);
    }
    g.exports = h;
  }),
  Qt = I((A, g) => {
    'use strict';
    var f = He(),
      h = ge(),
      F = Ie(),
      r = Rt(),
      u = Ee(),
      c = Se(),
      n = ze(),
      l = qt(),
      e = jt();
    function t(p) {
      return p && typeof p == 'object' && 'default' in p ? p : { default: p };
    }
    var i = t(f),
      x = { '"': 'quot', '&': 'amp', '<': 'lt', '>': 'gt' },
      k = /^(https?|ircs?|mailto|xmpp)$/i,
      v = /^https?$/i;
    function a(p) {
      var m = p || {},
        E = !0,
        y = {},
        S = [[]],
        o = [],
        b = [],
        _ = {
          enter: {
            blockQuote: se,
            codeFenced: pe,
            codeFencedFenceInfo: Z,
            codeFencedFenceMeta: Z,
            codeIndented: Ce,
            codeText: St,
            content: ft,
            definition: ut,
            definitionDestinationString: ct,
            definitionLabelString: Z,
            definitionTitleString: Z,
            emphasis: yt,
            htmlFlow: Ft,
            htmlText: Be,
            image: Ke,
            label: Z,
            link: Ye,
            listItemMarker: Y,
            listItemValue: G,
            listOrdered: N,
            listUnordered: K,
            paragraph: ue,
            reference: Z,
            resource: tt,
            resourceDestinationString: nt,
            resourceTitleString: Z,
            setextHeading: pt,
            strong: Et,
          },
          exit: {
            atxHeading: ht,
            atxHeadingSequence: dt,
            autolinkEmail: Tt,
            autolinkProtocol: Dt,
            blockQuote: ve,
            characterEscapeValue: me,
            characterReferenceMarkerHexadecimal: Oe,
            characterReferenceMarkerNumeric: Oe,
            characterReferenceValue: zt,
            codeFenced: ye,
            codeFencedFence: J,
            codeFencedFenceInfo: d,
            codeFencedFenceMeta: H,
            codeFlowValue: kt,
            codeIndented: ye,
            codeText: bt,
            codeTextData: me,
            data: me,
            definition: lt,
            definitionDestinationString: at,
            definitionLabelString: ot,
            definitionTitleString: st,
            emphasis: At,
            hardBreakEscape: Me,
            hardBreakTrailing: Me,
            htmlFlow: Le,
            htmlFlowData: me,
            htmlText: Le,
            htmlTextData: me,
            image: _e,
            label: Xe,
            labelText: Je,
            lineEnding: gt,
            link: _e,
            listOrdered: oe,
            listUnordered: te,
            paragraph: ce,
            reference: H,
            referenceString: et,
            resource: H,
            resourceDestinationString: rt,
            resourceTitleString: it,
            setextHeading: mt,
            setextHeadingLineSequence: vt,
            setextHeadingText: xt,
            strong: Ct,
            thematicBreak: It,
          },
        },
        P = r([_].concat(c(m.htmlExtensions))),
        q = { tightStack: b },
        C = {
          lineEndingIfNeeded: U,
          options: m,
          encode: O,
          raw: W,
          tag: L,
          buffer: Z,
          resume: H,
          setData: w,
          getData: B,
        },
        T = m.defaultLineEnding;
      return D;
      function D(z) {
        var R = [],
          $ = [],
          Q,
          re,
          ie,
          ne,
          xe;
        for (Q = -1, re = 0, ie = []; ++Q < z.length; )
          !T &&
            (z[Q][1].type === 'lineEnding' || z[Q][1].type === 'lineEndingBlank') &&
            (T = z[Q][2].sliceSerialize(z[Q][1])),
            (z[Q][1].type === 'listOrdered' || z[Q][1].type === 'listUnordered') &&
              (z[Q][0] === 'enter' ? ie.push(Q) : M(z.slice(ie.pop(), Q))),
            z[Q][1].type === 'definition' &&
              (z[Q][0] === 'enter'
                ? (($ = u($, z.slice(re, Q))), (re = Q))
                : ((R = u(R, z.slice(re, Q + 1))), (re = Q + 1)));
        for (
          R = u(R, $), R = u(R, z.slice(re)), xe = R, Q = -1, P.enter.null && P.enter.null.call(C);
          ++Q < z.length;

        )
          (ne = P[xe[Q][0]]),
            F.call(ne, xe[Q][1].type) &&
              ne[xe[Q][1].type].call(h({ sliceSerialize: xe[Q][2].sliceSerialize }, C), xe[Q][1]);
        return P.exit.null && P.exit.null.call(C), S[0].join('');
      }
      function M(z) {
        for (var R = z.length - 1, $ = 0, Q = 0, re, ie, ne; ++$ < R; )
          (ne = z[$]),
            ne[1]._container
              ? ((ie = void 0), ne[0] === 'enter' ? Q++ : Q--)
              : ne[1].type === 'listItemPrefix'
              ? ne[0] === 'exit' && (ie = !0)
              : ne[1].type === 'linePrefix' ||
                (ne[1].type === 'lineEndingBlank'
                  ? ne[0] === 'enter' && !Q && (ie ? (ie = void 0) : (re = !0))
                  : (ie = void 0));
        z[0][1]._loose = re;
      }
      function w(z, R) {
        q[z] = R;
      }
      function B(z) {
        return q[z];
      }
      function Z() {
        S.push([]);
      }
      function H() {
        return S.pop().join('');
      }
      function L(z) {
        E && (w('lastWasTag', !0), S[S.length - 1].push(z));
      }
      function W(z) {
        w('lastWasTag'), S[S.length - 1].push(z);
      }
      function V() {
        W(
          T ||
            `
`
        );
      }
      function U() {
        var z = S[S.length - 1],
          R = z[z.length - 1],
          $ = R ? R.charCodeAt(R.length - 1) : null;
        $ === 10 || $ === 13 || $ === null || V();
      }
      function O(z) {
        return B('ignoreEncode') ? z : z.replace(/["&<>]/g, R);
        function R($) {
          return '&' + x[$] + ';';
        }
      }
      function j(z, R) {
        var $ = O(l(z || '')),
          Q = $.indexOf(':'),
          re = $.indexOf('?'),
          ie = $.indexOf('#'),
          ne = $.indexOf('/');
        return m.allowDangerousProtocol ||
          Q < 0 ||
          (ne > -1 && Q > ne) ||
          (re > -1 && Q > re) ||
          (ie > -1 && Q > ie) ||
          R.test($.slice(0, Q))
          ? $
          : '';
      }
      function N(z) {
        b.push(!z._loose), U(), L('<ol'), w('expectFirstItem', !0);
      }
      function K(z) {
        b.push(!z._loose), U(), L('<ul'), w('expectFirstItem', !0);
      }
      function G(z) {
        var R;
        B('expectFirstItem') &&
          ((R = parseInt(this.sliceSerialize(z), 10)),
          R !== 1 && L(' start="' + O(String(R)) + '"'));
      }
      function Y() {
        B('expectFirstItem') ? L('>') : s(), U(), L('<li>'), w('expectFirstItem'), w('lastWasTag');
      }
      function oe() {
        s(), b.pop(), V(), L('</ol>');
      }
      function te() {
        s(), b.pop(), V(), L('</ul>');
      }
      function s() {
        B('lastWasTag') && !B('slurpAllLineEndings') && U(), L('</li>'), w('slurpAllLineEndings');
      }
      function se() {
        b.push(!1), U(), L('<blockquote>');
      }
      function ve() {
        b.pop(), U(), L('</blockquote>'), w('slurpAllLineEndings');
      }
      function ue() {
        b[b.length - 1] || (U(), L('<p>')), w('slurpAllLineEndings');
      }
      function ce() {
        b[b.length - 1] ? w('slurpAllLineEndings', !0) : L('</p>');
      }
      function pe() {
        U(), L('<pre><code'), w('fencesCount', 0);
      }
      function d() {
        var z = H();
        L(' class="language-' + z + '"');
      }
      function J() {
        B('fencesCount') || (L('>'), w('fencedCodeInside', !0), w('slurpOneLineEnding', !0)),
          w('fencesCount', B('fencesCount') + 1);
      }
      function Ce() {
        U(), L('<pre><code>');
      }
      function ye() {
        B('flowCodeSeenData') && U(),
          L('</code></pre>'),
          B('fencesCount') < 2 && U(),
          w('flowCodeSeenData'),
          w('fencesCount'),
          w('slurpOneLineEnding');
      }
      function Ke() {
        o.push({ image: !0 }), (E = void 0);
      }
      function Ye() {
        o.push({});
      }
      function Je(z) {
        o[o.length - 1].labelId = this.sliceSerialize(z);
      }
      function Xe() {
        o[o.length - 1].label = H();
      }
      function et(z) {
        o[o.length - 1].referenceId = this.sliceSerialize(z);
      }
      function tt() {
        Z(), (o[o.length - 1].destination = '');
      }
      function nt() {
        Z(), w('ignoreEncode', !0);
      }
      function rt() {
        (o[o.length - 1].destination = H()), w('ignoreEncode');
      }
      function it() {
        o[o.length - 1].title = H();
      }
      function _e() {
        var z = o.length - 1,
          R = o[z],
          $ = R.destination === void 0 ? y[n(R.referenceId || R.labelId)] : R;
        for (E = !0; z--; )
          if (o[z].image) {
            E = void 0;
            break;
          }
        R.image
          ? (L('<img src="' + j($.destination, v) + '" alt="'), W(R.label), L('"'))
          : L('<a href="' + j($.destination, k) + '"'),
          L($.title ? ' title="' + $.title + '"' : ''),
          R.image ? L(' />') : (L('>'), W(R.label), L('</a>')),
          o.pop();
      }
      function ut() {
        Z(), o.push({});
      }
      function ot(z) {
        H(), (o[o.length - 1].labelId = this.sliceSerialize(z));
      }
      function ct() {
        Z(), w('ignoreEncode', !0);
      }
      function at() {
        (o[o.length - 1].destination = H()), w('ignoreEncode');
      }
      function st() {
        o[o.length - 1].title = H();
      }
      function lt() {
        var z = n(o[o.length - 1].labelId);
        H(), F.call(y, z) || (y[z] = o[o.length - 1]), o.pop();
      }
      function ft() {
        w('slurpAllLineEndings', !0);
      }
      function dt(z) {
        B('headingRank') ||
          (w('headingRank', this.sliceSerialize(z).length), U(), L('<h' + B('headingRank') + '>'));
      }
      function pt() {
        Z(), w('slurpAllLineEndings');
      }
      function xt() {
        w('slurpAllLineEndings', !0);
      }
      function ht() {
        L('</h' + B('headingRank') + '>'), w('headingRank');
      }
      function vt(z) {
        w('headingRank', this.sliceSerialize(z).charCodeAt(0) === 61 ? 1 : 2);
      }
      function mt() {
        var z = H();
        U(),
          L('<h' + B('headingRank') + '>'),
          W(z),
          L('</h' + B('headingRank') + '>'),
          w('slurpAllLineEndings'),
          w('headingRank');
      }
      function me(z) {
        W(O(this.sliceSerialize(z)));
      }
      function gt(z) {
        if (!B('slurpAllLineEndings')) {
          if (B('slurpOneLineEnding')) {
            w('slurpOneLineEnding');
            return;
          }
          if (B('inCodeText')) {
            W(' ');
            return;
          }
          W(O(this.sliceSerialize(z)));
        }
      }
      function kt(z) {
        W(O(this.sliceSerialize(z))), w('flowCodeSeenData', !0);
      }
      function Me() {
        L('<br />');
      }
      function Ft() {
        U(), Be();
      }
      function Le() {
        w('ignoreEncode');
      }
      function Be() {
        m.allowDangerousHtml && w('ignoreEncode', !0);
      }
      function yt() {
        L('<em>');
      }
      function Et() {
        L('<strong>');
      }
      function St() {
        w('inCodeText', !0), L('<code>');
      }
      function bt() {
        w('inCodeText'), L('</code>');
      }
      function At() {
        L('</em>');
      }
      function Ct() {
        L('</strong>');
      }
      function It() {
        U(), L('<hr />');
      }
      function Oe(z) {
        w('characterReferenceType', z.type);
      }
      function zt(z) {
        var R = this.sliceSerialize(z);
        (R = B('characterReferenceType')
          ? e(R, B('characterReferenceType') === 'characterReferenceMarkerNumeric' ? 10 : 16)
          : i.default(R)),
          W(O(R)),
          w('characterReferenceType');
      }
      function Dt(z) {
        var R = this.sliceSerialize(z);
        L('<a href="' + j(R, k) + '">'), W(O(R)), L('</a>');
      }
      function Tt(z) {
        var R = this.sliceSerialize(z);
        L('<a href="' + j('mailto:' + R, k) + '">'), W(O(R)), L('</a>');
      }
    }
    g.exports = a;
  }),
  X = I((A, g) => {
    'use strict';
    function f(h) {
      return h < -2;
    }
    g.exports = f;
  }),
  ae = I((A, g) => {
    'use strict';
    function f(h) {
      return h === -2 || h === -1 || h === 32;
    }
    g.exports = f;
  }),
  ee = I((A, g) => {
    'use strict';
    var f = ae();
    function h(F, r, u, c) {
      var n = c ? c - 1 : 1 / 0,
        l = 0;
      return e;
      function e(i) {
        return f(i) ? (F.enter(u), t(i)) : r(i);
      }
      function t(i) {
        return f(i) && l++ < n ? (F.consume(i), t) : (F.exit(u), r(i));
      }
    }
    g.exports = h;
  }),
  Vt = I((A) => {
    'use strict';
    Object.defineProperty(A, '__esModule', { value: !0 });
    var g = X(),
      f = ee(),
      h = F;
    function F(r) {
      var u = r.attempt(this.parser.constructs.contentInitial, n, l),
        c;
      return u;
      function n(i) {
        if (i === null) {
          r.consume(i);
          return;
        }
        return r.enter('lineEnding'), r.consume(i), r.exit('lineEnding'), f(r, u, 'linePrefix');
      }
      function l(i) {
        return r.enter('paragraph'), e(i);
      }
      function e(i) {
        var x = r.enter('chunkText', { contentType: 'text', previous: c });
        return c && (c.next = x), (c = x), t(i);
      }
      function t(i) {
        if (i === null) {
          r.exit('chunkText'), r.exit('paragraph'), r.consume(i);
          return;
        }
        return g(i) ? (r.consume(i), r.exit('chunkText'), e) : (r.consume(i), t);
      }
    }
    A.tokenize = h;
  }),
  be = I((A, g) => {
    'use strict';
    var f = X(),
      h = ee(),
      F = { tokenize: r, partial: !0 };
    function r(u, c, n) {
      return h(u, l, 'linePrefix');
      function l(e) {
        return e === null || f(e) ? c(e) : n(e);
      }
    }
    g.exports = F;
  }),
  Wt = I((A) => {
    'use strict';
    Object.defineProperty(A, '__esModule', { value: !0 });
    var g = X(),
      f = ee(),
      h = be(),
      F = c,
      r = { tokenize: n },
      u = { tokenize: l };
    function c(e) {
      var t = this,
        i = [],
        x = 0,
        k = { tokenize: C, partial: !0 },
        v,
        a,
        p;
      return m;
      function m(T) {
        return x < i.length
          ? ((t.containerState = i[x][1]), e.attempt(i[x][0].continuation, E, y)(T))
          : y(T);
      }
      function E(T) {
        return x++, m(T);
      }
      function y(T) {
        return v && v.flowContinue
          ? o(T)
          : ((t.interrupt = a && a.currentConstruct && a.currentConstruct.interruptible),
            (t.containerState = {}),
            e.attempt(r, S, o)(T));
      }
      function S(T) {
        return i.push([t.currentConstruct, t.containerState]), (t.containerState = void 0), y(T);
      }
      function o(T) {
        if (T === null) {
          q(0, !0), e.consume(T);
          return;
        }
        return (
          (a = a || t.parser.flow(t.now())),
          e.enter('chunkFlow', { contentType: 'flow', previous: p, _tokenizer: a }),
          b(T)
        );
      }
      function b(T) {
        return T === null
          ? (P(e.exit('chunkFlow')), o(T))
          : g(T)
          ? (e.consume(T), P(e.exit('chunkFlow')), e.check(k, _))
          : (e.consume(T), b);
      }
      function _(T) {
        return q(v.continued, v && v.flowEnd), (x = 0), m(T);
      }
      function P(T) {
        p && (p.next = T),
          (p = T),
          (a.lazy = v && v.lazy),
          a.defineSkip(T.start),
          a.write(t.sliceStream(T));
      }
      function q(T, D) {
        var M = i.length;
        for (a && D && (a.write([null]), (p = a = void 0)); M-- > T; )
          (t.containerState = i[M][1]), i[M][0].exit.call(t, e);
        i.length = T;
      }
      function C(T, D) {
        var M = 0;
        return (v = {}), w;
        function w(V) {
          return M < i.length
            ? ((t.containerState = i[M][1]), T.attempt(i[M][0].continuation, B, Z)(V))
            : a.currentConstruct && a.currentConstruct.concrete
            ? ((v.flowContinue = !0), W(V))
            : ((t.interrupt = a.currentConstruct && a.currentConstruct.interruptible),
              (t.containerState = {}),
              T.attempt(r, L, W)(V));
        }
        function B(V) {
          return M++, t.containerState._closeFlow ? L(V) : w(V);
        }
        function Z(V) {
          return a.currentConstruct && a.currentConstruct.lazy
            ? ((t.containerState = {}), T.attempt(r, L, T.attempt(u, L, T.check(h, L, H)))(V))
            : L(V);
        }
        function H(V) {
          return (M = i.length), (v.lazy = !0), (v.flowContinue = !0), W(V);
        }
        function L(V) {
          return (v.flowEnd = !0), W(V);
        }
        function W(V) {
          return (v.continued = M), (t.interrupt = t.containerState = void 0), D(V);
        }
      }
    }
    function n(e, t, i) {
      return f(
        e,
        e.attempt(this.parser.constructs.document, t, i),
        'linePrefix',
        this.parser.constructs.disable.null.indexOf('codeIndented') > -1 ? void 0 : 4
      );
    }
    function l(e, t, i) {
      return f(
        e,
        e.lazy(this.parser.constructs.flow, t, i),
        'linePrefix',
        this.parser.constructs.disable.null.indexOf('codeIndented') > -1 ? void 0 : 4
      );
    }
    A.tokenize = F;
  }),
  qe = I((A, g) => {
    'use strict';
    function f(h) {
      for (var F = -1, r = 0; ++F < h.length; ) r += typeof h[F] == 'string' ? h[F].length : 1;
      return r;
    }
    g.exports = f;
  }),
  Ae = I((A, g) => {
    'use strict';
    var f = qe();
    function h(F, r) {
      var u = F[F.length - 1];
      return !u || u[1].type !== r ? 0 : f(u[2].sliceStream(u[1]));
    }
    g.exports = h;
  }),
  he = I((A, g) => {
    'use strict';
    var f = ge();
    function h(F) {
      return f({}, F);
    }
    g.exports = h;
  }),
  je = I((A, g) => {
    'use strict';
    var f = ge(),
      h = le(),
      F = he();
    function r(c) {
      for (var n = {}, l = -1, e, t, i, x, k, v, a; ++l < c.length; ) {
        for (; l in n; ) l = n[l];
        if (
          ((e = c[l]),
          l &&
            e[1].type === 'chunkFlow' &&
            c[l - 1][1].type === 'listItemPrefix' &&
            ((v = e[1]._tokenizer.events),
            (i = 0),
            i < v.length && v[i][1].type === 'lineEndingBlank' && (i += 2),
            i < v.length && v[i][1].type === 'content'))
        )
          for (; ++i < v.length && v[i][1].type !== 'content'; )
            v[i][1].type === 'chunkText' && ((v[i][1].isInFirstContentOfListItem = !0), i++);
        if (e[0] === 'enter') e[1].contentType && (f(n, u(c, l)), (l = n[l]), (a = !0));
        else if (e[1]._container || e[1]._movePreviousLineEndings) {
          for (
            i = l, t = void 0;
            i-- && ((x = c[i]), x[1].type === 'lineEnding' || x[1].type === 'lineEndingBlank');

          )
            x[0] === 'enter' &&
              (t && (c[t][1].type = 'lineEndingBlank'), (x[1].type = 'lineEnding'), (t = i));
          t &&
            ((e[1].end = F(c[t][1].start)),
            (k = c.slice(t, l)),
            k.unshift(e),
            h(c, t, l - t + 1, k));
        }
      }
      return !a;
    }
    function u(c, n) {
      for (
        var l = c[n][1],
          e = c[n][2],
          t = n - 1,
          i = [],
          x = l._tokenizer || e.parser[l.contentType](l.start),
          k = x.events,
          v = [],
          a = {},
          p,
          m,
          E,
          y,
          S,
          o;
        l;

      ) {
        for (; c[++t][1] !== l; );
        i.push(t),
          l._tokenizer ||
            ((p = e.sliceStream(l)),
            l.next || p.push(null),
            m && x.defineSkip(l.start),
            l.isInFirstContentOfListItem && (x._gfmTasklistFirstContentOfListItem = !0),
            x.write(p),
            l.isInFirstContentOfListItem && (x._gfmTasklistFirstContentOfListItem = void 0)),
          (m = l),
          (l = l.next);
      }
      for (l = m, E = k.length; E--; )
        k[E][0] === 'enter'
          ? (y = !0)
          : y &&
            k[E][1].type === k[E - 1][1].type &&
            k[E][1].start.line !== k[E][1].end.line &&
            (b(k.slice(E + 1, S)), (l._tokenizer = l.next = void 0), (l = l.previous), (S = E + 1));
      for (
        x.events = l._tokenizer = l.next = void 0, b(k.slice(0, S)), E = -1, o = 0;
        ++E < v.length;

      )
        (a[o + v[E][0]] = o + v[E][1]), (o += v[E][1] - v[E][0] - 1);
      return a;
      function b(_) {
        var P = i.pop();
        v.unshift([P, P + _.length - 1]), h(c, P, 2, _);
      }
    }
    g.exports = r;
  }),
  Ut = I((A, g) => {
    'use strict';
    var f = X(),
      h = Ae(),
      F = je(),
      r = ee(),
      u = { tokenize: l, resolve: n, interruptible: !0, lazy: !0 },
      c = { tokenize: e, partial: !0 };
    function n(t) {
      return F(t), t;
    }
    function l(t, i) {
      var x;
      return k;
      function k(m) {
        return t.enter('content'), (x = t.enter('chunkContent', { contentType: 'content' })), v(m);
      }
      function v(m) {
        return m === null ? a(m) : f(m) ? t.check(c, p, a)(m) : (t.consume(m), v);
      }
      function a(m) {
        return t.exit('chunkContent'), t.exit('content'), i(m);
      }
      function p(m) {
        return (
          t.consume(m),
          t.exit('chunkContent'),
          (x = x.next = t.enter('chunkContent', { contentType: 'content', previous: x })),
          v
        );
      }
    }
    function e(t, i, x) {
      var k = this;
      return v;
      function v(p) {
        return t.enter('lineEnding'), t.consume(p), t.exit('lineEnding'), r(t, a, 'linePrefix');
      }
      function a(p) {
        return p === null || f(p)
          ? x(p)
          : k.parser.constructs.disable.null.indexOf('codeIndented') > -1 ||
            h(k.events, 'linePrefix') < 4
          ? t.interrupt(k.parser.constructs.flow, x, i)(p)
          : i(p);
      }
    }
    g.exports = u;
  }),
  Zt = I((A) => {
    'use strict';
    Object.defineProperty(A, '__esModule', { value: !0 });
    var g = Ut(),
      f = ee(),
      h = be(),
      F = r;
    function r(u) {
      var c = this,
        n = u.attempt(
          h,
          l,
          u.attempt(
            this.parser.constructs.flowInitial,
            e,
            f(u, u.attempt(this.parser.constructs.flow, e, u.attempt(g, e)), 'linePrefix')
          )
        );
      return n;
      function l(t) {
        if (t === null) {
          u.consume(t);
          return;
        }
        return (
          u.enter('lineEndingBlank'),
          u.consume(t),
          u.exit('lineEndingBlank'),
          (c.currentConstruct = void 0),
          n
        );
      }
      function e(t) {
        if (t === null) {
          u.consume(t);
          return;
        }
        return (
          u.enter('lineEnding'),
          u.consume(t),
          u.exit('lineEnding'),
          (c.currentConstruct = void 0),
          n
        );
      }
    }
    A.tokenize = F;
  }),
  Qe = I((A) => {
    'use strict';
    Object.defineProperty(A, '__esModule', { value: !0 });
    var g = ge(),
      f = he(),
      h = u('text'),
      F = u('string'),
      r = { resolveAll: c() };
    function u(l) {
      return { tokenize: e, resolveAll: c(l === 'text' ? n : void 0) };
      function e(t) {
        var i = this,
          x = this.parser.constructs[l],
          k = t.attempt(x, v, a);
        return v;
        function v(E) {
          return m(E) ? k(E) : a(E);
        }
        function a(E) {
          if (E === null) {
            t.consume(E);
            return;
          }
          return t.enter('data'), t.consume(E), p;
        }
        function p(E) {
          return m(E) ? (t.exit('data'), k(E)) : (t.consume(E), p);
        }
        function m(E) {
          var y = x[E],
            S = -1;
          if (E === null) return !0;
          if (y) {
            for (; ++S < y.length; )
              if (!y[S].previous || y[S].previous.call(i, i.previous)) return !0;
          }
        }
      }
    }
    function c(l) {
      return e;
      function e(t, i) {
        for (var x = -1, k; ++x <= t.length; )
          k === void 0
            ? t[x] && t[x][1].type === 'data' && ((k = x), x++)
            : (!t[x] || t[x][1].type !== 'data') &&
              (x !== k + 2 &&
                ((t[k][1].end = t[x - 1][1].end), t.splice(k + 2, x - k - 2), (x = k + 2)),
              (k = void 0));
        return l ? l(t, i) : t;
      }
    }
    function n(l, e) {
      for (var t = -1, i, x, k, v, a, p, m, E; ++t <= l.length; )
        if ((t === l.length || l[t][1].type === 'lineEnding') && l[t - 1][1].type === 'data') {
          for (
            x = l[t - 1][1], i = e.sliceStream(x), v = i.length, a = -1, p = 0, m = void 0;
            v--;

          )
            if (((k = i[v]), typeof k == 'string')) {
              for (a = k.length; k.charCodeAt(a - 1) === 32; ) p++, a--;
              if (a) break;
              a = -1;
            } else if (k === -2) (m = !0), p++;
            else if (k !== -1) {
              v++;
              break;
            }
          p &&
            ((E = {
              type: t === l.length || m || p < 2 ? 'lineSuffix' : 'hardBreakTrailing',
              start: {
                line: x.end.line,
                column: x.end.column - p,
                offset: x.end.offset - p,
                _index: x.start._index + v,
                _bufferIndex: v ? a : x.start._bufferIndex + a,
              },
              end: f(x.end),
            }),
            (x.end = f(E.start)),
            x.start.offset === x.end.offset
              ? g(x, E)
              : (l.splice(t, 0, ['enter', E, e], ['exit', E, e]), (t += 2))),
            t++;
        }
      return l;
    }
    (A.resolver = r), (A.string = F), (A.text = h);
  }),
  $t = I((A, g) => {
    'use strict';
    var f = Ie(),
      h = le(),
      F = Se();
    function r(n) {
      for (var l = {}, e = -1; ++e < n.length; ) u(l, n[e]);
      return l;
    }
    function u(n, l) {
      var e, t, i, x;
      for (e in l) {
        (t = f.call(n, e) ? n[e] : (n[e] = {})), (i = l[e]);
        for (x in i) t[x] = c(F(i[x]), f.call(t, x) ? t[x] : []);
      }
    }
    function c(n, l) {
      for (var e = -1, t = []; ++e < n.length; ) (n[e].add === 'after' ? l : t).push(n[e]);
      return h(l, 0, 0, t), l;
    }
    g.exports = r;
  }),
  De = I((A, g) => {
    'use strict';
    function f(h, F, r) {
      for (var u = [], c = -1, n; ++c < h.length; )
        (n = h[c].resolveAll), n && u.indexOf(n) < 0 && ((F = n(F, r)), u.push(n));
      return F;
    }
    g.exports = f;
  }),
  Gt = I((A, g) => {
    'use strict';
    var f = ke();
    function h(F) {
      for (var r = -1, u = [], c, n, l; ++r < F.length; ) {
        if (((c = F[r]), typeof c == 'string')) n = c;
        else if (c === -5) n = '\r';
        else if (c === -4)
          n = `
`;
        else if (c === -3)
          n = `\r
`;
        else if (c === -2) n = '	';
        else if (c === -1) {
          if (l) continue;
          n = ' ';
        } else n = f(c);
        (l = c === -2), u.push(n);
      }
      return u.join('');
    }
    g.exports = h;
  }),
  Nt = I((A, g) => {
    'use strict';
    function f(h, F) {
      var r = F.start._index,
        u = F.start._bufferIndex,
        c = F.end._index,
        n = F.end._bufferIndex,
        l;
      return (
        r === c
          ? (l = [h[r].slice(u, n)])
          : ((l = h.slice(r, c)),
            u > -1 && (l[0] = l[0].slice(u)),
            n > 0 && l.push(h[c].slice(0, n))),
        l
      );
    }
    g.exports = f;
  }),
  Kt = I((A, g) => {
    'use strict';
    var f = ge(),
      h = X(),
      F = Ee(),
      r = le(),
      u = Se(),
      c = De(),
      n = Gt(),
      l = he(),
      e = Nt();
    function t(i, x, k) {
      var v = k ? l(k) : { line: 1, column: 1, offset: 0 },
        a = {},
        p = [],
        m = [],
        E = [],
        y = {
          consume: M,
          enter: w,
          exit: B,
          attempt: L(Z),
          check: L(H),
          interrupt: L(H, { interrupt: !0 }),
          lazy: L(H, { lazy: !0 }),
        },
        S = {
          previous: null,
          events: [],
          parser: i,
          sliceStream: P,
          sliceSerialize: _,
          now: q,
          defineSkip: C,
          write: b,
        },
        o = x.tokenize.call(S, y);
      return x.resolveAll && p.push(x), (v._index = 0), (v._bufferIndex = -1), S;
      function b(O) {
        return (
          (m = F(m, O)),
          T(),
          m[m.length - 1] !== null ? [] : (W(x, 0), (S.events = c(p, S.events, S)), S.events)
        );
      }
      function _(O) {
        return n(P(O));
      }
      function P(O) {
        return e(m, O);
      }
      function q() {
        return l(v);
      }
      function C(O) {
        (a[O.line] = O.column), U();
      }
      function T() {
        for (var O, j; v._index < m.length; )
          if (((j = m[v._index]), typeof j == 'string'))
            for (
              O = v._index, v._bufferIndex < 0 && (v._bufferIndex = 0);
              v._index === O && v._bufferIndex < j.length;

            )
              D(j.charCodeAt(v._bufferIndex));
          else D(j);
      }
      function D(O) {
        o = o(O);
      }
      function M(O) {
        h(O)
          ? (v.line++, (v.column = 1), (v.offset += O === -3 ? 2 : 1), U())
          : O !== -1 && (v.column++, v.offset++),
          v._bufferIndex < 0
            ? v._index++
            : (v._bufferIndex++,
              v._bufferIndex === m[v._index].length && ((v._bufferIndex = -1), v._index++)),
          (S.previous = O);
      }
      function w(O, j) {
        var N = j || {};
        return (N.type = O), (N.start = q()), S.events.push(['enter', N, S]), E.push(N), N;
      }
      function B(O) {
        var j = E.pop();
        return (j.end = q()), S.events.push(['exit', j, S]), j;
      }
      function Z(O, j) {
        W(O, j.from);
      }
      function H(O, j) {
        j.restore();
      }
      function L(O, j) {
        return N;
        function N(K, G, Y) {
          var oe, te, s, se;
          return K.tokenize || 'length' in K ? ue(u(K)) : ve;
          function ve(J) {
            return J in K || null in K ? ue(K.null ? u(K[J]).concat(u(K.null)) : K[J])(J) : Y(J);
          }
          function ue(J) {
            return (oe = J), (te = 0), ce(J[te]);
          }
          function ce(J) {
            return Ce;
            function Ce(ye) {
              return (
                (se = V()),
                (s = J),
                J.partial || (S.currentConstruct = J),
                J.name && S.parser.constructs.disable.null.indexOf(J.name) > -1
                  ? d()
                  : J.tokenize.call(j ? f({}, S, j) : S, y, pe, d)(ye)
              );
            }
          }
          function pe(J) {
            return O(s, se), G;
          }
          function d(J) {
            return se.restore(), ++te < oe.length ? ce(oe[te]) : Y;
          }
        }
      }
      function W(O, j) {
        O.resolveAll && p.indexOf(O) < 0 && p.push(O),
          O.resolve && r(S.events, j, S.events.length - j, O.resolve(S.events.slice(j), S)),
          O.resolveTo && (S.events = O.resolveTo(S.events, S));
      }
      function V() {
        var O = q(),
          j = S.previous,
          N = S.currentConstruct,
          K = S.events.length,
          G = Array.from(E);
        return { restore: Y, from: K };
        function Y() {
          (v = O), (S.previous = j), (S.currentConstruct = N), (S.events.length = K), (E = G), U();
        }
      }
      function U() {
        v.line in a && v.column < 2 && ((v.column = a[v.line]), (v.offset += a[v.line] - 1));
      }
    }
    g.exports = t;
  }),
  de = I((A, g) => {
    'use strict';
    function f(h) {
      return h < 0 || h === 32;
    }
    g.exports = f;
  }),
  Yt = I((A, g) => {
    'use strict';
    var f =
      /[!-\/:-@\[-`\{-~\xA1\xA7\xAB\xB6\xB7\xBB\xBF\u037E\u0387\u055A-\u055F\u0589\u058A\u05BE\u05C0\u05C3\u05C6\u05F3\u05F4\u0609\u060A\u060C\u060D\u061B\u061E\u061F\u066A-\u066D\u06D4\u0700-\u070D\u07F7-\u07F9\u0830-\u083E\u085E\u0964\u0965\u0970\u09FD\u0A76\u0AF0\u0C77\u0C84\u0DF4\u0E4F\u0E5A\u0E5B\u0F04-\u0F12\u0F14\u0F3A-\u0F3D\u0F85\u0FD0-\u0FD4\u0FD9\u0FDA\u104A-\u104F\u10FB\u1360-\u1368\u1400\u166E\u169B\u169C\u16EB-\u16ED\u1735\u1736\u17D4-\u17D6\u17D8-\u17DA\u1800-\u180A\u1944\u1945\u1A1E\u1A1F\u1AA0-\u1AA6\u1AA8-\u1AAD\u1B5A-\u1B60\u1BFC-\u1BFF\u1C3B-\u1C3F\u1C7E\u1C7F\u1CC0-\u1CC7\u1CD3\u2010-\u2027\u2030-\u2043\u2045-\u2051\u2053-\u205E\u207D\u207E\u208D\u208E\u2308-\u230B\u2329\u232A\u2768-\u2775\u27C5\u27C6\u27E6-\u27EF\u2983-\u2998\u29D8-\u29DB\u29FC\u29FD\u2CF9-\u2CFC\u2CFE\u2CFF\u2D70\u2E00-\u2E2E\u2E30-\u2E4F\u2E52\u3001-\u3003\u3008-\u3011\u3014-\u301F\u3030\u303D\u30A0\u30FB\uA4FE\uA4FF\uA60D-\uA60F\uA673\uA67E\uA6F2-\uA6F7\uA874-\uA877\uA8CE\uA8CF\uA8F8-\uA8FA\uA8FC\uA92E\uA92F\uA95F\uA9C1-\uA9CD\uA9DE\uA9DF\uAA5C-\uAA5F\uAADE\uAADF\uAAF0\uAAF1\uABEB\uFD3E\uFD3F\uFE10-\uFE19\uFE30-\uFE52\uFE54-\uFE61\uFE63\uFE68\uFE6A\uFE6B\uFF01-\uFF03\uFF05-\uFF0A\uFF0C-\uFF0F\uFF1A\uFF1B\uFF1F\uFF20\uFF3B-\uFF3D\uFF3F\uFF5B\uFF5D\uFF5F-\uFF65]/;
    g.exports = f;
  }),
  Jt = I((A, g) => {
    'use strict';
    var f = Yt(),
      h = fe(),
      F = h(f);
    g.exports = F;
  }),
  Xt = I((A, g) => {
    'use strict';
    var f = fe(),
      h = f(/\s/);
    g.exports = h;
  }),
  en = I((A, g) => {
    'use strict';
    var f = de(),
      h = Jt(),
      F = Xt();
    function r(u) {
      if (u === null || f(u) || F(u)) return 1;
      if (h(u)) return 2;
    }
    g.exports = r;
  }),
  tn = I((A, g) => {
    'use strict';
    function f(h, F) {
      return (h.column += F), (h.offset += F), (h._bufferIndex += F), h;
    }
    g.exports = f;
  }),
  nn = I((A, g) => {
    'use strict';
    var f = Ee(),
      h = le(),
      F = en(),
      r = tn(),
      u = De(),
      c = he(),
      n = { name: 'attention', tokenize: e, resolveAll: l };
    function l(t, i) {
      for (var x = -1, k, v, a, p, m, E, y, S; ++x < t.length; )
        if (t[x][0] === 'enter' && t[x][1].type === 'attentionSequence' && t[x][1]._close) {
          for (k = x; k--; )
            if (
              t[k][0] === 'exit' &&
              t[k][1].type === 'attentionSequence' &&
              t[k][1]._open &&
              i.sliceSerialize(t[k][1]).charCodeAt(0) === i.sliceSerialize(t[x][1]).charCodeAt(0)
            ) {
              if (
                (t[k][1]._close || t[x][1]._open) &&
                (t[x][1].end.offset - t[x][1].start.offset) % 3 &&
                !(
                  (t[k][1].end.offset -
                    t[k][1].start.offset +
                    t[x][1].end.offset -
                    t[x][1].start.offset) %
                  3
                )
              )
                continue;
              (E =
                t[k][1].end.offset - t[k][1].start.offset > 1 &&
                t[x][1].end.offset - t[x][1].start.offset > 1
                  ? 2
                  : 1),
                (p = {
                  type: E > 1 ? 'strongSequence' : 'emphasisSequence',
                  start: r(c(t[k][1].end), -E),
                  end: c(t[k][1].end),
                }),
                (m = {
                  type: E > 1 ? 'strongSequence' : 'emphasisSequence',
                  start: c(t[x][1].start),
                  end: r(c(t[x][1].start), E),
                }),
                (a = {
                  type: E > 1 ? 'strongText' : 'emphasisText',
                  start: c(t[k][1].end),
                  end: c(t[x][1].start),
                }),
                (v = { type: E > 1 ? 'strong' : 'emphasis', start: c(p.start), end: c(m.end) }),
                (t[k][1].end = c(p.start)),
                (t[x][1].start = c(m.end)),
                (y = []),
                t[k][1].end.offset - t[k][1].start.offset &&
                  (y = f(y, [
                    ['enter', t[k][1], i],
                    ['exit', t[k][1], i],
                  ])),
                (y = f(y, [
                  ['enter', v, i],
                  ['enter', p, i],
                  ['exit', p, i],
                  ['enter', a, i],
                ])),
                (y = f(y, u(i.parser.constructs.insideSpan.null, t.slice(k + 1, x), i))),
                (y = f(y, [
                  ['exit', a, i],
                  ['enter', m, i],
                  ['exit', m, i],
                  ['exit', v, i],
                ])),
                t[x][1].end.offset - t[x][1].start.offset
                  ? ((S = 2),
                    (y = f(y, [
                      ['enter', t[x][1], i],
                      ['exit', t[x][1], i],
                    ])))
                  : (S = 0),
                h(t, k - 1, x - k + 3, y),
                (x = k + y.length - S - 2);
              break;
            }
        }
      for (x = -1; ++x < t.length; )
        t[x][1].type === 'attentionSequence' && (t[x][1].type = 'data');
      return t;
    }
    function e(t, i) {
      var x = F(this.previous),
        k;
      return v;
      function v(p) {
        return t.enter('attentionSequence'), (k = p), a(p);
      }
      function a(p) {
        var m, E, y, S;
        return p === k
          ? (t.consume(p), a)
          : ((m = t.exit('attentionSequence')),
            (E = F(p)),
            (y = !E || (E === 2 && x)),
            (S = !x || (x === 2 && E)),
            (m._open = k === 42 ? y : y && (x || !S)),
            (m._close = k === 42 ? S : S && (E || !y)),
            i(p));
      }
    }
    g.exports = n;
  }),
  Te = I((A, g) => {
    'use strict';
    var f = fe(),
      h = f(/[A-Za-z]/);
    g.exports = h;
  }),
  rn = I((A, g) => {
    'use strict';
    var f = fe(),
      h = f(/[#-'*+\--9=?A-Z^-~]/);
    g.exports = h;
  }),
  Ve = I((A, g) => {
    'use strict';
    function f(h) {
      return h < 32 || h === 127;
    }
    g.exports = f;
  }),
  un = I((A, g) => {
    'use strict';
    var f = Te(),
      h = Fe(),
      F = rn(),
      r = Ve(),
      u = { name: 'autolink', tokenize: c };
    function c(n, l, e) {
      var t = 1;
      return i;
      function i(o) {
        return (
          n.enter('autolink'),
          n.enter('autolinkMarker'),
          n.consume(o),
          n.exit('autolinkMarker'),
          n.enter('autolinkProtocol'),
          x
        );
      }
      function x(o) {
        return f(o) ? (n.consume(o), k) : F(o) ? p(o) : e(o);
      }
      function k(o) {
        return o === 43 || o === 45 || o === 46 || h(o) ? v(o) : p(o);
      }
      function v(o) {
        return o === 58
          ? (n.consume(o), a)
          : (o === 43 || o === 45 || o === 46 || h(o)) && t++ < 32
          ? (n.consume(o), v)
          : p(o);
      }
      function a(o) {
        return o === 62
          ? (n.exit('autolinkProtocol'), S(o))
          : o === 32 || o === 60 || r(o)
          ? e(o)
          : (n.consume(o), a);
      }
      function p(o) {
        return o === 64 ? (n.consume(o), (t = 0), m) : F(o) ? (n.consume(o), p) : e(o);
      }
      function m(o) {
        return h(o) ? E(o) : e(o);
      }
      function E(o) {
        return o === 46
          ? (n.consume(o), (t = 0), m)
          : o === 62
          ? ((n.exit('autolinkProtocol').type = 'autolinkEmail'), S(o))
          : y(o);
      }
      function y(o) {
        return (o === 45 || h(o)) && t++ < 63 ? (n.consume(o), o === 45 ? y : E) : e(o);
      }
      function S(o) {
        return (
          n.enter('autolinkMarker'), n.consume(o), n.exit('autolinkMarker'), n.exit('autolink'), l
        );
      }
    }
    g.exports = u;
  }),
  on = I((A, g) => {
    'use strict';
    var f = ae(),
      h = ee(),
      F = { name: 'blockQuote', tokenize: r, continuation: { tokenize: u }, exit: c };
    function r(n, l, e) {
      var t = this;
      return i;
      function i(k) {
        return k === 62
          ? (t.containerState.open ||
              (n.enter('blockQuote', { _container: !0 }), (t.containerState.open = !0)),
            n.enter('blockQuotePrefix'),
            n.enter('blockQuoteMarker'),
            n.consume(k),
            n.exit('blockQuoteMarker'),
            x)
          : e(k);
      }
      function x(k) {
        return f(k)
          ? (n.enter('blockQuotePrefixWhitespace'),
            n.consume(k),
            n.exit('blockQuotePrefixWhitespace'),
            n.exit('blockQuotePrefix'),
            l)
          : (n.exit('blockQuotePrefix'), l(k));
      }
    }
    function u(n, l, e) {
      return h(
        n,
        n.attempt(F, l, e),
        'linePrefix',
        this.parser.constructs.disable.null.indexOf('codeIndented') > -1 ? void 0 : 4
      );
    }
    function c(n) {
      n.exit('blockQuote');
    }
    g.exports = F;
  }),
  cn = I((A, g) => {
    'use strict';
    var f = fe(),
      h = f(/[!-/:-@[-`{-~]/);
    g.exports = h;
  }),
  an = I((A, g) => {
    'use strict';
    var f = cn(),
      h = { name: 'characterEscape', tokenize: F };
    function F(r, u, c) {
      return n;
      function n(e) {
        return (
          r.enter('characterEscape'),
          r.enter('escapeMarker'),
          r.consume(e),
          r.exit('escapeMarker'),
          l
        );
      }
      function l(e) {
        return f(e)
          ? (r.enter('characterEscapeValue'),
            r.consume(e),
            r.exit('characterEscapeValue'),
            r.exit('characterEscape'),
            u)
          : c(e);
      }
    }
    g.exports = h;
  }),
  We = I((A, g) => {
    'use strict';
    var f = fe(),
      h = f(/\d/);
    g.exports = h;
  }),
  sn = I((A, g) => {
    'use strict';
    var f = fe(),
      h = f(/[\dA-Fa-f]/);
    g.exports = h;
  }),
  ln = I((A, g) => {
    'use strict';
    var f = He(),
      h = Fe(),
      F = We(),
      r = sn();
    function u(e) {
      return e && typeof e == 'object' && 'default' in e ? e : { default: e };
    }
    var c = u(f),
      n = { name: 'characterReference', tokenize: l };
    function l(e, t, i) {
      var x = this,
        k = 0,
        v,
        a;
      return p;
      function p(S) {
        return (
          e.enter('characterReference'),
          e.enter('characterReferenceMarker'),
          e.consume(S),
          e.exit('characterReferenceMarker'),
          m
        );
      }
      function m(S) {
        return S === 35
          ? (e.enter('characterReferenceMarkerNumeric'),
            e.consume(S),
            e.exit('characterReferenceMarkerNumeric'),
            E)
          : (e.enter('characterReferenceValue'), (v = 31), (a = h), y(S));
      }
      function E(S) {
        return S === 88 || S === 120
          ? (e.enter('characterReferenceMarkerHexadecimal'),
            e.consume(S),
            e.exit('characterReferenceMarkerHexadecimal'),
            e.enter('characterReferenceValue'),
            (v = 6),
            (a = r),
            y)
          : (e.enter('characterReferenceValue'), (v = 7), (a = F), y(S));
      }
      function y(S) {
        var o;
        return S === 59 && k
          ? ((o = e.exit('characterReferenceValue')),
            a === h && !c.default(x.sliceSerialize(o))
              ? i(S)
              : (e.enter('characterReferenceMarker'),
                e.consume(S),
                e.exit('characterReferenceMarker'),
                e.exit('characterReference'),
                t))
          : a(S) && k++ < v
          ? (e.consume(S), y)
          : i(S);
      }
    }
    g.exports = n;
  }),
  fn = I((A, g) => {
    'use strict';
    var f = X(),
      h = de(),
      F = Ae(),
      r = ee(),
      u = { name: 'codeFenced', tokenize: c, concrete: !0 };
    function c(n, l, e) {
      var t = this,
        i = { tokenize: q, partial: !0 },
        x = F(this.events, 'linePrefix'),
        k = 0,
        v;
      return a;
      function a(C) {
        return (
          n.enter('codeFenced'),
          n.enter('codeFencedFence'),
          n.enter('codeFencedFenceSequence'),
          (v = C),
          p(C)
        );
      }
      function p(C) {
        return C === v
          ? (n.consume(C), k++, p)
          : (n.exit('codeFencedFenceSequence'), k < 3 ? e(C) : r(n, m, 'whitespace')(C));
      }
      function m(C) {
        return C === null || f(C)
          ? o(C)
          : (n.enter('codeFencedFenceInfo'),
            n.enter('chunkString', { contentType: 'string' }),
            E(C));
      }
      function E(C) {
        return C === null || h(C)
          ? (n.exit('chunkString'), n.exit('codeFencedFenceInfo'), r(n, y, 'whitespace')(C))
          : C === 96 && C === v
          ? e(C)
          : (n.consume(C), E);
      }
      function y(C) {
        return C === null || f(C)
          ? o(C)
          : (n.enter('codeFencedFenceMeta'),
            n.enter('chunkString', { contentType: 'string' }),
            S(C));
      }
      function S(C) {
        return C === null || f(C)
          ? (n.exit('chunkString'), n.exit('codeFencedFenceMeta'), o(C))
          : C === 96 && C === v
          ? e(C)
          : (n.consume(C), S);
      }
      function o(C) {
        return n.exit('codeFencedFence'), t.interrupt ? l(C) : b(C);
      }
      function b(C) {
        return C === null
          ? P(C)
          : f(C)
          ? (n.enter('lineEnding'),
            n.consume(C),
            n.exit('lineEnding'),
            n.attempt(i, P, x ? r(n, b, 'linePrefix', x + 1) : b))
          : (n.enter('codeFlowValue'), _(C));
      }
      function _(C) {
        return C === null || f(C) ? (n.exit('codeFlowValue'), b(C)) : (n.consume(C), _);
      }
      function P(C) {
        return n.exit('codeFenced'), l(C);
      }
      function q(C, T, D) {
        var M = 0;
        return r(
          C,
          w,
          'linePrefix',
          this.parser.constructs.disable.null.indexOf('codeIndented') > -1 ? void 0 : 4
        );
        function w(H) {
          return C.enter('codeFencedFence'), C.enter('codeFencedFenceSequence'), B(H);
        }
        function B(H) {
          return H === v
            ? (C.consume(H), M++, B)
            : M < k
            ? D(H)
            : (C.exit('codeFencedFenceSequence'), r(C, Z, 'whitespace')(H));
        }
        function Z(H) {
          return H === null || f(H) ? (C.exit('codeFencedFence'), T(H)) : D(H);
        }
      }
    }
    g.exports = u;
  }),
  dn = I((A, g) => {
    'use strict';
    var f = X(),
      h = le(),
      F = Ae(),
      r = ee(),
      u = { name: 'codeIndented', tokenize: l, resolve: n },
      c = { tokenize: e, partial: !0 };
    function n(t, i) {
      var x = { type: 'codeIndented', start: t[0][1].start, end: t[t.length - 1][1].end };
      return h(t, 0, 0, [['enter', x, i]]), h(t, t.length, 0, [['exit', x, i]]), t;
    }
    function l(t, i, x) {
      return t.attempt(c, k, x);
      function k(a) {
        return a === null ? i(a) : f(a) ? t.attempt(c, k, i)(a) : (t.enter('codeFlowValue'), v(a));
      }
      function v(a) {
        return a === null || f(a) ? (t.exit('codeFlowValue'), k(a)) : (t.consume(a), v);
      }
    }
    function e(t, i, x) {
      var k = this;
      return r(t, v, 'linePrefix', 4 + 1);
      function v(a) {
        return f(a)
          ? (t.enter('lineEnding'),
            t.consume(a),
            t.exit('lineEnding'),
            r(t, v, 'linePrefix', 4 + 1))
          : F(k.events, 'linePrefix') < 4
          ? x(a)
          : i(a);
      }
    }
    g.exports = u;
  }),
  pn = I((A, g) => {
    'use strict';
    var f = X(),
      h = { name: 'codeText', tokenize: u, resolve: F, previous: r };
    function F(c) {
      var n = c.length - 4,
        l = 3,
        e,
        t;
      if (
        (c[l][1].type === 'lineEnding' || c[l][1].type === 'space') &&
        (c[n][1].type === 'lineEnding' || c[n][1].type === 'space')
      ) {
        for (e = l; ++e < n; )
          if (c[e][1].type === 'codeTextData') {
            (c[n][1].type = c[l][1].type = 'codeTextPadding'), (l += 2), (n -= 2);
            break;
          }
      }
      for (e = l - 1, n++; ++e <= n; )
        t === void 0
          ? e !== n && c[e][1].type !== 'lineEnding' && (t = e)
          : (e === n || c[e][1].type === 'lineEnding') &&
            ((c[t][1].type = 'codeTextData'),
            e !== t + 2 &&
              ((c[t][1].end = c[e - 1][1].end),
              c.splice(t + 2, e - t - 2),
              (n -= e - t - 2),
              (e = t + 2)),
            (t = void 0));
      return c;
    }
    function r(c) {
      return c !== 96 || this.events[this.events.length - 1][1].type === 'characterEscape';
    }
    function u(c, n, l) {
      var e = 0,
        t,
        i;
      return x;
      function x(m) {
        return c.enter('codeText'), c.enter('codeTextSequence'), k(m);
      }
      function k(m) {
        return m === 96 ? (c.consume(m), e++, k) : (c.exit('codeTextSequence'), v(m));
      }
      function v(m) {
        return m === null
          ? l(m)
          : m === 96
          ? ((i = c.enter('codeTextSequence')), (t = 0), p(m))
          : m === 32
          ? (c.enter('space'), c.consume(m), c.exit('space'), v)
          : f(m)
          ? (c.enter('lineEnding'), c.consume(m), c.exit('lineEnding'), v)
          : (c.enter('codeTextData'), a(m));
      }
      function a(m) {
        return m === null || m === 32 || m === 96 || f(m)
          ? (c.exit('codeTextData'), v(m))
          : (c.consume(m), a);
      }
      function p(m) {
        return m === 96
          ? (c.consume(m), t++, p)
          : t === e
          ? (c.exit('codeTextSequence'), c.exit('codeText'), n(m))
          : ((i.type = 'codeTextData'), a(m));
      }
    }
    g.exports = h;
  }),
  Ue = I((A, g) => {
    'use strict';
    var f = Ve(),
      h = de(),
      F = X();
    function r(u, c, n, l, e, t, i, x, k) {
      var v = k || 1 / 0,
        a = 0;
      return p;
      function p(b) {
        return b === 60
          ? (u.enter(l), u.enter(e), u.enter(t), u.consume(b), u.exit(t), m)
          : f(b) || b === 41
          ? n(b)
          : (u.enter(l),
            u.enter(i),
            u.enter(x),
            u.enter('chunkString', { contentType: 'string' }),
            S(b));
      }
      function m(b) {
        return b === 62
          ? (u.enter(t), u.consume(b), u.exit(t), u.exit(e), u.exit(l), c)
          : (u.enter(x), u.enter('chunkString', { contentType: 'string' }), E(b));
      }
      function E(b) {
        return b === 62
          ? (u.exit('chunkString'), u.exit(x), m(b))
          : b === null || b === 60 || F(b)
          ? n(b)
          : (u.consume(b), b === 92 ? y : E);
      }
      function y(b) {
        return b === 60 || b === 62 || b === 92 ? (u.consume(b), E) : E(b);
      }
      function S(b) {
        return b === 40
          ? ++a > v
            ? n(b)
            : (u.consume(b), S)
          : b === 41
          ? a--
            ? (u.consume(b), S)
            : (u.exit('chunkString'), u.exit(x), u.exit(i), u.exit(l), c(b))
          : b === null || h(b)
          ? a
            ? n(b)
            : (u.exit('chunkString'), u.exit(x), u.exit(i), u.exit(l), c(b))
          : f(b)
          ? n(b)
          : (u.consume(b), b === 92 ? o : S);
      }
      function o(b) {
        return b === 40 || b === 41 || b === 92 ? (u.consume(b), S) : S(b);
      }
    }
    g.exports = r;
  }),
  Ze = I((A, g) => {
    'use strict';
    var f = X(),
      h = ae();
    function F(r, u, c, n, l, e) {
      var t = this,
        i = 0,
        x;
      return k;
      function k(m) {
        return r.enter(n), r.enter(l), r.consume(m), r.exit(l), r.enter(e), v;
      }
      function v(m) {
        return m === null ||
          m === 91 ||
          (m === 93 && !x) ||
          (m === 94 && !i && '_hiddenFootnoteSupport' in t.parser.constructs) ||
          i > 999
          ? c(m)
          : m === 93
          ? (r.exit(e), r.enter(l), r.consume(m), r.exit(l), r.exit(n), u)
          : f(m)
          ? (r.enter('lineEnding'), r.consume(m), r.exit('lineEnding'), v)
          : (r.enter('chunkString', { contentType: 'string' }), a(m));
      }
      function a(m) {
        return m === null || m === 91 || m === 93 || f(m) || i++ > 999
          ? (r.exit('chunkString'), v(m))
          : (r.consume(m), (x = x || !h(m)), m === 92 ? p : a);
      }
      function p(m) {
        return m === 91 || m === 92 || m === 93 ? (r.consume(m), i++, a) : a(m);
      }
    }
    g.exports = F;
  }),
  $e = I((A, g) => {
    'use strict';
    var f = X(),
      h = ae(),
      F = ee();
    function r(u, c) {
      var n;
      return l;
      function l(e) {
        return f(e)
          ? (u.enter('lineEnding'), u.consume(e), u.exit('lineEnding'), (n = !0), l)
          : h(e)
          ? F(u, l, n ? 'linePrefix' : 'lineSuffix')(e)
          : c(e);
      }
    }
    g.exports = r;
  }),
  Ge = I((A, g) => {
    'use strict';
    var f = X(),
      h = ee();
    function F(r, u, c, n, l, e) {
      var t;
      return i;
      function i(p) {
        return r.enter(n), r.enter(l), r.consume(p), r.exit(l), (t = p === 40 ? 41 : p), x;
      }
      function x(p) {
        return p === t ? (r.enter(l), r.consume(p), r.exit(l), r.exit(n), u) : (r.enter(e), k(p));
      }
      function k(p) {
        return p === t
          ? (r.exit(e), x(t))
          : p === null
          ? c(p)
          : f(p)
          ? (r.enter('lineEnding'), r.consume(p), r.exit('lineEnding'), h(r, k, 'linePrefix'))
          : (r.enter('chunkString', { contentType: 'string' }), v(p));
      }
      function v(p) {
        return p === t || p === null || f(p)
          ? (r.exit('chunkString'), k(p))
          : (r.consume(p), p === 92 ? a : v);
      }
      function a(p) {
        return p === t || p === 92 ? (r.consume(p), v) : v(p);
      }
    }
    g.exports = F;
  }),
  xn = I((A, g) => {
    'use strict';
    var f = X(),
      h = de(),
      F = ze(),
      r = Ue(),
      u = Ze(),
      c = ee(),
      n = $e(),
      l = Ge(),
      e = { name: 'definition', tokenize: i },
      t = { tokenize: x, partial: !0 };
    function i(k, v, a) {
      var p = this,
        m;
      return E;
      function E(o) {
        return (
          k.enter('definition'),
          u.call(p, k, y, a, 'definitionLabel', 'definitionLabelMarker', 'definitionLabelString')(o)
        );
      }
      function y(o) {
        return (
          (m = F(p.sliceSerialize(p.events[p.events.length - 1][1]).slice(1, -1))),
          o === 58
            ? (k.enter('definitionMarker'),
              k.consume(o),
              k.exit('definitionMarker'),
              n(
                k,
                r(
                  k,
                  k.attempt(t, c(k, S, 'whitespace'), c(k, S, 'whitespace')),
                  a,
                  'definitionDestination',
                  'definitionDestinationLiteral',
                  'definitionDestinationLiteralMarker',
                  'definitionDestinationRaw',
                  'definitionDestinationString'
                )
              ))
            : a(o)
        );
      }
      function S(o) {
        return o === null || f(o)
          ? (k.exit('definition'),
            p.parser.defined.indexOf(m) < 0 && p.parser.defined.push(m),
            v(o))
          : a(o);
      }
    }
    function x(k, v, a) {
      return p;
      function p(y) {
        return h(y) ? n(k, m)(y) : a(y);
      }
      function m(y) {
        return y === 34 || y === 39 || y === 40
          ? l(
              k,
              c(k, E, 'whitespace'),
              a,
              'definitionTitle',
              'definitionTitleMarker',
              'definitionTitleString'
            )(y)
          : a(y);
      }
      function E(y) {
        return y === null || f(y) ? v(y) : a(y);
      }
    }
    g.exports = e;
  }),
  hn = I((A, g) => {
    'use strict';
    var f = X(),
      h = { name: 'hardBreakEscape', tokenize: F };
    function F(r, u, c) {
      return n;
      function n(e) {
        return r.enter('hardBreakEscape'), r.enter('escapeMarker'), r.consume(e), l;
      }
      function l(e) {
        return f(e) ? (r.exit('escapeMarker'), r.exit('hardBreakEscape'), u(e)) : c(e);
      }
    }
    g.exports = h;
  }),
  vn = I((A, g) => {
    'use strict';
    var f = X(),
      h = de(),
      F = ae(),
      r = le(),
      u = ee(),
      c = { name: 'headingAtx', tokenize: l, resolve: n };
    function n(e, t) {
      var i = e.length - 2,
        x = 3,
        k,
        v;
      return (
        e[x][1].type === 'whitespace' && (x += 2),
        i - 2 > x && e[i][1].type === 'whitespace' && (i -= 2),
        e[i][1].type === 'atxHeadingSequence' &&
          (x === i - 1 || (i - 4 > x && e[i - 2][1].type === 'whitespace')) &&
          (i -= x + 1 === i ? 2 : 4),
        i > x &&
          ((k = { type: 'atxHeadingText', start: e[x][1].start, end: e[i][1].end }),
          (v = { type: 'chunkText', start: e[x][1].start, end: e[i][1].end, contentType: 'text' }),
          r(e, x, i - x + 1, [
            ['enter', k, t],
            ['enter', v, t],
            ['exit', v, t],
            ['exit', k, t],
          ])),
        e
      );
    }
    function l(e, t, i) {
      var x = this,
        k = 0;
      return v;
      function v(y) {
        return e.enter('atxHeading'), e.enter('atxHeadingSequence'), a(y);
      }
      function a(y) {
        return y === 35 && k++ < 6
          ? (e.consume(y), a)
          : y === null || h(y)
          ? (e.exit('atxHeadingSequence'), x.interrupt ? t(y) : p(y))
          : i(y);
      }
      function p(y) {
        return y === 35
          ? (e.enter('atxHeadingSequence'), m(y))
          : y === null || f(y)
          ? (e.exit('atxHeading'), t(y))
          : F(y)
          ? u(e, p, 'whitespace')(y)
          : (e.enter('atxHeadingText'), E(y));
      }
      function m(y) {
        return y === 35 ? (e.consume(y), m) : (e.exit('atxHeadingSequence'), p(y));
      }
      function E(y) {
        return y === null || y === 35 || h(y)
          ? (e.exit('atxHeadingText'), p(y))
          : (e.consume(y), E);
      }
    }
    g.exports = c;
  }),
  mn = I((A, g) => {
    'use strict';
    var f = [
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
      'source',
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
    ];
    g.exports = f;
  }),
  gn = I((A, g) => {
    'use strict';
    var f = ['pre', 'script', 'style', 'textarea'];
    g.exports = f;
  }),
  kn = I((A, g) => {
    'use strict';
    var f = Te(),
      h = Fe(),
      F = X(),
      r = de(),
      u = ae(),
      c = ke(),
      n = mn(),
      l = gn(),
      e = be(),
      t = { name: 'htmlFlow', tokenize: k, resolveTo: x, concrete: !0 },
      i = { tokenize: v, partial: !0 };
    function x(a) {
      for (var p = a.length; p-- && !(a[p][0] === 'enter' && a[p][1].type === 'htmlFlow'); );
      return (
        p > 1 &&
          a[p - 2][1].type === 'linePrefix' &&
          ((a[p][1].start = a[p - 2][1].start),
          (a[p + 1][1].start = a[p - 2][1].start),
          a.splice(p - 2, 2)),
        a
      );
    }
    function k(a, p, m) {
      var E = this,
        y,
        S,
        o,
        b,
        _;
      return P;
      function P(d) {
        return a.enter('htmlFlow'), a.enter('htmlFlowData'), a.consume(d), q;
      }
      function q(d) {
        return d === 33
          ? (a.consume(d), C)
          : d === 47
          ? (a.consume(d), M)
          : d === 63
          ? (a.consume(d), (y = 3), E.interrupt ? p : ue)
          : f(d)
          ? (a.consume(d), (o = c(d)), (S = !0), w)
          : m(d);
      }
      function C(d) {
        return d === 45
          ? (a.consume(d), (y = 2), T)
          : d === 91
          ? (a.consume(d), (y = 5), (o = 'CDATA['), (b = 0), D)
          : f(d)
          ? (a.consume(d), (y = 4), E.interrupt ? p : ue)
          : m(d);
      }
      function T(d) {
        return d === 45 ? (a.consume(d), E.interrupt ? p : ue) : m(d);
      }
      function D(d) {
        return d === o.charCodeAt(b++)
          ? (a.consume(d), b === o.length ? (E.interrupt ? p : G) : D)
          : m(d);
      }
      function M(d) {
        return f(d) ? (a.consume(d), (o = c(d)), w) : m(d);
      }
      function w(d) {
        return d === null || d === 47 || d === 62 || r(d)
          ? d !== 47 && S && l.indexOf(o.toLowerCase()) > -1
            ? ((y = 1), E.interrupt ? p(d) : G(d))
            : n.indexOf(o.toLowerCase()) > -1
            ? ((y = 6), d === 47 ? (a.consume(d), B) : E.interrupt ? p(d) : G(d))
            : ((y = 7), E.interrupt ? m(d) : S ? H(d) : Z(d))
          : d === 45 || h(d)
          ? (a.consume(d), (o += c(d)), w)
          : m(d);
      }
      function B(d) {
        return d === 62 ? (a.consume(d), E.interrupt ? p : G) : m(d);
      }
      function Z(d) {
        return u(d) ? (a.consume(d), Z) : N(d);
      }
      function H(d) {
        return d === 47
          ? (a.consume(d), N)
          : d === 58 || d === 95 || f(d)
          ? (a.consume(d), L)
          : u(d)
          ? (a.consume(d), H)
          : N(d);
      }
      function L(d) {
        return d === 45 || d === 46 || d === 58 || d === 95 || h(d) ? (a.consume(d), L) : W(d);
      }
      function W(d) {
        return d === 61 ? (a.consume(d), V) : u(d) ? (a.consume(d), W) : H(d);
      }
      function V(d) {
        return d === null || d === 60 || d === 61 || d === 62 || d === 96
          ? m(d)
          : d === 34 || d === 39
          ? (a.consume(d), (_ = d), U)
          : u(d)
          ? (a.consume(d), V)
          : ((_ = void 0), O(d));
      }
      function U(d) {
        return d === _ ? (a.consume(d), j) : d === null || F(d) ? m(d) : (a.consume(d), U);
      }
      function O(d) {
        return d === null ||
          d === 34 ||
          d === 39 ||
          d === 60 ||
          d === 61 ||
          d === 62 ||
          d === 96 ||
          r(d)
          ? W(d)
          : (a.consume(d), O);
      }
      function j(d) {
        return d === 47 || d === 62 || u(d) ? H(d) : m(d);
      }
      function N(d) {
        return d === 62 ? (a.consume(d), K) : m(d);
      }
      function K(d) {
        return u(d) ? (a.consume(d), K) : d === null || F(d) ? G(d) : m(d);
      }
      function G(d) {
        return d === 45 && y === 2
          ? (a.consume(d), te)
          : d === 60 && y === 1
          ? (a.consume(d), s)
          : d === 62 && y === 4
          ? (a.consume(d), ce)
          : d === 63 && y === 3
          ? (a.consume(d), ue)
          : d === 93 && y === 5
          ? (a.consume(d), ve)
          : F(d) && (y === 6 || y === 7)
          ? a.check(i, ce, Y)(d)
          : d === null || F(d)
          ? Y(d)
          : (a.consume(d), G);
      }
      function Y(d) {
        return a.exit('htmlFlowData'), oe(d);
      }
      function oe(d) {
        return d === null
          ? pe(d)
          : F(d)
          ? (a.enter('lineEnding'), a.consume(d), a.exit('lineEnding'), oe)
          : (a.enter('htmlFlowData'), G(d));
      }
      function te(d) {
        return d === 45 ? (a.consume(d), ue) : G(d);
      }
      function s(d) {
        return d === 47 ? (a.consume(d), (o = ''), se) : G(d);
      }
      function se(d) {
        return d === 62 && l.indexOf(o.toLowerCase()) > -1
          ? (a.consume(d), ce)
          : f(d) && o.length < 8
          ? (a.consume(d), (o += c(d)), se)
          : G(d);
      }
      function ve(d) {
        return d === 93 ? (a.consume(d), ue) : G(d);
      }
      function ue(d) {
        return d === 62 ? (a.consume(d), ce) : G(d);
      }
      function ce(d) {
        return d === null || F(d) ? (a.exit('htmlFlowData'), pe(d)) : (a.consume(d), ce);
      }
      function pe(d) {
        return a.exit('htmlFlow'), p(d);
      }
    }
    function v(a, p, m) {
      return E;
      function E(y) {
        return (
          a.exit('htmlFlowData'),
          a.enter('lineEndingBlank'),
          a.consume(y),
          a.exit('lineEndingBlank'),
          a.attempt(e, p, m)
        );
      }
    }
    g.exports = t;
  }),
  Fn = I((A, g) => {
    'use strict';
    var f = Te(),
      h = Fe(),
      F = X(),
      r = de(),
      u = ae(),
      c = ee(),
      n = { name: 'htmlText', tokenize: l };
    function l(e, t, i) {
      var x = this,
        k,
        v,
        a,
        p;
      return m;
      function m(s) {
        return e.enter('htmlText'), e.enter('htmlTextData'), e.consume(s), E;
      }
      function E(s) {
        return s === 33
          ? (e.consume(s), y)
          : s === 47
          ? (e.consume(s), Z)
          : s === 63
          ? (e.consume(s), w)
          : f(s)
          ? (e.consume(s), W)
          : i(s);
      }
      function y(s) {
        return s === 45
          ? (e.consume(s), S)
          : s === 91
          ? (e.consume(s), (v = 'CDATA['), (a = 0), q)
          : f(s)
          ? (e.consume(s), M)
          : i(s);
      }
      function S(s) {
        return s === 45 ? (e.consume(s), o) : i(s);
      }
      function o(s) {
        return s === null || s === 62 ? i(s) : s === 45 ? (e.consume(s), b) : _(s);
      }
      function b(s) {
        return s === null || s === 62 ? i(s) : _(s);
      }
      function _(s) {
        return s === null
          ? i(s)
          : s === 45
          ? (e.consume(s), P)
          : F(s)
          ? ((p = _), Y(s))
          : (e.consume(s), _);
      }
      function P(s) {
        return s === 45 ? (e.consume(s), te) : _(s);
      }
      function q(s) {
        return s === v.charCodeAt(a++) ? (e.consume(s), a === v.length ? C : q) : i(s);
      }
      function C(s) {
        return s === null
          ? i(s)
          : s === 93
          ? (e.consume(s), T)
          : F(s)
          ? ((p = C), Y(s))
          : (e.consume(s), C);
      }
      function T(s) {
        return s === 93 ? (e.consume(s), D) : C(s);
      }
      function D(s) {
        return s === 62 ? te(s) : s === 93 ? (e.consume(s), D) : C(s);
      }
      function M(s) {
        return s === null || s === 62 ? te(s) : F(s) ? ((p = M), Y(s)) : (e.consume(s), M);
      }
      function w(s) {
        return s === null
          ? i(s)
          : s === 63
          ? (e.consume(s), B)
          : F(s)
          ? ((p = w), Y(s))
          : (e.consume(s), w);
      }
      function B(s) {
        return s === 62 ? te(s) : w(s);
      }
      function Z(s) {
        return f(s) ? (e.consume(s), H) : i(s);
      }
      function H(s) {
        return s === 45 || h(s) ? (e.consume(s), H) : L(s);
      }
      function L(s) {
        return F(s) ? ((p = L), Y(s)) : u(s) ? (e.consume(s), L) : te(s);
      }
      function W(s) {
        return s === 45 || h(s) ? (e.consume(s), W) : s === 47 || s === 62 || r(s) ? V(s) : i(s);
      }
      function V(s) {
        return s === 47
          ? (e.consume(s), te)
          : s === 58 || s === 95 || f(s)
          ? (e.consume(s), U)
          : F(s)
          ? ((p = V), Y(s))
          : u(s)
          ? (e.consume(s), V)
          : te(s);
      }
      function U(s) {
        return s === 45 || s === 46 || s === 58 || s === 95 || h(s) ? (e.consume(s), U) : O(s);
      }
      function O(s) {
        return s === 61
          ? (e.consume(s), j)
          : F(s)
          ? ((p = O), Y(s))
          : u(s)
          ? (e.consume(s), O)
          : V(s);
      }
      function j(s) {
        return s === null || s === 60 || s === 61 || s === 62 || s === 96
          ? i(s)
          : s === 34 || s === 39
          ? (e.consume(s), (k = s), N)
          : F(s)
          ? ((p = j), Y(s))
          : u(s)
          ? (e.consume(s), j)
          : (e.consume(s), (k = void 0), G);
      }
      function N(s) {
        return s === k
          ? (e.consume(s), K)
          : s === null
          ? i(s)
          : F(s)
          ? ((p = N), Y(s))
          : (e.consume(s), N);
      }
      function K(s) {
        return s === 62 || s === 47 || r(s) ? V(s) : i(s);
      }
      function G(s) {
        return s === null || s === 34 || s === 39 || s === 60 || s === 61 || s === 96
          ? i(s)
          : s === 62 || r(s)
          ? V(s)
          : (e.consume(s), G);
      }
      function Y(s) {
        return (
          e.exit('htmlTextData'),
          e.enter('lineEnding'),
          e.consume(s),
          e.exit('lineEnding'),
          c(
            e,
            oe,
            'linePrefix',
            x.parser.constructs.disable.null.indexOf('codeIndented') > -1 ? void 0 : 4
          )
        );
      }
      function oe(s) {
        return e.enter('htmlTextData'), p(s);
      }
      function te(s) {
        return s === 62 ? (e.consume(s), e.exit('htmlTextData'), e.exit('htmlText'), t) : i(s);
      }
    }
    g.exports = n;
  }),
  we = I((A, g) => {
    'use strict';
    var f = de(),
      h = Ee(),
      F = le(),
      r = ze(),
      u = De(),
      c = he(),
      n = Ue(),
      l = Ze(),
      e = Ge(),
      t = $e(),
      i = { name: 'labelEnd', tokenize: m, resolveTo: p, resolveAll: a },
      x = { tokenize: E },
      k = { tokenize: y },
      v = { tokenize: S };
    function a(o) {
      for (var b = -1, _; ++b < o.length; )
        (_ = o[b][1]),
          !_._used &&
            (_.type === 'labelImage' || _.type === 'labelLink' || _.type === 'labelEnd') &&
            (o.splice(b + 1, _.type === 'labelImage' ? 4 : 2), (_.type = 'data'), b++);
      return o;
    }
    function p(o, b) {
      for (var _ = o.length, P = 0, q, C, T, D, M, w, B; _--; )
        if (((D = o[_][1]), M)) {
          if (D.type === 'link' || (D.type === 'labelLink' && D._inactive)) break;
          o[_][0] === 'enter' && D.type === 'labelLink' && (D._inactive = !0);
        } else if (w) {
          if (
            o[_][0] === 'enter' &&
            (D.type === 'labelImage' || D.type === 'labelLink') &&
            !D._balanced &&
            ((M = _), D.type !== 'labelLink')
          ) {
            P = 2;
            break;
          }
        } else D.type === 'labelEnd' && (w = _);
      return (
        (q = {
          type: o[M][1].type === 'labelLink' ? 'link' : 'image',
          start: c(o[M][1].start),
          end: c(o[o.length - 1][1].end),
        }),
        (C = { type: 'label', start: c(o[M][1].start), end: c(o[w][1].end) }),
        (T = { type: 'labelText', start: c(o[M + P + 2][1].end), end: c(o[w - 2][1].start) }),
        (B = [
          ['enter', q, b],
          ['enter', C, b],
        ]),
        (B = h(B, o.slice(M + 1, M + P + 3))),
        (B = h(B, [['enter', T, b]])),
        (B = h(B, u(b.parser.constructs.insideSpan.null, o.slice(M + P + 4, w - 3), b))),
        (B = h(B, [['exit', T, b], o[w - 2], o[w - 1], ['exit', C, b]])),
        (B = h(B, o.slice(w + 1))),
        (B = h(B, [['exit', q, b]])),
        F(o, M, o.length, B),
        o
      );
    }
    function m(o, b, _) {
      for (var P = this, q = P.events.length, C, T; q--; )
        if (
          (P.events[q][1].type === 'labelImage' || P.events[q][1].type === 'labelLink') &&
          !P.events[q][1]._balanced
        ) {
          C = P.events[q][1];
          break;
        }
      return D;
      function D(B) {
        return C
          ? C._inactive
            ? w(B)
            : ((T =
                P.parser.defined.indexOf(r(P.sliceSerialize({ start: C.end, end: P.now() }))) > -1),
              o.enter('labelEnd'),
              o.enter('labelMarker'),
              o.consume(B),
              o.exit('labelMarker'),
              o.exit('labelEnd'),
              M)
          : _(B);
      }
      function M(B) {
        return B === 40
          ? o.attempt(x, b, T ? b : w)(B)
          : B === 91
          ? o.attempt(k, b, T ? o.attempt(v, b, w) : w)(B)
          : T
          ? b(B)
          : w(B);
      }
      function w(B) {
        return (C._balanced = !0), _(B);
      }
    }
    function E(o, b, _) {
      return P;
      function P(M) {
        return (
          o.enter('resource'),
          o.enter('resourceMarker'),
          o.consume(M),
          o.exit('resourceMarker'),
          t(o, q)
        );
      }
      function q(M) {
        return M === 41
          ? D(M)
          : n(
              o,
              C,
              _,
              'resourceDestination',
              'resourceDestinationLiteral',
              'resourceDestinationLiteralMarker',
              'resourceDestinationRaw',
              'resourceDestinationString',
              3
            )(M);
      }
      function C(M) {
        return f(M) ? t(o, T)(M) : D(M);
      }
      function T(M) {
        return M === 34 || M === 39 || M === 40
          ? e(o, t(o, D), _, 'resourceTitle', 'resourceTitleMarker', 'resourceTitleString')(M)
          : D(M);
      }
      function D(M) {
        return M === 41
          ? (o.enter('resourceMarker'),
            o.consume(M),
            o.exit('resourceMarker'),
            o.exit('resource'),
            b)
          : _(M);
      }
    }
    function y(o, b, _) {
      var P = this;
      return q;
      function q(T) {
        return l.call(P, o, C, _, 'reference', 'referenceMarker', 'referenceString')(T);
      }
      function C(T) {
        return P.parser.defined.indexOf(
          r(P.sliceSerialize(P.events[P.events.length - 1][1]).slice(1, -1))
        ) < 0
          ? _(T)
          : b(T);
      }
    }
    function S(o, b, _) {
      return P;
      function P(C) {
        return (
          o.enter('reference'),
          o.enter('referenceMarker'),
          o.consume(C),
          o.exit('referenceMarker'),
          q
        );
      }
      function q(C) {
        return C === 93
          ? (o.enter('referenceMarker'),
            o.consume(C),
            o.exit('referenceMarker'),
            o.exit('reference'),
            b)
          : _(C);
      }
    }
    g.exports = i;
  }),
  yn = I((A, g) => {
    'use strict';
    var f = we(),
      h = { name: 'labelStartImage', tokenize: F, resolveAll: f.resolveAll };
    function F(r, u, c) {
      var n = this;
      return l;
      function l(i) {
        return (
          r.enter('labelImage'),
          r.enter('labelImageMarker'),
          r.consume(i),
          r.exit('labelImageMarker'),
          e
        );
      }
      function e(i) {
        return i === 91
          ? (r.enter('labelMarker'), r.consume(i), r.exit('labelMarker'), r.exit('labelImage'), t)
          : c(i);
      }
      function t(i) {
        return i === 94 && '_hiddenFootnoteSupport' in n.parser.constructs ? c(i) : u(i);
      }
    }
    g.exports = h;
  }),
  En = I((A, g) => {
    'use strict';
    var f = we(),
      h = { name: 'labelStartLink', tokenize: F, resolveAll: f.resolveAll };
    function F(r, u, c) {
      var n = this;
      return l;
      function l(t) {
        return (
          r.enter('labelLink'),
          r.enter('labelMarker'),
          r.consume(t),
          r.exit('labelMarker'),
          r.exit('labelLink'),
          e
        );
      }
      function e(t) {
        return t === 94 && '_hiddenFootnoteSupport' in n.parser.constructs ? c(t) : u(t);
      }
    }
    g.exports = h;
  }),
  Sn = I((A, g) => {
    'use strict';
    var f = ee(),
      h = { name: 'lineEnding', tokenize: F };
    function F(r, u) {
      return c;
      function c(n) {
        return r.enter('lineEnding'), r.consume(n), r.exit('lineEnding'), f(r, u, 'linePrefix');
      }
    }
    g.exports = h;
  }),
  Ne = I((A, g) => {
    'use strict';
    var f = X(),
      h = ae(),
      F = ee(),
      r = { name: 'thematicBreak', tokenize: u };
    function u(c, n, l) {
      var e = 0,
        t;
      return i;
      function i(v) {
        return c.enter('thematicBreak'), (t = v), x(v);
      }
      function x(v) {
        return v === t
          ? (c.enter('thematicBreakSequence'), k(v))
          : h(v)
          ? F(c, x, 'whitespace')(v)
          : e < 3 || (v !== null && !f(v))
          ? l(v)
          : (c.exit('thematicBreak'), n(v));
      }
      function k(v) {
        return v === t ? (c.consume(v), e++, k) : (c.exit('thematicBreakSequence'), x(v));
      }
    }
    g.exports = r;
  }),
  bn = I((A, g) => {
    'use strict';
    var f = We(),
      h = ae(),
      F = Ae(),
      r = qe(),
      u = ee(),
      c = be(),
      n = Ne(),
      l = { name: 'list', tokenize: i, continuation: { tokenize: x }, exit: v },
      e = { tokenize: a, partial: !0 },
      t = { tokenize: k, partial: !0 };
    function i(p, m, E) {
      var y = this,
        S = F(y.events, 'linePrefix'),
        o = 0;
      return b;
      function b(D) {
        var M =
          y.containerState.type ||
          (D === 42 || D === 43 || D === 45 ? 'listUnordered' : 'listOrdered');
        if (
          M === 'listUnordered' ? !y.containerState.marker || D === y.containerState.marker : f(D)
        ) {
          if (
            (y.containerState.type || ((y.containerState.type = M), p.enter(M, { _container: !0 })),
            M === 'listUnordered')
          )
            return p.enter('listItemPrefix'), D === 42 || D === 45 ? p.check(n, E, P)(D) : P(D);
          if (!y.interrupt || D === 49)
            return p.enter('listItemPrefix'), p.enter('listItemValue'), _(D);
        }
        return E(D);
      }
      function _(D) {
        return f(D) && ++o < 10
          ? (p.consume(D), _)
          : (!y.interrupt || o < 2) &&
            (y.containerState.marker ? D === y.containerState.marker : D === 41 || D === 46)
          ? (p.exit('listItemValue'), P(D))
          : E(D);
      }
      function P(D) {
        return (
          p.enter('listItemMarker'),
          p.consume(D),
          p.exit('listItemMarker'),
          (y.containerState.marker = y.containerState.marker || D),
          p.check(c, y.interrupt ? E : q, p.attempt(e, T, C))
        );
      }
      function q(D) {
        return (y.containerState.initialBlankLine = !0), S++, T(D);
      }
      function C(D) {
        return h(D)
          ? (p.enter('listItemPrefixWhitespace'),
            p.consume(D),
            p.exit('listItemPrefixWhitespace'),
            T)
          : E(D);
      }
      function T(D) {
        return (y.containerState.size = S + r(y.sliceStream(p.exit('listItemPrefix')))), m(D);
      }
    }
    function x(p, m, E) {
      var y = this;
      return (y.containerState._closeFlow = void 0), p.check(c, S, o);
      function S(_) {
        return (
          (y.containerState.furtherBlankLines =
            y.containerState.furtherBlankLines || y.containerState.initialBlankLine),
          u(p, m, 'listItemIndent', y.containerState.size + 1)(_)
        );
      }
      function o(_) {
        return y.containerState.furtherBlankLines || !h(_)
          ? ((y.containerState.furtherBlankLines = y.containerState.initialBlankLine = void 0),
            b(_))
          : ((y.containerState.furtherBlankLines = y.containerState.initialBlankLine = void 0),
            p.attempt(t, m, b)(_));
      }
      function b(_) {
        return (
          (y.containerState._closeFlow = !0),
          (y.interrupt = void 0),
          u(
            p,
            p.attempt(l, m, E),
            'linePrefix',
            y.parser.constructs.disable.null.indexOf('codeIndented') > -1 ? void 0 : 4
          )(_)
        );
      }
    }
    function k(p, m, E) {
      var y = this;
      return u(p, S, 'listItemIndent', y.containerState.size + 1);
      function S(o) {
        return F(y.events, 'listItemIndent') === y.containerState.size ? m(o) : E(o);
      }
    }
    function v(p) {
      p.exit(this.containerState.type);
    }
    function a(p, m, E) {
      var y = this;
      return u(
        p,
        S,
        'listItemPrefixWhitespace',
        y.parser.constructs.disable.null.indexOf('codeIndented') > -1 ? void 0 : 4 + 1
      );
      function S(o) {
        return h(o) || !F(y.events, 'listItemPrefixWhitespace') ? E(o) : m(o);
      }
    }
    g.exports = l;
  }),
  An = I((A, g) => {
    'use strict';
    var f = X(),
      h = he(),
      F = ee(),
      r = { name: 'setextUnderline', tokenize: c, resolveTo: u };
    function u(n, l) {
      for (var e = n.length, t, i, x, k; e--; )
        if (n[e][0] === 'enter') {
          if (n[e][1].type === 'content') {
            t = e;
            break;
          }
          n[e][1].type === 'paragraph' && (i = e);
        } else
          n[e][1].type === 'content' && n.splice(e, 1),
            !x && n[e][1].type === 'definition' && (x = e);
      return (
        (k = { type: 'setextHeading', start: h(n[i][1].start), end: h(n[n.length - 1][1].end) }),
        (n[i][1].type = 'setextHeadingText'),
        x
          ? (n.splice(i, 0, ['enter', k, l]),
            n.splice(x + 1, 0, ['exit', n[t][1], l]),
            (n[t][1].end = h(n[x][1].end)))
          : (n[t][1] = k),
        n.push(['exit', k, l]),
        n
      );
    }
    function c(n, l, e) {
      for (var t = this, i = t.events.length, x, k; i--; )
        if (
          t.events[i][1].type !== 'lineEnding' &&
          t.events[i][1].type !== 'linePrefix' &&
          t.events[i][1].type !== 'content'
        ) {
          k = t.events[i][1].type === 'paragraph';
          break;
        }
      return v;
      function v(m) {
        return !t.lazy && (t.interrupt || k)
          ? (n.enter('setextHeadingLine'), n.enter('setextHeadingLineSequence'), (x = m), a(m))
          : e(m);
      }
      function a(m) {
        return m === x
          ? (n.consume(m), a)
          : (n.exit('setextHeadingLineSequence'), F(n, p, 'lineSuffix')(m));
      }
      function p(m) {
        return m === null || f(m) ? (n.exit('setextHeadingLine'), l(m)) : e(m);
      }
    }
    g.exports = r;
  }),
  Cn = I((A) => {
    'use strict';
    Object.defineProperty(A, '__esModule', { value: !0 });
    var g = Qe(),
      f = nn(),
      h = un(),
      F = on(),
      r = an(),
      u = ln(),
      c = fn(),
      n = dn(),
      l = pn(),
      e = xn(),
      t = hn(),
      i = vn(),
      x = kn(),
      k = Fn(),
      v = we(),
      a = yn(),
      p = En(),
      m = Sn(),
      E = bn(),
      y = An(),
      S = Ne(),
      o = {
        42: E,
        43: E,
        45: E,
        48: E,
        49: E,
        50: E,
        51: E,
        52: E,
        53: E,
        54: E,
        55: E,
        56: E,
        57: E,
        62: F,
      },
      b = { 91: e },
      _ = { '-2': n, '-1': n, 32: n },
      P = { 35: i, 42: S, 45: [y, S], 60: x, 61: y, 95: S, 96: c, 126: c },
      q = { 38: u, 92: r },
      C = {
        '-5': m,
        '-4': m,
        '-3': m,
        33: a,
        38: u,
        42: f,
        60: [h, k],
        91: p,
        92: [t, r],
        93: v,
        95: f,
        96: l,
      },
      T = { null: [f, g.resolver] },
      D = { null: [] };
    (A.contentInitial = b),
      (A.disable = D),
      (A.document = o),
      (A.flow = P),
      (A.flowInitial = _),
      (A.insideSpan = T),
      (A.string = q),
      (A.text = C);
  }),
  In = I((A, g) => {
    'use strict';
    var f = Vt(),
      h = Wt(),
      F = Zt(),
      r = Qe(),
      u = $t(),
      c = Kt(),
      n = Se(),
      l = Cn();
    function e(t) {
      var i = t || {},
        x = {
          defined: [],
          constructs: u([l].concat(n(i.extensions))),
          content: k(f),
          document: k(h),
          flow: k(F),
          string: k(r.string),
          text: k(r.text),
        };
      return x;
      function k(v) {
        return a;
        function a(p) {
          return c(x, v, p);
        }
      }
    }
    g.exports = e;
  }),
  zn = I((A, g) => {
    'use strict';
    var f = je();
    function h(F) {
      for (; !f(F); );
      return F;
    }
    g.exports = h;
  }),
  Dn = I((A, g) => {
    'use strict';
    var f = /[\0\t\n\r]/g;
    function h() {
      var F = !0,
        r = 1,
        u = '',
        c;
      return n;
      function n(l, e, t) {
        var i = [],
          x,
          k,
          v,
          a,
          p;
        for (
          l = u + l.toString(e),
            v = 0,
            u = '',
            F && (l.charCodeAt(0) === 65279 && v++, (F = void 0));
          v < l.length;

        ) {
          if (
            ((f.lastIndex = v),
            (x = f.exec(l)),
            (a = x ? x.index : l.length),
            (p = l.charCodeAt(a)),
            !x)
          ) {
            u = l.slice(v);
            break;
          }
          if (p === 10 && v === a && c) i.push(-3), (c = void 0);
          else if (
            (c && (i.push(-5), (c = void 0)),
            v < a && (i.push(l.slice(v, a)), (r += a - v)),
            p === 0)
          )
            i.push(65533), r++;
          else if (p === 9) for (k = Math.ceil(r / 4) * 4, i.push(-2); r++ < k; ) i.push(-1);
          else p === 10 ? (i.push(-4), (r = 1)) : ((c = !0), (r = 1));
          v = a + 1;
        }
        return t && (c && i.push(-5), u && i.push(u), i.push(null)), i;
      }
    }
    g.exports = h;
  }),
  Tn = I((A, g) => {
    'use strict';
    var f = Qt(),
      h = In(),
      F = zn(),
      r = Dn();
    function u(c, n, l) {
      return (
        typeof n != 'string' && ((l = n), (n = void 0)),
        f(l)(F(h(l).document().write(r()(c, n, !0))))
      );
    }
    g.exports = u;
  }),
  wn = I((A, g) => {
    'use strict';
    g.exports = Tn();
  }),
  _n = I((A, g) => {
    'use strict';
    g.exports = wn();
  }),
  Mn = Pt(_n()),
  { default: Pe, ...Ln } = Mn,
  Bn = Pe !== void 0 ? Pe : Ln;
export { Bn as default };
