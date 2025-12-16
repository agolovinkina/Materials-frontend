type Listener = (status: DatingStatus) => void;

interface DatingStatus {
    datingID: number;
    materialsCount: number;
    loading: boolean;
    error: string | null;
}

// Глобальное состояние
let currentStatus: DatingStatus = {
    datingID: 0,
    materialsCount: 0,
    loading: true,
    error: null,
};

const listeners = new Set<Listener>();

const subscribe = (listener: Listener) => {
    listeners.add(listener);
    listener(currentStatus);
    return () => {
        listeners.delete(listener);
    };
};

const setStatus = (newStatus: Partial<DatingStatus>) => {
    currentStatus = { ...currentStatus, ...newStatus };
    listeners.forEach(listener => listener(currentStatus));
};

const API_ICON_URL = '/api/v1/dating-analysis-request/icon';
let isInitialFetchDone = false; 

const fetchStatus = async () => {
    if (currentStatus.loading && isInitialFetchDone) return; 
    
    setStatus({ loading: true, error: null });

    try {
        const response = await fetch(API_ICON_URL, {
            credentials: 'include',
        });
        
        if (!response.ok) {
            console.error(`[DatingStore ERROR] API Status: ${response.status}`);
            throw new Error(`Ошибка сети/сервера: статус ${response.status}. Возможно, требуется авторизация.`);
        }
        
        const rawData = await response.json();
        
        const data = rawData.data || rawData;
        
        const currentID = data.dating_request_id || data.DatingRequestID || data.datingRequestID || 0;
        const currentCount = data.materials_in_request_count || data.dating_count || data.DatingCount || data.datingCount || 0;
        
        console.log(`[DatingStore SUCCESS] Получен ID: ${currentID}, Materials Count: ${currentCount}. Полный ответ:`, rawData);

        setStatus({ 
            datingID: currentID, 
            materialsCount: currentCount, 
            loading: false, 
            error: null 
        });

    } catch (e) {
        if (e instanceof Error) {
            console.error("Ошибка загрузки статуса заявки на датирование:", e.message);
            setStatus({ datingID: 0, materialsCount: 0, loading: false, error: "Не удалось загрузить статус заявки на датирование: " + e.message });
        } else {
            setStatus({ datingID: 0, materialsCount: 0, loading: false, error: "Неизвестная ошибка загрузки статуса заявки на датирование" });
        }
    } finally {
        isInitialFetchDone = true;
    }
};

const refreshStatus = () => {
    fetchStatus();
};

// Автоматическая загрузка статуса при инициализации
fetchStatus();

export { subscribe, refreshStatus, fetchStatus };
export type { DatingStatus };