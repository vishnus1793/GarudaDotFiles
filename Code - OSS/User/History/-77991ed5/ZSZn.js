import React, { useState, useEffect } from 'react';
import {
  CCard,
  CCardHeader,
  CCardBody,
  CTable,
  CTableHead,
  CTableRow,
  CTableHeaderCell,
  CTableBody,
  CTableDataCell,
  CButton,
  CDropdown,
  CDropdownToggle,
  CDropdownMenu,
  CDropdownItem,
} from '@coreui/react';

const TrainStatus = () => {
  const [pnrStatus, setPnrStatus] = useState(null); // State to store the PNR JSON data

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
        setPnrStatus(data); // Set the data directly instead of converting to string
      } catch (error) {
        console.error('Error fetching the PNR status:', error);
        setPnrStatus({ error: 'Error fetching PNR status' }); // Handle error by setting an error state
      }
    };

    fetchPnrStatus();
  }, []);

  // Helper function to convert JSON to CSV
  const convertToCSV = (objArray) => {
    const array = typeof objArray !== 'object' ? JSON.parse(objArray) : objArray;
    let str = '';

    const headers = 'Passenger Name,Status,Coach,Seat\n'; // Define headers
    str += headers;

    // Add rows from passengers data
    array.forEach((passenger) => {
      const row = [
        passenger.name || 'N/A',
        passenger.current_status,
        passenger.coach_position || 'N/A',
        passenger.berth_number || 'N/A',
      ].join(',');

      str += row + '\n';
    });

    return str;
  };

  // Function to download CSV file
  const downloadCSV = () => {
    if (!pnrStatus || !pnrStatus.passengers) return;

    const csv = convertToCSV(pnrStatus.passengers);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `pnr_status_${pnrStatus.pnr}.csv`);
    a.click();
  };

  // Function to download JSON file
  const downloadJSON = () => {
    if (!pnrStatus) return;

    const json = JSON.stringify(pnrStatus, null, 2); // Pretty print JSON
    const blob = new Blob([json], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.setAttribute('href', url);
    a.setAttribute('download', `pnr_status_${pnrStatus.pnr}.json`);
    a.click();
  };

  // Function to render the table if pnrStatus is available
  const renderTable = (pnrStatus) => {
    if (!pnrStatus || pnrStatus.error) {
      return <p>{pnrStatus ? pnrStatus.error : 'Loading...'}</p>;
    }

    const passengerData = pnrStatus.passengers || []; // Assuming passengers data is an array

    return (
      <>
        <CTable striped hover>
          <CTableHead>
            <CTableRow>
              <CTableHeaderCell>#</CTableHeaderCell>
              <CTableHeaderCell>Passenger Name</CTableHeaderCell>
              <CTableHeaderCell>Status</CTableHeaderCell>
              <CTableHeaderCell>Coach</CTableHeaderCell>
              <CTableHeaderCell>Seat</CTableHeaderCell>
            </CTableRow>
          </CTableHead>
          <CTableBody>
            {passengerData.map((passenger, index) => (
              <CTableRow key={index}>
                <CTableDataCell>{index + 1}</CTableDataCell>
                <CTableDataCell>{passenger.name || 'N/A'}</CTableDataCell>
                <CTableDataCell>{passenger.current_status}</CTableDataCell>
                <CTableDataCell>{passenger.coach_position || 'N/A'}</CTableDataCell>
                <CTableDataCell>{passenger.berth_number || 'N/A'}</CTableDataCell>
              </CTableRow>
            ))}
          </CTableBody>
        </CTable>

        {/* Dropdown to choose download format */}
        <CDropdown>
          <CDropdownToggle color="primary">Download</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem onClick={downloadCSV}>Download as CSV</CDropdownItem>
            <CDropdownItem onClick={downloadJSON}>Download as JSON</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
      </>
    );
  };

  return (
    <>
      <CCard>
        <CCardHeader>PNR Status</CCardHeader>
        <CCardBody>{pnrStatus ? renderTable(pnrStatus) : <p>Loading...</p>}</CCardBody>
      </CCard>
    </>
  );
};

export default TrainStatus;
