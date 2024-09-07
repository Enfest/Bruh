import googlemaps


client = googlemaps.Client(key="AIzaSyC4IVDAJux6HPcbkx0KHM4ulwAnLJwLocU")

f = open("clinic.csv", "r")
wf = open("clinic_latlng.csv", "w")
wf.write("name,lat,lng,address\n")
info = f.readline().split(",")
for i in range(2000):
    info = f.readline().split(",")
    if info[0] == "":
        break
    latlng = client.geocode(address=info[2])
    wf.write(info[0]+","+str(latlng[0]['geometry']['location']["lat"]) +
             "," + str(latlng[0]['geometry']['location']["lng"])+","+info[2]+"\n")
    print(latlng[0]['geometry']['location']["lat"])

# 將地址轉換為經緯度
info = {'address_components': [{'long_name': '245', 'short_name': '245', 'types': ['street_number']}, {'long_name': '敦化南路1段', 'short_name': '敦化南路1段', 'types': ['route']}, {'long_name': '建倫里', 'short_name': '建倫里', 'types': ['administrative_area_level_3', 'political']}, {'long_name': 'Da’an District', 'short_name': 'Da’an District', 'types': ['administrative_area_level_2', 'political']}, {'long_name': 'Taipei City', 'short_name': 'Taipei City', 'types': ['administrative_area_level_1', 'political']}, {'long_name': 'Taiwan', 'short_name': 'TW', 'types': [
    'country', 'political']}, {'long_name': '106', 'short_name': '106', 'types': ['postal_code']}], 'formatted_address': '106, Taiwan, Taipei City, Da’an District, 敦化南路1段245號', 'geometry': {'location': {'lat': 25.0390863, 'lng': 121.5495363}, 'location_type': 'ROOFTOP', 'viewport': {'northeast': {'lat': 25.0404667302915, 'lng': 121.5506590802915}, 'southwest': {'lat': 25.0377687697085, 'lng': 121.5479611197085}}}, 'place_id': 'ChIJXSEp6c-rQjQRtdbRdHwUbhg', 'plus_code': {'compound_code': '2GQX+JR Taiwan, 台北市大安區建倫里', 'global_code': '7QQ32GQX+JR'}, 'types': ['street_address']}
# info = client.geocode(address="台北市大安區敦化南路1段245號")
print(info['geometry']['location'])
