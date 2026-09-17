"use client";

import React, { Component, type ReactNode } from "react";

type Props = { children: ReactNode; fallback?: ReactNode };
type State = { error: Error | null };

export class BackdropErrorBoundary extends Component<Props, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error) {
    return { error };
  }

  render() {
    if (this.state.error) {
      return (
        this.props.fallback ?? (
          <div className="fixed inset-0 z-10 flex items-center justify-center bg-[#0a1210] text-emerald-100 font-mono p-6 text-center">
            <div className="max-w-md space-y-3">
              <p className="text-emerald-300 font-semibold">Backdrop failed to start</p>
              <p className="text-sm text-emerald-100/70">
                WebGL may be unavailable in this preview. Open{" "}
                <span className="text-emerald-200">http://localhost:3001</span> in Chrome/Safari.
              </p>
              <p className="text-xs text-emerald-100/40 break-all">{this.state.error.message}</p>
            </div>
          </div>
        )
      );
    }
    return this.props.children;
  }
}
