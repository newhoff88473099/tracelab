# TraceLab AI Mobile

Flutter mobile app for laboratory quality control.

## Features (Phase 3 MVP)
- [x] Auth screens (login, forgot password)
- [x] Sample registration flow
- [x] QR/barcode scanner integration
- [x] Photo capture + upload
- [ ] Sample status view + transitions
- [ ] Push notifications (Firebase FCM)
- [ ] Offline queue for poor connectivity

## Architecture
- State Management: Riverpod
- HTTP Client: Dio
- Scanner: mobile_scanner
- Image Capture: image_picker

## Getting Started
```bash
flutter pub get
flutter run
```