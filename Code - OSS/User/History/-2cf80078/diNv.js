import React, { useState, useEffect } from 'react';
import { CCard, CCardHeader, CCardBody } from '@coreui/react';
import { DocsLink } from 'src/components';

const Typography = () => {
  const [pnrStatus, setPnrStatus] = useState('');

  useEffect(() => {
    const fetchPnrStatus = async () => {
      try {
        const response = await fetch('https://irctc-indian-railway-pnr-status.p.rapidapi.com/getPNRStatus/8319961705', {
          method: 'GET',
          headers: {
            'x-rapidapi-key': 'f803adb7camsh82b2ace449d051dp122a03jsndb3bf731332c',
            'x-rapidapi-host': 'irctc-indian-railway-pnr-status.p.rapidapi.com',
          },
        });
        
        const data = await response.json();
        setPnrStatus(JSON.stringify(data, null, 2)); // Convert the data to string for display
      } catch (error) {
        console.error('Error fetching the PNR status:', error);
        setPnrStatus('Error fetching PNR status');
      }
    };

    fetchPnrStatus();
  }, []); // Empty dependency array ensures this runs once after component mounts

  return (
    <>
      <CCard>
        <CCardHeader>PNR Status</CCardHeader>
        <CCardBody>
          <pre>{pnrStatus}</pre> {/* Display the fetched PNR status here */}
        </CCardBody>
      </CCard>
    </>
  );
};

export default Typography;
