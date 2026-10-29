// lib/i18n.js - Multi-language localization dictionary for English, Hindi, Spanish, French, and German

export const SUPPORTED_LANGUAGES = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'hi', label: 'हिन्दी', flag: '🇮🇳' },
  { code: 'es', label: 'Español', flag: '🇪🇸' },
  { code: 'fr', label: 'Français', flag: '🇫🇷' },
  { code: 'de', label: 'Deutsch', flag: '🇩🇪' },
];

export const translations = {
  // ── ENGLISH (DEFAULT) ──
  en: {
    brandName: 'MB Learning',
    brandTagline: 'Experiential Learning & School Tours',
    badgeGlobalTrips: 'Global Trips',
    navSampleTrips: 'Sample Trips',
    navWhyUs: 'Why MB Learning',
    navHowItWorks: 'How It Works',
    navAdminPortal: 'Admin Portal',
    navAdmin: 'Admin',
    navAdminDashboard: 'Admin Dashboard',
    navRegisterInterest: 'Register Interest',
    navRegister: 'Register',

    heroBadge: 'Experiential Learning Beyond the Classroom • 2026–2027',
    heroTitle1: 'Inspire Your Students',
    heroTitle2: 'Beyond the Classroom',
    heroDesc:
      "Curated educational travel programmes for schools. Explore sample itineraries to Singapore, Jaipur, and London. Register your school's interest and receive a custom itinerary & proposal tailored to your syllabus.",
    heroBtnExplore: 'Explore Sample Trips',
    heroBtnRegister: 'Register School Interest',

    stat1Title: '3 Global Themes',
    stat1Sub: 'STEM, Heritage, Higher Ed',
    stat2Title: '2,400+ Students',
    stat2Sub: 'Inspired across partner schools',
    stat3Title: '1:10 Teacher Ratio',
    stat3Sub: 'Safety & adult supervision first',
    stat4Title: '48-Hour Response',
    stat4Sub: 'Customized school quotation',

    tripsBadge: 'Sample Programmes',
    tripsTitle: 'Curated Educational Expeditions',
    tripsDesc:
      'These illustrative programmes combine academic depth with experiential real-world learning. Click any trip to pre-fill your school registration below.',
    tripsCustomNote:
      '💡 Need a custom destination such as Switzerland CERN, NASA Kennedy Space Center, or Japan Robotics?',
    tripsCustomLink: 'Let us know in your interest registration.',
    tripSelectBtn: 'Select This Trip',
    tripSelectedBtn: 'Trip Selected',

    howBadge: 'Simple 4-Step Journey',
    howTitle: 'How We Partner With Your School',
    howDesc:
      'From initial syllabus alignment to safe student return, we handle 100% of the logistics.',
    step1Title: 'Register Interest',
    step1Desc:
      'Pick your preferred sample itinerary and provide student estimates via our simple form.',
    step2Title: 'Tailored Proposal',
    step2Desc:
      'Within 48 hours, receive an all-inclusive itinerary, verified safety plan, and transparent quote.',
    step3Title: 'Parent & Board Pack',
    step3Desc:
      'We supply parent presentation decks, consent forms, and visa guidance for school leadership.',
    step4Title: 'Guided Expedition',
    step4Desc:
      'A dedicated MB Learning trip director accompanies the group 24/7 so teachers focus on mentoring.',

    whyBadge: 'Uncompromising Standards',
    whyTitle: 'Why Leading Educators Choose Us',
    whyDesc:
      'We understand school compliance, student safeguarding, and pedagogical objectives.',
    feature1Title: 'Curriculum-Aligned Learning',
    feature1Desc:
      'Every visit is paired with guided reflection worksheets and student discussions linked directly to IB, Cambridge, CBSE, or ICSE syllabi.',
    feature2Title: 'Comprehensive Safety First',
    feature2Desc:
      'Audited 3-star and 4-star hotels, verified coach operators, round-the-clock emergency medical assistance, and full travel insurance.',
    feature3Title: 'Teacher-Friendly Execution',
    feature3Desc:
      'Zero paperwork burden. We handle flight bookings, group visas, meal dietary restrictions, and parent queries from start to finish.',

    regBadge: 'Coordinator Registration',
    regTitle: "Let's Plan Your School's Next Learning Adventure",
    regDesc:
      'Fill out the form with your school details. Submitting this form does not confirm a booking nor incur any cost. It allows our educational travel planners to assemble an accurate proposal for your batch.',
    receiveTitle: 'What You Receive with Your Proposal:',
    receive1: 'Day-by-day itemized academic schedule',
    receive2: 'Transparent group pricing & payment milestones',
    receive3: 'Comprehensive risk assessment & insurance policy pack',
    receive4: 'Parent presentation slides customized with your school crest',
    advisoryBadge: "Founders' Office & School Advisory",
    advisoryTitle: 'Have questions before registering?',
    advisoryAddress: 'Gachibowli, Hyderabad, Telangana, India',
    advisoryHours: '+91 40 4821 7000 (Mon–Fri, 9am–6pm IST)',

    formNoObligation: 'No Booking Obligation',
    formStep: 'Step 1 of 2',
    formHeader: "Register Your School's Interest",
    formSub:
      'Submit your details below. We usually prepare detailed proposals within 3–5 working days.',
    formLabelTeacher: 'Coordinator / Teacher Full Name *',
    formPlaceholderTeacher: 'e.g. Dr. Rajesh Sharma or Sarah Jenkins',
    formLabelSchool: 'School / Institution Name *',
    formPlaceholderSchool: 'e.g. The Heritage Academy, Delhi',
    formLabelEmail: 'Official School Email *',
    formPlaceholderEmail: 'teacher@school.edu.in',
    formLabelPhone: 'Contact Phone Number *',
    formPlaceholderPhone: '+91 98765 43210',
    formLabelTrip: 'Selected Study Tour Itinerary *',
    formPlaceholderTrip: 'Choose an educational itinerary...',
    formLabelStudents: 'Estimated Student Travelers *',
    formPlaceholderStudents: 'e.g. 25',
    formSubmitBtn: 'Submit School Registration',
    formSubmitting: 'Submitting to Supabase...',
    formSuccessTitle: 'Interest Registered Successfully!',
    formSuccessNextTitle: 'Next Steps for Your School:',
    formSuccessNext1: '1. Our academic travel advisor will review your student cohort requirements.',
    formSuccessNext2: '2. You will receive a customized itinerary deck & safety pack within 3–5 working days.',
    formSuccessNext3: '3. We will schedule a brief video consultation with your school leadership.',
    formAnotherBtn: 'Submit Another Registration',

    faqBadge: 'Questions & Answers',
    faqTitle: 'Frequently Asked School Questions',
    faq1Q: 'What is the required teacher-to-student ratio?',
    faq1A:
      'We adhere to international school safety standards with a strict 1:10 teacher/chaperone to student ratio. We also provide 1 fully-funded teacher spot for every 10 registered students.',
    faq2Q: 'Are these dates and itineraries fixed?',
    faq2A:
      'No. All three itineraries (Singapore STEM, Jaipur Heritage, London Universities) are illustrative templates. Departure dates, duration, hotel tiers, and workshop topics can be customized around your academic calendar and term breaks.',
    faq3Q: 'What happens after I submit this interest form?',
    faq3A:
      'An MB Learning academic tour consultant will review your school requirements and reach out within 3–5 working days to present an itemized proposal, costing estimate, and safety kit.',
    faq4Q: 'How are visas and international travel documents handled?',
    faq4A:
      'For Singapore and London trips, we provide official student invitation letters, complete visa application checklists, and coordinate biometric group appointments with embassies.',

    footerDesc:
      'Curated experiential study tours for forward-thinking schools across India and beyond.',
    footerRights: 'All rights reserved. MB Learning Global Educational Tours.',
    footerSampleTrips: 'Sample Itineraries',
    footerResources: 'Educator Resources',
    footerSafety: 'Student Safety Charter',
    footerCurriculum: 'Curriculum Alignment',
    footerFAQ: 'Trip Planning FAQ',
    footerPrivacy: 'Privacy Policy & Terms',
  },

  // ── HINDI (हिन्दी) ──
  hi: {
    brandName: 'एमबी लर्निंग',
    brandTagline: 'अनुभवात्मक शिक्षा और स्कूल यात्राएं',
    badgeGlobalTrips: 'ग्लोबल ट्रिप्स',
    navSampleTrips: 'नमूना यात्राएं',
    navWhyUs: 'एमबी लर्निंग क्यों',
    navHowItWorks: 'यह कैसे काम करता है',
    navAdminPortal: 'एडमिन पोर्टल',
    navAdmin: 'एडमिन',
    navAdminDashboard: 'एडमिन डैशबोर्ड',
    navRegisterInterest: 'रुचि दर्ज करें',
    navRegister: 'पंजीकरण',

    heroBadge: 'कक्षा से परे अनुभवात्मक शिक्षा • 2026–2027',
    heroTitle1: 'अपने विद्यार्थियों को प्रेरित करें',
    heroTitle2: 'कक्षा से परे एक नई दुनिया में',
    heroDesc:
      'स्कूलों के लिए विशेष रूप से तैयार किए गए शैक्षणिक यात्रा कार्यक्रम। सिंगापुर, जयपुर और लंदन के नमूना यात्रा कार्यक्रमों को देखें। अपने स्कूल की रुचि दर्ज करें और अपने पाठ्यक्रम के अनुसार अनुकूलित प्रस्ताव प्राप्त करें।',
    heroBtnExplore: 'नमूना यात्राएं देखें',
    heroBtnRegister: 'स्कूल की रुचि दर्ज करें',

    stat1Title: '3 वैश्विक विषय',
    stat1Sub: 'एसटीईएम, विरासत, उच्च शिक्षा',
    stat2Title: '2,400+ विद्यार्थी',
    stat2Sub: 'सहयोगी स्कूलों में प्रेरित',
    stat3Title: '1:10 शिक्षक अनुपात',
    stat3Sub: 'सुरक्षा और वयस्क निगरानी प्राथमिकता',
    stat4Title: '48-घंटे में समाधान',
    stat4Sub: 'अनुकूलित स्कूल कोटेशन',

    tripsBadge: 'नमूना कार्यक्रम',
    tripsTitle: 'विशेष रूप से तैयार शैक्षणिक अभियान',
    tripsDesc:
      'ये कार्यक्रम शैक्षणिक गहराई को व्यावहारिक वास्तविक दुनिया के अनुभवों के साथ जोड़ते हैं। नीचे पंजीकरण फॉर्म में पूर्व-भरने के लिए किसी भी यात्रा पर क्लिक करें।',
    tripsCustomNote:
      '💡 क्या आपको स्विट्जरलैंड सर्न, नासा केनेडी स्पेस सेंटर, या जापान रोबोटिक्स जैसे कस्टम गंतव्य की आवश्यकता है?',
    tripsCustomLink: 'अपने पंजीकरण फॉर्म में हमें बताएं।',
    tripSelectBtn: 'यह यात्रा चुनें',
    tripSelectedBtn: 'यात्रा चुनी गई',

    howBadge: 'सरल 4-चरणीय यात्रा',
    howTitle: 'हम आपके स्कूल के साथ कैसे साझेदारी करते हैं',
    howDesc:
      'प्रारंभिक पाठ्यक्रम संरेखण से लेकर छात्रों की सुरक्षित वापसी तक, हम 100% लॉजिस्टिक्स संभालते हैं।',
    step1Title: 'रुचि दर्ज करें',
    step1Desc:
      'अपना पसंदीदा नमूना यात्रा कार्यक्रम चुनें और हमारे सरल फॉर्म के माध्यम से छात्र अनुमान प्रदान करें।',
    step2Title: 'अनुकूलित प्रस्ताव',
    step2Desc:
      '48 घंटों के भीतर, एक सर्व-समावेशी यात्रा कार्यक्रम, सत्यापित सुरक्षा योजना और पारदर्शी कोट प्राप्त करें।',
    step3Title: 'अभिभावक एवं बोर्ड पैक',
    step3Desc:
      'हम स्कूल नेतृत्व के लिए अभिभावक प्रस्तुति डेक, सहमति पत्र और वीज़ा मार्गदर्शन प्रदान करते हैं।',
    step4Title: 'निर्देशित अभियान',
    step4Desc:
      'एक समर्पित एमबी लर्निंग ट्रिप डायरेक्टर समूह के साथ 24/7 रहता है ताकि शिक्षक केवल मार्गदर्शन पर ध्यान केंद्रित कर सकें।',

    whyBadge: 'अटल सुरक्षा मानक',
    whyTitle: 'प्रमुख शिक्षक हमें क्यों चुनते हैं',
    whyDesc:
      'हम स्कूल अनुपालन, छात्र सुरक्षा और शैक्षणिक लक्ष्यों को गहराई से समझते हैं।',
    feature1Title: 'पाठ्यक्रम-संरेखित शिक्षा',
    feature1Desc:
      'प्रत्येक यात्रा आईबी, कैम्ब्रिज, सीबीएसई, या आईसीएसई पाठ्यक्रमों से सीधे जुड़ी चिंतन कार्यपत्रकों और चर्चाओं के साथ होती है।',
    feature2Title: 'व्यापक सुरक्षा सर्वोपरि',
    feature2Desc:
      'सत्यापित 3-स्टार और 4-स्टार होटल, प्रमाणित बस ऑपरेटर, 24 घंटे आपातकालीन चिकित्सा सहायता और पूर्ण यात्रा बीमा।',
    feature3Title: 'शिक्षकों के लिए तनावमुक्त अनुभव',
    feature3Desc:
      'कागजी कार्रवाई का शून्य बोझ। हम शुरुआत से अंत तक उड़ान बुकिंग, समूह वीज़ा, भोजन व्यवस्था और माता-पिता के प्रश्नों का प्रबंधन करते हैं।',

    regBadge: 'संयोजक पंजीकरण',
    regTitle: 'आइए आपके स्कूल के अगले शैक्षणिक साहसिक कार्य की योजना बनाएं',
    regDesc:
      'अपने स्कूल के विवरण के साथ फॉर्म भरें। यह फॉर्म जमा करने से कोई बुकिंग पक्की नहीं होती और न ही कोई लागत आती है। यह हमारे योजनाकारों को सटीक प्रस्ताव तैयार करने की अनुमति देता है।',
    receiveTitle: 'प्रस्ताव के साथ आपको क्या प्राप्त होता है:',
    receive1: 'दिन-प्रतिदिन का विस्तृत शैक्षणिक कार्यक्रम',
    receive2: 'पारदर्शी समूह मूल्य निर्धारण और भुगतान चरण',
    receive3: 'व्यापक जोखिम मूल्यांकन और यात्रा बीमा पॉलिसी पैक',
    receive4: 'आपके स्कूल के प्रतीक चिह्न के साथ अनुकूलित अभिभावक प्रस्तुति स्लाइड',
    advisoryBadge: 'संस्थापक कार्यालय एवं स्कूल सलाहकार',
    advisoryTitle: 'पंजीकरण करने से पहले कोई प्रश्न हैं?',
    advisoryAddress: 'गच्चीबाउली, हैदराबाद, तेलंगाना, भारत',
    advisoryHours: '+91 40 4821 7000 (सोम–शुक्र, सुबह 9 से शाम 6 बजे)',

    formNoObligation: 'बुकिंग का कोई दायित्व नहीं',
    formStep: 'चरण 1 का 2',
    formHeader: 'अपने स्कूल की रुचि दर्ज करें',
    formSub:
      'नीचे अपना विवरण जमा करें। हम आमतौर पर 3–5 कार्य दिवसों के भीतर विस्तृत प्रस्ताव तैयार करते हैं।',
    formLabelTeacher: 'समन्वयक / शिक्षक का पूरा नाम *',
    formPlaceholderTeacher: 'उदा. डॉ. राजेश शर्मा या सारा जेनकिंस',
    formLabelSchool: 'स्कूल / संस्थान का नाम *',
    formPlaceholderSchool: 'उदा. द हेरिटेज एकेडमी, दिल्ली',
    formLabelEmail: 'आधिकारिक स्कूल ईमेल *',
    formPlaceholderEmail: 'teacher@school.edu.in',
    formLabelPhone: 'संपर्क फोन नंबर *',
    formPlaceholderPhone: '+91 98765 43210',
    formLabelTrip: 'चयनित अध्ययन यात्रा कार्यक्रम *',
    formPlaceholderTrip: 'एक शैक्षणिक यात्रा कार्यक्रम चुनें...',
    formLabelStudents: 'अनुमानित छात्र संख्या *',
    formPlaceholderStudents: 'उदा. 25',
    formSubmitBtn: 'स्कूल पंजीकरण जमा करें',
    formSubmitting: 'सुपाबेस में सुरक्षित किया जा रहा है...',
    formSuccessTitle: 'रुचि सफलतापूर्वक दर्ज की गई!',
    formSuccessNextTitle: 'आपके स्कूल के लिए अगले चरण:',
    formSuccessNext1: '1. हमारे शैक्षणिक यात्रा सलाहकार आपकी आवश्यकताओं की समीक्षा करेंगे।',
    formSuccessNext2: '2. आपको 3–5 कार्य दिवसों में अनुकूलित यात्रा कार्यक्रम व सुरक्षा पैक प्राप्त होगा।',
    formSuccessNext3: '3. हम आपके स्कूल नेतृत्व के साथ एक संक्षिप्त वीडियो परामर्श निर्धारित करेंगे।',
    formAnotherBtn: 'एक और पंजीकरण जमा करें',

    faqBadge: 'प्रश्न और उत्तर',
    faqTitle: 'स्कूलों द्वारा अक्सर पूछे जाने वाले प्रश्न',
    faq1Q: 'आवश्यक शिक्षक-से-छात्र अनुपात क्या है?',
    faq1A:
      'हम 1:10 शिक्षक/पर्यवेक्षक से छात्र अनुपात के कड़े अंतरराष्ट्रीय सुरक्षा मानकों का पालन करते हैं। हम प्रत्येक 10 छात्रों पर 1 शिक्षक की पूरी यात्रा निःशुल्क प्रदान करते हैं।',
    faq2Q: 'क्या ये तारीखें और यात्रा कार्यक्रम तय हैं?',
    faq2A:
      'नहीं। तीनों कार्यक्रम (सिंगापुर एसटीईएम, जयपुर हेरिटेज, लंदन विश्वविद्यालय) निदर्शी टेम्पलेट हैं। प्रस्थान तिथियां, अवधि, होटल और कार्यशालाओं को आपके शैक्षणिक कैलेंडर के अनुसार बदला जा सकता है।',
    faq3Q: 'इस फॉर्म को जमा करने के बाद क्या होता है?',
    faq3A:
      'एमबी लर्निंग सलाहकार आपकी आवश्यकताओं की समीक्षा करेगा और 3–5 कार्य दिवसों के भीतर एक मदवार प्रस्ताव, लागत अनुमान और सुरक्षा किट पेश करने के लिए संपर्क करेगा।',
    faq4Q: 'वीज़ा और अंतरराष्ट्रीय यात्रा दस्तावेजों को कैसे संभाला जाता है?',
    faq4A:
      'सिंगापुर और लंदन यात्राओं के लिए, हम आधिकारिक छात्र निमंत्रण पत्र, वीज़ा चेकलिस्ट प्रदान करते हैं और दूतावासों के साथ बायोमेट्रिक अपॉइंटमेंट का समन्वय करते हैं।',

    footerDesc:
      'भारत और विश्व भर के दूरदर्शी स्कूलों के लिए विशेष रूप से तैयार अनुभवात्मक अध्ययन यात्राएं।',
    footerRights: 'सर्वाधिकार सुरक्षित। एमबी लर्निंग ग्लोबल एजुकेशनल टूर्स।',
    footerSampleTrips: 'नमूना यात्रा कार्यक्रम',
    footerResources: 'शिक्षक संसाधन',
    footerSafety: 'छात्र सुरक्षा चार्टर',
    footerCurriculum: 'पाठ्यक्रम संरेखण',
    footerFAQ: 'यात्रा योजना प्रश्नोत्तरी',
    footerPrivacy: 'गोपनीयता नीति एवं शर्तें',
  },

  // ── SPANISH (ESPAÑOL) ──
  es: {
    brandName: 'MB Learning',
    brandTagline: 'Aprendizaje Vivencial y Viajes Escolares',
    badgeGlobalTrips: 'Viajes Globales',
    navSampleTrips: 'Itinerarios de Muestra',
    navWhyUs: 'Por Qué Elegirnos',
    navHowItWorks: 'Cómo Funciona',
    navAdminPortal: 'Portal de Administración',
    navAdmin: 'Admin',
    navAdminDashboard: 'Panel de Control',
    navRegisterInterest: 'Registrar Interés',
    navRegister: 'Registrarse',

    heroBadge: 'Aprendizaje Vivencial Más Allá del Aula • 2026–2027',
    heroTitle1: 'Inspira a Tus Alumnos',
    heroTitle2: 'Más Allá del Aula',
    heroDesc:
      'Programas de viajes educativos seleccionados para colegios e institutos. Explora itinerarios en Singapur, Jaipur y Londres. Registra el interés de tu centro y recibe una propuesta y presupuesto adaptados a tu plan de estudios.',
    heroBtnExplore: 'Explorar Itinerarios',
    heroBtnRegister: 'Registrar Interés del Colegio',

    stat1Title: '3 Temas Globales',
    stat1Sub: 'STEM, Patrimonio, Univ. Top',
    stat2Title: 'Más de 2.400 Alumnos',
    stat2Sub: 'Inspirados en colegios asociados',
    stat3Title: 'Ratio 1:10 Profesores',
    stat3Sub: 'Seguridad y supervisión prioritaria',
    stat4Title: 'Respuesta en 48 Horas',
    stat4Sub: 'Presupuesto escolar a medida',

    tripsBadge: 'Programas de Muestra',
    tripsTitle: 'Expediciones Educativas Seleccionadas',
    tripsDesc:
      'Estos programas combinan profundidad académica con aprendizaje vivencial en el mundo real. Haz clic en cualquier viaje para rellenar automáticamente el formulario de registro.',
    tripsCustomNote:
      '💡 ¿Buscas un destino personalizado como Suiza CERN, NASA Kennedy Space Center o Japón Robótica?',
    tripsCustomLink: 'Indícalo en el formulario de inscripción.',
    tripSelectBtn: 'Seleccionar Este Viaje',
    tripSelectedBtn: 'Viaje Seleccionado',

    howBadge: 'Proceso Sencillo en 4 Pasos',
    howTitle: 'Cómo Colaboramos con Tu Colegio',
    howDesc:
      'Desde la alineación inicial con el currículo escolar hasta el regreso seguro de los alumnos, gestionamos el 100% de la logística.',
    step1Title: 'Registro de Interés',
    step1Desc:
      'Elige el itinerario de muestra preferido e introduce el número estimado de estudiantes en nuestro formulario.',
    step2Title: 'Propuesta Personalizada',
    step2Desc:
      'En 48 horas recibirás un itinerario completo todo incluido, plan de seguridad verificado y presupuesto transparente.',
    step3Title: 'Dossier para Familias y Dirección',
    step3Desc:
      'Proporcionamos presentaciones para familias, formularios de autorización y orientación de visados para la dirección escolar.',
    step4Title: 'Expedición Acompañada',
    step4Desc:
      'Un director de viaje exclusivo de MB Learning acompaña al grupo las 24 horas del día para que el profesorado se centre en la docencia.',

    whyBadge: 'Estándares Rigurosos',
    whyTitle: 'Por Qué los Educadores Confían en Nosotros',
    whyDesc:
      'Entendemos la normativa escolar, la protección al menor y los objetivos pedagógicos.',
    feature1Title: 'Aprendizaje Conectado al Currículo',
    feature1Desc:
      'Cada visita se combina con cuadernos de trabajo guiados y debates reflexivos vinculados al Bachillerato Internacional, Cambridge o currículo nacional.',
    feature2Title: 'Máxima Seguridad Integral',
    feature2Desc:
      'Hoteles auditados de 3 y 4 estrellas, autocares homologados, asistencia médica 24/7 y seguro de viaje internacional completo.',
    feature3Title: 'Gestión Fácil para Profesores',
    feature3Desc:
      'Cero burocracia. Gestionamos vuelos, visados grupales, restricciones alimentarias y consultas de las familias de principio a fin.',

    regBadge: 'Registro para Coordinadores',
    regTitle: 'Diseñemos la Próxima Aventura Educativa de Tu Colegio',
    regDesc:
      'Rellena el formulario con los datos de tu institución. El envío no implica ninguna reserva en firme ni coste alguno.',
    receiveTitle: 'Lo que Recibirás con Tu Propuesta:',
    receive1: 'Cronograma académico detallado día a día',
    receive2: 'Precios grupales transparentes e hitos de pago',
    receive3: 'Evaluación exhaustiva de riesgos y póliza de seguro',
    receive4: 'Presentación para familias personalizada con el escudo de tu colegio',
    advisoryBadge: 'Oficina Central y Asesoría Escolar',
    advisoryTitle: '¿Tienes dudas antes de registrarte?',
    advisoryAddress: 'Gachibowli, Hyderabad, Telangana, India',
    advisoryHours: '+91 40 4821 7000 (Lun–Vie, 9:00–18:00 IST)',

    formNoObligation: 'Sin Compromiso de Reserva',
    formStep: 'Paso 1 de 2',
    formHeader: 'Registra el Interés de Tu Colegio',
    formSub:
      'Envía tus datos a continuación. Preparamos propuestas completas en 3 a 5 días laborables.',
    formLabelTeacher: 'Nombre Completo del Coordinador / Docente *',
    formPlaceholderTeacher: 'ej. Prof. Carlos Gómez o Dra. Elena Morales',
    formLabelSchool: 'Nombre del Colegio / Instituto *',
    formPlaceholderSchool: 'ej. Colegio Internacional Madrid',
    formLabelEmail: 'Correo Electrónico Institucional *',
    formPlaceholderEmail: 'profesor@colegio.edu.es',
    formLabelPhone: 'Teléfono de Contacto *',
    formPlaceholderPhone: '+34 600 000 000',
    formLabelTrip: 'Itinerario Educativo Seleccionado *',
    formPlaceholderTrip: 'Selecciona un programa formativo...',
    formLabelStudents: 'Número Estimado de Estudiantes *',
    formPlaceholderStudents: 'ej. 25',
    formSubmitBtn: 'Enviar Registro Escolar',
    formSubmitting: 'Guardando en Supabase...',
    formSuccessTitle: '¡Registro Enviado con Éxito!',
    formSuccessNextTitle: 'Siguientes Pasos para Tu Colegio:',
    formSuccessNext1: '1. Nuestro asesor pedagógico revisará los requerimientos de tu grupo de alumnos.',
    formSuccessNext2: '2. Recibirás un dossier de itinerario y kit de seguridad en un plazo de 3 a 5 días.',
    formSuccessNext3: '3. Coordinaremos una breve videollamada informativa con la dirección del centro.',
    formAnotherBtn: 'Enviar Otra Solicitud',

    faqBadge: 'Preguntas y Respuestas',
    faqTitle: 'Preguntas Frecuentes de Colegios',
    faq1Q: '¿Cuál es la proporción requerida de profesores por alumno?',
    faq1A:
      'Cumplimos con estrictos estándares de seguridad escolar con un ratio 1:10 de docentes por alumno. Además, ofrecemos 1 plaza de profesor totalmente becada por cada 10 alumnos.',
    faq2Q: '¿Son fijas estas fechas e itinerarios?',
    faq2A:
      'No. Los tres itinerarios son plantillas ilustrativas. Las fechas de salida, duración, categoría hotelera y talleres se adaptan a su calendario escolar.',
    faq3Q: '¿Qué sucede después de enviar el formulario?',
    faq3A:
      'Un consultor de MB Learning analizará sus necesidades y se pondrá en contacto en un plazo de 3 a 5 días laborables con una propuesta detallada.',
    faq4Q: '¿Cómo se gestionan los visados y trámites internacionales?',
    faq4A:
      'Para Singapur y Londres, facilitamos cartas oficiales de invitación escolar, listas de documentación y citas biométricas con consulados.',

    footerDesc:
      'Viajes de estudio vivenciales diseñados para colegios con visión de futuro.',
    footerRights: 'Todos los derechos reservados. MB Learning Global Educational Tours.',
    footerSampleTrips: 'Itinerarios de Muestra',
    footerResources: 'Recursos para Educadores',
    footerSafety: 'Carta de Seguridad Estudiantil',
    footerCurriculum: 'Alineación Curricular',
    footerFAQ: 'Preguntas Frecuentes',
    footerPrivacy: 'Política de Privacidad y Términos',
  },

  // ── FRENCH (FRANÇAIS) ──
  fr: {
    brandName: 'MB Learning',
    brandTagline: 'Apprentissage Expérientiel et Voyages Scolaires',
    badgeGlobalTrips: 'Voyages Mondiaux',
    navSampleTrips: 'Exemples de Séjours',
    navWhyUs: 'Pourquoi Nous Choisir',
    navHowItWorks: 'Comment Ça Marche',
    navAdminPortal: 'Portail Admin',
    navAdmin: 'Admin',
    navAdminDashboard: 'Tableau de Bord Admin',
    navRegisterInterest: 'Manifester un Intérêt',
    navRegister: 'Inscription',

    heroBadge: 'Apprentissage Expérientiel au-delà de la Classe • 2026–2027',
    heroTitle1: 'Inspirez Vos Élèves',
    heroTitle2: 'Au-Delà de la Classe',
    heroDesc:
      'Programmes de voyages éducatifs sur mesure pour collèges et lycées. Découvrez nos itinéraires à Singapour, Jaipur et Londres. Manifestez votre intérêt et recevez une proposition pédagogique adaptée à votre programme.',
    heroBtnExplore: 'Découvrir les Séjours',
    heroBtnRegister: 'Inscrire un Établissement',

    stat1Title: '3 Thématiques Clés',
    stat1Sub: 'STEM, Patrimoine, Universités',
    stat2Title: 'Plus de 2 400 Élèves',
    stat2Sub: 'Inspirés dans nos écoles partenaires',
    stat3Title: 'Ratio 1:10 Enseignants',
    stat3Sub: 'Sécurité et encadrement adulte garantis',
    stat4Title: 'Réponse en 48 Heures',
    stat4Sub: 'Devis scolaire sur mesure',

    tripsBadge: 'Exemples de Programmes',
    tripsTitle: 'Expéditions Éducatives d’Excellence',
    tripsDesc:
      'Ces séjours allient rigueur académique et immersion pratique sur le terrain. Cliquez sur un séjour pour pré-remplir votre formulaire d’inscription ci-dessous.',
    tripsCustomNote:
      '💡 Besoin d’une destination personnalisée telle que le CERN en Suisse, la NASA ou la robotique au Japon ?',
    tripsCustomLink: 'Indiquez-le dans votre formulaire de pré-inscription.',
    tripSelectBtn: 'Choisir ce Séjour',
    tripSelectedBtn: 'Séjour Sélectionné',

    howBadge: 'Parcours Simple en 4 Étapes',
    howTitle: 'Notre Partenariat avec Votre Établissement',
    howDesc:
      'Du cadrage pédagogique initial jusqu’au retour serein des élèves, nous prenons en charge 100 % de la logistique.',
    step1Title: 'Expression d’Intérêt',
    step1Desc:
      'Choisissez votre itinéraire favori et estimez le nombre d’élèves via notre formulaire fluide.',
    step2Title: 'Proposition Sur Mesure',
    step2Desc:
      'Sous 48 heures, recevez un devis tout compris, un protocole de sécurité et un programme détaillé.',
    step3Title: 'Dossier Familles & Direction',
    step3Desc:
      'Nous fournissons diaporama de présentation parents, formulaires d’autorisation et assistance visas.',
    step4Title: 'Expédition Accompagnée',
    step4Desc:
      'Un directeur de voyage MB Learning accompagne le groupe 24h/24 pour libérer les professeurs des contraintes logistiques.',

    whyBadge: 'Normes Inégalées',
    whyTitle: 'Pourquoi les Éducateurs Nous Font Confiance',
    whyDesc:
      'Nous maîtrisons parfaitement la conformité scolaire, la protection des mineurs et les exigences académiques.',
    feature1Title: 'Alignement Pédagogique Concret',
    feature1Desc:
      'Chaque visite donne lieu à des ateliers de réflexion connectés directement aux référentiels du Baccalauréat, de l’IB ou de Cambridge.',
    feature2Title: 'Sécurité Maximale & Audits',
    feature2Desc:
      'Hôtels 3 et 4 étoiles inspectés, autocars certifiés, assistance médicale 24/7 et assurance voyage internationale multirisque.',
    feature3Title: 'Zéro Tracas pour les Enseignants',
    feature3Desc:
      'Aucune surcharge administrative. Nous gérons vols, visas de groupe, régimes alimentaires et questions des parents du début à la fin.',

    regBadge: 'Inscription Coordinateur',
    regTitle: 'Organisons Ensemble la Prochaine Aventure de Votre Établissement',
    regDesc:
      'Complétez le formulaire ci-dessous. Cette démarche ne constitue aucun engagement financier ni contractuel.',
    receiveTitle: 'Ce que Vous Recevrez avec Votre Proposition :',
    receive1: 'Planning pédagogique détaillé jour par jour',
    receive2: 'Tarification de groupe transparente et échéancier',
    receive3: 'Évaluation des risques et dossier d’assurance complet',
    receive4: 'Présentation parents personnalisée aux couleurs de votre école',
    advisoryBadge: 'Direction & Conseil Établissements',
    advisoryTitle: 'Des questions avant de vous inscrire ?',
    advisoryAddress: 'Gachibowli, Hyderabad, Telangana, Inde',
    advisoryHours: '+91 40 4821 7000 (Lun–Ven, 9h–18h IST)',

    formNoObligation: 'Aucun Engagement de Réservation',
    formStep: 'Étape 1 sur 2',
    formHeader: 'Enregistrez l’Intérêt de Votre Établissement',
    formSub:
      'Remplissez vos coordonnées ci-dessous. Nous établissons nos devis sous 3 à 5 jours ouvrés.',
    formLabelTeacher: 'Nom Complet du Coordinateur / Enseignant *',
    formPlaceholderTeacher: 'ex. Prof. Laurent Mercier ou Mme Sylvie Dupont',
    formLabelSchool: 'Nom de l’Établissement Scolaire *',
    formPlaceholderSchool: 'ex. Lycée International de Paris',
    formLabelEmail: 'Adresse Email Institutionnelle *',
    formPlaceholderEmail: 'enseignant@ecole.fr',
    formLabelPhone: 'Numéro de Téléphone *',
    formPlaceholderPhone: '+33 6 12 34 56 78',
    formLabelTrip: 'Itinéraire Pédagogique Choisi *',
    formPlaceholderTrip: 'Sélectionnez un programme...',
    formLabelStudents: 'Effectif d’Élèves Estimé *',
    formPlaceholderStudents: 'ex. 25',
    formSubmitBtn: 'Valider la Pré-Inscription',
    formSubmitting: 'Enregistrement dans Supabase...',
    formSuccessTitle: 'Inscription Enregistrée avec Succès !',
    formSuccessNextTitle: 'Prochaines Étapes pour Votre École :',
    formSuccessNext1: '1. Notre conseiller pédagogique étudiera le profil et les besoins de votre classe.',
    formSuccessNext2: '2. Vous recevrez un dossier complet et un devis personnalisé sous 3 à 5 jours ouvrés.',
    formSuccessNext3: '3. Nous conviendrons d’un court échange en visioconférence avec la direction.',
    formAnotherBtn: 'Soumettre une Nouvelle Demande',

    faqBadge: 'Foire Aux Questions',
    faqTitle: 'Questions Fréquentes des Établissements',
    faq1Q: 'Quel est le ratio d’encadrement requis ?',
    faq1A:
      'Nous appliquons une norme stricte de 1 accompagnateur adulte pour 10 élèves, avec 1 place enseignante offerte pour 10 élèves inscrits.',
    faq2Q: 'Les dates et programmes sont-ils modifiables ?',
    faq2A:
      'Absolument. Nos 3 séjours sont des modèles adaptables selon vos périodes de vacances scolaires et objectifs pédagogiques.',
    faq3Q: 'Que se passe-t-il après l’envoi de ce formulaire ?',
    faq3A:
      'Un conseiller spécialisé vous contactera sous 3 à 5 jours pour vous remettre une offre détaillée et un plan de sécurité.',
    faq4Q: 'Comment sont gérés les visas et documents de voyage ?',
    faq4A:
      'Pour Singapour et Londres, nous fournissons les invitations officielles et coordonnons les démarches consulaires de groupe.',

    footerDesc:
      'Séjours d’études expérientiels pour établissements scolaires tournés vers l’avenir.',
    footerRights: 'Tous droits réservés. MB Learning Global Educational Tours.',
    footerSampleTrips: 'Séjours Témoins',
    footerResources: 'Ressources Enseignants',
    footerSafety: 'Charte de Sécurité Élèves',
    footerCurriculum: 'Concordance Pédagogique',
    footerFAQ: 'FAQ Organisation',
    footerPrivacy: 'Confidentialité & Conditions',
  },

  // ── GERMAN (DEUTSCH) ──
  de: {
    brandName: 'MB Learning',
    brandTagline: 'Erlebnispädagogik & Bildungsreisen für Schulen',
    badgeGlobalTrips: 'Globale Reisen',
    navSampleTrips: 'Beispielreisen',
    navWhyUs: 'Warum MB Learning',
    navHowItWorks: 'Ablauf & Konzept',
    navAdminPortal: 'Admin-Portal',
    navAdmin: 'Admin',
    navAdminDashboard: 'Admin-Dashboard',
    navRegisterInterest: 'Interesse Anmelden',
    navRegister: 'Anmelden',

    heroBadge: 'Lernen über das Klassenzimmer hinaus • 2026–2027',
    heroTitle1: 'Begeistern Sie Ihre Schüler',
    heroTitle2: 'Jenseits des Klassenzimmers',
    heroDesc:
      'Maßgeschneiderte Bildungsreisen für Schulen und Gymnasien. Entdecken Sie Beispielprogramme nach Singapur, Jaipur und London. Registrieren Sie das Interesse Ihrer Schule für ein individuelles Reisekonzept.',
    heroBtnExplore: 'Programme Entdecken',
    heroBtnRegister: 'Schulinteresse Registrieren',

    stat1Title: '3 Globale Schwerpunkte',
    stat1Sub: 'MINT, Weltkultur, Elite-Unis',
    stat2Title: 'Über 2.400 Schüler',
    stat2Sub: 'An Partnerschulen inspiriert',
    stat3Title: '1:10 Betreuungsschlüssel',
    stat3Sub: 'Höchste Sicherheit & Aufsicht',
    stat4Title: '48-Stunden-Reaktion',
    stat4Sub: 'Individuelles Schulangebot',

    tripsBadge: 'Beispielprogramme',
    tripsTitle: 'Kuratierte Bildungsexpeditionen',
    tripsDesc:
      'Diese Reisen verbinden akademische Tiefe mit praktischen Erfahrungen vor Ort. Klicken Sie auf ein Programm, um das Anmeldeformular vorab auszufüllen.',
    tripsCustomNote:
      '💡 Wünschen Sie ein anderes Ziel wie CERN Schweiz, NASA Space Center oder Robotik in Japan?',
    tripsCustomLink: 'Geben Sie dies einfach im Formular an.',
    tripSelectBtn: 'Diese Reise Wählen',
    tripSelectedBtn: 'Reise Ausgewählt',

    howBadge: 'Einfacher 4-Schritte-Ablauf',
    howTitle: 'So Arbeiten Wir mit Ihrer Schule Zusammen',
    howDesc:
      'Von der Lehrplanabstimmung bis zur sicheren Rückkehr übernehmen wir 100 % der logistischen Organisation.',
    step1Title: 'Interesse Bekunden',
    step1Desc:
      'Wählen Sie Ihr Wunschprogramm und schätzen Sie die Teilnehmerzahl unverbindlich in unserem Formular.',
    step2Title: 'Maßgeschneidertes Angebot',
    step2Desc:
      'Binnen 48 Stunden erhalten Sie ein All-Inclusive-Angebot inklusive Sicherheitskonzept und Kostenplan.',
    step3Title: 'Eltern- & Schulleitungspaket',
    step3Desc:
      'Wir stellen Elternpräsentationen, Einverständniserklärungen und Visa-Leitfäden für die Schulleitung bereit.',
    step4Title: 'Begleitete Reise',
    step4Desc:
      'Ein eigener MB Learning Reiseleiter begleitet die Gruppe rund um die Uhr, damit Lehrkräfte sich auf die Betreuung konzentrieren können.',

    whyBadge: 'Kompromisslose Standards',
    whyTitle: 'Warum Führende Schulen Uns Wählen',
    whyDesc:
      'Wir kennen Schulrichtlinien, Fürsorgepflichten und pädagogische Lernziele ganz genau.',
    feature1Title: 'Lehrplankonformes Lernen',
    feature1Desc:
      'Jede Exkursion wird von geführten Arbeitsblättern und Reflexionsgesprächen begleitet – abgestimmt auf IB-, Cambridge- und Abituranforderungen.',
    feature2Title: 'Geprüfte Sicherheit Zuerst',
    feature2Desc:
      'Auditierte 3- und 4-Sterne-Hotels, zertifizierte Busunternehmen, 24/7 medizinische Notfallbereitschaft und voller Auslandsschutz.',
    feature3Title: 'Maximale Entlastung für Lehrkräfte',
    feature3Desc:
      'Kein bürokratischer Mehraufwand. Wir kümmern uns um Flüge, Gruppenvisa, Verpflegungswünsche und Elternanfragen.',

    regBadge: 'Koordinator-Registrierung',
    regTitle: 'Planen Wir das Nächste Lernabenteuer Ihrer Schule',
    regDesc:
      'Füllen Sie das Formular mit den Daten Ihrer Schule aus. Dies ist absolut unverbindlich und kostenfrei.',
    receiveTitle: 'Was Sie mit Ihrem Angebot Erhalten:',
    receive1: 'Detaillierter akademischer Tagesablauf',
    receive2: 'Transparente Gruppenpreise und Zahlungsmeilensteine',
    receive3: 'Umfassende Risikoanalyse und Versicherungspaket',
    receive4: 'Elternpräsentationsfolien im Design Ihrer Schule',
    advisoryBadge: 'Schulberatung & Gründerbüro',
    advisoryTitle: 'Haben Sie vorab Fragen?',
    advisoryAddress: 'Gachibowli, Hyderabad, Telangana, Indien',
    advisoryHours: '+91 40 4821 7000 (Mo–Fr, 9:00–18:00 Uhr IST)',

    formNoObligation: 'Keine Buchungsverpflichtung',
    formStep: 'Schritt 1 von 2',
    formHeader: 'Interesse Ihrer Schule Anmelden',
    formSub:
      'Geben Sie unten Ihre Kontaktdaten ein. Wir erstellen detaillierte Reisepläne innerhalb von 3–5 Werktagen.',
    formLabelTeacher: 'Name der Lehrkraft / des Koordinators *',
    formPlaceholderTeacher: 'z.B. OStR Thomas Weber oder Dr. Julia Meyer',
    formLabelSchool: 'Name der Schule / Institution *',
    formPlaceholderSchool: 'z.B. Humboldt-Gymnasium Berlin',
    formLabelEmail: 'Dienstliche Schul-E-Mail *',
    formPlaceholderEmail: 'lehrer@schule.de',
    formLabelPhone: 'Telefonnummer für Rückfragen *',
    formPlaceholderPhone: '+49 170 1234567',
    formLabelTrip: 'Gewähltes Studienreiseprogramm *',
    formPlaceholderTrip: 'Wählen Sie ein Reiseprogramm aus...',
    formLabelStudents: 'Geschätzte Schüleranzahl *',
    formPlaceholderStudents: 'z.B. 25',
    formSubmitBtn: 'Schulanmeldung Absenden',
    formSubmitting: 'Wird in Supabase gespeichert...',
    formSuccessTitle: 'Interesse Erfolgreich Übermittelt!',
    formSuccessNextTitle: 'Die Nächsten Schritte für Ihre Schule:',
    formSuccessNext1: '1. Unser Bildungsreiseberater prüft Ihre Schülergruppen-Anforderungen.',
    formSuccessNext2: '2. Sie erhalten innerhalb von 3–5 Werktagen ein maßgeschneidertes Konzept.',
    formSuccessNext3: '3. Wir vereinbaren ein kurzes Online-Gespräch mit Ihrer Schulleitung.',
    formAnotherBtn: 'Weitere Anmeldung Einreichen',

    faqBadge: 'Fragen & Antworten',
    faqTitle: 'Häufig Gestellte Fragen von Schulen',
    faq1Q: 'Welcher Betreuungsschlüssel wird verlangt?',
    faq1A:
      'Wir halten uns an strenge internationale Schulstandards mit einem 1:10 Lehrer-zu-Schüler-Schlüssel und finanzieren 1 Freiplatz je 10 Schüler.',
    faq2Q: 'Sind die Reisedaten und Inhalte flexibel?',
    faq2A:
      'Ja. Alle drei Beispielreisen sind flexible Vorlagen und werden an Ihre Ferienzeiten und schulspezifischen Schwerpunkte angepasst.',
    faq3Q: 'Was passiert nach Absenden dieses Formulars?',
    faq3A:
      'Ein MB Learning Fachberater meldet sich innerhalb von 3–5 Werktagen mit einem Angebot und Sicherheitskonzept.',
    faq4Q: 'Wie werden Visa und Einreisebestimmungen gehandhabt?',
    faq4A:
      'Für Singapur und London stellen wir offizielle Einladungsschreiben, Checklisten und Gruppen-Botschaftstermine bereit.',

    footerDesc:
      'Erlebnisorientierte Bildungsreisen für zukunftsorientierte Schulen weltweit.',
    footerRights: 'Alle Rechte vorbehalten. MB Learning Global Educational Tours.',
    footerSampleTrips: 'Beispielprogramme',
    footerResources: 'Materialien für Lehrkräfte',
    footerSafety: 'Schülersicherheits-Charta',
    footerCurriculum: 'Lehrplananbindung',
    footerFAQ: 'Reise-FAQ',
    footerPrivacy: 'Datenschutz & AGB',
  },
};
