// app/providers/EmotionRegistry.tsx
"use client";

import * as React from "react";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { useServerInsertedHTML } from "next/navigation";

export default function EmotionRegistry({ children }: { children: React.ReactNode }) {
  const [cache] = React.useState(() => {
    const c = createCache({ key: "mui", prepend: true });
    c.compat = true;
    return c;
  });

  useServerInsertedHTML(() => {
    const tags = Object.entries(cache.inserted).map(([key, value]) => (
      <style key={key} data-emotion={`${cache.key} ${key}`}
        dangerouslySetInnerHTML={{ __html: value as any }} />
    ));
    return <>{tags}</>;
  });

  return <CacheProvider value={cache}>{children}</CacheProvider>;
}
