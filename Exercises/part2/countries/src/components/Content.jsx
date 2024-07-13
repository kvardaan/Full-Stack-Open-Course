import { Country } from './Country'

export const Content = ({ countries, setCountries }) => {
  if (countries.length > 10) {
    return (
      <p>
        Too many matches, specify another filter
      </p>
    )
  } else if ((countries.length > 2 && countries.length < 10) || countries.length === 0) {
    return (
      <div>
        {countries.map((country, i) =>
          <p key={i}>
            {country.name.common}
            <button onClick={() => setCountries([country])}>show</button>
          </p>
        )}
      </div>
    )
  } else {
    return (
      <Country country={countries[0]} />
    )
  }
}
