import { addRupees, formatAmount, formatDate } from "../../data/building";

function Amount({ value, className }) {
  return (
    <p className={`fund-value ${className ?? ""}`}>
      ரூபா <span className="fund-digits">{formatAmount(value)}</span>
    </p>
  );
}

// Total funds, spent and balance at a glance; the bar is the share of the total already put to use.
export default function FundSummary({ funds }) {
  const total = addRupees(funds.donations, funds.interest);
  const balance = addRupees(total, -funds.spent);
  // One decimal place, so the two shares always add up to exactly 100.
  const spentShare = total ? Math.min(100, Math.round((funds.spent / total) * 1000) / 10) : 0;
  const balanceShare = Math.round((100 - spentShare) * 10) / 10;

  return (
    <div className="fund">
      <div className="fund-figures">
        <div className="fund-figure">
          <p className="fund-label">இதுவரை திரட்டப்பட்டுள்ள மொத்த நிதி</p>
          <Amount value={total} />
          <p className="fund-share">
            நன்கொடைகள் ரூபா {formatAmount(funds.donations)}
            <br />
            வட்டி வருமானம் ரூபா {formatAmount(funds.interest)}
          </p>
        </div>
        <div className="fund-figure">
          <p className="fund-label">கட்டுமானப் பணிகளுக்காகச் செலவிடப்பட்டுள்ள நிதி</p>
          <Amount value={funds.spent} className="fund-value-spent" />
          <p className="fund-share">மொத்த நிதியில் {spentShare}%</p>
        </div>
        <div className="fund-figure">
          <p className="fund-label">கையிருப்பிலுள்ள நிதி</p>
          <Amount value={balance} className="fund-value-balance" />
          <p className="fund-share">மொத்த நிதியில் {balanceShare}%</p>
        </div>
      </div>
      <p className="fund-track-title">மொத்த நிதியின் பயன்பாடு</p>
      <div className="fund-track-head">
        <span>{spentShare}% பயன்படுத்தப்பட்டுள்ளது</span>
        <span className="fund-track-available">{balanceShare}% கையிருப்பில்</span>
      </div>
      <div
        className="fund-track"
        role="progressbar"
        aria-label="மொத்த நிதியில் செலவிடப்பட்டுள்ள பங்கு"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={spentShare}
      >
        <div className="fund-bar" style={{ width: `${spentShare}%` }} />
      </div>
      <div className="fund-track-legend">
        <span>
          <i className="fund-dot fund-dot-spent" aria-hidden="true" /> செலவிடப்பட்டது
        </span>
        <span>
          <i className="fund-dot fund-dot-balance" aria-hidden="true" /> கையிருப்பு
        </span>
      </div>
      <p className="fund-updated">இறுதியாக இற்றைப்படுத்தப்பட்ட திகதி: {formatDate(funds.updatedOn)}</p>
    </div>
  );
}
