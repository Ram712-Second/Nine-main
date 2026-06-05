import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

interface LayoutProps {
  children: React.ReactNode;
  theme?: 'dark' | 'light';
}

const Layout: React.FC<LayoutProps> = ({ children, theme = 'dark' }) => {
  return (
    <div className={theme}>
      <Header theme={theme} />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;