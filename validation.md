# Data Validation Log

## Observation: 2026-03-25 21:00
**Target**: `@Techshare_daily`
**Issue**: Titles load correctly, but all metric values (Views, Subscribers) are 0.

### Symptoms
- [x] Correct Video Titles (e.g., "Best Fitness Trackers 2026")
- [x] Correct Video Count (29)
- [ ] View Counts: 0
- [ ] Subscriber Count: Empty/0
- [ ] Average Views: 0

### Diagnosis (Resolved)
- [x] Investigation: Does `getPlaylist` return `views`? **No (Always 0 in 4.3.12).**
- [x] Investigation: Does `searchOne` return `subscribers` correctly for handles? **Yes.**
- [x] Pivot: Switched to `YouTube.search(query, { type: "video" })`.
- [x] Result: Views and Subscribers are now correctly populated.

### Verification (FINAL - 2026-03-25 21:42)
- [x] **Automated Regression**: `npm test` passing for `@mitocw` (Integration).
- [x] **Boundary Testing**: Validated error handling for invalid channel URLs.
- [x] **Environment Security**: All YouTube watch/channel URLs moved to `.env`.
- [x] **End-to-End**: Dashboard confirmed to render non-zero stats for all test cases.
