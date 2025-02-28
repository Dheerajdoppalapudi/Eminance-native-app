# App Name: Eminance 


### Backend Setup
1. Clone the repository.
2. Navigate to the backend directory:
   ```bash
   cd Django.Backend/
   ```
3. Create a virtual environment and activate it:
   ```bash
   python -m venv env
   source env/bin/activate  # For Windows: env\Scripts\activate
   ```
4. Install dependencies:
   ```bash
   cd serverapp
   pip install -r requirements.txt
   ```
5. Apply migrations:
   ```bash
   python manage.py migrate
   python manage.py makemigrations
   ```
6. To start the development server and access the Django Admin Page, run:
   ```bash
   python manage.py runserver
   ```
   - To create super-user to access the Django Admin Pannel
     ```bash
     python manage.py createsuperuser
     ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd Eminance 
   ```
2. Install dependencies:
   ```bash
   npm install expo
   npx expo install expo-router react-native-safe-area-context react-native-screens expo-linking expo-constants expo-status-bar
   npm install
   ```
3. Start the app using expo:
   ```bash
   npx expo start --clear
   ```

### On Code Update (Pull)
   ```
   pwd
   ```
   Make sure that you are in this location <br>
   ../React Native and Django/Eminance<br>
   To install missing packages:<br>
   ```
   npm install
   ```

### Prisma and node.js set up

```
cd nodeJs.Backend
npm install 
```

Delete all the exsisting migrations
```
npx prisma db push --force-reset
```

Apply Migrations
```
npx prisma migrate dev
```

Apply all the dummy data
```
npx prisma db seed
```

Prisma Studio
```
npx prisma studio
```

Start Nodejs server
```
node server.js
```

