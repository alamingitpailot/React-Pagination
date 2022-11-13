import logo from './logo.svg';
import './App.css';
import axios from "axios";
import { useEffect, useState } from 'react';
import CryptoList from './components/CryptoList';
import Pagination from './components/Pagination';

function App() {
  const [coinsData, setCoinsData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false"
      );

      setCoinsData(response.data);
    }
    fetchData();
  }, []);

  const lastPostsIndex = currentPage * postsPerPage;
  const firstPostsIndex = lastPostsIndex - postsPerPage;
  const currentPosts = coinsData.slice(firstPostsIndex, lastPostsIndex);

  return (
    <div className="main">
      <h1 style={{ textAlign: 'center', margin: '20px' }}>Crypto Gallery</h1>
      <CryptoList coinsData={currentPosts} />
      <Pagination totalPosts={coinsData.length} postPerPage={postsPerPage} setCurrentPage={setCurrentPage} currentPage={currentPage} />
    </div>
  );
}
export default App;
