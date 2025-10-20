import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MessageCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Support = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Message sent!",
      description: "We'll get back to you within 24 hours.",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const faqs = [
    {
      question: "How do I cancel my subscription?",
      answer: "You can cancel your subscription anytime from your account settings. Your access will continue until the end of your billing period.",
    },
    {
      question: "What devices can I watch on?",
      answer: "You can watch on smart TVs, smartphones, tablets, computers, and streaming devices.",
    },
    {
      question: "Can I download content to watch offline?",
      answer: "Yes! Premium and Ultimate plans allow downloads on mobile devices for offline viewing.",
    },
    {
      question: "How many people can watch at once?",
      answer: "This depends on your plan: Basic (1 screen), Premium (2 screens), Ultimate (4 screens).",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-center">Support Center</h1>
          <p className="text-muted-foreground text-center mb-12">
            We're here to help you with any questions or issues
          </p>

          {/* Contact Options */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            <div className="bg-card p-6 rounded-lg text-center border border-border hover:border-primary transition-colors">
              <Mail className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Email Support</h3>
              <p className="text-sm text-muted-foreground mb-3">Response within 24 hours</p>
              <a href="mailto:support@streamix.com" className="text-primary hover:underline text-sm">
                support@streamix.com
              </a>
            </div>
            <div className="bg-card p-6 rounded-lg text-center border border-border hover:border-primary transition-colors">
              <Phone className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Phone Support</h3>
              <p className="text-sm text-muted-foreground mb-3">Mon-Fri, 9AM-6PM</p>
              <a href="tel:+1234567890" className="text-primary hover:underline text-sm">
                +1 (234) 567-890
              </a>
            </div>
            <div className="bg-card p-6 rounded-lg text-center border border-border hover:border-primary transition-colors">
              <MessageCircle className="h-8 w-8 text-primary mx-auto mb-4" />
              <h3 className="font-semibold mb-2">Live Chat</h3>
              <p className="text-sm text-muted-foreground mb-3">Available 24/7</p>
              <Button variant="outline" size="sm" className="mt-1">
                Start Chat
              </Button>
            </div>
          </div>

          {/* FAQ Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div key={index} className="bg-card p-6 rounded-lg border border-border">
                  <h3 className="font-semibold mb-2 text-lg">{faq.question}</h3>
                  <p className="text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-card p-8 rounded-lg border border-border">
            <h2 className="text-2xl font-bold mb-6 text-center">Send us a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Name</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">Email</label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Subject</label>
                <Input
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="What is this about?"
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Message</label>
                <Textarea
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us more..."
                  rows={6}
                />
              </div>
              <Button type="submit" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Support;
