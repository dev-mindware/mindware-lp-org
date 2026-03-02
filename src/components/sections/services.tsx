import { ArrowRight } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FadeUp } from "@/components/animations/fade-up";

import { services } from "@/data";

export function Services() {
  return (
    <section id="services" className="py-24 bg-muted/30 relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">
            Nossos Serviços
          </h2>
          <p className="text-lg text-muted-foreground">
            Combinamos criatividade estratégica com engenharia de ponta para
            entregar soluções que impulsionam o seu negócio.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <FadeUp key={index} delay={index * 0.1} className="h-full">
              <Card
                className={`h-full border-muted hover:border-primary/50 transition-all hover:shadow-lg bg-card group relative overflow-hidden flex flex-col ${service.highlight ? "border-primary" : ""}`}
              >
                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                  <service.icon className="w-32 h-32 text-primary transform rotate-12 translate-x-8 -translate-y-8" />
                </div>

                <CardHeader>
                  <div className="w-14 h-14 rounded-test-test-lg bg-primary/10 flex items-center justify-center mb-6 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                    <service.icon className="w-7 h-7" />
                  </div>
                  <CardTitle className="text-xl font-bold">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col grow">
                  <CardDescription className="text-base mb-6">
                    {service.description}
                  </CardDescription>
                  <ul className="space-y-2 mb-8 grow">
                    {service.features.map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-center text-sm text-muted-foreground"
                      >
                        <span className="w-1.5 h-1.5 rounded-test-test-full bg-primary mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {service.link && (
                    <Link href={service.link} className="mt-auto">
                      <Button className="w-full group/btn" variant="default">
                        Ver Serviço
                        <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                      </Button>
                    </Link>
                  )}
                </CardContent>
              </Card>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}
