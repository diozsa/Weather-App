import React, { useState } from "react";
import Message from "../common/Message";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";


/** Login form.
 *
 * Shows form and manages update to state on changes.
 * On submission:
 * - calls login function prop
 * - redirects to / route

 */

const LoginSignupForm = ({ login, signup, isLoginMode, toggleLoginMode }) => {

  const initialValues = {
    username: '',
    password: ''
  }
  const [formData, setFormData] = useState(initialValues);
  const [formErrors, setFormErrors] = useState([]);

  /** Handle form submit:
 * Calls login func prop and, if unsuccessful renders <Message>.
 */
  async function handleSubmit(evt) {
    evt.preventDefault();
    let result;

    if (isLoginMode) {
      // Login mode
      result = await login(formData);
    } else {
      // Signup mode
      result = await signup(formData);
    }
    
    if (result.errors) {
      setFormErrors(result.errors);
    }
  }

  /** Update form data field */
  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({ ...data, [name]: value }));
  }

  return (
    <Form onSubmit={handleSubmit}
      className="border border-3 p-4 rounded-2">
        <Form.Group className="mb-3" controlId="formBasicUsername">
          <Form.Control
            type="text"
            placeholder="Enter Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Control
            type="password"
            placeholder="Enter Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* <Button variant="outline-secondary" type="submit" size="lg">
          Submit
        </Button> */}
      <div className="d-flex justify-content-end">
        <Button variant="info" type="submit" className="me-3">
        {isLoginMode ? "Log In" : "Sign Up"}
      </Button>

      <Button variant="secondary" onClick={toggleLoginMode}>
        
        {isLoginMode ? "Switch to Sign Up" : "Switch to Log In"}
        </Button>


      </div>
        {formErrors.length
          ? <Message type="danger" messages={formErrors} />
          : null}

      </Form>
  );
}

export default LoginSignupForm;