import PageHero from "../components/layout/PageHero";
import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <PageHero
      eyebrow="404"
      title="இப்பக்கத்தைக் காண முடியவில்லை"
      lead="நீங்கள் தேடும் பக்கம் வேறிடத்திற்கு மாற்றப்பட்டிருக்கலாம் அல்லது நீக்கப்பட்டிருக்கலாம்."
      compact
    >
      <div className="page-hero-actions">
        <Button as="link" to="/" variant="light">
          முகப்புக்குத் திரும்பவும்
        </Button>
      </div>
    </PageHero>
  );
}
