import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingContact } from '@/components/layout/FloatingContact'
import { LegalLayout, LegalSection, LegalParagraph, LegalList } from './LegalLayout'
import { useEffect } from 'react'
import { SEO_CONFIG } from '@/lib/seo'

function CookieSEO() {
  const { t } = useTranslation()
  const cp = t('legal.cookies', { returnObjects: true }) as Record<string, string>
  const canonical = `${SEO_CONFIG.siteUrl}/#/cookies`

  return (
    <Helmet prioritizeSeoTags>
      <title>{cp.title}</title>
      <meta name="description" content={cp.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={cp.ogTitle || cp.title} />
      <meta property="og:description" content={cp.ogDescription || cp.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta name="twitter:title" content={cp.ogTitle || cp.title} />
      <meta name="twitter:description" content={cp.ogDescription || cp.description} />
    </Helmet>
  )
}

function CookieContentEN() {
  return (
    <LegalLayout
      title="Cookie Policy"
      subtitle="How Massar Agency uses cookies and similar tracking technologies on our website."
      lastUpdated="Last updated: July 2026"
    >
      <LegalSection title="3.1 What Is a Cookie?">
        <LegalParagraph>
          A cookie is a small text file placed on your device (computer, tablet, smartphone) while browsing our site. It allows us to collect information related to your browsing and provide you with a personalized experience.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="3.2 Why Do We Use Cookies?">
        <LegalParagraph>
          Massar Agency uses cookies to:
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>Ensure the proper functioning of the site</strong> (essential cookies)',
            '<strong>Analyze audience and visitor behavior</strong> (Google Analytics 4, Core Web Vitals measurement)',
            '<strong>Remember your preferences</strong> (language, display settings)',
            '<strong>Improve our SEO and technical performance</strong>',
          ]}
        />
      </LegalSection>

      <LegalSection title="3.3 Types of Cookies Used">
        <LegalParagraph>
          The table below lists the types of cookies used on our website:
        </LegalParagraph>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13px] sm:text-[14px] border-collapse">
            <thead>
              <tr className="border-b border-[#E4E4E7]">
                <th className="text-start font-semibold text-[#0A0A0A] py-3 pr-4">Cookie Type</th>
                <th className="text-start font-semibold text-[#0A0A0A] py-3 pr-4">Purpose</th>
                <th className="text-start font-semibold text-[#0A0A0A] py-3">Retention Period</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7]">
              <tr>
                <td className="py-3 pr-4 text-[#52525B] font-medium">Essential cookies</td>
                <td className="py-3 pr-4 text-[#52525B]">Technical operation of the site (navigation, security)</td>
                <td className="py-3 text-[#52525B]">Session</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-[#52525B] font-medium">Analytics cookies</td>
                <td className="py-3 pr-4 text-[#52525B]">Traffic statistics, user behavior (GA4)</td>
                <td className="py-3 text-[#52525B]">Up to 13 months</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-[#52525B] font-medium">Preference cookies</td>
                <td className="py-3 pr-4 text-[#52525B]">Remembering your choices (language, display)</td>
                <td className="py-3 text-[#52525B]">Up to 12 months</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-[#52525B] font-medium">Third-party cookies</td>
                <td className="py-3 pr-4 text-[#52525B]">External integrations (social media, embedded videos)</td>
                <td className="py-3 text-[#52525B]">Varies by provider</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="3.4 Consent and Cookie Management">
        <LegalParagraph>
          On your first visit, a banner informs you of the use of cookies and allows you to:
        </LegalParagraph>
        <LegalList
          items={[
            'Accept all cookies',
            'Refuse non-essential cookies',
            'Customize your preferences by category',
          ]}
        />
        <LegalParagraph>
          You can change your preferences at any time via your browser settings or the cookie management module on our site.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="3.5 How to Disable Cookies via Your Browser">
        <LegalParagraph>
          You can manage or disable cookies through your browser settings:
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>Chrome</strong>: Settings &gt; Privacy and security &gt; Cookies',
            '<strong>Firefox</strong>: Settings &gt; Privacy &amp; Security',
            '<strong>Safari</strong>: Preferences &gt; Privacy',
            '<strong>Edge</strong>: Settings &gt; Cookies and site permissions',
          ]}
        />
        <LegalParagraph>
          Disabling certain cookies may affect the proper functioning of the site.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="3.6 Third-Party Cookies">
        <LegalParagraph>
          Some cookies come from third-party services integrated into our site (Google Analytics, social media). These third parties have their own privacy policies, which we encourage you to review.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="3.7 Policy Updates">
        <LegalParagraph>
          This cookie policy may be updated to reflect legal, technical, or practice changes. We encourage you to review it regularly.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="3.8 Contact">
        <LegalParagraph>
          For any questions regarding our use of cookies, contact us via our <strong>Contact</strong> page.
        </LegalParagraph>
      </LegalSection>
    </LegalLayout>
  )
}

function CookieContentFR() {
  return (
    <LegalLayout
      title="Politique de Cookies"
      subtitle="Comment Massar Agency utilise les cookies et technologies de suivi similaires."
      lastUpdated="Dernière mise à jour : Juillet 2026"
    >
      <LegalSection title="3.1 Qu'est-ce qu'un cookie ?">
        <LegalParagraph>
          Un cookie est un petit fichier texte déposé sur votre appareil (ordinateur, tablette, smartphone) lors de votre navigation sur notre site. Il permet de collecter des informations relatives à votre navigation et de vous offrir une expérience personnalisée.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="3.2 Pourquoi utilisons-nous des cookies ?">
        <LegalParagraph>
          Massar Agency utilise des cookies pour :
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>Assurer le bon fonctionnement du site</strong> (cookies essentiels)',
            '<strong>Analyser l\'audience et le comportement des visiteurs</strong> (Google Analytics 4, mesure des Core Web Vitals)',
            '<strong>Mémoriser vos préférences</strong> (langue, paramètres d\'affichage)',
            '<strong>Améliorer nos performances SEO et techniques</strong>',
          ]}
        />
      </LegalSection>

      <LegalSection title="3.3 Types de cookies utilisés">
        <LegalParagraph>
          Le tableau ci-dessous liste les types de cookies utilisés sur notre site :
        </LegalParagraph>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13px] sm:text-[14px] border-collapse">
            <thead>
              <tr className="border-b border-[#E4E4E7]">
                <th className="text-start font-semibold text-[#0A0A0A] py-3 pr-4">Type de cookie</th>
                <th className="text-start font-semibold text-[#0A0A0A] py-3 pr-4">Finalité</th>
                <th className="text-start font-semibold text-[#0A0A0A] py-3">Durée de conservation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7]">
              <tr>
                <td className="py-3 pr-4 text-[#52525B] font-medium">Cookies essentiels</td>
                <td className="py-3 pr-4 text-[#52525B]">Fonctionnement technique du site (navigation, sécurité)</td>
                <td className="py-3 text-[#52525B]">Session</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-[#52525B] font-medium">Cookies analytiques</td>
                <td className="py-3 pr-4 text-[#52525B]">Statistiques de fréquentation, comportement utilisateur (GA4)</td>
                <td className="py-3 text-[#52525B]">Jusqu'à 13 mois</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-[#52525B] font-medium">Cookies de préférence</td>
                <td className="py-3 pr-4 text-[#52525B]">Mémorisation de vos choix (langue, affichage)</td>
                <td className="py-3 text-[#52525B]">Jusqu'à 12 mois</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-[#52525B] font-medium">Cookies tiers</td>
                <td className="py-3 pr-4 text-[#52525B]">Intégrations externes (réseaux sociaux, vidéos embarquées)</td>
                <td className="py-3 text-[#52525B]">Variable selon le fournisseur</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="3.4 Consentement et gestion des cookies">
        <LegalParagraph>
          Lors de votre première visite, une bannière vous informe de l'utilisation de cookies et vous permet de :
        </LegalParagraph>
        <LegalList
          items={[
            'Accepter l\'ensemble des cookies',
            'Refuser les cookies non essentiels',
            'Personnaliser vos préférences par catégorie',
          ]}
        />
        <LegalParagraph>
          Vous pouvez à tout moment modifier vos préférences via les paramètres de votre navigateur ou le module de gestion des cookies présent sur notre site.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="3.5 Comment désactiver les cookies via votre navigateur">
        <LegalParagraph>
          Vous pouvez gérer ou désactiver les cookies via les paramètres de votre navigateur :
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>Chrome</strong> : Paramètres &gt; Confidentialité et sécurité &gt; Cookies',
            '<strong>Firefox</strong> : Paramètres &gt; Vie privée et sécurité',
            '<strong>Safari</strong> : Préférences &gt; Confidentialité',
            '<strong>Edge</strong> : Paramètres &gt; Cookies et autorisations de site',
          ]}
        />
        <LegalParagraph>
          La désactivation de certains cookies peut affecter le bon fonctionnement du site.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="3.6 Cookies tiers">
        <LegalParagraph>
          Certains cookies proviennent de services tiers intégrés à notre site (Google Analytics, réseaux sociaux). Ces tiers disposent de leur propre politique de confidentialité, que nous vous invitons à consulter.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="3.7 Mise à jour de la politique">
        <LegalParagraph>
          Cette politique des cookies peut être mise à jour pour refléter des évolutions légales, techniques ou liées à nos pratiques. Nous vous encourageons à la consulter régulièrement.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="3.8 Contact">
        <LegalParagraph>
          Pour toute question concernant notre utilisation des cookies, contactez-nous via notre page <strong>Contact</strong>.
        </LegalParagraph>
      </LegalSection>
    </LegalLayout>
  )
}

function CookieContentAR() {
  return (
    <LegalLayout
      title="سياسة ملفات تعريف الارتباط (الكوكيز)"
      subtitle="كيف تستخدم Massar Agency ملفات تعريف الارتباط وتقنيات التتبع المماثلة على موقعنا."
      lastUpdated="آخر تحديث: يوليو 2026"
    >
      <LegalSection title="3.1 ما هو ملف تعريف الارتباط؟">
        <LegalParagraph>
          ملف تعريف الارتباط (Cookie) هو ملف نصي صغير يُودع على جهازكم (حاسوب، لوحي، هاتف ذكي) أثناء تصفح موقعنا. يسمح بجمع معلومات متعلقة بتصفحكم وتقديم تجربة مخصصة لكم.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="3.2 لماذا نستخدم ملفات تعريف الارتباط؟">
        <LegalParagraph>
          تستخدم Massar Agency ملفات تعريف الارتباط من أجل:
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>ضمان حسن سير عمل الموقع</strong> (ملفات أساسية)',
            '<strong>تحليل الجمهور وسلوك الزوار</strong> (Google Analytics 4، قياس Core Web Vitals)',
            '<strong>حفظ تفضيلاتكم</strong> (اللغة، إعدادات العرض)',
            '<strong>تحسين أدائنا التقني ومحركات البحث</strong>',
          ]}
        />
      </LegalSection>

      <LegalSection title="3.3 أنواع ملفات تعريف الارتباط المستخدمة">
        <LegalParagraph>
          يوضح الجدول أدناه أنواع ملفات تعريف الارتباط المستخدمة على موقعنا:
        </LegalParagraph>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13px] sm:text-[14px] border-collapse">
            <thead>
              <tr className="border-b border-[#E4E4E7]">
                <th className="text-start font-semibold text-[#0A0A0A] py-3 pr-4">نوع الملف</th>
                <th className="text-start font-semibold text-[#0A0A0A] py-3 pr-4">الغرض</th>
                <th className="text-start font-semibold text-[#0A0A0A] py-3">مدة الاحتفاظ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7]">
              <tr>
                <td className="py-3 pr-4 text-[#52525B] font-medium">ملفات أساسية</td>
                <td className="py-3 pr-4 text-[#52525B]">التشغيل التقني للموقع (التصفح، الأمان)</td>
                <td className="py-3 text-[#52525B]">مدة الجلسة</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-[#52525B] font-medium">ملفات تحليلية</td>
                <td className="py-3 pr-4 text-[#52525B]">إحصائيات الزيارات، سلوك المستخدم (GA4)</td>
                <td className="py-3 text-[#52525B]">حتى 13 شهرًا</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-[#52525B] font-medium">ملفات التفضيلات</td>
                <td className="py-3 pr-4 text-[#52525B]">حفظ اختياراتكم (اللغة، العرض)</td>
                <td className="py-3 text-[#52525B]">حتى 12 شهرًا</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-[#52525B] font-medium">ملفات خارجية</td>
                <td className="py-3 pr-4 text-[#52525B]">تكاملات خارجية (شبكات اجتماعية، فيديوهات مضمّنة)</td>
                <td className="py-3 text-[#52525B]">تختلف حسب المزوّد</td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="3.4 الموافقة وإدارة ملفات تعريف الارتباط">
        <LegalParagraph>
          عند زيارتكم الأولى، يُعلمكم شريط إشعار باستخدام ملفات تعريف الارتباط ويتيح لكم:
        </LegalParagraph>
        <LegalList
          items={[
            'قبول جميع ملفات تعريف الارتباط',
            'رفض الملفات غير الأساسية',
            'تخصيص تفضيلاتكم حسب الفئة',
          ]}
        />
        <LegalParagraph>
          يمكنكم في أي وقت تعديل تفضيلاتكم عبر إعدادات متصفحكم أو وحدة إدارة ملفات تعريف الارتباط الموجودة في موقعنا.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="3.5 كيفية تعطيل ملفات تعريف الارتباط عبر متصفحكم">
        <LegalParagraph>
          يمكنكم إدارة أو تعطيل ملفات تعريف الارتباط عبر إعدادات متصفحكم:
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>Chrome</strong>: الإعدادات &gt; الخصوصية والأمان &gt; ملفات تعريف الارتباط',
            '<strong>Firefox</strong>: الإعدادات &gt; الخصوصية والأمان',
            '<strong>Safari</strong>: التفضيلات &gt; الخصوصية',
            '<strong>Edge</strong>: الإعدادات &gt; ملفات تعريف الارتباط وأذونات الموقع',
          ]}
        />
        <LegalParagraph>
          قد يؤثر تعطيل بعض ملفات تعريف الارتباط على حسن سير عمل الموقع.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="3.6 ملفات تعريف الارتباط الخارجية">
        <LegalParagraph>
          تأتي بعض ملفات تعريف الارتباط من خدمات خارجية مدمجة في موقعنا (Google Analytics، الشبكات الاجتماعية). تمتلك هذه الأطراف الخارجية سياسات خصوصية خاصة بها، وندعوكم للاطلاع عليها.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="3.7 تحديث السياسة">
        <LegalParagraph>
          يمكن تحديث سياسة ملفات تعريف الارتباط هذه لتعكس تطورات قانونية أو تقنية أو تتعلق بممارساتنا. نشجعكم على مراجعتها بانتظام.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="3.8 التواصل">
        <LegalParagraph>
          لأي استفسار بخصوص استخدامنا لملفات تعريف الارتباط، تواصلوا معنا عبر صفحة <strong>اتصل بنا</strong>.
        </LegalParagraph>
      </LegalSection>
    </LegalLayout>
  )
}

export function CookiePolicy() {
  const { i18n } = useTranslation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  const lang = i18n.language

  const content = {
    ar: <CookieContentAR />,
    fr: <CookieContentFR />,
    en: <CookieContentEN />,
  }[lang] || <CookieContentEN />

  return (
    <>
      <CookieSEO />
      <Navbar />
      {content}
      <Footer />
      <FloatingContact />
    </>
  )
}
