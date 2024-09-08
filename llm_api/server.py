import sys

sys.path.append("./llm_api/utils")
from map import get_options, get_distance
from rag import RAG

import json
from fastapi import FastAPI
from pydantic import BaseModel

# -----init-----
current_session = None


class Background(BaseModel):
    query: str
    answer: list[str]
    detail: str | None = None


class User(BaseModel):
    age: int
    gender: str


class Hospital(BaseModel):
    name: str
    division: str
    register_link: str
    location: str
    distance: float
    map_link: str
    lat: float
    lgn: float


# base models
class Session(BaseModel):
    session: str
    background: list[str]


class Query(BaseModel):
    session: str
    query: str
    restart: bool = False


class Suggestion(BaseModel):
    suggestion: str
    hospital: list[Hospital]


app = FastAPI()


# -----methods-----
# TODO : import functions from RAG.py & milvus.py
@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.post("/init/")
async def create_item(item: Session):
    # TODO : create session by saving to json file
    global current_session
    current_session = item
    print(current_session)
    return item


@app.post("/query/")
async def create_item(item: Query):
    print(item)
    return item


@app.get("/get_suggestion/")
async def get_suggestion():
    # TODO : read from json file by session id
    # TODO : provide basic background to llm and get suggestion
    global current_session
    print(current_session)
    if current_session is not None:
        rag_result = RAG(current_session)
    else:
        print("No session found")
        return {"message": "No session found"}

    # input : background, output : {"suggestion": "suggestion", division}
    # TODO : provide suggestion to user
    # input : division, output: [hospital]
    div = rag_result["division"].translate(str.maketrans({"‘": "", "’": "", "'": ""}))
    print(div)
    results = get_options(div)
    results = get_distance(results)
    print(results)
    # TODO : return suggestion
    return {
        "suggestion": rag_result["suggestion"],
        # "hospital": [
        #     {
        #         "name": "仁愛分部",
        #         "division": "家庭醫學科",
        #         "register_link": "https://webreg.tpech.gov.tw/RegOnline1_1.aspx?ZCode=F",
        #         "address": "臺北市大安區仁愛路四段10號",
        #         "distance": 3.4,
        #         "map_url": "https://maps.google.com/?q=臺北市大安區仁愛路四段10號",
        #         "icon": "default",
        #         "lat": 25.000,
        #         "lgn": 120.000,
        #     }
        # ],
        "hospital": results
    }
