import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAdminFromRequest } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });

  const versions = await prisma.modVersion.findMany({
    orderBy: { releaseDate: "desc" },
    include: { changelog: true },
  });
  return NextResponse.json(versions);
}

export async function POST(req: NextRequest) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });

  const data = await req.json();
  const version = await prisma.modVersion.create({
    data: {
      mcVersion: data.mcVersion,
      modVersion: data.modVersion,
      loader: data.loader,
      releaseDate: new Date(data.releaseDate),
      status: data.status || "stable",
      fileSize: data.fileSize,
      fileName: data.fileName,
      downloadUrl: data.downloadUrl,
    },
  });
  return NextResponse.json(version, { status: 201 });
}

export async function PUT(req: NextRequest) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });

  const data = await req.json();
  const { id, ...rest } = data;
  const version = await prisma.modVersion.update({
    where: { id },
    data: { ...rest, releaseDate: rest.releaseDate ? new Date(rest.releaseDate) : undefined },
  });
  return NextResponse.json(version);
}

export async function DELETE(req: NextRequest) {
  const admin = await getAdminFromRequest(req);
  if (!admin) return NextResponse.json({ error: "Não autorizado." }, { status: 401 });

  const { id } = await req.json();
  await prisma.modVersion.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
