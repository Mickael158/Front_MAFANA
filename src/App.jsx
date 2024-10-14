import { useEffect, useState } from 'react';
import Root from './Components/Router/Router';
import './index.css';

function App() {
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    setLoading(false);
};

  useEffect(() => {
      fetchData();
  }, []);
  return (
    <>
      {loading ? ( 
          <div className="container-loader">
              <div className='loader'></div>
          </div>
          
      ) : (
        <Root />
      )}
    </>
  )
}

export default App
