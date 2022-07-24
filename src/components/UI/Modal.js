import { Fragment } from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";


const Backdrop = (props) => {
  return <div className={classes.backdrop} onClick={props.onHideCart} />;
};

const ModalOverlay = (props) => {
  return (
    <div className={classes.modal}>
      <div className={classes.context}>{props.children}</div>
    </div>
  );
};

const portalElement = document.getElementById("overlays");


export default function Modal(props) {

  return (
    <Fragment>
      {ReactDOM.createPortal(
        <Backdrop onHideCart={props.onHideCart} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay>{props.children}</ModalOverlay>,
        portalElement
      )}
    </Fragment>
  );
}
