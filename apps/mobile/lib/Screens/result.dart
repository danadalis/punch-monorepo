import 'package:flutter/material.dart';
// Ensure you have 'dart:math' imported if you need to perform any math operations.

class Result extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    // Common text style
    final TextStyle commonTextStyle = TextStyle(
      color: Color.fromRGBO(25, 25, 25, 1),
      fontFamily: 'SF Pro Rounded',
      letterSpacing: 0, // Zero letter spacing
      fontWeight: FontWeight.normal,
      height: 1,
    );

    return Scaffold(
      body: Container(
        width:
            MediaQuery.of(context).size.width, // Use full width of the device
        height:
            MediaQuery.of(context).size.height, // Use full height of the device
        decoration: BoxDecoration(color: Color.fromRGBO(255, 255, 255, 1)),
        child: Column(
          // Using Column for vertical alignment
          children: <Widget>[
            _buildTopRoundedContainer(),
            Expanded(
              child: Center(
                // Centering content vertically in the available space
                child: Column(
                  mainAxisSize: MainAxisSize
                      .min, // Use minimum space needed by the children
                  children: [
                    Text('Successfully',
                        style: commonTextStyle.copyWith(fontSize: 20)),
                    SizedBox(height: 19), // Spacing between texts
                    Text('SENT',
                        style: commonTextStyle.copyWith(fontSize: 132)),
                    SizedBox(
                        height: 144), // Adjust the spacing based on your design
                    Text('[receipt]',
                        style: commonTextStyle.copyWith(fontSize: 20)),
                  ],
                ),
              ),
            ),
            _buildBottomCloseButton(context),
          ],
        ),
      ),
    );
  }

  Widget _buildTopRoundedContainer() {
    return Container(
      width: double.infinity,
      height: 36, // Adjust based on your design
      decoration: BoxDecoration(
        color: Color.fromRGBO(167, 161, 156, 1),
        borderRadius: BorderRadius.only(
          topLeft: Radius.circular(40),
          topRight: Radius.circular(40),
        ),
      ),
    );
  }

  Widget _buildBottomCloseButton(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.of(context).pop();
      },
      child: Container(
        margin: EdgeInsets.all(16), // Consistent margin for the button
        width: 353,
        height: 68,
        decoration: BoxDecoration(
          color: Colors.white,
          shape: BoxShape.circle,
        ),
        child: Text(
          'Close',
          style: TextStyle(
            color: Color.fromRGBO(167, 161, 156, 1),
            fontFamily: 'SF Pro Rounded',
            fontSize: 20,
            fontWeight: FontWeight.normal,
            height: 1,
          ),
        ),
      ),
    );
  }
}
