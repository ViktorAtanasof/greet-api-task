import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [famousPeople, setFamousPeople] = useState();
  const restEndpoint = "http://localhost:5000/getData";

  useEffect(() => {
    async function fetchApiData () {
      try {
        const response = await fetch(restEndpoint);
        if(response.status !== 200) {
          throw new Error('Network response was not ok');
        };
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchApiData();
  }, []);

  return (
    <>
      <h1>Hello</h1>
    </>
  );
}

export default App;
