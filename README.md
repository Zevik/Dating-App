# 🎯 Match יחיד פעיל – אפליקציית היכרויות מבוססת שיחות קול/וידאו

[![GitHub](https://img.shields.io/badge/📁-GitHub%20Repo-blue?logo=github)](https://github.com/Zevik/Dating-app-09.04)

ברוך הבא לפרויקט האפליקציה החדשנית שלנו!  
המטרה: לבנות אפליקציית היכרויות שממוקדת בקשר אחד בכל רגע, תוך שימוש בשיחות קוליות ו/או וידאו עם מגבלות זמן – **בלי הודעות טקסט, בלי ריבוי Matches**.

---

## 🧭 ניווט מהיר

| קובץ | תיאור |
|------|--------|
| [`description.md`](./description.md) | אפיון חוויית משתמש, זרימות, קונספטים עסקיים וטכניים. |
| [`backend_specification.md`](./backend_specification.md) | מפרט טכני מלא של צד השרת – API, WebSockets, WebRTC, אבטחה, בדיקות וסקלאביליות. |
| [`schema.md`](./schema.md) | הנחיות עבודה למפתחים עם Prisma ו-TypeScript כדי להבטיח תאימות לסכמות. |
| [`steps.md`](./steps.md) | מתודולוגיית פיתוח איטרטיבית – שלב אחרי שלב, כולל בדיקות ואישורים. |
| [`SETUP_ENV.md`](./SETUP_ENV.md) | הסבר מלא על משתני סביבה ובדיקת ENV אוטומטית. |
| [`example.env`](./example.env) | תבנית משתני סביבה לדוגמה ליצירת `.env.local`. |

---

## 🏗️ שלבי פיתוח

הפרויקט נבנה בצעדים קטנים, עם פידבק בכל שלב:

1. יצירת פרויקט Node.js בסיסי
2. התקנת תלויות חיוניות
3. הגדרת סביבת עבודה (Jest, ESLint, .env)
4. הקמת API בסיסי
5. חיבור למסד הנתונים
6. יצירת טבלת Users ו־Auth API
7. פיתוח שיחות WebRTC
8. ניהול Matches עם מגבלת זמן
9. ניהול דיווחים, חסימות, והתראות
10. בדיקות עומס, סקלאביליות, ודיפלוי

> לפרטים מלאים – ראה [`steps.md`](./steps.md)

---

## 🛠️ טכנולוגיות עיקריות

- **Backend**: Node.js, Express.js, TypeScript
- **DB**: PostgreSQL + Prisma
- **WebSockets**: Socket.IO
- **שיחות**: WebRTC + STUN/TURN
- **Cache**: Redis
- **Storage**: S3-compatible
- **Testing**: Jest, Playwright, k6

---

## ⚙️ הפעלת הפרויקט

לפני ההפעלה, ודא שקובץ `.env.local` קיים בתיקייה הראשית.

ניתן להיעזר ב־[`example.env`](./example.env) או לקרוא את [`SETUP_ENV.md`](./SETUP_ENV.md) להסברים מפורטים ובדיקת תקינות אוטומטית של משתנים.

להרצה ראשונית:

```bash
cp example.env .env.local
npm install
npm run dev
```

## Stage 3 - Admin API for Statistics and Basic Dashboard

Stage 3 has been completed with the following components:

### Backend
- Admin API endpoint for statistics at `/api/v1/admin/stats` 
- Implemented admin service with Prisma queries to fetch:
  - Total users count
  - Active users count
  - Total matches count
  - Total reports count
  - Reports grouped by status
  - New users in the last 7 days
  - New reports in the last 7 days

### Frontend
- Admin dashboard page with statistics display
- UI cards showing each metric with appropriate visualizations
- API integration using Axios to fetch data from the backend

### Testing
- Added automated tests for admin stats API
- Test ensures API returns expected statistics format

### Security
- All admin routes are protected with authentication middleware
- Added admin role check to restrict access to admin features

### Usage
1. Run backend: `npm run dev`
2. Run admin dashboard: `cd admin-dashboard/admin-ui && npm run dev`
3. Login with admin credentials
4. View statistics on the dashboard

## Stage 4 - Reports Management API and Admin Interface

Stage 4 has been completed with the following components:

### Backend
- Admin API endpoints for managing reports:
  - GET `/api/v1/admin/reports` - Fetch all reports with reporter/reported user details
  - POST `/api/v1/admin/reports/:id/status` - Update report status
  - PATCH `/api/v1/admin/reports/:id` - Alternative endpoint for status updates
- Report status options: pending, reviewed, resolved, rejected

### Frontend
- Enhanced admin reports management page with:
  - Reports table with detailed information
  - User avatars and profile information
  - Status indicators with color coding
  - Action buttons for each status change option
  - Tooltip for long report content

### Security
- All report management APIs protected with authentication and admin-only access
- Validation of report status values

### Testing
- Added automated tests for report management APIs
- Tests verify access control and data manipulation

### Usage
1. Login to the admin dashboard
2. Navigate to the Reports page
3. View detailed information about each report
4. Change report status with action buttons
