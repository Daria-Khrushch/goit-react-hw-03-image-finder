import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

function Button({ onClick }) {
  return (
    <button type="button" className={s.Button} onClick={onClick}>
      Load more
    </button>
  );
}

Button.propTypes = {
  loadMoreBtn: PropTypes.func,
};

export { Button };
