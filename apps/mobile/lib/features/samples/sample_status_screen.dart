import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tracelab/core/api_service.dart';

class SampleStatusScreen extends ConsumerStatefulWidget {
  final String sampleId;

  const SampleStatusScreen({super.key, required this.sampleId});

  @override
  ConsumerState<SampleStatusScreen> createState() => _SampleStatusScreenState();
}

class _SampleStatusScreenState extends ConsumerState<SampleStatusScreen> {
  bool _isLoading = false;

  Future<void> _updateStatus(String status) async {
    setState(() => _isLoading = true);
    try {
      final api = ref.read(apiServiceProvider);
      await api.updateSampleStatus(widget.sampleId, status);
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Status updated to $status')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed: ${e.toString()}')),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Sample Status')),
      body: _isLoading
          ? const Center(child: CircularProgressIndicator())
          : Padding(
              padding: const EdgeInsets.all(16.0),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  const Text(
                    'Workflow Transitions',
                    style: TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
                  ),
                  const SizedBox(height: 16),
                  _buildTransitionButton(context, 'Start Analysis', 'in_analysis'),
                  _buildTransitionButton(context, 'Send for Review', 'pending_review'),
                  _buildTransitionButton(context, 'Approve', 'approved'),
                  _buildTransitionButton(context, 'Reject', 'rejected'),
                  _buildTransitionButton(context, 'Archive', 'archived'),
                ],
              ),
            ),
    );
  }

  Widget _buildTransitionButton(BuildContext context, String label, String status) {
    return Padding(
      padding: const EdgeInsets.symmetric(vertical: 4.0),
      child: ElevatedButton(
        onPressed: () => _updateStatus(status),
        child: Text(label),
      ),
    );
  }
}