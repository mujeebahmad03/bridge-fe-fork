"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorInfo: null,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Error caught by boundary:", error, errorInfo);

    this.setState({
      error,
      errorInfo,
    });

    // Call optional error handler
    this.props.onError?.(error, errorInfo);

    // Report to error tracking service (e.g., Sentry, LogRocket)
    // reportError(error, errorInfo);
  }

  handleRetry = () => {
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <Card className="mx-auto max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-red-900">Something went wrong</CardTitle>
            <CardDescription>
              We&apos;re sorry, but something unexpected happened. Please try
              again.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button onClick={this.handleRetry} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Try Again
            </Button>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-4 rounded border border-red-200 bg-red-50 p-3">
                <summary className="cursor-pointer text-sm font-medium text-red-800">
                  Error Details (Development Only)
                </summary>
                <pre className="mt-2 whitespace-pre-wrap text-xs text-red-700">
                  {this.state.error.toString()}
                  {this.state.errorInfo?.componentStack}
                </pre>
              </details>
            )}
          </CardContent>
        </Card>
      );
    }

    return this.props.children;
  }
}

// Specialized Error Boundaries for different parts of the app

export const MessageErrorBoundary: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <ErrorBoundary
    fallback={
      <div className="p-4 text-center text-muted-foreground">
        <AlertTriangle className="mx-auto mb-2 h-8 w-8" />
        <p>Failed to load messages</p>
        <Button
          size="sm"
          className="mt-2"
          onClick={() => window.location.reload()}
        >
          Refresh
        </Button>
      </div>
    }
  >
    {children}
  </ErrorBoundary>
);

export const ConversationErrorBoundary: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <ErrorBoundary
    fallback={
      <div className="p-4 text-center text-muted-foreground">
        <AlertTriangle className="mx-auto mb-2 h-8 w-8" />
        <p>Failed to load conversations</p>
        <Button
          size="sm"
          className="mt-2"
          onClick={() => window.location.reload()}
        >
          Refresh
        </Button>
      </div>
    }
  >
    {children}
  </ErrorBoundary>
);

export const FileUploadErrorBoundary: React.FC<{ children: ReactNode }> = ({
  children,
}) => (
  <ErrorBoundary
    fallback={
      <div className="p-2 text-center text-sm text-muted-foreground">
        <AlertTriangle className="mx-auto mb-1 h-6 w-6" />
        <p>File upload failed</p>
      </div>
    }
  >
    {children}
  </ErrorBoundary>
);
