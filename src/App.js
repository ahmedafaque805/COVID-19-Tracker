import { useState, useEffect } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import covid from './Image/coronavirus.png'
import { FormControl, Select, MenuItem, Card , CardContent } from '@material-ui/core';
import InfoBox from './Components/InfoBox/InfoBox';
import Table from './Components/Table/Table'



function App(){
const [countries, setcountries] = useState([]);
const [country, setcountry] = useState('worldwide')
const [countryInfo, setcountryInfo] = useState({})
const [tableData, settableData] = useState([])

useEffect(() => {
  fetch('https://disease.sh/v3/covid-19/all')
  .then((response) => response.json())
  .then((data) => {
    setcountryInfo(data)
  })
}, [])

useEffect(() => {
  const getCountriesData = async () => {
    await fetch('https://disease.sh/v3/covid-19/countries')
      .then((response) => response.json())
      .then((data) => {

        const countries = data.map((country) => (
          {
            name: country.country,
            value: country.countryInfo.iso3
          }));
          setcountries(countries);
          settableData(data)
      });
  };
  getCountriesData()
}, []);

const onCountryChange = async (e) =>{
  const countrycode = e.target.value;
  setcountry(countrycode)
  
  const url = countrycode === 'worldwide' 
  ? 'https://disease.sh/v3/covid-19/all' 
  : `https://disease.sh/v3/covid-19/countries/${countrycode}`
  
  await fetch(url)
  .then((response) => response.json())
  .then((data) => {
    setcountryInfo(data)
  })
}
  
  
return (
  <div className="app">
    <nav class="navbar navbar-light bg-danger">
      <div class="container-fluid">
        <span class="navbar-brand mb-0 h1" width="50px" style={{ color: "white" }}>
          <img src={covid} width="50px" alt="Covid" style={{ marginRight: "0.5rem", marginBottom: "0.4rem" }} />
          COVID-19 TRACKER
        </span>
        <FormControl>
          <Select value={country} onChange={onCountryChange}  variant="outlined">

            <MenuItem value="worldwide">Worldwide</MenuItem>
            {countries.map((country) => (
            <MenuItem value={country.value}>{country.name}</MenuItem>
            ))}

          </Select>
        </FormControl>
      </div>
    </nav>

    
    <div className="app-i">
      <InfoBox title="Coronavirus Cases" cases={countryInfo.todayCases} total={countryInfo.cases} />
      <InfoBox title="Recovered" cases={countryInfo.todayRecovered} total={countryInfo.recovered} />
      <InfoBox title="Deaths" cases={countryInfo.todayDeaths} total={countryInfo.deaths} />
    </div>


    <div className="Middle-app">

    <div className="app-left">
      hello hi map
    </div>

    <Card className="app-right">
      <CardContent>
        <h3>Live Cases by Country</h3>
        <Table countries={tableData} />
        <h3>Worldwide new Cases</h3>
      </CardContent>
    </Card>
    </div>




  </div>
);
}


export default App;
