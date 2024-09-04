import { AddUser, writePhoto } from "./writeFunction.js";
import { readPhoto, readUnsignedContract } from "./readFunctions.js";
// import { register, verify, getIn } from "./iota.js";
// import { sendStringToServer, sendbackServer } from "./faceReconig.js";

const initData = () => {
    console.log('data initialization called.')
}

const sendData = (data, ws) => {
    ws.send(JSON.stringify(data));
}


const onMessage = async (wss, ws, e) => {
    console.log("in on message");
    // console.log(e.data);
    const [task, payload] = JSON.parse(e.data);
    // console.log(payload);
    switch (task) {
        // Add functions
        case 'AddUser':{
            AddUser(payload, ws);
            break;
        }
        case 'readUContract':{
            console.log("readUContract");
            readUnsignedContract(ws);
            break;
        }
        case "picture":{
            console.log("in picture");
            console.log(payload);
            writePhoto(payload.photo);
            break;
        }
        case "checkP":{
            sendData()
            break;
        }
        // case "getContract":{
        //     console.log("in getContract");
            
        //     break;
        // }
    }
}

export {initData, onMessage};

