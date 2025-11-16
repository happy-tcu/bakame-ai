import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Ensure dark mode is always enabled
document.documentElement.classList.add('dark');

// DEVELOPMENT ONLY: Set bypass session BEFORE React renders
// This allows admin access from any navigation path (direct, SPA transition, deep link)
if (import.meta.env.DEV) {
  localStorage.setItem('bypass_session', 'true');
  console.log('✅ Bypass session enabled for development');
}

createRoot(document.getElementById("root")!).render(<App />);
