import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Searchbar } from '../SearchBar/Searchbar';
import { ImageGallery } from '../ImageGallery/ImageGallery';

class App extends React.Component {
  state = {
    imageName: '',
    searchbar: '',
  };

  handleFormSubmit = imageName => {
    this.setState({ imageName });
  };

  render() {
    return (
      <div>
        <Searchbar onNameSabmit={this.handleFormSubmit} />

        <ImageGallery imageName={this.state.imageName}></ImageGallery>

        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}

export default App;
