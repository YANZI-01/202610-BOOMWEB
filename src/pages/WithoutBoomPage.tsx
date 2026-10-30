import { WithoutBoom } from '../components/WithoutBoom';
import './why-boom-palette.css';

export function WithoutBoomPage() {
  return (
    <div className="relative min-h-screen bg-transparent">
      <div className="relative z-10">
        <WithoutBoom />
      </div>
    </div>
  );
}
