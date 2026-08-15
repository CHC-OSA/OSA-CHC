import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <div className="container" style={{ padding: "88px clamp(20px,4vw,48px) 100px", textAlign: "center" }}>
      <span style={{ display: "block", fontSize: 13, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-accent-700)", marginBottom: 14 }}>
        404
      </span>
      <h1 style={{ fontSize: "clamp(28px,3.6vw,40px)", margin: "0 0 16px" }}>
        இந்தப் பக்கம் கிடைக்கவில்லை
      </h1>
      <p style={{ fontSize: 16, lineHeight: 1.7, color: "color-mix(in srgb, var(--color-text) 78%, transparent)", margin: "0 0 28px" }}>
        நீங்கள் தேடும் பக்கம் நகர்த்தப்பட்டிருக்கலாம் அல்லது நீக்கப்பட்டிருக்கலாம்.
      </p>
      <Button as="link" to="/" variant="primary">
        முகப்புக்குத் திரும்பு
      </Button>
    </div>
  );
}
