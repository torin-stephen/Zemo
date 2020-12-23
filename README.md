# Zemo
****
A modern social link page app built with React, Material UI and Firebase. Made on the basis of [Ketyl](https://ketyl.ml/gh-ketyl)

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
****
### Features

1. Hosted with FireBase
2. Admin Panel
4. Modern UI

****
## Requirements

1. A Firebase project with Hosting

2. Short domain

3. Enable Google authentication in your Firebase Authentication settings

4. Enable Firestore in the Firebase project.
****
## How to Use

1. Visit https://switching.ml/

2. Login using google.

3. Add your social links

4. Done! You can now visit the new short URL which will have a custom page with your profile image, name and social links.
****
## Configuration

The following configurations are available:

| Parameter | Type | Description |
|:---------:|:----:|:-----------:|
| global.config.mainsite | URL | The site to which a blank suffix redirects. For ex: **short.site** -> **long.site** |
****
### Suggested Rules for Firebase Database

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read : if true;
      allow write : if request.auth.uid != null;
    }
  }
}
```

****

