# DigiYatra Live

Design a high-fidelity mobile app prototype for DigiYatra that fixes a failure scenario where passenger data becomes outdated after check-in changes (e.g., seat change), causing biometric verification failure at airport security.

🎯 Objective

Enable real-time synchronization between airline systems and DigiYatra so passengers experience a seamless biometric journey even after last-minute changes.

👤 Target User

Frequent flyers / business travelers
Already using DigiYatra for entry
Expect fast, frictionless airport flow

😖 Core Problem

 User enters airport via DigiYatra (biometric works)

 At check-in, airline updates seat / boarding pass

 DigiYatra still holds old data

 At security gate → biometric fails → user blocked

💡 Solution: “Live Sync”

Create a feature that:

 Detects real-time changes in flight/boarding data

 Automatically syncs updated details with DigiYatra

 Refreshes biometric travel token instantly

📱 Screens to Design

1. Home Screen

 Flight card with status: “DigiYatra Active”

 Boarding pass preview

 Last synced timestamp

2. Change Detected Screen

 Alert: “Your flight details have changed”

 Show old vs new seat

 CTA: “Sync Now”

3. Sync in Progress (Micro-interaction)

 Loader + animation

 Text: “Updating your travel credentials…”

4. Sync Success Screen

 Confirmation: “You’re all set”

 Updated boarding pass

 Status: “Biometric Ready”

5. Security Gate Screen

 Face scan UI

 Instant success feedback

 Message: “Verified via Live Sync”

⚙️ Key Features

 Real-time airline API integration (conceptual)

 Auto-sync + manual sync option

 Push notification on changes

 Fallback QR boarding pass

📊 Success Metrics

 Reduction in biometric failures at security

 % successful syncs after check-in changes

 Reduction in manual verification cases

🎨 Design Style

 Clean, minimal, fast UX

 Use green success states and trust indicators

 Airport-inspired UI (cards, status chips, scan screens)

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://seamless-air-sync.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/1c30e400-db35-4cc7-9f68-f10e82b8276b).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
