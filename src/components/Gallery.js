import React, { Component } from "react";
import { Picture } from "./Picture";
import { ModalPicture } from "./ModalPicture";
import Masonry from "react-masonry-component";
import "./Gallery.css";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      photos: [],
      isOpen: false,
      author: "",
    };
  }

  openImage = (imgInfo) => {
    const urlInfo = `https://api.flickr.com/services/rest/?method=flickr.photos.getInfo&api_key=688a2342285cc2ddc85a957eb56a7c19&photo_id=${imgInfo.id}&format=json&nojsoncallback=1`;

    fetch(urlInfo)
      .then((r) => r.json())
      .then((resp) => {
        this.setState({
          isOpen: true,
          author: resp.photo.owner.username,
          path: `https://farm${imgInfo.farm}.staticflickr.com/${imgInfo.server}/${imgInfo.id}_${imgInfo.secret}_z.jpg`,
        });
      });
  };

  componentDidMount() {
    const url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=688a2342285cc2ddc85a957eb56a7c19&text=${this.props.type}&per_page=10&format=json&nojsoncallback=1`;

    fetch(url)
      .then((r) => r.json())
      .then((resp) => {
        this.setState({
          photos: resp.photos.photo,
        });
      });
  }

  render() {
    const images = this.state.photos.map((el, i) => {
      return (
        <Picture
          key={i}
          farm={el.farm}
          server={el.server}
          id={el.id}
          secret={el.secret}
          openImage={this.openImage}
        />
      );
    });
    return (
      <section>
        <Masonry className={"gallery"} elementType={"ul"}>
          {images}
        </Masonry>
        {this.state.isOpen && (
          <ModalPicture author={this.state.author} path={this.state.path} />
        )}
      </section>
    );
  }
}

export { Gallery };
