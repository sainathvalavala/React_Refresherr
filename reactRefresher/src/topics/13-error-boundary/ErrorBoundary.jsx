import { Component } from "react";

// Error boundary: a CLASS component (there is no hook version) that catches
// errors thrown while rendering any component inside it, and shows a
// fallback instead of crashing the whole app to a blank page.
//   getDerivedStateFromError -> update state so the next render shows the fallback
//   componentDidCatch        -> side effects, e.g. log the error to a service
// It does NOT catch errors in event handlers, setTimeout or fetch callbacks.
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.log("Caught by ErrorBoundary:", error.message, info.componentStack);
  }

  // Clearing the error renders the children again (they remount with fresh state)
  reset = () => {
    this.setState({ error: null });
  };

  render() {
    if (this.state.error) {
      // Optional custom fallback: a function that receives the error and a
      // reset function, so each place can show its own message.
      if (this.props.fallback) {
        return this.props.fallback(this.state.error, this.reset);
      }
      return (
        <div className="error-box">
          <p>Something went wrong: {this.state.error.message}</p>
          <button onClick={this.reset}>Try again</button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
