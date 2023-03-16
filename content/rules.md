---
title: Templating Rules
description: HTML based email template rules.
---
<br>
This reference assumes you’re a front-end web designer with an intermediate working knowledge of HTML and CSS. You’re comfortable coding in and using HTML tables for structure, and working in coding standards that were state-of-the-art in 1999. Feel free to crank up a little TLC or Goo Goo Dolls to get into the spirit of thing

<br>
<br>

<!--more-->

#### Best Practices: Design

There are a few things to keep in mind when designing HTML email campaigns.

<br>

- Emails should be 600-800 pixels maximum width. This will make them behave better within the preview-pane size provided by many clients.
- Design for simplicity. Use grid-based layers and avoid complicated elements that require HTML floats or positioning.
- Assume images will be initially blocked by email clients, or that certain images—background images, for example—will completely fail to load.
- Don’t design an email that’s essentially one large, sliced-up image. While these kinds of emails look pretty, they perform poorly.
- Use basic, cross-platform fonts such as Arial, Verdana, Georgia, and Times New Roman.
- Avoid elements that require Flash or JavaScript. If you need motion in an email, a .gif is your best bet.
- Don’t forget about the mobile experience! Is your email readable at arm’s length on a small screen? Will the images slow its load time on a mobile device? Are your links easy to press with a thumb?

<br>
<br>

#### Best Practices: Development

Much like with design, there are best practices to follow when coding HTML email.


- Code all structure using the table element. For more complicated layouts, you should nest tables to build complex structures.
- Use element attributes (such as cellpadding, valign, and width) to set ta`ble dimensions. This forces a box-model structure.
- Keep your CSS simple. Avoid compound style declarations (IE: “font:#000 12px Arial, Helvetica, sans-serif;”), shorthand code (IE: #000 instead of #000000), CSS layout properties (IE: slot, position, clear, visibility, etc.), complex selectors (IE: descendant, child or sibling selectors, and pseudo-elements)
- Inline all CSS before sending. (Mailchimp will do this for you automatically.)
- Use only absolute links for images, and host those images on a reliable server. (Mailchimp provides free image hosting.)
- Don’t bother with JavaScript or Flash—those technologies are largely unsupported by email clients.
- Account for mobile-friendliness, if possible. Use media queries to increase text sizes on small screens, provide thumb-sized (~46x46px) hit areas for links. Make an email responsive if the design allows for it.
- Test, test, test. Create email accounts across various services, and send emails to yourself. Do this in conjunction with services such as [Litmus](https://www.litmus.com/).

[^1]: Sourece [MailChimp](https://templates.mailchimp.com/getting-started/html-email-basics/)

