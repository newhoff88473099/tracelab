import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tracelab/core/api_service.dart';
import 'sample_status_screen.dart';

class SampleListScreen extends ConsumerStatefulWidget {
  const SampleListScreen({super.key});

  @override
  ConsumerState<SampleListScreen> createState() => _SampleListScreenState();
}

class _SampleListScreenState extends ConsumerState<SampleListScreen> {
  List<dynamic> _samples = [];
  bool _isLoading = true;

  @override
  void initState() {
    super.initState();
    _loadSamples();
  }

  Future<void> _loadSamples() async {
    try {
      final api = ref.read(apiServiceProvider);
      final samples = await api.getSamples();
      setState(() => _samples = samples);
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Failed to load samples: ${e.toString()}')),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    if (_isLoading) {
      return const Scaffold(
        appBar: AppBar(title: Text('Samples')),
        body: Center(child: CircularProgressIndicator()),
      );
    }

    if (_samples.isEmpty) {
      return const Scaffold(
        appBar: AppBar(title: Text('Samples')),
        body: Center(child: Text('No samples found')),
      );
    }

    return Scaffold(
      appBar: AppBar(title: const Text('Samples')),
      body: ListView.builder(
        itemCount: _samples.length,
        itemBuilder: (context, index) {
          final sample = _samples[index] as Map<String, dynamic>;
          return ListTile(
            title: Text('Code: ${sample['code'] ?? 'N/A'}'),
            subtitle: Text('Status: ${sample['status'] ?? 'unknown'}'),
            trailing: const Icon(Icons.chevron_right),
            onTap: () => Navigator.push(
              context,
              MaterialPageRoute(
                builder: (_) => SampleStatusScreen(sampleId: sample['id']),
              ),
            ),
          );
        },
      ),
    );
  }
}