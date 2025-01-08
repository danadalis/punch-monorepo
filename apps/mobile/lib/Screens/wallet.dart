import 'package:flutter/material.dart';
import 'package:punch/Models/BalanceData.dart';
import 'package:punch/Screens/send.dart';
import 'package:punch/Services/DataService.dart';
import 'dart:math' as math;

class Wallet extends StatefulWidget {
  final String phoneNumber;

  Wallet({Key? key, required this.phoneNumber}) : super(key: key);

  @override
  _WalletState createState() => _WalletState();
}

class _WalletState extends State<Wallet> {
  String? balance = 'Loading...'; // Default text until the balance is fetched

  @override
  void initState() {
    super.initState();
    _fetchWalletBalance();
  }

  Future<void> _fetchWalletBalance() async {
    try {
      final authService = AuthService();
      final coreService = CoreService();

      final userData = await authService.callAsync("user/${widget.phoneNumber}", "GET", {});
      if (userData.statusCode == 200) {
        final walletId = userData.data['result']['walletId'];

        final balanceRes = await coreService.callAsync("balance?walletid=$walletId", "GET");
        final balanceObj = BalanceData.fromJson(balanceRes.data);

        if (mounted) {
          setState(() {
            if(balanceObj.result?.assets?.where((asset) => asset.symbol== "EURe") != null ) {
              final eureAsset = balanceObj.result?.assets?.firstWhere((asset) => asset.symbol== 'EURe');
              final decimalsBalance = eureAsset?.balance;
              final decimals = eureAsset?.decimals;
              balance = convertToHumanReadable(decimalsBalance!, decimals!);

            } else {
              balance = "0";
            }
          });
        }
      } else {
        // Handle non-200 status code if needed
        setState(() {
          balance = 'Error fetching balance';
        });
      }
    } catch (e) {
      // Handle errors (e.g., network error, parsing error)
      setState(() {
        balance = 'Error fetching balance';
      });
    }
  }

  String convertToHumanReadable(String balance, int decimals) {
  final BigInt balanceBigInt = BigInt.parse(balance);

  final BigInt divisor = BigInt.from(math.pow(10, decimals));
  final balanceInEURe = balanceBigInt / divisor; 
  


  return balanceInEURe.toStringAsFixed(0);
}


  @override
  Widget build(BuildContext context) {
    // Widget build method remains the same
    return Container(
      width: 375,
      height: 812,
      decoration: BoxDecoration(
        color: Color.fromRGBO(251, 255, 216, 1),
      ),
      child: Stack(
        children: <Widget>[
          _buildAssetsSection(),
          _buildSendMoneyButton(context),
        ],
      ),
    );
  }

  Widget _buildAssetsSection() {
    // Widget building method remains the same
    TextStyle textStyle = TextStyle(
      color: Color.fromRGBO(0, 0, 0, 1),
      fontFamily: 'FT Aktual Trial',
      fontSize: 24,
      fontWeight: FontWeight.normal,
      height: 1,
    );

    return Positioned(
      top: 142,
      left: 0,
      child: Container(
        width: 375,
        height: 169,
        child: Stack(
          children: <Widget>[
            Positioned(
              top: 0,
              left: 0,
              child: Text(
                balance!, // Updated to display the fetched balance
                textAlign: TextAlign.center,
                style: textStyle.copyWith(fontSize: 158),
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSendMoneyButton(BuildContext context) {
    // Widget building method remains the same
    return Positioned(
      top: 660,
      left: 70,
      child: GestureDetector(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(builder: (context) => Send()),
          );
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
}
