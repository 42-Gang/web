import React from "react";
import { VerticalLine, HorizontalLine } from "../Matching.ts";
import {
  LINE_POSITION,
  LINE_TOP,
  LINE_HEIGHT,
  LINE_COLOR,
} from "../LineConstants.ts";

interface MatchLinesProps {
  winnerId?: number;
  leftUserId?: number;
  rightUserId?: number;
  direction: "left" | "right";
}

const MatchLines: React.FC<MatchLinesProps> = ({
  winnerId,
  leftUserId,
  rightUserId,
  direction,
}) => {
  const isLeft = direction === "left";

  const verticalLeft = isLeft
    ? LINE_POSITION.LEFT_VERTICAL
    : LINE_POSITION.RIGHT_VERTICAL;

  const horizontalLeft = isLeft
    ? LINE_POSITION.LEFT_HORIZONTAL
    : LINE_POSITION.RIGHT_HORIZONTAL;

  const winnerOnTop = isLeft
    ? winnerId === rightUserId
    : winnerId === leftUserId;

  return (
    <>
      <VerticalLine
        top={LINE_TOP.VERTICAL}
        left={verticalLeft}
        color={LINE_COLOR.DEFAULT}
      />
      {winnerOnTop && (
        <VerticalLine
          top={LINE_TOP.VERTICAL}
          height={LINE_HEIGHT.HALF}
          left={verticalLeft}
          color={LINE_COLOR.HIGHLIGHT}
        />
      )}
      {!winnerOnTop && (
        <VerticalLine
          top={LINE_TOP.BOTTOM_HALF}
          height={LINE_HEIGHT.HALF}
          left={verticalLeft}
          color={LINE_COLOR.HIGHLIGHT}
        />
      )}
      <HorizontalLine
        top={LINE_TOP.HORIZONTAL}
        left={horizontalLeft}
        color={LINE_COLOR.HIGHLIGHT}
      />
    </>
  );
};

export default MatchLines;
