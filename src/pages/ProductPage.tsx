import './product-palette.css';
import { Hero } from '../components/Hero';
import { TargetAudience } from '../components/TargetAudience';
import { ProductShowcase } from '../components/ProductShowcase';
import { WearExperience } from '../components/WearExperience';
import { PrecisionData } from '../components/PrecisionData';
import { BoomApp } from '../components/BoomApp';
import { RecoveryAlgorithm } from '../components/RecoveryAlgorithm';
import { AICoachTimeline } from '../components/AICoachTimeline';
import { ProductSideNav } from '../components/ProductSideNav';

export function ProductPage() {
  return (
    <>
      <ProductSideNav />
      <Hero />
      <TargetAudience />
      <ProductShowcase />
      <WearExperience />
      <PrecisionData />
      <BoomApp />
      <RecoveryAlgorithm />
      <AICoachTimeline />
    </>
  );
}
