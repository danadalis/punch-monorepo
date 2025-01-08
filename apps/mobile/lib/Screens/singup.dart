import 'dart:convert';
import 'dart:ffi';

import 'package:flutter/material.dart';
import 'package:punch/Models/Otp.dart';
import 'package:punch/Screens/otp.dart';
import 'package:punch/Services/DataService.dart';

class Signup extends StatefulWidget {
  @override
  _SignupState createState() => _SignupState();
}

class _SignupState extends State<Signup> {
  final TextEditingController _phoneController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: 375,
        height: 812,
        decoration: BoxDecoration(color: Colors.white),
        child: Stack(
          children: <Widget>[
            _buildText('+46', 182, 19, TextAlign.center),
            _buildPhoneNumberField(),
            _buildText('What’s your number?', 100, 50, TextAlign.left),
            _buildNextButton(context),
          ],
        ),
      ),
    );
  }

  Future<bool> _sendOtp() async {
    var request = OtpRequest(phoneNumber: _phoneController.text).toJson();
    final response = await AuthService().callAsync("send-otp", "post", request);
    if (response.statusCode == 200)
      return true;
    else
      return false;
  }

  Widget _buildText(String text, double top, double left, TextAlign align) {
    return Positioned(
      top: top,
      left: left,
      child: Text(
        text,
        textAlign: align,
        style: TextStyle(
          color: Colors.black,
          fontFamily: 'FT Aktual Trial',
          fontSize: 32,
          fontWeight: FontWeight.normal,
          height: 0.8125,
        ),
      ),
    );
  }

  Widget _buildPhoneNumberField() {
    return Positioned(
      top: 230, // Adjust the position as needed
      left: 20, // Adjust the position as needed
      child: Container(
        width: 300, // Adjust the width as needed
        child: TextField(
          controller: _phoneController,
          keyboardType: TextInputType.phone,
          decoration: InputDecoration(
            hintText: 'Enter your phone number',
            border: OutlineInputBorder(
              borderRadius: BorderRadius.circular(5),
            ),
          ),
          style: TextStyle(
            fontSize: 18,
            color: Colors.black,
          ),
        ),
      ),
    );
  }

  Widget _buildNextButton(BuildContext context) {
    return Positioned(
      top: 660,
      left: 70,
      child: GestureDetector(
        onTap: () async {
          var res = await _sendOtp();
          if (res) {
            Navigator.push(
              context,
              MaterialPageRoute(
                  builder: (context) => OtpValidation(
                        phoneNumber: _phoneController.text,
                      )),
            );
          } else {
             showDialog(
              context: context,
              builder: (BuildContext context) {
                return AlertDialog(
                  title: Text("OTP"),
                  content: Text("Error during OTP"),
                  actions: <Widget>[
                    TextButton(
                      child: Text("OK"),
                      onPressed: () {
                        Navigator.of(context).pop();
                      },
                    ),
                  ],
                );
              },
            );
          }
        },
        child: Container(
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(70),
            border: Border.all(color: Colors.black, width: 3),
          ),
          padding: EdgeInsets.symmetric(horizontal: 90, vertical: 20),
          child: Text(
            'Next',
            textAlign: TextAlign.center,
            style: TextStyle(
              color: Colors.black,
              fontFamily: 'ABC Gravity Upright Variable Unlicensed Trial',
              fontSize: 28,
              height: 0.8571428571428571,
            ),
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    _phoneController.dispose();
    super.dispose();
  }
}
