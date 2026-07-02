import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingContact } from '@/components/layout/FloatingContact'
import { LegalLayout, LegalSection, LegalSubsection, LegalParagraph, LegalList, LegalNotice } from './LegalLayout'
import { useEffect } from 'react'
import { SEO_CONFIG } from '@/lib/seo'

function TermsSEO() {
  const { t, i18n } = useTranslation()
  const lang = i18n.language
  const tos = t('legal.terms', { returnObjects: true }) as Record<string, string>
  const canonical = `${SEO_CONFIG.siteUrl}/#/terms`
  const locale = lang === 'ar' ? 'ar_DZ' : lang === 'fr' ? 'fr_DZ' : 'en_US'

  return (
    <Helmet prioritizeSeoTags>
      <html lang={lang} />
      <title>{tos.title}</title>
      <meta name="description" content={tos.description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={tos.ogTitle || tos.title} />
      <meta property="og:description" content={tos.ogDescription || tos.description} />
      <meta property="og:image" content={SEO_CONFIG.ogImage} />
      <meta property="og:url" content={canonical} />
      <meta property="og:site_name" content={SEO_CONFIG.siteName} />
      <meta property="og:locale" content={locale} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={tos.ogTitle || tos.title} />
      <meta name="twitter:description" content={tos.ogDescription || tos.description} />
      <meta name="twitter:image" content={SEO_CONFIG.ogImage} />
      <meta name="twitter:site" content={SEO_CONFIG.twitterHandle} />
      <link rel="alternate" hrefLang="ar" href={canonical} />
      <link rel="alternate" hrefLang="fr" href={canonical} />
      <link rel="alternate" hrefLang="en" href={canonical} />
      <link rel="alternate" hrefLang="x-default" href={canonical} />
    </Helmet>
  )
}

function TermsContentEN() {
  return (
    <LegalLayout
      title="Terms of Service"
      subtitle="The terms governing the use of Massar Digital Studio's website and services."
      lastUpdated="Last updated: [DATE — REVIEW AND UPDATE REGULARLY]"
    >
      <LegalNotice>
        <strong>Note:</strong> This Terms of Service template contains placeholders marked with square brackets <strong>[ ]</strong>. These must be completed by the website owner with accurate business-specific information. This document is not legal advice and does not create a legally binding agreement until reviewed and executed by all relevant parties. Consult a qualified legal professional to ensure this agreement is appropriate for your business and jurisdiction.
      </LegalNotice>

      <LegalSection title="1. Introduction and Acceptance">
        <LegalParagraph>
          Welcome to <strong>Massar Digital Studio</strong> ("we," "us," "our," or "the Studio"). By accessing our website at <strong>[WEBSITE URL]</strong> or using any of our services, you agree to be bound by these Terms of Service ("Terms"). If you do not agree with any part of these Terms, you must not use our website or services.
        </LegalParagraph>
        <LegalParagraph>
          These Terms apply to all visitors, users, clients, and any other person who accesses or uses our website or services. <strong>[COMPANY NAME — Insert official legal entity name.]</strong>
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2. Services">
        <LegalParagraph>
          Massar Digital Studio provides digital services including but not limited to:
        </LegalParagraph>
        <LegalList
          items={[
            'Website development and design',
            'Web and mobile application development',
            'Brand identity and visual design',
            'UI/UX design',
            'Business process automation',
            'Artificial intelligence solutions',
            'Consulting and strategy services',
            '[ADDITIONAL SERVICES — List any other services offered.]',
          ]}
        />
        <LegalParagraph>
          The specific scope, deliverables, timeline, and fees for each project will be defined in a separate project proposal, statement of work, or service agreement ("Project Agreement") signed by both parties. In the event of any conflict between these Terms and a Project Agreement, the Project Agreement shall prevail.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="3. Client Responsibilities">
        <LegalParagraph>
          As a client of Massar Digital Studio, you agree to:
        </LegalParagraph>
        <LegalList
          items={[
            'Provide accurate, complete, and timely information and materials necessary for the project.',
            'Respond promptly to requests for feedback, approvals, and decisions to avoid project delays.',
            'Ensure you have the legal right to use any content, materials, or intellectual property you provide to us.',
            'Make timely payments as outlined in the Project Agreement.',
            'Assign a point of contact who is authorized to make decisions on behalf of your organization.',
            'Comply with all applicable laws and regulations in your use of our services.',
          ]}
        />
        <LegalParagraph>
          Failure to meet these responsibilities may result in project delays, additional costs, or termination of the agreement as outlined in Section 8.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="4. Payments and Fees">
        <LegalSubsection title="4.1 Pricing">
          <LegalParagraph>
            Our pricing is outlined in our website's Pricing section and in individual Project Agreements. All prices are in [CURRENCY — e.g., USD] unless otherwise specified and are exclusive of applicable taxes.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="4.2 Payment Terms">
          <LegalParagraph>
            We typically require a deposit of [DEPOSIT PERCENTAGE — e.g., 50%] before work begins, with the remaining balance due upon completion or at agreed milestones. Specific payment schedules are detailed in each Project Agreement.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="4.3 Late Payments">
          <LegalParagraph>
            Invoices unpaid after [LATE PAYMENT GRACE PERIOD — e.g., 15 days] from the due date may be subject to a late fee of [LATE FEE PERCENTAGE — e.g., 1.5%] per month or the maximum allowed by law. We reserve the right to suspend work on all projects until outstanding invoices are paid in full.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="4.4 Expenses">
          <LegalParagraph>
            Any additional expenses incurred during the project (such as third-party software licenses, stock assets, hosting fees, or travel) will be communicated and approved by the client before being incurred, unless otherwise agreed in the Project Agreement.
          </LegalParagraph>
        </LegalSubsection>

        <LegalParagraph>
          <strong>[SPECIFY PAYMENT CURRENCY, DEPOSIT PERCENTAGE, LATE FEE TERMS, AND EXPENSE POLICIES.]</strong>
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="5. Intellectual Property Rights">
        <LegalSubsection title="5.1 Ownership of Deliverables">
          <LegalParagraph>
            Upon full payment of all fees due under the applicable Project Agreement, we assign to the client all rights, title, and interest in and to the final deliverables created specifically for the project, excluding pre-existing materials, tools, and frameworks ("Massar IP").
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="5.2 Massar IP">
          <LegalParagraph>
            Massar Digital Studio retains all intellectual property rights in:
          </LegalParagraph>
          <LegalList
            items={[
              'Our pre-existing code libraries, frameworks, and development tools.',
              'Design systems, components, and patterns developed prior to or independently of the client project.',
              'Our methodologies, processes, and know-how.',
              'Any materials licensed from third parties.',
            ]}
          />
          <LegalParagraph>
            The client receives a perpetual, irrevocable, worldwide, non-exclusive license to use any Massar IP incorporated into the deliverables for the intended purpose of the project.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="5.3 Client Materials">
          <LegalParagraph>
            The client represents and warrants that any content, materials, or intellectual property provided to us does not infringe upon the rights of any third party. The client retains all rights to their pre-existing materials.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="5.4 Portfolio Rights">
          <LegalParagraph>
            We reserve the right to display completed projects in our portfolio, case studies, and marketing materials unless otherwise agreed in writing. We will not disclose confidential information without your consent.
          </LegalParagraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="6. Warranties and Disclaimers">
        <LegalSubsection title="6.1 Our Warranty">
          <LegalParagraph>
            We warrant that our services will be performed in a professional and workmanlike manner in accordance with industry standards. For a period of [WARRANTY PERIOD — e.g., 30 days] from project completion ("Warranty Period"), we will remedy any material defects in the deliverables at no additional cost, provided the defects are not caused by modifications made by the client or third parties.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="6.2 Disclaimer">
          <LegalParagraph>
            EXCEPT AS EXPRESSLY STATED IN THESE TERMS, OUR WEBSITE AND SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT. WE DO NOT GUARANTEE THAT OUR WEBSITE WILL BE UNINTERRUPTED, ERROR-FREE, OR SECURE AT ALL TIMES.
          </LegalParagraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="7. Limitation of Liability">
        <LegalParagraph>
          TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL MASSAR DIGITAL STUDIO BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, DATA, USE, OR GOODWILL, ARISING OUT OF OR IN CONNECTION WITH THESE TERMS OR THE SERVICES PROVIDED.
        </LegalParagraph>
        <LegalParagraph>
          OUR TOTAL LIABILITY TO YOU FOR ALL CLAIMS ARISING UNDER THESE TERMS OR ANY PROJECT AGREEMENT SHALL NOT EXCEED THE TOTAL AMOUNT PAID BY YOU TO US UNDER THE APPLICABLE PROJECT AGREEMENT IN THE [LIABILITY PERIOD — e.g., 12 MONTHS] PRECEDING THE CLAIM.
        </LegalParagraph>
        <LegalParagraph>
          <strong>[REVIEW WITH LEGAL COUNSEL — LIMITATION OF LIABILITY MAY NOT BE ENFORCEABLE IN ALL JURISDICTIONS.]</strong>
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="8. Termination">
        <LegalSubsection title="8.1 Termination by Either Party">
          <LegalParagraph>
            Either party may terminate a Project Agreement with [TERMINATION NOTICE PERIOD — e.g., 30 days] written notice if the other party materially breaches the agreement and fails to cure the breach within [CURE PERIOD — e.g., 15 days] of receiving written notice.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="8.2 Termination by Client">
          <LegalParagraph>
            The client may terminate a Project Agreement at any time by providing written notice. In such cases, the client shall pay for all work completed up to the date of termination, plus any non-cancellable expenses incurred on the client's behalf.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="8.3 Termination by Massar">
          <LegalParagraph>
            We may terminate a Project Agreement immediately if the client fails to make timely payments, provides false or misleading information, or engages in conduct that damages our reputation or violates applicable law.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="8.4 Effect of Termination">
          <LegalParagraph>
            Upon termination, the client shall pay all amounts due for work performed and expenses incurred. Sections relating to intellectual property, payment, liability, and confidentiality shall survive termination.
          </LegalParagraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="9. Confidentiality">
        <LegalParagraph>
          Both parties agree to maintain the confidentiality of all proprietary information disclosed during the course of the project. This includes business strategies, technical specifications, financial data, and any other information designated as confidential. This obligation shall survive termination of these Terms for [CONFIDENTIALITY PERIOD — e.g., 2 years].
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="10. Website Use">
        <LegalParagraph>
          When using our website, you agree not to:
        </LegalParagraph>
        <LegalList
          items={[
            'Use the website for any unlawful purpose or in violation of any applicable laws or regulations.',
            'Attempt to gain unauthorized access to any part of the website, servers, or systems.',
            'Interfere with or disrupt the security, integrity, or performance of the website.',
            'Transmit any viruses, malware, or other harmful code.',
            'Use automated means (bots, scrapers, etc.) to access or collect data from the website without our express permission.',
          ]}
        />
        <LegalParagraph>
          We reserve the right to restrict or terminate access to our website for violations of these Terms.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="11. Third-Party Links and Services">
        <LegalParagraph>
          Our website and services may contain links to third-party websites or services (e.g., Calendly, Instagram, LinkedIn). We are not responsible for the content, privacy practices, or terms of these third-party services. Your use of such services is at your own risk and governed by their respective terms.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="12. Governing Law and Dispute Resolution">
        <LegalParagraph>
          These Terms shall be governed by and construed in accordance with the laws of <strong>[JURISDICTION — e.g., Algeria]</strong>, without regard to its conflict of law provisions.
        </LegalParagraph>
        <LegalParagraph>
          Any dispute arising out of or relating to these Terms or the services provided shall first be attempted to be resolved through good-faith negotiations between the parties. If the dispute cannot be resolved within [NEGOTIATION PERIOD — e.g., 30 days], it shall be submitted to <strong>[DISPUTE RESOLUTION METHOD — e.g., binding arbitration in accordance with the rules of the Algerian Centre for Commercial Arbitration, or the competent courts in Algiers, Algeria]</strong>.
        </LegalParagraph>
        <LegalParagraph>
          <strong>[SPECIFY GOVERNING LAW, DISPUTE RESOLUTION METHOD, AND VENUE. CONSULT LEGAL COUNSEL.]</strong>
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="13. Changes to These Terms">
        <LegalParagraph>
          We reserve the right to modify these Terms at any time. Changes will be effective immediately upon posting to our website. We will notify clients of material changes via email or through our website. Your continued use of our website or services after any changes constitutes acceptance of the new Terms.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="14. Contact Information">
        <LegalParagraph>
          For questions about these Terms, please contact us:
        </LegalParagraph>
        <LegalList
          items={[
            'Email: massar.digital.studio@gmail.com',
            'Phone: +213 555 123 456',
            'Location: Algeria',
            '[MAILING ADDRESS — Insert physical mailing address if applicable.]',
          ]}
        />
      </LegalSection>
    </LegalLayout>
  )
}

function TermsContentFR() {
  return (
    <LegalLayout
      title="Conditions Générales d'Utilisation"
      subtitle="Les conditions régissant l'utilisation du site web et des services de Massar Digital Studio."
      lastUpdated="Dernière mise à jour : [DATE — RÉVISER ET METTRE À JOUR RÉGULIÈREMENT]"
    >
      <LegalNotice>
        <strong>Remarque :</strong> Ce modèle de conditions générales contient des espaces réservés entre crochets <strong>[ ]</strong>. Ceux-ci doivent être complétés par le propriétaire du site avec des informations précises. Ce document ne constitue pas un avis juridique. Consultez un professionnel du droit qualifié pour vous assurer que cet accord est adapté à votre entreprise et à votre juridiction.
      </LegalNotice>

      <LegalSection title="1. Introduction et Acceptation">
        <LegalParagraph>
          Bienvenue chez <strong>Massar Digital Studio</strong>. En accédant à notre site web à l'adresse <strong>[URL DU SITE WEB]</strong> ou en utilisant nos services, vous acceptez d'être lié par les présentes Conditions Générales d'Utilisation. Si vous n'êtes pas d'accord avec une partie de ces conditions, vous ne devez pas utiliser notre site web ou nos services.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2. Services">
        <LegalParagraph>
          Massar Digital Studio fournit des services numériques incluant, sans s'y limiter :
        </LegalParagraph>
        <LegalList
          items={[
            'Développement et conception de sites web',
            'Développement d\'applications web et mobiles',
            'Identité de marque et design visuel',
            'Design UI/UX',
            'Automatisation des processus métier',
            'Solutions d\'intelligence artificielle',
            'Services de conseil et stratégie',
            '[SERVICES SUPPLÉMENTAIRES — Listez tout autre service proposé.]',
          ]}
        />
        <LegalParagraph>
          Le périmètre spécifique, les livrables, le calendrier et les frais de chaque projet seront définis dans une proposition de projet ou un contrat de service distinct signé par les deux parties.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="3. Responsabilités du Client">
        <LegalParagraph>
          En tant que client de Massar Digital Studio, vous acceptez de :
        </LegalParagraph>
        <LegalList
          items={[
            'Fournir des informations et des documents précis, complets et opportuns nécessaires au projet.',
            'Répondre rapidement aux demandes de feedback, d\'approbations et de décisions pour éviter les retards.',
            'Vous assurer que vous avez le droit légal d\'utiliser tout contenu ou propriété intellectuelle que vous nous fournissez.',
            'Effectuer les paiements en temps opportun comme indiqué dans le contrat de projet.',
            'Désigner un interlocuteur autorisé à prendre des décisions pour le compte de votre organisation.',
            'Vous conformer à toutes les lois et réglementations applicables.',
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Paiements et Frais">
        <LegalSubsection title="4.1 Tarifs">
          <LegalParagraph>
            Nos tarifs sont indiqués dans la section Tarifs de notre site web et dans les contrats de projet individuels. Tous les prix sont en [DEVISE — ex. USD] sauf indication contraire et sont exclusifs des taxes applicables.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="4.2 Conditions de Paiement">
          <LegalParagraph>
            Nous exigeons généralement un acompte de [POURCENTAGE DE L'ACOMPTE — ex. 50%] avant le début des travaux, le solde restant étant dû à l'achèvement ou selon les jalons convenus.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="4.3 Retards de Paiement">
          <LegalParagraph>
            Les factures impayées après [DÉLAI DE GRÂCE — ex. 15 jours] à compter de la date d'échéance peuvent être soumises à des pénalités de retard de [TAUX DE PÉNALITÉ — ex. 1,5%] par mois.
          </LegalParagraph>
        </LegalSubsection>

        <LegalParagraph>
          <strong>[SPÉCIFIEZ LA DEVISE, LE POURCENTAGE DE L'ACOMPTE ET LES CONDITIONS DE PÉNALITÉ DE RETARD.]</strong>
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="5. Propriété Intellectuelle">
        <LegalSubsection title="5.1 Propriété des Livrables">
          <LegalParagraph>
            Après paiement intégral de tous les frais dus, nous cédons au client tous les droits sur les livrables finaux créés spécifiquement pour le projet, à l'exclusion des matériels, outils et cadres préexistants.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="5.2 Propriété Intellectuelle de Massar">
          <LegalParagraph>
            Massar Digital Studio conserve tous les droits de propriété intellectuelle sur :
          </LegalParagraph>
          <LegalList
            items={[
              'Nos bibliothèques de code, frameworks et outils de développement préexistants.',
              'Nos systèmes de conception, composants et modèles développés indépendamment.',
              'Nos méthodologies, processus et savoir-faire.',
              'Tout matériel sous licence de tiers.',
            ]}
          />
        </LegalSubsection>

        <LegalSubsection title="5.3 Droit de Portfolio">
          <LegalParagraph>
            Nous nous réservons le droit d'afficher les projets terminés dans notre portfolio et nos études de cas, sauf convention écrite contraire.
          </LegalParagraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="6. Garanties">
        <LegalParagraph>
          Nous garantissons que nos services seront exécutés de manière professionnelle conformément aux normes de l'industrie. Pendant [PÉRIODE DE GARANTIE — ex. 30 jours] suivant l'achèvement du projet, nous corrigerons tout défaut matériel des livrables sans frais supplémentaires.
        </LegalParagraph>
        <LegalParagraph>
          SAUF INDICATION CONTRAIRE EXPRESSE, NOS SERVICES SONT FOURNIS « EN L'ÉTAT » SANS GARANTIE D'AUCUNE SORTE.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="7. Limitation de Responsabilité">
        <LegalParagraph>
          DANS TOUTE LA MESURE PERMISE PAR LA LOI APPLICABLE, MASSAR DIGITAL STUDIO NE SAURAIT ÊTRE TENU RESPONSABLE DES DOMMAGES INDIRECTS, ACCESSOIRES, SPÉCIAUX OU CONSÉCUTIFS. NOTRE RESPONSABILITÉ TOTALE NE DÉPASSERA PAS LE MONTANT TOTAL PAYÉ PAR LE CLIENT AU TITRE DU CONTRAT DE PROJET CONCERNÉ AU COURS DES [PÉRIODE DE RESPONSABILITÉ — ex. 12 MOIS] PRÉCÉDANT LA RÉCLAMATION.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="8. Résiliation">
        <LegalParagraph>
          Chaque partie peut résilier un contrat de projet avec un préavis écrit de [DÉLAI DE PRÉAVIS — ex. 30 jours] en cas de violation substantielle. Le client peut résilier à tout moment, mais devra payer pour tout travail effectué jusqu'à la date de résiliation.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="9. Utilisation du Site Web">
        <LegalParagraph>
          Lors de l'utilisation de notre site web, vous acceptez de ne pas utiliser le site à des fins illégales, tenter d'accéder sans autorisation, interférer avec la sécurité du site, transmettre des virus ou utiliser des moyens automatisés sans notre autorisation.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="10. Droit Applicable">
        <LegalParagraph>
          Les présentes conditions sont régies par les lois de <strong>[JURIDICTION — ex. l'Algérie]</strong>. Tout litige sera d'abord tenté d'être résolu par la négociation, puis soumis à <strong>[MÉTHODE DE RÉSOLUTION DES LITIGES]</strong>.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="11. Contact">
        <LegalParagraph>
          Pour toute question concernant ces conditions, veuillez nous contacter :
        </LegalParagraph>
        <LegalList
          items={[
            'E-mail : massar.digital.studio@gmail.com',
            'Téléphone : +213 555 123 456',
            'Localisation : Algérie',
            '[ADRESSE POSTALE — Insérez l\'adresse postale si applicable.]',
          ]}
        />
      </LegalSection>
    </LegalLayout>
  )
}

function TermsContentAR() {
  return (
    <LegalLayout
      title="شروط الخدمة"
      subtitle="الشروط التي تحكم استخدام موقع وخدمات استوديو مسار الرقمي."
      lastUpdated="آخر تحديث: [التاريخ — يُرجى المراجعة والتحديث بانتظام]"
    >
      <LegalNotice>
        <strong>ملاحظة:</strong> يحتوي نموذج شروط الخدمة هذا على عناصر نائبة بين قوسين مربعين <strong>[ ]</strong>. يجب على مالك الموقع استكمال هذه العناصر. هذا المستند ليس نصيحة قانونية. استشر محترفاً قانونياً مؤهلاً.
      </LegalNotice>

      <LegalSection title="1. المقدمة والقبول">
        <LegalParagraph>
          مرحباً بك في <strong>استوديو مسار الرقمي</strong>. من خلال الوصول إلى موقعنا على <strong>[رابط الموقع]</strong> أو استخدام أي من خدماتنا، فإنك توافق على الالتزام بشروط الخدمة هذه. إذا كنت لا توافق على أي جزء من هذه الشروط، يجب عليك عدم استخدام موقعنا أو خدماتنا.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2. الخدمات">
        <LegalParagraph>
          يقدم استوديو مسار الرقمي خدمات رقمية تشمل على سبيل المثال لا الحصر:
        </LegalParagraph>
        <LegalList
          items={[
            'تطوير وتصميم المواقع الإلكترونية',
            'تطوير تطبيقات الويب والجوال',
            'الهوية البصرية والتصميم الجرافيكي',
            'تصميم واجهات المستخدم وتجربة المستخدم',
            'أتمتة العمليات التجارية',
            'حلول الذكاء الاصطناعي',
            'خدمات الاستشارات والاستراتيجية',
            '[خدمات إضافية — قائمة بأي خدمات أخرى مقدمة.]',
          ]}
        />
        <LegalParagraph>
          سيتم تحديد نطاق العمل والتسليمات والجدول الزمني والرسوم لكل مشروع في عرض مشروع أو اتفاقية خدمة منفصلة موقعة من الطرفين.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="3. مسؤوليات العميل">
        <LegalParagraph>
          كعميل لاستوديو مسار الرقمي، توافق على:
        </LegalParagraph>
        <LegalList
          items={[
            'تقديم معلومات ومواد دقيقة وكاملة وفي الوقت المناسب اللازمة للمشروع.',
            'الرد بسرعة على طلبات الملاحظات والموافقات والقرارات لتجنب تأخير المشروع.',
            'التأكد من أن لديك الحق القانوني في استخدام أي محتوى أو ملكية فكرية تقدمها لنا.',
            'القيام بالمدفوعات في الوقت المحدد وفقاً لما هو منصوص عليه في اتفاقية المشروع.',
            'الامتثال لجميع القوانين واللوائح المعمول بها.',
          ]}
        />
      </LegalSection>

      <LegalSection title="4. المدفوعات والرسوم">
        <LegalSubsection title="4.1 الأسعار">
          <LegalParagraph>
            أسعارنا موضحة في قسم الأسعار على موقعنا وفي اتفاقيات المشاريع الفردية. جميع الأسعار بالدولار الأمريكي [أو العملة المحددة] ما لم يُذكر خلاف ذلك، وهي خالصة من الضرائب المطبقة.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="4.2 شروط الدفع">
          <LegalParagraph>
            نطلب عادةً دفعة مقدمة بنسبة [نسبة الدفعة المقدمة — مثلاً 50%] قبل بدء العمل، على أن يكون الرصيد المتبقي مستحقاً عند الانتهاء أو وفقاً للمراحل المتفق عليها.
          </LegalParagraph>
        </LegalSubsection>

        <LegalParagraph>
          <strong>[حدد العملة ونسبة الدفعة المقدمة وشروط غرامة التأخير.]</strong>
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="5. الملكية الفكرية">
        <LegalSubsection title="5.1 ملكية التسليمات">
          <LegalParagraph>
            بعد السداد الكامل لجميع الرسوم المستحقة، نتنازل للعميل عن جميع الحقوق في التسليمات النهائية التي تم إنشاؤها خصيصاً للمشروع، باستثناء المواد والأدوات والأطر الموجودة مسبقاً.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="5.2 حق العرض في المحفظة">
          <LegalParagraph>
            نحتفظ بالحق في عرض المشاريع المكتملة في محفظتنا ودراسات الحالة، ما لم يتم الاتفاق على خلاف ذلك كتابةً.
          </LegalParagraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="6. الضمانات">
        <LegalParagraph>
          نضمن أن خدماتنا سيتم تنفيذها بطريقة مهنية وفقاً لمعايير الصناعة. لمدة [فترة الضمان — مثلاً 30 يوماً] من اكتمال المشروع، سنقوم بإصلاح أي عيوب مادية في التسليمات دون تكلفة إضافية.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="7. تحديد المسؤولية">
        <LegalParagraph>
          إلى أقصى حد يسمح به القانون المعمول به، لن يكون استوديو مسار الرقمي مسؤولاً عن أي أضرار غير مباشرة أو تبعية. لن يتجاوز إجمالي مسؤوليتنا إجمالي المبلغ المدفوع من قبلك في [فترة المسؤولية — مثلاً 12 شهراً] السابقة للمطالبة.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="8. الإنهاء">
        <LegalParagraph>
          يحق لأي من الطرفين إنهاء اتفاقية المشروع بإشعار خطي مدته [فترة الإشعار — مثلاً 30 يوماً] في حال حدوث خرق جوهري. يمكن للعميل إنهاء الاتفاقية في أي وقت، ولكن يجب أن يدفع مقابل جميع الأعمال المنجزة حتى تاريخ الإنهاء.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="9. القانون الحاكم">
        <LegalParagraph>
          تخضع هذه الشروط وتفسر وفقاً لقوانين <strong>[الاختصاص القضائي — مثلاً الجزائر]</strong>. سيتم أولاً محاولة حل أي نزاع عن طريق التفاوض، ثم تقديمه إلى <strong>[طريقة حل النزاعات]</strong>.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="10. اتصل بنا">
        <LegalParagraph>
          للاستفسار عن هذه الشروط، يُرجى الاتصال بنا:
        </LegalParagraph>
        <LegalList
          items={[
            'البريد الإلكتروني: massar.digital.studio@gmail.com',
            'الهاتف: +213 555 123 456',
            'الموقع: الجزائر',
            '[العنوان البريدي — أدخل العنوان البريدي إذا كان ذلك مناسباً.]',
          ]}
        />
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
