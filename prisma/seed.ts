import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash(
    process.env.ADMIN_PASSWORD || "changeme123",
    12
  );

  await prisma.admin.upsert({
    where: { email: process.env.ADMIN_EMAIL || "admin@backpackcraft.com" },
    update: {},
    create: {
      email: process.env.ADMIN_EMAIL || "admin@backpackcraft.com",
      password: hashedPassword,
    },
  });

  const versions = await Promise.all([
    prisma.modVersion.upsert({
      where: { id: "v121" },
      update: {},
      create: {
        id: "v121",
        mcVersion: "1.21.x",
        modVersion: "2.0.0",
        loader: "Forge / Fabric",
        releaseDate: new Date("2024-10-01"),
        status: "stable",
        fileSize: "1.2 MB",
        fileName: "backpack-craft-2.0.0-mc1.21.jar",
        downloadUrl: "#",
        downloads: 45230,
      },
    }),
    prisma.modVersion.upsert({
      where: { id: "v1201" },
      update: {},
      create: {
        id: "v1201",
        mcVersion: "1.20.1",
        modVersion: "1.8.0",
        loader: "Forge / Fabric",
        releaseDate: new Date("2024-06-15"),
        status: "stable",
        fileSize: "1.1 MB",
        fileName: "backpack-craft-1.8.0-mc1.20.1.jar",
        downloadUrl: "#",
        downloads: 98750,
      },
    }),
    prisma.modVersion.upsert({
      where: { id: "v1192" },
      update: {},
      create: {
        id: "v1192",
        mcVersion: "1.19.2",
        modVersion: "1.5.0",
        loader: "Forge",
        releaseDate: new Date("2023-11-20"),
        status: "stable",
        fileSize: "980 KB",
        fileName: "backpack-craft-1.5.0-mc1.19.2.jar",
        downloadUrl: "#",
        downloads: 67400,
      },
    }),
    prisma.modVersion.upsert({
      where: { id: "v1182" },
      update: {},
      create: {
        id: "v1182",
        mcVersion: "1.18.2",
        modVersion: "1.3.0",
        loader: "Forge",
        releaseDate: new Date("2023-04-10"),
        status: "stable",
        fileSize: "870 KB",
        fileName: "backpack-craft-1.3.0-mc1.18.2.jar",
        downloadUrl: "#",
        downloads: 32100,
      },
    }),
    prisma.modVersion.upsert({
      where: { id: "v1165" },
      update: {},
      create: {
        id: "v1165",
        mcVersion: "1.16.5",
        modVersion: "1.0.0",
        loader: "Forge",
        releaseDate: new Date("2022-08-05"),
        status: "stable",
        fileSize: "720 KB",
        fileName: "backpack-craft-1.0.0-mc1.16.5.jar",
        downloadUrl: "#",
        downloads: 21500,
      },
    }),
  ]);

  await prisma.changelog.createMany({
    skipDuplicates: true,
    data: [
      {
        modVersionId: versions[0].id,
        additions: [
          "Suporte completo ao Minecraft 1.21.x",
          "Novo sistema de slots expansíveis",
          "Mochilas ender com sincronização entre mundos",
          "Suporte nativo ao Fabric 0.16+",
        ],
        fixes: [
          "Corrigido crash ao abrir mochila em servidores",
          "Corrigido item duplicado em certas condições",
          "Corrigido renderização incorreta no inventário",
        ],
        improvements: [
          "Otimização de performance em 30%",
          "Interface de usuário completamente redesenhada",
          "Compatibilidade melhorada com JEI/REI",
        ],
      },
      {
        modVersionId: versions[1].id,
        additions: [
          "Sistema de mochilas coloridas (16 cores)",
          "Suporte ao Fabric para 1.20.1",
          "Mochilas com enchantamentos",
        ],
        fixes: [
          "Corrigido duplication bug com hoppers",
          "Corrigido tooltip incorreto",
        ],
        improvements: [
          "Melhor integração com mods de automação",
          "Receitas rebalanceadas",
        ],
      },
      {
        modVersionId: versions[2].id,
        additions: [
          "Sistema de upgrades de capacidade",
          "Mochila de couro básica adicionada",
        ],
        fixes: [
          "Corrigido crash ao morrer com mochila equipada",
          "Corrigido perda de itens ao reiniciar",
        ],
        improvements: ["Interface simplificada", "Melhor performance"],
      },
    ],
  });

  await prisma.galleryImage.createMany({
    skipDuplicates: true,
    data: [
      {
        id: "g1",
        title: "Interface da Mochila",
        description: "Interface limpa e organizada da mochila grande",
        url: "https://placehold.co/800x450/18181B/22C55E?text=Interface+Mochila",
        order: 1,
      },
      {
        id: "g2",
        title: "Mochilas Coloridas",
        description: "Sistema de cores disponíveis para personalização",
        url: "https://placehold.co/800x450/18181B/22C55E?text=Mochilas+Coloridas",
        order: 2,
      },
      {
        id: "g3",
        title: "Sistema de Upgrades",
        description: "Painel de upgrades de capacidade",
        url: "https://placehold.co/800x450/18181B/22C55E?text=Sistema+de+Upgrades",
        order: 3,
      },
      {
        id: "g4",
        title: "Crafting das Mochilas",
        description: "Receitas balanceadas no crafting",
        url: "https://placehold.co/800x450/18181B/22C55E?text=Crafting",
        order: 4,
      },
      {
        id: "g5",
        title: "Mochila Equipada",
        description: "Mochila visível no personagem",
        url: "https://placehold.co/800x450/18181B/22C55E?text=Mochila+Equipada",
        order: 5,
      },
      {
        id: "g6",
        title: "Organização de Inventário",
        description: "Recursos de organização automática",
        url: "https://placehold.co/800x450/18181B/22C55E?text=Inventario",
        order: 6,
      },
    ],
  });

  await prisma.faqItem.createMany({
    skipDuplicates: true,
    data: [
      {
        id: "f1",
        question: "O mod funciona em qual versão do Minecraft?",
        answer:
          "O Backpack Craft suporta as versões 1.16.5, 1.18.2, 1.19.2, 1.20.1 e 1.21.x do Minecraft. Sempre verifique a aba de versões para garantir compatibilidade.",
        order: 1,
      },
      {
        id: "f2",
        question: "Preciso de Forge ou Fabric?",
        answer:
          "Depende da versão. As versões para 1.20.1 e 1.21.x suportam tanto Forge quanto Fabric. As versões mais antigas (1.16.5, 1.18.2, 1.19.2) requerem Forge. Consulte a página de versões para detalhes.",
        order: 2,
      },
      {
        id: "f3",
        question: "Posso usar em multiplayer?",
        answer:
          "Sim! O Backpack Craft é totalmente compatível com servidores multiplayer. O mod deve estar instalado tanto no cliente quanto no servidor para funcionar corretamente.",
        order: 3,
      },
      {
        id: "f4",
        question: "O mod é pesado para o desempenho?",
        answer:
          "Não. O Backpack Craft foi desenvolvido com foco em performance. Ele tem impacto mínimo no TPS do servidor e no FPS do cliente, mesmo com muitas mochilas no mundo.",
        order: 4,
      },
      {
        id: "f5",
        question: "Como instalar o mod?",
        answer:
          "Instale o Forge ou Fabric correspondente à sua versão do Minecraft, baixe o arquivo .jar do Backpack Craft compatível com sua versão, coloque-o na pasta 'mods' do seu Minecraft e inicie o jogo com o perfil correto.",
        order: 5,
      },
      {
        id: "f6",
        question: "Vai ter suporte para novas versões?",
        answer:
          "Sim! O mod é atualizado regularmente para suportar novas versões do Minecraft. Acompanhe nosso Discord e GitHub para notificações de novas versões.",
        order: 6,
      },
      {
        id: "f7",
        question: "Posso usar em modpacks?",
        answer:
          "Sim, desde que você siga a licença do mod. O Backpack Craft pode ser incluído em modpacks distribuídos em plataformas como CurseForge e Modrinth, com atribuição adequada.",
        order: 7,
      },
    ],
  });

  await prisma.siteConfig.createMany({
    skipDuplicates: true,
    data: [
      { key: "discord_url", value: "https://discord.gg/backpackcraft" },
      { key: "github_url", value: "https://github.com/backpackcraft/mod" },
      { key: "curseforge_url", value: "https://www.curseforge.com" },
      { key: "modrinth_url", value: "https://modrinth.com" },
      {
        key: "hero_title",
        value: "Backpack Craft",
      },
      {
        key: "hero_subtitle",
        value:
          "Um mod de mochilas moderno, leve e completo para Minecraft.",
      },
      {
        key: "hero_description",
        value:
          "Leve mais itens, organize sua aventura e use mochilas personalizáveis em várias versões do Minecraft.",
      },
    ],
  });

  console.log("✅ Seed concluído com sucesso!");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
