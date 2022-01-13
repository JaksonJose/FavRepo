import { Suspense } from 'react';
import { Router } from './Routes/routes';
import GlobalStyle from './styles/global';


export default function App() {
  return (
    <Suspense fallback="loading">
      <GlobalStyle />
      <Router />
    </Suspense>    
  );
}