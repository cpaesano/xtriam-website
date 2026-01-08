# xTriam Image Assets

This folder hosts all images for the xTriam website and email marketing campaigns.

## Folder Structure

```
/public/images/
├── email/      ← Email marketing images (newsletters, campaigns)
├── website/    ← Website-only images (not used in emails)
└── shared/     ← Images used in both website and emails
```

## URL Format

After deployment to production, images are served from:

```
https://www.xtriam.com/images/{folder}/{filename}
```

### Examples

| File Location | Production URL |
|--------------|----------------|
| `/public/images/email/logo.png` | `https://www.xtriam.com/images/email/logo.png` |
| `/public/images/email/promo-banner.gif` | `https://www.xtriam.com/images/email/promo-banner.gif` |
| `/public/images/shared/bpmpro-logo.png` | `https://www.xtriam.com/images/shared/bpmpro-logo.png` |

## For Email Marketing (Salesforce Agent)

When creating email templates in Salesforce Marketing Cloud or any email system:

1. **Upload images** to `/public/images/email/` in this repository
2. **Reference in emails** using the full production URL:
   ```html
   <img src="https://www.xtriam.com/images/email/your-image.png" alt="Description" />
   ```

### Image Guidelines for Email

- **Format**: PNG for logos/graphics, JPG for photos, GIF for animations
- **Max width**: 600px (standard email width)
- **File size**: Keep under 200KB per image for fast loading
- **Naming**: Use lowercase with hyphens: `promo-january-2025.png`

### Testing Before Production

During development, images are available at:
```
http://localhost:3000/images/email/your-image.png
```

After deploying to Vercel preview:
```
https://xtriam-website-xxx.vercel.app/images/email/your-image.png
```

## Deployment

Images are deployed automatically with the website via Vercel:
- Push to `main` branch → Production at xtriam.com
- Push to other branches → Preview deployments

## Current Assets

### /email/
(Add your email marketing images here)

### /website/
(Website-specific images)

### /shared/
(Images used across website and emails)
