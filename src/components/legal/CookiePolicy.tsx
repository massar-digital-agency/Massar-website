import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingContact } from '@/components/layout/FloatingContact'
import { LegalLayout, LegalSection, LegalSubsection, LegalParagraph, LegalList, LegalNotice } from './LegalLayout'
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
      subtitle="How Massar Digital Studio uses cookies and similar tracking technologies on our website."
      lastUpdated="Last updated: [DATE — REVIEW AND UPDATE REGULARLY]"
    >
      <LegalNotice>
        <strong>Note:</strong> This Cookie Policy template contains placeholders marked with square brackets <strong>[ ]</strong>. These must be completed by the website owner with accurate information. This document is not legal advice. Consult a qualified legal professional for compliance with applicable laws, including the EU ePrivacy Directive and GDPR requirements on cookie consent.
      </LegalNotice>

      <LegalSection title="1. What Are Cookies">
        <LegalParagraph>
          Cookies are small text files that are placed on your device (computer, tablet, smartphone) when you visit a website. They are widely used to make websites work more efficiently, enhance user experience, and provide information to website owners. Cookies may be set by the website you visit ("first-party cookies") or by third-party services embedded in the website ("third-party cookies").
        </LegalParagraph>
        <LegalParagraph>
          Cookies can be "session cookies" (which expire when you close your browser) or "persistent cookies" (which remain on your device for a set period or until you delete them).
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2. Types of Cookies We Use">
        <LegalParagraph>
          We categorize the cookies used on our website as follows:
        </LegalParagraph>

        <LegalSubsection title="2.1 Essential Cookies (Strictly Necessary)">
          <LegalParagraph>
            These cookies are required for the basic operation of our website and cannot be disabled. They enable core functionality such as:
          </LegalParagraph>
          <LegalList
            items={[
              'Remembering your cookie consent preferences.',
              'Maintaining session security and integrity.',
              'Enabling basic page navigation and access to secure areas of the website.',
            ]}
          />
          <LegalParagraph>
            <strong>Examples:</strong> Cookie consent preference cookie (<code>massar_cookie_consent</code>), session management cookies.
          </LegalParagraph>
          <LegalParagraph>
            <strong>Legal basis:</strong> These cookies are exempt from consent requirements under applicable law as they are strictly necessary for the functioning of the website.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="2.2 Analytics Cookies">
          <LegalParagraph>
            These cookies help us understand how visitors interact with our website by collecting and reporting anonymous usage information. We use this data to:
          </LegalParagraph>
          <LegalList
            items={[
              'Count page visits and traffic sources.',
              'Understand which pages are most and least popular.',
              'Measure user behavior and navigation patterns.',
              'Identify and fix technical issues.',
              'Improve website performance and user experience.',
            ]}
          />
          <LegalParagraph>
            <strong>[ANALYTICS SERVICE NAME — e.g., Google Analytics, Plausible, Fathom. Include link to the service's privacy policy and cookie information.]</strong>
          </LegalParagraph>
          <LegalParagraph>
            <strong>Data collected:</strong> Anonymized IP address, browser type, device type, pages visited, time spent on pages, referring website, and similar usage metrics.
          </LegalParagraph>
          <LegalParagraph>
            <strong>Retention:</strong> Analytics data is retained for [RETENTION PERIOD — e.g., 26 months] before being anonymized or deleted.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="2.3 Functional Cookies">
          <LegalParagraph>
            These cookies enable enhanced functionality and personalization. They may be set by us or by third-party providers whose services we have added to our pages. They allow the website to:
          </LegalParagraph>
          <LegalList
            items={[
              'Remember your language preferences.',
              'Remember your region or location.',
              'Provide personalized content recommendations.',
            ]}
          />
          <LegalParagraph>
            <strong>[LIST ANY FUNCTIONAL COOKIES USED, INCLUDING THIRD-PARTY SERVICES.]</strong>
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="2.4 Marketing Cookies">
          <LegalParagraph>
            These cookies track your browsing habits across websites to build a profile of your interests and show you relevant advertisements. They are typically placed by third-party advertising networks with our permission.
          </LegalParagraph>
          <LegalList
            items={[
              'They remember that you have visited our website and may share this information with other organizations.',
              'They help us measure the effectiveness of our advertising campaigns.',
              'They limit the number of times you see an advertisement.',
            ]}
          />
          <LegalParagraph>
            <strong>[LIST ANY MARKETING COOKIES USED. IF NONE ARE CURRENTLY USED, STATE: "We do not currently use marketing cookies. If we add marketing cookies in the future, we will update this policy and seek your consent as required by law."]</strong>
          </LegalParagraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="3. Specific Cookies We Use">
        <LegalParagraph>
          The table below lists the specific cookies that may be set on our website:
        </LegalParagraph>
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13px] sm:text-[14px] border-collapse">
            <thead>
              <tr className="border-b border-[#E4E4E7]">
                <th className="text-start font-semibold text-[#0A0A0A] py-3 pr-4">Cookie Name</th>
                <th className="text-start font-semibold text-[#0A0A0A] py-3 pr-4">Category</th>
                <th className="text-start font-semibold text-[#0A0A0A] py-3 pr-4">Purpose</th>
                <th className="text-start font-semibold text-[#0A0A0A] py-3">Duration</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7]">
              <tr>
                <td className="py-3 pr-4 text-[#52525B]"><code>massar_cookie_consent</code></td>
                <td className="py-3 pr-4 text-[#52525B]">Essential</td>
                <td className="py-3 pr-4 text-[#52525B]">Stores your cookie consent preferences</td>
                <td className="py-3 text-[#52525B]">1 year</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-[#52525B]"><code>i18nextLng</code></td>
                <td className="py-3 pr-4 text-[#52525B]">Functional</td>
                <td className="py-3 pr-4 text-[#52525B]">Stores your language preference</td>
                <td className="py-3 text-[#52525B]">1 year</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-[#A1A1AA] italic" colSpan={4}>
                  [ADD ROWS FOR ANY OTHER COOKIES SET BY YOUR WEBSITE OR THIRD-PARTY SERVICES]
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="4. Third-Party Cookies">
        <LegalParagraph>
          Some cookies are placed by third-party services that we use on our website. These third parties may use cookies for their own purposes, which are governed by their respective privacy policies:
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>[ANALYTICS PROVIDER]</strong> — [LINK TO THEIR COOKIE POLICY]',
            '<strong>Calendly</strong> — Calendly may set cookies for scheduling functionality. See Calendly\'s privacy policy for details.',
            '<strong>Google Fonts</strong> — Google may log requests for font files as part of their operations. See Google\'s privacy policy for details.',
            '<strong>[ADDITIONAL THIRD-PARTY SERVICES — List any other services that set cookies.]</strong>',
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Cookie Consent and Your Choices">
        <LegalParagraph>
          When you first visit our website, we display a cookie consent banner that allows you to:
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>Accept All:</strong> Consent to all categories of cookies.',
            '<strong>Reject Non-Essential:</strong> Accept only essential/necessary cookies and reject all other categories.',
            '<strong>Manage Preferences:</strong> Select individual cookie categories to accept or reject.',
          ]}
        />
        <LegalParagraph>
          You can change your cookie preferences at any time by clicking the "[COOKIE PREFERENCES BUTTON LABEL]" link in the footer of our website. This will reopen the consent banner and allow you to update your choices.
        </LegalParagraph>
        <LegalParagraph>
          You can also manage cookies through your browser settings. Most browsers allow you to:
        </LegalParagraph>
        <LegalList
          items={[
            'View and delete cookies individually.',
            'Block cookies from specific websites.',
            'Block all cookies (which may affect website functionality).',
            'Enable "Do Not Track" signals.',
          ]}
        />
        <LegalParagraph>
          For instructions on managing cookies in your browser, visit the help pages of your specific browser:
        </LegalParagraph>
        <LegalList
          items={[
            '<a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer" class="text-[#8B5CF6] underline underline-offset-2 hover:text-[#7C3AED]">Google Chrome</a>',
            '<a href="https://support.mozilla.org/en-US/kb/enable-and-disable-cookies-website-preferences" target="_blank" rel="noopener noreferrer" class="text-[#8B5CF6] underline underline-offset-2 hover:text-[#7C3AED]">Mozilla Firefox</a>',
            '<a href="https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac" target="_blank" rel="noopener noreferrer" class="text-[#8B5CF6] underline underline-offset-2 hover:text-[#7C3AED]">Safari</a>',
            '<a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer" class="text-[#8B5CF6] underline underline-offset-2 hover:text-[#7C3AED]">Microsoft Edge</a>',
          ]}
        />
      </LegalSection>

      <LegalSection title="6. How We Obtain Consent">
        <LegalParagraph>
          We obtain your consent for non-essential cookies through our cookie consent banner, which appears on your first visit to our website. Your consent is stored in the <code>massar_cookie_consent</code> cookie for future reference. You can withdraw or modify your consent at any time as described in Section 5.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="7. Updates to This Policy">
        <LegalParagraph>
          We may update this Cookie Policy from time to time to reflect changes in the cookies we use, legal requirements, or operational needs. When we make material changes, we will update the "Last updated" date at the top of this policy and may display a notice on our website.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="8. Contact Us">
        <LegalParagraph>
          If you have any questions about our use of cookies, please contact us:
        </LegalParagraph>
        <LegalList
          items={[
            'Email: massar.digital.studio@gmail.com',
            'Phone: +213 699 284 128',
            'Location: Algeria',
            '[MAILING ADDRESS — Insert physical mailing address if applicable.]',
          ]}
        />
      </LegalSection>
    </LegalLayout>
  )
}

function CookieContentFR() {
  return (
    <LegalLayout
      title="Politique de Cookies"
      subtitle="Comment Massar Digital Studio utilise les cookies et technologies de suivi similaires."
      lastUpdated="Dernière mise à jour : [DATE — RÉVISER ET METTRE À JOUR RÉGULIÈREMENT]"
    >
      <LegalNotice>
        <strong>Remarque :</strong> Ce modèle de politique de cookies contient des espaces réservés entre crochets <strong>[ ]</strong>. Ce document ne constitue pas un avis juridique. Consultez un professionnel du droit qualifié.
      </LegalNotice>

      <LegalSection title="1. Que Sont les Cookies">
        <LegalParagraph>
          Les cookies sont de petits fichiers texte placés sur votre appareil lorsque vous visitez un site web. Ils sont largement utilisés pour faire fonctionner les sites web plus efficacement et améliorer l'expérience utilisateur.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2. Types de Cookies Que Nous Utilisons">
        <LegalSubsection title="2.1 Cookies Essentiels">
          <LegalParagraph>
            Ces cookies sont nécessaires au fonctionnement de base de notre site web et ne peuvent pas être désactivés. Ils permettent la mémorisation de vos préférences de consentement aux cookies et la navigation de base.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="2.2 Cookies Analytiques">
          <LegalParagraph>
            Ces cookies nous aident à comprendre comment les visiteurs interagissent avec notre site web en collectant des informations d'utilisation anonymes. Nous utilisons ces données pour améliorer notre site web et l'expérience utilisateur.
          </LegalParagraph>
          <LegalParagraph>
            <strong>[NOM DU SERVICE D'ANALYTIQUE — Insérez le nom et le lien vers la politique de confidentialité.]</strong>
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="2.3 Cookies Fonctionnels">
          <LegalParagraph>
            Ces cookies permettent des fonctionnalités améliorées et une personnalisation, comme la mémorisation de vos préférences linguistiques.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="2.4 Cookies Marketing">
          <LegalParagraph>
            Ces cookies suivent vos habitudes de navigation sur les sites web pour afficher des publicités pertinentes.
          </LegalParagraph>
          <LegalParagraph>
            <strong>[LISTEZ LES COOKIES MARKETING UTILISÉS. SI AUCUN N'EST UTILISÉ, INDIQUEZ-LE.]</strong>
          </LegalParagraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="3. Cookies Spécifiques">
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13px] sm:text-[14px] border-collapse">
            <thead>
              <tr className="border-b border-[#E4E4E7]">
                <th className="text-start font-semibold text-[#0A0A0A] py-3 pr-4">Nom du Cookie</th>
                <th className="text-start font-semibold text-[#0A0A0A] py-3 pr-4">Catégorie</th>
                <th className="text-start font-semibold text-[#0A0A0A] py-3 pr-4">Objectif</th>
                <th className="text-start font-semibold text-[#0A0A0A] py-3">Durée</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7]">
              <tr>
                <td className="py-3 pr-4 text-[#52525B]"><code>massar_cookie_consent</code></td>
                <td className="py-3 pr-4 text-[#52525B]">Essentiel</td>
                <td className="py-3 pr-4 text-[#52525B]">Stocke vos préférences de consentement</td>
                <td className="py-3 text-[#52525B]">1 an</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-[#52525B]"><code>i18nextLng</code></td>
                <td className="py-3 pr-4 text-[#52525B]">Fonctionnel</td>
                <td className="py-3 pr-4 text-[#52525B]">Stocke votre préférence linguistique</td>
                <td className="py-3 text-[#52525B]">1 an</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-[#A1A1AA] italic" colSpan={4}>
                  [AJOUTEZ DES LIGNES POUR TOUT AUTRE COOKIE]
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="4. Gestion du Consentement">
        <LegalParagraph>
          Lors de votre première visite sur notre site web, nous affichons une bannière de consentement aux cookies qui vous permet de :
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>Tout Accepter :</strong> Consentir à toutes les catégories de cookies.',
            '<strong>Refuser les Non-Essentiels :</strong> N\'accepter que les cookies essentiels.',
            '<strong>Gérer les Préférences :</strong> Sélectionner individuellement les catégories de cookies à accepter ou refuser.',
          ]}
        />
        <LegalParagraph>
          Vous pouvez modifier vos préférences à tout moment via les paramètres de votre navigateur ou en cliquant sur le lien de préférences dans le pied de page de notre site web.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="5. Contact">
        <LegalParagraph>
          Pour toute question concernant notre utilisation des cookies, veuillez nous contacter :
        </LegalParagraph>
        <LegalList
          items={[
            'E-mail : massar.digital.studio@gmail.com',
            'Téléphone : +213 699 284 128',
            'Localisation : Algérie',
          ]}
        />
      </LegalSection>
    </LegalLayout>
  )
}

function CookieContentAR() {
  return (
    <LegalLayout
      title="سياسة ملفات تعريف الارتباط (الكوكيز)"
      subtitle="كيف يستخدم استوديو مسار الرقمي ملفات تعريف الارتباط وتقنيات التتبع المماثلة على موقعنا."
      lastUpdated="آخر تحديث: [التاريخ — يُرجى المراجعة والتحديث بانتظام]"
    >
      <LegalNotice>
        <strong>ملاحظة:</strong> يحتوي نموذج سياسة ملفات تعريف الارتباط هذا على عناصر نائبة بين قوسين مربعين <strong>[ ]</strong>. هذا المستند ليس نصيحة قانونية. استشر محترفاً قانونياً مؤهلاً.
      </LegalNotice>

      <LegalSection title="1. ما هي ملفات تعريف الارتباط">
        <LegalParagraph>
          ملفات تعريف الارتباط هي ملفات نصية صغيرة يتم وضعها على جهازك عند زيارة موقع ويب. تُستخدم على نطاق واسع لجعل المواقع تعمل بكفاءة أكبر وتحسين تجربة المستخدم.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2. أنواع ملفات تعريف الارتباط التي نستخدمها">
        <LegalSubsection title="2.1 الكوكيز الأساسية (الضرورية)">
          <LegalParagraph>
            ملفات تعريف الارتباط هذه مطلوبة للتشغيل الأساسي لموقعنا ولا يمكن تعطيلها. تتيح الوظائف الأساسية مثل تذكر تفضيلات الموافقة على ملفات تعريف الارتباط والحفاظ على أمان الجلسة.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="2.2 كوكيز التحليلات">
          <LegalParagraph>
            تساعدنا ملفات تعريف الارتباط هذه في فهم كيفية تفاعل الزوار مع موقعنا من خلال جمع معلومات الاستخدام مجهولة المصدر. نستخدم هذه البيانات لتحسين موقعنا وتجربة المستخدم.
          </LegalParagraph>
          <LegalParagraph>
            <strong>[اسم خدمة التحليلات — أدخل الاسم والرابط لسياسة الخصوصية.]</strong>
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="2.3 الكوكيز الوظيفية">
          <LegalParagraph>
            تتيح ملفات تعريف الارتباط هذه وظائف محسّنة وتخصيصاً، مثل تذكر تفضيلات اللغة الخاصة بك.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="2.4 كوكيز التسويق">
          <LegalParagraph>
            تتتبع ملفات تعريف الارتباط هذه عادات التصفح الخاصة بك عبر مواقع الويب لعرض إعلانات ذات صلة.
          </LegalParagraph>
          <LegalParagraph>
            <strong>[قائمة بكوكيز التسويق المستخدمة. إذا لم يتم استخدام أي منها، يُرجى ذكر ذلك.]</strong>
          </LegalParagraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="3. ملفات تعريف الارتباط المحددة التي نستخدمها">
        <div className="overflow-x-auto mb-6">
          <table className="w-full text-[13px] sm:text-[14px] border-collapse">
            <thead>
              <tr className="border-b border-[#E4E4E7]">
                <th className="text-start font-semibold text-[#0A0A0A] py-3 pr-4">اسم الكوكي</th>
                <th className="text-start font-semibold text-[#0A0A0A] py-3 pr-4">التصنيف</th>
                <th className="text-start font-semibold text-[#0A0A0A] py-3 pr-4">الغرض</th>
                <th className="text-start font-semibold text-[#0A0A0A] py-3">المدة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E4E4E7]">
              <tr>
                <td className="py-3 pr-4 text-[#52525B]"><code>massar_cookie_consent</code></td>
                <td className="py-3 pr-4 text-[#52525B]">أساسي</td>
                <td className="py-3 pr-4 text-[#52525B]">يخزن تفضيلات الموافقة على الكوكيز</td>
                <td className="py-3 text-[#52525B]">سنة واحدة</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-[#52525B]"><code>i18nextLng</code></td>
                <td className="py-3 pr-4 text-[#52525B]">وظيفي</td>
                <td className="py-3 pr-4 text-[#52525B]">يخزن تفضيل اللغة الخاص بك</td>
                <td className="py-3 text-[#52525B]">سنة واحدة</td>
              </tr>
              <tr>
                <td className="py-3 pr-4 text-[#A1A1AA] italic" colSpan={4}>
                  [أضف صفوفاً لأي ملفات تعريف ارتباط أخرى]
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </LegalSection>

      <LegalSection title="4. إدارة الموافقة">
        <LegalParagraph>
          عند زيارتك الأولى لموقعنا، نعرض لافتة موافقة على ملفات تعريف الارتباط تتيح لك:
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>قبول الكل:</strong> الموافقة على جميع فئات ملفات تعريف الارتباط.',
            '<strong>رفض غير الأساسي:</strong> قبول ملفات تعريف الارتباط الأساسية فقط.',
            '<strong>إدارة التفضيلات:</strong> اختيار فئات ملفات تعريف الارتباط بشكل فردي.',
          ]}
        />
        <LegalParagraph>
          يمكنك تغيير تفضيلاتك في أي وقت من خلال إعدادات المتصفح الخاص بك.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="5. اتصل بنا">
        <LegalParagraph>
          إذا كانت لديك أي أسئلة حول استخدامنا لملفات تعريف الارتباط، يُرجى الاتصال بنا:
        </LegalParagraph>
        <LegalList
          items={[
            'البريد الإلكتروني: massar.digital.studio@gmail.com',
            'الهاتف: +213 699 284 128',
            'الموقع: الجزائر',
          ]}
        />
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
