import React, { useState, useEffect, useCallback } from 'react';
import MaterialCard, { type Material } from '../components/MaterialCard';
import Header from '../components/Header';
import { mockMaterials } from '../modules/mock';
import './MaterialPage.css';

const API_BASE_URL = '/api/materials';

const MaterialList: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterQuery, setFilterQuery] = useState('');

  const fetchMaterials = useCallback(async (searchQuery: string) => {
    setLoading(true);

    const url = searchQuery
      ? `${API_BASE_URL}?searchbymaterialname=${encodeURIComponent(
          searchQuery,
        )}`
      : API_BASE_URL;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        setMaterials(mockMaterials);
      }

      const apiResponse = await response.json();
      const materialsArray = apiResponse.data;

      if (Array.isArray(materialsArray)) {
        setMaterials(materialsArray as Material[]);
      } else {
        setMaterials([]);
        console.error(
          "API response is not an object with a 'data' array:",
          apiResponse,
        );
        throw new Error(
          "Неверный формат данных от сервера. Ожидался массив материалов в поле 'data'.",
        );
      }
    } catch (error) {
      console.error('Ошибка при загрузке материалов:', error);
      setMaterials(mockMaterials);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMaterials(filterQuery);
  }, [filterQuery, fetchMaterials]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFilterQuery(searchTerm);
  };
  
  return (
    <div className="container">
      <Header />
      <main>
        <div className="main-content">
          

          <div className="search-section">
            
            <form onSubmit={handleSearchSubmit} className="search-input-wrapper">
              <div className="search-container">
                <input
                  type="text"
                  name="searchbymaterialname"
                  className="search-input"
                  placeholder="Введите текст для поиска"
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              </div>
              <button type="submit" className="search-button">
                Найти
              </button>
            </form>
          </div>

          {loading && <p style={{ marginTop: '20px' }}>Загрузка материалов...</p>}

          {!loading && materials.length === 0 && (
            <p style={{ marginTop: '20px' }}>
              {filterQuery
                ? `По запросу "${filterQuery}" ничего не найдено`
                : 'Нет материалов для отображения'}
            </p>
          )}

          <div className="cards-container">
            {!loading &&
              materials.map((material) => (
                <MaterialCard key={material.MaterialID} material={material} />
              ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MaterialList;
