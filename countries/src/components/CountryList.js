
const CountryList = ({ countries, handleShowClick}) => {
  console.log(countries); // add this line to check the value of the countries prop
  if (!countries) {
    return null;
  } else if (typeof countries === "string") {
    return <div>{countries}</div>;
  } else if (Array.isArray(countries) && countries.length === 1) {
    const country = countries[0];
    return (
      <div>
        <div>
          <h2>{country.name.common}</h2>
          <div>capital: {country.capital[0]}</div>
          <div>area: {country.area}</div>
          <h4>Languages:</h4>
          {Object.values(country.languages).map((language, index) => (
            <li key={index}>{language}</li>
          ))}
          <img src={country.flags.png} alt={`${country.name.common} flag`} />
        </div>
      </div>
    );
  } else if (Array.isArray(countries) && countries.length > 1) {
    return (
      <div>
        {countries.map((country, index) => (
          <div key={index}>
            {country}
            <button onClick={ () => handleShowClick(country)}>show</button>
          </div>
        ))}
      </div>
    );
  }
};

export default CountryList;
