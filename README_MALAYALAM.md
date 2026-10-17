# BASI AI — Starter Project

## എന്താണ് ഇതിലുള്ളത്?
- Responsive dark-mode chat UI
- Mobile browser-ലും desktop browser-ലും പ്രവർത്തിക്കുന്ന website
- അടിസ്ഥാന PWA support: hosting ചെയ്താൽ supported Android browsers-ൽ “Add to Home screen” ഉപയോഗിക്കാം
- Demo replies മാത്രം; live AI model ബന്ധിപ്പിച്ചിട്ടില്ല

## ഏറ്റവും എളുപ്പമുള്ള തുടക്കം
1. ZIP extract ചെയ്യുക.
2. `index.html` തുറന്ന് UI പരിശോധിക്കുക. ചില browser-ുകളിൽ PWA install/offline support ലഭിക്കാൻ HTTPS hosting ആവശ്യമാണ്.
3. Website publish ചെയ്യാൻ static hosting provider-ൽ ഈ files upload ചെയ്യുക. Free tier-ുകൾ മാറാം; provider-ന്റെ current limits പരിശോധിക്കുക.
4. Android-ൽ published website Chrome-ൽ തുറക്കുക → menu (⋮) → **Add to Home screen** അല്ലെങ്കിൽ **Install app** ലഭ്യമെങ്കിൽ അത് തിരഞ്ഞെടുക്കുക.

## യഥാർത്ഥ AI എങ്ങനെ ബന്ധിപ്പിക്കാം?
`app.js`-ലെ `demoReply()` ഉദാഹരണ മറുപടികൾ നൽകുന്നു. Live AI-ക്കായി:
1. ഒരു AI provider തിരഞ്ഞെടുക്കുക; സൗജന്യ quota ഉണ്ടോ, രാജ്യ/പ്രായ നിയന്ത്രണങ്ങൾ എന്തൊക്കെയാണോ പരിശോധിക്കുക.
2. API key സൂക്ഷിക്കുന്ന backend/server function ഉണ്ടാക്കുക.
3. Frontend-ൽ നിന്ന് ആ backend-ലേക്ക് message അയയ്ക്കുക.
4. API key ഒരിക്കലും `app.js`, HTML, public repository എന്നിവയിൽ ഇടരുത്.
5. Usage limits, abuse protection, privacy notice എന്നിവ ചേർക്കുക.

## ശ്രദ്ധിക്കുക
ഇത് ഒരു starter project ആണ്; native Android APK അല്ല. PWA വഴി ആദ്യം install ചെയ്യാവുന്ന അനുഭവം ലഭിക്കും. Play Store-ൽ പ്രസിദ്ധീകരിക്കാൻ വേറെ Android packaging, testing, developer account എന്നിവ ആവശ്യമായേക്കാം. സൗജന്യമായി തുടങ്ങാമെങ്കിലും hosting/AI provider-ന്റെ സൗജന്യ പരിധികൾ മാറാം.
