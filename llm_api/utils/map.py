# get hospital data
# read in dataframe, embed each row. 
import pandas as pd
df = pd.read_csv('./llm_api/utils/data/hospital_division.csv')
add_df = pd.read_csv('./llm_api/utils/data/divisions.csv')

def get_options(goal):
    results = []
    df_filtered = df[df['department'].isin([goal])]
    options = df_filtered.iloc[0]['hospital']
    options = (options.split("[")[1].split("]")[0]).split(", ")

    for i in range(len(options)):
        df_filtered = add_df[add_df['hospital'].isin([options[i]])]
        add_options = df_filtered["address"].tolist()[0]
        results.append({"name": options[i], "division":goal, "register_link":"", "address": add_options, "distance": 0, "map_url":"","lat":0,"lgn":0})

    return results

# get distance
import googlemaps
api_key = "AIzaSyCqG1ADdJnl5QT-ELRJjzCWBbjgO6tZANI"
gmaps = googlemaps.Client(key=api_key)

def get_distance(results):
    # get current location
    loc = gmaps.geolocate()
    loc = loc['location']
    loc = (loc['lat'], loc['lng'])
    reverse_geocode_result = gmaps.reverse_geocode(loc)
    current_address = reverse_geocode_result[0]['formatted_address']

    for obj in results:
        obj["distance"] = float(gmaps.distance_matrix(current_address, obj["address"])["rows"][0]["elements"][0]["distance"]["text"].split(" ")[0])
    
    sorted_locations = sorted(results, key=lambda x: x['distance'])
    sorted_locations = sorted_locations[:3]
    for obj in sorted_locations:
        obj["map_url"] = f"https://maps.google.com/?q={obj['address']}"
        obj["icon"] = "default"
        que = obj["name"]
        df_filtered = add_df[add_df['hospital'].isin([que])]
        obj["register_link"] = df_filtered["Link"].tolist()[0]
        
        loc = gmaps.geocode(obj['address'])
        obj["lat"], obj["lgn"] = loc[0]['geometry']['location']['lat'], loc[0]['geometry']['location']['lng']

    return sorted_locations