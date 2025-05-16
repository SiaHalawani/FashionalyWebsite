// src/Components/ErrorBoundary.jsx
import React from 'react';
import ErrorPage from './ErrorPage';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error, info) {
    console.error("Global error caught:", error, info);
  }

  render() {
    return this.state.hasError ? <ErrorPage /> : this.props.children;
  }
}

export default ErrorBoundary;
