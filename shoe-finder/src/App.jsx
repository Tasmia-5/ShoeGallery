import React, { useState, useEffect } from 'react';
import { Input } from './components/ui/Input';
import { Card, CardContent } from './components/ui/Card';
import { Button } from './components/ui/Button';

export default function ShoeApp() {
  const [search, setSearch] = useState('');
  const [brand, setBrand] = useState('');
  const [gender, setGender] = useState('');
  const [year, setYear] = useState('');
  const [results, setResults] = useState([]);

  const mockData = [
    {
      name: "Air Jordan 1",
      brand: "Nike",
      gender: "men",
      releaseYear: 1985,
      retailer: "Nike.com",
      media: {
        imageUrl: "https://images.stockx.com/images/Air-Jordan-1-Retro-High-OG-Chicago-2015-Product.jpg"
      }
    },
    {
      name: "Nike Air Max 90",
      brand: "Nike",
      gender: "unisex",
      releaseYear: 1990,
      retailer: "StockX",
      media: {
        imageUrl: "https://images.stockx.com/images/Nike-Air-Max-90-Infrared-2020-Product.jpg"
      }
    }
  ];
  
  const handleSearch = async () => {
    const response = await fetch(`http://localhost:5000/search?q=${encodeURIComponent(search)}`);
    const data = await response.json();
    setResults(data);
  };


  return (
    <div className="p-6 max-w-2xl mx-auto space-y-6 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold">Shoe Finder</h1>

      <div className="flex flex-col space-y-4">
        <Input
          placeholder="Search for a shoe..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <Input
          placeholder="Brand (e.g. Nike, Adidas)"
          value={brand}
          onChange={e => setBrand(e.target.value)}
        />
        <Input
          placeholder="Gender (men, women, unisex)"
          value={gender}
          onChange={e => setGender(e.target.value)}
        />
        <Input
          placeholder="Release Year (e.g. 2020)"
          value={year}
          onChange={e => setYear(e.target.value)}
        />
        <Button onClick={handleSearch}>Search</Button>
      </div>

      {results.map((shoe, index) => (
        <Card key={index} className="mt-4">
          <CardContent className="p-4">
            <h2 className="text-xl font-semibold">{shoe.shoeName}</h2>

            {shoe.thumbnail && (
              <img
                src={shoe.thumbnail}
                alt={shoe.shoeName}
                className="w-48 h-48 object-cover mx-auto my4 rounded-xl"
              />
            )}

            <p className="text-gray-300">Brand: {shoe.brand}</p>
            <p className="text-gray-300">Retail Price: ${shoe.retailPrice || 'N/A'}</p>
            <p className="text-gray-300">Release Date: {shoe.releaseDate || 'N/A'}</p>

            <p className="text-gray-300 mt-2">Buy from:</p>
            <ul className="text-blue-400 underline">
              {shoe.resellLinks?.stockX && (
                <li><a href={shoe.resellLinks.stockX} target="_blank" rel="noopener noreferrer">StockX</a></li>
              )}
              {shoe.resellLinks?.goat && (
                <li><a href={shoe.resellLinks.goat} target="_blank" rel="noopener noreferrer">GOAT</a></li>
              )}
              {shoe.resellLinks?.flightClub && (
                <li><a href={shoe.resellLinks.flightClub} target="_blank" rel="noopener noreferrer">Flight Club</a></li>
              )}
            </ul>
          </CardContent>
        </Card>
))}
    </div>
  );
}
