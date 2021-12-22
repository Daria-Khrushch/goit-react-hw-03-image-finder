import React from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

class Searchbar extends React.Component {
  state = {
    searchbar: '',
  };

  handleNameChange = event => {
    this.setState({ searchbar: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = event => {
    event.preventDefault();

    const { searchbar } = this.state;

    if (searchbar.trim() === '') {
      toast.error('Error! Enter something');
      this.setState({ searchbar: '' });
      return;
    }
    this.props.onSubmit(searchbar);
    this.setState({ searchbar: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form onSubmit={this.handleSubmit} className={s.SearchForm}>
          <button type="submit" className={s.SearchFormButton}>
            <span className={s.SearchFormButtonLabel}>Search</span>
          </button>

          <input
            className={s.SearchFormInput}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={this.state.searchbar}
            onChange={this.handleNameChange}
          />
        </form>
      </header>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func,
};

export { Searchbar };
