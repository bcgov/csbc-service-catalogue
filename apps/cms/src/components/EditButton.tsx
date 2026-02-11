"use client";

import {
  ConfirmationModal,
  useDocumentInfo,
  useField,
  useFormModified,
  useModal,
} from "@payloadcms/ui";
import { useCallback, useState } from "react";

const EDIT_MODAL_SLUG = "confirm-edit-version";

export const EditButton: React.FC = () => {
  const { id } = useDocumentInfo();
  const { value: publishedAt } = useField<string>({ path: "publishedAt" });
  const { value: archivedAt } = useField<string>({ path: "archivedAt" });
  const { value: serviceId } = useField<string>({ path: "service" });
  const modified = useFormModified();
  const [loading, setLoading] = useState(false);
  const { openModal } = useModal();

  const isLocked = Boolean(publishedAt) || Boolean(archivedAt);

  const handleEdit = useCallback(async () => {
    if (!id) return;

    setLoading(true);
    try {
      const res = await fetch(`/api/versions/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ publishedAt: null, archivedAt: null }),
      });
      if (!res.ok) throw new Error(`Failed to unlock version: ${res.status}`);

      if (serviceId) {
        const docRes = await fetch(`/api/services/${serviceId}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ publishedVersion: null }),
        });
        if (!docRes.ok)
          throw new Error(`Failed to update service: ${docRes.status}`);
      }

      window.location.reload();
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }, [id, serviceId]);

  if (!id || !isLocked || modified) return null;

  return (
    <>
    <button
      type="button"
      className="btn btn--size-medium"
      style={{
        backgroundColor: loading ? undefined : "#2563eb",
        color: loading ? undefined : "#ffffff",
      }}
      disabled={loading}
      onClick={() => openModal(EDIT_MODAL_SLUG)}
    >
      {loading ? "Unlocking..." : "Edit"}
    </button>
    <ConfirmationModal
      modalSlug={EDIT_MODAL_SLUG}
      heading="Confirm Edit"
      body="This will revert the version to draft so it can be edited. It will no longer be published or archived."
      confirmLabel="Edit"
      confirmingLabel="Unlocking..."
      cancelLabel="Cancel"
      onConfirm={handleEdit}
    />
    </>
  );
};
