import Alert from 'react-bootstrap/Alert';
import "./alert.css"

function AlertComponent() {
  return (
    <Alert variant="success" className='alert'>
      <Alert.Heading><h5>¡Cita Confirmada!</h5> </Alert.Heading>
      <p>
      ¡Tu cita está confirmada! En caso de que no puedas asistir, por favor 
      contáctanos para reprogramar o cancelar. 
      </p>
      <hr />
      <p className="mb-0">
       Lorem ipsum dolor sit amet, consectetur adipiscing ipsu
      </p>
    </Alert>
  );
}

export default AlertComponent;