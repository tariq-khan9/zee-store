"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

const Newsletter = ({ className }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email.trim()) return;

    alert(
      `Thank you for subscribing! You'll receive our newsletter at ${email}`
    );
    setEmail("");
  };

  return (
    <section
      className={`py-16 bg-primary text-primary-foreground ${className}`}
    >
      <div className="container">
        <div className="max-w-2xl mx-auto text-center space-y-6">
          <h2 className="text-2xl md:text-3xl font-bold">
            Join Our Newsletter
          </h2>
          <p className="text-primary-foreground/80">
            Subscribe to get special offers, free giveaways, and
            once-in-a-lifetime deals.
          </p>
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <Input
              type="email"
              placeholder="Your email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground rounded-none placeholder:text-primary-foreground/60"
              required
            />
            <Button
              type="submit"
              variant="secondary"
              className="px-6 rounded-none"
            >
              Subscribe
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
