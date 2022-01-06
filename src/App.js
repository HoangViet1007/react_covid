import { Container, Typography } from '@material-ui/core';
import { useEffect, useState, useCallback } from 'react';
import { sortBy } from 'lodash';
import { getCountries, getReportByCountry } from './apis';
import CountrySelector from './components/CountrySelector';
import Highlight from './components/Highlight';
import Summary from './components/Summary';
import moment from 'moment';
import 'moment/locale/vi';

function App() {
    const [countries,setCountries] = useState([]);
    const [selectedCountryId,setSelectedCountryId] = useState('');
    const [report, setReport] = useState([]);

    useEffect(() => {
        getCountries()
                .then((res) => {
                    const countrySort = sortBy(res.data, 'Country')
                    setCountries(countrySort);
                    setSelectedCountryId('vn');
                });
    },[]);

    const handleOnChange = useCallback((e) => {
        setSelectedCountryId(e.target.value);
    },[]);

    useEffect(() => {
        if(selectedCountryId){
            const { Slug } = countries.find(country => country.ISO2.toLowerCase() === selectedCountryId)

            getReportByCountry(Slug)
                .then(res => {
                    // res.data.pop();
                    setReport(res.data)
                });    
        }
    },[countries, selectedCountryId]);
    
    return (
        <>
           <Container>
                <Typography variant='h2' component='h2'>
                    Số liệu COVID-19
                </Typography>
                <Typography>{moment().format('LLLL')}</Typography>
                <CountrySelector
                    countries={countries}
                    handleOnChange={handleOnChange} 
                    value={selectedCountryId} 
                />
                <Highlight 
                    report={report} 
                />
                <Summary selectedCountryId={selectedCountryId} report={report} />
           </Container>
        </> 
    );

}

export default App;