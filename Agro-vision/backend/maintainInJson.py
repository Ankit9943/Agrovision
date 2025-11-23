import json
import os

def writeto(filename, response):
    """
    Append response to JSON file. Returns 0 on success, non-zero if file is too large.
    Optimized to reduce file I/O operations.
    """
    new_dict_obj = {'responses': []} 
    
    try:
        # Check if file exists and read it
        if os.path.exists(filename):
            with open(filename, 'r') as file:
                file_content_dict = json.load(file)
        else:
            file_content_dict = new_dict_obj
        
        # Append response to the array
        responses_arr = file_content_dict.get('responses', [])
        responses_arr.append(response)
        file_content_dict['responses'] = responses_arr
        
        # Write back to file in a single operation
        with open(filename, 'w') as file:
            json.dump(file_content_dict, file, indent=2)
        
        # Return indicator if we need to trim
        return len(responses_arr) - 5 if len(responses_arr) > 5 else 0
        
    except (IOError, json.JSONDecodeError) as e:
        print(f"Error in writeto: {e}")
        return -1


def deleteto(filename):
    """
    Remove the oldest response if there are more than 5.
    Optimized to use single file operation.
    """
    try:
        if not os.path.exists(filename):
            return False
            
        with open(filename, 'r') as f:
            dict_from_file = json.load(f)
        
        responses = dict_from_file.get('responses', [])
        
        if responses and len(responses) > 5:
            responses.pop(0)
            dict_from_file['responses'] = responses
            
            with open(filename, 'w') as f:
                json.dump(dict_from_file, f, indent=2)
            return True
        return False
        
    except (IOError, json.JSONDecodeError) as e:
        print(f"Error in deleteto: {e}")
        return False

