import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

enum SampleStatus {
  received,
  inAnalysis,
  pendingReview,
  approved,
  rejected,
  archived,
}

class SampleStatusScreen extends ConsumerWidget {
  final String sampleId;

  const SampleStatusScreen({super.key, required this.sampleId});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample Status')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const Text(
              'Workflow Transitions',
              style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
            ),
            const SizedBox(height: 16),
            _buildTransitionButton(context, 'Start Analysis', SampleStatus.inAnalysis),
            _buildTransitionButton(context, 'Send for Review', SampleStatus.pendingReview),
            _buildTransitionButton(context, 'Approve', SampleStatus.approved),
            _buildTransitionButton(context, 'Reject', SampleStatus.rejected),
            _buildTransitionButton(context, 'Archive', SampleStatus.archived),
          ],
        ),
      ),
    );
  }

  Widget _buildTransitionButton(BuildContext context, String label, SampleStatus status) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: ElevatedButton(
        onPressed: () {
          // TODO: API call to update sample status
        },
        child: Text(label),
      ),
    );
  }
}