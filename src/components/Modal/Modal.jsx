import React from 'react';
import { createPortal } from 'react-dom';
import s from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

class Modal extends React.Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onEscClick);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onEscClick);
  }

  //-----------------закрыть по ESС---------------------
  onEscClick = event => {
    const ESC_KEY_CODE = 'Escape';

    if (event.code === ESC_KEY_CODE) {
      this.props.onClose();
    }
  };

  //-------------закрыть по onBackdropClick(event)----------
  onBackdropClick = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    return createPortal(
      <div className={s.Overlay} onClick={this.onBackdropClick}>
        <div className={s.Modal}>
          <img src={this.props.largeImageURL} alt={this.props.alt} />
        </div>
      </div>,
      modalRoot,
    );
  }
}

export { Modal };
