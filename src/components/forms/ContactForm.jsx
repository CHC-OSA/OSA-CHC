import { useState } from "react";
import emailjs from "@emailjs/browser";
import { FiAlertCircle, FiCheckCircle, FiSend } from "react-icons/fi";
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
      setErrorMessage("தொடர்பு படிவம் தற்போது கிடைக்கவில்லை — நேரடியாக chcostasecretary@gmail.com முகவரிக்கு மின்னஞ்சல் அனுப்பவும்.");
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
    <form onSubmit={handleSubmit} style={{ display: "grid", gap: 18 }}>
      <Field label="பெயர்" id="ct-name" placeholder="உங்கள் பெயர்" value={form.name} onChange={setField("name")} required />
      <Field
        label="மின்னஞ்சல்"
        id="ct-email"
        type="email"
        placeholder="name@email.com"
        value={form.email}
        onChange={setField("email")}
        required
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
      />

      <Button type="submit" variant="primary" block disabled={status === "sending"}>
        {status === "sending" ? "அனுப்புகிறது…" : "அனுப்பு"}
        {status !== "sending" && <FiSend aria-hidden="true" />}
      </Button>

      {status === "success" && (
        <p className="alert alert-success" role="status">
          <FiCheckCircle aria-hidden="true" /> நன்றி! உங்கள் செய்தி அனுப்பப்பட்டது.
        </p>
      )}
      {status === "error" && (
        <p className="alert alert-error" role="alert">
          <FiAlertCircle aria-hidden="true" /> {errorMessage}
        </p>
      )}
    </form>
  );
}
