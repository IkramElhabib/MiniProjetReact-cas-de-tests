import React from 'react';

const CountryCard = ({ country }) => {
  const { name, capital, population, region } = country;

  return (
    <div className="country-card">
      <h3>{name.common}</h3>
      <p>Capital: {capital}</p>
      <p>Population: {population}</p>
      <p>Region: {region}</p>
    </div>
  );
};

export default CountryCard;
