#No Page Limit
#Might break if too much data is available

from flask import Flask, jsonify, request
from flask_cors import CORS
import mysql.connector

app = Flask(__name__)
CORS(app)

# MySQL configuration
mysql_config = {
    'host': 'localhost',
    'user': 'backend_datafetcher',
    'password': 'B@ck3ndd@7@f37ch3r',
    'database': 'employees'
}

# Function to connect to MySQL and execute queries
def execute_query(query, params=None):
    conn = None
    cursor = None
    try:
        conn = mysql.connector.connect(**mysql_config)
        cursor = conn.cursor(dictionary=True)
        if params:
            cursor.execute(query, params)
        else:
            cursor.execute(query)
        result = cursor.fetchall()
        conn.commit()
        return result
    except Exception as e:
        print("Error:", e)
        return None
    finally:
        cursor.close()
        conn.close()

# Route to get all data without any filtering
@app.route('/api/data', methods=['GET'])
def get_all_data():
    query = "SELECT * FROM employee_details"
    data = execute_query(query)
    if data:
        return jsonify(data)
    else:
        return jsonify({'error': 'Failed to retrieve data'}), 500

# Route to get filtered data based on city attribute
@app.route('/api/data/<city>', methods=['GET'])
def get_filtered_data(city):
    query = "SELECT * FROM employee_details WHERE city = %s"
    data = execute_query(query, (city,))
    if data:
        return jsonify(data)
    else:
        return jsonify({'error': 'No data found for the given city'}), 404

if __name__ == '__main__':
    app.run(debug=True)
