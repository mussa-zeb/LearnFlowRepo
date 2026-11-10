import { useState } from "react";
import {
  Mail,
  MessageSquare,
  MapPin,
  CheckCircle,
  AlertCircle,
  User,
  Tag,
  Send,
  Navigation,
  GraduationCap,
} from "lucide-react";

// Image (src/assets/ mein maujood hai)
import contactImg from "../../assets/contect-new.webp";

/* ---------- Colors (Home jaisi) ----------
   white  #FFFFFF  page background
   cream  #FDF6EE  cards, boxes
   peach  #FBEBDD  soft panels
   line   #EBDCCB  borders
   clay   #C8683F  main accent (hover #B0552F)
   brown  #2B2420  dark parts, headings
   muted  #7A6A5E  body text
------------------------------------------ */

// Map wali jagah yahan se badlo
const MAP_QUERY = "Karachi, Pakistan";

// Chhota label jaise "— Send a Message"
const SectionLabel = ({ children }) => (
  <span className="flex items-center gap-2 text-xs font-semibold text-[#C8683F]">
    <span className="h-px w-6 bg-[#C8683F]" />
    {children}
  </span>
);

const inputClass =
  "block w-full rounded-xl border border-[#EBDCCB] bg-white py-3 pl-11 pr-4 text-sm text-[#2B2420] placeholder:text-[#7A6A5E]/70 transition focus:border-[#C8683F] focus:outline-none focus:ring-2 focus:ring-[#C8683F]/20";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setError("Please fill in all fields before sending.");
      return;
    }

    // Demo: no backend endpoint exists yet. Show confirmation.
    setSubmitted(true);
    setForm({ name: "", email: "", subject: "", message: "" });
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white text-[#2B2420]">
      {/* peeche ke soft blobs */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-[#FBEBDD]" />
      <div className="pointer-events-none absolute -right-28 top-10 h-80 w-80 rounded-full bg-[#FBEBDD]" />

      {/* ================= Header ================= */}
      <section className="relative mx-auto max-w-7xl px-4 pb-10 pt-14 text-center sm:px-8 lg:px-10 lg:pt-20">
        <span className="inline-flex items-center gap-2 rounded-full border border-[#EBDCCB] bg-[#FBEBDD] px-3 py-1.5 text-xs font-medium">
          <GraduationCap className="h-4 w-4 text-[#C8683F]" />
          Contact Us
        </span>

        <h1 className="mt-5 text-4xl font-bold leading-[1.1] tracking-[-0.02em] sm:text-5xl lg:text-6xl">
          Get in <span className="text-[#C8683F]">touch</span>
        </h1>

        <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#7A6A5E] sm:text-base">
          Have a question, feedback, or need help with a course? Fill out the
          form below and our team will get back to you as soon as possible.
        </p>
        <span className="mx-auto mt-5 block h-1 w-16 rounded-full bg-[#C8683F]" />
      </section>

      {/* ================= Info cards ================= */}
      <section className="relative mx-auto max-w-7xl px-4 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {/* Email */}
          <div className="flex items-start gap-4 rounded-2xl border border-[#EBDCCB] bg-[#FDF6EE] p-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#EBDCCB] bg-[#FBEBDD]">
              <Mail className="h-5 w-5 stroke-[1.8] text-[#C8683F]" />
            </span>
            <div>
              <h3 className="text-sm font-semibold">Email Us</h3>
              <p className="mt-1 text-sm text-[#7A6A5E]">
                Our friendly team is here to help.
              </p>
              <a
                href="mailto:hello@learnflow.com"
                className="mt-1 inline-block text-sm font-semibold text-[#C8683F] hover:underline"
              >
                hello@learnflow.com
              </a>
            </div>
          </div>

          {/* Support */}
          <div className="flex items-start gap-4 rounded-2xl border border-[#EBDCCB] bg-[#FDF6EE] p-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#EBDCCB] bg-[#FBEBDD]">
              <MessageSquare className="h-5 w-5 stroke-[1.8] text-[#C8683F]" />
            </span>
            <div>
              <h3 className="text-sm font-semibold">Support</h3>
              <p className="mt-1 text-sm text-[#7A6A5E]">
                Need technical assistance?
              </p>
              <a
                href="mailto:support@learnflow.com"
                className="mt-1 inline-block text-sm font-semibold text-[#C8683F] hover:underline"
              >
                support@learnflow.com
              </a>
            </div>
          </div>

          {/* Location */}
          <div className="flex items-start gap-4 rounded-2xl border border-[#EBDCCB] bg-[#FDF6EE] p-5">
            <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full border border-[#EBDCCB] bg-[#FBEBDD]">
              <MapPin className="h-5 w-5 stroke-[1.8] text-[#C8683F]" />
            </span>
            <div>
              <h3 className="text-sm font-semibold">Location</h3>
              <p className="mt-1 text-sm text-[#7A6A5E]">
                We are a remote-first team.
              </p>
              <p className="mt-1 text-sm font-semibold">Worldwide</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================= Form + picture ================= */}
      <section className="relative mx-auto max-w-7xl px-4 pt-6 sm:px-8 lg:px-10">
        <div className="grid overflow-hidden rounded-3xl border border-[#EBDCCB] bg-[#FDF6EE] lg:grid-cols-2">
          {/* Form */}
          <div className="p-6 sm:p-10">
            <SectionLabel>Send a Message</SectionLabel>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.02em]">
              Drop us a message
            </h2>
            <p className="mt-2 max-w-sm text-sm leading-6 text-[#7A6A5E]">
              Fill out the form below and we'll get back to you as soon as
              possible.
            </p>

            {error && (
              <div className="mt-5 flex items-start gap-2 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-800 ring-1 ring-red-200">
                <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
                <span>{error}</span>
              </div>
            )}

            {submitted && (
              <div className="mt-5 flex items-start gap-2 rounded-xl bg-green-50 px-4 py-3 text-sm font-medium text-green-800 ring-1 ring-green-200">
                <CheckCircle className="mt-0.5 h-5 w-5 shrink-0 text-green-600" />
                <span>
                  Thanks! Your message has been received. We'll be in touch
                  soon.
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="mt-6 space-y-3">
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="relative">
                  <User className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C8683F]" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Your Name"
                    className={inputClass}
                  />
                </div>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C8683F]" />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Your Email"
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="relative">
                <Tag className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#C8683F]" />
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Subject (optional)"
                  className={inputClass}
                />
              </div>

              <div className="relative">
                <MessageSquare className="pointer-events-none absolute left-4 top-4 h-4 w-4 text-[#C8683F]" />
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  value={form.message}
                  onChange={handleChange}
                  placeholder="How can we help you today?"
                  className={`${inputClass} resize-none`}
                />
              </div>

              <button
                type="submit"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-[#C8683F] px-8 text-sm font-semibold text-white transition-colors hover:bg-[#B0552F]"
              >
                <Send className="h-4 w-4" />
                Send Message
              </button>
            </form>
          </div>

          {/* Picture side */}
          <div className="relative h-64 sm:h-80 lg:h-auto lg:min-h-[420px]">
            <img
              src={contactImg}
              alt="LearnFlow office"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ================= Office location ================= */}
      <section className="relative mx-auto max-w-7xl px-4 pb-16 pt-6 sm:px-8 lg:px-10">
        <div className="grid items-center gap-6 rounded-3xl border border-[#EBDCCB] bg-[#FDF6EE] p-6 sm:p-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <SectionLabel>Find Us</SectionLabel>
            <h2 className="mt-2 text-3xl font-bold tracking-[-0.02em]">
              Our Office Location
            </h2>
            <p className="mt-2 max-w-xs text-sm leading-6 text-[#7A6A5E]">
              Visit our office or get directions on Google Maps.
            </p>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                MAP_QUERY
              )}`}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-[#EBDCCB] bg-white px-6 text-sm font-semibold transition-colors hover:bg-[#FBEBDD]"
            >
              <Navigation className="h-4 w-4 text-[#C8683F]" />
              Get Directions
            </a>
          </div>

          <div className="overflow-hidden rounded-2xl border border-[#EBDCCB] bg-white">
            <iframe
              title="LearnFlow office location"
              src={`https://www.google.com/maps?q=${encodeURIComponent(
                MAP_QUERY
              )}&output=embed`}
              className="h-64 w-full sm:h-72"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </main>
  );
};

export default Contact;