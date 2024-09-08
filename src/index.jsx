import ReactDOM from 'react-dom/client';
import './styles/index.css';
import App from './App';

// Asegúrate de que el elemento root no es null
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);
root.render(<App />);
