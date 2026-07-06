import { useTranslation } from 'react-i18next'
import { Helmet } from 'react-helmet-async'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { FloatingContact } from '@/components/layout/FloatingContact'
import { LegalLayout, LegalSection, LegalSubsection, LegalParagraph, LegalList, LegalNotice } from './LegalLayout'
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
      subtitle="How Massar Digital Studio collects, uses, and protects your personal information."
      lastUpdated="Last updated: [DATE — REVIEW AND UPDATE REGULARLY]"
    >
      <LegalNotice>
        <strong>Note:</strong> This Privacy Policy template contains placeholders marked with square brackets <strong>[ ]</strong>. These must be completed by the website owner with accurate business-specific information. This document is not legal advice. Consult a qualified legal professional for compliance with applicable laws, including but not limited to the General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), and Algerian Law 18-07 on the Protection of Personal Data.
      </LegalNotice>

      <LegalSection title="1. Who We Are">
        <LegalParagraph>
          <strong>Massar Digital Studio</strong> (referred to as "we," "us," or "our") is a digital agency based in Algeria. Our registered email address is <strong>massar.digital.studio@gmail.com</strong>. When you use our website or services, we act as a data controller with respect to your personal information.
        </LegalParagraph>
        <LegalParagraph>
          <strong>[COMPANY NAME — Insert official legal entity name, registration number, and registered address if applicable.]</strong>
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2. Information We Collect">
        <LegalParagraph>
          We collect information you provide directly to us, as well as information collected automatically when you use our website.
        </LegalParagraph>

        <LegalSubsection title="2.1 Information You Provide to Us">
          <LegalParagraph>
            When you fill out our contact form, we collect the following personal information:
          </LegalParagraph>
          <LegalList
            items={[
              'Full name',
              'Work email address',
              'Company name',
              'Company website URL',
              'Service of interest',
              'Estimated budget range',
              'Project description and details',
            ]}
          />
          <LegalParagraph>
            If you communicate with us via email (massar.digital.studio@gmail.com), WhatsApp, or social media platforms, we may retain the content of those communications along with your contact information.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="2.2 Information Collected Automatically">
          <LegalParagraph>
            When you visit our website, we may automatically collect certain technical information, including:
          </LegalParagraph>
          <LegalList
            items={[
              'IP address',
              'Browser type and version',
              'Device type and operating system',
              'Pages visited and time spent on each page',
              'Referring website or source',
              'Date and time of visit',
            ]}
          />
          <LegalParagraph>
            This information is collected using cookies and similar tracking technologies. For more details, please see our <a href="#/cookies" className="text-[#8B5CF6] underline underline-offset-2 hover:text-[#7C3AED]">Cookie Policy</a>.
          </LegalParagraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="3. How We Use Your Information">
        <LegalParagraph>
          We use the information we collect for the following purposes:
        </LegalParagraph>
        <LegalList
          items={[
            'To respond to your inquiries and project requests — we use your contact form submissions to understand your needs and provide tailored proposals within our stated response time.',
            'To communicate with you about your project, our services, and related business matters.',
            'To improve our website, services, and user experience based on aggregated usage data.',
            'To comply with legal obligations and protect our legal rights.',
            'To send occasional business communications if you have consented to receive them (you may opt out at any time).',
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Legal Basis for Processing (GDPR)">
        <LegalParagraph>
          If you are located in the European Economic Area (EEA) or the United Kingdom, our processing of your personal data is based on the following legal grounds under the GDPR:
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>Consent:</strong> Where you have given clear consent for us to process your personal data for a specific purpose (e.g., receiving marketing communications).',
            '<strong>Contractual necessity:</strong> Processing necessary to take steps at your request prior to entering into a contract, or to perform a contract we have with you.',
            '<strong>Legitimate interests:</strong> Processing necessary for our legitimate business interests, such as responding to inquiries and improving our services, provided your rights do not override those interests.',
            '<strong>Legal obligation:</strong> Processing necessary to comply with applicable legal or regulatory obligations.',
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Cookies and Tracking Technologies">
        <LegalParagraph>
          Our website uses cookies and similar technologies to enhance functionality, analyze usage, and improve your experience. We categorize cookies as follows:
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>Essential Cookies:</strong> Required for the basic operation of our website. These cannot be disabled.',
            '<strong>Analytics Cookies:</strong> Help us understand how visitors interact with our website by collecting anonymous usage data.',
            '<strong>Functional Cookies:</strong> Remember your preferences and language settings to provide a personalized experience.',
            '<strong>Marketing Cookies:</strong> Used to track your browsing habits across websites for targeted advertising purposes.',
          ]}
        />
        <LegalParagraph>
          For detailed information about the cookies we use, please see our <a href="#/cookies" className="text-[#8B5CF6] underline underline-offset-2 hover:text-[#7C3AED]">Cookie Policy</a>.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="6. Third-Party Services">
        <LegalParagraph>
          We use the following third-party services that may process your personal data:
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>Google Fonts</strong> — Used for typography on our website. Google may collect usage data in accordance with their privacy policy.',
            '<strong>Calendly</strong> — Used for scheduling discovery calls. If you book a call, your name, email, and chosen time slot will be processed by Calendly.',
            '<strong>WhatsApp</strong> — Used for business communication. If you contact us via WhatsApp, your phone number and messages will be processed by Meta Platforms.',
            '<strong>Instagram</strong> — Used for social media presence. Interactions on our Instagram page are subject to Meta\'s privacy policy.',
            '<strong>LinkedIn</strong> — Used for professional networking. Interactions on our LinkedIn page are subject to LinkedIn\'s privacy policy.',
            '<strong>[ANALYTICS PROVIDER — Insert name of analytics service, e.g., Google Analytics, Plausible, Fathom, if/when implemented. Include link to their privacy policy.]</strong>',
            '<strong>[EMAIL SERVICE PROVIDER — Insert name of email service used for business communications, if applicable.]</strong>',
            '<strong>[HOSTING PROVIDER — Insert name of web hosting provider.]</strong>',
            '<strong>[ADDITIONAL THIRD-PARTY SERVICES — List any additional third-party services integrated with the website.]</strong>',
          ]}
        />
        <LegalParagraph>
          Each third-party service operates under its own privacy policy. We encourage you to review their policies for complete information. We do not sell your personal information to third parties.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="7. Data Retention">
        <LegalParagraph>
          We retain your personal information only for as long as necessary to fulfill the purposes described in this policy, or as required by applicable law:
        </LegalParagraph>
        <LegalList
          items={[
            'Contact form submissions are retained for the duration of our business relationship, plus [RETENTION PERIOD — e.g., 2 years] for legitimate business purposes.',
            'Communications via email and messaging platforms are retained as needed for project delivery, support, and record-keeping.',
            'Analytics data is retained for [RETENTION PERIOD — e.g., 26 months] before being anonymized or deleted.',
            'If no business relationship is established, we will delete your personal data within [RETENTION PERIOD — e.g., 12 months] of the last contact.',
          ]}
        />
        <LegalParagraph>
          <strong>[SPECIFY ACTUAL RETENTION PERIODS BASED ON YOUR DATA PROCESSING ACTIVITIES.]</strong>
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="8. Data Security">
        <LegalParagraph>
          We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
        </LegalParagraph>
        <LegalList
          items={[
            'SSL/TLS encryption for data transmitted between your browser and our website.',
            'Secure, access-controlled storage for any personal data we process.',
            'Regular security assessments and updates to our systems.',
            'Limited access to personal data on a need-to-know basis.',
          ]}
        />
        <LegalParagraph>
          However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your personal data, we cannot guarantee its absolute security.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="9. Your Rights">
        <LegalParagraph>
          Depending on your jurisdiction, you may have the following rights regarding your personal information:
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>Right to Access:</strong> Request a copy of the personal data we hold about you.',
            '<strong>Right to Rectification:</strong> Request correction of inaccurate or incomplete data.',
            '<strong>Right to Erasure (Right to be Forgotten):</strong> Request deletion of your personal data under certain conditions.',
            '<strong>Right to Restrict Processing:</strong> Request restriction of processing your personal data.',
            '<strong>Right to Data Portability:</strong> Request transfer of your data to another service provider in a structured, commonly used format.',
            '<strong>Right to Object:</strong> Object to processing of your personal data for direct marketing or legitimate interests.',
            '<strong>Right to Withdraw Consent:</strong> Withdraw your consent at any time where processing is based on consent.',
            '<strong>Right to Lodge a Complaint:</strong> File a complaint with your local data protection authority.',
          ]}
        />
        <LegalParagraph>
          To exercise any of these rights, please contact us at <strong>massar.digital.studio@gmail.com</strong>. We will respond to your request within the timeframe required by applicable law (typically 30 days). We may need to verify your identity before processing your request.
        </LegalParagraph>
        <LegalParagraph>
          <strong>For residents of Algeria:</strong> You have rights under Law 18-07 on the Protection of Personal Data. You may contact the Autorité de Protection des Données à Caractère Personnel (APDCP) for further information or to file a complaint.
        </LegalParagraph>
        <LegalParagraph>
          <strong>For residents of the EEA/UK:</strong> You have the right to lodge a complaint with your local supervisory authority (e.g., the ICO in the UK, or the CNIL in France).
        </LegalParagraph>
        <LegalParagraph>
          <strong>For residents of California (CCPA):</strong> You have the right to know what personal information is collected, the right to request deletion, the right to opt out of the sale of personal information (we do not sell personal information), and the right to non-discrimination for exercising your CCPA rights.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="10. International Data Transfers">
        <LegalParagraph>
          Your personal data may be transferred to and processed in countries outside your country of residence, including Algeria. When we transfer your data to other jurisdictions, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses (SCCs) or other lawful transfer mechanisms, to protect your data in accordance with applicable data protection laws.
        </LegalParagraph>
        <LegalParagraph>
          <strong>[SPECIFY COUNTRIES WHERE DATA MAY BE TRANSFERRED AND THE SAFEGUARDS IN PLACE.]</strong>
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="11. Children's Privacy">
        <LegalParagraph>
          Our services are not directed to individuals under the age of 16 (or the applicable age of consent in your jurisdiction). We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us immediately, and we will take steps to delete such information.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="12. Changes to This Policy">
        <LegalParagraph>
          We may update this Privacy Policy from time to time to reflect changes in our practices, legal requirements, or operational needs. When we make material changes, we will notify you by updating the "Last updated" date at the top of this policy and may provide additional notice (such as a banner on our website).
        </LegalParagraph>
        <LegalParagraph>
          We encourage you to review this policy periodically to stay informed about how we protect your information.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="13. Contact Us">
        <LegalParagraph>
          If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:
        </LegalParagraph>
        <LegalList
          items={[
            'Email: massar.digital.studio@gmail.com',
            'Phone: +213 699 284 128',
            'Location: Algeria',
            '[MAILING ADDRESS — Insert physical mailing address if applicable.]',
            '[DATA PROTECTION OFFICER CONTACT — Insert DPO contact information if applicable.]',
          ]}
        />
      </LegalSection>
    </LegalLayout>
  )
}

function PrivacyContentFR() {
  return (
    <LegalLayout
      title="Politique de Confidentialité"
      subtitle="Comment Massar Digital Studio collecte, utilise et protège vos informations personnelles."
      lastUpdated="Dernière mise à jour : [DATE — RÉVISER ET METTRE À JOUR RÉGULIÈREMENT]"
    >
      <LegalNotice>
        <strong>Remarque :</strong> Ce modèle de politique de confidentialité contient des espaces réservés entre crochets <strong>[ ]</strong>. Ceux-ci doivent être complétés par le propriétaire du site avec des informations précises et spécifiques à l'entreprise. Ce document ne constitue pas un avis juridique. Consultez un professionnel du droit qualifié pour assurer la conformité avec les lois applicables, y compris mais sans s'y limiter le Règlement Général sur la Protection des Données (RGPD), le California Consumer Privacy Act (CCPA) et la Loi algérienne 18-07 relative à la Protection des Données à Caractère Personnel.
      </LegalNotice>

      <LegalSection title="1. Qui Sommes-Nous">
        <LegalParagraph>
          <strong>Massar Digital Studio</strong> (désigné par « nous », « notre » ou « nos ») est une agence digitale basée en Algérie. Notre adresse e-mail enregistrée est <strong>massar.digital.studio@gmail.com</strong>. Lorsque vous utilisez notre site web ou nos services, nous agissons en tant que responsable du traitement de vos informations personnelles.
        </LegalParagraph>
        <LegalParagraph>
          <strong>[NOM DE L'ENTREPRISE — Insérez le nom légal officiel, le numéro d'enregistrement et l'adresse siège social si applicable.]</strong>
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2. Informations Que Nous Collectons">
        <LegalParagraph>
          Nous collectons les informations que vous nous fournissez directement, ainsi que les informations collectées automatiquement lorsque vous utilisez notre site web.
        </LegalParagraph>

        <LegalSubsection title="2.1 Informations Que Vous Nous Fournissez">
          <LegalParagraph>
            Lorsque vous remplissez notre formulaire de contact, nous collectons les informations personnelles suivantes :
          </LegalParagraph>
          <LegalList
            items={[
              'Nom complet',
              'Adresse e-mail professionnelle',
              'Nom de l\'entreprise',
              'URL du site web de l\'entreprise',
              'Service d\'intérêt',
              'Budget estimé',
              'Description et détails du projet',
            ]}
          />
          <LegalParagraph>
            Si vous communiquez avec nous par e-mail (massar.digital.studio@gmail.com), WhatsApp ou via les réseaux sociaux, nous pouvons conserver le contenu de ces communications ainsi que vos coordonnées.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="2.2 Informations Collectées Automatiquement">
          <LegalParagraph>
            Lorsque vous visitez notre site web, nous pouvons collecter automatiquement certaines informations techniques, notamment :
          </LegalParagraph>
          <LegalList
            items={[
              'Adresse IP',
              'Type et version du navigateur',
              'Type d\'appareil et système d\'exploitation',
              'Pages visitées et temps passé sur chaque page',
              'Site web ou source de référence',
              'Date et heure de la visite',
            ]}
          />
          <LegalParagraph>
            Ces informations sont collectées à l'aide de cookies et de technologies de suivi similaires. Pour plus de détails, veuillez consulter notre <a href="#/cookies" className="text-[#8B5CF6] underline underline-offset-2 hover:text-[#7C3AED]">Politique de Cookies</a>.
          </LegalParagraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="3. Comment Nous Utilisons Vos Informations">
        <LegalParagraph>
          Nous utilisons les informations que nous collectons aux fins suivantes :
        </LegalParagraph>
        <LegalList
          items={[
            'Répondre à vos demandes de renseignements et demandes de projet — nous utilisons vos soumissions de formulaire de contact pour comprendre vos besoins et fournir des propositions adaptées.',
            'Communiquer avec vous au sujet de votre projet, de nos services et des questions commerciales connexes.',
            'Améliorer notre site web, nos services et l\'expérience utilisateur sur la base de données d\'utilisation agrégées.',
            'Respecter les obligations légales et protéger nos droits légaux.',
            'Envoyer des communications commerciales occasionnelles si vous y avez consenti (vous pouvez vous désabonner à tout moment).',
          ]}
        />
      </LegalSection>

      <LegalSection title="4. Base Juridique du Traitement (RGPD)">
        <LegalParagraph>
          Si vous résidez dans l'Espace Économique Européen (EEE) ou au Royaume-Uni, notre traitement de vos données personnelles est basé sur les fondements juridiques suivants en vertu du RGPD :
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>Consentement :</strong> Lorsque vous avez donné votre consentement explicite pour que nous traitions vos données personnelles à des fins spécifiques.',
            '<strong>Nécessité contractuelle :</strong> Traitement nécessaire à la prise de mesures à votre demande avant la conclusion d\'un contrat.',
            '<strong>Intérêts légitimes :</strong> Traitement nécessaire à nos intérêts commerciaux légitimes, à condition que vos droits ne prévalent pas sur ces intérêts.',
            '<strong>Obligation légale :</strong> Traitement nécessaire pour respecter les obligations légales ou réglementaires applicables.',
          ]}
        />
      </LegalSection>

      <LegalSection title="5. Cookies et Technologies de Suivi">
        <LegalParagraph>
          Notre site web utilise des cookies et des technologies similaires pour améliorer les fonctionnalités, analyser l'utilisation et améliorer votre expérience. Nous catégorisons les cookies comme suit :
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>Cookies Essentiels :</strong> Requis pour le fonctionnement de base de notre site web. Ils ne peuvent pas être désactivés.',
            '<strong>Cookies Analytiques :</strong> Nous aident à comprendre comment les visiteurs interagissent avec notre site en collectant des données d\'utilisation anonymes.',
            '<strong>Cookies Fonctionnels :</strong> Mémorisent vos préférences et paramètres linguistiques pour offrir une expérience personnalisée.',
            '<strong>Cookies Marketing :</strong> Utilisés pour suivre vos habitudes de navigation sur les sites web à des fins publicitaires ciblées.',
          ]}
        />
        <LegalParagraph>
          Pour des informations détaillées sur les cookies que nous utilisons, veuillez consulter notre <a href="#/cookies" className="text-[#8B5CF6] underline underline-offset-2 hover:text-[#7C3AED]">Politique de Cookies</a>.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="6. Services Tiers">
        <LegalParagraph>
          Nous utilisons les services tiers suivants qui peuvent traiter vos données personnelles :
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>Google Fonts</strong> — Utilisé pour la typographie sur notre site web. Google peut collecter des données d\'utilisation conformément à sa politique de confidentialité.',
            '<strong>Calendly</strong> — Utilisé pour la planification des appels de découverte. Si vous réservez un appel, vos nom, e-mail et créneau horaire seront traités par Calendly.',
            '<strong>WhatsApp</strong> — Utilisé pour la communication professionnelle. Si vous nous contactez via WhatsApp, votre numéro de téléphone et vos messages seront traités par Meta Platforms.',
            '<strong>Instagram</strong> — Utilisé pour la présence sur les réseaux sociaux. Les interactions sur notre page Instagram sont soumises à la politique de confidentialité de Meta.',
            '<strong>LinkedIn</strong> — Utilisé pour le réseautage professionnel. Les interactions sur notre page LinkedIn sont soumises à la politique de confidentialité de LinkedIn.',
            '<strong>[FOURNISSEUR D ANALYTIQUE — Inserez le nom du service d analytics, ex. Google Analytics, Plausible, Fathom, si applicable.]</strong>',
            '<strong>[FOURNISSEUR DE SERVICES E-MAIL — Insérez le nom du service de messagerie utilisé.]</strong>',
            '<strong>[HÉBERGEUR — Insérez le nom de l\'hébergeur web.]</strong>',
            '<strong>[AUTRES SERVICES TIERS — Listez tout autre service tiers intégré au site.]</strong>',
          ]}
        />
        <LegalParagraph>
          Chaque service tiers fonctionne sous sa propre politique de confidentialité. Nous vous encourageons à consulter leurs politiques pour des informations complètes. Nous ne vendons pas vos informations personnelles à des tiers.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="7. Conservation des Données">
        <LegalParagraph>
          Nous conservons vos informations personnelles uniquement pendant la durée nécessaire pour atteindre les objectifs décrits dans cette politique, ou comme requis par la loi applicable :
        </LegalParagraph>
        <LegalList
          items={[
            'Les soumissions de formulaire de contact sont conservées pendant la durée de notre relation commerciale, plus [PÉRIODE DE CONSERVATION — ex. 2 ans] pour des besoins commerciaux légitimes.',
            'Les communications par e-mail et messagerie sont conservées selon les besoins pour la livraison du projet, le support et la tenue de registres.',
            'Les données d\'analyse sont conservées pendant [PÉRIODE DE CONSERVATION — ex. 26 mois] avant d\'être anonymisées ou supprimées.',
            'Si aucune relation commerciale n\'est établie, nous supprimerons vos données personnelles dans un délai de [PÉRIODE DE CONSERVATION — ex. 12 mois] après le dernier contact.',
          ]}
        />
        <LegalParagraph>
          <strong>[SPÉCIFIEZ LES PÉRIODES DE CONSERVATION RÉELLES EN FONCTION DE VOS ACTIVITÉS DE TRAITEMENT DE DONNÉES.]</strong>
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="8. Sécurité des Données">
        <LegalParagraph>
          Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos informations personnelles contre tout accès, modification, divulgation ou destruction non autorisés. Ces mesures comprennent :
        </LegalParagraph>
        <LegalList
          items={[
            'Chiffrement SSL/TLS pour les données transmises entre votre navigateur et notre site web.',
            'Stockage sécurisé et contrôlé pour toutes les données personnelles que nous traitons.',
            'Évaluations de sécurité et mises à jour régulières de nos systèmes.',
            'Accès limité aux données personnelles sur la base du besoin d\'en connaître.',
          ]}
        />
        <LegalParagraph>
          Cependant, aucune méthode de transmission sur Internet ou de stockage électronique n'est totalement sécurisée. Bien que nous nous efforcions de protéger vos données personnelles, nous ne pouvons garantir leur sécurité absolue.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="9. Vos Droits">
        <LegalParagraph>
          Selon votre juridiction, vous pouvez disposer des droits suivants concernant vos informations personnelles :
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>Droit d\'accès :</strong> Demander une copie des données personnelles que nous détenons vous concernant.',
            '<strong>Droit de rectification :</strong> Demander la correction de données inexactes ou incomplètes.',
            '<strong>Droit à l\'effacement (droit à l\'oubli) :</strong> Demander la suppression de vos données personnelles sous certaines conditions.',
            '<strong>Droit à la limitation du traitement :</strong> Demander la limitation du traitement de vos données personnelles.',
            '<strong>Droit à la portabilité des données :</strong> Demander le transfert de vos données à un autre prestataire de services.',
            '<strong>Droit d\'opposition :</strong> Vous opposer au traitement de vos données personnelles à des fins de marketing direct ou d\'intérêts légitimes.',
            '<strong>Droit de retirer votre consentement :</strong> Retirer votre consentement à tout moment lorsque le traitement est basé sur le consentement.',
            '<strong>Droit d\'introduire une réclamation :</strong> Déposer une plainte auprès de votre autorité locale de protection des données.',
          ]}
        />
        <LegalParagraph>
          Pour exercer l'un de ces droits, veuillez nous contacter à <strong>massar.digital.studio@gmail.com</strong>. Nous répondrons à votre demande dans les délais requis par la loi applicable (généralement 30 jours). Nous pourrions avoir besoin de vérifier votre identité avant de traiter votre demande.
        </LegalParagraph>
        <LegalParagraph>
          <strong>Pour les résidents algériens :</strong> Vous disposez de droits en vertu de la Loi 18-07 relative à la Protection des Données à Caractère Personnel. Vous pouvez contacter l'Autorité de Protection des Données à Caractère Personnel (APDCP) pour plus d'informations ou pour déposer une réclamation.
        </LegalParagraph>
        <LegalParagraph>
          <strong>Pour les résidents de l'EEE/Royaume-Uni :</strong> Vous avez le droit de déposer une réclamation auprès de votre autorité de contrôle locale (ex. la CNIL en France, l'ICO au Royaume-Uni).
        </LegalParagraph>
        <LegalParagraph>
          <strong>Pour les résidents de Californie (CCPA) :</strong> Vous avez le droit de savoir quelles informations personnelles sont collectées, le droit de demander la suppression, le droit de refuser la vente d'informations personnelles et le droit à la non-discrimination pour l'exercice de vos droits CCPA.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="10. Transferts Internationaux de Données">
        <LegalParagraph>
          Vos données personnelles peuvent être transférées et traitées dans des pays autres que votre pays de résidence, y compris l'Algérie. Lorsque nous transférons vos données vers d'autres juridictions, nous nous assurons que des garanties appropriées sont en place, telles que les Clauses Contractuelles Types (CCT) ou d'autres mécanismes de transfert licites.
        </LegalParagraph>
        <LegalParagraph>
          <strong>[SPÉCIFIEZ LES PAYS VERS LESQUELS LES DONNÉES PEUVENT ÊTRE TRANSFÉRÉES ET LES GARANTIES EN PLACE.]</strong>
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="11. Confidentialité des Enfants">
        <LegalParagraph>
          Nos services ne sont pas destinés aux personnes de moins de 16 ans (ou l'âge de consentement applicable dans votre juridiction). Nous ne collectons pas sciemment d'informations personnelles auprès d'enfants. Si vous pensez qu'un enfant nous a fourni des données personnelles, veuillez nous contacter immédiatement.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="12. Modifications de Cette Politique">
        <LegalParagraph>
          Nous pouvons mettre à jour cette politique de confidentialité de temps à autre pour refléter les changements dans nos pratiques, les exigences légales ou les besoins opérationnels. Lorsque nous apportons des modifications importantes, nous vous en informerons en mettant à jour la date de « dernière mise à jour » en haut de cette politique.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="13. Nous Contacter">
        <LegalParagraph>
          Si vous avez des questions, des préoccupations ou des demandes concernant cette politique de confidentialité ou nos pratiques en matière de données, veuillez nous contacter :
        </LegalParagraph>
        <LegalList
          items={[
            'E-mail : massar.digital.studio@gmail.com',
            'Téléphone : +213 699 284 128',
            'Localisation : Algérie',
            '[ADRESSE POSTALE — Insérez l\'adresse postale si applicable.]',
            '[CONTACT DU DÉLÉGUÉ À LA PROTECTION DES DONNÉES — Insérez les coordonnées du DPO si applicable.]',
          ]}
        />
      </LegalSection>
    </LegalLayout>
  )
}

function PrivacyContentAR() {
  return (
    <LegalLayout
      title="سياسة الخصوصية"
      subtitle="كيف يقوم استوديو مسار الرقمي بجمع واستخدام وحماية معلوماتك الشخصية."
      lastUpdated="آخر تحديث: [التاريخ — يُرجى المراجعة والتحديث بانتظام]"
    >
      <LegalNotice>
        <strong>ملاحظة:</strong> يحتوي نموذج سياسة الخصوصية هذا على عناصر نائبة بين قوسين مربعين <strong>[ ]</strong>. يجب على مالك الموقع استكمال هذه العناصر بمعلومات دقيقة ومحددة. هذا المستند ليس نصيحة قانونية. استشر محترفاً قانونياً مؤهلاً للامتثال للقوانين المعمول بها، بما في ذلك على سبيل المثال لا الحصر اللائحة العامة لحماية البيانات (GDPR) وقانون حماية الخصوصية في كاليفورنيا (CCPA) والقانون الجزائري 18-07 المتعلق بحماية البيانات الشخصية.
      </LegalNotice>

      <LegalSection title="1. من نحن">
        <LegalParagraph>
          <strong>استوديو مسار الرقمي</strong> (يشار إليه بـ «نحن» أو «لنا») هو وكالة رقمية مقرها الجزائر. عنوان بريدنا الإلكتروني المسجل هو <strong>massar.digital.studio@gmail.com</strong>. عند استخدامك لموقعنا الإلكتروني أو خدماتنا، نعمل كمراقب للبيانات فيما يتعلق بمعلوماتك الشخصية.
        </LegalParagraph>
        <LegalParagraph>
          <strong>[اسم الشركة — أدخل الاسم القانوني الرسمي ورقم التسجيل والعنوان المسجل إذا كان ذلك مناسباً.]</strong>
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="2. المعلومات التي نجمعها">
        <LegalParagraph>
          نجمع المعلومات التي تقدمها لنا مباشرة، بالإضافة إلى المعلومات التي يتم جمعها تلقائياً عند استخدامك لموقعنا.
        </LegalParagraph>

        <LegalSubsection title="2.1 المعلومات التي تقدمها لنا">
          <LegalParagraph>
            عند ملء نموذج الاتصال الخاص بنا، نجمع المعلومات الشخصية التالية:
          </LegalParagraph>
          <LegalList
            items={[
              'الاسم الكامل',
              'البريد الإلكتروني للعمل',
              'اسم الشركة',
              'رابط موقع الشركة الإلكتروني',
              'الخدمة المطلوبة',
              'نطاق الميزانية التقديري',
              'وصف المشروع وتفاصيله',
            ]}
          />
          <LegalParagraph>
            إذا تواصلت معنا عبر البريد الإلكتروني أو WhatsApp أو منصات التواصل الاجتماعي، قد نحتفظ بمحتوى تلك الاتصالات بالإضافة إلى معلومات الاتصال الخاصة بك.
          </LegalParagraph>
        </LegalSubsection>

        <LegalSubsection title="2.2 المعلومات التي يتم جمعها تلقائياً">
          <LegalParagraph>
            عند زيارتك لموقعنا، قد نقوم تلقائياً بجمع بعض المعلومات التقنية، بما في ذلك:
          </LegalParagraph>
          <LegalList
            items={[
              'عنوان IP',
              'نوع المتصفح والإصدار',
              'نوع الجهاز ونظام التشغيل',
              'الصفحات التي تمت زيارتها والوقت المستغرق في كل صفحة',
              'الموقع الإلكتروني أو المصدر المحيل',
              'تاريخ ووقت الزيارة',
            ]}
          />
          <LegalParagraph>
            يتم جمع هذه المعلومات باستخدام ملفات تعريف الارتباط (كوكيز) وتقنيات تتبع مماثلة. لمزيد من التفاصيل، يُرجى الاطلاع على <a href="#/cookies" className="text-[#8B5CF6] underline underline-offset-2 hover:text-[#7C3AED]">سياسة ملفات تعريف الارتباط</a> الخاصة بنا.
          </LegalParagraph>
        </LegalSubsection>
      </LegalSection>

      <LegalSection title="3. كيف نستخدم معلوماتك">
        <LegalParagraph>
          نستخدم المعلومات التي نجمعها للأغراض التالية:
        </LegalParagraph>
        <LegalList
          items={[
            'الرد على استفساراتك وطلبات المشاريع — نستخدم تقديمات نموذج الاتصال لفهم احتياجاتك وتقديم عروض مخصصة.',
            'التواصل معك بشأن مشروعك وخدماتنا والمسائل التجارية ذات الصلة.',
            'تحسين موقعنا وخدماتنا وتجربة المستخدم بناءً على بيانات الاستخدام المجمعة.',
            'الامتثال للالتزامات القانونية وحماية حقوقنا القانونية.',
            'إرسال اتصالات تجارية عرضية إذا وافقت على ذلك (يمكنك إلغاء الاشتراك في أي وقت).',
          ]}
        />
      </LegalSection>

      <LegalSection title="4. الأساس القانوني للمعالجة (GDPR)">
        <LegalParagraph>
          إذا كنت مقيماً في المنطقة الاقتصادية الأوروبية (EEA) أو المملكة المتحدة، فإن معالجتنا لبياناتك الشخصية تستند إلى الأسس القانونية التالية بموجب اللائحة العامة لحماية البيانات (GDPR):
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>الموافقة:</strong> عندما تمنح موافقة صريحة لنا لمعالجة بياناتك الشخصية لغرض محدد.',
            '<strong>الضرورة التعاقدية:</strong> المعالجة اللازمة لاتخاذ خطوات بناءً على طلبك قبل إبرام عقد.',
            '<strong>المصالح المشروعة:</strong> المعالجة اللازمة لمصالحنا التجارية المشروعة، بشرط ألا تتجاوز حقوقك تلك المصالح.',
            '<strong>الالتزام القانوني:</strong> المعالجة اللازمة للامتثال للالتزامات القانونية أو التنظيمية السارية.',
          ]}
        />
      </LegalSection>

      <LegalSection title="5. ملفات تعريف الارتباط (الكوكيز) وتقنيات التتبع">
        <LegalParagraph>
          يستخدم موقعنا ملفات تعريف الارتباط وتقنيات مماثلة لتحسين الوظائف وتحليل الاستخدام وتحسين تجربتك. نصّنف ملفات تعريف الارتباط على النحو التالي:
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>الكوكيز الأساسية:</strong> مطلوبة للتشغيل الأساسي لموقعنا. لا يمكن تعطيلها.',
            '<strong>كوكيز التحليلات:</strong> تساعدنا في فهم كيفية تفاعل الزوار مع موقعنا من خلال جمع بيانات استخدام مجهولة.',
            '<strong>الكوكيز الوظيفية:</strong> تتذكر تفضيلاتك وإعدادات اللغة لتوفير تجربة مخصصة.',
            '<strong>كوكيز التسويق:</strong> تُستخدم لتتبع عادات التصفح الخاصة بك عبر مواقع الويب لأغراض الإعلانات المستهدفة.',
          ]}
        />
        <LegalParagraph>
          للحصول على معلومات مفصلة حول ملفات تعريف الارتباط التي نستخدمها، يُرجى الاطلاع على <a href="#/cookies" className="text-[#8B5CF6] underline underline-offset-2 hover:text-[#7C3AED]">سياسة ملفات تعريف الارتباط</a> الخاصة بنا.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="6. خدمات الطرف الثالث">
        <LegalParagraph>
          نستخدم خدمات الطرف الثالث التالية التي قد تعالج بياناتك الشخصية:
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>Google Fonts</strong> — يُستخدم للخطوط على موقعنا. قد تجمع Google بيانات الاستخدام وفقاً لسياسة الخصوصية الخاصة بها.',
            '<strong>Calendly</strong> — يُستخدم لجدولة مكالمات الاكتشاف. إذا حجزت مكالمة، ستتم معالجة اسمك وبريدك الإلكتروني والوقت المختار بواسطة Calendly.',
            '<strong>WhatsApp</strong> — يُستخدم للتواصل التجاري. إذا اتصلت بنا عبر WhatsApp، ستتم معالجة رقم هاتفك ورسائلك بواسطة Meta Platforms.',
            '<strong>Instagram</strong> — يُستخدم للتواجد على وسائل التواصل الاجتماعي. التفاعلات على صفحتنا في Instagram تخضع لسياسة خصوصية Meta.',
            '<strong>LinkedIn</strong> — يُستخدم للتواصل المهني. التفاعلات على صفحتنا في LinkedIn تخضع لسياسة خصوصية LinkedIn.',
            '<strong>[مزود التحليلات — أدخل اسم خدمة التحليلات، مثل Google Analytics أو Plausible أو Fathom، إذا تم تنفيذها.]</strong>',
            '<strong>[مزود خدمة البريد الإلكتروني — أدخل اسم خدمة البريد المستخدمة للاتصالات التجارية.]</strong>',
            '<strong>[مزود الاستضافة — أدخل اسم مزود استضافة الويب.]</strong>',
            '<strong>[خدمات الطرف الثالث الإضافية — قائمة بأي خدمات طرف ثالث إضافية مدمجة مع الموقع.]</strong>',
          ]}
        />
        <LegalParagraph>
          تعمل كل خدمة من خدمات الطرف الثالث بموجب سياسة الخصوصية الخاصة بها. نشجعك على مراجعة سياساتها للحصول على معلومات كاملة. نحن لا نبيع معلوماتك الشخصية لأطراف ثالثة.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="7. الاحتفاظ بالبيانات">
        <LegalParagraph>
          نحتفظ بمعلوماتك الشخصية فقط للمدة اللازمة لتحقيق الأغراض الموضحة في هذه السياسة، أو حسبما يقتضيه القانون المعمول به:
        </LegalParagraph>
        <LegalList
          items={[
            'يتم الاحتفاظ بتقديمات نموذج الاتصال طوال مدة علاقتنا التجارية، بالإضافة إلى [فترة الاحتفاظ — مثلاً سنتان] لأغراض تجارية مشروعة.',
            'يتم الاحتفاظ بالاتصالات عبر البريد الإلكتروني ومنصات المراسلة حسب الحاجة لتسليم المشروع والدعم وحفظ السجلات.',
            'يتم الاحتفاظ ببيانات التحليلات لمدة [فترة الاحتفاظ — مثلاً 26 شهراً] قبل إخفاء الهوية أو الحذف.',
            'إذا لم يتم إنشاء علاقة تجارية، سنقوم بحذف بياناتك الشخصية في غضون [فترة الاحتفاظ — مثلاً 12 شهراً] من آخر اتصال.',
          ]}
        />
        <LegalParagraph>
          <strong>[حدد فترات الاحتفاظ الفعلية بناءً على أنشطة معالجة البيانات الخاصة بك.]</strong>
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="8. أمان البيانات">
        <LegalParagraph>
          ننفذ التدابير التقنية والتنظيمية المناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به أو التعديل أو الكشف أو الإتلاف. تشمل هذه التدابير:
        </LegalParagraph>
        <LegalList
          items={[
            'تشفير SSL/TLS للبيانات المنقولة بين متصفحك وموقعنا.',
            'تخزين آمن ومحكم الوصول لأي بيانات شخصية نعالجها.',
            'تقييمات أمنية وتحديثات منتظمة لأنظمتنا.',
            'وصول محدود للبيانات الشخصية على أساس الحاجة إلى المعرفة.',
          ]}
        />
        <LegalParagraph>
          ومع ذلك، لا توجد طريقة نقل عبر الإنترنت أو تخزين إلكتروني آمنة بنسبة 100٪. بينما نسعى لحماية بياناتك الشخصية، لا يمكننا ضمان أمنها المطلق.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="9. حقوقك">
        <LegalParagraph>
          حسب منطقتك القانونية، قد تتمتع بالحقوق التالية فيما يتعلق بمعلوماتك الشخصية:
        </LegalParagraph>
        <LegalList
          items={[
            '<strong>حق الوصول:</strong> طلب نسخة من البيانات الشخصية التي نحتفظ بها عنك.',
            '<strong>حق التصحيح:</strong> طلب تصحيح البيانات غير الدقيقة أو غير الكاملة.',
            '<strong>حق المحو (الحق في النسيان):</strong> طلب حذف بياناتك الشخصية في ظل ظروف معينة.',
            '<strong>حق تقييد المعالجة:</strong> طلب تقييد معالجة بياناتك الشخصية.',
            '<strong>حق قابلية نقل البيانات:</strong> طلب نقل بياناتك إلى مزود خدمة آخر بتنسيق منظم.',
            '<strong>حق الاعتراض:</strong> الاعتراض على معالجة بياناتك الشخصية للتسويق المباشر أو المصالح المشروعة.',
            '<strong>حق سحب الموافقة:</strong> سحب موافقتك في أي وقت عندما تعتمد المعالجة على الموافقة.',
            '<strong>حق تقديم شكوى:</strong> تقديم شكوى إلى سلطة حماية البيانات المحلية.',
          ]}
        />
        <LegalParagraph>
          لممارسة أي من هذه الحقوق، يُرجى الاتصال بنا على <strong>massar.digital.studio@gmail.com</strong>. سنرد على طلبك في غضون المهلة المطلوبة بموجب القانون المعمول به (عادة 30 يوماً). قد نحتاج إلى التحقق من هويتك قبل معالجة طلبك.
        </LegalParagraph>
        <LegalParagraph>
          <strong>للمقيمين في الجزائر:</strong> لديك حقوق بموجب القانون 18-07 المتعلق بحماية البيانات الشخصية. يمكنك الاتصال بسلطة حماية البيانات الشخصية (APDCP) لمزيد من المعلومات أو لتقديم شكوى.
        </LegalParagraph>
        <LegalParagraph>
          <strong>للمقيمين في المنطقة الاقتصادية الأوروبية / المملكة المتحدة:</strong> لديك الحق في تقديم شكوى إلى سلطة الرقابة المحلية (مثل ICO في المملكة المتحدة أو CNIL في فرنسا).
        </LegalParagraph>
        <LegalParagraph>
          <strong>للمقيمين في كاليفورنيا (CCPA):</strong> لديك الحق في معرفة المعلومات الشخصية التي يتم جمعها، والحق في طلب الحذف، والحق في إلغاء الاشتراك في بيع المعلومات الشخصية، والحق في عدم التمييز لممارسة حقوق CCPA الخاصة بك.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="10. نقل البيانات الدولي">
        <LegalParagraph>
          قد يتم نقل بياناتك الشخصية ومعالجتها في دول غير بلد إقامتك، بما في ذلك الجزائر. عند نقل بياناتك إلى ولايات قضائية أخرى، نضمن وجود ضمانات مناسبة مثل البنود التعاقدية القياسية (SCCs) أو آليات النقل القانونية الأخرى.
        </LegalParagraph>
        <LegalParagraph>
          <strong>[حدد الدول التي قد يتم نقل البيانات إليها والضمانات المطبقة.]</strong>
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="11. خصوصية الأطفال">
        <LegalParagraph>
          خدماتنا غير موجهة للأشخاص الذين تقل أعمارهم عن 16 عاماً. لا نقوم عن قصد بجمع معلومات شخصية من الأطفال. إذا كنت تعتقد أن طفلاً قد زودنا ببيانات شخصية، يُرجى الاتصال بنا فوراً.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="12. التغييرات في هذه السياسة">
        <LegalParagraph>
          قد نقوم بتحديث سياسة الخصوصية هذه من وقت لآخر لتعكس التغييرات في ممارساتنا أو المتطلبات القانونية أو الاحتياجات التشغيلية. عند إجراء تغييرات جوهرية، سنقوم بإشعارك بتحديث تاريخ «آخر تحديث» في أعلى هذه السياسة.
        </LegalParagraph>
      </LegalSection>

      <LegalSection title="13. اتصل بنا">
        <LegalParagraph>
          إذا كانت لديك أي أسئلة أو استفسارات أو طلبات بخصوص سياسة الخصوصية هذه أو ممارساتنا المتعلقة بالبيانات، يُرجى الاتصال بنا:
        </LegalParagraph>
        <LegalList
          items={[
            'البريد الإلكتروني: massar.digital.studio@gmail.com',
            'الهاتف: +213 699 284 128',
            'الموقع: الجزائر',
            '[العنوان البريدي — أدخل العنوان البريدي إذا كان ذلك مناسباً.]',
            '[معلومات الاتصال بمسؤول حماية البيانات — أدخل معلومات مسؤول حماية البيانات إذا كان ذلك مناسباً.]',
          ]}
        />
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
