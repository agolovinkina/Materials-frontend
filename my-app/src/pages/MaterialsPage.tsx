import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import MaterialCard, { type Material } from '../components/MaterialCard';
import { mockMaterials } from '../modules/mock';
import './MaterialPage.css';

const API_BASE_URL = '/api/materials';

const MaterialsPage: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // поиск
  const [searchTerm, setSearchTerm] = useState<string>('');   // что вводит пользователь
  const [filterQuery, setFilterQuery] = useState<string>(''); // что реально уходит в запрос

  // загрузка материалов с учётом фильтра
  const fetchMaterials = useCallback(async (searchQuery: string) => {
    setLoading(true);

    const url = searchQuery
      ? `${API_BASE_URL}?searchbymaterialname=${encodeURIComponent(searchQuery)}`
      : API_BASE_URL;

    try {
      const response = await fetch(url);

      if (!response.ok) {
        // если ошибка от бэка — показываем mock
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
    } catch (e) {
      console.error('Ошибка при загрузке материалов:', e);
      // при сетевой ошибке или падении бэка — подставляем mock
      if (!searchQuery) {
        setMaterials(mockMaterials);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // вызывать загрузку при изменении фильтра
  useEffect(() => {
    fetchMaterials(filterQuery);
  }, [filterQuery, fetchMaterials]);

  // изменение текста в поле поиска
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // отправка формы поиска
  const handleSearchSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setFilterQuery(searchTerm); // запускаем новый запрос с этим фильтром
  };

  return (
    <div className="materials-page">
      <Header />

      <main className="materials-main">
        {/* хлебные крошки */}
        <div className="material-adress">
          <Link to="/" className="adress-text" style={{ textDecoration: 'none' }}>
            Главная/
          </Link>
          <span className="adress-text" style={{ textDecoration: 'none', color: '#000000' }}>
            Материалы
          </span>
        </div>

        <h1 className="material-page-title">Материалы</h1>

        {/* поиск */}
        <section className="search-section">
          <div className="search-label">Поиск по материалам</div>
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
        </section>

        {loading && <p className="materials-loading">Загрузка материалов...</p>}

        {/* список карточек */}
        <div className="cards-container">
          {!loading &&
            materials.map((material) => (
              <MaterialCard key={material.MaterialID} material={material} />
            ))}
        </div>
      </main>
    </div>
  );
};

export default MaterialsPage;
