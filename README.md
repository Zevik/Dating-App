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
