import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import '../samples/sample_registration_screen.dart';
import '../scanner/scanner_screen.dart';
import '../samples/sample_status_screen.dart';

class DashboardScreen extends ConsumerWidget {
  const DashboardScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: const Text('TraceLab Dashboard')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: GridView.count(
          crossAxisCount: 2,
          children: [
            _DashboardCard(
              icon: Icons.add_box,
              label: 'New Sample',
              onTap: () => Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const SampleRegistrationScreen()),
              ),
            ),
            _DashboardCard(
              icon: Icons.qr_code_scanner,
              label: 'Scan',
              onTap: () => Navigator.push(
                context,
                MaterialPageRoute(builder: (_) => const ScannerScreen()),
              ),
            ),
            _DashboardCard(
              icon: Icons.photo_camera,
              label: 'Photo',
              onTap: () {
                // TODO: Photo capture screen
              },
            ),
            _DashboardCard(
              icon: Icons.list_alt,
              label: 'Samples',
              onTap: () {
                // TODO: Sample list
              },
            ),
          ],
        ),
      ),
    );
  }
}

class _DashboardCard extends StatelessWidget {
  final IconData icon;
  final String label;
  final VoidCallback onTap;

  const _DashboardCard({required this.icon, required this.label, required this.onTap});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 4,
      child: InkWell(
        onTap: onTap,
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(icon, size: 48),
            const SizedBox(height: 8),
            Text(label),
          ],
        ),
      ),
    );
  }
}