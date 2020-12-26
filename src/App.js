import { useState, useEffect } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import covid from './Image/coronavirus.png'
import { FormControl, Select, MenuItem, Card, CardContent } from '@material-ui/core';
import { sortData, prettyPrintStat } from './utilities'
import InfoBox from './Components/InfoBox/InfoBox';
import LineGraph from './Components/LineGraph/LineGraph'
import Map from './Components/Map/Map'
import Table from './Components/Table/Table'
import 'leaflet/dist/leaflet.css'
import numeral from "numeral";



function App() {
  const [countries, setcountries] = useState([]);
  const [country, setcountry] = useState('worldwide')
  const [countryInfo, setcountryInfo] = useState({})
  const [tableData, settableData] = useState([])
  const [casesType, setCasesType] = useState("cases");
  const [mapCountries, setMapCountries] = useState([]);
  const [mapCenter, setMapCenter] = useState({ lat: 34.80746, lng: -40.4796 });
  const [mapZoom, setMapZoom] = useState(2);

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

          const sortedData = sortData(data);
          settableData(sortedData)
          setMapCountries(data)
          setcountries(countries);
        });
    };
    getCountriesData()
  }, []);

  console.log(casesType);

  const onCountryChange = async (e) => {
    const countrycode = e.target.value;

    const url = countrycode === 'worldwide'
      ? 'https://disease.sh/v3/covid-19/all'
      : `https://disease.sh/v3/covid-19/countries/${countrycode}`

    await fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setcountryInfo(data)
        setcountry(countrycode)
        setMapCenter([data.countryInfo.lat, data.countryInfo.long]);
        setMapZoom(2);
      })
  }


  return (
    <div className="app">
      <nav class="navbar navbar-light bg-danger">
        <div class="container-fluid">
          <span class="navbar-brand mb-0 h1 " width="50px" style={{ color: "white" }}>
            <img src={covid} width="50px" alt="Covid" style={{ marginRight: "0.5rem", marginBottom: "0.4rem" }} />
           COVID-19 TRACKER
        </span>
          <FormControl >
            <Select value={country} onChange={onCountryChange} variant="outlined">
              <MenuItem value="worldwide">Worldwide</MenuItem>
              {countries.map((country) => (
                <MenuItem value={country.value}>{country.name}</MenuItem>
              ))}

            </Select>
          </FormControl>
        </div>
      </nav>


      <div className="app-i">
        <InfoBox active={casesType === "cases"}
          onClick={(e) => setCasesType("cases")}
          isRed
          title="Infected"
          cases={prettyPrintStat(countryInfo.todayCases)}
          total={numeral(countryInfo.cases).format("0.0a")}
        />

        <InfoBox active={casesType === "recovered"}
          onClick={(e) => setCasesType("recovered")}
          title="Recovered"
          cases={prettyPrintStat(countryInfo.todayRecovered)}
          total={numeral(countryInfo.recovered).format("0.0a")}
        />

        <InfoBox active={casesType === "deaths"}
          onClick={(e) => setCasesType("deaths")}
          isRed
          title="Deaths"
          cases={prettyPrintStat(countryInfo.todayDeaths)}
          total={numeral(countryInfo.deaths).format("0.0a")}
        />
      </div>


      <div className="Middle-app">

        <div className="app-left">
          <Map casesType={casesType} center={mapCenter} zoom={mapZoom} countries={mapCountries} />
        </div>

        <Card className="app-right">
          <CardContent>
            <h3>Live Cases by Country</h3>
            <Table countries={tableData} />
          </CardContent>
        </Card>
      </div>


      <div>
        <Card style={{ margin: "1.5rem" }}>
          <CardContent>
            <h3>Worldwide new {casesType}</h3>
            <LineGraph casesType={casesType} />
          </CardContent>
        </Card>
      </div>




    </div>
  );
}


export default App;
