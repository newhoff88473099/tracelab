import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tracelab/core/auth_provider.dart';
import 'package:tracelab/core/api_service.dart';

class SampleRegistrationScreen extends ConsumerStatefulWidget {
  const SampleRegistrationScreen({super.key});

  @override
  ConsumerState<SampleRegistrationScreen> createState() =>
      _SampleRegistrationScreenState();
}

class _SampleRegistrationScreenState
    extends ConsumerState<SampleRegistrationScreen> {
  final _codeController = TextEditingController();
  final _clientController = TextEditingController();
  final _productController = TextEditingController();
  bool _isLoading = false;

  @override
  void dispose() {
    _codeController.dispose();
    _clientController.dispose();
    _productController.dispose();
    super.dispose();
  }

  Future<void> _registerSample() async {
    setState(() => _isLoading = true);
    try {
      final api = ref.read(apiServiceProvider);
      await api.createSample({
        'code': _codeController.text,
        'clientId': _clientController.text,
        'productId': _productController.text.isEmpty
            ? null
            : _productController.text,
      });
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Sample registered successfully')),
        );
        Navigator.pop(context);
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Registration failed: ${e.toString()}')),
        );
      }
    } finally {
      if (mounted) setState(() => _isLoading = false);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('New Sample')),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Column(
          children: [
            TextField(
              controller: _codeController,
              decoration: const InputDecoration(labelText: 'Sample Code'),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _clientController,
              decoration: const InputDecoration(labelText: 'Client ID'),
            ),
            const SizedBox(height: 16),
            TextField(
              controller: _productController,
              decoration: const InputDecoration(labelText: 'Product ID (optional)'),
            ),
            const SizedBox(height: 24),
            _isLoading
                ? const CircularProgressIndicator()
                : ElevatedButton(
                    onPressed: _registerSample,
                    child: const Text('Register Sample'),
                  ),
          ],
        ),
      ),
    );
  }
}