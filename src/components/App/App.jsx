import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from '../SearchBar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';

class App extends React.Component {
  state = {
    searchQuery: '',
    searchbar: '',
  };

  handleFormSubmit = searchQuery => {
    this.setState({ searchQuery });
  };

  render() {
    return (
      <div>
        <Searchbar onSubmit={this.handleFormSubmit} />

        <ImageGallery searchQuery={this.state.searchQuery} />

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
