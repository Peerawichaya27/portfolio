'use client';

import { useEffect, useRef, useState } from 'react';
import { Check, Copy, Mail } from 'lucide-react';

/** Email as the primary contact action, with one-click copy for people not using a mail app. */
type Labels = { copy: string; copied: string; action: string; status: string };

export function CopyEmail({ email, labels }: { email: string; labels: Labels }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  };

  return (
    <div className="copy-email">
      <a href={`mailto:${email}`} className="copy-email-address">
        <Mail size={16} /> {email}
      </a>
      <button type="button" onClick={copy} className="copy-email-button" aria-label={labels.action}>
        {copied ? <Check size={15} /> : <Copy size={15} />}
        <span aria-hidden="true">{copied ? labels.copied : labels.copy}</span>
      </button>
      <span className="sr-only" role="status">
        {copied ? labels.status : ''}
      </span>
    </div>
  );
}
