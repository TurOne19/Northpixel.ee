export const brand = {
  name: "NorthPixel",
  tagline: "Fast websites for small business",
  phone: "+372 5541895",
  email: "info.northpixel@gmail.com",
  location: "Tallinn, Estonia",
};

export type Lang = "en" | "ru" | "et";

export interface LocaleContent {
  nav: { services: string; work: string; pricing: string; faq: string; contact: string };
  hero: { badge: string; title: string; subtitle: string; ctaPrimary: string; ctaSecondary: string; trustBullets: string[] };
  sections: {
    problem: { title: string; subtitle: string; items: { icon: string; title: string; description: string }[] };
    solution: { title: string; subtitle: string; items: { icon: string; title: string; description: string }[] };
    services: { title: string; subtitle: string; items: { icon: string; name: string; description: string }[] };
    processSteps: { title: string; subtitle: string; items: { step: string; name: string; description: string }[] };
    projects: { title: string; subtitle: string; items: { title: string; industry: string; result: string; tags: string[]; link: string }[] };
    pricingPlans: { title: string; subtitle: string; items: { name: string; price: string; duration: string; featured: boolean; features: string[] }[] };
    faq: { title: string; subtitle: string; items: { question: string; answer: string }[] };
    contact: { title: string; subtitle: string; namePlaceholder: string; emailPlaceholder: string; phonePlaceholder: string; messagePlaceholder: string; submitButton: string; successMessage: string; errorMessage: string };
  };
  footer: { rights: string; privacy: string; terms: string; cookies: string };
  meta: { title: string; description: string };
}

export const locales: Record<Lang, LocaleContent> = {
  en: {
    nav: { services: "Services", work: "Work", pricing: "Pricing", faq: "FAQ", contact: "Get a Quote" },
    hero: {
      badge: "Tallinn-based web studio",
      title: "Fast Websites\nfor Small\nBusiness",
      subtitle: "Professional landing pages and business websites delivered in days, not months. Simple pricing, clear timelines, guaranteed results.",
      ctaPrimary: "Get a Quote",
      ctaSecondary: "See Our Work",
      trustBullets: ["3–14 Days Delivery", "Fixed Price", "100% Satisfaction"],
    },
    sections: {
      problem: {
        title: "The Problem with Most Web Agencies",
        subtitle: "Traditional web development is slow, expensive, and unpredictable.",
        items: [
          { icon: "⏳", title: "Months of Waiting", description: "Most agencies take 2–6 months to deliver a simple website." },
          { icon: "💸", title: "Hidden Costs", description: "Prices balloon with endless revisions and additional features." },
          { icon: "🤷", title: "No Clear Timeline", description: "Launch dates keep getting pushed back with vague excuses." },
        ],
      },
      solution: {
        title: "Our Solution: Fast, Fixed-Price Websites",
        subtitle: "We deliver professional websites in days with transparent pricing and guaranteed deadlines.",
        items: [
          { icon: "⚡", title: "Lightning Fast", description: "Get your website live in 3–14 days. Not months. Not weeks. Days." },
          { icon: "💎", title: "Fixed Pricing", description: "Know exactly what you'll pay upfront. No surprises, no hidden fees." },
          { icon: "🎯", title: "Guaranteed Deadline", description: "We commit to a delivery date and stick to it. Every single time." },
        ],
      },
      services: {
        title: "What We Build",
        subtitle: "Tailored solutions for every business need.",
        items: [
          { icon: "📄", name: "Landing Pages", description: "High-converting single-page sites perfect for campaigns, products, or services. Delivered in 3–5 days." },
          { icon: "🏢", name: "Business Websites", description: "Professional multi-page websites with contact forms, portfolios, and service pages. Ready in 7–10 days." },
          { icon: "🎨", name: "Website Redesign", description: "Refresh your existing website with modern design and better performance. Completed in 5–7 days." },
          { icon: "🔍", name: "SEO Basics", description: "Essential optimization to help customers find you on Google. On-page SEO and technical improvements." },
          { icon: "🔌", name: "Integrations", description: "Connect your website with booking systems, CRMs, payment gateways, and email marketing tools." },
        ],
      },
      processSteps: {
        title: "How It Works",
        subtitle: "Simple, transparent process from first call to launch.",
        items: [
          { step: "01", name: "Discovery", description: "30-minute call to understand your business, goals, and target audience." },
          { step: "02", name: "Design", description: "We create mockups based on proven templates and your brand guidelines." },
          { step: "03", name: "Build", description: "Development with daily progress updates and access to staging environment." },
          { step: "04", name: "Launch", description: "Go live with full documentation, training, and post-launch support." },
        ],
      },
      projects: {
        title: "Our Work",
        subtitle: "Real websites. Real results. Real businesses.",
        items: [
          { title: "ManuFarm", industry: "Metal", result: "Modern landing page with product catalog. Delivered in 5 days.", tags: ["Landing Page", "E-commerce"], link: "https://www.manufarm.ee" },
          { title: "Florista", industry: "Flowers", result: "Professional business website with service pages and blog. 8-day delivery.", tags: ["Business Site", "Consulting"], link: "https://flower-shop-simple.vercel.app" },
          { title: "Aquapark H2O", industry: "Aquapark", result: "E-commerce store with payment integration. Launched in 12 days.", tags: ["E-commerce", "Retail"], link: "https://aquapark-ee.vercel.app" },
          { title: "Julia Petrov", industry: "Nutrition", result: "Personal brand site for a nutritionist with admin panel, reviews system and multilingual support. Delivered in 10 days.", tags: ["Personal Brand", "Multilingual"], link: "https://nutritsiolog-2.vercel.app" },
        ],
      },
      pricingPlans: {
        title: "Simple, Transparent Pricing",
        subtitle: "No surprises. No hidden fees. Just great websites.",
        items: [
          {
            name: "Starter", price: "from €490", duration: "3–5 days", featured: false,
            features: ["Single-page landing page", "Mobile-responsive design", "Contact form integration", "Basic SEO optimization", "1 year hosting included", "SSL certificate", "One round of revisions"],
          },
          {
            name: "Business", price: "from €1,290", duration: "7–10 days", featured: true,
            features: ["Multi-page website (up to 5 pages)", "Custom design tailored to your brand", "Contact forms & CTAs", "Advanced SEO optimization", "Google Analytics integration", "1 year hosting & SSL", "Admin panel for content updates", "Two rounds of revisions"],
          },
          {
            name: "Pro", price: "from €2,490", duration: "10–14 days", featured: false,
            features: ["Multi-page website (up to 10 pages)", "E-commerce integration", "Payment gateway setup", "Blog system with CMS", "Email marketing integration", "Advanced analytics & tracking", "Priority support for 3 months", "Full admin panel", "Three rounds of revisions"],
          },
          {
            name: "Custom", price: "Let's talk", duration: "Flexible", featured: false,
            features: ["Tailored to your specific needs", "Complex integrations", "Custom functionality", "Ongoing support & maintenance", "Dedicated project manager", "We'll create a custom proposal"],
          },
        ],
      },
      faq: {
        title: "Frequently Asked Questions",
        subtitle: "Everything you need to know before getting started.",
        items: [
          { question: "How can you deliver websites so fast?", answer: "We use proven frameworks, pre-built components, and streamlined processes. Instead of reinventing the wheel for each project, we focus on customizing battle-tested solutions to your specific needs." },
          { question: "Do I own the website after it's delivered?", answer: "Yes, 100%. You own all the code, content, and design. We'll provide full access to everything along with documentation on how to make updates yourself." },
          { question: "What if I need changes after the website is launched?", answer: "Each package includes one or more rounds of revisions before launch. After launch, we offer support packages starting at €99/month for minor updates and maintenance." },
          { question: "Can you build custom features and functionality?", answer: "Absolutely. For standard business needs like contact forms, booking systems, or payment integration, we can handle it within our packages. For highly custom applications, we'll provide a custom quote." },
          { question: "What about hosting and domain registration?", answer: "We can handle everything or work with your existing hosting provider. All packages include 1 year of hosting. Domain registration is additional (typically €10–15/year)." },
          { question: "Do you provide ongoing support and maintenance?", answer: "Yes. We offer support packages starting at €99/month which include minor content updates, security patches, performance monitoring, and priority support." },
          { question: "What if I'm not happy with the result?", answer: "We work closely with you throughout the process to ensure you're happy with every step. We've never had a client we couldn't satisfy, but if something isn't working, we'll make it right." },
          { question: "Can you help with content and copywriting?", answer: "Yes! While we expect you to provide key information about your business, we can help polish the copy and ensure it's clear, professional, and conversion-focused." },
        ],
      },
      contact: {
        title: "Let's Build Your Website",
        subtitle: "Tell us about your project and we'll get back to you within 24 hours.",
        namePlaceholder: "Your name",
        emailPlaceholder: "Your email",
        phonePlaceholder: "Phone (optional)",
        messagePlaceholder: "Tell us about your project…",
        submitButton: "Send Request",
        successMessage: "Thank you! We'll be in touch within 24 hours.",
        errorMessage: "Something went wrong. Please try again or email us directly.",
      },
    },
    footer: { rights: "All rights reserved.", privacy: "Privacy Policy", terms: "Terms of Service", cookies: "Cookie Policy" },
    meta: {
      title: "NorthPixel — Fast Websites for Small Business | Tallinn",
      description: "Professional landing pages and business websites delivered in 3–14 days. Fixed price, guaranteed deadline. Based in Tallinn, Estonia.",
    },
  },
  ru: {
    nav: { services: "Услуги", work: "Работы", pricing: "Цены", faq: "FAQ", contact: "Получить предложение" },
    hero: {
      badge: "Веб-студия из Таллина",
      title: "Быстрые сайты\nдля малого\nбизнеса",
      subtitle: "Профессиональные лендинги и бизнес-сайты за дни, а не месяцы. Простые цены, понятные сроки, гарантированный результат.",
      ctaPrimary: "Получить предложение",
      ctaSecondary: "Посмотреть работы",
      trustBullets: ["Доставка 3–14 дней", "Фиксированная цена", "100% удовлетворённость"],
    },
    sections: {
      problem: {
        title: "Проблема большинства веб-агентств",
        subtitle: "Традиционная разработка медленная, дорогая и непредсказуемая.",
        items: [
          { icon: "⏳", title: "Месяцы ожидания", description: "Большинство агентств делают простой сайт 2–6 месяцев." },
          { icon: "💸", title: "Скрытые расходы", description: "Цена растёт из-за бесконечных правок и «дополнительных функций»." },
          { icon: "🤷", title: "Нет чётких сроков", description: "Дата запуска постоянно переносится с расплывчатыми объяснениями." },
        ],
      },
      solution: {
        title: "Наше решение: быстрые сайты с фиксированной ценой",
        subtitle: "Делаем профессиональные сайты за дни с прозрачной ценой и гарантированными сроками.",
        items: [
          { icon: "⚡", title: "Молниеносно", description: "Сайт будет онлайн за 3–14 дней. Не месяцев. Не недель. Дней." },
          { icon: "💎", title: "Фиксированная цена", description: "Вы заранее знаете сумму. Без сюрпризов и скрытых платежей." },
          { icon: "🎯", title: "Гарантированный срок", description: "Мы фиксируем дату сдачи и соблюдаем её. Всегда." },
        ],
      },
      services: {
        title: "Что мы делаем",
        subtitle: "Индивидуальные решения для любого бизнеса.",
        items: [
          { icon: "📄", name: "Лендинги", description: "Конверсионные одностраничные сайты для кампаний, продуктов или услуг. Готово за 3–5 дней." },
          { icon: "🏢", name: "Бизнес-сайты", description: "Профессиональные многостраничные сайты с формами, портфолио и страницами услуг. Готово за 7–10 дней." },
          { icon: "🎨", name: "Редизайн сайта", description: "Обновим ваш сайт с современным дизайном и улучшенной производительностью. Готово за 5–7 дней." },
          { icon: "🔍", name: "Базовое SEO", description: "Необходимая оптимизация, чтобы клиенты находили вас в Google. On-page SEO и технические улучшения." },
          { icon: "🔌", name: "Интеграции", description: "Подключим сайт к системам бронирования, CRM, платёжным шлюзам и инструментам email-маркетинга." },
        ],
      },
      processSteps: {
        title: "Как это работает",
        subtitle: "Простой и прозрачный процесс от первого звонка до запуска.",
        items: [
          { step: "01", name: "Анализ", description: "30-минутный созвон, чтобы понять ваш бизнес, цели и аудиторию." },
          { step: "02", name: "Дизайн", description: "Создаём макеты на основе проверенных шаблонов и ваших брендовых материалов." },
          { step: "03", name: "Разработка", description: "Разработка с ежедневными обновлениями прогресса и доступом к тестовой версии." },
          { step: "04", name: "Запуск", description: "Выход в онлайн с полной документацией, обучением и поддержкой после запуска." },
        ],
      },
      projects: {
        title: "Наши работы",
        subtitle: "Реальные сайты. Реальные результаты. Реальный бизнес.",
        items: [
          { title: "ManuFarm", industry: "Металл", result: "Современный лендинг с каталогом продукции. Сдан за 5 дней.", tags: ["Лендинг", "E-commerce"], link: "https://www.manufarm.ee" },
          { title: "Florista", industry: "Цветы", result: "Профессиональный бизнес-сайт со страницами услуг и блогом. Сдан за 8 дней.", tags: ["Бизнес-сайт", "Консалтинг"], link: "https://flower-shop-simple.vercel.app" },
          { title: "Aquapark H2O", industry: "Аквапарк", result: "Интернет-магазин с интеграцией оплаты. Запущен за 12 дней.", tags: ["E-commerce", "Ритейл"], link: "https://aquapark-ee.vercel.app" },
          { title: "Юлия Петров", industry: "Нутрициология", result: "Сайт личного бренда нутрициолога с админкой, системой отзывов и мультиязычностью. Сдан за 10 дней.", tags: ["Личный бренд", "Мультиязычный"], link: "https://nutritsiolog-2.vercel.app" },
        ],
      },
      pricingPlans: {
        title: "Простые и прозрачные цены",
        subtitle: "Никаких сюрпризов. Никаких скрытых платежей. Только отличные сайты.",
        items: [
          { name: "Старт", price: "от €490", duration: "3–5 дней", featured: false, features: ["Одностраничный лендинг", "Мобильный дизайн", "Интеграция формы обратной связи", "Базовая SEO-оптимизация", "Хостинг на 1 год включён", "SSL-сертификат", "Один раунд правок"] },
          { name: "Бизнес", price: "от €1 290", duration: "7–10 дней", featured: true, features: ["Многостраничный сайт (до 5 страниц)", "Индивидуальный дизайн под ваш бренд", "Формы обратной связи и CTA", "Продвинутая SEO-оптимизация", "Интеграция Google Analytics", "Хостинг и SSL на 1 год", "Панель администратора", "Два раунда правок"] },
          { name: "Про", price: "от €2 490", duration: "10–14 дней", featured: false, features: ["Многостраничный сайт (до 10 страниц)", "Интеграция интернет-магазина", "Настройка платёжного шлюза", "Блог с CMS", "Интеграция email-маркетинга", "Продвинутая аналитика", "Приоритетная поддержка 3 месяца", "Полная панель администратора", "Три раунда правок"] },
          { name: "Индивидуально", price: "Обсудим", duration: "Гибко", featured: false, features: ["Под ваши конкретные нужды", "Сложные интеграции", "Нестандартный функционал", "Постоянная поддержка и обслуживание", "Выделенный менеджер проекта", "Создадим индивидуальное предложение"] },
        ],
      },
      faq: {
        title: "Часто задаваемые вопросы",
        subtitle: "Всё, что нужно знать перед началом работы.",
        items: [
          { question: "Как вы делаете сайты так быстро?", answer: "Мы используем проверенные фреймворки, готовые компоненты и отлаженные процессы. Вместо того чтобы изобретать велосипед, мы адаптируем проверенные решения под ваши нужды." },
          { question: "Я буду владеть сайтом после сдачи?", answer: "Да, на 100%. Вы владеете всем кодом, контентом и дизайном. Мы предоставим полный доступ ко всему вместе с документацией по самостоятельным обновлениям." },
          { question: "Что если мне понадобятся изменения после запуска?", answer: "Каждый пакет включает один или несколько раундов правок до запуска. После запуска мы предлагаем пакеты поддержки от €99/месяц." },
          { question: "Вы можете сделать нестандартные функции?", answer: "Конечно. Для стандартных нужд, таких как формы, системы бронирования или оплаты, мы справимся в рамках наших пакетов. Для сложных систем предоставим индивидуальное предложение." },
          { question: "Что с хостингом и регистрацией домена?", answer: "Мы можем взять на себя всё или работать с вашим существующим провайдером. Все пакеты включают хостинг на 1 год. Регистрация домена — дополнительно (обычно €10–15/год)." },
          { question: "Вы предоставляете поддержку и обслуживание?", answer: "Да. Мы предлагаем пакеты поддержки от €99/месяц, включающие минорные обновления контента, патчи безопасности, мониторинг производительности и приоритетную поддержку." },
          { question: "А если мне не понравится результат?", answer: "Мы тесно сотрудничаем с вами на каждом этапе. Каждый пакет включает раунды правок. Мы никогда не оставим клиента недовольным." },
          { question: "Вы помогаете с контентом и копирайтингом?", answer: "Да! Мы можем доработать тексты и сделать их понятными, профессиональными и ориентированными на конверсию." },
        ],
      },
      contact: {
        title: "Давайте создадим ваш сайт",
        subtitle: "Расскажите о своём проекте, и мы свяжемся с вами в течение 24 часов.",
        namePlaceholder: "Ваше имя",
        emailPlaceholder: "Ваш email",
        phonePlaceholder: "Телефон (необязательно)",
        messagePlaceholder: "Расскажите о вашем проекте…",
        submitButton: "Отправить заявку",
        successMessage: "Спасибо! Мы свяжемся с вами в течение 24 часов.",
        errorMessage: "Что-то пошло не так. Пожалуйста, попробуйте ещё раз или напишите нам напрямую.",
      },
    },
    footer: { rights: "Все права защищены.", privacy: "Политика конфиденциальности", terms: "Условия использования", cookies: "Политика cookies" },
    meta: {
      title: "NorthPixel — Быстрые сайты для малого бизнеса | Таллин",
      description: "Профессиональные лендинги и бизнес-сайты за 3–14 дней. Фиксированная цена, гарантированный срок. Таллин, Эстония.",
    },
  },
  et: {
    nav: { services: "Teenused", work: "Tööd", pricing: "Hinnad", faq: "KKK", contact: "Küsi pakkumist" },
    hero: {
      badge: "Tallinna veebistuudio",
      title: "Kiired veebilehed\nväikeettevõtetele",
      subtitle: "Professionaalsed maandumislehed ja äriveebilehed päevadega, mitte kuudega. Lihtsad hinnad, selged tähtajad, garanteeritud tulemused.",
      ctaPrimary: "Küsi pakkumist",
      ctaSecondary: "Vaata töid",
      trustBullets: ["3–14 päeva tarneaeg", "Fikseeritud hind", "100% rahulolu"],
    },
    sections: {
      problem: {
        title: "Enamiku veebiagentuuri probleem",
        subtitle: "Traditsiooniline veebiarendus on aeglane, kallis ja ettearvamatu.",
        items: [
          { icon: "⏳", title: "Kuud ootamist", description: "Enamik agentuure kulutab lihtsa veebilehe loomisele 2–6 kuud." },
          { icon: "💸", title: "Peidetud kulud", description: "Hinnad kasvavad lõputute muudatuste ja lisafunktsioonide tõttu." },
          { icon: "🤷", title: "Selge tähtaeg puudub", description: "Käivitamiskuupäevad lükkuvad pidevalt edasi ebamääraste põhjenduste tõttu." },
        ],
      },
      solution: {
        title: "Meie lahendus: kiired fikseeritud hinnaga veebilehed",
        subtitle: "Loome professionaalseid veebilehti päevadega läbipaistvate hindade ja garanteeritud tähtaegadega.",
        items: [
          { icon: "⚡", title: "Välkkiire", description: "Teie veebileht on veebis 3–14 päevaga. Mitte kuude, mitte nädalatega. Päevadega." },
          { icon: "💎", title: "Fikseeritud hind", description: "Teate täpselt, mida maksate. Üllatusi ega peidetud tasusid ei ole." },
          { icon: "🎯", title: "Garanteeritud tähtaeg", description: "Me kohustume tarnekuupäevaga ja peame sellest kinni. Alati." },
        ],
      },
      services: {
        title: "Mida me loome",
        subtitle: "Kohandatud lahendused igale ärivajadusele.",
        items: [
          { icon: "📄", name: "Maandumislehed", description: "Kõrge konversiooniga üheleheküljed kampaaniate, toodete või teenuste jaoks. Valmis 3–5 päevaga." },
          { icon: "🏢", name: "Äriveebilehed", description: "Professionaalsed mitme leheküljega veebilehed kontaktvormide, portfoolio ja teenuselehekülgedega. Valmis 7–10 päevaga." },
          { icon: "🎨", name: "Veebilehe uuendus", description: "Värskendame teie olemasolevat veebilehte kaasaegse kujunduse ja parema jõudlusega. Valmis 5–7 päevaga." },
          { icon: "🔍", name: "SEO põhitõed", description: "Hädavajalik optimeerimine, et kliendid leiaksid teid Googlist. On-page SEO ja tehnilised täiustused." },
          { icon: "🔌", name: "Integratsioonid", description: "Ühendame teie veebilehe broneerimissüsteemide, CRM-ide, makselüüside ja e-posti turundustööriistadega." },
        ],
      },
      processSteps: {
        title: "Kuidas see toimib",
        subtitle: "Lihtne ja läbipaistev protsess esimesest kõnest käivitamiseni.",
        items: [
          { step: "01", name: "Eelanalüüs", description: "30-minutiline kõne, et mõista teie äri, eesmärke ja sihtrühma." },
          { step: "02", name: "Kujundus", description: "Loome makettide alusel tõestatud mallidele ja teie brändijuhistele." },
          { step: "03", name: "Arendus", description: "Arendus igapäevaste edenemisvärskendustega ja juurdepääsuga testimiskeskkonnale." },
          { step: "04", name: "Käivitamine", description: "Minge veebis ellu täieliku dokumentatsiooni, koolituse ja käivitusjärgse toega." },
        ],
      },
      projects: {
        title: "Meie tööd",
        subtitle: "Päris veebilehed. Päris tulemused. Päris ettevõtted.",
        items: [
          { title: "ManuFarm", industry: "Metall", result: "Kaasaegne maandumisleht tootekataloogiga. Tarnitud 5 päevaga.", tags: ["Maandumisleht", "E-kaubandus"], link: "https://www.manufarm.ee" },
          { title: "Florista", industry: "Lilled", result: "Professionaalne äriveebileht teenuselehtede ja blogiga. 8-päevane tarnimine.", tags: ["Äriveebileht", "Konsultatsioon"], link: "https://flower-shop-simple.vercel.app" },
          { title: "Aquapark H2O", industry: "Veekeskus", result: "E-pood makse integratsiooniga. Käivitatud 12 päevaga.", tags: ["E-kaubandus", "Jaekaubandus"], link: "https://aquapark-ee.vercel.app" },
          { title: "Julia Petrov", industry: "Toitumine", result: "Isikliku brändi sait toitumisnõustajale adminpaneeliga, arvustuste süsteemiga ja mitmekeelsusega. Tarnitud 10 päevaga.", tags: ["Isiklik bränd", "Mitmekeelne"], link: "https://nutritsiolog-2.vercel.app" },
        ],
      },
      pricingPlans: {
        title: "Lihtsad ja läbipaistvad hinnad",
        subtitle: "Üllatusi ei ole. Peidetud tasusid ei ole. Ainult suurepärased veebilehed.",
        items: [
          { name: "Start", price: "alates €490", duration: "3–5 päeva", featured: false, features: ["Üheleheküljeline maandumisleht", "Mobiilisõbralik kujundus", "Kontaktvormi integratsioon", "Põhiline SEO optimeerimine", "1 aasta hostimine kaasas", "SSL-sertifikaat", "Üks muudatusring"] },
          { name: "Äri", price: "alates €1 290", duration: "7–10 päeva", featured: true, features: ["Mitme leheküljeline veebileht (kuni 5 lehekülge)", "Kohandatud kujundus teie brändile", "Kontaktvormid ja CTA-d", "Täiustatud SEO optimeerimine", "Google Analytics integratsioon", "1 aasta hostimine ja SSL", "Administraatori paneel", "Kaks muudatusringi"] },
          { name: "Pro", price: "alates €2 490", duration: "10–14 päeva", featured: false, features: ["Mitme leheküljeline veebileht (kuni 10 lehekülge)", "E-kaubanduse integratsioon", "Makselüüsi seadistamine", "Blogiisüsteem koos CMS-iga", "E-posti turunduse integratsioon", "Täiustatud analüütika", "Prioriteetne tugi 3 kuud", "Täielik administraatori paneel", "Kolm muudatusringi"] },
          { name: "Kohandatud", price: "Räägime", duration: "Paindlik", featured: false, features: ["Kohandatud teie vajadustele", "Keerulised integratsioonid", "Kohandatud funktsionaalsus", "Pidev tugi ja hooldus", "Pühendatud projektijuht", "Koostame kohandatud pakkumise"] },
        ],
      },
      faq: {
        title: "Korduma kippuvad küsimused",
        subtitle: "Kõik, mida peate teadma enne alustamist.",
        items: [
          { question: "Kuidas te saate veebilehti nii kiiresti valmis?", answer: "Kasutame tõestatud raamistikke, eelnevalt loodud komponente ja lihtsustatud protsesse. Selle asemel et iga projekti jaoks ratast uuesti leiutada, kohandame tõestatud lahendused teie vajadustele." },
          { question: "Kas ma oman veebilehte pärast tarnimist?", answer: "Jah, 100%. Te omate kogu koodi, sisu ja kujundust. Anname täieliku juurdepääsu kõigele koos dokumentatsiooniga iseseisva uuendamise kohta." },
          { question: "Mis siis, kui vajan pärast käivitamist muudatusi?", answer: "Iga pakett sisaldab ühte või mitut muudatusringi enne käivitamist. Pärast käivitamist pakume tugipakette alates €99/kuus." },
          { question: "Kas saate luua kohandatud funktsioone?", answer: "Absoluutselt. Standardsete ärivajaduste jaoks nagu kontaktvormid, broneerimissüsteemid või maksete integratsioon saame hakkama meie pakettide raames." },
          { question: "Mis on hostimise ja domeeni registreerimisega?", answer: "Võime kõike ise korraldada või töötada teie olemasoleva hostingupakkujaga. Kõik paketid sisaldavad 1 aasta hostimist. Domeeni registreerimine on lisatasu (tavaliselt €10–15/aastas)." },
          { question: "Kas pakute pidevat tuge ja hooldust?", answer: "Jah. Pakume tugipakette alates €99/kuus, mis sisaldavad väiksemaid sisuvärskendusi, turbeparandusi, jõudluse jälgimist ja prioriteetset tuge." },
          { question: "Mis siis, kui ma ei ole tulemusega rahul?", answer: "Teeme teiega tihedat koostööd kogu protsessi vältel. Iga pakett sisaldab muudatusringe. Me pole kunagi jätnud klienti rahulolematuks." },
          { question: "Kas aitate sisu ja tekstikirjutamisega?", answer: "Jah! Kuigi eeldame, et esitate põhiinfo oma äri kohta, saame aidata tekste viimistleda ja tagada, et need on selged, professionaalsed ja konversioonisuunalised." },
        ],
      },
      contact: {
        title: "Loome teie veebilehe",
        subtitle: "Rääkige meile oma projektist ja võtame teiega ühendust 24 tunni jooksul.",
        namePlaceholder: "Teie nimi",
        emailPlaceholder: "Teie e-post",
        phonePlaceholder: "Telefon (valikuline)",
        messagePlaceholder: "Rääkige meile oma projektist…",
        submitButton: "Saada päring",
        successMessage: "Tänan! Võtame teiega ühendust 24 tunni jooksul.",
        errorMessage: "Midagi läks valesti. Palun proovige uuesti või kirjutage meile otse.",
      },
    },
    footer: { rights: "Kõik õigused kaitstud.", privacy: "Privaatsuspoliitika", terms: "Kasutustingimused", cookies: "Küpsiste poliitika" },
    meta: {
      title: "NorthPixel — Kiired veebilehed väikeettevõtetele | Tallinn",
      description: "Professionaalsed maandumislehed ja äriveebilehed 3–14 päevaga. Fikseeritud hind, garanteeritud tähtaeg. Tallinn, Eesti.",
    },
  },
};
