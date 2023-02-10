import RNFS from 'react-native-fs';
import FileViewer from 'react-native-file-viewer';

const Download = url => {
  //   extension = getUrlExtension(url);
  //   console.log(extension);
  fileName = url.split('/').pop();
  localFile = `${RNFS.DocumentDirectoryPath}/${fileName}`;
  console.log(localFile);
  RNFS.downloadFile({fromUrl: url, toFile: localFile}).promise.then(res =>
    FileViewer.open(localFile),
  );
};

export default Download;
