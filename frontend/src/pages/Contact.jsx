import { Mail, MapPin, MessageSquare, Send, Share2 } from "lucide-react";
import PageHeader from "../components/PageHeader.jsx";
import { createItem, readRecord } from "../data/store.js";

export default function Contact() {
  const home = readRecord("homeContent");
  const submit = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    createItem("messages", Object.fromEntries(form.entries()));
    event.currentTarget.reset();
    alert("Message submitted successfully.");
  };
  return (
    <div className="page-enter space-y-8">
      <PageHeader
        eyebrow="Contact us"
        title="Let's build your career platform together."
        description="Send questions, partnership requests, hiring inquiries, or support messages. Every submission is saved for admin review."
      />

      <section className="grid gap-6 lg:grid-cols-[1fr_.75fr]">
        <form onSubmit={submit} className="premium-card grid gap-4 p-6">
          <div className="grid gap-4 md:grid-cols-2">
            <input name="name" required placeholder="Your name" className="field" />
            <input name="email" required type="email" placeholder="Email address" className="field" />
          </div>
          <input name="subject" placeholder="Subject" className="field" />
          <textarea name="message" required placeholder="Tell us what you need" rows="7" className="field resize-none" />
          <button className="btn-primary w-full justify-center md:w-fit">
            Send Message <Send className="h-4 w-4" />
          </button>
        </form>

        <aside className="grid gap-4">
          {[
            { icon: Mail, label: "Email", value: home.contactEmail },
            { icon: Share2, label: "Social Media", value: home.socials },
            { icon: MapPin, label: "Location", value: "Remote-first education and hiring platform" },
            { icon: MessageSquare, label: "Response", value: "Admin team reviews messages from the dashboard" }
          ].map(({ icon: Icon, label, value }) => (
            <article key={label} className="premium-card p-5">
              <div className="flex items-start gap-4">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-primary/10 text-primary">
                  <Icon className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-bold text-primaryText">{label}</h2>
                  <p className="mt-1 text-sm leading-6 text-secondaryText">{value}</p>
                </div>
              </div>
            </article>
          ))}
        </aside>
      </section>
    </div>
  );
}
