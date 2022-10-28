from flask import Flask, request
import json

import sys
sys.path.append('./sonisrc')
from AudioProcessing import *

api = Flask(__name__)

function_dic = {
    "comb_sound": get_comb_sound,
    "sine_wave": make_sine_wave,
    "triangle_wave": get_triangle_wave,
    "square_wave": get_square_wave,
    "sawtooth_wave": get_sawtooth_wave,
    "convolve_audio": get_convolved_audio,
    "downsample_audio": downsample_audio
}

last_req = {
    "soni_type": "",
    "fs": 0,
    "makeplot": False,
    "soni_params": {}
}

prev_results = []

def remove_oldest_result():
    global prev_results
    rs = prev_results[0]["res_string"]
    hasplotfile = prev_results[0]["lastreq"]["makeplot"] == 'True'
    prev_results.pop(0)

def update_previous_results():
    global prev_results
    res_file = open('prevres.json')
    data = json.load(res_file)
    prev_results = data['results']

def update_last_req():
    global last_req
    global prev_results
    last_req = prev_results[len(prev_results)-1]

def create_res_list_item(last_req, res_string, paths):
    return {"lastreq":last_req,"res_string":res_string, "paths":paths}

def addto_prevres(res_obj):
    global prev_results
    prev_results.append(res_obj)
    if len(prev_results) > 10:
        remove_oldest_result()
    data = {}
    data['results'] = prev_results
    json_obj = json.dumps(data, indent=2)
    with open("prevres.json","w") as outfile:
        outfile.write(json_obj)
    update_previous_results()
    update_last_req()


def check_for_req(req):
    global prev_results
    ret_str = ""
    for r in prev_results:
        if r["lastreq"] == req:
            ret_str = r["res_string"]
    return ret_str

@api.route("/_soniReq")
def doSoni():

    global last_req
    global prev_results
    
    sp_data = request.args.to_dict()
    ps = check_for_req(sp_data)
    ret_dic = {"directory": ps}
    if sp_data == last_req["lastreq"]:
        print("accidental repeat request")
    elif ps != "":
        print("exists already")
    else:
        soni_type = sp_data["soni_type"]
        fs = int(sp_data["fs"])
        makeplot = bool(sp_data["makeplot"])
        params = json.loads(sp_data["soni_params"])
        res_string, paths = function_dic[soni_type](fs,params,makeplot)
        ret_dic["directory"] = res_string
        addto_prevres(create_res_list_item(sp_data,res_string, paths))
        print("made new results")
    return ret_dic

@api.route("/_prevresults")
def getResults():
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
    return {"results":"boop"}


def startup_jobs():
    global prev_results
    global last_req
    update_previous_results()
    update_last_req()

startup_jobs()
