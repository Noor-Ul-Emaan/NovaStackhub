# Contact Form

A single-file, responsive contact form (HTML + CSS + vanilla JS) — no build step, no dependencies.

## Features
- Name, email, subject, and message fields with inline validation
- Accessible focus states and `prefers-reduced-motion` support
- Fully responsive (stacks to one column below 720px)
- Success state with an animated "postmark" confirmation

## Usage
Just open `index.html` in a browser — it works standalone.

## Connecting it to a real inbox
Right now, submitting the form only *simulates* sending (see the `setTimeout` block in the `<script>` tag). To make it actually deliver messages, pick one:

1. **Form backend service** (fastest, no server needed): sign up for something like Formspree or Netlify Forms, then point the fetch call at their endpoint with your form fields as the body.
2. **Your own backend**: replace the simulated block with a `fetch('/api/contact', { method: 'POST', body: new FormData(form) })` call to an endpoint you control that sends the email (e.g. via SMTP, SendGrid, or similar).
3. **WordPress / CMS plugin**: if the site already runs WordPress, a plugin like Contact Form 7 or WPForms can replace this file entirely — export its shortcode/embed in place of this form.

## Files
- `index.html` — the whole form (markup, styles, and script in one file)
