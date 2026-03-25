import CryptoJS from 'crypto-js';

const ESEWA_CONFIG = {
  uat: {
    merchant_id: 'EPAYTEST',
    secret_key: '8gBm/:&EnhH.1/q',
    form_url: 'https://rc-epay.esewa.com.np/api/epay/main/v2/form',
    status_url: 'https://rc.esewa.com.np/api/epay/transaction/status/',
  },
  prod: {
    merchant_id: '',
    secret_key: '',
    form_url: 'https://epay.esewa.com.np/api/epay/main/v2/form',
    status_url: 'https://esewa.com.np/api/epay/transaction/status/',
  }
};

const IS_PROD = false;
const CONFIG = IS_PROD ? ESEWA_CONFIG.prod : ESEWA_CONFIG.uat;

export const paymentService = {
  generateSignature: (total_amount, transaction_uuid, product_code = CONFIG.merchant_id) => {
    const message = `total_amount=${total_amount},transaction_uuid=${transaction_uuid},product_code=${product_code}`;
    const hash = CryptoJS.HmacSHA256(message, CONFIG.secret_key);
    return CryptoJS.enc.Base64.stringify(hash);
  },

  decodeResponse: (encodedData) => {
    try {
      const base64 = encodedData.replace(/-/g, '+').replace(/_/g, '/');
      const decodedString = decodeURIComponent(atob(base64).split('').map(function(c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(decodedString);
    } catch (e) {
      try {
        return JSON.parse(atob(encodedData));
      } catch (e2) {
        return null;
      }
    }
  },

  verifySignature: (response) => {
    try {
        const { total_amount, transaction_uuid, product_code, signature } = response;
        const generated = paymentService.generateSignature(total_amount, transaction_uuid, product_code);
        return generated === signature;
    } catch (e) {
        return false;
    }
  },

  getFormUrl: () => CONFIG.form_url,
  getMerchantId: () => CONFIG.merchant_id,
  getStatusUrl: () => CONFIG.status_url,
};
