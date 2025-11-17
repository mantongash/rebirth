# Contact Forms & Applications Setup

## ✅ Current Implementation

### Contact Forms
- **Storage**: All contact form submissions are stored in the `Contact` collection in MongoDB
- **Email Notifications**: 
  - Confirmation email sent to the submitter
  - Notification email sent to admin
- **Database Fields**:
  - name, email, subject, message, phone
  - status (new, read, replied, closed)
  - source, ipAddress, userAgent
  - createdAt, updatedAt

### Applications
- **Storage**: All program applications are stored in the `Application` collection in MongoDB
- **Email Notifications**:
  - Confirmation email sent to the applicant
  - Notification email sent to admin
- **Database Fields**:
  - firstName, lastName, email, phone
  - program, age, location, message
  - status (pending, reviewed, accepted, rejected, waitlisted)
  - reviewNotes, reviewedBy, reviewedAt
  - source, ipAddress, userAgent
  - createdAt, updatedAt

## 🔐 Admin Access

### Secured Routes (Admin Only)
All viewing and management routes now require admin authentication:

**Contact Routes:**
- `GET /api/contact` - View all contact submissions
- `PUT /api/contact/:id/status` - Update contact status
- `GET /api/admin/contacts` - Admin dashboard with filters and stats
- `PUT /api/admin/contacts/:id/status` - Update contact status

**Application Routes:**
- `GET /api/applications` - View all applications
- `GET /api/applications/:id` - View single application
- `PUT /api/applications/:id/status` - Update application status
- `GET /api/admin/applications` - Admin dashboard with filters and stats

### Public Routes (Anyone can submit)
- `POST /api/contact` - Submit contact form
- `POST /api/applications` - Submit application

## 📧 Email Configuration

To ensure emails are sent, configure these environment variables in `.env`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
```

**For Gmail:**
1. Enable 2-Factor Authentication
2. Generate an App Password: https://myaccount.google.com/apppasswords
3. Use the app password as `SMTP_PASS`

## 📊 Admin Dashboard Features

### Contact Management
- View all contact submissions with pagination
- Filter by status (new, read, replied, closed)
- Search by name, email, subject, or message
- View statistics (total, new, read, replied, closed)
- Update contact status
- Add review notes

### Application Management
- View all applications with pagination
- Filter by status (pending, reviewed, accepted, rejected, waitlisted)
- Filter by program type
- Search by name, email, phone, location, or message
- View statistics (total, pending, approved, rejected)
- Update application status
- Send review letters (accepted/rejected/waitlisted)
- Add review notes

## 🧪 Testing

1. **Test Contact Form Submission:**
   ```bash
   POST /api/contact
   {
     "name": "Test User",
     "email": "test@example.com",
     "subject": "Test Subject",
     "message": "Test message"
   }
   ```

2. **Test Application Submission:**
   ```bash
   POST /api/applications
   {
     "firstName": "John",
     "lastName": "Doe",
     "email": "john@example.com",
     "phone": "+254700000000",
     "program": "education",
     "age": 25,
     "location": "Nairobi",
     "message": "I want to apply"
   }
   ```

3. **Test Admin View (requires admin token):**
   ```bash
   GET /api/admin/contacts
   Authorization: Bearer <admin-token>
   
   GET /api/admin/applications
   Authorization: Bearer <admin-token>
   ```

## ✅ Summary

- ✅ Contact forms stored in database
- ✅ Applications stored in database
- ✅ Emails sent to users and admins
- ✅ Admin routes secured with authentication
- ✅ Admin can view all contacts and applications
- ✅ Admin can filter, search, and manage submissions
- ✅ Status tracking for both contacts and applications

All contact forms and applications are now properly stored in the database, emails are sent to both users and admins, and admins have secure access to view and manage all submissions through the admin dashboard.

