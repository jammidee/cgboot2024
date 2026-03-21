# Menu Design Notes

---
## Recommendation
- Side Bar = System Map - Primary navigation (Module and Core Features)
- Top Bar = User and Global Context (User, Notification, Search)
- Right Bar = Contextual Page Tools and Settings (Filter, Preference, Quick Tools)

---

## Framework-Level Design Rule
- Side Bar = Module Driven
- Top Bar = system-driven
- Right Bar = page-driven

## Framework Menu Goal
- Scale Cleanly
- Be easy to maintain
- Support multi-module system
- Feel Enterprize-build.

---

### What's on the Top Bar

- 🔍 Global Search
- 🔔 Notifications
- 💬 Messages (optional)
- 🌐 Branch / Company Switcher
- 👤 User Profile Dropdown


### User Dropdown
- My Profile
- Change Password
- Preferences
- Logout

** This must never be changed per module

### What's on the Right Bar
- Page Filters
- Quick Actions
- Pesonalization
- Help / Info panel

---

## Framework Level Desight tools
- Create a Layout Policy
- 1️⃣ Sidebar = module-driven
- 2️⃣ Topbar = system-driven
- 3️⃣ Rightbar = page-driven

# Enterprise-Level Patterns

- Item Type	Location
- Module	Sidebar
- Page	Sidebar
- CRUD Buttons (Add, Edit, Delete) Inside page
- Global User Info	Topbar
- Filters	Rightbar
- System Settings	Sidebar under Administration
- Per-user Settings	Topbar dropdown

## ⚠️ Common Mistakes to Avoid

- ❌ Putting settings in both sidebar and rightbar
- ❌ Putting navigation in rightbar
- ❌ Putting module switching in rightbar
- ❌ Overloading topbar with buttons
- ❌ Different layout per module


## 🎨 Suggested Standard Structure for ALL Modules

    Dashboard

    <Module>
    - Overview
    - Master Data
    - Transactions
    - Reports
    - Configuration

---

## 💎 Bonus: Advanced UX Improvement

Add:

1. Recently Visited Pages (Topbar dropdown)
2. Favorites (Star icon per menu)
3. Global Command Palette (Ctrl + K)
4. That makes your framework feel modern.

---

# Sidebar (WHAT Can I Access)
👉 Sidebar = System Navigation (permanent and structured)

## What Can I Access with my Sidebar
1. Modules
2. Submodules
3. CRUD Pages
4. Reports
5. Master Data

## Why Sidebar?
Because:
- it is always visible
- It represents system structure
- It's Hierarchical
- It matches RBAC (role-based access control)
- 

# Topbar (WHAT is happenning now)
👉 Topbar = Global Context + Quick Access
Keep this minimal and consistent access modules

## Recommended Topbar Items

**Left side:**

- ☰ Sidebar Toggle
- Breadcrumbs (optional but very useful)

**Right side:**

- 🔍 Global Search
- 🔔 Notifications
- 💬 Messages (optional)
- 🌐 Branch / Company Switcher
- 👤 User Profile Dropdown

**User Dropdown Should include:**

- My Profile
- Change Password
- Preferences
- Logout

This must NEVER change per module.

--- 

## ✅ 3️⃣ RIGHTBAR — "TOOLS for this page"

👉 Rightbar = Contextual & Temporary Tools

