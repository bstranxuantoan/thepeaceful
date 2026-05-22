// lib/mailer.ts
import { escapeHtml, textToHtml, personalize, htmlIsFullDocument, stripHtmlToText, wrapEmailHtml, renderCampaignEmail } from './email-render';
export type { BodyFormat } from './email-render';
export { escapeHtml, textToHtml, personalize, htmlIsFullDocument, stripHtmlToText, wrapEmailHtml, renderCampaignEmail };

export type SendResult = { ok: true; messageId: string } | { ok: false; error: string };

export async function sendOne(opts: {
  to: string;
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}): Promise<SendResult> {
  const resendApiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL || 'The Peaceful Mind Method <hello@quietmindful.com>';

  if (!resendApiKey) {
    return { ok: false, error: "Missing RESEND_API_KEY in environment variables." };
  }

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: fromEmail,
        to: opts.to,
        subject: opts.subject,
        html: opts.html,
        text: opts.text,
        reply_to: opts.replyTo,
      })
    });

    if (!res.ok) {
      const errData = await res.text();
      return { ok: false, error: errData };
    }

    const data = await res.json();
    return { ok: true, messageId: data.id };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

export function sleep(ms: number): Promise<void> {
  return new Promise(r => setTimeout(r, ms));
}
