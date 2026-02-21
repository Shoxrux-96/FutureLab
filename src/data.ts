import { Student, Teacher, Course, Contract, BlogPost } from './types';

export const MOCK_STUDENTS: Student[] = [
  { id: '1', name: 'Ali Valiyev', phone: '+998 90 123 45 67', course: 'Frontend React', status: 'active', joinedDate: '2024-01-15' },
  { id: '2', name: 'Olim Toshmatov', phone: '+998 91 234 56 78', course: 'Python Backend', status: 'active', joinedDate: '2024-02-10' },
  { id: '3', name: 'Zuhra Karimova', phone: '+998 93 345 67 89', course: 'Grafik Dizayn', status: 'graduated', joinedDate: '2023-11-05' },
  { id: '4', name: 'Jasur Ergashev', phone: '+998 94 456 78 90', course: 'Frontend React', status: 'dropped', joinedDate: '2024-01-20' },
];

export const MOCK_TEACHERS: Teacher[] = [
  { 
    id: '1', 
    name: 'Sardorbek Ismoilov', 
    subject: 'MATEMATIKA', 
    experience: '8 Yil', 
    phone: '+998 90 111 22 33', 
    image: 'https://picsum.photos/seed/t1/400/400',
    tags: ['Oliy matematika', 'DTM tayyorlov', 'Logika'],
    quote: 'Murakkab masalalarni sodda usulda tushuntirish mahoratiga ega.'
  },
  { 
    id: '2', 
    name: 'Malika Axmedova', 
    subject: 'INGLIZ TILI', 
    experience: '5 Yil', 
    phone: '+998 90 222 33 44', 
    image: 'https://picsum.photos/seed/t2/400/400',
    tags: ['IELTS 8.5', 'CEFR', 'Business English'],
    quote: 'Xalqaro imtihonlarga tayyorlash bo\'yicha mutaxassis.'
  },
  { 
    id: '3', 
    name: 'Javohir Karimov', 
    subject: 'FIZIKA', 
    experience: '10 Yil', 
    phone: '+998 90 333 44 55', 
    image: 'https://picsum.photos/seed/t3/400/400',
    tags: ['Kvant fizikasi', 'Olimpiada masalalari'],
    quote: 'Fizika qonuniyatlarini amaliy tajribalar bilan o\'rgatadi.'
  },
  { 
    id: '4', 
    name: 'Zuhra Rahmonova', 
    subject: 'ONA TILI', 
    experience: '12 Yil', 
    phone: '+998 90 444 55 66', 
    image: 'https://picsum.photos/seed/t4/400/400',
    tags: ['Morfologiya', 'Sintaksis', 'Adabiyot'],
    quote: 'Milliy sertifikat va DTM imtihonlariga tayyorlov ustasi.'
  },
  { 
    id: '5', 
    name: 'Rustam Qosimov', 
    subject: 'IT DASTURLASH', 
    experience: '6 Yil', 
    phone: '+998 90 555 66 77', 
    image: 'https://picsum.photos/seed/t5/400/400',
    tags: ['Python', 'Django', 'PostgreSQL'],
    quote: 'Real loyihalar ustida ishlashni o\'rgatuvchi amaliyotchi.'
  },
  { 
    id: '6', 
    name: 'Elena Petrova', 
    subject: 'RUS TILI', 
    experience: '15 Yil', 
    phone: '+998 90 666 77 88', 
    image: 'https://picsum.photos/seed/t6/400/400',
    tags: ['Grammatika', 'So\'zlashuv', 'TORFL'],
    quote: 'Rus tilida erkin so\'zlashish va yozishni o\'rgatadi.'
  },
  { 
    id: '7', 
    name: 'Botir Ergashev', 
    subject: 'KIMYO', 
    experience: '7 Yil', 
    phone: '+998 90 777 88 99', 
    image: 'https://picsum.photos/seed/t7/400/400',
    tags: ['Organik kimyo', 'Laboratoriya'],
    quote: 'Tibbiyot oliygohlariga kirish uchun mukammal tayyorgarlik.'
  },
  { 
    id: '8', 
    name: 'Nigora Yusupova', 
    subject: 'BIOLOGIYA', 
    experience: '9 Yil', 
    phone: '+998 90 888 99 00', 
    image: 'https://picsum.photos/seed/t8/400/400',
    tags: ['Botanika', 'Zoologiya', 'Genetika'],
    quote: 'Biologiya fanini qiziqarli va tushunarli usulda o\'rgatadi.'
  },
  { 
    id: '9', 
    name: 'Akmal Orifov', 
    subject: 'TARIX', 
    experience: '11 Yil', 
    phone: '+998 90 999 00 11', 
    image: 'https://picsum.photos/seed/t9/400/400',
    tags: ['Jahon tarixi', 'O\'zbekiston tarixi'],
    quote: 'Tarixiy voqealarni tahliliy o\'rganishga yordam beradi.'
  },
  { 
    id: '10', 
    name: 'Dilshod Nazarov', 
    subject: 'HUQUQ', 
    experience: '13 Yil', 
    phone: '+998 90 000 11 22', 
    image: 'https://picsum.photos/seed/t10/400/400',
    tags: ['Konstitutsiya', 'Fuqarolik huquqi'],
    quote: 'Huquqiy savodxonlik va imtihonlarga tayyorlov.'
  },
  { 
    id: '11', 
    name: 'Sherzod Aliyev', 
    subject: 'FRONTEND', 
    experience: '4 Yil', 
    phone: '+998 90 121 21 21', 
    image: 'https://picsum.photos/seed/t11/400/400',
    tags: ['React', 'TypeScript', 'Tailwind'],
    quote: 'Zamonaviy interfeyslar yaratish bo\'yicha mutaxassis.'
  },
  { 
    id: '12', 
    name: 'Madina Toirova', 
    subject: 'DIZAYN', 
    experience: '3 Yil', 
    phone: '+998 90 323 23 23', 
    image: 'https://picsum.photos/seed/t12/400/400',
    tags: ['UI/UX', 'Figma', 'Photoshop'],
    quote: 'Ijodiy fikrlash va dizayn asoslarini o\'rgatadi.'
  },
];

export const MOCK_COURSES: Course[] = [
  { id: '1', title: 'Matematika', description: 'DTM va xalqaro imtihonlarga tayyorlov.', price: 450000, duration: '9 oy', studentsCount: 120, targetAudience: '5-11 sinf o\'quvchilari va abituriyentlar' },
  { id: '2', title: 'Ingliz tili (IELTS)', description: 'IELTS 7.5+ darajasiga kafolatlangan tayyorlov.', price: 500000, duration: '6 oy', studentsCount: 200, targetAudience: 'IELTS topshiruvchilar va til o\'rganuvchilar' },
  { id: '3', title: 'IT Dasturlash', description: 'Frontend, Backend va Mobile dasturlash kurslari.', price: 1200000, duration: '8 oy', studentsCount: 85, targetAudience: 'Dasturlashga qiziquvchi yoshlar' },
  { id: '4', title: 'Fizika', description: 'Nazariya va masalalar yechishning oson usullari.', price: 450000, duration: '9 oy', studentsCount: 60, targetAudience: 'Abituriyentlar va maktab o\'quvchilari' },
  { id: '5', title: 'Kimyo & Biologiya', description: 'Tibbiyot oliygohlariga kirish uchun mukammal kurs.', price: 450000, duration: '10 oy', studentsCount: 95, targetAudience: 'Tibbiyot yo\'nalishi abituriyentlari' },
  { id: '6', title: 'Tarix & Huquq', description: 'Gumanitar yo\'nalishlar uchun chuqurlashtirilgan darslar.', price: 400000, duration: '8 oy', studentsCount: 70, targetAudience: 'Yuridik va gumanitar yo\'nalish abituriyentlari' },
];

export const MOCK_CONTRACTS: Contract[] = [
  { id: 'CTR-001', studentName: 'Ali Valiyev', courseName: 'Frontend React', amount: 1200000, date: '2024-02-01', status: 'paid' },
  { id: 'CTR-002', studentName: 'Olim Toshmatov', courseName: 'Python Backend', amount: 1500000, date: '2024-02-05', status: 'pending' },
  { id: 'CTR-003', studentName: 'Zuhra Karimova', courseName: 'Grafik Dizayn', amount: 1000000, date: '2024-01-10', status: 'paid' },
];

export const MOCK_BLOGS: BlogPost[] = [
  { 
    id: '1', 
    title: 'Dasturlashni qayerdan boshlash kerak?', 
    excerpt: 'Dasturlash olamiga kirib kelayotganlar uchun foydali maslahatlar.', 
    content: 'Dasturlashni boshlash uchun avvalo yo\'nalishni aniqlab olish kerak. Frontend, Backend yoki Mobile? Har bir yo\'nalishning o\'ziga xos qiyinchiliklari va afzalliklari bor. Masalan, Frontend vizual natijani tez ko\'rishni xohlovchilar uchun mos keladi.',
    date: '2024-02-15', 
    image: 'https://picsum.photos/seed/blog1/800/400' 
  },
  { 
    id: '2', 
    title: 'Nega aynan React?', 
    excerpt: 'React kutubxonasining afzalliklari va nima uchun u ommabop.', 
    content: 'React — bu Facebook tomonidan ishlab chiqilgan JavaScript kutubxonasi. U komponentlarga asoslangan yondashuvni taklif qiladi, bu esa kodni qayta ishlatish va boshqarishni osonlashtiradi. Virtual DOM texnologiyasi esa ilovaning ishlash tezligini oshiradi.',
    date: '2024-02-10', 
    image: 'https://picsum.photos/seed/blog2/800/400' 
  },
  { 
    id: '3', 
    title: 'IELTS imtihoniga tayyorgarlik', 
    excerpt: 'IELTS dan yuqori ball olish sirlari.', 
    content: 'IELTS imtihonida muvaffaqiyat qozonish uchun faqat ingliz tilini bilish yetarli emas. Imtihon formatini yaxshi tushunish va vaqtni to\'g\'ri taqsimlash juda muhim. Har kuni kamida 2 soat Listening va Reading mashqlarini bajarish tavsiya etiladi.',
    date: '2024-02-05', 
    image: 'https://picsum.photos/seed/blog3/800/400' 
  },
  { 
    id: '4', 
    title: 'Matematika — barcha fanlar otasi', 
    excerpt: 'Matematikani o\'rganish nima uchun muhim?', 
    content: 'Matematika mantiqiy fikrlashni rivojlantiradi. U nafaqat muhandislik yoki IT sohasida, balki kundalik hayotda ham juda foydali. Masalalarni yechish orqali biz miyamizni tahliliy fikrlashga o\'rgatamiz.',
    date: '2024-01-28', 
    image: 'https://picsum.photos/seed/blog4/800/400' 
  },
  { 
    id: '5', 
    title: 'IT Park Shovot filialida yangi kurslar', 
    excerpt: 'Shovot tumanida IT sohasini o\'rganish imkoniyati.', 
    content: 'Endilikda Shovot tumani yoshlari IT sohasini o\'z tumanlarida o\'rganishlari mumkin. Bizda Frontend, Python va Grafik dizayn kurslari ochildi. Kurslarni tajribali mentorlar olib boradi.',
    date: '2024-01-20', 
    image: 'https://picsum.photos/seed/blog5/800/400' 
  },
  { 
    id: '6', 
    title: 'Dizayn asoslari: Ranglar nazariyasi', 
    excerpt: 'Dizaynda ranglarni qanday to\'g\'ri tanlash kerak?', 
    content: 'Ranglar inson psixologiyasiga kuchli ta\'sir ko\'rsatadi. Masalan, ko\'k rang ishonchni, qizil rang esa hayajonni ifodalaydi. Dizayner sifatida ranglar garmoniyasini tushunish juda muhim.',
    date: '2024-01-15', 
    image: 'https://picsum.photos/seed/blog6/800/400' 
  },
  { 
    id: '7', 
    title: 'Python yoki JavaScript?', 
    excerpt: 'Qaysi tilni birinchi bo\'lib o\'rganish kerak?', 
    content: 'Bu sizning maqsadingizga bog\'liq. Agar siz web-saytlar yaratmoqchi bo\'lsangiz, JavaScript dan boshlang. Agar ma\'lumotlar tahlili yoki sun\'iy intellekt qiziqtirsa, Python eng yaxshi tanlovdir.',
    date: '2024-01-10', 
    image: 'https://picsum.photos/seed/blog7/800/400' 
  },
  { 
    id: '8', 
    title: 'Ingliz tilida so\'zlashuvni yaxshilash', 
    excerpt: 'Speaking darajasini oshirish uchun 5 ta maslahat.', 
    content: '1. O\'zingiz bilan gaplashing. 2. Ingliz tilidagi podkastlarni tinglang. 3. Filmlarni subtitrlarsiz ko\'ring. 4. Do\'stlaringiz bilan inglizcha suhbatlashing. 5. Xato qilishdan qo\'rqmang.',
    date: '2024-01-05', 
    image: 'https://picsum.photos/seed/blog8/800/400' 
  },
  { 
    id: '9', 
    title: 'Fizika qiziqarli fan', 
    excerpt: 'Fizika qonuniyatlarini kundalik hayotda ko\'rish.', 
    content: 'Fizika atrofimizdagi dunyoni tushunishga yordam beradi. Nega osmon ko\'k? Nega kemalar suvda suzadi? Bu savollarga fizika javob beradi. Bizning kurslarda fizika amaliy tajribalar bilan o\'rgatiladi.',
    date: '2023-12-28', 
    image: 'https://picsum.photos/seed/blog9/800/400' 
  },
  { 
    id: '10', 
    title: 'Muvaffaqiyatli talaba bo\'lish sirlari', 
    excerpt: 'O\'qishda qanday qilib yuqori natijalarga erishish mumkin?', 
    content: 'Muvaffaqiyat kaliti — bu intizom. Reja asosida o\'qish, vaqtni to\'g\'ri boshqarish va doimiy izlanish sizni maqsadga yetkazadi. Shuningdek, sog\'lom uyqu va ovqatlanish ham muhim rol o\'ynaydi.',
    date: '2023-12-20', 
    image: 'https://picsum.photos/seed/blog10/800/400' 
  },
  { 
    id: '11', 
    title: 'Kimyo va tibbiyot', 
    excerpt: 'Tibbiyot sohasida kimyoning o\'rni.', 
    content: 'Kimyoni bilmasdan turib shifokor bo\'lish qiyin. Dorilarning tarkibi, inson organizmidagi jarayonlar — bularning barchasi kimyoviy reaksiyalardir. Bizda kimyo chuqurlashtirilgan holda o\'rgatiladi.',
    date: '2023-12-15', 
    image: 'https://picsum.photos/seed/blog11/800/400' 
  },
  { 
    id: '12', 
    title: 'Mobil ilovalar kelajagi', 
    excerpt: 'Mobile development sohasidagi yangiliklar.', 
    content: 'Hozirgi kunda barcha xizmatlar mobil ilovalarga o\'tmoqda. Flutter va React Native kabi texnologiyalar bitta kod bilan ham Android, ham iOS uchun ilova yaratish imkonini beradi.',
    date: '2023-12-10', 
    image: 'https://picsum.photos/seed/blog12/800/400' 
  },
  { 
    id: '13', 
    title: 'Eng so\'nggi yangilik: Grantlar e\'lon qilindi', 
    excerpt: 'Iqtidorli yoshlar uchun bepul o\'qish imkoniyati.', 
    content: "FutureLab o'quv markazi iqtidorli yoshlar uchun grantlar e'lon qiladi. Imtihondan yuqori ball to'plagan 10 nafar o'quvchi bepul o'qish imkoniyatiga ega bo'ladi. Shoshiling!",
    date: '2024-02-20', 
    image: 'https://picsum.photos/seed/blog13/800/400' 
  },
];
