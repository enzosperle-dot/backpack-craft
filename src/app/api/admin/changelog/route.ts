import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/auth";

export async function PUT(req: NextRequest) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });

  const { modVersionId, additions, fixes, improvements } = await req.json();

  const changelog = await prisma.changelog.upsert({
    where: { modVersionId },
    update: { additions, fixes, improvements },
    create: { modVersionId, additions, fixes, improvements },
  });

  return NextResponse.json(changelog);
}
