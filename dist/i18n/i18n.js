"use strict";
// src/i18n/i18n.ts
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const i18next_1 = __importDefault(require("i18next"));
const messages_en_json_1 = __importDefault(require("src/i18n/messages_en.json")); // adjust path if needed
i18next_1.default.init({
    lng: 'en', // default language
    fallbackLng: 'en', // fallback if key not found
    resources: {
        en: {
            translation: messages_en_json_1.default,
        },
    },
    interpolation: {
        escapeValue: false, // not needed for Node.js (no XSS risk)
    },
})
    .then(() => {
    console.log('[i18n] i18next initialized successfully');
})
    .catch((err) => {
    console.error('[i18n] i18next initialization error:', err);
});
exports.default = i18next_1.default;
