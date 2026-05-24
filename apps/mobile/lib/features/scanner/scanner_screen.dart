import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:mobile_scanner/mobile_scanner.dart';

class ScannerScreen extends ConsumerWidget {
  const ScannerScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: const Text('Scan QR/Barcode')),
      body: MobileScanner(
        onDetect: (capture) {
          final String code = capture.barcodes.first.rawValue ?? '';
          // TODO: Handle scanned code - lookup sample/product
          Navigator.pop(context, code);
        },
      ),
    );
  }
}