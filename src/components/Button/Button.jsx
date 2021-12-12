import React from 'react';
import PropTypes from 'prop-types';
import s from './Button.module.css';

function Button({ LoadMoreBtn }) {
  return (
    <button type="button" className={s.Button} onClick={LoadMoreBtn}>
      Load more
    </button>
  );
}

Button.propTypes = {
  LoadMoreBtn: PropTypes.func.isRequired,
};

export { Button };
