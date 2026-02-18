"use client";

import { useField } from "@payloadcms/ui";
import { TextFieldClientProps } from "payload";
import { useEffect, useRef, useState } from "react";

interface ConsentDocument {
  name: string;
  version: number;
}

export const ConsentDocumentField: React.FC<TextFieldClientProps> = ({
  field,
  path,
}) => {
  const { value, setValue } = useField<string>({ path });
  const [doc, setDoc] = useState<ConsentDocument | null>(null);
  const [notFound, setNotFound] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setDoc(null);
    setNotFound(false);

    if (!value || !value.trim()) {
      return;
    }

    if (debounceRef.current) {
      clearTimeout(debounceRef.current);
    }

    debounceRef.current = setTimeout(() => {
      setLoading(true);
      fetch(
        `/api/v1/consent-documents/${encodeURIComponent(value)}`,
      )
        .then((res) => {
          if (!res.ok) throw new Error(`HTTP ${res.status}`);
          return res.json();
        })
        .then((data) => {
          setDoc({ name: data.name, version: data.version });
          setNotFound(false);
        })
        .catch(() => {
          setDoc(null);
          setNotFound(true);
        })
        .finally(() => setLoading(false));
    }, 500);

    return () => {
      if (debounceRef.current) {
        clearTimeout(debounceRef.current);
      }
    };
  }, [value]);

  return (
    <div className="field-type text">
      <label className="field-label">
        {typeof field.label === "string" ? field.label : field.name}
      </label>

      <input
        type="text"
        className="field-type__input"
        style={{ width: "100%" }}
        value={value ?? ""}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter consent document ID"
      />

      {loading && (
        <div
          style={{
            marginTop: 8,
            color: "var(--theme-elevation-500)",
            fontSize: 13,
          }}
        >
          Looking up document...
        </div>
      )}

      {doc && !loading && (
        <div
          style={{
            marginTop: 8,
            padding: "12px 16px",
            border: "1px solid var(--theme-elevation-150)",
            borderRadius: 4,
            backgroundColor: "var(--theme-elevation-50)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <span style={{ fontWeight: 500, fontSize: 14 }}>{doc.name}</span>
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
      )}

      {notFound && !loading && (
        <div
          style={{
            marginTop: 8,
            padding: "12px 16px",
            border: "1px solid var(--theme-elevation-150)",
            borderRadius: 4,
            backgroundColor: "var(--theme-elevation-50)",
            color: "var(--theme-elevation-500)",
            fontSize: 13,
          }}
        >
          The consent document '{value}' will be used once published.
        </div>
      )}
    </div>
  );
};
