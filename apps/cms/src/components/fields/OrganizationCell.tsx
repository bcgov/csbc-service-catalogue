"use client";

import { useEffect, useRef, useState } from "react";

interface Organization {
  id: string;
  name: string;
  retirementDate: string | null;
}

const API_URL = "https://public-bodies.dev.api.gov.bc.ca/PublicBodies/names";

let cachedMap: Map<string, string> | null = null;

export const OrganizationCell: React.FC<{ cellData: string }> = ({
  cellData,
}) => {
  const [label, setLabel] = useState(cellData ?? "");
  const fetched = useRef(false);

  useEffect(() => {
    if (!cellData) return;

    if (cachedMap) {
      setLabel(cachedMap.get(cellData) ?? cellData);
      return;
    }

    if (fetched.current) return;
    fetched.current = true;

    fetch(API_URL)
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data) => {
        const items: Organization[] = data.payload ?? [];
        const map = new Map<string, string>();
        for (const item of items) {
          const existing = map.get(item.id);
          if (!existing) {
            map.set(item.id, item.name);
          }
        }
        cachedMap = map;
        setLabel(map.get(cellData) ?? cellData);
      })
      .catch(() => {
        setLabel(cellData);
      });
  }, [cellData]);

  return <span>{label}</span>;
};
