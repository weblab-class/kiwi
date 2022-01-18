import React from "react";
import Foundation from 'foundation-sites';
import { get, post } from "../../utilities"
import "./uploadPic.css";
/**
 * ReactJS implementation of http://jsfiddle.net/LvsYc/
 * @uses Foundation 6
 * @see http://stackoverflow.com/questions/4459379/preview-an-image-before-it-is-uploaded
 */
 class ImageFile extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      id : this.props.userId,
      imageURI : props.initial_img === "" ? null : props.initial_img
    }
  }


  componentDidUpdate(prevProps) {
    if (prevProps.initial_img != this.props.initial_img){
      this.setState({imageURI: this.props.initial_img})
    }
  }

  
  buildImgTag(){
    let imgTag = null;
    if (this.state.imageURI !== null) {
      imgTag = (<img className="circular--portrait" src={this.state.imageURI}></img>);
    }
    return imgTag;
  }
  
  readURI(e){
    if(e.target.files && e.target.files[0]){
      let reader = new FileReader();
      reader.onload = function(ev){
        post("/api/image", {value: ev.target.result})
        this.setState({imageURI:ev.target.result});
      }.bind(this);
      reader.readAsDataURL(e.target.files[0]);
    }
  }
  
  handleChange(e){
    this.readURI(e); 
    if (this.props.onChange !== undefined)
      this.props.onChange(e); // propagate to parent component
  }

  render() {
    const imgTag = this.buildImgTag();

    return <div className = "image-position">
            <input
              id={this.state.id}
              type="file"
              onChange={this.handleChange.bind(this)}
             hidden/>
            {imgTag}
            <label
              htmlFor={this.state.id}
               className = "image-button">
              +
            </label>
          </div>;
  }
}

export default ImageFile;