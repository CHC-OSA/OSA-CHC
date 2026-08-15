import { useState } from "react";
import emailjs from "@emailjs/browser";
import Field from "../ui/Field";
import Button from "../ui/Button";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

function isConfigured(value) {
  return Boolean(value) && !value.includes("REPLACE_ME");
}

const emailjsReady =
  isConfigured(SERVICE_ID) && isConfigured(TEMPLATE_ID) && isConfigured(PUBLIC_KEY);

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [errorMessage, setErrorMessage] = useState("");

  const setField = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!emailjsReady) {
      setStatus("error");
      setErrorMessage("தொடர்பு படிவம் தற்போது கிடைக்கவில்லை — நேரடியாக osa@chc.lk முகவரிக்கு மின்னஞ்சல் அனுப்பவும்.");
      return;
    }

    setStatus("sending");
    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        { from_name: form.name, from_email: form.email, message: form.message },
        { publicKey: PUBLIC_KEY }
      );
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
      setErrorMessage("செய்தி அனுப்புவதில் பிழை ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Field label="பெயர்" id="ct-name" placeholder="உங்கள் பெயர்" value={form.name} onChange={setField("name")} required />
      <Field
        label="மின்னஞ்சல்"
        id="ct-email"
        type="email"
        placeholder="name@email.com"
        value={form.email}
        onChange={setField("email")}
        required
        style={{ marginTop: 16 }}
      />
      <Field
        label="செய்தி"
        id="ct-msg"
        type="textarea"
        rows={5}
        placeholder="உங்கள் செய்தியை இங்கே தட்டச்சு செய்யவும்"
        value={form.message}
        onChange={setField("message")}
        required
        style={{ marginTop: 16 }}
      />

      <Button type="submit" variant="primary" block style={{ marginTop: 20 }} disabled={status === "sending"}>
        {status === "sending" ? "அனுப்புகிறது…" : "அனுப்பு"}
      </Button>

      {status === "success" && (
        <p className="text-muted" style={{ fontSize: 13, marginTop: 12 }}>
          நன்றி! உங்கள் செய்தி அனுப்பப்பட்டது.
        </p>
      )}
      {status === "error" && (
        <p style={{ fontSize: 13, marginTop: 12, color: "var(--color-accent)" }}>{errorMessage}</p>
      )}
    </form>
  );
}
