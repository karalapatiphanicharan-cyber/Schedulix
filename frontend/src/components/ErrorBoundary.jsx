import React from 'react';
import { RefreshCcw, AlertTriangle, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Simulator Error Boundary caught an error:", error, errorInfo);
  }

  handleReset = () => {
    localStorage.removeItem('schedulix_processes');
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex items-center justify-center px-4 py-12">
          <div className="glass max-w-lg w-full p-8 text-center border-t-4 border-red-500">
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6 text-red-500">
              <AlertTriangle size={32} />
            </div>

            <h2 className="text-2xl font-black mb-2 text-white">Simulator Crash</h2>
            <p className="text-brand-gray text-sm mb-8 leading-relaxed">
              Something went wrong while rendering the simulation. This could be due to malformed process data or an unexpected state.
            </p>

            <div className="space-y-3">
              <button
                onClick={this.handleReset}
                className="w-full flex items-center justify-center space-x-2 py-3 bg-brand-blue hover:bg-brand-blue/90 text-white font-bold rounded-xl transition-all shadow-lg shadow-brand-blue/20"
              >
                <RefreshCcw size={18} />
                <span>Reset & Refresh</span>
              </button>

              <Link
                to="/"
                className="w-full flex items-center justify-center space-x-2 py-3 bg-white/5 hover:bg-white/10 text-brand-gray font-bold rounded-xl transition-all"
              >
                <Home size={18} />
                <span>Return Home</span>
              </Link>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <div className="mt-8 p-4 bg-black/40 rounded-lg text-left overflow-auto max-h-40">
                <p className="text-[10px] font-mono text-red-400 leading-tight">
                  {this.state.error?.toString()}
                </p>
              </div>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
