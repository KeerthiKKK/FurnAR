/* import React, { useEffect, useState } from 'react';

export default function ARButton({ id }) {
  const [modelUrl, setModelUrl] = useState(null);

  useEffect(() => {
    // Fetch the product details from the Django backend to get the model file URL
    fetch(`/api/products/${id}/`) // Adjust this URL to your API endpoint
      .then(response => response.json())
      .then(data => {
        setModelUrl(data.modelFile); // Set the URL for the 3D model
      });
  }, [id]);

  if (!modelUrl) {
    return <div>Loading...</div>; // Show loading state until the model URL is fetched
  }

  return (
    <model-viewer
      src={modelUrl} // Use the dynamically fetched model URL
      alt="A 3D model of a chair"
      auto-rotate
      camera-controls
      ar
      style={{ width: '100%', height: '500px' }}
    >
     {/*  <a href={modelUrl} rel="ar" target="_blank">
        <button>View in AR</button>
      </a> */
/*     </model-viewer>
  );
}
 */ 