# Admin Role System Documentation

## 🎯 Role Hierarchy

The system now supports **three role levels**:

1. **`super_admin`** - Full access, can create/manage other admins
2. **`admin`** - Can manage content, contacts, applications (but cannot create other admins)
3. **`user`** - Regular users with standard access

## ✅ What Each Role Can Do

### Super Admin (`super_admin`)
- ✅ Create new admin accounts
- ✅ Promote users to admin
- ✅ View all admins
- ✅ Update admin details
- ✅ Remove/demote admins (to regular users)
- ✅ All admin capabilities (contacts, applications, content management)
- ✅ Update own profile and password

### Admin (`admin`)
- ✅ Manage contacts and applications
- ✅ Manage content and products
- ✅ View all submissions
- ✅ Update own profile and password
- ❌ Cannot create other admins
- ❌ Cannot promote users to admin
- ❌ Cannot remove other admins

### User (`user`)
- ✅ Standard user features
- ✅ Update own profile and password
- ❌ No admin access

## 🔐 Authentication Middleware

### `authenticateAdmin`
- Allows both `admin` and `super_admin` roles
- Used for general admin routes (contacts, applications, content)

### `authenticateSuperAdmin`
- Only allows `super_admin` role
- Used for admin management routes (create admin, remove admin)

## 📋 API Endpoints

### Profile & Password Management (All Users)
```
PUT /api/auth/profile
- Update own profile (firstName, lastName, phone, address, preferences)
- All users including admins can use this

PUT /api/auth/change-password
- Change own password
- Requires: currentPassword, newPassword
- All users including admins can use this
```

### Admin Management (Super Admin Only)
```
POST /api/admin/create-admin
- Create new admin account
- Requires: firstName, lastName, email, phone, password
- Only super_admin can access

PUT /api/admin/users/:id/promote-to-admin
- Promote a user to admin role
- Only super_admin can access

GET /api/admin/admins
- List all admins (admin and super_admin)
- Only super_admin can access

PUT /api/admin/admins/:id
- Update admin details
- Only super_admin can access
- Cannot modify other super_admins

DELETE /api/admin/admins/:id
- Remove admin (demote to user)
- Only super_admin can access
- Cannot remove yourself
- Cannot remove super_admin
```

### General Admin Routes (Admin & Super Admin)
```
GET /api/admin/contacts
GET /api/admin/applications
GET /api/contact
GET /api/applications
PUT /api/contact/:id/status
PUT /api/applications/:id/status
... (all other admin routes)
```

## 🚀 Setup Instructions

### 1. Create First Super Admin

The first admin is automatically created as `super_admin` when you call:
```
POST /api/setup-admin
```

This creates:
- Email: `admin@rebirthofaqueen.org`
- Password: `admin123`
- Role: `super_admin`

**⚠️ IMPORTANT**: Change this password immediately after first login!

### 2. Create Additional Admins

As a super admin, you can create more admins:
```bash
POST /api/admin/create-admin
Authorization: Bearer <super-admin-token>
{
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+254700000000",
  "password": "securepassword123"
}
```

### 3. Promote Existing User to Admin

```bash
PUT /api/admin/users/:userId/promote-to-admin
Authorization: Bearer <super-admin-token>
{
  "role": "admin"
}
```

## 🔒 Security Features

1. **Role Protection**: Super admin routes are protected with `authenticateSuperAdmin`
2. **Self-Protection**: Cannot remove your own admin access
3. **Super Admin Protection**: Cannot remove or modify other super admins (except yourself)
4. **Password Security**: All passwords are hashed with bcrypt (12 rounds)
5. **Audit Logging**: All admin actions are logged to console

## 📝 Profile Management

### All Admins Can:
- ✅ Update their own profile information
- ✅ Change their own password
- ✅ Update preferences
- ✅ Manage their own account settings

### Profile Update Example:
```bash
PUT /api/auth/profile
Authorization: Bearer <admin-token>
{
  "firstName": "Updated",
  "lastName": "Name",
  "phone": "+254700000001"
}
```

### Password Change Example:
```bash
PUT /api/auth/change-password
Authorization: Bearer <admin-token>
{
  "currentPassword": "oldpassword",
  "newPassword": "newsecurepassword"
}
```

## 💡 Best Practices

1. **Limit Super Admins**: Only create 1-2 super admins for security
2. **Strong Passwords**: Enforce strong passwords for all admins
3. **Regular Audits**: Review admin list regularly (`GET /api/admin/admins`)
4. **Change Default Password**: Immediately change the default super admin password
5. **Role Principle**: Use regular `admin` role for most staff, reserve `super_admin` for owners/founders

## 🔄 Migration Notes

If you have existing admins:
- They will continue to work as `admin` role
- To upgrade to `super_admin`, manually update in database or use:
  ```javascript
  // In MongoDB or via script
  db.users.updateOne(
    { email: "admin@example.com" },
    { $set: { role: "super_admin" } }
  )
  ```

## 📊 Role Comparison Table

| Feature | User | Admin | Super Admin |
|---------|------|-------|-------------|
| View contacts/applications | ❌ | ✅ | ✅ |
| Manage content | ❌ | ✅ | ✅ |
| Create admin | ❌ | ❌ | ✅ |
| Remove admin | ❌ | ❌ | ✅ |
| Update own profile | ✅ | ✅ | ✅ |
| Change own password | ✅ | ✅ | ✅ |

## 🎯 Recommendation

**Recommended Structure:**
- **1-2 Super Admins**: Founders/owners who need full control
- **2-5 Regular Admins**: Staff members who manage day-to-day operations
- **Unlimited Users**: Regular website users

This provides a good balance between security and functionality!

