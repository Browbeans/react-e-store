import { ChangeEvent, CSSProperties, useContext, useState } from 'react';
import { Button, TextField } from "@material-ui/core";
import { LoginContext } from '../../contexts/User/loginContext';
import '../../style/Entry.css'
import { useHistory } from 'react-router-dom';

function HandleLogin() {
    const { handleEmailLogin, handlePasswordLogin, loginRequest, loginError, errorTxt } = useContext(LoginContext);
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const history = useHistory()

    const handleEmailInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
            setEmailError("Field cannot be empty");
        }
          else {
            setEmailError("")
            handleEmailLogin(e);
          }
    }

    const handlePasswordInput = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === "") {
              setPasswordError("Field cannot be empty");
          }
          else {
            setPasswordError("")
            handlePasswordLogin(e);
          }
    }

    const handleClick = () => {
        loginRequest()
    }

    const handleLoginClick = async () => {
        const loggedIn = await loginRequest()
        if (loggedIn) {
            history.push("/user-profile")
        }
    }

    return(
        <div className="form-container">
            <h2 className="entry-title">Login</h2>
            <div>
                <TextField
                    className="form-inputs"
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    required
                    id="email"
                    type="email"
                    label="Email Adress"
                    name="email"
                    key="email"
                    autoComplete="email"
                    autoFocus
                    onChange={handleEmailInput}
                    helperText={emailError}
                    error={Boolean(emailError)}
                />
                <TextField
                    fullWidth
                    variant="outlined"
                    margin="normal"
                    required
                    id="password"
                    type="password"
                    label="password"
                    name="password"
                    key="password"
                    autoComplete="password"
                    autoFocus
                    onChange={handlePasswordInput}
                    helperText={passwordError}
                    error={Boolean(passwordError)}
                />
                {loginError 
                ?
                <p style={{ color: "red" }}>{errorTxt}</p>
                :
                <></>
                }
                {window.location.pathname === '/checkout' ?
                    <Button
                        onClick={handleClick}
                        style={btn}
                        variant="contained"
                        >
                        Login
                    </Button>
                :

                    <Button
                        onClick={handleLoginClick}
                        style={btn}
                        variant="contained"
                        >
                        Login
                    </Button>
                }
             </div>
        </div>
    );
}

const btn: CSSProperties = {
    alignSelf: "center",
    borderRadius: ".5rem",
    outline: "none",
    fontSize: "1rem",
    background: "#56EAC6",
    color: "#fff",
    fontWeight: "bold",
    border: "none",
    cursor: "pointer",
    padding: "0.5rem",
    width: '100%',
    margin: "1rem 0rem"
  };

export default HandleLogin