export const CATEGORIES = [
  { id: 'all', name: 'כל המוצרים והשירותים' },
  { id: 'plugins', name: 'תוספי Revit (Add-ins)', icon: 'Cpu' },
  { id: 'pyrevit', name: 'אוטומציות pyRevit', icon: 'Code' },
  { id: 'templates-families', name: 'תבניות ומשפחות', icon: 'Box' },
  { id: 'services', name: 'שירותים מקצועיים', icon: 'Layers' },
];

export const PRODUCTS = [
  {
    id: 'sheet-generator-pro',
    title: 'Sheet Generator Pro - מחולל גיליונות אוטומטי',
    category: 'plugins',
    categoryName: 'תוספי Revit',
    badge: 'פופולרי ביותר',
    badgeColor: 'bg-cyan-500/20 text-cyan-400 border-cyan-500/40',
    price: 350,
    currency: '₪',
    isService: false,
    revitVersions: ['2022', '2023', '2024', '2025'],
    type: 'C# Add-in',
    shortDescription: 'יצירת עשרות גיליונות שרטוט, מיקומם של המבטים (Views) ומספור אוטומטי תוך שניות ספורות בלחיצת כפתור.',
    description: `תוסף פרימיום עוצמתי לרוויט המיועד למשרדי אדריכלות והנדסה. התוסף חוסך עשרות שעות עבודה ידניות על יצירת גיליונות, סנכרון כותרות, מספור תוכניות ושיבוץ מבטים במיקום מדויק.`,
    features: [
      'יצירת גיליונות במכה אחת מתוך רשימת Excel או פלטפורמת הרוויט',
      'שיבוץ מבטים (Floor Plans, Sections, 3D) במרכז הגיליון באופן אוטומטי',
      'סנכרון פרמטרים מרוכז (Title Block Parameters)',
      'תמיכה מלאה ברישום עברית ללא היפוך אותיות',
      'חיסכון ממוצע של 4 שעות לכל פרויקט'
    ],
    systemRequirements: 'רוויט 2022-2025, Windows 10/11, .NET Framework 4.8+',
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=800&q=80',
    tags: ['Revit Add-in', 'Sheets', 'Automation', 'C#', '2025 Supported'],
    downloadUrl: '#'
  },
  {
    id: 'parameter-sync-exporter',
    title: 'Parameter Sync & Batch Exporter',
    category: 'plugins',
    categoryName: 'תוספי Revit',
    badge: 'חדש',
    badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40',
    price: 290,
    currency: '₪',
    isService: false,
    revitVersions: ['2021', '2022', '2023', '2024', '2025'],
    type: 'C# Add-in',
    shortDescription: 'ייצוא אצווה (Batch Export) של גיליונות ל-PDF, DWG, IFC ו-NWC בלחיצה אחת עם שמות קבצים מותאמים אישית.',
    description: `כלי חובה לכל מנהל BIM ואדריכל. מאפשר לייצא פרויקטים שלמים ל-DWG ו-PDF תוך שמירה על היררכיית שכבות, המרת פונטים, ומניעת טעויות אנוש בשמות הקבצים.`,
    features: [
      'ייצוא מרוכז ל-PDF / DWG / IFC בלחיצה אחת',
      'מחולל שמות קבצים דינמי מבוסס פרמטרי פרויקט (Project-Number_Sheet-Name_Rev)',
      'הדפסה מרוכזת ללא צורך באישור ידני לכל גיליון',
      'תמיכה בהגדרות ייצוא DWG משרדיות שמורות'
    ],
    systemRequirements: 'רוויט 2021-2025',
    image: 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&w=800&q=80',
    tags: ['DWG Export', 'PDF', 'IFC', 'Batch Printing', 'BIM Standard'],
    downloadUrl: '#'
  },
  {
    id: 'pyrevit-architecture-pack',
    title: 'ערכת סקריפטים pyRevit לאדריכלות',
    category: 'pyrevit',
    categoryName: 'אוטומציות pyRevit',
    badge: 'מומלץ',
    badgeColor: 'bg-amber-500/20 text-amber-400 border-amber-500/40',
    price: 180,
    currency: '₪',
    isService: false,
    revitVersions: ['2021', '2022', '2023', '2024', '2025'],
    type: 'pyRevit Toolbar Extension',
    shortDescription: 'חבילת 15+ סקריפטים ב-Python עבור סרגל pyRevit: ניקוי קבצים, חישוב שטחים, מציאת אלמנטים כפולים וסידור מבטים.',
    description: `חבילת הכלים האולטימטיבית לסרגל הכלים של pyRevit. כוללת סקריפטים מהירים שנכתבו במיוחד לצרכים של משרדי אדריכלות בישראל.`,
    features: [
      '15 סקריפטים מוכנים להתקנה בלחיצת כפתור בסרגל pyRevit',
      'כלי לחישוב שטחי עיקרי ושירות אוטומטי מתוך דיאגרמות שטחים',
      'כלי Quick Align ליישור טקסטים, מידות ואלמנטים בתוכנית',
      'סקריפט Model Purge מתקדם למחיקת סגנונות קו ופרמטרים מיותרים'
    ],
    systemRequirements: 'תוכנת pyRevit מותקנת (חינמית), רוויט 2021+',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=800&q=80',
    tags: ['pyRevit', 'Python', 'Scripts', 'Architecture', 'Toolbars'],
    downloadUrl: '#'
  },
  {
    id: 'pyrevit-finish-schedule',
    title: 'pyRevit Area & Finish Schedule Calculator',
    category: 'pyrevit',
    categoryName: 'אוטומציות pyRevit',
    badge: 'אוטומציה חכמה',
    badgeColor: 'bg-purple-500/20 text-purple-400 border-purple-500/40',
    price: 150,
    currency: '₪',
    isService: false,
    revitVersions: ['2022', '2023', '2024', '2025'],
    type: 'pyRevit Script',
    shortDescription: 'סקריפט אוטומטי המחשב ומעדכן את טבלאות הגמרים (Room Finish Schedule) וחיפויי הקירות מתוך מודל הרוויט.',
    description: `נמאס לכם לעדכן ידנית את חומרי הגמר בכל חדר? הסקריפט מזהה את הקירות ההיקפיים והרצפות בכל חדר (Room) ומזין אוטומטית את סוגי החיפוי, הריצוף והתקרה לפרמטרים של החדר.`,
    features: [
      'זיהוי אוטומטי של רצפות וציפויי קיר הגובלים בחדר',
      'עדכון פרמטרים של Room Finish בלחיצה אחת',
      'יצירת דוח חריגות וחדרים ללא חומר גמר מוגדר',
      'תמיכה בחישובי פאנלים ופנלים היקפיים'
    ],
    systemRequirements: 'pyRevit v4.8+',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    tags: ['pyRevit', 'Rooms', 'Finishes', 'Schedules', 'Quantities'],
    downloadUrl: '#'
  },
  {
    id: 'israeli-standard-template-2025',
    title: 'תבנית רוויט משרדית מלאה 2025 (Israeli Standards)',
    category: 'templates-families',
    categoryName: 'תבניות ומשפחות',
    badge: 'BIM Standard',
    badgeColor: 'bg-blue-500/20 text-blue-400 border-blue-500/40',
    price: 850,
    currency: '₪',
    isService: false,
    revitVersions: ['2023', '2024', '2025'],
    type: 'Revit Template (.rte)',
    shortDescription: 'תבנית רוויט מקיפה הכוללת את כל הגדרות השרטוט, השכבות, הטיפוסים והתיוגים לפי תקן BIM ישראלי.',
    description: `תבנית עבודה משרדית שפותחה על בסיס נסיון של שנים במידול אדריכלי. התבנית כוללת View Templates מוכנים, טיפוסי קירות, תקרות ורצפות תקניים, תיוגים (Tags) בעברית, מקראים וטבלאות כמויות בנויות.`,
    features: [
      'הגדרות סגנונות קו (Line Styles & Line Weights) מותאמות להדפסה נקייה',
      'תיוגים חכמים (Tags) עבור דלתות, חלונות, חדרים, קירות ופתחי ניקוז',
      'View Filters מוכנים לתוכניות עבודה, היתרים, בטיחות וגמרים',
      'ספרית חומרים מובנית עם מרקמים ונתוני תרמיים',
      'כולל מדריך וידאו מפורט להטמעה במשרד'
    ],
    systemRequirements: 'רוויט 2023-2025',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80',
    tags: ['Revit Template', 'RTE', 'Israeli Standard', 'BIM', 'View Templates'],
    downloadUrl: '#'
  },
  {
    id: 'smart-doors-windows-pack',
    title: 'ספריית דלתות וחלונות פרמטריים חכמים',
    category: 'templates-families',
    categoryName: 'תבניות ומשפחות',
    badge: '2D/3D Smart',
    badgeColor: 'bg-pink-500/20 text-pink-400 border-pink-500/40',
    price: 420,
    currency: '₪',
    isService: false,
    revitVersions: ['2021', '2022', '2023', '2024', '2025'],
    type: 'Revit Family Pack (.rfa)',
    shortDescription: 'חבילה של 25+ משפחות דלתות וחלונות פרמטריות עם שליטה מלאה בלבנים, הלבשות, פתחי אוורור ותצוגת 2D נקייה.',
    description: `משפחות רוויט קלות משקל המיועדות לשרטוט אדריכלי מהיר וללא הכבדה על המודל. שליטה מלאה בפרמטרים של רוחב, גובה, סוגי פתיחה, הלבשות ואביזרים.`,
    features: [
      'תצוגת סימבולים 2D מדויקת בתוכנית (Plan View) ללא קווים כפולים',
      'שליטה בזווית פתיחת הכנף (2D Swing Angle)',
      'הלבשות פנים/חוץ פרמטריות הניתנות להסתרה',
      'פרמטרים מובנים לטבלאות אלומיניום ונגרות'
    ],
    systemRequirements: 'רוויט 2021 ומעלה',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    tags: ['Revit Families', 'RFA', 'Doors', 'Windows', 'Parametric'],
    downloadUrl: '#'
  },
  {
    id: 'custom-template-building-service',
    title: 'בניית תבנית משרדית מותאמת אישית (Custom Template)',
    category: 'services',
    categoryName: 'שירותים מקצועיים',
    badge: 'שירות פרימיום',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/50',
    price: null,
    priceLabel: 'לפי הצעת מחיר',
    isService: true,
    revitVersions: ['2021-2025'],
    type: 'שירות ייעוץ ובנייה',
    shortDescription: 'אפיון, תכנון ובניית תבנית רוויט משרדית ייעודית (Template) המותאמת לשיטות העבודה ולסטנדרט של המשרד שלך.',
    description: `בניית תבנית משרדית היא ההשקעה הרווחית ביותר שמשרד אדריכלות או הנדסה יכול לעשות. תבנית נכונה מונעת טעויות, חוסכת 30%+ מזמן המידול ומבטיחה שפה גראפית אחידה ויוקרתית בכל השרטוטים.`,
    features: [
      'פגישת אפיון מקיפה לזיהוי הצרכים והשפה הגרפית של המשרד',
      'בניית Title Blocks ממותגים עם לוגו ופרטי המשרד',
      'הגדרת ספרית חומרים, שכבות, סגנונות קו ופונטים תקניים',
      'בניית טבלאות כמויות וטבלאות גמר מותאמות אחידות',
      'הדרכת צוות המשרד על שימוש נכון בתבנית'
    ],
    systemRequirements: 'מתאים לכל גודל משרד',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80',
    tags: ['BIM Consulting', 'Template Creation', 'Office Standard', 'Workflow'],
    downloadUrl: '#'
  },
  {
    id: 'bim-modeling-services',
    title: 'שירותי מידול BIM ואדריכלות ברוויט',
    category: 'services',
    categoryName: 'שירותים מקצועיים',
    badge: 'מידול מקצועי',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/50',
    price: null,
    priceLabel: 'לפי הצעת מחיר / פרויקט',
    isService: true,
    revitVersions: ['2021-2025'],
    type: 'שירות מידול',
    shortDescription: 'מידול BIM מדויק ברמת LOD 200 עד LOD 400 עבור פרויקטים אדריכליים, מבני ציבור, מגורים ומערכות.',
    description: `שירותי מידול רוויט ברמה הגבוהה ביותר. המרת אוטוקאד / סקיצות / ענני נקודות (Point Cloud) למודל רוויט עשיר בנתונים, מדויק ומוכן לתיאום מערכות וביצוע.`,
    features: [
      'מידול אדריכלי וקונסטרוקטיבי ברמת פירוט גבוהה (LOD 300-400)',
      'המרת תוכניות DWG / סריקות ל-Revit 3D Model',
      'תיאום מערכות וגילוי התנגשויות (Clash Detection)',
      'הפקת תוכניות עבודה, פריסות וחתכים מתוך המודל'
    ],
    systemRequirements: 'תמיכה בפורמטי DWG, IFC, Point Cloud, RVT',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80',
    tags: ['BIM Modeling', 'LOD 300/400', 'Clash Detection', 'CAD to Revit'],
    downloadUrl: '#'
  },
  {
    id: 'custom-pyrevit-development-service',
    title: 'פיתוח אוטומציות וסקריפטים pyRevit מותאמים אישית',
    category: 'services',
    categoryName: 'שירותים מקצועיים',
    badge: 'פיתוח מותאם',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/50',
    price: null,
    priceLabel: 'לפי שעות / פיתוח',
    isService: true,
    revitVersions: ['2021-2025'],
    type: 'פיתוח תוכנה ב-Python / C#',
    shortDescription: 'פיתוח סקריפטים ייעודיים ל-pyRevit או תוספי C# מורכבים הפותרים צווארי בקבוק ספציפיים בתהליך העבודה שלכם.',
    description: `יש לכם פעולה ידנית שחוזרת על עצמה שעות בכל שבוע? אנחנו יכולים להפוך אותה לסקריפט של לחיצת כפתור אחת בסרגל הרוויט שלכם!`,
    features: [
      'פיתוח סקריפטים ב-Python / Dynamo / C# לפי מפרט דרישות',
      'אינטגרציה מלאה עם סרגל pyRevit המשרדי',
      'חיבור רוויט לבסיסי נתונים חיצוניים, Excel ו-APIs',
      'תמיכה, עדכונים והדרכה על הכלים שנפתחו'
    ],
    systemRequirements: 'Revit API & pyRevit',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
    tags: ['Custom Code', 'Python', 'Revit API', 'pyRevit', 'Automation'],
    downloadUrl: '#'
  }
];

export const STATS = [
  { label: 'תוספים ואוטומציות', value: '25+' },
  { label: 'חיסכון ממוצע בשעות עבודה', value: '40%' },
  { label: 'משרדים ודיירים מרוצים', value: '80+' },
  { label: 'תמיכה בגרסאות Revit', value: '2021-2025' }
];

export const TESTIMONIALS = [
  {
    quote: "התוסף Sheet Generator Pro חסך לנו ימים שלמים של עבודה שחורה על הגשת היתרים. בלחיצת כפתור הכל מסודר!",
    name: "אדר' דניאל לוי",
    role: "מנהל משרד אדריכלים"
  },
  {
    quote: "התבנית המשרדית שנבנתה עבורנו העלתה את רמת השרטוט והגרפיקה של המשרד בכמה רמות מעל המתחרים.",
    name: "מיכאל אלוני",
    role: "מנהל BIM וקונסטרוקציה"
  },
  {
    quote: "הסקריפטים של pyRevit פשוט משנים את חוקי המשחק. כל מי שממדל ברוויט חייב את הכלים האלה בסרגל שלו.",
    name: "שירה כהן",
    role: "ממדלת ומעצבת פנים"
  }
];
