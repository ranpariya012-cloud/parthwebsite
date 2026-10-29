# Parth Ranpariya — Personal Portfolio Website & Secure Admin CMS

A modern, high-performance personal portfolio website and dedicated Administrator Content Management System (CMS) for **Parth Ranpariya**, Data Analyst & Web Developer based in Ahmedabad, Gujarat, India.

Built with **HTML5, CSS3, Vanilla JavaScript (ES6+), Bootstrap 5, Bootstrap Icons, and Firebase (Authentication & Cloud Firestore)**. Ready for static hosting on Vercel.

---

## Contact & Resume Information
- **Full Name**: Parth Ranpariya
- **Phone**: [+91 9723198913](tel:+919723198913)
- **Email**: [ranpariya012@gmail.com](mailto:ranpariya012@gmail.com)
- **Location**: Ahmedabad, Gujarat, India
- **Resume (CV)**: Located at `/assets/aistudio/Professional_Modern_CV_Resume_0bfae04d.pdf`
- **Portrait Photo**: Located at `/assets/aistudio/parth_4b9116ca.jpeg`

---

## Technical Overview & Features

### Core Competencies & Animated Tool Stack
- **Data Analytics & BI**: SQL (MySQL, PostgreSQL), Microsoft Excel (Advanced Formulas, Pivot Tables), Power BI (DAX, Interactive Reports), Python (Pandas, Data Analysis & Processing).
- **Web Development**: HTML5, CSS3, JavaScript (ES6+), Bootstrap 5, PHP, MySQL, Shopify & Liquid theme customization.
- **Experience Highlights**: Customer Care Representative at Ascendum KPS, Web & Shopify Developer Intern at Augmetic Pvt Ltd, Full Stack Furniture E-Commerce Developer at Sunrise Infotech.
- **Education**: Data Analytics at Grras IT Solutions, Bachelor of Computer Applications (BCA) at Gujarat University, 12th at Shree Dharmjivanswami Higher Secondary School - Taravda.

### Secure Administrator CMS
- **Dedicated Admin URL**: `/admin/dashboard.html` (with standalone login page at `/admin/login.html` and modal login on public site).
- **Authentication**: Firebase Authentication integration with session persistence. Maps username `admin` to `ranpariya012@gmail.com`.
- **Initial Setup Password**: `parth1221`
- **Comprehensive CRUD Modules**:
  1. **Projects Management**: Add, edit, delete, toggle publish/draft, order, and thumbnail preview.
  2. **Certificates Management**: Register credentials, issuing body, verification URLs, and issuance dates.
  3. **Experience Management**: Maintain career timeline and roles.
  4. **Skills Management**: Add and curate analytical tools with custom badge levels and icons.
  5. **Education Management**: Academic qualifications and coursework.
  6. **Profile & SEO Settings**: Modify display name, bio, social URLs, and contact info in real-time.
  7. **Contact Messages Inbox**: View received inquiries, filter by status (New, Read, Archived), and manage submissions.

---

# ગુજરાતી સેટઅપ અને ડિપ્લોયમેન્ટ ગાઇડ (Gujarati Step-by-Step Guide)

આ ગાઇડમાં તમે આ પોર્ટફોલિયો વેબસાઇટને **GitHub**, **Firebase**, અને **Vercel** પર ૧૦૦% મફતમાં (Free Tier) કેવી રીતે સેટઅપ અને લાઈવ કરવી તે સરળ સ્ટેપ્સમાં સમજી શકશો.

---

### ભાગ ૧: GitHub પર પ્રોજેક્ટ અપલોડ કરવો (GitHub Repository Setup)

1. **GitHub પર લોગિન કરો**: [github.com](https://github.com) પર જાઓ અને તમારું એકાઉન્ટ લોગિન કરો.
2. **નવું Repository બનાવો**:
   - ઉપર જમણી બાજુ **`+`** આઇકન પર ક્લિક કરી **New repository** પસંદ કરો.
   - Repository Name આપો, દા.ત. `parth-portfolio`.
   - તેને **Public** રાખો અને **Create repository** બટન પર ક્લિક કરો.
3. **ફાઇલો અપલોડ કરો**:
   ```bash
   git init
   git add .
   git commit -m "Parth Ranpariya Data Analyst Portfolio & Admin CMS"
   git branch -M main
   git remote add origin https://github.com/તમારું-યુઝરનેમ/parth-portfolio.git
   git push -u origin main
   ```

---

### ભાગ ૨: Firebase પ્રોજેક્ટ અને ડેટાબેઝ સેટઅપ (Firebase Setup)

1. **Firebase Console ખોલો**: [console.firebase.google.com](https://console.firebase.google.com/) પર જાઓ.
2. **નવો પ્રોજેક્ટ બનાવો**: **Add project** પર ક્લિક કરી નામ આપો: `parth-portfolio`.
3. **Authentication સક્ષમ કરો**:
   - **Build > Authentication > Get started** કરો.
   - **Email/Password** સક્ષમ કરો.
   - **Users** ટેબમાં જઈ નવો એડમિન યુઝર બનાવો:
     - Email: `ranpariya012@gmail.com`
     - Password: `parth1221` (અથવા તમારો મજબૂત પાસવર્ડ)
4. **Cloud Firestore ડેટાબેઝ**:
   - **Build > Firestore Database** બનાવો.
   - **Rules** ટેબમાં જઈ `firestore.rules` ના નિયમો પબ્લિશ કરો.
5. **Firebase Web App Config ઉમેરવો**:
   - **Project settings > Your apps > Web app** માંથી `firebaseConfig` કોપી કરી `js/firebase-config.js` માં પેસ્ટ કરો.

---

### ભાગ ૩: Vercel પર ૧૦૦% મફત હોસ્ટિંગ (Free Vercel Deployment)

1. [vercel.com](https://vercel.com) પર જાઓ અને GitHub થી લોગિન કરો.
2. **Add New > Project** પર ક્લિક કરી `parth-portfolio` ઇમ્પોર્ટ કરો.
3. Framework માં **Other** રાખી **Deploy** બટન દબાવો.
4. ૩૦ સેકન્ડમાં તમારી લાઈવ વેબસાઇટ `https://parth-portfolio.vercel.app` પર લાઈવ થઈ જશે.

---

### ભાગ ૪: એડમિન પેનલ લોગિન અને વાપરવાની રીત (Using Admin CMS)

1. વેબસાઇટના છેડે (Footer) માં આવેલા નાના શિલ્ડ આઇકન (🛡️) પર ક્લિક કરો, અથવા ડાયરેક્ટ `/admin/login.html` ખોલો.
2. લોગિન વિગતો:
   - **Username**: `admin` (અથવા `ranpariya012@gmail.com`)
   - **Password**: `parth1221`
3. તમે કોઈપણ પ્રોજેક્ટ, સર્ટિફિકેટ કે સ્કીલ બદલશો તો તે તરત જ પબ્લિક સાઇટ પર ઓટોમેટિક અપડેટ થઈ જશે.
