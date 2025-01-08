import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:punch/Models/Validation.dart';
import 'package:punch/Screens/wallet.dart';
import 'package:punch/Services/DataService.dart';

class OtpValidation extends StatefulWidget {
  final String phoneNumber;

  OtpValidation({Key? key, required this.phoneNumber})
      : super(key: key);

  @override
  _OtpValidationState createState() => _OtpValidationState();
}

class _OtpValidationState extends State<OtpValidation> {
  List<TextEditingController> _controllers =
      List.generate(6, (_) => TextEditingController());
  List<FocusNode> _focusNodes = List.generate(6, (_) => FocusNode());

  @override
  void initState() {
    super.initState();
    for (int i = 0; i < _controllers.length; i++) {
      _controllers[i].addListener(() {
        if (_controllers[i].text.length == 1 && i < _controllers.length - 1) {
          FocusScope.of(context).requestFocus(_focusNodes[i + 1]);
        }
      });
    }
  }

  
  Future<bool> _verifyOtp() async {
    var request = ValidationRequest(
            phoneNumber: widget.phoneNumber,
            code: _controllers.map((controller) => controller.text).join())
        .toJson();
    final response =
        await AuthService().callAsync("verify-otp", "post", request);
    if (response.statusCode == 200)
      return true;
    else
      return false;
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        width: double.infinity,
        height: double.infinity,
        padding: const EdgeInsets.all(20.0),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Enter OTP', style: TextStyle(fontSize: 24)),
            SizedBox(height: 20),
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: List.generate(6, (index) => _buildOtpBox(index)),
            ),
            SizedBox(height: 40),
            ElevatedButton(
              onPressed: () async {
                var res = await _verifyOtp();
                if (res) {
                  String otp =
                      _controllers.map((controller) => controller.text).join();
                  Navigator.push(
                    context,
                    MaterialPageRoute(builder: (context) => Wallet(phoneNumber: widget.phoneNumber)),
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
              child: Text('Verify'),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildOtpBox(int index) {
    return Container(
      width: 40,
      height: 50,
      child: TextField(
        controller: _controllers[index],
        focusNode: _focusNodes[index],
        keyboardType: TextInputType.number,
        textAlign: TextAlign.center,
        maxLength: 1,
        decoration: InputDecoration(
          counterText: "", // Hide the counter text below the TextField
          border: OutlineInputBorder(),
        ),
        // Only allow numerical input
        inputFormatters: [FilteringTextInputFormatter.digitsOnly],
      ),
    );
  }

  @override
  void dispose() {
    _controllers.forEach((controller) => controller.dispose());
    _focusNodes.forEach((focusNode) => focusNode.dispose());
    super.dispose();
  }
}
