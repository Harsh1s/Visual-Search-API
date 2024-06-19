import React from 'react';
import Config from './config';
import { Amplify, API } from 'aws-amplify';

Amplify.configure({
  API: {
    endpoints: [
      {
        name: 'ImageSearch',
        endpoint: Config.apiEndpoint
      }
    ]
  }
});

// const myInit = {
//   body: { "url": this.state.url, "k": this.state.k }
// };
// this.setState({ completed: 66 });
// API.post('ImageSearch', 'postURL', myInit)
//   .then(response => {
//     this.setState({
//       pictures: response.images.map(function (elem) {
//         let picture = {};
//         picture.img = elem;
//         picture.cols = 1;
//         return picture;
//       })
//     });
//     this.setState({ completed: 100 });
//     console.log(this.state.pictures);
//   })
//   .catch(error => {
//     console.log(error);

// getBase64(file, cb) {
//   // convert image to base64
//   let reader = new FileReader();
//   reader.readAsDataURL(file);
//   reader.onload = function () {
//     cb(reader.result.replace(/^data:image\/[a-z]+;base64,/, ""));
//   };
//   reader.onerror = function (error) {
//     console.log('Error: ', error);
//   };

// const myInit = {
//   body: { "base64img": imgBase64, "k": this.state.k }
// };
// this.setState({ completed: 66 });
// API.post('ImageSearch', 'postImage', myInit)
//   .then(response => {
//     this.setState({
//       pictures: response.images.map(function (elem) {
//         let picture = {};
//         picture.img = elem;
//         picture.cols = 1;
//         return picture;
//       })
//     });
//     this.setState({ completed: 100 });
//     console.log(this.state.pictures);
//   })
//   .catch(error => {
//     console.log(error);
//   })

const App = () => {
  return (
    <div>
      <h1>Image Search</h1>
    </div>
  );
};

export default App;
