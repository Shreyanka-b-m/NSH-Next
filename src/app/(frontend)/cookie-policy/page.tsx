import {
  Bold,
  LegalContact,
  LegalHeading,
  LegalItem,
  LegalLink,
  LegalList,
  LegalPage,
  LegalText,
  legalMetadata,
} from '@/components/legal/Legal'

export const metadata = legalMetadata(
  'Cookie Policy',
  'How Novel Signature Homes uses cookies and similar tracking technologies, and how you can manage them.',
)

export default function CookiePolicyPage() {
  return (
    <LegalPage title="Cookie Policy" effectiveDate="April 5, 2025">
      <LegalHeading>Introduction</LegalHeading>
      <LegalText>
        This Cookie Policy explains how <Bold>Novel Signature Homes</Bold> (“<Bold>we</Bold>” or “
        <Bold>us</Bold>”) uses cookies and similar tracking technologies on our Website (
        <Bold>novelsignaturehomes.com</Bold>). We aim to be transparent about our use of cookies,
        what information they collect, and your choices in managing them. This policy works in
        conjunction with our <LegalLink href="/privacy-policy">Privacy Policy</LegalLink>, which
        provides further details on how we use personal information. By using our Website, you
        consent to the use of cookies as described in this policy, unless you disable them via your
        browser or our cookie management tools.
      </LegalText>

      <LegalHeading>What Are Cookies?</LegalHeading>
      <LegalText>
        Cookies are small text files that are stored on your device (computer, smartphone, tablet)
        when you visit a website. Cookies serve a variety of functions, such as enabling certain
        website features, remembering your preferences, improving user experience, and providing
        analytics to website owners. Cookies can be “first-party” (set by our domain,
        novelsignaturehomes.com) or “third-party” (set by other domains when you access features
        integrated into our site, like analytics or social media plugins). Cookies may be
        session-based (temporary cookies that are deleted when you close your browser) or persistent
        (cookies that remain on your device for a set period or until you delete them).
      </LegalText>
      <LegalText>
        In addition to cookies, we may use related tracking technologies such as web beacons (clear
        GIFs), pixels, or tags. These often work in conjunction with cookies to help us understand
        user behavior, count users who have visited a page, or measure the effectiveness of
        marketing campaigns.
      </LegalText>

      <LegalHeading>How We Use Cookies</LegalHeading>
      <LegalText>
        We use cookies and similar technologies to ensure our Website functions correctly, to
        understand and improve user experience, and to support our marketing efforts. The types of
        cookies we use on novelsignaturehomes.com generally fall into the following categories:
      </LegalText>
      <LegalList>
        <LegalItem>
          <Bold>Strictly Necessary Cookies</Bold>: These cookies are essential for the basic
          operation of our Website. They enable core functionalities such as security, network
          management, and accessibility. For example, if our site has a login feature or a contact
          form, necessary cookies might be used to authenticate users or keep track of your input as
          you fill out forms. These cookies do not gather information about you for marketing or
          remember where you have been on the internet. Because the Website cannot function properly
          without these cookies, they are typically placed without requiring user consent (where
          allowed by law).
        </LegalItem>
        <LegalItem>
          <Bold>Functional (Personalization) Cookies</Bold>: Functional cookies allow our Website to
          remember choices you make and provide enhanced, more personalized features. For instance,
          if our site offers preferences like sorting property listings, saving favorite properties,
          or remembering your region or language selection, functional cookies would be used to
          recall those preferences on subsequent visits. They may also be used to provide services
          you have asked for, such as watching a video or using a chat feature. While these cookies
          are not essential, they enhance your experience. If you disable them, some functionality
          may become unavailable.
        </LegalItem>
        <LegalItem>
          <Bold>Analytics and Performance Cookies</Bold>: We use analytics cookies to collect
          information about how visitors use our Website – which pages are visited most often, how
          users move around the site, what source referred them, etc. This data helps us understand
          website traffic patterns and user interactions, so we can improve the Website’s
          performance and design. We primarily use Google Analytics for this purpose. Google
          Analytics sets cookies to identify unique users, throttle request rates, and store usage
          details. The information collected is aggregated and anonymized; it does not directly
          identify you. For example, we can see overall numbers of visitors or popular pages, but
          these cookies do not reveal your name or contact information. We might also use other
          performance monitoring tools to measure page load times or error occurrences.
        </LegalItem>
        <LegalItem>
          <Bold>Advertising and Targeting Cookies</Bold>: Advertising cookies may be set through our
          site by us or our advertising partners to track your browsing habits and activity. Their
          purpose is to deliver advertisements that are more relevant to you and your interests,
          both on our Website and across other sites you may visit (this is often called targeted
          advertising or retargeting). For instance, the Facebook Pixel on our Website places a
          cookie that helps us show you tailored ads on Facebook or Instagram based on your visit to
          our Site. Similarly, if we use Google Ads, Google may set cookies to determine if you’ve
          taken an action (like visiting certain pages) after clicking one of our ads, or to show
          our ads to you when you visit other sites in their ad network. These cookies may record
          information such as the pages you viewed on our site, the duration of your visit, and the
          links you clicked. They do not store directly identifiable personal information (like your
          name), but they uniquely identify your browser and internet device. If you disable these
          cookies, you will still see advertisements online, but they may be less relevant to you.
        </LegalItem>
        <LegalItem>
          <Bold>Social Media and Third-Party Cookies</Bold>: Our Website might include integrations
          with social media platforms or other third-party services that themselves set cookies. For
          example, if we embed a YouTube video, YouTube may set its own cookies for video playback
          and analytics. Or if we have a Facebook “Share” or “Like” button on a property page,
          Facebook might set a cookie to enable that functionality and link it to your account if
          you are logged in to Facebook. These cookies are set by the third-party providers and are
          governed by those parties’ own privacy/cookie policies. While we strive to limit the
          privacy impact of third-party integrations, we do not control these cookies directly.
        </LegalItem>
      </LegalList>

      <LegalHeading>Specific Cookies We Use (Examples)</LegalHeading>
      <LegalText>
        Below are examples of some key cookies and tracking technologies that may be in use on our
        Website (for illustrative purposes; actual cookies may change as the site evolves):
      </LegalText>
      <LegalList>
        <LegalItem>
          <Bold>Providing and Improving Services</Bold>:
          <LegalList nested>
            <LegalItem>
              _ga – Used by Google Analytics to distinguish unique users; typically persists for 2
              years.
            </LegalItem>
            <LegalItem>
              _gid – Used by Google Analytics to distinguish users; persists for 24 hours.
            </LegalItem>
            <LegalItem>
              _gat – Used to throttle request rate (limit the collection of data on high-traffic
              sites); persists for 1 minute.
            </LegalItem>
            <LegalItem>
              Google Analytics may also use other cookies like _gat_gtag_UA_… or _gac_… for various
              aspects of functionality. We have configured Google Analytics to anonymize IP
              addresses where required by law (meaning Google truncates your IP within the EU).
              Google’s ability to use and share information collected by Google Analytics about your
              visits to our site is restricted by the Google Analytics Terms of Use and Google’s
              Privacy Policy.
            </LegalItem>
          </LegalList>
        </LegalItem>
        <LegalItem>
          <Bold>Facebook Pixel</Bold>:
          <LegalList nested>
            <LegalItem>
              We use Facebook Pixel, which places a small image pixel and associated cookies on our
              site to track conversions (like when you perform certain actions on our site after
              interacting with our Facebook ads) and to build audiences for future advertisements.
              The pixel may trigger cookies such as fr or fbp that help deliver ad content or
              measure ad performance. The information from these cookies is used for Facebook’s
              advertising services as per your Facebook privacy settings.
            </LegalItem>
          </LegalList>
        </LegalItem>
        <LegalItem>
          <Bold>Microsoft Clarity</Bold>:
          <LegalList nested>
            <LegalItem>
              We use Microsoft Clarity to gain insights into user interactions on our website,
              including how users click, scroll, and navigate. Clarity sets cookies to help us:
            </LegalItem>
            <LegalItem>Understand aggregated usage patterns and site performance.</LegalItem>
            <LegalItem>Improve the user experience based on behavior analytics.</LegalItem>
            <LegalItem>Examples of Clarity cookies may include:</LegalItem>
            <LegalItem>
              _clck – Persists a Clarity user ID and preferences across sessions; typically lasts 1
              year.
            </LegalItem>
            <LegalItem>
              _clsk – Connects multiple page views by a user into a single Clarity session
              recording; expires after 30 minutes.
            </LegalItem>
            <LegalItem>
              Additional cookies such as <Bold>CLID</Bold> or <Bold>ANONCHK</Bold> may also be used
              for functionality and diagnostic purposes.
            </LegalItem>
          </LegalList>
        </LegalItem>
        <LegalItem>
          <Bold>Session and Functional Cookies:</Bold>
          <LegalList nested>
            <LegalItem>
              PHPSESSID or similar – a session cookie that stores a unique identifier for your
              session (so the website can maintain things like form inputs across pages). This
              expires when you close your browser.
            </LegalItem>
            <LegalItem>
              Preference cookies – we might use cookies like site_lang (to remember your language
              selection) or view_mode (to remember listing view preferences). These persist to
              retain your choices.
            </LegalItem>
          </LegalList>
        </LegalItem>
        <LegalItem>
          <Bold>Cookie Consent Cookie:</Bold>
          <LegalList nested>
            <LegalItem>
              If we display a cookie consent banner, once you make your choice (accept all, reject
              non-necessary, etc.), we will set a cookie such as cookieConsent to record your
              preferences. This prevents the banner from showing each time and remembers your
              settings. Typically persists for a set period (e.g., 6 months or 1 year).
            </LegalItem>
          </LegalList>
        </LegalItem>
        <LegalItem>
          <Bold>Third-Party Service Cookies</Bold>:
          <LegalList nested>
            <LegalItem>
              If our site integrates third-party content like maps (Google Maps API), videos
              (YouTube or Vimeo), or chat widgets, those services may set cookies like NID (Google
              preferences) or others for their own purposes like user settings or usage tracking. We
              do not serve these cookies directly, but they may be present when those features are
              used.
            </LegalItem>
          </LegalList>
        </LegalItem>
      </LegalList>
      <LegalText>
        (The above is not an exhaustive list of cookies, and cookies on our site may change as we
        update our services. For a full up-to-date list of cookies and their purposes, please refer
        to any cookie management tool on our site or contact us.)
      </LegalText>

      <LegalHeading>Your Choices: Managing and Opting Out of Cookies</LegalHeading>
      <LegalText>
        You have several options for controlling or limiting how cookies are used on your devices:
      </LegalText>
      <LegalList>
        <LegalItem>
          <Bold>Browser Settings</Bold>: Most web browsers allow you to manage cookie preferences
          through their settings. You can typically choose to accept or reject all cookies, or only
          certain types. You can also delete cookies that have already been set. For example:
          <LegalList nested>
            <LegalItem>
              In Chrome, you can go to Settings &gt; Privacy and Security &gt; Cookies and other
              site data, to block third-party cookies or set specific preferences.
            </LegalItem>
            <LegalItem>
              In Safari, you can go to Preferences &gt; Privacy, to block cookies or remove website
              data.
            </LegalItem>
            <LegalItem>
              In Firefox, go to Options &gt; Privacy &amp; Security &gt; Cookies and Site Data.
            </LegalItem>
            <LegalItem>In Edge, go to Settings &gt; Cookies and site permissions.</LegalItem>
            <LegalItem>
              In Internet Explorer, go to Internet Options &gt; Privacy.
              <br />
              You can find more information for your specific browser by visiting the browser’s help
              documentation. Please note that if you disable all cookies, some features of our
              Website may not function properly (for instance, necessary cookies are needed for
              basic site operation).
            </LegalItem>
          </LegalList>
        </LegalItem>
        <LegalItem>
          <Bold>Cookie Banner/Preference Center</Bold>: On your first visit to our Website (and
          periodically thereafter, or whenever we add new cookies), you may see a{' '}
          <Bold>cookie consent banner</Bold>. This banner allows you to accept or reject certain
          categories of cookies (except strictly necessary cookies which are always on). If we
          provide a “Preferences” or “Settings” option on the banner, you can choose which types of
          cookies to allow (e.g., you might accept analytics but reject advertising cookies). You
          can change your preferences at any time by accessing our Cookie Settings tool (for
          example, via a link in the Website footer like “Cookie Preferences” or by clearing cookies
          to trigger the banner again on refresh). We strive to implement cookie consent in
          compliance with GDPR requirements for EU users, meaning we will not set non-essential
          cookies until you opt in. For users outside of jurisdictions requiring explicit consent,
          by using the site you agree to our use of cookies as described, but you can still opt out
          as desired using these tools.
        </LegalItem>
        <LegalItem>
          <Bold>Opt-Out of Analytics</Bold>: If you wish to prevent your data from being used by
          Google Analytics across all websites, Google provides an Analytics Opt-out Browser Add-on
          which you can install (available at{' '}
          <LegalLink href="https://tools.google.com/dlpage/gaoptout">
            tools.google.com/dlpage/gaoptout
          </LegalLink>
          ). This add-on prevents Google Analytics JavaScript (ga.js, analytics.js, and dc.js) from
          sharing information with Google Analytics about your visits. Keep in mind this is a broad
          opt-out and might affect analytics functionality on websites you visit.
        </LegalItem>
        <LegalItem>
          <Bold>Opt-Out of Interest-Based Ads</Bold>: For third-party advertising cookies, you can
          manage your preferences using industry opt-out tools. For example:
          <LegalList nested>
            <LegalItem>
              The Network Advertising Initiative (NAI) opt-out page (
              <LegalLink href="https://optout.networkadvertising.org">
                optout.networkadvertising.org
              </LegalLink>
              ) allows you to opt-out of interest-based ads from NAI member companies.
            </LegalItem>
            <LegalItem>
              The Digital Advertising Alliance (DAA) offers an opt-out tool for U.S. consumers (
              <LegalLink href="https://optout.aboutads.info">optout.aboutads.info</LegalLink>) and a
              similar tool for Canada (
              <LegalLink href="https://youradchoices.ca/choices">
                youradchoices.ca/choices
              </LegalLink>
              ) and EU (
              <LegalLink href="https://www.youronlinechoices.eu">
                www.youronlinechoices.eu
              </LegalLink>
              ) participants. These tools let you see which partners have active cookies on your
              browser and opt-out of them.
              <br />
              Note that using these tools will typically set an opt-out cookie on your browser to
              signal your opt-out choice. If you clear cookies, you may need to opt out again.
            </LegalItem>
          </LegalList>
        </LegalItem>
        <LegalItem>
          <Bold>Global Privacy Control (GPC)</Bold>: If you are a California resident or otherwise
          wish to exercise a global opt-out, some browsers and extensions support a “Global Privacy
          Control” signal which communicates an opt-out of sale/sharing under CCPA. Our Website will
          honor GPC signals to the extent required by law. If we detect a GPC signal from your
          browser, we will treat it as if you had clicked the “Do Not Sell My Personal Information”
          opt-out on our site for that browser, disabling third-party advertising cookies.
        </LegalItem>
        <LegalItem>
          <Bold>Do Not Track</Bold>: “Do Not Track” (DNT) is a browser setting that indicates a
          preference not to be tracked across websites. However, there is currently no consensus on
          how websites should respond to DNT signals. As a result, our Website does not respond to
          Do Not Track signals beyond the scope of what is described regarding GPC and cookie
          management. We encourage using the specific tools mentioned above to manage cookies.
        </LegalItem>
      </LegalList>

      <LegalHeading>Cookie Policy Updates</LegalHeading>
      <LegalText>
        We may update this Cookie Policy from time to time to reflect changes in the cookies we use
        or for other operational, legal, or regulatory reasons. The “Effective as of” date at the
        top indicates when the policy was last revised. We encourage you to review this Cookie
        Policy periodically. If the changes are significant, we may provide a more prominent notice
        or seek consent for material changes if required by law. Your continued use of our Website
        after any updates to this policy will signify your acceptance of the changes.
      </LegalText>

      <LegalHeading>Contact Information (Terms of Use)</LegalHeading>
      <LegalText>
        If you have any questions about our use of cookies or similar technologies, or if you need
        assistance managing your preferences, please contact us:
      </LegalText>
      <LegalContact />
    </LegalPage>
  )
}
