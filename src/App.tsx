import { StrictMode } from 'react';
import { MotionConfig } from 'motion/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LanguageProvider } from './context/LanguageContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { ErrorBoundary } from './ErrorBoundary';
import { WavesBackground } from './components/WavesBackground';

// Pages
import { ProductPage } from './pages/ProductPage';
import { BrandPage } from './pages/BrandPage';
import { WithoutBoomPage } from './pages/WithoutBoomPage';

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
    <LanguageProvider>
      <BrowserRouter>
        <ScrollToTop />
        <ErrorBoundary>
          <div className="min-h-screen bg-black text-white font-sans selection:bg-boom-green selection:text-black">
            <WavesBackground />
            <Navbar />
            <main>
              <Routes>
                <Route path="/" element={<ProductPage />} />
                <Route path="/without-boom" element={<WithoutBoomPage />} />
                <Route path="/brand" element={<BrandPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </ErrorBoundary>
      </BrowserRouter>
    </LanguageProvider>
    </MotionConfig>
  );
}
