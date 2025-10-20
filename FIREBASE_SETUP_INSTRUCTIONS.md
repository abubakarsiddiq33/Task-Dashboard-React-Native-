# Firebase Firestore Setup Instructions

## Fix "Missing or insufficient permissions" Error

### Step 1: Go to Firebase Console
1. Open [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `task-dashboard-424dc`

### Step 2: Update Firestore Security Rules
1. In the left sidebar, click on **"Firestore Database"**
2. Click on **"Rules"** tab
3. Replace the existing rules with the following:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow read/write access to all documents for authenticated users
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
    
    // More specific rules for tasks collection
    match /tasks/{taskId} {
      allow read, write: if request.auth != null;
    }
    
    // Rules for users collection
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

### Step 3: Publish Rules
1. Click **"Publish"** button
2. Confirm the changes

### Step 4: Test the App
1. Restart your Expo development server
2. Try creating a task again

## Alternative: Temporary Development Rules (Less Secure)
If you want to allow all access for development only:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if true;
    }
  }
}
```

**⚠️ Warning: Never use `if true` in production! This allows anyone to read/write your database.**

## Troubleshooting
- Make sure you're logged in to the app before trying to create tasks
- Check that Firebase project ID matches in your config
- Ensure Firestore is enabled in your Firebase project

