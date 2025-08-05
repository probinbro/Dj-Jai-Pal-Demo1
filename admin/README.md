# DJ JAI Admin Panel

## Overview
The DJ JAI Admin Panel is a comprehensive content management system that allows you to manage events and gallery content for the DJ JAI website.

## Features

### 🔐 Authentication
- Secure login system
- Session management
- Password change functionality

### 📅 Events Management
- Add new events
- Edit existing events
- Delete events
- Event details include:
  - Title
  - Date and time
  - Location
  - Description
  - Event image

### 🖼️ Gallery Management
- Add images and videos
- Edit gallery items
- Delete gallery items
- Support for both images and videos
- Gallery items include:
  - Title
  - URL/file path
  - Description

## Getting Started

### 1. Access the Admin Panel
Navigate to: `[your-website]/admin/index.html`

### 2. Login Credentials
- **Username**: `admin`
- **Password**: `djjai123`

⚠️ **Important**: Change the default password after first login for security.

### 3. Navigation
The admin panel has three main tabs:
- **Events Management**: Manage upcoming and past events
- **Gallery Management**: Manage images and videos
- **Settings**: Change admin password and other settings

## How to Use

### Managing Events

#### Adding a New Event
1. Click on "Events Management" tab
2. Click "Add New Event" button
3. Fill in the event details:
   - **Title**: Name of the event
   - **Date**: Event date (use date picker)
   - **Time**: Event time (use time picker)
   - **Location**: Venue or location details
   - **Description**: Additional event information
   - **Image URL**: Link to event poster/image (optional)
4. Click "Save Event"

#### Editing an Event
1. Find the event in the events list
2. Click the "Edit" button
3. Modify the details in the form
4. Click "Save Event"

#### Deleting an Event
1. Find the event in the events list
2. Click the "Delete" button
3. Confirm the deletion in the popup

### Managing Gallery

#### Adding Images
1. Click on "Gallery Management" tab
2. Click "Add Image" button
3. Fill in the details:
   - **Title**: Image title/caption
   - **URL**: Direct link to the image file
   - **Description**: Optional description
4. Click "Save Item"

#### Adding Videos
1. Click on "Gallery Management" tab
2. Click "Add Video" button
3. Fill in the details:
   - **Title**: Video title/caption
   - **URL**: Direct link to the video file
   - **Description**: Optional description
4. Click "Save Item"

#### Editing Gallery Items
1. Find the item in the gallery grid
2. Click the "Edit" button (pencil icon)
3. Modify the details
4. Click "Save Item"

#### Deleting Gallery Items
1. Find the item in the gallery grid
2. Click the "Delete" button (trash icon)
3. Confirm the deletion

## Data Storage

### Local Storage
The admin panel stores data in the browser's local storage:
- Events: `djjai_events`
- Gallery: `djjai_gallery`

### Data Integration
The main website automatically loads data from the admin panel through the Data API (`data-api.js`).

## File Structure
```
admin/
├── index.html          # Main admin panel interface
├── admin-styles.css    # Admin panel styles
├── admin-script.js     # Admin panel functionality
├── data-api.js         # Data integration with main website
└── README.md           # This documentation
```

## Security Notes

### ⚠️ Important Security Considerations

1. **Change Default Password**: Always change the default login credentials
2. **HTTPS**: Use HTTPS in production for secure data transmission
3. **Access Control**: Restrict access to the admin folder on your server
4. **Backup**: Regularly backup your data
5. **Updates**: Keep the system updated

### Production Deployment

For production use, consider implementing:
- Server-side authentication
- Database storage instead of localStorage
- File upload functionality for images/videos
- User roles and permissions
- Activity logging

## Browser Compatibility

The admin panel works with modern browsers:
- Chrome 80+
- Firefox 75+
- Safari 13+
- Edge 80+

## Troubleshooting

### Common Issues

#### Login Issues
- Check username and password (case-sensitive)
- Clear browser cache and cookies
- Ensure JavaScript is enabled

#### Data Not Saving
- Check browser's local storage permissions
- Ensure sufficient storage space
- Try refreshing the page

#### Images/Videos Not Loading
- Verify URL is correct and accessible
- Check file format compatibility
- Ensure proper file permissions

#### Data Not Showing on Main Website
- Refresh the main website page
- Check browser console for errors
- Verify data-api.js is loaded

### Getting Help

If you encounter issues:
1. Check the browser console for error messages
2. Verify all files are uploaded correctly
3. Ensure proper file permissions
4. Clear browser cache and try again

## Backup and Recovery

### Creating Backups
1. Go to browser developer tools (F12)
2. Navigate to Application/Storage tab
3. Find Local Storage for your domain
4. Copy the values for:
   - `djjai_events`
   - `djjai_gallery`
5. Save these values in a text file

### Restoring from Backup
1. Go to browser developer tools (F12)
2. Navigate to Application/Storage tab
3. Find Local Storage for your domain
4. Paste the backup values back into:
   - `djjai_events`
   - `djjai_gallery`
5. Refresh the admin panel

## Customization

### Styling
Modify `admin-styles.css` to change the appearance:
- Colors: Update CSS custom properties in `:root`
- Layout: Modify grid and flexbox properties
- Typography: Change font families and sizes

### Functionality
Modify `admin-script.js` to add features:
- Additional form fields
- New content types
- Enhanced validation
- Export/import functionality

## Updates and Maintenance

### Regular Tasks
1. **Weekly**: Review and update events
2. **Monthly**: Add new gallery content
3. **Quarterly**: Change admin passwords
4. **Annually**: Review and backup all data

### Version Updates
Keep track of updates to:
- Core functionality
- Security patches
- Feature additions
- Bug fixes

---

For technical support or feature requests, please contact the development team.
here is the config
<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyCil_Sua4GZKyiunAqDKFqd83hv7UATrsg",
    authDomain: "dj-jai-pal-website.firebaseapp.com",
    projectId: "dj-jai-pal-website",
    storageBucket: "dj-jai-pal-website.firebasestorage.app",
    messagingSenderId: "226130279337",
    appId: "1:226130279337:web:dddf06dc6811b5e77ee2b8",
    measurementId: "G-24MSGVFFJG"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>