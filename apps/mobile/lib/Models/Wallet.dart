class walletData {
  Result? result;

  walletData({this.result});

  walletData.fromJson(Map<String, dynamic> json) {
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
}

class Result {
  String? dateCreated;
  String? status;
  String? address;
  String? name;
  String? network;
  String? id;
  List<Null>? tags;

  Result(
      {this.dateCreated,
      this.status,
      this.address,
      this.name,
      this.network,
      this.id,
      this.tags,
      });

  Result.fromJson(Map<String, dynamic> json) {
    dateCreated = json['dateCreated'];
    status = json['status'];
    address = json['address'];
    name = json['name'];
    network = json['network'];
    id = json['id'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['dateCreated'] = this.dateCreated;
    data['status'] = this.status;
    data['address'] = this.address;
    data['name'] = this.name;
    data['network'] = this.network;
    data['id'] = this.id;
    return data;
  }
}

