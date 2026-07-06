import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingContact } from '@/components/layout/FloatingContact'
import { LegalLayout, LegalSection, LegalParagraph, LegalList } from './LegalLayout'
import { useEffect } from 'react'
import { SEO_CONFIG } from '@/lib/seo'

function TermsSEO() {
  const { t } = useTranslation()
  const tos = t('legal.terms', { returnObjects: true }) as Record<string, string>
  const canonical = `${SEO_CONFIG.siteUrl}/#/terms`

  return (
    <Helmet prioritizeSeoTags>
      <title>{tos.title}</title>
      <meta name="description" content={tos.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={tos.ogTitle || tos.title} />
      <meta property="og:description" content={tos.ogDescription || tos.description} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta name="twitter:title" content={tos.ogTitle || tos.title} />
      <meta name="twitter:description" content={tos.ogDescription || tos.description} />
    </Helmet>
  )
}

function TermsContentEN() {
  return (
    <LegalLayout
      title="Terms of Use"
      subtitle="The terms governing access to and use of the Massar Agency website."
      lastUpdated="Last updated: July 2026"
    >
      <LegalSection title="2.1 Purpose">
        <LegalParagraph>
          These terms of use ("Terms") govern access to and use of the <strong>Massar Agency</strong> website, a digital agency specializing in web development, mobile app development, and brand identity creation, primarily serving Algerian small and medium-sized businesses (SMBs).
        </LegalParagraph>
        <LegalParagraph>
          By browsing this site, you unreservedly accept these terms.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2.2 Overview of Services">
        <LegalParagraph>
          Massar Agency offers, among other things:
        </LegalParagraph>
        <LegalList
          items={[
            'Design and development of websites (showcase sites, e-commerce, web applications)',
            'Mobile app development (iOS/Android)',
            'Visual identity and branding creation',
            'Digital consulting and SEO strategy services',
          ]}
        />
        <LegalParagraph>
          Specific services, timelines, and pricing are subject to <strong>personalized quotes</strong> and <strong>separate contracts</strong> concluded between Massar Agency and the client.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2.3 Site Access">
        <LegalParagraph>
          Access to the site is free and open to any user with an internet connection. Massar Agency reserves the right to suspend, interrupt, or limit access to the site, particularly for maintenance purposes, without prior notice or compensation.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2.4 Intellectual Property">
        <LegalParagraph>
          All elements of the site (text, logos, graphics, images, source code, visual identity) are the exclusive property of Massar Agency, unless otherwise stated. Any reproduction, representation, modification, or exploitation, in whole or in part, without prior written authorization is strictly prohibited.
        </LegalParagraph>
        <LegalParagraph>
          Projects delivered to clients under contract are subject to a rights transfer defined contractually on a case-by-case basis.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2.5 Liability">
        <LegalParagraph>
          <strong>Massar Agency undertakes to:</strong>
        </LegalParagraph>
        <LegalList
          items={[
            'Provide accurate information about its services',
            'Keep the site accessible to the extent possible',
            'Ensure reasonable security of data transiting through the site',
          ]}
        />
        <LegalParagraph>
          <strong>Massar Agency cannot be held liable for:</strong>
        </LegalParagraph>
        <LegalList
          items={[
            'Temporary site interruptions due to force majeure or technical issues beyond its control',
            'The content of third-party sites accessible via hyperlinks on the site',
            'Improper use of the site by the user',
          ]}
        />
      </LegalSection>

      <LegalSection title="2.6 Hyperlinks">
        <LegalParagraph>
          The site may contain links to third-party sites. Massar Agency has no control over these sites and disclaims any liability regarding their content.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2.7 Modification of Terms">
        <LegalParagraph>
          Massar Agency reserves the right to modify these terms of use at any time. Users are encouraged to review this page regularly.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2.8 Governing Law and Jurisdiction">
        <LegalParagraph>
          These terms are governed by Algerian law. Any dispute relating to their interpretation or execution falls under the exclusive jurisdiction of the competent Algerian courts.
        </LegalParagraph>
      </LegalSection>
    </LegalLayout>
  )
}

function TermsContentFR() {
  return (
    <LegalLayout
      title="Conditions d'Utilisation"
      subtitle="Les conditions régissant l'accès et l'utilisation du site web de Massar Agency."
      lastUpdated="Dernière mise à jour : Juillet 2026"
    >
      <LegalSection title="2.1 Objet">
        <LegalParagraph>
          Les présentes conditions d'utilisation (« CGU ») régissent l'accès et l'utilisation du site web de <strong>Massar Agency</strong>, agence digitale spécialisée dans le développement web, le développement d'applications mobiles et la création d'identité de marque, destinée principalement aux petites et moyennes entreprises (PME) algériennes.
        </LegalParagraph>
        <LegalParagraph>
          En naviguant sur ce site, vous acceptez sans réserve les présentes conditions.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2.2 Présentation des services">
        <LegalParagraph>
          Massar Agency propose notamment :
        </LegalParagraph>
        <LegalList
          items={[
            'La conception et le développement de sites web (vitrines, e-commerce, applications web)',
            'Le développement d\'applications mobiles (iOS/Android)',
            'La création d\'identité visuelle et de branding',
            'Des services de conseil digital et de stratégie SEO',
          ]}
        />
        <LegalParagraph>
          Les prestations spécifiques, délais et tarifs font l'objet de <strong>devis personnalisés</strong> et de <strong>contrats séparés</strong> conclus entre Massar Agency et le client.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2.3 Accès au site">
        <LegalParagraph>
          L'accès au site est gratuit et ouvert à tout utilisateur disposant d'une connexion internet. Massar Agency se réserve le droit de suspendre, interrompre ou limiter l'accès au site, notamment pour des raisons de maintenance, sans préavis ni indemnité.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2.4 Propriété intellectuelle">
        <LegalParagraph>
          L'ensemble des éléments du site (textes, logos, graphismes, images, code source, identité visuelle) est la propriété exclusive de Massar Agency, sauf mention contraire. Toute reproduction, représentation, modification ou exploitation, totale ou partielle, sans autorisation écrite préalable est strictement interdite.
        </LegalParagraph>
        <LegalParagraph>
          Les projets réalisés pour nos clients et livrés dans le cadre d'un contrat font l'objet d'une cession de droits définie contractuellement au cas par cas.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2.5 Responsabilités">
        <LegalParagraph>
          <strong>Massar Agency s'engage à :</strong>
        </LegalParagraph>
        <LegalList
          items={[
            'Fournir des informations exactes sur ses services',
            'Maintenir le site accessible dans la mesure du possible',
            'Assurer la sécurité raisonnable des données transitant par le site',
          ]}
        />
        <LegalParagraph>
          <strong>Massar Agency ne saurait être tenue responsable :</strong>
        </LegalParagraph>
        <LegalList
          items={[
            'Des interruptions temporaires du site liées à des cas de force majeure ou à des problèmes techniques indépendants de sa volonté',
            'Du contenu de sites tiers accessibles via des liens hypertextes présents sur le site',
            'D\'un usage non conforme du site par l\'utilisateur',
          ]}
        />
      </LegalSection>

      <LegalSection title="2.6 Liens hypertextes">
        <LegalParagraph>
          Le site peut contenir des liens vers des sites tiers. Massar Agency n'exerce aucun contrôle sur ces sites et décline toute responsabilité quant à leur contenu.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2.7 Modification des conditions">
        <LegalParagraph>
          Massar Agency se réserve le droit de modifier les présentes conditions d'utilisation à tout moment. Les utilisateurs sont invités à consulter régulièrement cette page.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2.8 Droit applicable et juridiction">
        <LegalParagraph>
          Les présentes conditions sont soumises au droit algérien. Tout litige relatif à leur interprétation ou leur exécution relève de la compétence exclusive des tribunaux algériens compétents.
        </LegalParagraph>
      </LegalSection>
    </LegalLayout>
  )
}

function TermsContentAR() {
  return (
    <LegalLayout
      title="شروط الاستخدام"
      subtitle="الشروط التي تحكم الوصول إلى موقع Massar Agency واستخدامه."
      lastUpdated="آخر تحديث: يوليو 2026"
    >
      <LegalSection title="2.1 الموضوع">
        <LegalParagraph>
          تحكم شروط الاستخدام هذه الوصول إلى موقع <strong>Massar Agency</strong> واستخدامه، وهي وكالة رقمية متخصصة في تطوير المواقع الإلكترونية، وتطوير التطبيقات المحمولة، وإنشاء الهوية البصرية، وتستهدف بشكل أساسي المؤسسات الصغيرة والمتوسطة (PME) الجزائرية.
        </LegalParagraph>
        <LegalParagraph>
          بتصفحكم هذا الموقع، فإنكم تقبلون هذه الشروط دون تحفظ.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2.2 عرض الخدمات">
        <LegalParagraph>
          تقدّم Massar Agency، من ضمن خدمات أخرى:
        </LegalParagraph>
        <LegalList
          items={[
            'تصميم وتطوير المواقع الإلكترونية (المواقع التعريفية، التجارة الإلكترونية، تطبيقات الويب)',
            'تطوير التطبيقات المحمولة (iOS/Android)',
            'إنشاء الهوية البصرية والعلامة التجارية',
            'خدمات الاستشارة الرقمية واستراتيجية تحسين محركات البحث (SEO)',
          ]}
        />
        <LegalParagraph>
          تخضع الخدمات المحددة والآجال والأسعار لـ<strong>عروض أسعار مخصصة</strong> و<strong>عقود منفصلة</strong> تُبرم بين Massar Agency والعميل.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2.3 الوصول إلى الموقع">
        <LegalParagraph>
          الوصول إلى الموقع مجاني ومفتوح لأي مستخدم يتوفر على اتصال بالإنترنت. تحتفظ Massar Agency بحق تعليق أو مقاطعة أو تقييد الوصول إلى الموقع، خاصة لأغراض الصيانة، دون إشعار مسبق أو تعويض.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2.4 الملكية الفكرية">
        <LegalParagraph>
          جميع عناصر الموقع (النصوص، الشعارات، الرسومات، الصور، الكود المصدري، الهوية البصرية) هي ملكية حصرية لـ Massar Agency، ما لم يُذكر خلاف ذلك. يُمنع منعًا باتًا أي استنساخ أو تمثيل أو تعديل أو استغلال، كليًا أو جزئيًا، دون إذن كتابي مسبق.
        </LegalParagraph>
        <LegalParagraph>
          تخضع المشاريع المُنجزة للعملاء في إطار عقد لنقل حقوق يُحدَّد تعاقديًا حسب كل حالة.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2.5 المسؤوليات">
        <LegalParagraph>
          <strong>تلتزم Massar Agency بـ:</strong>
        </LegalParagraph>
        <LegalList
          items={[
            'تقديم معلومات دقيقة حول خدماتها',
            'الحفاظ على إمكانية الوصول إلى الموقع قدر الإمكان',
            'ضمان أمان معقول للبيانات المتنقلة عبر الموقع',
          ]}
        />
        <LegalParagraph>
          <strong>لا يمكن تحميل Massar Agency المسؤولية عن:</strong>
        </LegalParagraph>
        <LegalList
          items={[
            'الانقطاعات المؤقتة للموقع الناتجة عن حالات القوة القاهرة أو مشاكل تقنية خارجة عن إرادتها',
            'محتوى المواقع الخارجية التي يمكن الوصول إليها عبر الروابط التشعبية الموجودة في الموقع',
            'الاستخدام غير المطابق للموقع من طرف المستخدم',
          ]}
        />
      </LegalSection>

      <LegalSection title="2.6 الروابط التشعبية">
        <LegalParagraph>
          قد يحتوي الموقع على روابط لمواقع خارجية. لا تملك Massar Agency أي تحكم في هذه المواقع وتخلي مسؤوليتها عن محتواها.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2.7 تعديل الشروط">
        <LegalParagraph>
          تحتفظ Massar Agency بحق تعديل شروط الاستخدام هذه في أي وقت. يُدعى المستخدمون إلى مراجعة هذه الصفحة بانتظام.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2.8 القانون المطبَّق والاختصاص القضائي">
        <LegalParagraph>
          تخضع هذه الشروط للقانون الجزائري. يعود الفصل في أي نزاع يتعلق بتفسيرها أو تنفيذها إلى الاختصاص الحصري للمحاكم الجزائرية المختصة.
        </LegalParagraph>
      </LegalSection>
    </LegalLayout>
  )
}

export function TermsOfService() {
  const { i18n } = useTranslation()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    document.documentElement.lang = i18n.language
  }, [i18n.language])

  const lang = i18n.language

  const content = {
    ar: <TermsContentAR />,
    fr: <TermsContentFR />,
    en: <TermsContentEN />,
  }[lang] || <TermsContentEN />

  return (
    <>
      <TermsSEO />
      <Navbar />
      {content}
      <Footer />
      <FloatingContact />
    </>
  )
}
