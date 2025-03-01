"use client"
import React, { useEffect } from 'react';
import Swal from 'sweetalert2'

const SaleAlert = () => {
  useEffect(() => {
    // Trigger SweetAlert when the component is mounted
    Swal.fire({
      title: "This Website is for Sale Now!",
      text: "Website Development has been stopped because client does not pay developer, If you're interested, contact me at: tayyebbutt966@gmail.com",
      icon: "info",
      confirmButtonText: "Close"
    });
  }, []);

  return null; // No need to return JSX
};

export default SaleAlert;
