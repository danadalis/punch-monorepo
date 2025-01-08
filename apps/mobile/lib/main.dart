import 'dart:async';

import 'package:flutter/cupertino.dart';
import 'package:flutter/material.dart';
import 'package:flutter/src/foundation/key.dart';
import 'package:flutter/src/widgets/framework.dart';
import 'package:punch/Screens/singup.dart';
import 'package:punch/Screens/welcome.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  FlutterError.onError = (details) {
    FlutterError.presentError(details);
  };

  runApp(const MyApp());
}

class MyApp extends StatefulWidget {
  const MyApp({Key? key}) : super(key: key);

  @override
  State<MyApp> createState() => _MyWidgetState();
}

class _MyWidgetState extends State<MyApp> {
  final GlobalKey<NavigatorState> myNavigatorKey = GlobalKey<NavigatorState>();

  @override
  Widget build(BuildContext context) {
    Timer(
        const Duration(seconds: 5),
        () => myNavigatorKey.currentState?.push(MaterialPageRoute(
            builder: (BuildContext context) => Welcome())));
    var assetsImage = const AssetImage(
        'assets/logo.png'); 
    var image = Image(
        image: assetsImage,
        height: 300); 

    return MaterialApp(
      routes: {
        'welcome': (context) => Welcome(),
        'login_screen': (context) => Signup(),
      },
      navigatorKey: myNavigatorKey,
      home: Scaffold(
        body: Container(
          decoration:
              const BoxDecoration(color: Color.fromRGBO(255, 255, 255, 1)),
          child: Center(
            child: image,
          ),
        ),
      ),
    );
  }
}
