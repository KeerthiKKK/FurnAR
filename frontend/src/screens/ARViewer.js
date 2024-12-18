// ARViewer.js
import React from 'react';
import '@google/model-viewer';

const ARViewer = ({ modelUrl }) => {
  return (
    <model-viewer
      src={modelUrl}
      ar
      ar-modes="scene-viewer quick-look"
      camera-controls
      auto-rotate
      alt="A 3D model"
      style={{ width: '100%', height: '500px' }}
      ios-src={modelUrl.replace('.glb', '.usdz')}
    >
    </model-viewer>
  );
};



export default ARViewer;

