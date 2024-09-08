from flask import Flask, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})


@app.route('/', methods=['POST', 'GET'])
def set_mode():
    # global use_keyboard
    # mode = request.form.get('mode')
    # if mode == 'normal':
    #     use_keyboard = False
    # elif mode == 'keyboard':
    #     use_keyboard = True
    print('Received POST request')
    return 'hello world', 200


@app.route('/getPos', methods=['POST'])
def get_pos():
    data = request.get_json()
    print(data["lat"])
    res = []
    res = res + (findAdd(data["lat"], data["lng"], "clinic_child_latlng.csv"))
    res = res+(findAdd(data["lat"], data["lng"], "clinic_family_latlng.csv"))
    print(res)
    print('Received POST request')
    return res, 200


def findAdd(lat, lng, data):
    add_child = [{}, {}, {}, {}, {}]
    dis = [1000.0, 1000.0, 1000.0, 1000.0, 1000.0]

    f = open(data, "r")
    f.readline()
    for i in range(400):
        info = f.readline().split(",")

        if info[0] == "\n":
            continue
        if info[0] == "":
            break
        spec = [""]
        info[1] = float(info[1])
        info[2] = float(info[2])
        spec[0] = ",".join(info[4:])
        dist = (float(info[1])*100 - lat*100) ** 2 + \
            (float(info[2])*100 - lng*100) ** 2
        if len(add_child) < 5:
            dis[0] = dist
            add_child[0] = info[:4]+spec
            for i in range(1, 5):
                if dis[i] < dist:
                    break
                else:
                    dis[i-1] = dis[i]
                    dis[i] = dist
                    add_child[i-1] = add_child[i]
                    add_child[i] = info[:4]+spec
        else:
            for i in range(5):
                if dis[i] < dist:
                    if i != 0:
                        dis[i-1] = dist
                        add_child[i-1] = info[:4]+spec
                    break
                if i == 4:
                    dis[i] = dist
                    add_child[i] = info[:4]+spec
    print(add_child)
    return add_child


if __name__ == '__main__':
    app.run(debug=True)
