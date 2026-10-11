import { formatDate, formatRupees } from "../../data/building";

// Collected vs. spent at a glance; the bar is the share of collected funds already put to use.
export default function FundSummary({ funds }) {
  const balance = funds.collected - funds.spent;
  const percent = funds.collected ? Math.min(100, Math.round((funds.spent / funds.collected) * 100)) : 0;

  return (
    <div className="fund">
      <div className="fund-figures">
        <div className="fund-figure">
          <p className="fund-label">இதுவரை திரட்டப்பட்டுள்ள நிதி</p>
          <p className="fund-value">{formatRupees(funds.collected)}</p>
        </div>
        <div className="fund-figure">
          <p className="fund-label">கட்டுமானப் பணிகளுக்காகச் செலவிடப்பட்டுள்ள நிதி</p>
          <p className="fund-value fund-value-spent">{formatRupees(funds.spent)}</p>
        </div>
      </div>
      <div
        className="fund-track"
        role="progressbar"
        aria-label="திரட்டப்பட்ட நிதியில் செலவிடப்பட்டுள்ள பங்கு"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div className="fund-bar" style={{ width: `${percent}%` }} />
      </div>
      <div className="fund-foot">
        <span>
          திரட்டப்பட்ட நிதியில் {percent}% பயன்படுத்தப்பட்டுள்ளது · கையிருப்பிலுள்ள நிதி {formatRupees(balance)}
        </span>
        <span className="fund-updated">இறுதியாக இற்றைப்படுத்தப்பட்ட திகதி: {formatDate(funds.updatedOn)}</span>
      </div>
    </div>
  );
}
