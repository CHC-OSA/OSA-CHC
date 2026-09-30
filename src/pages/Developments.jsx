import PageHero from "../components/layout/PageHero";
import { DevelopmentCardWithPhoto } from "../components/developments/DevelopmentCard";
import { DEVELOPMENTS } from "../data/developments";

export default function Developments() {
  return (
    <>
      <PageHero
        eyebrow="பாடசாலை அபிவிருத்திப் பணிகள்"
        title="தற்போதைய அபிவிருத்திப் பணிகள்"
        lead="பழைய மாணவர் சங்கத்தின் ஆதரவுடன் பாடசாலையில் நடைபெறும் கட்டிட, வசதி மேம்பாட்டுத் திட்டங்களும், அவற்றின் அபிவிருத்தி காலவரைவும் இங்கே காணப்படுகின்றன."
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
