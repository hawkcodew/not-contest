import ReactDOM from 'react-dom/client';
import './index.css';
import { versionAtLeast } from '@/features/hooks/useTelegramFeature.ts';
import { init, WebApp } from '@/init.ts';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/appRouter.tsx';
import { UpdateTelegramPage } from '@/pages/UpdateTelegram';

const root = ReactDOM.createRoot(document.getElementById('root')!);

try {
  init();

  if (!versionAtLeast(WebApp.version, '7.0')) {
    root.render(<UpdateTelegramPage />);
  } else {
    root.render(<RouterProvider router={router} />);
  }
} catch (e) {
  console.error('Initialization failed:', e);
  root.render(<div>Not supported</div>);
}
