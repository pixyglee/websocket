

```markdown
# Project Setup and Execution

## Backend (WebSocket Server)

1. **Navigate to the Backend Directory**
   ```bash
   cd week-19-ws
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Build TypeScript Code**
   ```bash
   tsc -b
   ```

4. **Run the Server**
   ```bash
   node dist/index.js
   ```

## Frontend (React WebSocket Client)

1. **Navigate to the Frontend Directory**
   ```bash
   cd react-ws
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start the Development Server**
   ```bash
   npm run dev
   ```

4. **Test in Browser**
   Open your browser and go to `http://localhost:3000` (or the port specified in your `package.json`).

5. **Test with Hoscotch**
   If you're using [Hoscotch](https://hoscotch.com) for testing WebSocket connections, ensure it is set up to connect to `ws://localhost:8080`.

