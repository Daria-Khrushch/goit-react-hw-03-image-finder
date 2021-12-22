import React from 'react';
import Loader from 'react-loader-spinner';
import cardAPI from '../../api/imagesApi';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './ImageGallery.module.css';

class ImageGallery extends React.Component {
  state = {
    cardImage: [],
    error: null,
    loading: false,
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.searchQuery !== this.props.searchQuery) {
      this.setState({ status: 'pending' });

      cardAPI(this.props.searchQuery, this.state.page)
        .then(cardImage => cardImage.hits)
        .then(cardImage =>
          this.setState({ cardImage: cardImage, status: 'resolved' }),
        );
    }

    if (prevState.page !== this.state.page && this.state.page !== 1) {
      this.setState({ status: 'pending' });

      cardAPI(this.props.searchQuery, this.state.page)
        .then(cardImage => cardImage.hits)
        .then(cardImage =>
          this.setState(prevState => ({
            cardImage: [...prevState.cardImage, ...cardImage],
            status: 'resolved',
          })),
        );
    }
    if (prevState.cardImage !== this.state.cardImage) {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: 'smooth',
      });
    }
  }

  loadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  scrollDown() {
    window.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth',
    });
  }

  onOpenModal = (largeImageUR, alt) => {
    this.setState({
      largeImageURL: largeImageUR,
      alt: alt,
    });
  };

  onCloseModal = () => {
    this.setState({
      largeImageURL: '',
      alt: '',
    });
  };

  render() {
    const { status, largeImageURL } = this.state;
    const images = this.state.cardImage;

    return (
      <>
        {status === 'pending' && (
          <div>
            <Loader
              type="MutatingDots"
              color="#00BFFF"
              height={80}
              width={80}
              timeout={3000}
            />
          </div>
        )}

        {status === 'rejected' && <h1>Oops! Try again.</h1>}

        {status === 'resolved' && (
          <ul className={s.ImageGallery}>
            {images.map(({ id, tags, webformatURL, largeImageURL }) => {
              return (
                <ImageGalleryItem
                  key={id}
                  alt={tags}
                  webformatURL={webformatURL}
                  largeImageURL={largeImageURL}
                  onOpenModal={this.onOpenModal}
                />
              );
            })}
            {this.state.cardImage.length > 0 && (
              <Button onClick={this.loadMoreBtn} />
            )}

            {largeImageURL && (
              <Modal
                largeImageURL={largeImageURL}
                alt={this.state.alt}
                onClose={this.onCloseModal}
              />
            )}
          </ul>
        )}
      </>
    );
  }
}

export { ImageGallery };
