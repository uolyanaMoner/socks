import { useEffect, useState } from "react";

function ConsentBanner() {
  const [isConsentGiven, setIsConsentGiven] = useState(false);

  useEffect(() => {
    // Check if the user has already consented
    const consent = localStorage.getItem("consentGiven");
    if (consent === "true") {
      setIsConsentGiven(true);
      enableAnalytics(); // If consent is given, enable Analytics
    } else {
      // Default behavior when no consent is given
      if (typeof gtag !== "undefined") {
        gtag('consent', 'default', {
          'ad_storage': 'denied',
          'ad_user_data': 'denied',
          'ad_personalization': 'denied',
          'analytics_storage': 'denied'
        });
      }
    }
  }, []);

  const handleConsent = () => {
    localStorage.setItem("consentGiven", "true");
    setIsConsentGiven(true);
    enableAnalytics(); // Enable Google Analytics after consent
    consentGrantedAdStorage(); // Update consent for ad storage
  };

  const enableAnalytics = () => {
    // Load gtag script if it's not already loaded
    if (!window.gtag) {
      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-4SM8W65KXV";
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "G-4SM8W65KXV");
      };
    }
  };

  // Function to update consent when user clicks on the button
  const consentGrantedAdStorage = () => {
    if (typeof gtag !== "undefined") {
      gtag('consent', 'update', {
        'ad_storage': 'granted',
      });
    }
  };

  return (
    !isConsentGiven && (
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "black",
          color: "#ECF0F1",
          padding: "20px",
          textAlign: "center",
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.2)",
          zIndex: 9999,
          fontFamily: "Arial, sans-serif",
        }}
      >
        <p style={{ marginBottom: "15px", fontSize: "16px" }}>
          We use cookies to improve your experience. If you agree, we will be able to collect your personal data through Google Analytics.
        </p>
        <button
          onClick={handleConsent}
          style={{
            padding: "12px 30px",
            backgroundColor: "#c21719",
            color: "white",
            border: "none",
            borderRadius: "25px",
            fontSize: "16px",
            cursor: "pointer",
            transition: "background-color 0.3s ease, transform 0.2s",
          }}
          onMouseEnter={(e) => e.target.style.backgroundColor = "#c21719"}
          onMouseLeave={(e) => e.target.style.backgroundColor = "#c21719"}
          onMouseDown={(e) => e.target.style.transform = "scale(0.98)"}
          onMouseUp={(e) => e.target.style.transform = "scale(1)"}
        >
          I Agree
        </button>
      </div>
    )
  );
}

export default ConsentBanner;
