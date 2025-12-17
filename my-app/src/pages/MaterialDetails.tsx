import React, { useState, useEffect, useCallback } from 'react';
import { useParams, Link } from 'react-router-dom';
import Header from '../components/Header';
import { mockMaterials } from '../modules/mock';
import './MaterialDetails.css';

interface Material {
  MaterialID: number;
  MaterialName: string;
  MaterialImageURL?: string;
  Isotopes?: string;
  SampleRequirements?: string;
}

const API_BASE_URL = '/api/materials/';

const MaterialDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [material, setMaterial] = useState<Material | null>(null);
  const [loading, setLoading] = useState(true);

  const mockMaterial = mockMaterials[0] || null;

  const fetchMaterialDetails = useCallback(
    async (materialId: string) => {
      setLoading(true);

      fetch(`${API_BASE_URL}${materialId}`)
        .then((res) => {
          if (!res.ok) {
            setMaterial(mockMaterial);
            throw new Error();
          }
          return res.json();
        })
        .then((data) => {
          const materialData = data.data || data;
          if (materialData && materialData.MaterialID !== undefined) {
            const mapped: Material = {
              MaterialID: Number(materialData.MaterialID),
              MaterialName: materialData.MaterialName,
              MaterialImageURL: materialData.MaterialImageURL,
              Isotopes: materialData.Isotopes,
              SampleRequirements: materialData.SampleRequirements,
            };
            setMaterial(mapped);
          } else {
            setMaterial(mockMaterial);
          }
        })
        .catch(() => {
          if (mockMaterial) setMaterial(mockMaterial);
          else setMaterial(null);
        })
        .finally(() => setLoading(false));
    },
    [mockMaterial]
  );

  useEffect(() => {
    if (!id) return;
    fetchMaterialDetails(id);
  }, [id, fetchMaterialDetails]);

  if (loading) return <>Загрузка деталей материала...</>;
  if (!material) return <>Материал не найден.</>;

  return (
    <div className="material-page">
      <Header />

      <div className="material-inner">
        <div className="material-breadcrumbs">
          <Link to="/">Главная</Link> /{' '}
          <Link to="/materials">Материалы</Link> /{' '}
          <span>{material.MaterialName}</span>
        </div>

        <h1 className="material-title">{material.MaterialName}</h1>

        <div className="material-content">
          <div className="material-image-wrapper">
            {material.MaterialImageURL && (
              <img
                src={material.MaterialImageURL}
                alt={material.MaterialName}
                className="material-image"
              />
            )}
          </div>

          <div className="material-text-block">
            {material.Isotopes && (
              <section>
                <div className="material-section-title">Изотопный анализ</div>
                <div className="material-section-text">
                  {material.Isotopes}
                </div>
              </section>
            )}

            {material.SampleRequirements && (
              <section>
                <div className="material-section-title">
                  Рекомендуемый размер выборки
                </div>
                <div className="material-section-text">
                  {material.SampleRequirements}
                </div>
              </section>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MaterialDetails;
