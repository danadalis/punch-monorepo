class BalanceData {
  Result? result;

  BalanceData({this.result});

  BalanceData.fromJson(Map<String, dynamic> json) {
    result =
        json['result'] != null ? new Result.fromJson(json['result']) : null;
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    if (this.result != null) {
      data['result'] = this.result!.toJson();
    }
    return data;
  }

  fromJson(body) {}
}

class Result {
  String? walletId;
  String? network;
  List<Assets>? assets;

  Result({this.walletId, this.network, this.assets});

  Result.fromJson(Map<String, dynamic> json) {
    walletId = json['walletId'];
    network = json['network'];
    if (json['assets'] != null) {
      assets = <Assets>[];
      json['assets'].forEach((v) {
        assets!.add(new Assets.fromJson(v));
      });
    }
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['walletId'] = this.walletId;
    data['network'] = this.network;
    if (this.assets != null) {
      data['assets'] = this.assets!.map((v) => v.toJson()).toList();
    }
    return data;
  }
}

class Assets {
  String? symbol;
  int? decimals;
  String? balance;

  Assets({this.symbol, this.decimals, this.balance});

  Assets.fromJson(Map<String, dynamic> json) {
    symbol = json['symbol'];
    decimals = json['decimals'];
    balance = json['balance'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['symbol'] = this.symbol;
    data['decimals'] = this.decimals;
    data['balance'] = this.balance;
    return data;
  }
}
