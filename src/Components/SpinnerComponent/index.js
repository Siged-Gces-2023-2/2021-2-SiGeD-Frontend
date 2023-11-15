import Spinner from 'react-bootstrap/Spinner';
import spinnerStyle from './Style';

function SpinnerComponent() {
  return (
    <div style={spinnerStyle}>
      <Spinner animation="border" variant="secondary" size="lg" />
    </div>
  );
}

export default SpinnerComponent;
