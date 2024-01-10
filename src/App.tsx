import React, { useEffect, useState, useReducer } from "react";
import GenericCard from "./GenericCard";
import CountryModal from "./CountryModal";
import "./app.css";
import axios from 'axios';

interface Country {
  name: { common: string };
  capital: string;
  population: number;
  region: string;
  flags?: { png: string };
}

interface State {
  countries: Country[];
  searchResults: Country[];
  searchTerm: string;
  countriesLoading: boolean;
  countriesError: string | null;
  sortOrder: string;
}

type Action =
  | { type: 'SET_COUNTRIES'; payload: Country[] }
  | { type: 'SET_SEARCH_TERM'; payload: string }
  | { type: 'INITIALIZE_COUNTRIES' }
  | { type: 'SET_COUNTRIES_SUCCESS'; payload: Country[] }
  | { type: 'SET_COUNTRIES_ERROR'; payload: string }
  | { type: 'SET_SORT_ORDER'; payload: string };

  const monreducer = (state: State, action: Action): State => {
    switch (action.type) {
      case 'SET_COUNTRIES':
        return {
          ...state,
          countries: action.payload,
          searchResults: action.payload,
        };
      case 'SET_SEARCH_TERM':
        return {
          ...state,
          searchTerm: action.payload,
        };
      case 'INITIALIZE_COUNTRIES':
        return {
          ...state,
          countriesLoading: true,
        };
      case 'SET_COUNTRIES_SUCCESS':
        return {
          ...state,
          countriesLoading: false,
          countries: action.payload,
          searchResults: action.payload,
        };
      case 'SET_COUNTRIES_ERROR':
        return {
          ...state,
          countriesLoading: false,
          countriesError: action.payload,
        };
      case 'SET_SORT_ORDER':
        const sortedCountries = state.searchResults.slice().sort((a, b) => {
          const nameA = a.name.common.toLowerCase();
          const nameB = b.name.common.toLowerCase();
  
          return state.sortOrder === "asc" ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
        });
  
        return {
          ...state,
          sortOrder: action.payload,
          searchResults: sortedCountries,
        };
      default:
        return state;
    }
  };

const initializeCountries = () => ({ type: 'INITIALIZE_COUNTRIES' });

const App: React.FC = () => {
  const [countries, setCountries] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 3; // Nombre d'éléments par page
  const [state, dispatchcountry] = useReducer(monreducer,{
    countries: [],
    searchResults: [],
    searchTerm: "",
    countriesLoading: false,
    countriesError: null,
    sortOrder: "asc", // Ajoutez sortOrder à l'état initial
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://restcountries.com/v3.1/all");
        dispatchcountry({ type: 'SET_COUNTRIES_SUCCESS', payload: response.data });
        setSearchResults(response.data);
      } catch (error : any) {
        dispatchcountry({ type: 'SET_COUNTRIES_ERROR', payload: error.message });
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log("lading encours:", state);
  }, [state]);

  useEffect(() => {
    console.log("Countries State:", state.countries);
  }, [state.countries]);

  useEffect(() => {
    console.log("Search Term State:", state.searchTerm);
  }, []);

  useEffect(() => {
    console.log("Countries Loading State:", state.countriesLoading);
  }, []);

  useEffect(() => {
    console.log("Countries Success State:", state.countries);
  }, [state.countries]);


  useEffect(() => {
    const filteredCountries = state.countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    const sortedCountries = filteredCountries.sort((a, b) => {
      const nameA = a.name.common.toLowerCase();
      const nameB = b.name.common.toLowerCase();
  
      if (sortOrder === "asc") {
        return nameA.localeCompare(nameB);
      } else {
        return nameB.localeCompare(nameA);
      }
    });
  
    dispatchcountry({ type: 'SET_SEARCH_TERM', payload: searchTerm });
    dispatchcountry({ type: 'SET_SORT_ORDER', payload: sortOrder });
    dispatchcountry({ type: 'SET_COUNTRIES', payload: sortedCountries });
  }, [state.countries, searchTerm, sortOrder]);
  
  const handleSearch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearchTerm(searchTerm);
  };
  
  const handleDetailsClick = (country: Country) => {
    setSelectedCountry(country);
    setShowModal(true);
  };
  
  const handleSort = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortOrder(e.target.value);
  };
  
  const handleCountryClick = (country: Country) => {
    setSelectedCountry(country);
  };
  
  const closeCountryDetails = () => {
    setSelectedCountry(null);
  };
  
  // Fonction pour calculer l'indice de début de la page actuelle
  const startIndex = (currentPage - 1) * pageSize;
  // Slice les résultats pour obtenir la page actuelle
  const paginatedResults = state.searchResults.slice(
    startIndex,
    startIndex + pageSize
  );

  return (
    <div>
      <h1>List of Countries</h1>
      <div className="select-wrapper">
        <select
          className="sort-order-select"
          id="sortOrder"
          value={state.sortOrder}
          onChange={handleSort}
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
      </div>
      <div className="center-container">
        <div className="search-box">
          <button className="btn-search">
            <i className="fas fa-search"></i>
          </button>
          <input
            type="text"
            className="input-search"
            placeholder="Search for a country..."
            value={state.searchTerm}
            onChange={handleSearch}
          />
        </div>
      </div>
      <div className="card-container">
        {paginatedResults.map((country) => (
          <div key={country.name.common} className="card">
            <GenericCard
              title={country.name.common}
              content={
                <>
                    {country.flags?.png && (
                  <img
                    src={country.flags.png}
                    alt={`${country.name.common} Flag`}
                    style={{ width: '50px', height: 'auto' }}
                  />
                )}
                  <p>Capital: {country.capital}</p>
                  <p>Population: {country.population}</p>
                  <p>Region: {country.region}</p>

                </>
              }
              onClick={() => handleCountryClick(country)}
              onDetailsClick={() => handleDetailsClick(country)}
            >
             
            </GenericCard>
          </div>
        ))}
      </div>

      <div>
        <button
          onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous Page
        </button>
        <span> Page {currentPage} </span>
        <button
          onClick={() =>
            setCurrentPage(prevPage => Math.min(prevPage + 1, Math.ceil(searchResults.length / pageSize)))
          }
          disabled={currentPage === Math.ceil(searchResults.length / pageSize)}
        >
          Next Page
        </button>
      </div>

      {selectedCountry && (
        <div>
          <h2>Country Details</h2>
          <p>Name: {selectedCountry.name.common}</p>
          {/* Add other details here */}
          <button onClick={closeCountryDetails}>Close</button>
        </div>
      )}
    </div>
  );
}

export { monreducer, initializeCountries };
export default App;
