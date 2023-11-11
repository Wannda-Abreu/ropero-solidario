import Alert from 'react-bootstrap/Alert';
import "./alert.css";

interface AlertComponentProps {
  heading: string;
  message: string;
  additionalMessage?: string;
}

function AlertComponent(props: AlertComponentProps) {
  const { heading, message, additionalMessage } = props;

  return (
    <Alert className='alert'>
      <Alert.Heading><h5>{heading}</h5> </Alert.Heading>
      <p>
        {message}
      </p>
      <hr />
      <p className="mb-5">
        {additionalMessage}
      </p>
    </Alert>
  );
}

export default AlertComponent;