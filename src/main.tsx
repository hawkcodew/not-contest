import ReactDOM from 'react-dom/client';
import './index.css';
import { versionAtLeast } from '@/features/hooks/useTelegramFeature.ts';
import { init, WebApp } from '@/init.ts';
import { RouterProvider } from 'react-router-dom';
import { router } from '@/app/appRouter.tsx';
import { UpdateTelegramPage } from '@/pages/UpdateTelegram';
import { ThemeProvider } from '@/app/context/ThemeProvider.tsx';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { Buffer } from 'buffer';
window.Buffer = Buffer;

const root = ReactDOM.createRoot(document.getElementById('root')!);

try {
  init();

  if (!versionAtLeast(WebApp.version, '7.0')) {
    root.render(<UpdateTelegramPage />);
  } else {
    root.render(
      <TonConnectUIProvider
        manifestUrl={`${window.location.origin}/tonconnect-manifest.json`}
      >
        <ThemeProvider>
          <RouterProvider router={router} />
        </ThemeProvider>
      </TonConnectUIProvider>
    );
  }
} catch (e) {
  console.error('Initialization failed:', e);
  root.render(<div>Not supported</div>);
}
