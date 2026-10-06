<?xml version="1.0" encoding="UTF-8"?>
<!-- Makes /sitemap.xml readable when opened in a browser. Search engines ignore it. -->
<xsl:stylesheet version="1.0"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:sitemap="http://www.sitemaps.org/schemas/sitemap/0.9"
  xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <xsl:output method="html" encoding="UTF-8" indent="yes" />

  <xsl:template match="/">
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="noindex, follow" />
        <title>XML Sitemap | Novel Signature Homes</title>
        <style>
          body {
            margin: 0;
            padding: 40px 16px;
            background: #fefefe;
            color: #1a1a1a;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
            font-size: 14px;
          }
          main { max-width: 1250px; margin: 0 auto; }
          h1 { margin: 0 0 24px; font-size: 32px; color: #1a1a1a; }
          p { margin: 0 0 16px; font-size: 16px; color: #444; }
          a { color: #8a561f; text-decoration: none; font-weight: 600; }
          a:hover { text-decoration: underline; }
          table { width: 100%; margin-top: 24px; border-collapse: collapse; }
          th {
            padding: 8px 4px;
            border-bottom: 1px solid #1a1a1a;
            text-align: left;
            font-size: 14px;
          }
          td { padding: 4px; font-size: 14px; }
          td a { color: #1a1a1a; font-weight: 400; word-break: break-all; }
          tr:nth-child(odd) td { background: #eeeeee; }
          .num { width: 90px; color: #555; }
          .date { width: 180px; color: #555; white-space: nowrap; }
        </style>
      </head>
      <body>
        <main>
          <h1>XML Sitemap</h1>
          <p>
            This is the sitemap of <a href="/">Novel Signature Homes</a>, meant for search
            engines.
          </p>
          <p>
            You can find more information about XML sitemaps on
            <a href="https://www.sitemaps.org/" rel="noopener">sitemaps.org</a>.
          </p>
          <p>
            This XML Sitemap contains <xsl:value-of select="count(sitemap:urlset/sitemap:url)" />
            URLs.
          </p>
          <table>
            <thead>
              <tr>
                <th>URL</th>
                <th class="num">Images</th>
                <th class="date">Last Mod.</th>
              </tr>
            </thead>
            <tbody>
              <xsl:for-each select="sitemap:urlset/sitemap:url">
                <tr>
                  <td>
                    <a href="{sitemap:loc}"><xsl:value-of select="sitemap:loc" /></a>
                  </td>
                  <td class="num"><xsl:value-of select="count(image:image)" /></td>
                  <td class="date">
                    <xsl:if test="sitemap:lastmod">
                      <xsl:value-of
                        select="concat(substring(sitemap:lastmod, 1, 10), ' ', substring(sitemap:lastmod, 12, 5), ' +00:00')" />
                    </xsl:if>
                  </td>
                </tr>
              </xsl:for-each>
            </tbody>
          </table>
        </main>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>
