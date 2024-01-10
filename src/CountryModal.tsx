import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface Country {
  name: {
    common: string;
  };
  capital: string;
  population: number;
  region: string;
  // Ajoutez d'autres propriétés si nécessaire
}

interface CountryModalProps {
  country: Country | null;
  onClose: () => void;
}

const CountryModal: React.FC<CountryModalProps> = ({ country, onClose }) => {
  // Vérifiez si country est null avant d'accéder à ses propriétés
  const countryName = country ? country.name.common : '';
  const countryCapital = country ? country.capital : '';
  const countryPopulation = country ? country.population : 0;
  const countryRegion = country ? country.region : '';

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{countryName}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Capital: {countryCapital}</p>
        <p>Population: {countryPopulation}</p>
        <p>Region: {countryRegion}</p>
        {/* Ajoutez d'autres informations spécifiques au pays ici */}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CountryModal;
