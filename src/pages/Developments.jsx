import PageHero from "../components/layout/PageHero";
import { DevelopmentCardWithPhoto } from "../components/developments/DevelopmentCard";
import { DEVELOPMENTS } from "../data/developments";

export default function Developments() {
  return (
    <>
      <PageHero
        eyebrow="பாடசாலை அபிவிருத்திப் பணிகள்"
        title="தற்போதைய அபிவிருத்திப் பணிகள்"
        lead="பழைய மாணவர் ஆசிரியர் சங்கத்தின் ஆதரவுடன் பாடசாலையில் முன்னெடுக்கப்படும் கட்டட நிர்மாண, வசதி மேம்பாட்டுத் திட்டங்களும் அவற்றின் காலவரிசையும் இங்கு தரப்பட்டுள்ளன."
      />
      <div className="container page-body">
        <div className="grid-3">
          {DEVELOPMENTS.map((development) => (
            <DevelopmentCardWithPhoto key={development.id} development={development} />
          ))}
        </div>
      </div>
    </>
  );
}
