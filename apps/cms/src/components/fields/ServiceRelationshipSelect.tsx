"use client";

import {
  ReactSelect,
  type ReactSelectOption,
  useField,
  useFormFields,
} from "@payloadcms/ui";
import { RelationshipFieldClientProps } from "payload";
import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface ServiceOption extends ReactSelectOption {
  label: string;
  status: "published" | "draft";
}

const statusStyles: Record<string, React.CSSProperties> = {
  draft: {
    border: "1px solid var(--theme-elevation-400)",
    color: "var(--theme-elevation-600)",
    backgroundColor: "transparent",
  },
  published: {
    border: "1px solid #22c55e",
    color: "#fff",
    backgroundColor: "#22c55e",
  },
};

const statusLabels: Record<string, string> = {
  draft: "Draft",
  published: "Published",
};

const pillStyle: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  padding: "2px 8px",
  borderRadius: "9999px",
  fontSize: "11px",
  fontWeight: 600,
  lineHeight: 1,
  whiteSpace: "nowrap",
  marginLeft: "8px",
  flexShrink: 0,
};

const CustomOption: React.FC<any> = (props) => {
  const { innerRef, innerProps, data, isSelected, isFocused } = props;
  const status = (data as ServiceOption).status ?? "draft";

  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "6px 10px",
        cursor: "pointer",
        backgroundColor: isFocused
          ? "var(--theme-elevation-100)"
          : isSelected
            ? "var(--theme-elevation-150)"
            : "transparent",
      }}
    >
      <span>{data.label}</span>
      <span style={{ ...pillStyle, ...statusStyles[status] }}>
        {statusLabels[status]}
      </span>
    </div>
  );
};

export const ServiceRelationshipSelect: React.FC<
  RelationshipFieldClientProps
> = ({ field, path: pathFromProps, validate }) => {
  const memoizedValidate = useCallback(
    (value: any, validationOptions: any) => {
      if (typeof validate === "function") {
        return validate(value, { ...validationOptions, required: field.required });
      }
      return true as const;
    },
    [validate, field.required],
  );

  const { value, setValue } = useField<string[]>({
    potentiallyStalePath: pathFromProps,
    validate: memoizedValidate,
  });

  const serviceField = useFormFields(([fields]) => fields["service"]);
  const currentServiceId = serviceField?.value as string | undefined;

  const [options, setOptions] = useState<ServiceOption[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cachedOptions = useRef<ServiceOption[]>([]);

  useEffect(() => {
    if (cachedOptions.current.length > 0) {
      setOptions(cachedOptions.current);
      return;
    }

    setLoading(true);
    fetch("/api/services?limit=1000&depth=0")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const docs: Array<{
          id: string;
          name: string;
          publishedVersion?: string | null;
          archivedAt?: string | null;
        }> = data.docs ?? [];

        const opts: ServiceOption[] = docs
          .filter((doc) => !doc.archivedAt)
          .map((doc) => ({
            value: doc.id,
            label: doc.name,
            status: doc.publishedVersion ? "published" : "draft",
          }));

        opts.sort((a, b) => a.label.localeCompare(b.label));
        cachedOptions.current = opts;
        setOptions(opts);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const filteredOptions = useMemo(() => {
    if (!currentServiceId) return options;
    return options.filter((o) => o.value !== currentServiceId);
  }, [options, currentServiceId]);

  const selectedValue = useMemo((): ServiceOption[] => {
    const vals = Array.isArray(value) ? value : [];
    return options.filter((o) => vals.includes(o.value as string));
  }, [value, options]);

  const handleChange = useCallback(
    (selected: ReactSelectOption | ReactSelectOption[]) => {
      const arr = Array.isArray(selected) ? selected : [];
      setValue(arr.map((o) => o.value as string));
    },
    [setValue],
  );

  const selectComponents = useMemo(
    () => ({ Option: CustomOption }),
    [],
  );

  return (
    <div className="field-type relationship">
      <label className="field-label">
        {typeof field.label === "string" ? field.label : field.name}
      </label>

      {error && (
        <div style={{ color: "var(--theme-error-500)", marginBottom: 8 }}>
          Failed to load services: {error}
        </div>
      )}

      <ReactSelect
        options={filteredOptions}
        value={selectedValue}
        onChange={handleChange}
        isMulti
        isClearable
        isSearchable
        isLoading={loading}
        isSortable
        placeholder={loading ? "Loading services..." : "Search services..."}
        components={selectComponents}
      />
    </div>
  );
};
