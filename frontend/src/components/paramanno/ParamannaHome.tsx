import { useState } from 'react';
import TopSearch from './TopSearch';
import HeroSection from './HeroSection';
import TrustStrip from './TrustStrip';
import BestSelling from './BestSelling';
import HowItWorks from './HowItWorks';
import RenzenBanner from './RenzenBanner';
import ParamannaFooter from './ParamannaFooter';
import styles from '@/styles/ParamannaHome.module.css';

export default function ParamannaHome() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <div className={styles.wrapper}>
      <TopSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onSelectCategory={setActiveCategory}
      />

      <main>
        <HeroSection />
        <TrustStrip />
        <BestSelling
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          searchQuery={searchQuery}
        />
        <HowItWorks />
        <RenzenBanner />
      </main>

      <ParamannaFooter onSelectCategory={setActiveCategory} />
    </div>
  );
}
