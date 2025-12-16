import { useState, useEffect } from 'react';

interface DatingRequestState {
    datingID: number;
    count: number;
    loading: boolean;
}

const useDatingRequest = (): DatingRequestState => {
    const [datingState, setDatingState] = useState<DatingRequestState>({
        datingID: 0,
        count: 0,
        loading: true
    });

    useEffect(() => {
        const fetchDatingRequest = async () => {
            try {
                // Здесь будет реальный API-запрос
                // const response = await fetch('/api/v1/dating-request/current');
                // const data = await response.json();
                
                // Временные мок-данные
                setTimeout(() => {
                    setDatingState({
                        datingID: 123, // или 0 если нет активной заявки
                        count: 3, // количество материалов в заявке
                        loading: false
                    });
                }, 500);
                
            } catch (error) {
                console.error('Ошибка при загрузке данных о заявке:', error);
                setDatingState(prev => ({ ...prev, loading: false }));
            }
        };

        fetchDatingRequest();
    }, []);

    return datingState;
};

export default useDatingRequest;