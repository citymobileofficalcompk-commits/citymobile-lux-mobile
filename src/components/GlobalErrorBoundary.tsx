import React, { Component, ReactNode } from "react";

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class GlobalErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI.
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white px-6 font-sans">
          <div className="text-center max-w-md">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-5xl">
              Oops! Something went wrong.
            </h1>
            <p className="mt-6 text-base leading-7 text-gray-500">
              We encountered an unexpected error. 
              {this.state.error?.message && (
                <span className="block mt-2 font-mono text-xs bg-slate-100 p-2 rounded text-red-500">
                  {this.state.error.message}
                </span>
              )}
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-4">
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center justify-center rounded-md bg-[#0F172A] px-8 py-3.5 text-sm font-medium text-white shadow-sm hover:bg-slate-800 transition-all active:scale-[0.98]"
              >
                Reload Page
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
