import { Phone, MapPin, Clock, Instagram, Facebook } from "lucide-react";
import benetoliLogo from "@/assets/benetoli-logo.png";

const Footer = () => {
  return (
    <footer id="contato" className="bg-[hsl(var(--header-footer))] text-foreground border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          {/* Logo e Descrição */}
          <div>
            <div className="flex flex-col items-center md:items-start gap-2 mb-4">
              <img src={benetoliLogo} alt="Benetoli Consórcios" className="h-20 w-auto" />
            </div>
            <div className="flex items-center gap-4 mt-2">
              <a
                href="https://www.facebook.com/profile.php?viewas=100000686899395&id=61566314376838"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
                aria-label="Facebook da Benetoli Consórcios">

                <Facebook className="w-8 h-8" />
              </a>
              <a
                href="https://www.instagram.com/thiag09.benetoli/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary/80 transition-colors"
                aria-label="Instagram da Benetoli Consórcios">
                
                <Instagram className="w-8 h-8" />
              </a>
            </div>
          </div>

          {/* Contato */}
          <div>
            <h3 className="text-xl font-bold mb-4">Fale Conosco</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <Phone className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">WhatsApp</p>
                  <p className="text-muted-foreground">(19) 97162-1610</p>
                </div>
              </div>
            </div>
          </div>

          {/* Localização e Horário */}
          <div>
            <h3 className="text-xl font-bold mb-4">Localização</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="text-muted-foreground">
                    Av. Francisco José de Camargo Andrade, 195 - Jardim Chapadão<br />
                    Campinas - SP, 13070-055
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Horário de Atendimento</p>
                  <p className="text-muted-foreground">
                    Segunda à Sexta: 8h às 18h<br />
                    Sábado: 8h às 12h
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-muted-foreground text-sm">
              © 2025 Benetoli Consórcios. Todos os direitos reservados.
            </p>
            <div className="flex gap-6 text-sm">
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Política de Privacidade
              </button>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                Termos de Uso
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>);

};

export default Footer;