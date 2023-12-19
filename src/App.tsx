import { useEffect, useState } from "react";

const App = ()=>  {
const [data, setData ] = useState<any>('');

useEffect(()=> {
const fetchData = async () => {
    const response = await fetch('http://localhost:8080/country/Bulgaria');
    if(!response.ok) return;
    const data = await response.json();
    console.log(data)
    setData(data);
};
fetchData();
},[]);
  return (
    <div>
     <h1>{data[0].Continent}</h1>
    </div>
  );
}

export default App;
