import 'package:flutter/material.dart';
import 'package:punch/Screens/singup.dart';

class Welcome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      width: 375,
      height: 812,
      decoration: BoxDecoration(color: Color.fromRGBO(255, 180, 175, 1)),
      child: Stack(
        children: <Widget>[
          _buildBackgroundImage(
              'assets/logo.png', 300, 35, 300, 200),
          _buildRoundedButton('Get started', 687, 50, context),
        ],
      ),
    );
  }

  Widget _buildBackgroundImage(
      String assetPath, double top, double left, double width, double height) {
    return Positioned(
      top: top,
      left: left,
      child: Container(
        width: width,
        height: height,
        decoration: BoxDecoration(
          image: DecorationImage(
            image: AssetImage(assetPath),
          ),
        ),
      ),
    );
  }


  Widget _buildRoundedButton(
      String text, double top, double left, BuildContext context) {
    return Positioned(
      top: top,
      left: left,
      child: GestureDetector(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => Signup()),
          );
        },
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(70),
            border: Border.all(color: Colors.black, width: 3),
          ),
          padding: const EdgeInsets.symmetric(horizontal: 70, vertical: 20),
          child: Text(
            text,
            textAlign: TextAlign.center,
            style: const TextStyle(
              color: Colors.black,
              fontFamily: 'ABC Gravity Upright Variable Unlicensed Trial',
              fontSize: 20,
            ),
          ),
        ),
      ),
    );
  }
}
