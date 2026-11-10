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
  const percent = total ? Math.min(100, Math.round((funds.spent / total) * 100)) : 0;

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
          <p className="fund-share">மொத்த நிதியில் {percent}%</p>
        </div>
        <div className="fund-figure">
          <p className="fund-label">கையிருப்பிலுள்ள நிதி</p>
          <Amount value={balance} className="fund-value-balance" />
          <p className="fund-share">மொத்த நிதியில் {100 - percent}%</p>
        </div>
      </div>
      <div className="fund-track-head">
        <span>மொத்த நிதியின் பயன்பாடு</span>
        <span className="fund-track-percent">{percent}% செலவிடப்பட்டுள்ளது</span>
      </div>
      <div
        className="fund-track"
        role="progressbar"
        aria-label="மொத்த நிதியில் செலவிடப்பட்டுள்ள பங்கு"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percent}
      >
        <div className="fund-bar" style={{ width: `${percent}%` }} />
      </div>
      <div className="fund-track-legend">
        <span>
          <i className="fund-dot fund-dot-spent" aria-hidden="true" /> செலவிடப்பட்டது {percent}%
        </span>
        <span>
          <i className="fund-dot fund-dot-balance" aria-hidden="true" /> கையிருப்பு {100 - percent}%
        </span>
      </div>
      <p className="fund-updated">இறுதியாக இற்றைப்படுத்தப்பட்ட திகதி: {formatDate(funds.updatedOn)}</p>
    </div>
  );
}
