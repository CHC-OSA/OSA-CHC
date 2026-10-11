import { useState } from "react";
import { FiFileText } from "react-icons/fi";
import Lightbox from "../ui/Lightbox";
import { formatRupees } from "../../data/building";

export default function DonorList({ donors }) {
  const [openReceipt, setOpenReceipt] = useState(null);
  const receipts = donors.filter((donor) => donor.receipt).map((donor) => donor.receipt);

  return (
    <>
      <div className="table-scroll">
        <table className="table donor-table">
          <thead>
            <tr>
              <th>#</th>
              <th>பெயர்</th>
              <th>திகதி</th>
              <th>தொகை</th>
              <th>பற்றுச்சீட்டு</th>
            </tr>
          </thead>
          <tbody>
            {donors.map((donor, i) => (
              <tr key={`${donor.name}-${i}`}>
                <td className="donor-num">{i + 1}</td>
                <td className="donor-name">{donor.name}</td>
                <td data-label="திகதி">{donor.date ?? "—"}</td>
                <td data-label="தொகை">{donor.amount ? formatRupees(donor.amount) : "—"}</td>
                <td className="donor-receipt-cell">
                  {donor.receipt ? (
                    <button type="button" className="link-arrow donor-receipt" onClick={() => setOpenReceipt(receipts.indexOf(donor.receipt))}>
                      <FiFileText aria-hidden="true" /> பார்வையிட
                    </button>
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {openReceipt !== null && (
        <Lightbox photos={receipts} index={openReceipt} alt="நன்கொடைப் பற்றுச்சீட்டு" onChange={setOpenReceipt} onClose={() => setOpenReceipt(null)} />
      )}
    </>
  );
}
