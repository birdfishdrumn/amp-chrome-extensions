import React, { FC } from "react";

interface Props {
  size: number;
  horizontal?: boolean;
}

export const Spacer: FC<Props> = ({ size, horizontal }) => {
  return (
    <div
      style={
        horizontal
          ? { width: size, height: "auto", display: "inline-block", flexShrink: 0 }
          : { width: "auto", height: size, flexShrink: 0 }
      }
    />
  );
};
