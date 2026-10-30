import { AboutCompany } from '../components/AboutCompany';
import './brand-palette.css';

export function BrandPage() {
  return (
    <div className="brand-page relative min-h-screen bg-transparent" data-nav-theme="light">
      <div className="relative z-10">
        <AboutCompany />
      </div>
    </div>
  );
}
