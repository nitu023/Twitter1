from flask import Flask, json, jsonify, request, make_response
import jwt
import hashlib
import os
from datetime import datetime
from bson.json_util import dumps
from bson.objectid import ObjectId
from flask_pymongo import PyMongo
import math
import uuid
user = Flask(__name__, static_url_path='/static') 

from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config["MONGO_URI"] = "mongodb://127.0.0.1:27017/twitter"
mongo = PyMongo(app)

def md5_hash(string):
    hash = hashlib.md5()
    hash.update(string.encode('utf-8'))
    return hash.hexdigest()

def generate_salt():
    salt = os.urandom(16)
    return salt.hex()

@app.route('/read_user/<user_id>')
def read_user(user_id):
    users = mongo.db.users.find({"_id":ObjectId(user_id)})
    return dumps(users)

@app.route("/user/register", methods=["POST"])
def register():
    users = mongo.db.users
    name = request.json["name"]
    email = request.json["email"]
    picture = "static/users/user.png"
    salt = generate_salt()
    password = md5_hash(salt + request.json["password"])
    created = datetime.utcnow()
    result = ""

    response = users.find_one({"email": email})

    if response:
        result = jsonify({"duplicate": "Email id already exisist"})
    else:
        user_id = users.insert({
            "name": name,
            "email": email,
            "picture": picture,
            "password": password,
            "salt": salt,
            "created": created
        })

        new_user = users.find_one({"_id": user_id})

        result = jsonify({"success": new_user["email"] + " registered"})
    return result

@app.route("/users/login", methods=["POST"])
def login():
    users = mongo.db.users
    email = request.json["email"]
    password = request.json["password"]
    result = ""

    response = users.find_one({"email": email})

    if response:
        if response["password"] == md5_hash(response["salt"]+password):
            encode_data = jwt.encode({
                "id": str(response["_id"])
            }, "masai", algorithm="HS256").decode("utf-8")
            result = jsonify({"token": encode_data})
        else:
            result = jsonify({"error": "Wrong username and password"})
    else:
        result = jsonify({"result": "no user found"})
    return result

@app.route('/user/details')
def user_details():
    auth_header = request.headers.get('Authorization')
    token_encoded = auth_header.split(' ')[1]
    decode_data = jwt.decode(token_encoded, 'masai', algorithms=['HS256'])
    user_id = str(decode_data["id"])
    users = mongo.db.users.find_one({"_id": ObjectId(user_id)})
    return dumps({"user_id": user_id, "name": users["name"], "email": users["email"], "picture": users["picture"]})

@app.route('/posts/create', methods=["POST"])
def create():
    posts = {}
    posts['user_id'] = request.headers.get('user_id')
    posts['name'] = request.headers.get('name')
    posts["picture"] = request.headers.get("picture")
    posts['postsText'] = request.headers.get('postsText')
    posts["post_id"] = str(uuid.uuid1().int)[:3]
    posts['created'] = datetime.utcnow()
    picture1 = request.files['picture1']
    location = "static/post/" + picture1.filename
    picture1.save(location)
    posts['picture1'] = location
    mongo.db.posts.insert_one(posts)
    return dumps(posts)

@app.route('/posts/<user_id>/')
def joods(user_id):
    page = request.args.get("page", default = 1, type = int)
    user = mongo.db.users.find_one({"_id": ObjectId(user_id)}, {"following"})
    all_posts = mongo.db.posts.find({"user_id": {"$in": user["following"]}})
    # took amit's help to calculate this in week 15 day 4
    total_pages = int(math.ceil(len(str(all_posts))/2))
    out_put = {"page": page, "per_page": 2, "total": len(str(all_posts)), "total_pages": total_pages, "data": all_posts[(page*2)-2: page*2]}
    return dumps(out_put)

@app.route('/user/posts/<user_id>')
def user_joods(user_id):
    all_posts = mongo.db.posts.find({"user_id": user_id})
    return dumps(all_posts)

@app.route("/users/<user_id>")
def users(user_id):
    users = mongo.db.users.find({"_id":{"$ne":ObjectId(user_id)}})
    return dumps(users)

@app.route("/user/follow", methods=["POST"])
def user_follow():
    current_userid = request.json["current_userid"]
    user_id = request.json["user_id"]
    user_match = mongo.db.users.find({"following":user_id}).count()
    print(user_match)
    if user_match == 0:
        mongo.db.users.update_one({"_id": ObjectId(current_userid)}, {"$push": {"following": user_id}})
        result = "following"
        return dumps(result)
    else:
        result = "already followed"
        return dumps (result)


@app.route("/users/following/<user_id>")
def user_Accept_list(user_id):
    user_data = []
    all_users = mongo.db.users.find()
    current_user = mongo.db.users.find_one({"_id": ObjectId(user_id)})
    for each_user in all_users:
        for following_id in current_user["following"]:
            if each_user["_id"] == ObjectId(following_id):
                user_data.append(each_user)
    return dumps(user_data)

# unfollow
@app.route("/user/unfollow", methods=["POST"])
def user_unfollow():
    current_userid = request.json["current_userid"]
    user_id = request.json["user_id"]
    mongo.db.users.update_one({"_id": ObjectId(user_id)},{"$pull":{"following":current_userid}})  
    return dumps({"success": "unfollowing"})


@app.route("/users/picture", methods=["POST"])
def user_picture():
    users = mongo.db.users
    user_id = request.headers.get('user_id')
    user_picture = request.files['picture']
    location = "static/user/" + user_picture.filename
    user_picture.save(location)
    picture = location
    users.update_one({"_id": ObjectId(user_id)}, {"$set": {"picture": picture}})
    user_data = users.find_one({"_id": ObjectId(user_id)})
    return dumps({"user_id": user_id, "name": user_data["name"], "email": user_data["email"], "picture": user_data["picture"]})

@app.route('/search', methods = ["POST"])
def read_search():
    name = request.json["name"]
    user = mongo.db.users.find({"name":{"$regex":name}})
    return dumps(user)

@app.route('/search_post', methods = ["POST"])
def read_search_post():
    postsText = request.json["postsText"]
    user = mongo.db.posts.find({"postsText":{"$regex":postsText}})
    return dumps(user)

#update Post
@app.route('/update_story/<post_id>', methods=['POST'])
def update_post(post_id):
    postsText = request.json["postsText"]
    picture1 = request.files['picture1']
    mongo.db.posts.update_one({"post_id": post_id }, {"$set": {'postsText':postsText,"picture1":picture1}})
    return {"updated ": "updated"}

    #delete Post
@app.route('/delete-post/<post_id>', methods = ['DELETE'])
def delete_post(post_id):
    user_id = request.headers.get("user_id")
    mongo.db.posts.remove({"$and": [{"user_id":user_id, "post_id": post_id}]})
    return json.dumps({"Response":"deleted"})

@app.route('/comment/<post_id>',methods=['POST'])
def update(post_id):
    Comment = request.json["Comment"]
    name = request.json["name"]
    user_id = request.json["user_id"]
    picture = request.json["picture"]
    comment_id = str(uuid.uuid1().int)[:6]
    mongo.db.posts.update_one({"post_id":post_id},{"$push":{"comment":{"Comment":Comment,"name":name,"user_id":user_id,"comment_id":comment_id,"picture":picture}}})
    return {"message":"comment done"}

@app.route('/comment_read/<post_id>',methods = ['GET'])
def read_comment(post_id):
    users = mongo.db.posts.find_one({"post_id":post_id})
    return dumps(users["comment"])