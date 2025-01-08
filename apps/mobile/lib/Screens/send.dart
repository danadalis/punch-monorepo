import 'package:flutter/material.dart';
import 'package:punch/Screens/result.dart';

class Send extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: MediaQuery.of(context).size.width,
        decoration: BoxDecoration(color: Color.fromRGBO(255, 255, 255, 1)),
        child: SingleChildScrollView(
          child: Column(
            children: <Widget>[
              SizedBox(
                  height:
                      36), // Added as a replacement for the top padding in the main background
              _buildMainBackground(),
              _buildTitle("Send money", 40),
              _buildInputField("Recipient", "Phone, IBAN or Crypt address",
                  TextInputType.text),
              _buildInputField("Amount", "€", TextInputType.number),
              _buildInputField("Message", "|", TextInputType.text),
              _buildSendMoneyButton(context),
              _buildCloseIcon(
                  context), // Adjusted to pass context for onTap functionality
              SizedBox(
                  height: 100), // Added to ensure scrolling space at the bottom
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildMainBackground() {
    return Container(
      margin: EdgeInsets.only(
          bottom: 20), // Add spacing between this container and the next widget
      width: double.infinity,
      height: 200, // Arbitrarily set, adjust based on your content
      decoration: BoxDecoration(
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(40),
          topRight: Radius.circular(40),
        ),
        color: Color.fromRGBO(255, 215, 251, 0.988),
      ),
    );
  }

  Widget _buildTitle(String text, double fontSize) {
    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Text(
        text,
        textAlign: TextAlign.center,
        style: TextStyle(
          color: Color.fromRGBO(25, 25, 25, 1),
          fontFamily: 'SF Pro Rounded',
          fontSize: fontSize,
          fontWeight: FontWeight.normal,
        ),
      ),
    );
  }

  Widget _buildInputField(
      String label, String hint, TextInputType keyboardType) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
      child: TextField(
        keyboardType: keyboardType,
        decoration: InputDecoration(
          labelText: label,
          hintText: hint,
          border: OutlineInputBorder(
            borderRadius: BorderRadius.circular(10),
          ),
        ),
      ),
    );
  }

  Widget _buildSendMoneyButton(BuildContext context) {
    return Container(
      margin: EdgeInsets.symmetric(horizontal: 16, vertical: 20),
      width: double.infinity,
      height: 50,
      child: ElevatedButton(
        style: ElevatedButton.styleFrom(
          backgroundColor: Color.fromRGBO(14, 14, 14, 1),
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(12),
          ),
        ),
        onPressed: () {
          // Implement the send money logic
          showDialog(
            context: context,
            builder: (BuildContext context) {
              return AlertDialog(
                title: Text("Send Money"),
                content: Text("Implement the logic to send money."),
                actions: <Widget>[
                  TextButton(
                    child: Text("OK"),
                    onPressed: () {
                      Navigator.of(context).pop();
                      Navigator.push(context,
                          MaterialPageRoute(builder: (context) => Result()));
                    },
                  ),
                ],
              );
            },
          );
        },
        child: Text(
          'Send Money',
          style: TextStyle(
            color: Color.fromRGBO(167, 161, 156, 1),
            fontFamily: 'SF Pro Rounded',
            fontSize: 20,
          ),
        ),
      ),
    );
  }

  Widget _buildCloseIcon(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.of(context).pop();
      },
      child: Container(
        margin: EdgeInsets.only(left: 16, top: 20, bottom: 20),
        width: 44,
        height: 44,
        decoration: BoxDecoration(
          color: Colors.white,
          shape: BoxShape.circle,
        ),
        child: Icon(Icons.close, color: Color.fromRGBO(14, 14, 14, 1)),
      ),
    );
  }
}
