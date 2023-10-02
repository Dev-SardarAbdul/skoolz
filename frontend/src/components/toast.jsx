import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

function ToastComp({ header, text, variant }) {
  const [show, setShow] = useState(true);

  return (
    <ToastContainer position="top-center" className="p-3" style={{ zIndex: 1 }}>
      <Toast
        onClose={() => setShow(false)}
        show={show}
        delay={3500}
        className="d-inline-block m-1"
        aud
      >
        <Toast.Header>
          <strong className="me-auto">{header}</strong>
        </Toast.Header>
        <Toast.Body>{text}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}

export default ToastComp;
