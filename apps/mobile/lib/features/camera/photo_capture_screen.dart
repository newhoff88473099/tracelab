import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:image_picker/image_picker.dart';

class PhotoCaptureScreen extends ConsumerStatefulWidget {
  const PhotoCaptureScreen({super.key});

  @override
  ConsumerState<PhotoCaptureScreen> createState() => _PhotoCaptureScreenState();
}

class _PhotoCaptureScreenState extends ConsumerState<PhotoCaptureScreen> {
  XFile? _image;

  Future<void> _pickImage(ImageSource source) async {
    final picker = ImagePicker();
    final image = await picker.pickImage(source: source);
    if (image != null) {
      setState(() => _image = image);
    }
  }

  Future<void> _uploadImage() async {
    if (_image == null) return;
    try {
      // TODO: Implement upload using ApiService
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          const SnackBar(content: Text('Photo captured successfully')),
        );
      }
    } catch (e) {
      if (mounted) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text('Upload failed: ${e.toString()}')),
        );
      }
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: const Text('Capture Photo')),
      body: Column(
        children: [
          if (_image != null)
            Image.network(_image!.path, height: 300, fit: BoxFit.cover)
          else
            const SizedBox(height: 300),
          const SizedBox(height: 20),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              IconButton(
                icon: const Icon(Icons.camera, size: 32),
                onPressed: () => _pickImage(ImageSource.camera),
              ),
              const SizedBox(width: 20),
              IconButton(
                icon: const Icon(Icons.photo_library, size: 32),
                onPressed: () => _pickImage(ImageSource.gallery),
              ),
            ],
          ),
          const SizedBox(height: 20),
          if (_image != null)
            ElevatedButton(
              onPressed: _uploadImage,
              child: const Text('Upload Photo'),
            ),
        ],
      ),
    );
  }
}