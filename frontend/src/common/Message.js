import React from "react";
import Alert from "react-bootstrap/Alert"
/** Presentational component for showing bootstrap-style alerts.
 *
 * { LoginForm, SignupForm, SearchForm } -> Message
 **/

function Message({ type = "danger", messages = [] }) {
  // console.debug("Alert", "type=", type, "messages=", messages);

  return (
    <div>
      <Alert variant={type}>
        {messages.map(error => (
          <p className="mb-0 small" key={error}>
            {error}
          </p>
        ))}
      </Alert>
    </div>
  );
}

export default Message;
