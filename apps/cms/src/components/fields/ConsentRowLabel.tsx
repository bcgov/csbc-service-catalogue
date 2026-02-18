"use client";

import { useRowLabel } from "@payloadcms/ui";
import { useEffect, useRef, useState } from "react";

interface ConsentDocument {
  name: string;
  version: number;
}

export const ConsentRowLabel = () => {
  const { data, rowNumber } = useRowLabel<{ documentId?: string }>();
  const [doc, setDoc] = useState<ConsentDocument | null>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const documentId = data.documentId;

  useEffect(() => {
    setDoc(null);

    if (!documentId || !documentId.trim()) {
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      fetch(
        `/api/v1/consent-documents/${encodeURIComponent(documentId)}`,
      )
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setDoc({ name: data.name, version: data.version });
        })
        .catch(() => {
          setDoc(null);
        });
    }, 500);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [documentId]);

  if (doc) {
    return (
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
        <span>{doc.name}</span>
        <span
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "4px 12px",
            borderRadius: "9999px",
            fontSize: "13px",
            fontWeight: 600,
            lineHeight: 1,
            whiteSpace: "nowrap",
            border: "1px solid var(--theme-elevation-400)",
            color: "var(--theme-elevation-600)",
            backgroundColor: "transparent",
          }}
        >
          Version: {doc.version}
        </span>
      </div>
    );
  }

  return (
    <span>
      Consent Document {String(rowNumber).padStart(2, "0")}
    </span>
  );
};
