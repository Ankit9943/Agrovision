import json

def writeto(filename, response):
    new_dict_obj = {'responses': []} 
    # if file exists 
    try:
        with open(filename, 'r') as file:
            file_content_dict = json.load(file)               

        responses_arr = file_content_dict.get('responses', new_dict_obj['responses'])
        with open(filename, 'w') as file:
        # if file has dict obj initialized with responses as list
            responses_arr.append(response)
            json.dump(file_content_dict, file)
    # else
    except:
        with open(filename, 'w') as file:
            responses_arr  = new_dict_obj['responses']
            responses_arr.append(response)
            json.dump(new_dict_obj, file)


def deleteto(filename):
    with open(filename, 'r+') as f:
        try:
            dict_from_file = json.load(f)
            responses = dict_from_file.get('responses', [])
            
            if responses and len(responses) > 5:
                responses.pop(0) 
                f.seek(0)        
                f.truncate()     
                json.dump(dict_from_file, f)
                return True
            return False
            
        except json.JSONDecodeError:
            return False

