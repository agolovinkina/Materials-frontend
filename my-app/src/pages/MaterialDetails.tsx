import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import CartIcon from '../components/CartIcon';
import Header from '../components/Header';
import { mockMaterials } from '../modules/mock';

interface Material {
  MaterialID: string;
  MaterialName: string;
  ImageURL?: string;
  Isotopes?: string;
  SampleSize?: string[];
}

const API_BASE_URL = '/api/v1/materials/';

const MaterialDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    setLoading(true);

    // Сначала пытаемся найти материал в mock-данных по ID
    const foundMockMaterial = mockMaterials.find(m => m.MaterialID === id);

    // Если нашли в mock-данных, используем его
    if (foundMockMaterial) {
      setMaterial(foundMockMaterial);
      setLoading(false);
      return;
    }

    // Если не нашли в mock, пытаемся загрузить с API
    fetch(`${API_BASE_URL}${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Material not found');
        }
        return res.json();
      })
      .then(data => {
        const materialData = data.data || data;
        if (materialData && materialData.MaterialID) {
          setMaterial(materialData as Material);
        } else {
          throw new Error('Invalid data format');
        }
      })
      .catch(() => {
        // Если API тоже не сработал, используем первый mock материал как fallback
        const fallbackMaterial = mockMaterials[0] || null;
        setMaterial(fallbackMaterial);
      })
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Загрузка деталей материала...</div>;
  if (!material) return <div style={{ color: 'red' }}>Материал не найден.</div>;

  return (
    <div className="container">
      <Header />
      <CartIcon />
      
      <div className="genre-adress">
        <Link to="/" className="adress-text" style={{ textDecoration: 'none' }}>
          Главная/
        </Link>
        <Link to="/materials" className="adress-text">
          Материалы/
        </Link>
        <span className="adress-text" style={{ textDecoration: 'none', color: '#000000' }}>
          {material.MaterialName}
        </span>
      </div>

      <main className="product-container">
        <div className="product-content">
          <div className="product-header">
            <h1 className="product-title">{material.MaterialName}</h1>
          </div>
          
          <div className="product-body">
            <div className="product-image-section">
              <img 
                src={material.ImageURL || '/static/img/default-order-image.png'} 
                alt={material.MaterialName} 
                className="product-image" 
              />
            </div>
            
            <div className="product-info">
              {material.Isotopes && (
                <div className="info-section">
                  <div className="info-title">Изотопный анализ</div>
                  <div className="isotopes-badge">{material.Isotopes}</div>
                </div>
              )}
              
              {material.SampleSize && material.SampleSize.length > 0 && (
                <div className="info-section">
                  <div className="info-title">Рекомендуемый размер выборки</div>
                  <ul className="sample-list">
                    {material.SampleSize.map((size, index) => (
                      <li key={index}>{size}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MaterialDetails;