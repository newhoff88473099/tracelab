import 'package:dio/dio.dart';

class ApiService {
  final Dio _dio;

  ApiService() : _dio = Dio(BaseOptions(baseUrl: 'http://localhost:3000')) {
    _dio.interceptors.add(LogInterceptor(responseBody: true));
  }

  Future<Map<String, dynamic>> login(String email, String password) async {
    final response = await _dio.post('/auth/login', data: {
      'email': email,
      'password': password,
    });
    return response.data;
  }

  Future<Map<String, dynamic>> createSample(Map<String, dynamic> data) async {
    final response = await _dio.post('/samples', data: data);
    return response.data;
  }

  Future<Map<String, dynamic>> scanSample(String code) async {
    final response = await _dio.post('/samples/scan', data: {'code': code});
    return response.data;
  }

  Future<List<dynamic>> getSamples() async {
    final response = await _dio.get('/samples');
    return response.data;
  }

  Future<Map<String, dynamic>> updateSampleStatus(
      String id, String status) async {
    final response = await _dio.post('/samples/$id/status', data: {
      'status': status,
    });
    return response.data;
  }
}