# import googlemaps


# client = googlemaps.Client(key="AIzaSyC4IVDAJux6HPcbkx0KHM4ulwAnLJwLocU")

# f = open("clinic.csv", "r")
# wf = open("clinic_latlng.csv", "w")
# wf.write("name,lat,lng,address\n")
# info = f.readline().split(",")
# for i in range(2000):
#     info = f.readline().split(",")
#     if info[0] == "":
#         break
#     latlng = client.geocode(address=info[2])
#     wf.write(info[0]+","+str(latlng[0]['geometry']['location']["lat"]) +
#              "," + str(latlng[0]['geometry']['location']["lng"])+","+info[2]+"\n")
#     print(latlng[0]['geometry']['location']["lat"])

# # 將地址轉換為經緯度
# info = {'address_components': [{'long_name': '245', 'short_name': '245', 'types': ['street_number']}, {'long_name': '敦化南路1段', 'short_name': '敦化南路1段', 'types': ['route']}, {'long_name': '建倫里', 'short_name': '建倫里', 'types': ['administrative_area_level_3', 'political']}, {'long_name': 'Da’an District', 'short_name': 'Da’an District', 'types': ['administrative_area_level_2', 'political']}, {'long_name': 'Taipei City', 'short_name': 'Taipei City', 'types': ['administrative_area_level_1', 'political']}, {'long_name': 'Taiwan', 'short_name': 'TW', 'types': [
#     'country', 'political']}, {'long_name': '106', 'short_name': '106', 'types': ['postal_code']}], 'formatted_address': '106, Taiwan, Taipei City, Da’an District, 敦化南路1段245號', 'geometry': {'location': {'lat': 25.0390863, 'lng': 121.5495363}, 'location_type': 'ROOFTOP', 'viewport': {'northeast': {'lat': 25.0404667302915, 'lng': 121.5506590802915}, 'southwest': {'lat': 25.0377687697085, 'lng': 121.5479611197085}}}, 'place_id': 'ChIJXSEp6c-rQjQRtdbRdHwUbhg', 'plus_code': {'compound_code': '2GQX+JR Taiwan, 台北市大安區建倫里', 'global_code': '7QQ32GQX+JR'}, 'types': ['street_address']}
# # info = client.geocode(address="台北市大安區敦化南路1段245號")
# print(info['geometry']['location'])
info = {"child_taipei": [871, 815, 820, 662, 580, 453, 315, 383, 428, 496, 617, 530, 531, 589, 688, 811, 908, 1018, 1193, 1214, 1037, 1240, 1361, 1337, 1291, 1257, 1295, 1285, 1209, 1029, 872, 933, 994, 1070, 1051], "child_all": [7931, 7960, 7549, 6694, 5870, 5557, 3830, 4791, 5686, 5745, 6134, 6407, 6401, 7213, 8971, 11291, 13601, 15983, 17507, 16937, 14589, 16097, 17401, 17049, 18242, 18735, 18190, 16726, 15602,
                                                                                                                                                                                                                                      12654, 10625, 10607, 11847, 12751, 13051], "adult_taipei": [142, 139, 116, 95, 93, 69, 68, 77, 33, 84, 46, 51, 46, 57, 71, 98, 81, 82, 103, 114, 102, 88, 116, 102, 130, 110, 123, 104, 119, 90, 71, 104, 110, 111, 107], "adult_all": [813, 923, 768, 707, 736, 604, 588, 660, 508, 580, 468, 565, 542, 562, 721, 789, 818, 851, 1057, 1140, 1021, 1016, 1087, 1051, 1140, 1081, 1102, 1076, 1012, 826, 798, 810, 889, 901, 902]}
print(info["child_taipei"][-12:], info["adult_taipei"][-12:], )
li = []
for i in info["child_taipei"]:
    li.append(i+info["adult_taipei"][info["child_taipei"].index(i)])
print(li[-12:])
