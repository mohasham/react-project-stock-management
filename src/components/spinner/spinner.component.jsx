//importing styled components we have made
import { SpinnerContainer,SpinnerOverlay } from './spinner.styles';
const Spinner=()=>(
    <SpinnerOverlay data-testid='spinner'>
        <SpinnerContainer/>
    </SpinnerOverlay>
);
export default Spinner;