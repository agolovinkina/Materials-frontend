export interface ITunesResult {
    resultCount: number; // Общее количество найденных результатов
    results: { // Массив объектов с результатами поиска
        wrapperType: string; // Тип медиаобъекта (например, 'track', 'collection')
        kind?: string; // Более конкретный тип (например, 'song'). Добавлено как опциональное поле
        artistName: string; // Имя исполнителя
        collectionCensoredName: string; // Название альбома (цензурированное)
        trackName?: string; // Название трека. Добавлено как опциональное поле
        trackCensoredName?: string; // Название трека (цензурированное). Добавлено как опциональное поле
        trackViewUrl: string; // Ссылка на страницу трека в iTunes
        artworkUrl100: string; // URL обложки размером 100x100 пикселей
        collectionId: number; // Уникальный идентификатор альбома
        trackId?: number; // Уникальный идентификатор трека. Добавлено как опциональное поле
        previewUrl?: string; // URL для прослушивания preview трека. Добавлено как опциональное поле
    }[];
}