import Link from "next/link";
import { Package, Github, MessageSquare, ExternalLink } from "lucide-react";

const footerLinks = {
  mod: [
    { label: "Download", href: "/download" },
    { label: "Versões", href: "/versoes" },
    { label: "Changelog", href: "/changelog" },
    { label: "FAQ", href: "/faq" },
  ],
  comunidade: [
    { label: "Discord", href: "#", external: true },
    { label: "GitHub", href: "#", external: true },
    { label: "CurseForge", href: "#", external: true },
    { label: "Modrinth", href: "#", external: true },
  ],
  legal: [
    { label: "Política de Privacidade", href: "/privacidade" },
    { label: "Termos de Uso", href: "/termos" },
    { label: "Licença", href: "/licenca" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/5 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="col-span-1">
            <Link href="/" className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
                <Package className="w-4 h-4 text-primary" />
              </div>
              <span className="font-display font-bold text-lg">
                Backpack<span className="text-primary">Craft</span>
              </span>
            </Link>
            <p className="text-muted text-sm leading-relaxed mb-6">
              Um mod de mochilas moderno e completo para Minecraft. Suporte a
              Forge e Fabric nas versões 1.16.5 até 1.21.x.
            </p>
            <div className="flex items-center gap-3">
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-muted hover:text-primary hover:border-primary/30 transition-all"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href="#"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-muted hover:text-primary hover:border-primary/30 transition-all"
              >
                <Github className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Mod */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-4 uppercase tracking-wider">
              Mod
            </h4>
            <ul className="space-y-3">
              {footerLinks.mod.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Comunidade */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-4 uppercase tracking-wider">
              Comunidade
            </h4>
            <ul className="space-y-3">
              {footerLinks.comunidade.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.external ? "_blank" : undefined}
                    rel={link.external ? "noopener noreferrer" : undefined}
                    className="text-muted text-sm hover:text-primary transition-colors inline-flex items-center gap-1"
                  >
                    {link.label}
                    {link.external && <ExternalLink className="w-3 h-3" />}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold text-sm text-foreground mb-4 uppercase tracking-wider">
              Legal
            </h4>
            <ul className="space-y-3">
              {footerLinks.legal.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted text-sm hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-muted text-sm">
            © {new Date().getFullYear()} Backpack Craft. Todos os direitos
            reservados.
          </p>
          <p className="text-muted text-xs">
            Não afiliado ao Mojang Studios ou Microsoft.
          </p>
        </div>
      </div>
    </footer>
  );
}
