import CryptoJS from 'crypto-js';

const ESEWA_CONFIG = {
  // UAT (Testing) Config
  uat: {
    merchant_id: 'EPAYTEST',
    secret_key: '8gBm/:&EnhH.1/q',
    form_url: 'https://rc-epay.esewa.com.np/api/epay/main/v2/form',
    status_url: 'https://rc.esewa.com.np/api/epay/transaction/status/',
  },
  // Production Config (Placeholders)
  prod: {
    merchant_id: '',
    secret_key: '',
    form_url: 'https://epay.esewa.com.np/api/epay/main/v2/form',
    status_url: 'https://esewa.com.np/api/epay/transaction/status/',
  }
};

const IS_PROD = false; // Toggle this for production
const CONFIG = IS_PROD ? ESEWA_CONFIG.prod : ESEWA_CONFIG.uat;

export const paymentService = {
  /**
   * Generates HMAC-SHA256 signature for eSewa
   * Fields order: total_amount,transaction_uuid,product_code
   */
  generateSignature: (total_amount, transaction_uuid, product_code = CONFIG.merchant_id) => {
    const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(message, CONFIG.secret_key);
    return CryptoJS.enc.Base64.stringify(hash);
  },

  /**
   * Decodes eSewa Base64 response
   */
  decodeResponse: (encodedData) => {
    try {
      console.log("Raw eSewa Base64:", encodedData);
      // Safe Base64 decoding (handles URL-safe and standard Base64)
      const base64 = encodedData.replace(/-/g, '+').replace(/_/g, '/');
      const decodedString = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      console.log("Decoded eSewa JSON:", decodedString);
      return JSON.parse(decodedString);
    } catch (e) {
      console.error("Failed to decode eSewa response:", e);
      // Fallback to simple atob if the advanced one fails
      try {
        return JSON.parse(atob(encodedData));
      } catch (e2) {
        return null;
      }
    }
  },

  /**
   * Verifies eSewa signature from success response
   */
  verifySignature: (response) => {
    try {
        const { total_amount, transaction_uuid, product_code, signature } = response;
        // The signature in v2 success response is often computed with the same logic as the request
        const generated = paymentService.generateSignature(total_amount, transaction_uuid, product_code);
        
        console.log("Verifying eSewa Signature...");
        console.log("Expected (Generated):", generated);
        console.log("Actual (from Response):", signature);
        
        return generated === signature;
    } catch (e) {
        console.error("Signature verification error:", e);
        return false;
    }
  },

  getFormUrl: () => CONFIG.form_url,
  getMerchantId: () => CONFIG.merchant_id,
  getStatusUrl: () => CONFIG.status_url,
};
