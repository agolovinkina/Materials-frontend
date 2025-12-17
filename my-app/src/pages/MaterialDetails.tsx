import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import CartIcon from '../components/CartIcon';
import Header from '../components/Header';
import { mockMaterials } from '../modules/mock';
import './MaterialDetails.css';

interface Material {
  MaterialID: string;
  MaterialName: string;
  ImageURL?: string;
  Isotopes?: string;
  SampleSize?: string[];
}

const MaterialDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchMaterialDetails = useCallback(async (materialId: string) => {
    setLoading(true);
    try {
      // Временное решение с моковыми данными
      setTimeout(() => {
        const foundMaterial = mockMaterials.find(m => m.MaterialID === materialId);

        if (foundMaterial) {
          setMaterial(foundMaterial as Material);
        } else {
          setMaterial(null);
        }

        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('Ошибка при загрузке деталей материала:', error);
      setMaterial(null);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!id) return;
    fetchMaterialDetails(id);
  }, [id, fetchMaterialDetails]);

  if (loading) return <div>Загрузка деталей материала...</div>;
  if (!material) return <div>Материал не найден.</div>;

  return (
  <div className="material-page">
    {/* синяя полоса с логотипом внутри */}
    <div className="material-top-bar">
      <img
        src="/static/img/radiocarbon-logo.png" // путь к твоей картинке RadioCarbon Dating
        alt="RadioCarbon Dating"
        className="material-top-logo"
      />
    </div>

    <div className="material-inner">


      <div className="material-breadcrumbs">
        Главная/
        <Link to="/materials">Материалы</Link>/
        {material.MaterialName}
      </div>

      <h1 className="material-title">{material.MaterialName}</h1>

      <div className="material-content">
        {material.ImageURL && (
          <div className="material-image-wrapper">
            <img
              src={material.ImageURL}
              alt={material.MaterialName}
              className="material-image"
            />
          </div>
        )}

        <div className="material-text-block">
          {material.Isotopes && (
            <div>
              <h2 className="material-section-title">Изотопный анализ</h2>
              <p className="material-section-text">{material.Isotopes}</p>
            </div>
          )}

          {material.SampleSize && material.SampleSize.length > 0 && (
            <div>
              <h2 className="material-section-title">
                Рекомендуемый размер выборки
              </h2>
              <ul className="material-sample-list">
                {material.SampleSize.map((size, index) => (
                  <li key={index}>{size}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);
}

export default MaterialDetails;
