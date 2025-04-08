
אפיון מערכת כולל: אפליקציית היכרויות "Match יחיד פעיל" עם שיחות קול/וידאו מוגבלות בזמן

גרסה: 1.0
תאריך: 25 במאי 2024

מסמך זה מהווה אפיון מקיף וסופי (נכון למועד זה) לדרישות הפונקציונליות, הטכניות והעסקיות של האפליקציה.

תוכן עניינים:

מבוא וסקירה כללית
1.1 חזון ומטרות
1.2 קונספט מרכזי: Match יחיד פעיל ותקשורת קולית/וידאו מוגבלת
1.3 קהל יעד
1.4 מדדי הצלחה עיקריים (KPIs)

Onboarding וחווית משתמש ראשונית
2.1 תהליך הרשמה ואימות
2.2 מסכי הדרכה והסבר המכניקה הייחודית
2.3 יצירת פרופיל ראשוני (כולל עוזר AI)
2.4 בקשת הרשאות (מיקום, מיקרופון, מצלמה, התראות)

זרימת משתמש (User Journey)
3.1 זרימה עיקרית: מהרשמה ועד סיום Match
3.2 תרחישים משניים (עריכת פרופיל, ניהול הגדרות)

פונקציונליות ליבה
4.1 ניהול פרופיל משתמש
4.2 גלריית גילוי (Discovery) ומנגנון לייק/דיסלייק
4.3 מנגנון יצירת Match יחיד פעיל ונעילת גלריה
4.4 ניהול שיחות קוליות ווידאו:
4.4.1 ייזום שיחה קולית
4.4.2 מגבלת זמן אוטומטית (X דקות)
4.4.3 מנגנון בקשת ואישור הארכה הדדית
4.4.4 מנגנון בקשת ואישור שדרוג לווידאו הדדי
4.4.5 מגבלת זמן לשיחת וידאו (Y דקות) ומנגנון הארכה
4.4.6 ממשק משתמש בזמן שיחה (טיימר, כפתורים)
4.5 סיום Match (יזום, חסימה, Timeout)
4.6 מנגנון התראות Push
4.7 מנגנון דיווח וחסימה

טיפול במצבי קצה ותוכניות גיבוי
5.1 משתמש לא מגיב / ניתוקים בשיחה
5.2 Timeout אוטומטי עקב אי-פעילות ב-Match (Z ימים)
5.3 הודעות מערכת שקופות (סיום Match, שגיאות)

בטיחות, ניטור ומדיניות תוכן
6.1 מדיניות קהילה ותנאי שימוש
6.2 תהליך טיפול בדיווחים
6.3 ממשק Admin לניהול וניטור
6.4 מנגנונים למניעת ספאם ופרופילים מזויפים

מודל עסקי ומוניטיזציה (תכנון עתידי)
7.1 מודל Freemium
7.2 תכונות פרימיום אפשריות (מותאמות לשיחות)
7.3 זרימת תשלום והתממשקות לספקים

אבטחת מידע ופרטיות
8.1 עמידה בתקנות (GDPR/CCPA)
8.2 הצפנת נתונים (במעבר ובמנוחה)
8.3 אבטחת WebRTC (Signaling, Media)
8.4 מדיניות פרטיות מפורטת (כולל AI, שיחות, הרשאות)
8.5 ניהול הסכמות משתמש (Granular, Opt-in)
8.6 מדיניות שמירת ומחיקת נתונים (Right to be Forgotten)
8.7 אי-הקלטת תוכן שיחות (קריטי)

ניהול שגיאות, לוגים וניטור מערכת
9.1 טיפול בשגיאות נפוצות (רשת, שרת, קלט, שיחה)
9.2 אסטרטגיית רישום לוגים (Server-side, Client-side אופציונלי)
9.3 ניטור ביצועים וזמינות בזמן אמת

שיקולי ביצועים, סקלאביליות ובדיקות עומס (WebRTC)
10.1 זיהוי רכיבים קריטיים לביצועים (Signaling, STUN/TURN, DB, API, Client)
10.2 אתגרים צפויים תחת עומס
10.3 אסטרטגיות אופטימיזציה וסקלאביליות
10.4 תוכנית בדיקות עומס מפורטת (מטרות, תרחישים, כלים, סביבה)
10.5 ניטור מדדי ביצועים ספציפיים ל-WebRTC

ארכיטקטורה טכנית ומבנה מסד נתונים (ERD)
11.1 בחירת טכנולוגיות (שפות, Frameworks, DB, WebRTC Libs)
11.2 מבנה מסד נתונים מפורט (ERD וטבלאות)

הרחבות ואפשרויות עתידיות

סיכום

1. מבוא וסקירה כללית

1.1 חזון ומטרות: ליצור פלטפורמת היכרויות המעודדת קשרים אותנטיים ואינטראקציות ממוקדות באמצעות תקשורת קולית/וידאו ישירה, תוך הימנעות מהסחות דעת של ריבוי שיחות טקסט ו-Matches במקביל.

1.2 קונספט מרכזי:

Match יחיד פעיל: משתמש יכול להיות ב-Match פעיל אחד בלבד בכל זמן נתון. הגישה לגלריית הגילוי חסומה בזמן Match פעיל.

תקשורת קול/וידאו בלבד: אין אפשרות לשליחת הודעות טקסט. התקשורת מתחילה בשיחה קולית.

הגבלת זמן הדדית: כל שיחה (קולית או וידאו) מוגבלת בזמן (X/Y דקות). הארכה או שדרוג לווידאו דורשים הסכמה הדדית מיידית לאחר סיום הזמן.

1.3 קהל יעד: משתמשים המחפשים חווית היכרויות אישית ומעמיקה יותר, המעדיפים שיחה ישירה על פני התכתבות טקסט, ומוכנים להשקיע זמן בקשר אחד בכל פעם.

1.4 מדדי הצלחה עיקריים (KPIs): אחוז יצירת Matches מוצלחים, ממוצע שיחות ל-Match, אחוז שיחות המגיעות להארכה/שדרוג, שיעור שימור משתמשים (Retention), דירוג בחנויות האפליקציות, מספר דיווחים נמוך יחסית, מדדי ביצועים טכניים (זמן הקמת שיחה, אחוז שיחות מוצלחות).

2. Onboarding וחווית משתמש ראשונית

2.1 תהליך הרשמה ואימות: אימייל + סיסמה (עם אימות חוזק), אימות אימייל (קוד/קישור).

2.2 מסכי הדרכה: סדרת מסכים קצרה וברורה בעת כניסה ראשונה, המסבירה:

את קונספט ה-Match היחיד הפעיל ("פוקוס על קשר אחד").

את מנגנון השיחות ("מדברים, לא מתכתבים").

את מגבלת הזמן והצורך בהסכמה הדדית להארכה/שדרוג ("X דקות לקול, Y דקות לווידאו, הארכה רק אם שניכם רוצים").

המחשה ויזואלית קצרה של התהליך.

2.3 יצירת פרופיל ראשוני: שם תצוגה, גיל (מתאריך לידה, מינימום 18), מגדר, העדפות חיפוש (מגדר, טווח גילאים), העלאת תמונת פרופיל חובה (+תמונות נוספות אופציונליות), כתיבת Bio (אפשרות לעזרה מ-AI בלחיצת כפתור, Opt-in).

2.4 בקשת הרשאות:

הסכמה לתנאי שימוש ומדיניות פרטיות (Checkbox לא מסומן, חובה).

מיקום: אופציונלי, אם ימומש חיפוש מבוסס מרחק (לבקש רק כשצריך, עם הסבר ברור).

מיקרופון: Just-in-Time, לפני ניסיון ראשון ליזום/לקבל שיחה קולית (עם הסבר ברור).

מצלמה: Just-in-Time, לפני ניסיון ראשון ליזום/לקבל שיחת וידאו (עם הסבר ברור).

התראות Push: בקשה סטנדרטית של מערכת ההפעלה, מוסברת באפליקציה.

3. זרימת משתמש (User Journey)

3.1 זרימה עיקרית:

הרשמה/כניסה -> Onboarding (אם פעם ראשונה) -> מסך גלריה (אם אין Match פעיל).

דפדוף בכרטיסים -> לייק/דיסלייק.

(אם נוצר Match הדדי ואין Match פעיל אחר לשני הצדדים) -> הודעת Match + התראת Push -> מעבר אוטומטי למסך ה-Match -> גלריה ננעלת.

במסך ה-Match: הצגת פרופיל ה-Match, כפתור "התחל שיחה קולית".

משתמש A לוחץ "התחל שיחה קולית" -> משתמש B מקבל מסך שיחה נכנסת (עם תמונה, שם) -> B עונה/דוחה.

אם B עונה: מתחילה שיחה קולית (X דקות), מוצג טיימר, כפתורי Mute/End.

טיימר מגיע ל-0 -> שיחה מתנתקת אוטומטית -> Prompt מיידי לשני הצדדים: "להאריך ב-X דקות?" (כן/לא, 20 שניות להחליט) או "לעבור לווידאו?" (אם התנאים מאפשרים, כן/לא).

אם שני הצדדים לחצו "כן" לאותה אופציה -> מתחילה שיחה חדשה (קולית או וידאו) לאותו פרק זמן (X או Y דקות).

אם אחד לחץ "לא" / הזמן עבר / בחרו אופציות שונות -> חוזרים למסך ה-Match (הוא נשאר פעיל).

(חוזר לשלב 5 או 8, או שאחד המשתמשים בוחר לסיים את ה-Match).

משתמש A לוחץ "סיים Match" -> הודעת אישור -> Match מסתיים (is_active=false) -> הודעה לצד B -> גלריה נפתחת לשני המשתמשים.

(חוזר לשלב 2).

3.2 תרחישים משניים: גישה להגדרות (ניהול פרופיל, העדפות, חסומים, הסכמות, תמיכה, התנתקות), עריכת פרטי פרופיל (שינויי חיפוש ישפיעו רק על ה-Match הבא).

4. פונקציונליות ליבה

4.1 ניהול פרופיל משתמש: שדות כפי שהוגדרו ב-ERD (סעיף 11.2). כולל עוזר AI ל-Bio (Opt-in, הסכמה נפרדת). עריכה זמינה תמיד.

4.2 גלריית גילוי ומנגנון לייק/דיסלייק: הצגת כרטיס אחד בכל פעם. החלקה/כפתורים ללייק/דיסלייק. פעולות נשמרות בטבלת Likes.

4.3 מנגנון יצירת Match יחיד פעיל ונעילת גלריה:

בדיקה לאחר לייק: האם קיים לייק הפוך? האם שני המשתמשים אינם ב-Match פעיל אחר? (בדיקה אטומית/קריטית).

יצירת רשומה ב-Matches (is_active=true).

הודעות + מעבר אוטומטי למסך Match + נעילת גלריה ויזואלית ופונקציונלית.

4.4 ניהול שיחות קוליות ווידאו:

4.4.1 ייזום שיחה קולית: כפתור זמין במסך ה-Match. הצד השני מקבל התראה/מסך שיחה נכנסת ברורה.

4.4.2 מגבלת זמן אוטומטית (קולי): X דקות (מוגדר ב-Matches.default_voice_call_duration_sec, למשל 300 שניות = 5 דקות). ניתוק אוטומטי בסיום.

4.4.3 מנגנון הארכה (קולי): Prompt מיידי לשני הצדדים בסיום הזמן. דורש אישור "כן" משניהם תוך חלון זמן קצר (למשל 20 שניות). הארכה יוצרת סגמנט שיחה חדש (רשומה נוספת ב-Calls מקושרת לקודמת).

4.4.4 מנגנון שדרוג לווידאו: אופציה ב-Prompt בסיום שיחה קולית (אולי רק לאחר מספר שיחות קוליות, ניתן להגדרה). דורש אישור "כן" משני הצדדים.

4.4.5 מגבלת זמן (וידאו) והארכה: Y דקות (מוגדר ב-Matches.default_video_call_duration_sec). מנגנון הארכה זהה לשיחה קולית.

4.4.6 ממשק משתמש בזמן שיחה: טיימר יורד ברור, תמונות/וידאו של המשתתפים, כפתורי השתק/הפעל מיקרופון, כיבוי/הפעל מצלמה (בוידאו), סיום שיחה. חיווי על איכות רשת (אופציונלי).

טכנולוגיה: WebRTC, Signaling Server, שרתי STUN/TURN.

תיעוד: רק מטא-דאטה בטבלת Calls (זמנים, סוג, סטטוס, סיבת סיום), אין הקלטת תוכן.
“חסימה/דיווח” מהיר תוך כדי שיחה קולית (בהיבט ההטרדה המילולית).

4.5 סיום Match:

יזום משתמש: כפתור "סיים Match" במסך ה-Match.

חסימה: פעולת חסימה מסיימת מיידית את ה-Match (ומנתקת שיחה פעילה).

Timeout: אוטומטי לאחר Z ימים (למשל 14) של אי-פעילות כוללת ב-Match (מאז Matches.last_interaction_at). אי-פעילות מוגדרת כהיעדר ניסיונות שיחה (יוזמה או מענה) שהובילו לסיום שיחה (כולל דחייה/אי-מענה).

תהליך Timeout: חישוב match_inactivity_timeout_at = last_interaction_at + Z days. שליחת התראת אזהרה למשתמשים (למשל 3 ימים לפני ה-Timeout). בדיקה יומית (Cron Job) של Matches שעברו את זמן ה-Timeout ו-is_active=true -> עדכון ל-is_active=false + close_reason='timeout'.

איפוס Timeout: last_interaction_at מתעדכן בכל פעם שמתרחשת אינטראקציה (יצירת Match, סיום שיחה - גם אם קצרה או נדחתה).

4.6 התראות Push: כמפורט בגרסה הקודמת (Match חדש, שיחה נכנסת/שלא נענתה, בקשת הארכה/שדרוג, אזהרת Timeout, Match הסתיים).

4.7 מנגנון דיווח וחסימה: כפתורים זמינים בפרופיל ובמסך ה-Match. דיווח נשמר ב-Reports (עם קטגוריה ופירוט אופציונלי). חסימה נשמרת ב-Blocks, מסיימת Match מיידית, ומונעת מפגשים עתידיים.
גישה מהירה לדיווח/חסימה גם מתוך השיחה עצמה.

5. טיפול במצבי קצה ותוכניות גיבוי

5.1 משתמש לא מגיב / ניתוקים:

אי מענה לשיחה: רישום כ-'unanswered'/'declined' ב-Calls. התראה לשולח.

ניתוק רשת בשיחה: טיפול ב-WebRTC (iceconnectionstatechange). הודעה למשתמשים, ניסיון חיבור מחדש קצר, סיום השיחה עם סיבה 'connection_error'.

משתמש לא פעיל ב-Match: המשתמש השני יכול לסיים ידנית, או שמנגנון ה-Timeout (4.5) יפעל.

5.2 Timeout אוטומטי: כמפורט ב-4.5. המדיניות צריכה להיות מוסברת למשתמשים (ב-Onboarding/FAQ).

5.3 הודעות מערכת: ברורות וענייניות במסך ה-Match שהסתיים (סיבת הסיום), וכן הודעות שגיאה ברורות למשתמש (ראה סעיף 9).

6. בטיחות, ניטור ומדיניות תוכן

6.1 מדיניות קהילה ותנאי שימוש: מסמכים ברורים ונגישים המגדירים התנהגות מקובלת ואסורה.

6.2 תהליך טיפול בדיווחים: זרימה מוגדרת: דיווח -> סטטוס 'Open' ב-Reports -> התראה ל-Admin -> בדיקה -> החלטה (אזהרה, השעיה, חסימה, דחייה) -> עדכון סטטוס + תיעוד ב-admin_notes.

6.3 ממשק Admin: ממשק Web מאובטח לניהול משתמשים (חיפוש, צפייה, השעיה/חסימה), ניהול דיווחים, צפייה במטא-דאטה של שיחות (לצורך חקירה בלבד!), סטטיסטיקות בסיסיות, ניהול הגדרות מערכת (משכי שיחה, זמן Timeout).

6.4 מנגנונים למניעת ספאם: אימות אימייל, הגבלות על קצב יצירת Matches (אולי), ניטור דפוסי התנהגות חשודים (דיווחים מרובים, חסימות מרובות).

7. מודל עסקי ומוניטיזציה (תכנון עתידי)

7.1 מודל Freemium: שימוש בסיסי חינמי מלא הכולל את כל פונקציונליות הליבה.

7.2 תכונות פרימיום אפשריות:

הארכת משך השיחה הקולית/וידאו (X/Y דקות ארוכים יותר).

איכות וידאו משופרת (עדיפות ברוחב פס).

Undo ל-Dislike האחרון.

פילטרים מתקדמים בגלריה (לפני Match).

Profile Boost (כשאין Match פעיל).

(בזהירות) לראות מי עשה לך לייק.

דגש: לא לאפשר עקיפת מגבלת ה-Match היחיד.

7.3 זרימת תשלום: התממשקות עם ספקי תשלום (Stripe, Google Pay, Apple In-App Purchase), ניהול סטטוס מנוי (Users.is_paid, Users.paid_until), טבלת Payments לתיעוד.

8. אבטחת מידע ופרטיות

8.1 עמידה בתקנות: תכנון בהתאם לעקרונות GDPR/CCPA.

8.2 הצפנת נתונים: HTTPS/WSS חובה. Hash חזק (bcrypt/Argon2) עם Salt לסיסמאות. הצפנת DB וגיבויים במנוחה.

8.3 אבטחת WebRTC: הצפנת Signaling (WSS/TLS), הצפנת מדיה (DTLS-SRTP חובה).

8.4 מדיניות פרטיות: מסמך מפורט וברור המסביר: איזה מידע נאסף (כולל מטא-דאטה של שיחות), למה הוא משמש, עם מי משותף, זכויות משתמש, שימוש ב-AI, הרשאות נדרשות, והצהרה חד-משמעית שתוכן השיחות אינו מוקלט או נשמר. פרטי יצירת קשר.

8.5 ניהול הסכמות: הסכמה ראשונית לתנאים ומדיניות (Opt-in). הסכמות נפרדות (Opt-in, Just-in-Time) למיקום, מיקרופון, מצלמה, AI. אפשרות לניהול ההסכמות בהגדרות.

8.6 מדיניות שמירה ומחיקה: הגדרת משכי זמן לשמירת נתונים (פרופיל לא פעיל, מטא-דאטה של שיחות לאחר סיום Match/מחיקת משתמש). תהליך ברור ויעיל למחיקת חשבון ונתונים (Right to be Forgotten).

8.7 אי-הקלטת תוכן שיחות: נקודה קריטית. יש לוודא טכנית ומדינית ששום אודיו/וידאו מתוכן השיחות לא נשמר בשרתים.

9. ניהול שגיאות, לוגים וניטור מערכת

9.1 טיפול בשגיאות: הודעות ברורות ואינפורמטיביות למשתמש עבור שגיאות רשת, שרת, קלט (ולידציה), שגיאות ספציפיות ל-WebRTC/שיחות (אין הרשאה, חיבור נכשל, משתמש דחה/לא זמין וכו').

9.2 אסטרטגיית לוגים: רישום מפורט בצד השרת (API requests, errors, critical events כמו Match creation/closure, call events metadata), ללא מידע אישי רגיש בלוגים. שימוש ברמות חומרה (Info, Warn, Error). לוגים בצד הלקוח (אופציונלי) לשגיאות UI/Device ספציפיות.

9.3 ניטור ביצועים: שימוש בכלים לניטור זמינות, זמני תגובה, שימוש במשאבים, ואחוזי שגיאה של כל רכיבי המערכת (API, DB, Signaling, TURN) בזמן אמת. הגדרת התראות (Alerting).

10. שיקולי ביצועים, סקלאביליות ובדיקות עומס (WebRTC)

10.1 רכיבים קריטיים: Signaling Server, STUN/TURN Servers, Database, Backend API, Client App.

10.2 אתגרים: Latency ב-Signaling, עומס רוחב פס ו-CPU ב-TURN, עומס כתיבה ב-DB, ניהול משאבים בלקוח.

10.3 אסטרטגיות:

ארכיטקטורה: רכיבים עם יכולת שכפול אופקי (Horizontal Scaling), פריסה מבוזרת (TURN), אופטימיזציית DB (אינדקסים, pooling), Caching (Redis).

WebRTC: בחירת Codecs נכונה, Adaptive Bitrate, תעדוף P2P, כוונון ICE.

ניטור: מקיף ובזמן אמת, כולל מדדי getStats() מהלקוח.

10.4 תוכנית בדיקות עומס (חובה לפני השקה):

מטרות: זיהוי קיבולת וצווארי בקבוק, וידוא יציבות ואיכות שיחה תחת עומס.

תרחישים: Peak Connections, Sustained Call Load (P2P vs Relayed), Call Lifecycle Actions, Spike Test.

כלים: k6, Locust, JMeter (WebSockets), כלים ייעודיים לסימולציית WebRTC signaling, כלי ניטור.

סביבה: Staging דומה ל-Production.

איטרציות: Test -> Analyze -> Optimize -> Retest.

10.5 ניטור מדדים ספציפיים: Latency (Signaling, TURN), Packet Loss, Jitter, RTT, אחוז שיחות Relayed, זמן הקמת שיחה, שימוש CPU/Bandwidth (TURN, Client).

11. ארכיטקטורה טכנית ומבנה מסד נתונים (ERD)

11.1 בחירת טכנולוגיות (דוגמאות אפשריות):

Backend: Node.js (עם Express/Fastify), Python (Django/FastAPI), Go.

Database: PostgreSQL (עם PostGIS אופציונלי).

Signaling: Node.js + Socket.IO/ws + Redis PubSub, או פלטפורמה ייעודית (Janus, Medooze).

STUN/TURN: coturn.

Client: Native (Swift/Kotlin), React Native, Flutter. WebRTC library מתאימה.

Caching: Redis.

Hosting: AWS/GCP/Azure (שימוש בשירותים מנוהלים כגון RDS, ElastiCache, Load Balancers).

11.2 מבנה מסד נתונים מפורט:

(שימוש במוסכמות PostgreSQL)

Users

id SERIAL PRIMARY KEY

email TEXT UNIQUE NOT NULL CHECK (email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}$')

password_hash TEXT NOT NULL

display_name TEXT NOT NULL CHECK (length(display_name) > 0 AND length(display_name) <= 50)

birth_date DATE NOT NULL CHECK (age(birth_date) >= interval '18 years')

gender TEXT CHECK (gender IN ('male', 'female', 'other')) -- ניתן להרחבה

looking_for_gender TEXT[] -- מערך, מאפשר בחירה מרובה

relationship_type TEXT[] -- מערך העדפות

city TEXT

location GEOGRAPHY(Point, 4326) NULLABLE -- דורש PostGIS

bio TEXT CHECK (length(bio) <= 500)

profile_image_url TEXT

additional_photos JSONB -- מערך של URLs

preferred_age_min INTEGER DEFAULT 18 CHECK (preferred_age_min >= 18)

preferred_age_max INTEGER DEFAULT 99 CHECK (preferred_age_max >= preferred_age_min)

preferred_distance_km INTEGER DEFAULT 50 CHECK (preferred_distance_km > 0)

is_active BOOLEAN DEFAULT true -- לסטטוס חשבון (פעיל/מושבת Admin/חסום)

is_paid BOOLEAN DEFAULT false

paid_until TIMESTAMPTZ NULLABLE

verified_email BOOLEAN DEFAULT false

consents JSONB DEFAULT '{}'::jsonb -- {"location": boolean, "ai_profile": boolean, "microphone": boolean, "camera": boolean}

created_at TIMESTAMPTZ DEFAULT NOW()

updated_at TIMESTAMPTZ DEFAULT NOW()

last_active_at TIMESTAMPTZ DEFAULT NOW() -- פעילות כללית באפליקציה

Indexes: email, location (GiST), last_active_at

Likes

id SERIAL PRIMARY KEY

from_user_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE

to_user_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE

is_like BOOLEAN NOT NULL -- true=Like, false=Dislike

timestamp TIMESTAMPTZ DEFAULT NOW()

UNIQUE (from_user_id, to_user_id)

Indexes: (to_user_id, from_user_id, is_like) -- לחיפוש Match מהיר

Matches

id SERIAL PRIMARY KEY

user1_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE

user2_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE

matched_at TIMESTAMPTZ DEFAULT NOW()

is_active BOOLEAN DEFAULT true

closed_at TIMESTAMPTZ NULLABLE

close_reason TEXT NULLABLE CHECK (close_reason IN ('user1_ended', 'user2_ended', 'timeout', 'blocked', 'admin_closed'))

default_voice_call_duration_sec INTEGER NOT NULL DEFAULT 300 CHECK (default_voice_call_duration_sec > 0)

default_video_call_duration_sec INTEGER NOT NULL DEFAULT 300 CHECK (default_video_call_duration_sec > 0)

last_interaction_at TIMESTAMPTZ DEFAULT NOW() -- מתעדכן ביצירת Match ובסיום כל שיחה/ניסיון

match_inactivity_timeout_interval INTERVAL NOT NULL DEFAULT '14 days' -- קבוע או ניתן להגדרה

CHECK (user1_id < user2_id) -- מניעת כפילות סדר

Indexes: (user1_id, is_active), (user2_id, is_active), (is_active, last_interaction_at) -- לחיפוש Match פעיל ומשימת Timeout

Calls

id BIGSERIAL PRIMARY KEY

match_id INTEGER NOT NULL REFERENCES Matches(id) ON DELETE CASCADE

call_segment_uuid UUID NOT NULL DEFAULT gen_random_uuid() UNIQUE -- מזהה ייחודי לסגמנט

previous_call_segment_uuid UUID NULLABLE REFERENCES Calls(call_segment_uuid) -- קישור לסגמנט קודם בהארכה/שדרוג

initiator_user_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE

receiver_user_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE

call_type TEXT NOT NULL CHECK (call_type IN ('voice', 'video'))

status TEXT NOT NULL CHECK (status IN ('initiated', 'answered', 'unanswered', 'declined', 'ended', 'error'))

start_time TIMESTAMPTZ NULLABLE -- זמן מענה

end_time TIMESTAMPTZ NULLABLE

duration_seconds INTEGER NULLABLE CHECK (duration_seconds >= 0)

end_reason TEXT NULLABLE CHECK (end_reason IN ('initiator_ended', 'receiver_ended', 'timeout_reached', 'extended', 'upgraded_to_video', 'match_closed', 'connection_error', 'blocked', 'receiver_busy', 'system_ended'))

initiated_at TIMESTAMPTZ DEFAULT NOW()

Indexes: (match_id, initiated_at DESC), initiator_user_id, receiver_user_id, previous_call_segment_uuid

Reports

id SERIAL PRIMARY KEY

reporter_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE SET NULL

reported_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE

match_id INTEGER NULLABLE REFERENCES Matches(id) ON DELETE SET NULL

call_segment_uuid UUID NULLABLE REFERENCES Calls(call_segment_uuid) ON DELETE SET NULL -- קישור לשיחה ספציפית אם רלוונטי

reason TEXT NOT NULL -- קטגוריה

details TEXT

timestamp TIMESTAMPTZ DEFAULT NOW()

status TEXT DEFAULT 'Open' CHECK (status IN ('Open', 'Investigating', 'Closed-ActionTaken', 'Closed-NoAction', 'Closed-FalseReport'))

admin_notes TEXT NULLABLE

Indexes: reported_id, status, timestamp

Blocks

id SERIAL PRIMARY KEY

blocker_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE

blocked_id INTEGER NOT NULL REFERENCES Users(id) ON DELETE CASCADE

timestamp TIMESTAMPTZ DEFAULT NOW()

UNIQUE (blocker_id, blocked_id)

Indexes: blocked_id

Payments (עתידי)

... (כפי שהוגדר קודם, עם התאמות ל-plan_type)

12. הרחבות ואפשרויות עתידיות

אימות מתקדם (תמונה/וידאו).

שיפור מנוע ההמלצות (AI).

פיצ'רים מבוססי מיקום מתקדמים.

AI לשיפור חווית השיחה (Icebreakers, זיהוי תוכן בזמן אמת - דורש שיקולי פרטיות כבדים).

אפקטים/פילטרים בשיחת וידאו.

נגישות (a11y): תמיכה בקוראי מסך, תמלול חי (דורש שירות חיצוני והסכמה).

לוקליזציה (L10n).

13. סיכום

אפיון זה מתווה אפליקציית היכרויות חדשנית המבוססת על קונספט "Match יחיד פעיל" ותקשורת מבוססת שיחות קול/וידאו מוגבלות בזמן עם הסכמה הדדית להמשך. הוא כולל הגדרות פונקציונליות, טכניות, עסקיות, דרישות אבטחה ופרטיות, ומדגיש את החשיבות הקריטית של תכנון לביצועים וסקלאביליות של מערכת WebRTC. מסמך זה נועד לשמש בסיס איתן ומפורט לתהליך הפיתוח, תוך הבנה שייתכנו התאמות ושינויים במהלך הדרך בהתאם למשוב, אילוצים וגילויים חדשים. המטרה היא לספק חוויה אינטימית, ממוקדת ואותנטית יותר למשתמשים המחפשים קשר משמעותי.
