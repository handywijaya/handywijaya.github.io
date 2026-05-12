/// <reference types="react-scripts" />

declare global {
  interface Window {
    goatcounter?: {
      count: (vars?: { path?: string }) => void;
      no_onload?: boolean;
    };
  }
}

export {};
