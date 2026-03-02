"use client";

import {
  ReactSelect,
  type ReactSelectOption,
  useField,
} from "@payloadcms/ui";
import { TextFieldClientProps } from "payload";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface Organization {
  id: string;
  name: string;
  retirementDate: string | null;
}

type Option = ReactSelectOption & { label: string };

const API_URL = "https://public-bodies.dev.api.gov.bc.ca/PublicBodies/names";

export const OrganizationSelect: React.FC<TextFieldClientProps> = ({
  field,
  path,
}) => {
  const hasMany = Boolean(field.hasMany);

  const singleField = useField<string>({ path });
  const multiField = useField<string[]>({ path });

  const value = hasMany ? multiField.value : singleField.value;
  const setValue = hasMany ? multiField.setValue : singleField.setValue;

  const [options, setOptions] = useState<Option[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const cachedOptions = useRef<Option[]>([]);

  useEffect(() => {
    if (cachedOptions.current.length > 0) {
      setOptions(cachedOptions.current);
      return;
    }

    setLoading(true);
    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const items: Organization[] = data.payload ?? [];
        // Dedupe by name, preferring the entry with a null retirementDate
        const byName = new Map<string, Organization>();
        for (const item of items) {
          const existing = byName.get(item.name);
          if (
            !existing ||
            (existing.retirementDate != null && item.retirementDate == null)
          ) {
            byName.set(item.name, item);
          }
        }
        const opts = Array.from(byName.values()).map((item) => ({
          value: item.id,
          label: item.name,
        }));
        opts.sort((a, b) => a.label.localeCompare(b.label));
        cachedOptions.current = opts;
        setOptions(opts);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const selectedValue = useMemo((): Option | Option[] | undefined => {
    if (hasMany) {
      const vals = Array.isArray(value) ? (value as string[]) : [];
      return options.filter((o) => vals.includes(o.value as string));
    }
    return options.find((o) => o.value === (value as string)) ?? undefined;
  }, [hasMany, value, options]);

  const handleChange = useCallback(
    (selected: ReactSelectOption | ReactSelectOption[]) => {
      if (hasMany) {
        const arr = Array.isArray(selected) ? selected : [];
        (setValue as (v: string[]) => void)(
          arr.map((o) => o.value as string),
        );
      } else {
        const single = Array.isArray(selected) ? selected[0] : selected;
        (setValue as (v: string) => void)((single?.value as string) ?? "");
      }
    },
    [hasMany, setValue],
  );

  return (
    <div className="field-type select">
      <label className="field-label">
        {typeof field.label === "string" ? field.label : field.name}
        {field.required && <span className="required">*</span>}
      </label>

      {error && (
        <div style={{ color: "var(--theme-error-500)", marginBottom: 8 }}>
          Failed to load organizations: {error}
        </div>
      )}

      <ReactSelect
        options={options}
        value={selectedValue}
        onChange={handleChange}
        isMulti={hasMany}
        isClearable
        isSearchable
        isLoading={loading}
        isSortable={hasMany}
        placeholder={
          loading ? "Loading organizations..." : "Search organizations..."
        }
      />
    </div>
  );
};
