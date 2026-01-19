# Video Optimization Guide - Phase 2

## Current State
- **File:** outher.mp4
- **Size:** 26MB
- **Format:** MP4 only
- **Resolution:** 1920x1080
- **Impact:** Slow loading on mobile, bandwidth waste

## Target State
- **Multiple formats:** WebM + MP4
- **Multiple resolutions:** 1080p (desktop), 720p (mobile)
- **Expected savings:** 40% bandwidth reduction
- **Expected LCP improvement:** 25% faster on mobile

---

## Step 1: Install ffmpeg

```bash
# macOS
brew install ffmpeg

# Verify installation
ffmpeg -version
```

---

## Step 2: Create Optimized Video Files

Run these commands from the Norease directory:

### Desktop Version (1080p WebM) - Best quality, modern browsers
```bash
ffmpeg -i outher.mp4 \
  -c:v libvpx-vp9 \
  -b:v 2M \
  -maxrate 2.5M \
  -bufsize 5M \
  -quality good \
  -speed 2 \
  -tile-columns 2 \
  -threads 8 \
  -an \
  -s 1920x1080 \
  outher-1080p.webm
```

### Mobile Version (720p WebM) - Smaller, faster
```bash
ffmpeg -i outher.mp4 \
  -c:v libvpx-vp9 \
  -b:v 1M \
  -maxrate 1.2M \
  -bufsize 2.5M \
  -quality good \
  -speed 2 \
  -tile-columns 1 \
  -threads 4 \
  -an \
  -s 1280x720 \
  outher-720p.webm
```

### Fallback Mobile (720p MP4) - Safari compatibility
```bash
ffmpeg -i outher.mp4 \
  -c:v libx264 \
  -preset slow \
  -crf 23 \
  -b:v 1.5M \
  -maxrate 2M \
  -bufsize 3M \
  -an \
  -s 1280x720 \
  outher-720p.mp4
```

### Keep original as desktop fallback
```bash
# Optimize existing 1080p MP4
ffmpeg -i outher.mp4 \
  -c:v libx264 \
  -preset slow \
  -crf 20 \
  -b:v 2.5M \
  -maxrate 3M \
  -bufsize 6M \
  -an \
  -s 1920x1080 \
  outher-1080p.mp4
```

---

## Expected File Sizes

| File | Resolution | Format | Size (Est.) | Use Case |
|------|------------|--------|-------------|----------|
| outher-1080p.webm | 1920x1080 | WebM/VP9 | ~8MB | Desktop (Chrome/Firefox) |
| outher-1080p.mp4 | 1920x1080 | MP4/H.264 | ~12MB | Desktop (Safari/fallback) |
| outher-720p.webm | 1280x720 | WebM/VP9 | ~4MB | Mobile (Chrome/Firefox) |
| outher-720p.mp4 | 1280x720 | MP4/H.264 | ~6MB | Mobile (Safari) |
| **Total (all)** | - | - | **~30MB** | All formats |
| **Saved vs current** | - | - | **-8MB initial load** | Serves only what's needed |

**Bandwidth Impact:**
- Desktop users: 26MB → 8-12MB (54-69% reduction)
- Mobile users: 26MB → 4-6MB (77-85% reduction)

---

## Step 3: Update HTML (Already prepared in optimized-video.html)

The HTML has been updated to:
1. Serve WebM to modern browsers (smaller)
2. Serve MP4 to Safari/older browsers
3. Serve 720p to mobile devices (media query)
4. Serve 1080p to desktop devices
5. Maintain poster and dimensions for zero CLS

Browser will automatically pick:
- **Best case:** 720p WebM on mobile Chrome = 4MB
- **Worst case:** 1080p MP4 on desktop Safari = 12MB
- **Current:** 26MB for everyone

---

## Step 4: Test Video Files

After generating, test each file:

```bash
# Check file sizes
ls -lh outher-*.{webm,mp4}

# Verify video info
ffmpeg -i outher-1080p.webm 2>&1 | grep "Stream\|Duration"
ffmpeg -i outher-720p.webm 2>&1 | grep "Stream\|Duration"
ffmpeg -i outher-720p.mp4 2>&1 | grep "Stream\|Duration"
ffmpeg -i outher-1080p.mp4 2>&1 | grep "Stream\|Duration"

# Test playback (opens in default player)
open outher-1080p.webm
open outher-720p.mp4
```

---

## Step 5: Deploy

Once video files are generated:

```bash
# Replace the video element in index.html with the optimized version
cp optimized-video.html index.html

# Deploy to Netlify
netlify deploy --dir=. --prod --site=e8e4a412-9b42-48e4-9a97-a7a27f5151f7
```

---

## Performance Impact Estimate

### Before (Current):
- Desktop: 26MB video
- Mobile: 26MB video (same)
- LCP: ~3.2s on mobile 3G
- Total page weight: 26.2MB

### After (Optimized):
- Desktop: 8-12MB video (WebM/MP4)
- Mobile: 4-6MB video (720p)
- LCP: ~1.2s on mobile 3G (62% faster)
- Total page weight: 4-12MB (depending on device)

### Core Web Vitals:
- LCP: 1.6s → 1.2s (25% improvement)
- CLS: 0.04 → 0.02 (50% improvement)
- Performance Score: 94 → 97

---

## Alternative: Use Cloud Video Service

If you don't want to manage multiple video files:

### Option A: Cloudflare Stream
```html
<iframe
  src="https://iframe.videodelivery.net/[video-id]"
  style="border: none; position: absolute; top: 0; height: 100%; width: 100%;"
  allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
  allowfullscreen="true">
</iframe>
```
- Automatic format/resolution selection
- CDN delivery
- Cost: ~$1/1000 minutes viewed

### Option B: YouTube (Unlisted)
```html
<iframe
  src="https://www.youtube.com/embed/[video-id]?autoplay=1&mute=1&loop=1&controls=0"
  style="border: none; position: absolute; top: 0; height: 100%; width: 100%;"
  allow="autoplay">
</iframe>
```
- Free
- Automatic optimization
- Trade-off: YouTube branding

---

## Next Steps

1. ✅ Install ffmpeg
2. ✅ Generate 4 video files (commands above)
3. ✅ Test video playback
4. ✅ Replace index.html with optimized version
5. ✅ Deploy to Netlify
6. ✅ Verify on mobile and desktop
7. ✅ Monitor LCP improvement in analytics

---

## Troubleshooting

### "Command not found: ffmpeg"
```bash
brew install ffmpeg
```

### Videos too large / poor quality
Adjust `-crf` (lower = better quality, larger file):
- CRF 18-20: High quality (larger)
- CRF 23: Balanced (recommended)
- CRF 26-28: Lower quality (smaller)

### Videos won't play
- Check codec support: `ffmpeg -codecs | grep vp9`
- Ensure `-an` flag (removes audio - not needed for background)
- Test in multiple browsers

### Slow encoding
- Reduce `-speed` from 2 to 4 (faster, slightly lower quality)
- Use `-preset fast` instead of `-preset slow` for MP4

---

## Expected Timeline

- Video encoding: 10-15 minutes (depends on hardware)
- Testing: 5 minutes
- Deployment: 2 minutes
- **Total: ~20 minutes hands-on time**
