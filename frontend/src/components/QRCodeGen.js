/* import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGen = ({ url }) => {
  return <QRCodeCanvas value={url} size={128} />;
  
};

export default QRCodeGen;
 */

// QRCodeGen.js
import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';

const QRCodeGen = ({ modelUrl }) => {
  return (
<QRCodeCanvas 
  value={modelUrl}
  size={198}
  bgColor="#ffffff" // White background
  fgColor="#000000" // Black foreground
  renderAs="canvas"
/>
  );
};

export default QRCodeGen;
