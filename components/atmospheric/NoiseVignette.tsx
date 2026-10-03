import React from "react";

export function NoiseVignette() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      {/* Vignette Edge Shading */}
      <div className="vignette absolute inset-0" />
      {/* SVG Grain Noise */}
      <div className="noise absolute inset-0" />
    </div>
  );
}
