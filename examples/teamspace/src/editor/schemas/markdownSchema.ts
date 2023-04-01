import { renderToken } from 'components/Token';
import {
  DOMOutputSpec,
  // Mark,
  MarkSpec,
  Node as ProsemirrorNode,
  NodeSpec,
  Schema,
  Mark,
} from 'prosemirror-model';

const calcYchangeDomAttrs = (
  attrs: { [key: string]: any },
  domAttrs: { [key: string]: any } = {}
) => {
  domAttrs = Object.assign({}, domAttrs);
  if (attrs.ychange !== null) {
    domAttrs.ychange_user = attrs.ychange.user;
    domAttrs.ychange_state = attrs.ychange.state;
  }
  return domAttrs;
};

// :: Object
// [Specs](#model.NodeSpec) for the nodes defined in this schema.
export const nodes: Record<string, NodeSpec> = {
  // :: NodeSpec The top level document node.
  doc: {
    content: 'block+',
  },

  // :: NodeSpec A plain paragraph textblock. Represented in the DOM
  // as a `<p>` element.
  paragraph: {
    attrs: { ychange: { default: null } },
    content: 'inline*',
    group: 'block',
    parseDOM: [{ tag: 'p' }],
    toDOM(node: ProsemirrorNode) {
      return ['p', calcYchangeDomAttrs(node.attrs), 0];
    },
  },

  // :: NodeSpec A mention. Represented in the DOM
  // as a `<span>` element.
  mention: {
    attrs: { 'data-target-id': { default: null }, 'data-target-type': { default: null } },

    atom: true,
    inline: true,
    group: 'inline',

    parseDOM: [
      {
        tag: 'span',
        getAttrs(dom: any) {
          return {
            'data-target-id': dom.hasAttribute('data-target-id')
              ? dom.getAttribute('data-target-id')
              : null,
            'data-target-type': dom.hasAttribute('data-target-type')
              ? dom.getAttribute('data-target-type')
              : null,
          };
        },
      },
    ],
    toDOM(node: ProsemirrorNode) {
      const span = document.createElement('span');
      span.setAttribute('data-target-id', node.attrs['data-target-id']);
      span.setAttribute('data-target-type', node.attrs['data-target-type']);
      renderToken(span, node.attrs);
      return span;
    },
  },

  ordered_list: {
    content: 'list_item+',
    group: 'block',
    attrs: { order: { default: 1 }, tight: { default: false } },
    parseDOM: [
      {
        tag: 'ol',
        getAttrs(dom: any) {
          return {
            order: dom.hasAttribute('start') ? +dom.getAttribute('start') : 1,
            tight: dom.hasAttribute('data-tight'),
          };
        },
      },
    ],
    toDOM(node: ProsemirrorNode) {
      return [
        'ol',
        {
          start: node.attrs.order == 1 ? null : node.attrs.order,
          'data-tight': node.attrs.tight ? 'true' : null,
        },
        0,
      ];
    },
  },

  bullet_list: {
    content: 'list_item+',
    group: 'block',
    attrs: { tight: { default: false } },
    parseDOM: [{ tag: 'ul', getAttrs: (dom: any) => ({ tight: dom.hasAttribute('data-tight') }) }],
    toDOM(node: ProsemirrorNode) {
      return ['ul', { 'data-tight': node.attrs.tight ? 'true' : null }, 0];
    },
  },

  list_item: {
    content: 'paragraph block*',
    defining: true,
    parseDOM: [{ tag: 'li' }],
    toDOM() {
      return ['li', 0];
    },
  },

  // :: NodeSpec A blockquote (`<blockquote>`) wrapping one or more blocks.
  // blockquote: {
  //   attrs: { ychange: { default: null } },
  //   content: 'block+',
  //   group: 'block',
  //   defining: true,
  //   parseDOM: [{ tag: 'blockquote' }],
  //   toDOM(node: ProsemirrorNode) {
  //     return ['blockquote', calcYchangeDomAttrs(node.attrs), 0];
  //   },
  // },

  // :: NodeSpec A horizontal rule (`<hr>`).
  // horizontal_rule: {
  //   attrs: { ychange: { default: null } },
  //   group: 'block',
  //   parseDOM: [{ tag: 'hr' }],
  //   toDOM(node: any) {
  //     return ['hr', calcYchangeDomAttrs(node.attrs)];
  //   },
  // },

  // :: NodeSpec A heading textblock, with a `level` attribute that
  // should hold the number 1 to 6. Parsed and serialized as `<h1>` to
  // `<h6>` elements.
  heading: {
    attrs: {
      level: { default: 1 },
      ychange: { default: null },
    },
    content: 'inline*',
    group: 'block',
    defining: true,
    parseDOM: [
      { tag: 'h1', attrs: { level: 1 } },
      { tag: 'h2', attrs: { level: 2 } },
      { tag: 'h3', attrs: { level: 3 } },
      // { tag: 'h4', attrs: { level: 4 } },
      // { tag: 'h5', attrs: { level: 5 } },
      // { tag: 'h6', attrs: { level: 6 } },
    ],
    toDOM(node: ProsemirrorNode) {
      if (node.attrs.level <= 3) {
        return ['h' + node.attrs.level, calcYchangeDomAttrs(node.attrs), 0];
      } else {
        return ['p', calcYchangeDomAttrs(node.attrs), 0];
      }
    },
  },

  // // :: NodeSpec A code listing. Disallows marks or non-text inline
  // // nodes by default. Represented as a `<pre>` element with a
  // // `<code>` element inside of it.
  // code_block: {
  //   attrs: { ychange: { default: null } },
  //   content: 'text*',
  //   marks: '',
  //   group: 'block',
  //   code: true,
  //   defining: true,
  //   parseDOM: [{ tag: 'pre', preserveWhitespace: 'full' }],
  //   toDOM(node: ProsemirrorNode) {
  //     return ['pre', calcYchangeDomAttrs(node.attrs), ['code', 0]];
  //   },
  // },

  // :: NodeSpec The text node.
  text: {
    group: 'inline',
  },

  // // :: NodeSpec An inline image (`<img>`) node. Supports `src`,
  // // `alt`, and `href` attributes. The latter two default to the empty
  // // string.
  // image: {
  //   inline: true,
  //   attrs: {
  //     ychange: { default: null },
  //     src: {},
  //     alt: { default: null },
  //     title: { default: null },
  //   },
  //   group: 'inline',
  //   draggable: true,
  //   parseDOM: [
  //     {
  //       tag: 'img[src]',
  //       getAttrs(dom: any) {
  //         return {
  //           src: dom.getAttribute('src'),
  //           title: dom.getAttribute('title'),
  //           alt: dom.getAttribute('alt'),
  //         };
  //       },
  //     },
  //   ],
  //   toDOM(node: any) {
  //     const domAttrs = {
  //       src: node.attrs.src,
  //       title: node.attrs.title,
  //       alt: node.attrs.alt,
  //     };
  //     return ['img', calcYchangeDomAttrs(node.attrs, domAttrs)];
  //   },
  // },

  // :: NodeSpec A hard line break, represented in the DOM as `<br>`.
  // hard_break: {
  //   inline: true,
  //   group: 'inline',
  //   selectable: false,
  //   parseDOM: [{ tag: 'br' }],
  //   toDOM() {
  //     return brDOM;
  //   },
  // },
};

const emDOM: DOMOutputSpec = ['em', 0];
const strongDOM: DOMOutputSpec = ['strong', 0];
// const codeDOM = ['code', 0];

// :: Object [Specs](#model.MarkSpec) for the marks in the schema.
export const marks: Record<string, MarkSpec> = {
  // :: MarkSpec A link. Has `href` and `title` attributes. `title`
  // defaults to the empty string. Rendered and parsed as an `<a>`
  // element.
  link: {
    attrs: {
      href: {},
      title: { default: null },
      'data-card-id': {},
    },
    inclusive: false,
    parseDOM: [
      {
        tag: 'a[href]',
        getAttrs(dom: any) {
          return {
            href: dom.getAttribute('href'),
            title: dom.getAttribute('title'),
            'data-card-id': dom.getAttribute('data-card-id'),
          };
        },
      },
    ],
    toDOM(mark: Mark) {
      return ['a', mark.attrs, 0];
    },
  },

  // :: MarkSpec An emphasis mark. Rendered as an `<em>` element.
  // Has parse rules that also match `<i>` and `font-style: italic`.
  em: {
    parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
    toDOM() {
      return emDOM;
    },
  },

  // :: MarkSpec A strong mark. Rendered as `<strong>`, parse rules
  // also match `<b>` and `font-weight: bold`.
  strong: {
    parseDOM: [
      { tag: 'strong' },
      // This works around a Google Docs misbehavior where
      // pasted content will be inexplicably wrapped in `<b>`
      // tags with a font-weight normal.
      { tag: 'b', getAttrs: (node: any) => node.style.fontWeight !== 'normal' && null },
      {
        style: 'font-weight',
        getAttrs: (value: any) => /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null,
      },
    ],
    toDOM() {
      return strongDOM;
    },
  },

  // // :: MarkSpec Code font mark. Represented as a `<code>` element.
  // code: {
  //   parseDOM: [{ tag: 'code' }],
  //   toDOM() {
  //     return codeDOM;
  //   },
  // },
  ychange: {
    attrs: {
      user: { default: null },
      state: { default: null },
    },
    inclusive: false,
    parseDOM: [{ tag: 'ychange' }],
    toDOM(node: any) {
      return ['ychange', { ychange_user: node.attrs.user, ychange_state: node.attrs.state }, 0];
    },
  },
};

// :: Schema
// This schema rougly corresponds to the document schema used by
// [CommonMark](http://commonmark.org/), minus the list elements,
// which are defined in the [`prosemirror-schema-list`](#schema-list)
// module.
//
// To reuse elements from this schema, extend or read from its
// `spec.nodes` and `spec.marks` [properties](#model.Schema.spec).
export const schema = new Schema({ nodes, marks });
