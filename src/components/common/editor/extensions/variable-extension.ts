import { Node, mergeAttributes } from "@tiptap/core";
import { ReactNodeViewRenderer } from "@tiptap/react";
import { VariableNodeView } from "./variable-node-view";

export interface VariableOptions {
  HTMLAttributes: Record<string, string | number | boolean>;
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    variable: {
      setVariable: (options: {
        id: string;
        name: string;
        syntax: string;
      }) => ReturnType;
    };
  }
}

export const Variable = Node.create<VariableOptions>({
  name: "variable",

  addOptions() {
    return {
      HTMLAttributes: {},
    };
  },

  group: "inline",

  inline: true,

  selectable: false,

  atom: true,

  addAttributes() {
    return {
      id: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-id"),
        renderHTML: (attributes) => {
          if (!attributes.id) {
            return {};
          }
          return {
            "data-id": attributes.id,
          };
        },
      },
      name: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-name"),
        renderHTML: (attributes) => {
          if (!attributes.name) {
            return {};
          }
          return {
            "data-name": attributes.name,
          };
        },
      },
      syntax: {
        default: null,
        parseHTML: (element) => element.getAttribute("data-syntax"),
        renderHTML: (attributes) => {
          if (!attributes.syntax) {
            return {};
          }
          return {
            "data-syntax": attributes.syntax,
          };
        },
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: "span[data-type='variable']",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "span",
      mergeAttributes(
        { "data-type": "variable" },
        this.options.HTMLAttributes,
        HTMLAttributes,
      ),
      HTMLAttributes.syntax || "{{variable}}",
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(VariableNodeView);
  },

  addCommands() {
    return {
      setVariable:
        (options) =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: options,
          });
        },
    };
  },
});
