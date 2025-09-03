import'./form-input.styles.scss';

export const FormInput=({label,...otherProps})=>{
    //Note every word in the name should start with a capital letter to let react knows it is a component
    return(//here we {`${otherProps.value.length ?'shrink'}`} when writing in input the display name will go above
    //we did not write >0 bcz it consider 0 as false value : means else
        <div className="group">
            <input className="form-input" {...otherProps}/> 
           { //if label exists then render this label
           label &&( 
           <label 
           className={`${
            otherProps.value.length ?'shrink':''
            } form-input-label`}>
            {label}
            </label>
            )}
        </div>
      
    );

};
export default FormInput;