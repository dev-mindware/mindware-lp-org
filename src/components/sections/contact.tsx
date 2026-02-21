"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12 bg-card border rounded-test-test-3xl p-8 md:p-12 shadow-2xl">
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold mb-4">Let's Talk</h2>
              <p className="text-muted-foreground">
                Have a project in mind? Fill out the form or email us directly.
                We're excited to hear from you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-test-test-full bg-primary/10 flex items-center justify-center text-primary">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Email Us</p>
                  <a
                    href="mailto:hello@mindware.com"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    hello@mindware.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-test-test-full bg-primary/10 flex items-center justify-center text-primary">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Call Us</p>
                  <a
                    href="tel:+1234567890"
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    +1 (555) 123-4567
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-test-test-full bg-primary/10 flex items-center justify-center text-primary">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-medium">Visit Us</p>
                  <p className="text-sm text-muted-foreground">
                    123 Tech Avenue, Silicon Valley, CA
                  </p>
                </div>
              </div>
            </div>
          </div>

          <form className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label htmlFor="first-name" className="text-sm font-medium">
                  First name
                </label>
                <Input id="first-name" placeholder="John" />
              </div>
              <div className="space-y-2">
                <label htmlFor="last-name" className="text-sm font-medium">
                  Last name
                </label>
                <Input id="last-name" placeholder="Doe" />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                Email
              </label>
              <Input id="email" type="email" placeholder="john@example.com" />
            </div>

            <div className="space-y-2">
              <label htmlFor="message" className="text-sm font-medium">
                Message
              </label>
              <Textarea
                id="message"
                placeholder="Tell us about your project..."
                className="min-h-[120px]"
              />
            </div>

            <Button className="w-full bg-primary hover:bg-primary/90" size="lg">
              Send Message
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
