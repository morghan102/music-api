import React from "react";
import PropTypes from 'prop-types';
import { Row, Col } from "react-bootstrap";

export default class ErrorBoundary extends React.Component {
    state = {
        error: '',
        eventId: '',
        // errorInfo: '',
        hasError: false,
      };

    static getDerivedStateFromError(error) {
        // Update state so the next render will show the fallback UI.
        return { hasError: true, error };
    }//for rendering fallback UI

    componentDidCatch(error, errorInfo) {//to get access to the error that was thrown
        console.log({ error, errorInfo });
        this.setState({ errorInfo });
    }
    // componentDidCatch() receives the error, which represents the error that was thrown and errorInfo which is an object with a 
    // componentStack key containing information about which component threw the error. Here we logged the error and also update the
    // state with the errorInfo. It’s totally up to you what you want to do with these two.

    render() {
        const { hasError } = this.state; //errorinfo
        if (hasError) {
            return (
                // my-5 might do nothing
                <Row className="card my-5">
                    <Col className="card-body">
                        <p>There was an error. {' '}
                            <span
                                style={{ cursor: 'pointer', color: '#0077FF' }}
                                onClick={() => window.location.reload()}
                            >
                                Reload this page
                            </span>{' '}
                        </p>
                    </Col>
                </Row>
            );
        }
        return this.props.children; // represents whatever component that this error boundary encloses.
    }
}
ErrorBoundary.propTypes = {
    children: PropTypes.oneOfType([PropTypes.object, PropTypes.array]).isRequired,
};

// wont catch these types of errors:
// Errors inside event handlers.
// Errors in asynchronous code (e.g. setTimeout or requestAnimationFrame callbacks).
// Errors that happen when you’re doing some server-side rendering.
// Errors are thrown in the error boundary itself (rather than its children). You could have another error boundary catch this error, though.