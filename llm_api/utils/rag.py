import os
from langchain_openai import ChatOpenAI
from langchain_openai import OpenAIEmbeddings
from langchain import PromptTemplate

from pymilvus import model
from pymilvus import MilvusClient

os.environ["OPENAI_API_KEY"] = "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"

client = MilvusClient("host.db")
if client.has_collection(collection_name="demo_collection"):
    client.drop_collection(collection_name="demo_collection")
client.create_collection(
    collection_name="demo_collection",
    dimension=512,  # The vectors we will use in this demo has 768 dimensions
)
embedding_fn = model.dense.OpenAIEmbeddingFunction(
    model_name="text-embedding-3-large", # Specify the model name
    dimensions=512 # Set the embedding dimensionality according to MRL feature.
)

# ----- llm initialization -----
llm = ChatOpenAI(model="gpt-4o-mini")

summary_prompt: str = """/
    You are a helpful medical assistant in TaipeiTownpass.
    You are asked to assist a patient who has these backgrounds and symptoms: {backgrounds},
    Provide a brief tranditional chinese summation less than 30 words of the patient's condition and suggest a course of action.
"""
summary_prompt = PromptTemplate.from_template(template=summary_prompt)

suggestion_prompt = """
    You are a helpful medical assistant in TaipeiTownpass.
    Now given the patient's condition {condition}, and this chart of related division and symptoms {chart},
    Select the most likely division and suggest a course of action.
    Also, here are some suggestions from the public health department: {suggestions}
    Return the division(can only be selected from chart) and some warm suggestions(reference to public health department) in the form a tuple (division, suggestion), both in chinese.
    this is very important, please make sure the division is selected from the chart.
"""
suggestion_prompt = PromptTemplate.from_template(template=suggestion_prompt)

# ----- milvus initialization ----
# read in dataframe, embed each row. 
import pandas as pd
df = pd.read_csv('./llm_api/utils/data/hospital.csv')
data = []

for index, row in df.iterrows():
    dep = row['department']
    div = row['division']
    sym = row['symptom']

    embedding_text = f"department: {dep}, division: {div}, symptom: {sym}"
    vectors = embedding_fn.encode_documents([embedding_text])
    data.append({"id": index, "vector": vectors[0], "division": div, "department": dep, "symptom": sym})

# insert data into milvus
client.insert(collection_name="demo_collection", data=data)

# -----methods-----
def RAG(object):
    # first summarize the background
    prompt_formatted_str: str = summary_prompt.format(
        backgrounds=str(object.background)
    )
    summary = llm.predict(prompt_formatted_str)
    print(summary)

    # then suggest a division based on hospital information
    # retrieval
    vectors = embedding_fn.encode_documents([summary])
    res = client.search(
        collection_name="demo_collection", # Replace with the actual name of your collection
        # Replace with your query vector
        data=[vectors[0]],
        limit=5, # Max. number of search results to return
        search_params={"metric_type": "COSINE", "params": {}}, # Search parameters
        output_fields=["department", "division", "symptom"]
    )
    data = []
    for i in range(3):
        data.append({
            "division":res[0][i]['entity']['department'],
            "symptom":res[0][i]['entity']['symptom'],})
    print(data)
        
    prompt_formatted_str = suggestion_prompt.format(
        condition=summary, 
        chart=str(data), 
        suggestions="若仍然不確定自己就醫的診所別，可以洽詢家醫科診所。多休息並聽從專業建議。"
    )
    suggestion = llm.predict(prompt_formatted_str)
    res = (suggestion.split("(")[1].split(")")[0]).split(", ")
    print(res)
    return {"suggestion": res[1], "division": res[0]}