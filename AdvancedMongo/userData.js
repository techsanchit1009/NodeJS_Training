var db = connect('localhost:27017/myDb');

var users = db.userData.find();
var address1 = db.addressData.find().limit(50);
var address2 = db.addressData.find().skip(50);

while(users.hasNext()){
    var user = users.next();
    var addr1 = address1.next();
    var addr2 = address2.next();
    
    var status = db.users.update(
    { _id: user._id},
    { $set : {addresses: [addr1._id, addr2._id]} }
    );
    print(user.toString());
}