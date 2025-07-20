import React from "react";

export default function Title({ text1, text2 }) {
  return (
    <h2 className="text-3xl font-bold">
      <span className="text-yellow-400">{text1}</span> {text2}
    </h2>
  );
}
