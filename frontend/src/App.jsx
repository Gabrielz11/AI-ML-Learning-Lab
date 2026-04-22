import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Layout & Components
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import Classification from './pages/Classification';
import Regression from './pages/Regression';
import Comparison from './pages/Comparison';
import LearningMode from './pages/LearningMode';
import FAQ from './pages/FAQ';

function App() {
  const [activePage, setActivePage] = useState('home');

  // Page Transitions
  const pageVariants = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  const renderPage = () => {
    switch (activePage) {
      case 'home':
        return <Home onNavigate={setActivePage} />;
      case 'classification':
        return <Classification />;
      case 'regression':
        return <Regression />;
      case 'comparison':
        return <Comparison />;
      case 'learning':
        return <LearningMode />;
      case 'faq':
        return <FAQ />;
      case 'settings':
        return (
          <div className="flex flex-col items-center justify-center h-full text-muted-foreground gap-4">
            <h2 className="text-2xl font-bold">Configurações</h2>
            <p>Em breve você poderá customizar seu ambiente.</p>
          </div>
        );
      default:
        return <Home onNavigate={setActivePage} />;
    }
  };

  return (
    <Layout activePage={activePage} setActivePage={setActivePage}>
      <AnimatePresence mode="wait">
        <motion.div
          key={activePage}
          variants={pageVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{ duration: 0.2, ease: "easeOut" }}
          className="h-full"
        >
          {renderPage()}
        </motion.div>
      </AnimatePresence>
    </Layout>
  );
}

export default App;
