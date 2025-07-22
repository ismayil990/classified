// frontend GSM.jsx
import { useEffect, useState } from 'react';
import axios from 'axios';

export default function GSM() {
  const [brands, setBrands] = useState([]);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await axios.get('http://localhost:3001/brands');
        setBrands(res.data);
        console.log(res.data)
      } catch (error) {
        console.error('Failed to fetch brands', error);
      }
    };
    fetchBrands();
  }, []);

  return (
    <div>
      <h1>Brands</h1>
   
    </div>
  );
}
