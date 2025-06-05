## To run the frontend locally:
### 1.	Install dependencies:

```sh
bun install 
```

### 2.	Start the development server:

```sh
bun run dev
```

#### The app will be available at http://localhost:5173, which you can use as the Mini App URL in Telegram settings for testing.
### 3.	To build the app for production:

```sh
bun run build
```

#### The production files will be generated in the dist folder — this is what you should deploy to your hosting (e.g., Vercel, Netlify, or custom domain).
### 4.	To preview the production build locally:

```sh
bun run preview
```

#### This runs a local server serving the built dist folder.

```
VITE_API_URL=YOUR_BACKEND_URL                    # API URL for backend requests
VITE_TON_DESTINATION_ADDRESS=TON_ADDRESS         # NOTCOIN address where payments will be sent
VITE_BOT_USERNAME=@yourbotname                   # Telegram bot username (e.g. @yourbotname)
VITE_APP_NAME=/myapps                            # App name as configured in @BotFather (e.g. /myapps)
VITE_TONCENTER_KEY=YOUR_TONCENTER_API_KEY        # Toncenter API key for blockchain interactions
VITE_JETTON_MASTER_ADDRESS=JETTON_MASTER_ADDRESS # Jetton master address used in the app
```