import React, { useState, useEffect } from 'react'

import { Form } from "./components/Form"
import { Content } from "./components/Content"
import countryService from "./services/country"

function App() {
  const [countries, setCountries] = useState([])
  const [countriesList, setCountriesList] = useState([])
  const [newFilter, setNewFilter] = useState("")

  useEffect(() => {
    countryService
      .getAllCountries()
      .then(allCountries => {
        setCountriesList(allCountries)
      })
  }, [])

  const handleFilterChange = (event) => {
    setNewFilter(event.target.value.toLowerCase())
    if (newFilter) {
      const filteredCountries = countriesList.filter(country => country.name.common.toLowerCase().includes(newFilter))
      setCountries(filteredCountries)
    }
  }

  return (
    <div>
      <Form newFilter={newFilter} handleFilterChange={handleFilterChange} />
      <Content countries={countries} setCountries={setCountries} />
    </div>
  )
}

export default App
