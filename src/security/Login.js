import Input from '../component/UI/Input/Input'
import Button from '../component/UI/Button/Button'
import { useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { auth } from '../store/action/auth';
import { Link } from 'react-router-dom';

const Login =  (props) => {
    let s  = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: false
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 4
                },
                valid: false,
                touched: false
            }
        },
        isSignup: true
    }

    const [loginInfo, setLogin] = useState(s);
    const dispatch = useDispatch();
    const info = useSelector(state => state.auth);

    // useEffect(() => {
    //     checkLogin();
    // });

    const checkValidity  = ( value, rules ) => {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            // isValid = pattern.test( value ) && isValid
            isValid = true
        }

        if ( rules.isNumeric ) {
            const pattern = /^\d+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }

    const inputChangedHandler = ( event, controlName ) => {
        // console.log(...loginInfo.controls);
          const updatedControls = {
              ...loginInfo.controls,
              [controlName]: {
                  ...loginInfo.controls[controlName],
                  value: event.target.value,
                  valid: checkValidity( event.target.value, loginInfo.controls[controlName].validation ),
                  touched: true
              }
          };
          console.log(updatedControls);
          setLogin( { controls: updatedControls } );
        }

    
    const checkLogin = () => {
        if(info.token){
            console.log('check log in if')
            console.log(info.token);
            props.history.push("/resource")
        }

        // console.log("===============================")
        // console.log(info);
    }

    const submitHandler = (event) => {
        event.preventDefault();
        dispatch(auth(loginInfo.controls.email.value, loginInfo.controls.password.value, checkLogin));
    }
   
    const formElementsArray = [];
    for ( let key in loginInfo.controls ) {
          formElementsArray.push( {
              id: key,
              config: loginInfo.controls[key]
          } );
    }


    let form = formElementsArray.map( formElement => (
        <Input
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={( event ) => inputChangedHandler( event, formElement.id )} />
    ) );

    

    return(
        <div>
            <h1>Welcome to the login page</h1>
            <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">Login</Button>
            </form>
            
            {/* <NavLink to="/signup">About</NavLink> */}
            <Link to="/signup">
                <Button btnType="Success">Signup</Button>
            </Link>
        </div>
    )
}

export default Login;