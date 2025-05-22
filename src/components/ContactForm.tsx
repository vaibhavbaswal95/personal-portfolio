"use client";
import React, { useState } from "react";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill in all fields.");
      return;
    }
    setError("");
    setSubmitted(true);
    // Integrate with EmailJS or similar here
  }

  return (
    <form className="glass rounded-lg max-w-lg w-full p-8 flex flex-col gap-4" onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-galaxy-500 font-display mb-2 text-white">Email Me</h2>
      <input
        className="rounded-lg px-4 py-2 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-galaxy-500"
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
      />
      <input
        className="rounded-lg px-4 py-2 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-galaxy-500"
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
      />
      <textarea
        className="rounded-lg px-4 py-2 bg-white/10 text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-galaxy-500 min-h-[100px]"
        name="message"
        placeholder="Your Message"
        value={form.message}
        onChange={handleChange}
      />
      {error && <div className="text-red-400 text-sm">{error}</div>}
      {submitted ? (
        <div className="text-green-400 text-sm">Thank you! Your message has been sent.</div>
      ) : (
        <button
          type="submit"
          className="bg-galaxy-500 hover:bg-galaxy-400 text-white font-bold py-2 px-6 rounded-lg transition"
        >
          Send Message
        </button>
      )}
    </form>
  );
} 