import RNFetchBlob from 'rn-fetch-blob';

const Download = (baseuri, uri) => {
  RNFetchBlob.config({
    fileCache: true,
  })
    .fetch('GET', encodeURI(baseuri + uri))
    .then(res => {
      console.log('saved at ' + res.path());
    });
};

export default Download;
