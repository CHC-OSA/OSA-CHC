import PageHero from "../components/layout/PageHero";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      title="இந்தப் பக்கம் கிடைக்கவில்லை"
      lead="நீங்கள் தேடும் பக்கம் நகர்த்தப்பட்டிருக்கலாம் அல்லது நீக்கப்பட்டிருக்கலாம்."
      compact
    >
      <div className="page-hero-actions">
        <Button as="link" to="/" variant="light">
          முகப்புக்குத் திரும்பு
        </Button>
      </div>
    </PageHero>
  );
}
