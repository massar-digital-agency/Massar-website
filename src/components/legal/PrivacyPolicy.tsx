import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingContact } from '@/components/layout/FloatingContact'
import { LegalLayout, LegalSection, LegalParagraph, LegalList } from './LegalLayout'
import { useEffect } from 'react'
import { SEO_CONFIG } from '@/lib/seo'

function PrivacySEO() {
  const { t } = useTranslation()
  const pp = t('legal.privacy', { returnObjects: true }) as Record<string, string>
  const canonical = `${SEO_CONFIG.siteUrl}/#/privacy`

  return (
    <Helmet prioritizeSeoTags>
      <title>{pp.title}</title>
      <meta name="description" content={pp.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={pp.ogTitle || pp.title} />
      <meta property="og:description" content={pp.ogDescription || pp.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta name="twitter:title" content={pp.ogTitle || pp.title} />
      <meta name="twitter:description" content={pp.ogDescription || pp.description} />
    </Helmet>
  )
}

function PrivacyContentEN() {
  return (
    <LegalLayout
      title="Privacy Policy"
      subtitle="How Massar Agency collects, uses, and protects your personal information."
      lastUpdated="Last updated: July 2026"
    >
      <LegalSection title="Introduction">
        <LegalParagraph>
          At <strong>Massar Agency</strong>, we place great importance on protecting your personal data. This privacy policy explains what information we collect, how we use it, and what your rights are as a user of our website and services (web development, app development, brand identity).
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="1.1 Data We Collect">
        <LegalParagraph>
          We may collect the following data when you use our site or contact us:
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>Identification data</strong>: first name, last name, email address, phone number',
            '<strong>Professional data</strong>: company name, industry, job title',
            '<strong>Browsing data</strong>: IP address, browser type, pages visited, visit duration (via cookies and analytics tools such as Google Analytics 4)',
            '<strong>Data submitted via contact or quote forms</strong>: project description, estimated budget, technical preferences',
          ]}
        />
      </LegalSection>

      <LegalSection title="1.2 Purposes of Collection">
        <LegalParagraph>
          We use your data to:
        </LegalParagraph>
        <LegalList
          items={[
            'Respond to your requests for quotes or information',
            'Provide commercial and technical follow-up on your projects',
            'Improve our website and user experience',
            'Send you communications about our services (with your consent)',
            'Comply with our legal and contractual obligations',
          ]}
        />
      </LegalSection>

      <LegalSection title="1.3 Legal Basis for Processing">
        <LegalParagraph>
          Processing of your data is based on:
        </LegalParagraph>
        <LegalList
          items={[
            'Your <strong>consent</strong> (forms, newsletter)',
            'The <strong>performance of a contract</strong> (service provision)',
            'Our <strong>legitimate interest</strong> (improving our services, site security)',
          ]}
        />
      </LegalSection>

      <LegalSection title="1.4 Data Sharing">
        <LegalParagraph>
          Massar Agency does not sell or rent your personal data to third parties. Your data may only be shared with our technical service providers (hosting, analytics tools) under a contractual confidentiality obligation, or with competent authorities where required by law.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="1.5 Retention Period">
        <LegalParagraph>
          Your data is retained for:
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>3 years</strong> after the last contact for prospects',
            '<strong>Duration of the contractual relationship + 5 years</strong> for clients (accounting and legal obligations)',
            '<strong>13 months maximum</strong> for analytics cookies',
          ]}
        />
      </LegalSection>

      <LegalSection title="1.6 Your Rights">
        <LegalParagraph>
          In accordance with Algerian legislation on the protection of personal data (Law No. 18-07), you have the following rights:
        </LegalParagraph>
        <LegalList
          items={[
            'Right of access to your data',
            'Right to rectification',
            'Right to erasure ("right to be forgotten")',
            'Right to object to processing',
            'Right to data portability',
          ]}
        />
        <LegalParagraph>
          To exercise these rights, contact us at: <strong>contact@massaragency.com</strong>
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="1.7 Security">
        <LegalParagraph>
          We implement appropriate technical and organizational measures (encryption, restricted access, backups) to protect your data against unauthorized access, loss, or disclosure.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="1.8 Contact">
        <LegalParagraph>
          For any questions regarding this privacy policy, you can contact us via our <strong>Contact</strong> page or by email.
        </LegalParagraph>
      </LegalSection>
    </LegalLayout>
  )
}

function PrivacyContentFR() {
  return (
    <LegalLayout
      title="Politique de Confidentialité"
      subtitle="Comment Massar Agency collecte, utilise et protège vos informations personnelles."
      lastUpdated="Dernière mise à jour : Juillet 2026"
    >
      <LegalSection title="Introduction">
        <LegalParagraph>
          Chez <strong>Massar Agency</strong>, nous accordons une grande importance à la protection de vos données personnelles. Cette politique de confidentialité explique quelles informations nous collectons, comment nous les utilisons, et quels sont vos droits en tant qu'utilisateur de notre site web et de nos services (développement web, développement d'applications, identité de marque).
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="1.1 Données que nous collectons">
        <LegalParagraph>
          Nous pouvons collecter les données suivantes lorsque vous utilisez notre site ou nous contactez :
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>Données d\'identification</strong> : nom, prénom, adresse e-mail, numéro de téléphone',
            '<strong>Données professionnelles</strong> : nom de l\'entreprise, secteur d\'activité, poste occupé',
            '<strong>Données de navigation</strong> : adresse IP, type de navigateur, pages visitées, durée de visite (via cookies et outils d\'analyse comme Google Analytics 4)',
            '<strong>Données transmises via formulaire de contact ou de devis</strong> : description de projet, budget estimé, préférences techniques',
          ]}
        />
      </LegalSection>

      <LegalSection title="1.2 Finalités de la collecte">
        <LegalParagraph>
          Nous utilisons vos données pour :
        </LegalParagraph>
        <LegalList
          items={[
            'Répondre à vos demandes de devis ou d\'information',
            'Assurer le suivi commercial et technique de vos projets',
            'Améliorer notre site web et l\'expérience utilisateur',
            'Vous envoyer des communications relatives à nos services (avec votre consentement)',
            'Respecter nos obligations légales et contractuelles',
          ]}
        />
      </LegalSection>

      <LegalSection title="1.3 Base légale du traitement">
        <LegalParagraph>
          Le traitement de vos données repose sur :
        </LegalParagraph>
        <LegalList
          items={[
            'Votre <strong>consentement</strong> (formulaires, newsletter)',
            'L\'<strong>exécution d\'un contrat</strong> (prestation de services)',
            'Notre <strong>intérêt légitime</strong> (amélioration de nos services, sécurité du site)',
          ]}
        />
      </LegalSection>

      <LegalSection title="1.4 Partage des données">
        <LegalParagraph>
          Massar Agency ne vend ni ne loue vos données personnelles à des tiers. Vos données peuvent être partagées uniquement avec nos prestataires techniques (hébergement, outils d'analyse), sous obligation contractuelle de confidentialité, ou avec les autorités compétentes, si la loi l'exige.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="1.5 Durée de conservation">
        <LegalParagraph>
          Vos données sont conservées :
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>3 ans</strong> après le dernier contact pour les prospects',
            '<strong>Durée de la relation contractuelle + 5 ans</strong> pour les clients (obligations comptables et légales)',
            '<strong>13 mois maximum</strong> pour les cookies analytiques',
          ]}
        />
      </LegalSection>

      <LegalSection title="1.6 Vos droits">
        <LegalParagraph>
          Conformément à la législation algérienne relative à la protection des données à caractère personnel (Loi n° 18-07), vous disposez des droits suivants :
        </LegalParagraph>
        <LegalList
          items={[
            'Droit d\'accès à vos données',
            'Droit de rectification',
            'Droit de suppression (« droit à l\'oubli »)',
            'Droit d\'opposition au traitement',
            'Droit à la portabilité de vos données',
          ]}
        />
        <LegalParagraph>
          Pour exercer ces droits, contactez-nous à : <strong>contact@massaragency.com</strong>
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="1.7 Sécurité">
        <LegalParagraph>
          Nous mettons en œuvre des mesures techniques et organisationnelles appropriées (chiffrement, accès restreint, sauvegardes) pour protéger vos données contre tout accès non autorisé, perte ou divulgation.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="1.8 Contact">
        <LegalParagraph>
          Pour toute question relative à cette politique de confidentialité, vous pouvez nous contacter via notre page <strong>Contact</strong> ou par e-mail.
        </LegalParagraph>
      </LegalSection>
    </LegalLayout>
  )
}

function PrivacyContentAR() {
  return (
    <LegalLayout
      title="سياسة الخصوصية"
      subtitle="كيف تقوم Massar Agency بجمع واستخدام وحماية معلوماتك الشخصية."
      lastUpdated="آخر تحديث: يوليو 2026"
    >
      <LegalSection title="مقدمة">
        <LegalParagraph>
          في <strong>Massar Agency</strong>، نولي أهمية كبيرة لحماية بياناتكم الشخصية. توضح سياسة الخصوصية هذه المعلومات التي نجمعها، وكيفية استخدامها، وحقوقكم كمستخدمين لموقعنا الإلكتروني وخدماتنا (تطوير المواقع، تطوير التطبيقات، الهوية البصرية).
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="1.1 البيانات التي نجمعها">
        <LegalParagraph>
          قد نقوم بجمع البيانات التالية عند استخدامكم لموقعنا أو تواصلكم معنا:
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>بيانات التعريف</strong>: الاسم، اللقب، البريد الإلكتروني، رقم الهاتف',
            '<strong>البيانات المهنية</strong>: اسم الشركة، مجال النشاط، المنصب الوظيفي',
            '<strong>بيانات التصفح</strong>: عنوان IP، نوع المتصفح، الصفحات التي تمت زيارتها، مدة الزيارة (عبر ملفات تعريف الارتباط وأدوات التحليل مثل Google Analytics 4)',
            '<strong>البيانات المُرسلة عبر نماذج الاتصال أو طلب العروض</strong>: وصف المشروع، الميزانية التقديرية، التفضيلات التقنية',
          ]}
        />
      </LegalSection>

      <LegalSection title="1.2 أغراض الجمع">
        <LegalParagraph>
          نستخدم بياناتكم من أجل:
        </LegalParagraph>
        <LegalList
          items={[
            'الرد على طلبات العروض أو المعلومات',
            'ضمان المتابعة التجارية والتقنية لمشاريعكم',
            'تحسين موقعنا الإلكتروني وتجربة المستخدم',
            'إرسال إشعارات تتعلق بخدماتنا (بموافقتكم)',
            'الامتثال لالتزاماتنا القانونية والتعاقدية',
          ]}
        />
      </LegalSection>

      <LegalSection title="1.3 الأساس القانوني للمعالجة">
        <LegalParagraph>
          تستند معالجة بياناتكم إلى:
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>موافقتكم</strong> (النماذج، النشرة الإخبارية)',
            '<strong>تنفيذ عقد</strong> (تقديم الخدمات)',
            '<strong>مصلحتنا المشروعة</strong> (تحسين خدماتنا، أمان الموقع)',
          ]}
        />
      </LegalSection>

      <LegalSection title="1.4 مشاركة البيانات">
        <LegalParagraph>
          لا تقوم Massar Agency ببيع أو تأجير بياناتكم الشخصية لأطراف ثالثة. يمكن مشاركة بياناتكم فقط مع مزوّدي الخدمات التقنية (الاستضافة، أدوات التحليل)، بموجب التزام تعاقدي بالسرية، أو مع السلطات المختصة، إذا اقتضى القانون ذلك.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="1.5 مدة الاحتفاظ">
        <LegalParagraph>
          يتم الاحتفاظ ببياناتكم لمدة:
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>3 سنوات</strong> بعد آخر تواصل بالنسبة للعملاء المحتملين',
            '<strong>مدة العلاقة التعاقدية + 5 سنوات</strong> بالنسبة للعملاء (الالتزامات المحاسبية والقانونية)',
            '<strong>13 شهرًا كحد أقصى</strong> بالنسبة لملفات تعريف الارتباط التحليلية',
          ]}
        />
      </LegalSection>

      <LegalSection title="1.6 حقوقكم">
        <LegalParagraph>
          وفقًا للتشريع الجزائري المتعلق بحماية المعطيات ذات الطابع الشخصي (القانون رقم 18-07)، لكم الحقوق التالية:
        </LegalParagraph>
        <LegalList
          items={[
            'الحق في الوصول إلى بياناتكم',
            'الحق في التصحيح',
            'الحق في الحذف ("الحق في النسيان")',
            'الحق في الاعتراض على المعالجة',
            'الحق في نقل بياناتكم',
          ]}
        />
        <LegalParagraph>
          لممارسة هذه الحقوق، يمكنكم التواصل معنا عبر: <strong>contact@massaragency.com</strong>
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="1.7 الأمان">
        <LegalParagraph>
          نطبّق تدابير تقنية وتنظيمية مناسبة (التشفير، تقييد الوصول، النسخ الاحتياطي) لحماية بياناتكم من أي وصول غير مصرح به أو فقدان أو إفصاح.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="1.8 التواصل">
        <LegalParagraph>
          لأي استفسار بخصوص سياسة الخصوصية هذه، يمكنكم التواصل معنا عبر صفحة <strong>اتصل بنا</strong> أو عبر البريد الإلكتروني.
        </LegalParagraph>
      </LegalSection>
    </LegalLayout>
  )
}

export function PrivacyPolicy() {
  const { i18n } = useTranslation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  const lang = i18n.language

  const content = {
    ar: <PrivacyContentAR />,
    fr: <PrivacyContentFR />,
    en: <PrivacyContentEN />,
  }[lang] || <PrivacyContentEN />

  return (
    <>
      <PrivacySEO />
      <Navbar />
      {content}
      <Footer />
      <FloatingContact />
    </>
  )
}
