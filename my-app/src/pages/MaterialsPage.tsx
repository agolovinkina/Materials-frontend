import React, { useState, useEffect, useCallback } from 'react';
//import { Link } from 'react-router-dom';
import MaterialCard, { type Material } from '../components/MaterialCard';
import Header from '../components/Header';
import { mockMaterials } from '../modules/mock'; // Импортируем моковые данные


//const API_BASE_URL = '/api/v1/materials';

const MaterialList: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterQuery, setFilterQuery] = useState<string>('');

  const fetchMaterials = useCallback(async (searchQuery: string) => {
    setLoading(true);
    
    try {
      // Временное решение с моковыми данными
      setTimeout(() => {
        let filteredMaterials = mockMaterials;
        
        if (searchQuery) {
          filteredMaterials = mockMaterials.filter(material =>
            material.MaterialName.toLowerCase().includes(searchQuery.toLowerCase())
          );
        }
        
        setMaterials(filteredMaterials);
        setLoading(false);
      }, 500);
      
    } catch (error) {
      console.error('Ошибка при загрузке материалов:', error);
      setMaterials([]);
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
                  name="searchmaterialquery" 
                  className="search-input" 
                  placeholder="Введите запрос" 
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

          <div className="cards-container">
            {!loading && materials.length === 0 && (
              <div className="no-materials">
                {filterQuery ? `По запросу "${filterQuery}" ничего не найдено` : 'Нет материалов для отображения'}
              </div>
            )}
            
            {!loading && materials.map((material) => (
              <MaterialCard key={material.MaterialID} material={material} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default MaterialList;