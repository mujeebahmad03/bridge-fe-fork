import { getBezierPath } from "@xyflow/react";
import { EdgeProps } from "@xyflow/react";

export default function ConditionEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  markerEnd,
  sourceHandleId,
}: EdgeProps) {
  const [edgePath] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  // Apply special styles for Yes/No paths
  const edgeStyle = {
    ...style,
    stroke:
      sourceHandleId === "yes"
        ? "#16a34a"
        : sourceHandleId === "no"
          ? "#dc2626"
          : style.stroke,
    strokeWidth: 2,
  };

  return (
    <>
      <path
        id={id}
        style={edgeStyle}
        className="react-flow__edge-path"
        d={edgePath}
        markerEnd={markerEnd}
      />
    </>
  );
}
