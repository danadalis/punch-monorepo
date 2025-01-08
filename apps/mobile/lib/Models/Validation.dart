class ValidationRequest {
  String? phoneNumber;
  String? code;

  ValidationRequest({this.phoneNumber, this.code});

  ValidationRequest.fromJson(Map<String, dynamic> json) {
    phoneNumber = json['phone_number'];
    code = json['code'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['phone_number'] = this.phoneNumber;
    data['code'] = this.code;
    return data;
  }
}

class ValidationResponse {
  Result? result;

  ValidationResponse({this.result});

  ValidationResponse.fromJson(Map<String, dynamic> json) {
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
  String? status;

  Result({this.status});

  Result.fromJson(Map<String, dynamic> json) {
    status = json['status'];
  }

  Map<String, dynamic> toJson() {
    final Map<String, dynamic> data = new Map<String, dynamic>();
    data['status'] = this.status;
    return data;
  }
}
