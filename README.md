This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

## Folder Structure
```bash
PAHARTHEKE-REACT_NEXT-APP
├── components.json
├── eslint.config.mjs
├── .gitignore
├── jsconfig.json
├── next.config.mjs
├── package.json
├── package-lock.json
├── postcss.config.mjs
├── README.md
├── public/
│   ├── file.svg
│   ├── globe.svg
│   ├── next.svg
│   ├── vercel.svg
│   ├── window.svg
│   ├── images/
│   │   └── frontand/
│   │       ├── sectionBanner.jpg
│   │       └── TheamImage.jpg
│   └── videos/
│       └── HeroSectionVideo.mp4
└── src/
    ├── app/
    │   ├── favicon.ico
    │   ├── globals.css
    │   ├── layout.js
    │   ├── page.js
    │   ├── checkout/
    │   │   └── page.jsx
    │   └── products/
    │       └── [slug]/
    │           └── page.jsx
    ├── components/
    │   ├── cart/
    │   │   └── cart-sheet.jsx
    │   ├── common/
    │   │   ├── footer.jsx
    │   │   ├── header.jsx
    │   │   ├── section-title.jsx
    │   │   └── theme-toggle.jsx
    │   ├── home/
    │   │   ├── about.jsx
    │   │   ├── affeliate-banner.jsx
    │   │   ├── category-section.jsx
    │   │   ├── customar-review.jsx
    │   │   ├── featured-products.jsx
    │   │   ├── hero-section.jsx
    │   │   ├── invest-banner.jsx
    │   │   └── promo-banner.jsx
    │   ├── product/
    │   │   ├── product-card.jsx
    │   │   ├── product-details-view.jsx
    │   │   └── product-slider.jsx
    │   ├── providers/
    │   │   ├── store-provider.jsx
    │   │   └── theme-provider.jsx
    │   └── ui/
    │       ├── badge.jsx
    │       ├── button.jsx
    │       ├── card.jsx
    │       ├── dialog.jsx
    │       ├── dropdown-menu.jsx
    │       ├── input.jsx
    │       ├── separator.jsx
    │       ├── sheet.jsx
    │       ├── skeleton.jsx
    │       └── tabs.jsx
    ├── features/
    │   └── cart/
    │       └── cartSlice.js
    └── lib/
        ├── data.js
        ├── store.js
        └── utils.js
```

First, run the development server:

```bash
#node -v 11.8.0
npm install
#packages installing now
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
