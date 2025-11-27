import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Feedback from './Feedback';

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen relative">
      <Header />
      {/* Added max-w-7xl for width constraint and flex-grow to push footer down */}
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl z-10">
        {children}
      </main>
      <Footer />
      <Feedback />
    </div>
  );
};

export default Layout;