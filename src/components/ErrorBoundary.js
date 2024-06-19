
import { Component } from "react";


class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) return <div className='flex justify-center items-center'>
            <span className='rounded-lg p-4 border border-danger text-danger bg-warning-50 my-4 uppercase'>
                Error de renderizado
            </span>
        </div>

        return this.props.children
    }
}

export default ErrorBoundary;