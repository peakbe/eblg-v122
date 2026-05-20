// ======================================================
// TAF — PRO+++
// Chargement sécurisé + UI propre
// ======================================================

import { ENDPOINTS } from "./config.js";
import { fetchJSON, updateStatusPanel } from "./helpers.js";

const IS_DEV = location.hostname.includes("localhost");
const log = (...a) => IS_DEV && console.log("[TAF]", ...a);
const logErr = (...a) => console.error("[TAF ERROR]", ...a);

// ------------------------------------------------------
// INIT
// ------------------------------------------------------
export function initTaf() {
    safeLoadTaf();
}

// ------------------------------------------------------
// SAFE LOAD
// ------------------------------------------------------
export async function safeLoadTaf() {
    try {
        const data = await fetchJSON(ENDPOINTS.taf);

        if (!data || !data.data || !data.data[0]) {
            updateStatusPanel("TAF", { error: true });
            updateTafUI("TAF indisponible");
            return;
        }

        const raw = data.data[0].raw_text;
        updateTafUI(raw);

        updateStatusPanel("TAF", { ok: true });
        log("TAF chargé");

    } catch (err) {
        logErr("Erreur TAF", err);
        updateStatusPanel("TAF", { error: true });
        updateTafUI("TAF indisponible");
    }
}

// ------------------------------------------------------
// UI
// ------------------------------------------------------
export function updateTafUI(raw) {
    const el = document.getElementById("taf");
    if (el) el.textContent = raw || "TAF indisponible";
}
