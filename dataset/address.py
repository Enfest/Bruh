import googlemaps

client = googlemaps.Client(key="AIzaSyC4IVDAJux6HPcbkx0KHM4ulwAnLJwLocU")

f = open("clinic_family.csv", "r")
wf = open("clinic_family_latlng.csv", "w")
wf.write("name,lat,lng,address,spec\n")
info = f.readline().split(",")
for i in range(400):
    info = f.readline().split(",")
    if info[0] == "\n":
        continue
    if info[0] == "":
        break
    print(info)


# 將地址轉換為經緯度
info = {'address_components': [{'long_name': '245', 'short_name': '245', 'types': ['street_number']}, {'long_name': '敦化南路1段', 'short_name': '敦化南路1段', 'types': ['route']}, {'long_name': '建倫里', 'short_name': '建倫里', 'types': ['administrative_area_level_3', 'political']}, {'long_name': 'Da’an District', 'short_name': 'Da’an District', 'types': ['administrative_area_level_2', 'political']}, {'long_name': 'Taipei City', 'short_name': 'Taipei City', 'types': ['administrative_area_level_1', 'political']}, {'long_name': 'Taiwan', 'short_name': 'TW', 'types': [
    'country', 'political']}, {'long_name': '106', 'short_name': '106', 'types': ['postal_code']}], 'formatted_address': '106, Taiwan, Taipei City, Da’an District, 敦化南路1段245號', 'geometry': {'location': {'lat': 25.0390863, 'lng': 121.5495363}, 'location_type': 'ROOFTOP', 'viewport': {'northeast': {'lat': 25.0404667302915, 'lng': 121.5506590802915}, 'southwest': {'lat': 25.0377687697085, 'lng': 121.5479611197085}}}, 'place_id': 'ChIJXSEp6c-rQjQRtdbRdHwUbhg', 'plus_code': {'compound_code': '2GQX+JR Taiwan, 台北市大安區建倫里', 'global_code': '7QQ32GQX+JR'}, 'types': ['street_address']}
# info = client.geocode(address="台北市大安區敦化南路1段245號", language="zh-TW")


# Replace 'YOUR_API_KEY' with your actual API key


# Assuming you have latitude and longitude values
# lat = 25.0390863
# lng = 121.5495363
# latlng = googlemaps.LatLng(lat, lng)
# info = client.reverse_geocode(latlng, language="zh-TW")

# # var latlng = new google.maps.LatLng(lat, lng)    geocoder.geocode({'latLng': latlng}, function(results, status) {
# # Correct usage:
# print(info)
