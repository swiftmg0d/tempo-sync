import { useCallback, useEffect, useRef, useState } from 'react';

const TURNSTILE_SITE_KEY = import.meta.env.VITE_TURNSTILE_SITE_KEY as string;

declare global {
  interface Window {
    turnstile?: {
      render: (
        container: string | HTMLElement,
        options: {
          sitekey: string;
          callback?: (token: string) => void;
          'error-callback'?: (error: unknown) => void;
          'expired-callback'?: () => void;
        }
      ) => string;
      reset: (widgetId?: string) => void;
      remove: (widgetId?: string) => void;
    };
    onloadTurnstileCallback?: (() => void) | null;
  }
}

interface UseTurnstileCaptchaOptions {
  containerId?: string;
}

const useTurnstileCaptcha = (options: UseTurnstileCaptchaOptions = {}) => {
  const { containerId = '#captcha-container' } = options;

  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const widgetIdRef = useRef<string | null>(null);
  const isInitializedRef = useRef(false);

  const initializeCaptcha = useCallback(() => {
    if (isInitializedRef.current) return;
    if (!window.turnstile) return;

    const container = document.querySelector(containerId);
    if (!container) return;

    try {
      const id = window.turnstile.render(containerId, {
        sitekey: TURNSTILE_SITE_KEY,
        callback: (token: string) => {
          setToken(token);
          setIsLoading(false);
          setError(null);
        },
        'error-callback': () => {
          setError('Captcha verification failed');
          setIsLoading(false);
        },
        'expired-callback': () => {
          setToken(null);
          setError('Captcha expired');
        },
      });
      widgetIdRef.current = id;
      isInitializedRef.current = true;
    } catch (e) {
      setError('Failed to initialize captcha');
      setIsLoading(false);
    }
  }, [containerId]);

  useEffect(() => {
    // If turnstile is already loaded, initialize immediately
    if (window.turnstile) {
      initializeCaptcha();
    } else {
      // Otherwise wait for the script to load
      window.onloadTurnstileCallback = initializeCaptcha;
    }

    return () => {
      window.onloadTurnstileCallback = null;
      // Cleanup widget on unmount
      if (widgetIdRef.current && window.turnstile) {
        window.turnstile.remove(widgetIdRef.current);
      }
      isInitializedRef.current = false;
    };
  }, [initializeCaptcha]);

  const resetWidget = useCallback(() => {
    if (window.turnstile && widgetIdRef.current) {
      setToken(null);
      setIsLoading(true);
      setError(null);
      window.turnstile.reset(widgetIdRef.current);
    }
  }, []);

  return { token, isLoading, error, resetWidget };
};

export default useTurnstileCaptcha;
