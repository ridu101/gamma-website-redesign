
import { Check, X, ArrowRight } from "lucide-react";
import "./QuoteSuccessModal.css";

const QuoteSuccessModal = ({ isOpen, onClose, isDemo = false }) => {
  if (!isOpen) return null;

  return (
    <div
      className="quote-success-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div
        className="quote-success-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="quote-success-title"
      >
        <button
          type="button"
          className="quote-success-close"
          onClick={onClose}
          aria-label="Close confirmation"
        >
          <X size={19} />
        </button>

        <div className="quote-success-icon">
          <Check size={35} strokeWidth={2.5} />
        </div>

        <span className="quote-success-label">
          {isDemo ? "DEMO SUBMISSION" : "REQUEST RECEIVED"}
        </span>

        <h2 id="quote-success-title">
          Thank You for <span>Reaching Out!</span>
        </h2>

        <p>
          Your project inquiry has been submitted successfully.
          Our team will review your requirements and get back to you
          as soon as possible.
        </p>

        {isDemo && (
          <div className="quote-demo-notice">
            Demo mode is active. Your form is not being emailed yet.
            Backend integration is required to deliver this request.
          </div>
        )}

        <button
          type="button"
          className="quote-success-button"
          onClick={onClose}
        >
          Back to Website
          <ArrowRight size={17} />
        </button>

        <div className="quote-success-footer">
          GAMMASOFT <span>•</span> THE NEXT INNOVATION
        </div>
      </div>
    </div>
  );
};

export default QuoteSuccessModal;
