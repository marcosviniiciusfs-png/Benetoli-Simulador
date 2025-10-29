import { useState } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { Button } from "@/components/ui/button";

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const testimonials = [
    {
      name: "Família Oliveira",
      type: "Van Comercial Entregue",
      text: "Realizei meu sonho com a ajuda da CréditoFácil. O processo foi rápido, transparente e sem burocracias. Recomendo para todos que querem conquistar seus objetivos!",
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=400&fit=crop"
    },
    {
      name: "Carlos Mendes",
      type: "Casa Própria",
      text: "Depois de anos economizando, consegui financiar minha casa própria. A equipe da CréditoFácil me ajudou a encontrar as melhores condições. Muito obrigado!",
      image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&h=400&fit=crop"
    },
    {
      name: "Marina Santos",
      type: "Carro Novo",
      text: "Simulei online e recebi todas as informações no WhatsApp. Em poucos dias estava com meu carro zero! Processo muito fácil e confiável.",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=400&fit=crop"
    }
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primary mb-4">
            Clientes Contemplados
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Mais de 1000 famílias já realizaram o sonho da casa própria e do carro novo.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="bg-card rounded-2xl shadow-xl p-8 md:p-12 relative">
            <Quote className="absolute top-8 left-8 w-12 h-12 text-primary/20" />
            
            <div className="grid md:grid-cols-[300px,1fr] gap-8 items-center">
              <div className="mx-auto">
                <img
                  src={testimonials[currentIndex].image}
                  alt={testimonials[currentIndex].name}
                  className="w-64 h-64 object-cover rounded-xl shadow-lg"
                />
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-2xl font-bold text-primary mb-1">
                    Cliente Contemplado
                  </h3>
                  <p className="text-lg font-semibold text-foreground">
                    {testimonials[currentIndex].type}
                  </p>
                </div>

                <p className="text-muted-foreground leading-relaxed text-lg italic">
                  "{testimonials[currentIndex].text}"
                </p>

                <p className="text-primary font-semibold pt-4">
                  — {testimonials[currentIndex].name}
                </p>
              </div>
            </div>

            <div className="flex justify-center items-center gap-4 mt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={handlePrev}
                className="rounded-full"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentIndex(index)}
                    className={`h-2 rounded-full transition-all ${
                      index === currentIndex ? "w-8 bg-primary" : "w-2 bg-border"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="outline"
                size="icon"
                onClick={handleNext}
                className="rounded-full"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
