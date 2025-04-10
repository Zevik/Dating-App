# 📄 SETUP_ENV.md
**הגדרת משתני סביבה + בדיקת תקינות אוטומטית (`.env`)**

---

## 🧩 מטרה
לאכוף שכל משתני הסביבה הקריטיים קיימים לפני שהשרת מופעל, ולספק תבנית לדוגמה (`example.env`) לשיתוף.

---

## 🛠️ שלבים לביצוע (עבור קרסור AI או מפתח אנושי)

### 1. צור קובץ `env-validator.config.js` בשורש הפרויקט:

```js
module.exports = {
  required: [
    'DATABASE_URL',
    'REDIS_URL',
    'JWT_SECRET',
    'S3_BUCKET',
    'AWS_ACCESS_KEY_ID',
    'AWS_SECRET_ACCESS_KEY',
    'TURN_SECRET',
    'TURN_URL',
    'NODE_ENV',
    'PORT'
  ]
};
```

---

### 2. צור קובץ `scripts/check-env.ts` עם תוכן הבא:

```ts
import dotenv from 'dotenv';
import dotenvExpand from 'dotenv-expand';
import env from 'env-var';
import { required } from '../env-validator.config';

dotenvExpand.expand(dotenv.config({ path: '.env.local' }));

let hasError = false;

for (const key of required) {
  const value = env.get(key).asString();
  if (!value) {
    console.error(`❌ Missing: ${key}`);
    hasError = true;
  } else {
    console.log(`✅ ${key} found`);
  }
}

if (hasError) {
  console.error('\n❌ Missing environment variables. Exiting.\n');
  process.exit(1);
}
```

---

### 3. עדכן את `package.json`

```json
{
  "scripts": {
    "check-env": "ts-node scripts/check-env.ts",
    "predev": "npm run check-env",
    "dev": "ts-node src/index.ts"
  }
}
```

---

### 4. צור קובץ `example.env` לשיתוף עם הצוות:

```env
# DATABASE
DATABASE_URL=postgresql://postgres:your_password@localhost:5432/dating_app

# REDIS
REDIS_URL=redis://localhost:6379

# JWT
JWT_SECRET=your_jwt_secret

# S3
S3_BUCKET=match-app-media
AWS_ACCESS_KEY_ID=your_key
AWS_SECRET_ACCESS_KEY=your_secret
S3_ENDPOINT=http://localhost:9000

# TURN
TURN_SECRET=your_turn_secret
TURN_URL=turn:your-turn-server.com:3478

# APP
NODE_ENV=development
PORT=3000
```

---

### 5. הגדר `.gitignore` כדי למנוע חשיפת נתונים רגישים

```gitignore
.env
.env.local
```

---

## 📌 סיכום

- `npm run check-env` יוודא שכל הערכים קיימים
- `npm run dev` יריץ את הבדיקה אוטומטית
- יש להשוות את `example.env` ל־`env-validator.config.js` לפני דיפלוי
