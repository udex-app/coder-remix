import type { LoaderFunction } from "react-router";

export namespace Route {
  export type Loader = LoaderFunction;
  export type MetaArgs = {
    data: unknown;
    params: Record<string, string>;
  };
  export type LinksFunction = () => { rel: string; href: string; crossOrigin?: string; }[];
  export interface ErrorBoundaryProps {
    error: unknown;
  }
  // ... existing types ...
} 