import Alert from '@mui/material/Alert';
import './alert.css'

export default function Alerts(props) {
   
    return (  
        <div className='alert'>
            {
                props.alert &&
                <Alert severity={props.alert.type}>{props.alert.message}</Alert>
            }
        </div>
    );
}
