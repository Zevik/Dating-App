# 🧠 Developer Guidelines – Preventing Prisma & TypeScript Mismatches

_Last updated: 09/04/2025_

## 📌 Who This Is For
This document is for all developers (human or AI) working on this project using:
- TypeScript
- Prisma ORM
- PostgreSQL
- Express
- WebSockets
- Jest

## 🎯 Goal
Prevent discrepancies between `schema.prisma`, TypeScript code, and the running server. Avoid adding or referencing non-existent fields, types, or models.

---

## 🔧 Before Making Changes

1. **Read and Understand the Prisma Schema**  
   File location:  
   ```bash
   server/prisma/schema.prisma
   ```

2. **Never reference or use fields that do not exist in the schema**  
   Example of mistakes to avoid:
   - `revokedAt`, `emailVerifiedAt` (not in schema)
   - `dislike` model (doesn’t exist)
   - `reportedUser`, `blocker`, `targetId` fields (invalid)

3. **If you need a new field or model**, request it explicitly:
   ```
   I need to add the field `revokedAt` to `RefreshToken`. Here's the proposed definition...
   ```

---

## 🧪 During Development

1. If you **modify schema.prisma**, notify with:
   ```
   Prisma schema has changed. Run:
   npx prisma generate --schema=server/prisma/schema.prisma
   npx prisma migrate dev
   ```

2. Do not hardcode object literals with properties that are not part of the schema.

---

## ✅ After Making Changes

Always run the following 3-step check before pushing or asking for testing:

### Step 1 – Validate Prisma schema:
```bash
npx prisma validate --schema=server/prisma/schema.prisma
```

### Step 2 – Check TypeScript Types:
```bash
npx tsc --noEmit
```

### Step 3 – Run the server:
```bash
npm run dev
# or
npm start
```

If any errors occur, fix them before proceeding.

---

## 🚀 Future-Proofing (Optional Enhancements)

- [ ] Create `dev-check.sh` script with the above three steps.
- [ ] Add post-install hook to warn if Prisma schema is outdated.
- [ ] Set up type coverage reporting.

Happy coding! 🎉
