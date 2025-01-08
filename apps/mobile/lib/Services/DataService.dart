import 'dart:developer';

import 'package:dio/dio.dart';
import 'package:shared_preferences/shared_preferences.dart';

class CoreService {
  Future<Response<dynamic>> callAsync(
    String url,
    String method,
  ) async {
    Dio dio = Dio();
    dio.options.headers['x-api-key'] = 'moY3je9wIqk4ZZnannETxWQcylZTsASxY2Vz8nnCJQOSb3viif';
    dio.options.headers['content-Type'] = 'application/json';

    try {
      Response response;
      String fullUrl = 'http://punch-be-env.eba-afpqhbkf.eu-north-1.elasticbeanstalk.com/$url';

      switch (method.toUpperCase()) {
        case 'GET':
          response = await dio.get(
            fullUrl,
            options: Options(
              responseType: ResponseType.json,
            ),
          );
          break;
        case 'POST':
          response = await dio.post(
            fullUrl,
            options: Options(
              responseType: ResponseType.json,
            ),
          );
          break;
        default:
          throw Exception('HTTP method $method not supported');
      }

      log(response.toString());
      return response;
    } on DioError catch (e) {
      log(e.toString());
      throw Exception('Failed to load data: ${e.message}');
    }
  }
}

class AuthService {
  Future<Response<dynamic>> callAsync(
    String url,
    String method,
    Map<String, dynamic>? body, // Make body optional for GET requests
  ) async {
    Dio dio = Dio();

    dio.options.headers['x-api-key'] = 'che2AQe2rexicho9Haro6u9as8oplciw7i02';
    dio.options.headers['content-Type'] = 'application/json';

    Response response;

    try {
      // Determine the request type
      switch (method.toUpperCase()) {
        case 'GET':
          response = await dio.get(
            'http://punch-auth-env.eba-mk5x9uxm.eu-north-1.elasticbeanstalk.com/$url',
            options: Options(
              responseType: ResponseType.json,
            ),
          );
          break;
        case 'POST':
          response = await dio.post(
            'http://punch-auth-env.eba-mk5x9uxm.eu-north-1.elasticbeanstalk.com/$url',
            data: body, // Only include body for POST requests
            options: Options(
              responseType: ResponseType.json,
            ),
          );
          break;
        default:
          // Handle other methods or throw an error
          throw Exception('HTTP method $method not supported');
      }
      log(response.toString());
      return response;
    } on DioError catch (e) {
      log(e.toString());
      throw Exception('Failed to load data');
    }
  }
}
