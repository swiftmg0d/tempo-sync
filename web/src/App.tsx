import { useEffect, useState } from 'react';

const SITE_KEY = '0x4AAAAAACDiQxbPDzGMWr01';

export const useTurnstile = () => {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const init = () => {
      const container = document.getElementById('turnstile');
      if (!window.turnstile || !container) {
        setTimeout(init, 100);
        return;
      }

      window.turnstile.render(container, {
        sitekey: SITE_KEY,
        callback: setToken,
      });
    };

    init();
  }, []);

  return token;
};

function App() {
  const token = useTurnstile();

  const fetchData = async () => {
    const res = await fetch('http://localhost:8787/api/test', {
      headers: { 'X-Turnstile-Token': token || '' },
    });
    console.log(await res.json());
  };

  return (
    <div>
      <div id='turnstile'></div>
      <p>{token ? '✅ Ready' : '⏳ Loading...'}</p>
      <p>{token ? token : ''}</p>
      <button onClick={fetchData} disabled={!token}>
        Fetch
      </button>
    </div>
  );
}

export default App;
