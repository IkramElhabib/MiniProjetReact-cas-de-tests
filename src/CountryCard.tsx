import React from 'react';

interface CountryCardProps {
  country: {
    name: {
      common: string;
    };
    capital: string;
    population: number;
    region: string;
  };
}

const CountryCard: React.FC<CountryCardProps> = ({ country }) => {
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
