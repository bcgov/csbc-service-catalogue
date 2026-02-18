import { NextRequest, NextResponse } from "next/server";

const CONSENT_API_URL = process.env.CONSENT_API_URL;

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  if (!CONSENT_API_URL) {
    return NextResponse.json(
      { error: "CONSENT_API_URL is not configured" },
      { status: 503 },
    );
  }

  const res = await fetch(
    `${CONSENT_API_URL}/api/v1/consent-documents/${encodeURIComponent(id)}`,
  );

  if (!res.ok) {
    return NextResponse.json(
      { error: `Upstream returned ${res.status}` },
      { status: res.status },
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
