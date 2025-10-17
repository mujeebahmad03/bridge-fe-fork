import { type NodeViewProps, NodeViewWrapper } from "@tiptap/react";
import { cn } from "@/lib/utils";

export const VariableNodeView = ({ node, selected }: NodeViewProps) => {
  return (
    <NodeViewWrapper
      as="span"
      className={cn(
        "inline-flex items-center rounded-md bg-primary/10 px-2 py-1 text-sm font-medium text-primary",
        "border border-primary/20",
        "cursor-pointer select-none",
        selected && "ring-2 ring-primary ring-offset-1",
      )}
      data-type="variable"
      data-id={node.attrs.id}
      data-name={node.attrs.name}
      data-syntax={node.attrs.syntax}
    >
      {node.attrs.syntax}
    </NodeViewWrapper>
  );
};
