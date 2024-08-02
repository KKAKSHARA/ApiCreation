from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route('/bfhl', methods=['POST'])
def process_data():
    try:
        data = request.get_json()
        full_name = data['full_name']
        dob = data['dob']
        user_id = f"{full_name}_{dob}"
        college_email_id = data['college_email_id']
        college_roll_number = data['college_roll_number']
        raw_data = data['data']
        
        numbers = [item for item in raw_data if item.isdigit()]
        alphabets = [item for item in raw_data if item.isalpha()]
        
        response = {
            "is_success": True,
            "user_id": user_id,
            "college_email_id": college_email_id,
            "college_roll_number": college_roll_number,
            "array_for_numbers": numbers,
            "array_for_alphabets": alphabets
        }
    except Exception as e:
        response = {
            "is_success": False,
            "error": str(e)
        }
    return jsonify(response)

@app.route('/bfhl', methods=['GET'])
def get_operation_code():
    response = {
        "operation_code": "ABC123"
    }
    return jsonify(response)

if __name__ == '__main__':
    app.run(debug=True)

