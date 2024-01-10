import { describe, it, expect } from 'vitest';
import { monreducer, initializeCountries } from './App';
import { render, screen } from '@testing-library/react';
import GenericCard from './GenericCard';
import CountryCard from './CountryCard';
import App from './App';
import { fireEvent, waitFor } from '@testing-library/react';



const examplePayload = [
  { name: { common: 'Eritrea' }, capital: 'Asmara', population: 2072, region: 'Oceania' },
  { name: { common: 'Denmark' }, capital: 'Copenhagen', population: '5831404', region: 'Europe' },
];

describe('Reducer Tests', () => {
  it('should handle SET_COUNTRIES action', () => {
    const initialState = { countries: [], searchResults: [] };
    const action = { type: 'SET_COUNTRIES', payload: examplePayload };
    const nextState = monreducer(initialState, action);

    const expectedState = {
      countries: [
        { name: { common: 'Eritrea' }, capital: 'Asmara', population: 2072, region: 'Oceania' },
        { name: { common: 'Denmark' }, capital: 'Copenhagen', population: '5831404', region: 'Europe' },
      ],
      searchResults: [
        { name: { common: 'Eritrea' }, capital: 'Asmara', population: 2072, region: 'Oceania' },
        { name: { common: 'Denmark' }, capital: 'Copenhagen', population: '5831404', region: 'Europe' },
      ],
    };

    expect(nextState).toMatchObject(expectedState);
  });
});

describe('GenericCard Component', () => {
  it('renders card content', () => {
    render(<GenericCard title="Test Title" content={<p>Test Content</p>} />);

    // Utilisez vitest's expect pour effectuer des assertions
    expect(screen.getByText('Test Title')).to.exist;
    expect(screen.getByText('Test Content')).to.exist;
  });
});

describe('CountryCard Component', () => {
  it('renders country information correctly', () => {
    const mockCountry = {
      name: { common: 'Ireland' },
      capital: 'Dublin',
      population: 4994724,
      region: 'Europe',
    };

    render(<CountryCard country={mockCountry} />);

    expect(screen.getByText('Ireland')).to.exist;
    expect(screen.getByText('Capital: Dublin')).to.exist;
    expect(screen.getByText('Population: 4994724')).to.exist;
    expect(screen.getByText('Region: Europe')).to.exist;
  });
});
const examplePayload2 = [
  { name: { common: 'Christmas Island' }, capital: 'Flying Fish Cove' }
];

describe('App Component', () => {
  it('handles the happy path for data retrieval', async () => {
    // Mock axios to simulate API responses
    globalThis.axios = {
      get: () => Promise.resolve({ data: examplePayload2 }),
    };
  
    // Render the App component
    render(<App />);
  
    // Wait for the data to be fetched
    await new Promise(resolve => setTimeout(resolve, 4000)); // Augmentez la durée de temporisation
  
    // Check if the UI is updated correctly with the fetched data
    expect(screen.getByText('Christmas Island')).to.exist;
    expect(screen.getByText('Capital: Flying Fish Cove')).to.exist;
    
  
    // Vous pouvez ajouter d'autres assertions au besoin
  
    // Nettoyez le mock axios global
    delete globalThis.axios;
  });  
});
/* --------------------------- unhappypath ---------------------- */

const exampleErrorMessage = 'Failed to fetch data';

describe('App Component', () => {
  it('handles the unhappy path for data retrieval', async () => {
    // Mock axios to simulate a failed API response
    globalThis.axios = {
      get: () => Promise.reject(new Error(exampleErrorMessage)),
    };
  
    // Render the App component
    render(<App />);
   /* await new Promise(resolve => setTimeout(resolve, 3000)); // Augmentez la durée de temporisation

    // Wait for the error to be displayed
    
      expect(screen.queryByText(exampleErrorMessage)).to.exist;*/
      await waitFor(() => {
        expect(screen.queryByText(exampleErrorMessage)).to.exist;
      });
  
    // Nettoyez le mock axios global
    delete globalThis.axios;
  });  
});

/* test de bout en bout ************************ */


const exampleSearchTerm = 'Denmark';

describe('End-to-End Test', () => {
  it('simulates user search interaction', async () => {
    // Mock axios to simulate a successful API response
    globalThis.axios = {
      get: () => Promise.resolve({ data: [{ name: { common: exampleSearchTerm }, capital: 'Copenhagen' }] }),
    };
  
    // Render the App component
    render(<App />);
  
    // Simulate user entering a search term
    const searchInput = screen.getByPlaceholderText('Search for a country...');
    fireEvent.change(searchInput, { target: { value: exampleSearchTerm } });
  
    // Wait for the data to be fetched
    await waitFor(() => {
      expect(screen.getByText(exampleSearchTerm)).toBeInTheDocument();
      expect(screen.getByText('Capital: Copenhagen')).toBeInTheDocument();
    });
  
    // Clean up the global axios mock
    delete globalThis.axios;
  });
});

/* --------------App.jsx----------- */
/*
describe('App Component', () => {
  it('renders welcome message when isError is false', () => {
    render(<App isError={false} />);
    
    // Assurez-vous que le message de bienvenue est rendu
    expect(screen.getByText('Welcome to My App!')).to.exist;
    
    // Assurez-vous que le message d'erreur n'est pas rendu
    expect(screen.queryByText('Something went wrong!')).to.be.null;
  });

  it('renders error message when isError is true', () => {
    render(<App isError={true} />);
    
    // Assurez-vous que le message de bienvenue n'est pas rendu
    expect(screen.queryByText('Welcome to My App!')).to.be.null;

    // Assurez-vous que le message d'erreur est rendu
    expect(screen.getByText('Something went wrong!')).to.exist;
  });
});*/

