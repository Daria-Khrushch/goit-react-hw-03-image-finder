import React from 'react';
import { toast } from 'react-toastify';
import s from './Searchbar.module.css';

class Searchbar extends React.Component {
  state = {
    searchbar: '',
  };

  handleNameChange = event => {
    this.setState({ searchbar: event.currentTarget.value.toLowerCase() });
  };

  handleSabmit = event => {
    event.preventDefault();

    if (this.state.searchbar.trim() === '') {
      toast.error('Error! Еnter something');
      return;
    }
    this.props.onNameSabmit(this.state.searchbar);
    this.setState({ searchbar: '' });
  };

  render() {
    return (
      <header className={s.Searchbar}>
        <form onSubmit={this.handleSabmit} className={s.SearchForm}>
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

export { Searchbar };
