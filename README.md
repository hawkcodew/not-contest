To run the frontend locally:
1.	Install dependencies:

npm / yarn / bun install 

2.	Start the development server:

npm / yarn / bun run dev

The app will be available at http://localhost:5173, which you can use as the Mini App URL in Telegram settings for testing.
3.	To build the app for production:

npm / yarn / bun run build

The production files will be generated in the dist folder — this is what you should deploy to your hosting (e.g., Vercel, Netlify, or custom domain).
4.	To preview the production build locally:

npm / yarn / bun run preview

This runs a local server serving the built dist folder.

Set up .env file

VITE_API_URL={your backend API URL}
VITE_TON_DESTINATION_ADDRESS={NOTCOIN address where payments will be sent}
VITE_BOT_USERNAME={Telegram bot username, e.g. @yourbotname}
VITE_APP_NAME={app name as configured in @BotFather, e.g. /myapps}
VITE_TONCENTER_KEY={your toncenter API key}
VITE_JETTON_MASTER_ADDRESS={jetton master address used in the app}