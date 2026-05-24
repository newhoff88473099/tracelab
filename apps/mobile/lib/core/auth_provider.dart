import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:shared_preferences/shared_preferences.dart';
import 'api_service.dart';

final apiServiceProvider = Provider<ApiService>((ref) => ApiService());

final authProvider = StateNotifierProvider<AuthNotifier, AuthState>((ref) {
  return AuthNotifier(ref.read);
});

class AuthState {
  final bool isAuthenticated;
  final String? token;
  final String? userId;
  final String? laboratoryId;

  AuthState({required this.isAuthenticated, this.token, this.userId, this.laboratoryId});

  AuthState copyWith({bool? isAuthenticated, String? token, String? userId, String? laboratoryId}) {
    return AuthState(
      isAuthenticated: isAuthenticated ?? this.isAuthenticated,
      token: token ?? this.token,
      userId: userId ?? this.userId,
      laboratoryId: laboratoryId ?? this.laboratoryId,
    );
  }
}

class AuthNotifier extends StateNotifier<AuthState> {
  final Reader read;

  AuthNotifier(this.read) : super(AuthState(isAuthenticated: false));

  Future<void> login(String email, String password) async {
    final api = read.apiServiceProvider;
    final response = await api.login(email, password);
    
    final prefs = await SharedPreferences.getInstance();
    await prefs.setString('token', response['accessToken']);
    
    state = AuthState(
      isAuthenticated: true,
      token: response['accessToken'],
    );
  }

  Future<void> logout() async {
    final prefs = await SharedPreferences.getInstance();
    await prefs.remove('token');
    state = AuthState(isAuthenticated: false);
  }
}