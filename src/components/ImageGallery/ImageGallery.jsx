import React from 'react';
import Loader from 'react-loader-spinner';
import cardAPI from '../../api/images-api';
import { Button } from '../Button/Button';
import { Modal } from '../Modal/Modal';

import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import s from './ImageGallery.module.css';

class ImageGallery extends React.Component {
  state = {
    cardImage: [],
    error: null,
    status: 'idle',
    page: 1,
  };

  componentDidUpdate(prevProps, prevState) {
    const prevName = prevProps.imageName;
    const nextName = this.props.imageName;

    if (prevName !== nextName) {
      this.setState({ status: 'pending', page: 1 });

      cardAPI
        .fetchCard(nextName, this.state.page)
        .then(cardImage => {
          if (cardImage.total === 0) {
            this.setState({
              error: `Not found ${nextName}`,
              status: 'rejected',
            });
          } else {
            this.setState(prevState => ({
              cardImage: cardImage.hits,
              status: 'resolved',
            }));
          }
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }

    if (this.state.page !== 1) {
      cardAPI
        .fetchCard(this.props.imageName, this.state.page)
        .then(cardImage =>
          this.setState(prevState => ({
            cardImage: [...prevState.cardImage, ...cardImage.hits],
            status: 'resolved',
          })),
        )
        .then(() => {
          window.scrollTo({
            top: document.documentElement.scrollHeight,
            behavior: 'smooth',
          });
        })
        .catch(error => this.setState({ error, status: 'rejected' }));
    }
  }

  loadMoreBtn = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

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
    console.log(this.state.cardImage);
    const { status, largeImageURL } = this.state;
    const images = this.state.cardImage;

    if (status === 'idle') {
      return <div>No images yet...</div>;
    }

    if (status === 'pending') {
      return (
        <div>
          <Loader
            type="MutatingDots"
            color="#00BFFF"
            height={80}
            width={80}
            timeout={3000}
          />
        </div>
      );
    }

    if (status === 'resolved') {
      return (
        <ul className={s.ImageGallery}>
          {images.map(img => {
            return (
              <ImageGalleryItem
                key={img.id}
                alt={img.tags}
                webformatURL={img.webformatURL}
                largeImageURL={img.largeImageURL}
                onOpenModal={this.onOpenModal}
              />
            );
          })}

          <Button LoadMoreBtn={this.loadMoreBtn} />

          {largeImageURL && (
            <Modal
              largeImageURL={largeImageURL}
              alt={this.state.alt}
              onClose={this.onCloseModal}
            />
          )}
        </ul>
      );
    }

    if (status === 'rejected') {
      return <h1>Oops! Try again.</h1>;
    }
  }
}

export { ImageGallery };
