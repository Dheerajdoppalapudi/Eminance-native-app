### Backend Setup
1. Clone the repository.
2. Navigate to the backend directory:
   ```bash
   cd Django\ Authentication/
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
