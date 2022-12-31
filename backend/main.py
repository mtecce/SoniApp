from flask import Flask, request, send_file, make_response
import json
import io
import os

import sys
sys.path.append('./sonisrc')
sys.path.append('./sonisrc/audiores')

from AudioProcessing import *

api = Flask(__name__)

function_dic = {
    "CombFilter": get_comb_sound,
    "SineWave": make_sine_wave,
    "TriangleWave": get_triangle_wave,
    "SquareWave": get_square_wave,
    "SawtoothWave": get_sawtooth_wave,
    "Convolution": get_convolved_audio,
    "DownSampling": downsample_audio
}

last_req = {
    "request": {
        "soni_type": "",
        "fs": "",
        "makeplot": "",
        "soni_params": ""
    },
    "res_string": "",
    "description": "",
    "paths": []
}

prev_results = []


@api.route("/_delete_oldest")
def remove_oldest_result():
    global prev_results
    rs = prev_results[0]["res_string"]
    hasplotfile = prev_results[0]["request"]["makeplot"] == 'True'
    # if hasplotfile:
    for i in range(len(prev_results[0]["paths"])):
        os.remove(prev_results[0]["paths"][i])

    prev_results.pop(0)


    return {"respo":"deleted oldest result"}

def update_prevres_file():
    global prev_results
    data = {}
    data['results'] = prev_results
    json_obj = json.dumps(data, indent=2)
    with open("prevres.json","w") as outfile:
        outfile.write(json_obj)

def update_previous_results():
    global prev_results
    res_file = open('prevres.json')
    data = json.load(res_file)
    prev_results = data['results']

def update_last_req():
    global last_req
    global prev_results
    if len(prev_results) > 0:
        last_req = prev_results[len(prev_results)-1]

def create_res_list_item(req,res_string,description,paths):
    return {"request":req,"res_string":res_string,"description":description,"paths":paths}

def addto_prevres(res_obj):
    global prev_results
    prev_results.append(res_obj)
    if len(prev_results) > 10:
        remove_oldest_result()
    update_prevres_file()
    update_previous_results()
    update_last_req()


def check_for_req(req):
    print(req)
    global prev_results
    ret_str = ""
    for r in prev_results:
        if r["request"] == req:
            ret_str = r["res_string"]
    return ret_str

@api.route("/_soniReq", methods=['GET','POST'])
def doSoni():

    global last_req
    global prev_results

    
    sp_data = request.args.to_dict()
    ps = check_for_req(sp_data)
    ret_dic = {"directory": ps}

    if sp_data == last_req["request"] or ps != "":
        print("accidental repeat request or already exists")
    else:
        soni_type = sp_data["soni_type"]
        fs = int(sp_data["fs"])
        makeplot = bool(sp_data["makeplot"])
        params = json.loads(sp_data["soni_params"])

        if request.method == 'GET':
            res_string, description, paths = function_dic[soni_type](fs,params,makeplot)
        else:
            files = request.files
            res_string, description, paths = function_dic[soni_type](fs,params,files,makeplot)
        ret_dic["directory"] = res_string
        addto_prevres(create_res_list_item(sp_data,res_string, description, paths))


        print("made new results")
    return ret_dic

@api.route("/_prevresults")
def getResults():
    global prev_results
    update_previous_results()

    '''
    to save

    res = data['results']
    edits to res list
    data['results'] = res
    json_obj = json.dumps(data)
    with open("prevres.json","w") as outfile:
        outfile.write(json_obj)
    '''
    return {"results":prev_results}

@api.route("/_audio")
def getAudioResult():

    filename = "./sonisrc/audiores/CombFilter4410001020010008000.wav"

    
    resp = make_response(send_file(filename, mimetype="audio/wav"))

    resp.headers["Cache-Control"] = "cache"

    return resp

def startup_jobs():
    global prev_results
    global last_req
    update_previous_results()
    update_last_req()

startup_jobs()
