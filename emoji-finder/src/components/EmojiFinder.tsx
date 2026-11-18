import { useState, useEffect } from 'react';
import { fetchEmojis, type Emoji } from '../api/emojiApi';

export default function EmojiFinder() {
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      loadEmojis();
    }, 300); 

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const loadEmojis = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchEmojis(searchTerm);
      setEmojis(data);
    } catch (err) {
      setError('Ошибка загрузки. Проверьте, запущен ли сервер (node app.js).');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-wrapper">
      <header className="header">
        <h1>Emoji Finder</h1>
        <p>Find emoji by keywords</p>
      </header>

      <div className="search-container">
        <input
          type="text"
          className="search-input"
          placeholder="Placeholder"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <main className="grid-container">
        {loading && <p className="status-message">Загрузка...</p>}
        {error && <p className="status-message error">{error}</p>}
        {!loading && !error && emojis.length === 0 && (
          <p className="status-message">Эмодзи не найдены</p>
        )}

        {!loading && !error && emojis.map((emoji) => (
          <div key={emoji.emoji} className="card">
            <div className="emoji-icon" style={{ fontSize: '48px' }}>{emoji.emoji}</div>
            <h2 className="card-title">{emoji.title}</h2>
            <p className="card-description">{emoji.keywords}</p>
          </div>
        ))}
      </main>
    </div>
  );
}