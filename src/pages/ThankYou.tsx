import { useEffect } from "react";
import { CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { consumeLeadData } from "@/lib/lead-data";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

const ThankYou = () => {
  useEffect(() => {
    window.fbq?.("track", "PageView");

    const lead = consumeLeadData();
    const customData: Record<string, unknown> = {
      content_name: "Simulador Benetoli Consórcios",
      content_category: "consorcio_imovel",
      currency: "BRL",
    };
    if (lead) {
      customData.value = lead.valor_pretendido_numero;
      customData.tipo = lead.tipo;
      customData.tipo_bem = lead.tipo_bem;
      customData.tempo_aquisicao = lead.tempo_aquisicao;
      customData.valor_pretendido = lead.valor_pretendido;
      customData.tem_entrada = lead.tem_entrada;
      customData.valor_entrada = lead.valor_entrada;
      customData.parcela_ideal = lead.parcela_ideal;
      customData.cidade = lead.cidade;
    }
    window.fbq?.("track", "Lead", customData);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="flex justify-center">
          <div className="rounded-full bg-primary/10 p-6">
            <CheckCircle className="w-16 h-16 text-primary" />
          </div>
        </div>

        <div className="space-y-3">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">
            Obrigado!
          </h1>
          <p className="text-lg text-muted-foreground">
            Sua solicitação foi enviada com sucesso! Em breve entraremos em contato via WhatsApp.
          </p>
        </div>

        <div className="pt-4">
          <Link to="/">
            <Button className="bg-primary hover:bg-primary-hover">
              Voltar para o início
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;
