# Fortune Real Estate Agency – Mumbai

Agency website (React + Vite + Tailwind). Contains no individual/owner details.

## Run
    npm install
    npm run dev        # local
    npm run build      # production build in dist/

## Enquiry form (required setup)
Visitors submit name, mobile, email and property requirements through the
Property Enquiry Form. Enquiries are POSTed as JSON to the endpoint in
`VITE_ENQUIRY_ENDPOINT` (copy `.env.example` to `.env`). Use any form service
(Formspree, Web3Forms) or your own API, ideally with a shared agency inbox.
Until it is set, the form shows an "enquiry service not available" message.
