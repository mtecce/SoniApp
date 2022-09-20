from flask import Flask, request
from marshmallow import Schema, fields

import sys
sys.path.append('./sonisrc')
from AudioProcessing import *

api = Flask(__name__)

class CombSchema(Schema):
    note = fields.Int()
    length = fields.Int()
    n_pulses = fields.Int()
    n_samples = fields.Int()
    c_range = fields.Int()

class SoniSchema(Schema):
    soni_type = fields.Str()
    fs = fields.Int()
    if soni_type == "comb_sound":
        soni_params = fields.Nested(CombSchema)

soniScheme = SoniSchema()

@api.route("/_soniReq")
def doSoni():
    print(request.args.to_dict())
    return {"directory" : get_comb_sound(44100,1,1,200,1000,8000)}
    # soni_args = put_args.parse_args()
    # saved_args[0] = soni_args
    # return make_sine(soni_args["freq"], soni_args["length"])