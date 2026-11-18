import axios from 'axios';

export interface Emoji {
  title: string;
  emoji: string;
  keywords: string;
}

const API_URL = 'http://localhost:3000/api/emojis';

export async function fetchEmojis(query: string = ''): Promise<Emoji[]> {
  try {
    const response = await axios.get<Emoji[]>(API_URL, {
      params: { q: query },
    });
    return response.data;
  } catch (error) {
    console.error('Ошибка при загрузке эмодзи:', error);
    throw new Error('Не удалось загрузить данные');
  }
}