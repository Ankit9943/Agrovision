import json
p  = '/home/darkice/Projects/Personal/Agrovision/Agrovision/Agro-vision/backend/airesponse.json'
f = open(p, 'r')
# print(str(f.read()))

a = json.load(f)
print(type(a))
print(a['candidates'][0]['content']['parts'][0]['text'])
# print(a)