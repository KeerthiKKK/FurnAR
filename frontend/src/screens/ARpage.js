/* import React, { useState, useEffect } from 'react';
import ARViewer from './ARViewer';
import QRCodeGen from "../components/QRCodeGen";
import { useParams } from 'react-router-dom';
import "../styles/ARPage.css";

const ARPage = () => {
  const [modelUrl, setModelUrl] = useState('');
  const { id } = useParams();
  const arViewerUrl = `http://192.168.20.68:3000/productspage/${id}/arpage`;

  // Fetch model when the ID changes
  useEffect(() => {
    const fetchModel = async () => {
      try {
        // Fetch the specific product by ID
        const response = await fetch(`http://192.168.20.68:3000/api/products/${id}`);
        const data = await response.json();
        console.log(data); // Log the entire response

        if (data && data.modelFile) {
          const fullModelUrl = `http://192.168.20.68:3000${data.modelFile}`;
          console.log("Fetched data:", data);
console.log("Model file path:", data.modelFile);

          if (fullModelUrl !== modelUrl) {
            setModelUrl(fullModelUrl);  // Set the model file path if it changes
            console.log(`Model URL: ${fullModelUrl}`);
          }
        } else {
          console.error('Model file not found for this product.');
        }
      } catch (error) {
        console.error('Error fetching model:', error);
      }
    };

    fetchModel();
  }, [id]);  // Dependency array updated to include modelUrl

  return (
    <div className='scanqr'>
      <h1>Scan QR to View in AR</h1>
      <QRCodeGen url={arViewerUrl} />
      {modelUrl && <ARViewer modelUrl={modelUrl} />}
    </div>
  );
};

export default ARPage; */

import React from 'react';
import { useLocation } from 'react-router-dom';
import ARViewer from './ARViewer';
import QRCodeGen from "../components/QRCodeGen"
import "../styles/ARPage.css";

const ARPage = () => {
  const query = new URLSearchParams(useLocation().search);
  const modelFilename = query.get('model');  // Get model filename from query parameter
  console.log("Model filename:", modelFilename);

  
  const modelUrl = `http://192.168.176.67:8000/media/models/${modelFilename}`;


  const arViewerUrl = `http://192.168.176.67:3000/ar-viewer?model=${modelFilename}`;

  return (
    <div className='scanqr'>
      <h1>Scan QR to View in AR</h1>
      <QRCodeGen modelUrl={arViewerUrl} />
      <ARViewer modelUrl={modelUrl} />
    </div>
  );
};

export default ARPage;